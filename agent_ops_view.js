// =========================================================================
// VROMLIX AGENT OPS & APPROVALS DASHBOARD ENGINE
// Interfaz interactiva de aprobaciones con árbitro adversarial y cola persistente
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initAgentOpsView();
});

function initAgentOpsView() {
    loadAgentActions();

    const triggerBtn = document.getElementById('agent-trigger-scan-btn');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', triggerManualScan);
    }
}

async function loadAgentActions() {
    const pendingContainer = document.getElementById('agent-pending-container');
    const historyContainer = document.getElementById('agent-history-container');
    const badgePending = document.getElementById('badge-agent-pending');
    const badgeActiveChats = document.getElementById('badge-agent-chats');
    const badgeAuto = document.getElementById('badge-agent-auto');

    if (!pendingContainer) return;

    try {
        const res = await fetch('/api/agent/actions');
        if (!res.ok) throw new Error('Error al consultar /api/agent/actions');
        const data = await res.json();

        const pending = data.pending || [];
        const history = data.history || [];
        const stats = data.stats || {};

        if (badgePending) badgePending.textContent = stats.pending_count ?? pending.length;
        if (badgeActiveChats) badgeActiveChats.textContent = stats.active_chats ?? '-';
        if (badgeAuto) badgeAuto.textContent = stats.auto_executed ?? '-';

        // Sincronizar Badge en Barra de Navegación y Banner en Vista Principal
        const navAgenteBadge = document.getElementById('nav-agente-badge');
        const attentionBanner = document.getElementById('dashboard-attention-banner');
        const pendingCount = stats.pending_count ?? pending.length;

        if (pendingCount > 0) {
            if (navAgenteBadge) {
                navAgenteBadge.textContent = pendingCount;
                navAgenteBadge.style.display = 'inline-flex';
            }
            if (attentionBanner) {
                const topItem = pending[0];
                const titleEl = document.getElementById('attention-banner-title');
                const descEl = document.getElementById('attention-banner-desc');
                if (titleEl) titleEl.textContent = topItem.title || 'Atención Requerida';
                if (descEl) descEl.textContent = `${pendingCount} elemento(s) pendiente(s) de revisión en el sistema.`;
                attentionBanner.style.display = 'flex';
            }
        } else {
            if (navAgenteBadge) navAgenteBadge.style.display = 'none';
            if (attentionBanner) attentionBanner.style.display = 'none';
        }

        // Render Pendientes
        if (pending.length === 0) {
            pendingContainer.innerHTML = `
                <div class="agent-empty-state">
                    <div class="empty-icon">🛡️</div>
                    <h3>Bandeja de Aprobaciones al Día</h3>
                    <p>No hay acciones pendientes de autorización. Todas las propuestas del árbitro han sido resueltas.</p>
                </div>
            `;
        } else {
            pendingContainer.innerHTML = pending.map(act => renderActionCard(act, true)).join('');
        }

        // Render Historial
        if (historyContainer) {
            if (history.length === 0) {
                historyContainer.innerHTML = `<div class="agent-history-empty">Sin historial de acciones previas aún.</div>`;
            } else {
                historyContainer.innerHTML = history.map(act => renderActionCard(act, false)).join('');
            }
        }

    } catch (err) {
        console.error('Error cargando acciones de agente:', err);
        pendingContainer.innerHTML = `<div class="agent-error-state">⚠️ Error conectando con el servidor de aprobaciones: ${err.message}</div>`;
    }
}

function renderActionCard(act, isPending) {
    const catIcons = {
        'IDENTITY': '👤 Identidad',
        'SKILL': '⚡ Skill',
        'SCRIPT_TOOL': '🛠️ Script / Herramienta',
        'ORGANIZATION': '📁 Organización',
        'ROUTINE': '⚙️ Rutina'
    };
    const catLabel = catIcons[act.category] || act.category || 'Acción';

    const riskBadges = {
        'ROUTINE_AUTO': '<span class="agent-badge badge-routine">🟢 Rutina Auto</span>',
        'MEDIUM': '<span class="agent-badge badge-medium">🟡 Riesgo Medio</span>',
        'HIGH_CANONICAL': '<span class="agent-badge badge-canonical">🔴 Canónico / Identidad</span>',
        'CRITICAL': '<span class="agent-badge badge-critical">🚨 Crítico</span>'
    };
    const riskBadge = riskBadges[act.risk_level] || `<span class="agent-badge">${act.risk_level || ''}</span>`;

    const statusBadges = {
        'PENDING': '<span class="status-badge badge-pending">⏳ Esperando Aprobación</span>',
        'APPROVED': '<span class="status-badge badge-approved">✅ Aprobado</span>',
        'REJECTED': '<span class="status-badge badge-rejected">❌ Rechazado</span>',
        'EXPLAIN_REQUESTED': '<span class="status-badge badge-explain">💡 Explicación Solicitada</span>',
        'UNDER_REVIEW': '<span class="status-badge badge-review">🔍 En Revisión</span>',
        'AUTO_EXECUTED': '<span class="status-badge badge-auto">⚡ Auto-Ejecutado</span>',
        'SUPERSEDED': '<span class="status-badge badge-superseded">🔄 Reemplazado</span>'
    };
    const statusBadge = statusBadges[act.status] || `<span class="status-badge">${act.status}</span>`;

    const dateStr = act.updated_at ? new Date(act.updated_at).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' }) : '';
    const diffBlock = act.diff_or_code ? `<pre class="agent-code-block"><code>${escapeHtml(act.diff_or_code)}</code></pre>` : '';
    const feedbackBlock = act.user_feedback ? `<div class="agent-feedback-preview"><b>Tu nota:</b> ${escapeHtml(act.user_feedback)}</div>` : '';

    return `
        <div class="agent-action-card ${isPending ? 'card-pending' : 'card-history'}" id="card-${act.id}">
            <div class="agent-card-header">
                <div class="agent-card-tags">
                    <span class="agent-category-tag">${catLabel}</span>
                    ${riskBadge}
                    ${statusBadge}
                </div>
                <div class="agent-card-meta">
                    <span class="agent-date">${dateStr}</span>
                    <span class="agent-source-chat" title="Chat de Origen">${act.chat_source_id ? act.chat_source_id.slice(0, 8) : ''}</span>
                </div>
            </div>

            <h3 class="agent-card-title">${escapeHtml(act.title)}</h3>
            <div class="agent-card-desc">${escapeHtml(act.description).replace(/\n/g, '<br>')}</div>

            ${diffBlock}

            ${act.adversarial_verdict ? `
                <div class="agent-adversarial-box">
                    <div class="adversarial-header">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>Dictamen del Árbitro Adversarial (Red Team)</span>
                    </div>
                    <div class="adversarial-content">${escapeHtml(act.adversarial_verdict).replace(/\n/g, '<br>')}</div>
                </div>
            ` : ''}

            ${feedbackBlock}

            ${isPending ? `
                <div class="agent-card-controls">
                    <div class="agent-feedback-input-wrapper">
                        <input type="text" id="feedback-${act.id}" class="agent-feedback-input" placeholder="Comentario o instrucción adicional (opcional)...">
                    </div>
                    <div class="agent-btn-group">
                        <button class="btn-agent-action btn-approve" onclick="handleActionDecision('${act.id}', 'approve')" title="Autorizar ejecución inmediata">
                            ✅ Aprobar
                        </button>
                        <button class="btn-agent-action btn-reject" onclick="handleActionDecision('${act.id}', 'reject')" title="Rechazar y aprender de la negativa">
                            ❌ Rechazar
                        </button>
                        <button class="btn-agent-action btn-explain" onclick="handleActionDecision('${act.id}', 'explain')" title="Pedir que desglose o justifique mejor">
                            💡 Explicar Mejor
                        </button>
                        <button class="btn-agent-action btn-review" onclick="handleActionDecision('${act.id}', 'review')" title="Marcar para revisión más profunda">
                            🔍 Requiere Revisión
                        </button>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

async function handleActionDecision(actionId, decisionType) {
    const feedbackInput = document.getElementById(`feedback-${actionId}`);
    const feedback = feedbackInput ? feedbackInput.value.trim() : '';
    const cardEl = document.getElementById(`card-${actionId}`);

    if (cardEl) {
        cardEl.style.opacity = '0.5';
        cardEl.style.pointerEvents = 'none';
    }

    try {
        const res = await fetch('/api/agent/action-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: actionId,
                action: decisionType,
                feedback: feedback
            })
        });

        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Error al procesar acción');

        let undoHtml = '';
        if (decisionType === 'approve' || decisionType === 'reject') {
            undoHtml = ` <a href="javascript:void(0)" onclick="handleActionDecision('${actionId}', 'review')" style="color: #38bdf8; text-decoration: underline; margin-left: 8px; font-weight: bold;">[Deshacer]</a>`;
        }
        showAgentNotification(`Acción ${actionId} marcada como ${data.new_status}.${undoHtml}`, 'success');
        // Recargar datos
        loadAgentActions();
    } catch (err) {
        showAgentNotification('Error: ' + err.message, 'error');
        if (cardEl) {
            cardEl.style.opacity = '1';
            cardEl.style.pointerEvents = 'auto';
        }
    }
}

async function triggerManualScan() {
    const btn = document.getElementById('agent-trigger-scan-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `⏳ Escaneando chats...`;
    }

    try {
        const res = await fetch('/api/agent/trigger-scan', { method: 'POST' });
        const data = await res.json();
        showAgentNotification(data.message || 'Escaneo iniciado en segundo plano', 'info');
        
        // Esperar 2 segundos y refrescar
        setTimeout(() => {
            loadAgentActions();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = `⚡ Escanear Ahora`;
            }
        }, 2200);
    } catch (err) {
        showAgentNotification('Error iniciando escaneo: ' + err.message, 'error');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `⚡ Escanear Ahora`;
        }
    }
}

function showAgentNotification(msg, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        if (typeof showToast === 'function') showToast(msg, type);
        return;
    }
    const toast = document.createElement('div');
    toast.className = `agent-toast toast-${type}`;
    toast.innerHTML = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4500);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

window.loadAgentActions = loadAgentActions;
// Actualizar alertas del agente en segundo plano cada 30 segundos
setInterval(loadAgentActions, 30000);

