/**
 * whatsapp_view.js
 * WhatsApp Monitor Panel for Vromlix Dashboard
 * Reads from whatsapp-bridge data files via /api/whatsapp/* endpoints.
 * Design principles:
 *  - Zero RAM impact: polling every 60s max, no WebSocket.
 *  - Compact: chats list max-height 360px, messages max-height 360px.
 *  - Same section-card / card-header design as rest of dashboard.
 *  - Does NOT open WhatsApp Web automatically – only via explicit button.
 */

(function () {
  'use strict';

  /* -------- State -------- */
  let waChats = [];
  let waActiveJid = null;
  let waActiveContactName = '';
  let waPollInterval = null;
  let waLastMsgCount = 0;

  /* -------- Helpers -------- */
  function fmt(isoStr) {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      const now = new Date();
      const isToday = d.toDateString() === now.toDateString();
      if (isToday) {
        return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
      }
      return d.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
    } catch (e) {
      return '';
    }
  }

  function initial(name) {
    if (!name) return '?';
    return name.trim()[0].toUpperCase();
  }

  function isGroup(jid) {
    return jid && jid.includes('@g.us');
  }

  function fmtText(msg) {
    if (!msg) return '';
    const t = msg.type || 'text';
    if (t === 'voice' || t === 'audio') return '🎙️ ' + (msg.text || 'Audio');
    if (t === 'image') return '🖼️ ' + (msg.text || 'Imagen');
    if (t === 'video') return '🎬 ' + (msg.text || 'Video');
    if (t === 'document') return '📄 ' + (msg.text || 'Documento');
    return msg.text || '';
  }

  /* -------- Status badge -------- */
  async function waUpdateStatus() {
    try {
      const r = await fetch('/api/whatsapp/status');
      const d = await r.json();
      const badge = document.getElementById('wa-status-badge');
      if (!badge) return;
      if (d.linked && d.service_active) {
        badge.textContent = '● Vinculado';
        badge.className = 'wa-status-badge wa-status-linked';
      } else if (!d.linked) {
        badge.textContent = '● Sin vincular';
        badge.className = 'wa-status-badge wa-status-unlinked';
      } else {
        badge.textContent = '● Servicio inactivo';
        badge.className = 'wa-status-badge wa-status-unlinked';
      }
    } catch (e) {
      // Silent
    }
  }

  /* -------- Load chats -------- */
  window.waLoadChats = async function () {
    const list = document.getElementById('wa-chats-list');
    if (!list) return;
    waUpdateStatus();
    try {
      const r = await fetch('/api/whatsapp/chats');
      const d = await r.json();
      waChats = d.chats || [];

      if (waChats.length === 0) {
        list.innerHTML = '<div class="wa-loading-msg">Sin chats todavía (vincula el puente primero).</div>';
        return;
      }

      list.innerHTML = waChats.map(chat => {
        const isGrp = isGroup(chat.jid);
        const name = chat.name || chat.jid.split('@')[0];
        const grp = isGrp ? '👥 ' : '';
        const senderPrefix = (isGrp && chat.lastMessageSender) ? `${chat.lastMessageSender}: ` : '';
        const preview = senderPrefix + (fmtText({ type: null, text: chat.lastMessageText }) || '');
        const time = fmt(chat.lastMessageTimestamp);
        const ini = initial(name);
        const jidSafe = encodeURIComponent(chat.jid);
        return `
          <div class="wa-chat-row" onclick="window.waOpenChat('${jidSafe}', '${grp}${name.replace(/'/g, "\\'")}')">
            <div class="wa-chat-avatar">${ini}</div>
            <div class="wa-chat-info">
              <div class="wa-chat-name">${grp}${escHtml(name)}</div>
              <div class="wa-chat-preview">${escHtml(preview.substring(0, 80))}</div>
            </div>
            <div class="wa-chat-time">${time}</div>
          </div>`;
      }).join('');
    } catch (e) {
      list.innerHTML = `<div class="wa-loading-msg">Error cargando chats: ${e.message}</div>`;
    }
  };

  /* -------- Open chat -------- */
  window.waOpenChat = async function (jidEncoded, name) {
    waActiveJid = decodeURIComponent(jidEncoded);
    waActiveContactName = name;

    document.getElementById('wa-chats-panel').style.display = 'none';
    document.getElementById('wa-messages-panel').style.display = '';
    document.getElementById('btn-wa-back').style.display = '';
    document.getElementById('wa-messages-contact-header').textContent = name;

    await waLoadMessages();
  };

  async function waLoadMessages() {
    const list = document.getElementById('wa-messages-list');
    if (!list || !waActiveJid) return;
    try {
      const url = `/api/whatsapp/messages?jid=${encodeURIComponent(waActiveJid)}&limit=40`;
      const r = await fetch(url);
      const d = await r.json();
      const msgs = d.messages || [];

      if (msgs.length === 0) {
        list.innerHTML = '<div class="wa-loading-msg">Sin mensajes guardados aún en este chat.</div>';
        return;
      }

      // Check if there are new messages since last load
      const newCount = msgs.length;
      if (newCount > waLastMsgCount && waLastMsgCount > 0) {
        // New messages arrived
        showWaToast(`${newCount - waLastMsgCount} mensaje(s) nuevo(s) de ${waActiveContactName}`);
      }
      waLastMsgCount = newCount;

      list.innerHTML = msgs.map(msg => {
        const isMe = !!msg.isFromMe;
        const cls = isMe ? 'wa-msg-from-me' : 'wa-msg-from-them';
        const senderName = msg.pushName && msg.pushName !== 'Desconocido' ? msg.pushName : 'Remitente';
        const senderLine = !isMe ? `<div class="wa-msg-sender">👤 ${escHtml(senderName)}</div>` : '';
        const text = fmtText(msg);
        const time = fmt(msg.timestamp);
        const typeTag = (msg.type && msg.type !== 'text') ? '' : '';
        return `
          <div class="wa-msg-bubble ${cls}">
            ${senderLine}
            <div class="wa-msg-text-content">${escHtml(text)}${typeTag}</div>
            <div class="wa-msg-time">${time}</div>
          </div>`;
      }).join('');

      // Scroll to bottom
      list.scrollTop = list.scrollHeight;
    } catch (e) {
      list.innerHTML = `<div class="wa-loading-msg">Error cargando mensajes: ${e.message}</div>`;
    }
  }

  /* -------- Go back to chats list -------- */
  window.waGoBack = function () {
    waActiveJid = null;
    waActiveContactName = '';
    waLastMsgCount = 0;
    document.getElementById('wa-messages-panel').style.display = 'none';
    document.getElementById('wa-chats-panel').style.display = '';
    document.getElementById('btn-wa-back').style.display = 'none';
    window.waLoadChats();
  };

  /* -------- Open in WhatsApp Web -------- */
  window.waOpenWebChat = function () {
    if (!waActiveJid) return;
    // WhatsApp Web URL for specific chat
    let waWebUrl = 'https://web.whatsapp.com/';
    if (waActiveJid.includes('@')) {
      const phone = waActiveJid.split('@')[0];
      if (!isGroup(waActiveJid)) {
        waWebUrl = `https://web.whatsapp.com/send?phone=${phone}`;
      }
    }
    window.open(waWebUrl, '_blank', 'noopener');
  };

  /* -------- Escape HTML -------- */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* -------- Toast notification -------- */
  function showWaToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.textContent = '💬 ' + msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  /* -------- Auto polling every 60s -------- */
  function startWaPolling() {
    // Initial load
    window.waLoadChats();

    // Poll every 60 seconds
    waPollInterval = setInterval(() => {
      if (waActiveJid) {
        // If a chat is open, refresh its messages
        waLoadMessages();
      } else {
        // Refresh chats list silently
        window.waLoadChats();
      }
    }, 60000);
  }

  /* -------- Init on DOMContentLoaded -------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startWaPolling);
  } else {
    // Small delay to let app.js finish first
    setTimeout(startWaPolling, 1500);
  }
})();
