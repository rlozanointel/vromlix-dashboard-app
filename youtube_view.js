// =========================================================================
// VROMLIX YOUTUBE EXECUTIVE DIGEST VIEW (localhost:8080)
// Bandeja de Lectura Rápida (Visual Chunking) + 1-Click Mark Watched (-4s)
// =========================================================================

let ytCurrentFilter = 'all';
let ytUnreadCache = [];
let ytChannelsCache = [];

document.addEventListener('DOMContentLoaded', () => {
    initYouTubeView();
});

function initYouTubeView() {
    loadYouTubeSummaries();

    const scanBtn = document.getElementById('yt-trigger-scan-btn');
    if (scanBtn) {
        scanBtn.addEventListener('click', triggerYouTubeChannelScan);
    }

    const sumBtn = document.getElementById('yt-summarize-url-btn');
    const urlInput = document.getElementById('yt-custom-url-input');
    if (sumBtn && urlInput) {
        sumBtn.addEventListener('click', () => summarizeCustomYouTubeUrl(urlInput.value));
        urlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') summarizeCustomYouTubeUrl(urlInput.value);
        });
    }

    document.querySelectorAll('.yt-filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.yt-filter-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            ytCurrentFilter = btn.getAttribute('data-yt-filter') || 'all';
            renderYouTubeView();
        });
    });
}

async function loadYouTubeSummaries() {
    const container = document.getElementById('yt-cards-container');
    if (!container) return;

    try {
        const res = await fetch('/api/youtube/summaries');
        if (!res.ok) throw new Error('No se pudo cargar /api/youtube/summaries');
        const data = await res.json();

        ytUnreadCache = data.unread || [];
        ytChannelsCache = data.channels || [];
        const stats = data.stats || {};

        const badgeUnread = document.getElementById('yt-metric-unread');
        const badgeArchived = document.getElementById('yt-metric-archived');
        const badgeChannels = document.getElementById('yt-metric-channels');
        const navBadge = document.getElementById('nav-yt-badge');

        if (badgeUnread) badgeUnread.textContent = stats.unread_count ?? ytUnreadCache.length;
        if (badgeArchived) badgeArchived.textContent = stats.archived_count ?? 0;
        if (badgeChannels) badgeChannels.textContent = stats.channels_count ?? 17;

        if (navBadge) {
            const count = stats.unread_count ?? ytUnreadCache.length;
            navBadge.textContent = count;
            navBadge.style.display = count > 0 ? 'inline-flex' : 'none';
        }

        renderYouTubeView();
    } catch (err) {
        console.error('Error cargando resúmenes YouTube:', err);
        container.innerHTML = `<div class="agent-error-state">⚠️ Error conectando con el motor de YouTube: ${err.message}</div>`;
    }
}

function renderYouTubeView() {
    const container = document.getElementById('yt-cards-container');
    if (!container) return;

    if (ytCurrentFilter === 'channels_list') {
        container.innerHTML = renderMonitoredChannelsGrid();
        return;
    }

    const filtered = ytUnreadCache.filter(item => {
        if (ytCurrentFilter === 'all') return true;
        return item.category_ui === ytCurrentFilter;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="agent-empty-state">
                <div class="empty-icon">🎬</div>
                <h3>Bandeja de YouTube al Día</h3>
                <p>No tienes resúmenes pendientes en esta categoría. El próximo corte automático se ejecutará a las <b>10:00 AM (CDMX)</b>, o puedes pegar cualquier enlace arriba.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => renderYouTubeSummaryCard(item)).join('');
}

function renderYouTubeSummaryCard(v) {
    const modeLabels = {
        'MODO_A_ENTREVISTA': '🎙️ Entrevista / Tema Central',
        'MODO_B_MULTITEMA': '📰 Multi-Tema / Análisis',
        'MODO_C_VISUAL': '🖼️ Visual / Documental'
    };
    const modeBadge = modeLabels[v.channel_mode] || '⚡ Ejecutivo';
    const isVisual = v.channel_mode === 'MODO_C_VISUAL';

    const tldrHtml = (v.tldr || []).map(line => `<li>${line}</li>`).join('');
    const kpHtml = (v.key_points || []).map(line => `<li>${line}</li>`).join('');
    const rfHtml = (v.rogerman_filter || []).map(line => `<li>${line}</li>`).join('');

    const chaptersHtml = (v.chapters || []).map(ch => {
        const sec = ch.sec || 0;
        const tsUrl = `https://www.youtube.com/watch?v=${v.video_id}&t=${sec}s`;
        return `
            <a href="${tsUrl}" target="_blank" rel="noopener" class="yt-chapter-pill" title="Abrir este minuto exacto en YouTube">
                <span class="yt-ch-time">[${ch.ts}]</span>
                <span class="yt-ch-title">${ch.title}</span>
            </a>
        `;
    }).join('');

    const vaultFileName = v.vault_path ? v.vault_path.split('/').pop() : 'Guardado en Vault_Conocimiento';

    return `
        <article class="yt-summary-card ${isVisual ? 'yt-card-visual' : ''}" id="yt-card-${v.video_id}">
            <!-- CABECERA DE LA FICHA -->
            <div class="yt-card-top">
                <div class="yt-badges-row">
                    <span class="yt-badge yt-badge-channel">${v.channel_name}</span>
                    <span class="yt-badge yt-badge-mode">${modeBadge}</span>
                    <span class="yt-badge yt-badge-verdict">${v.verdict_badge || '🔥 Resumen Ejecutivo'}</span>
                </div>
                <div class="yt-meta-right">
                    <span class="yt-duration-pill">⏱️ ${v.duration_str}</span>
                    <span class="yt-date-pill">📅 ${v.upload_date || ''}</span>
                </div>
            </div>

            <h3 class="yt-video-title">
                <a href="${v.url_video}" target="_blank" rel="noopener">${v.title}</a>
            </h3>

            <div class="yt-vault-indicator" title="${v.vault_path || ''}">
                🧠 <b>Segundo Cerebro (YAML + Transcripción Completa):</b> <code>${vaultFileName}</code>
            </div>

            <!-- 1. EL NÚCLEO EN 3 FRASES (10 SEGUNDOS) -->
            <div class="yt-section-box yt-box-tldr">
                <div class="yt-section-title">⚡ 1. ¿De qué trata en 3 frases? (El Núcleo en 10 segundos)</div>
                <ul class="yt-bullet-list yt-tldr-list">
                    ${tldrHtml}
                </ul>
            </div>

            <!-- 2. IDEAS PRINCIPALES / BLOQUES TEMÁTICOS -->
            <div class="yt-section-box yt-box-keypoints">
                <div class="yt-section-title">🔑 2. Ideas Principales / Bloques Temáticos (100% General y Sin Humo)</div>
                <ul class="yt-bullet-list yt-kp-list">
                    ${kpHtml}
                </ul>
            </div>

            <!-- 3. FILTRO ROGERMAN -->
            <div class="yt-section-box yt-box-rogerman">
                <div class="yt-section-title">🎯 3. ¿Qué nos sirve a nosotros hoy? (Filtro Rogerman)</div>
                <ul class="yt-bullet-list yt-rf-list">
                    ${rfHtml}
                </ul>
            </div>

            <!-- 4. MAPA RÁPIDO DE MOMENTOS -->
            ${chaptersHtml ? `
                <div class="yt-chapters-block">
                    <div class="yt-chapters-label">⏱️ 4. Momentos Clave (Clic para saltar a ese minuto en YouTube):</div>
                    <div class="yt-chapters-grid">
                        ${chaptersHtml}
                    </div>
                </div>
            ` : ''}

            <!-- BARRA DE 3 BOTONES DE ACCIÓN -->
            <div class="yt-actions-footer">
                <button class="yt-btn yt-btn-watched" onclick="handleYouTubeCardAction('${v.video_id}', 'watched', '${v.url_mark_watched}')" title="Abre los últimos 4 segundos en YouTube para que quede con barra roja de Visto en tus Suscripciones y quita la ficha de esta bandeja">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Visto (Últimos 4s) y Quitar</span>
                </button>

                <a href="${v.url_video}" target="_blank" rel="noopener" class="yt-btn yt-btn-open" title="Solo abrir el video en YouTube desde el inicio sin borrar esta ficha">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    <span>Abrir en YouTube</span>
                </a>

                <button class="yt-btn yt-btn-dismiss" onclick="handleYouTubeCardAction('${v.video_id}', 'dismiss', '')" title="Solo quitar la ficha de esta bandeja sin abrir YouTube (el respaldo .md permanece en tu Segundo Cerebro)">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                    <span>Solo Quitar</span>
                </button>
            </div>
        </article>
    `;
}

function renderMonitoredChannelsGrid() {
    const modeBadges = {
        'MODO_A_ENTREVISTA': '🎙️ Entrevista / Ciencia (5-7 Ideas)',
        'MODO_B_MULTITEMA': '📰 Multi-Tema / Noticias (Todos los Bloques)',
        'MODO_C_VISUAL': '🖼️ Visual / Historia (Con Alerta Visual)'
    };

    const cards = ytChannelsCache.map((ch, idx) => `
        <div class="yt-channel-item">
            <div class="yt-ch-num">#${idx + 1}</div>
            <div class="yt-ch-info">
                <div class="yt-ch-name">${ch.name}</div>
                <div class="yt-ch-handle">${ch.handle} · <span>${modeBadges[ch.mode] || ch.mode}</span></div>
            </div>
            <a href="${ch.urls[0]}" target="_blank" rel="noopener" class="yt-btn yt-btn-open" style="padding: 6px 12px; font-size: 0.8rem;">
                Canal ↗
            </a>
        </div>
    `).join('');

    return `
        <div class="yt-channels-panel">
            <h3 style="margin-bottom: 12px; color: var(--text-primary);">📡 Tus 17 Canales Monitoreados (Corte diario: 10:00 AM CDMX · Sin Shorts)</h3>
            <div class="yt-channels-grid">
                ${cards}
            </div>
        </div>
    `;
}

async function handleYouTubeCardAction(videoId, actionType, markWatchedUrl) {
    if (actionType === 'watched' && markWatchedUrl) {
        window.open(markWatchedUrl, '_blank', 'noopener');
    }

    const cardEl = document.getElementById(`yt-card-${videoId}`);
    if (cardEl) {
        cardEl.style.transition = 'all 0.28s ease';
        cardEl.style.opacity = '0';
        cardEl.style.transform = 'translateY(-8px) scale(0.98)';
    }

    try {
        const res = await fetch('/api/youtube/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ video_id: videoId, action: actionType })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Error al actualizar ficha');

        setTimeout(() => {
            loadYouTubeSummaries();
        }, 260);
    } catch (err) {
        alert('Error: ' + err.message);
        if (cardEl) {
            cardEl.style.opacity = '1';
            cardEl.style.transform = 'none';
        }
    }
}

async function summarizeCustomYouTubeUrl(url) {
    const cleanUrl = (url || '').trim();
    if (!cleanUrl) return;

    const btn = document.getElementById('yt-summarize-url-btn');
    const input = document.getElementById('yt-custom-url-input');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Extrayendo y Resumiendo (~8s)...';
    }

    try {
        const res = await fetch('/api/youtube/summarize-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: cleanUrl })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Error resumiendo video');

        if (input) input.value = '';
        await loadYouTubeSummaries();
    } catch (err) {
        alert('No se pudo resumir el video: ' + err.message);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '⚡ Resumir Video';
        }
    }
}

async function triggerYouTubeChannelScan() {
    const btn = document.getElementById('yt-trigger-scan-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Revisando 17 canales...';
    }
    try {
        const res = await fetch('/api/youtube/trigger-scan', { method: 'POST' });
        const data = await res.json();
        if (typeof showAgentNotification === 'function') {
            showAgentNotification(data.message || 'Escaneo iniciado en segundo plano', 'info');
        }
        setTimeout(() => {
            loadYouTubeSummaries();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '🔄 Buscar Nuevos Ahora';
            }
        }, 4000);
    } catch (err) {
        alert('Error: ' + err.message);
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '🔄 Buscar Nuevos Ahora';
        }
    }
}
