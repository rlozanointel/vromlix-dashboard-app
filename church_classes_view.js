// =========================================================================
// VROMLIX CHURCH CLASSES AUTO-DIGEST VIEW (Iglesia -> 📚 Clases)
// Bandeja dominical estilo YouTube alimentada por WhatsApp + Obsidian YAML
// =========================================================================

let churchViewMode = 'unread'; // 'unread' | 'history' | 'groups'
let churchCurrentFilter = 'all';
let churchSearchQuery = '';
let churchUnreadCache = [];
let churchHistoryCache = [];
let churchGroupsCache = [];
let churchAvailableWaGroups = [];
let churchStatsCache = {};

document.addEventListener('DOMContentLoaded', () => {
    initChurchClassesView();
});

function initChurchClassesView() {
    loadChurchClasses();

    const scanBtn = document.getElementById('church-trigger-scan-btn');
    if (scanBtn) {
        scanBtn.addEventListener('click', triggerChurchWhatsAppScan);
    }

    const cardUnread = document.getElementById('church-metric-card-unread');
    const cardHistory = document.getElementById('church-metric-card-archived');
    const cardGroups = document.getElementById('church-metric-card-groups');

    if (cardUnread) {
        cardUnread.addEventListener('click', () => {
            churchViewMode = 'unread';
            updateChurchMetricsUI();
            renderChurchClassesView();
        });
    }
    if (cardHistory) {
        cardHistory.addEventListener('click', () => {
            churchViewMode = 'history';
            updateChurchMetricsUI();
            renderChurchClassesView();
        });
    }
    if (cardGroups) {
        cardGroups.addEventListener('click', () => {
            churchViewMode = churchViewMode === 'groups' ? 'unread' : 'groups';
            updateChurchMetricsUI();
            renderChurchClassesView();
        });
    }

    const searchInput = document.getElementById('church-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            churchSearchQuery = (e.target.value || '').toLowerCase().trim();
            renderChurchClassesView();
        });
    }

    document.querySelectorAll('.church-filter-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.church-filter-chip').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            churchCurrentFilter = btn.getAttribute('data-church-filter') || 'all';
            if (churchViewMode === 'groups') churchViewMode = 'unread';
            updateChurchMetricsUI();
            renderChurchClassesView();
        });
    });
}

function updateChurchMetricsUI() {
    const cUnread = document.getElementById('church-metric-card-unread');
    const cHist = document.getElementById('church-metric-card-archived');
    const cGrp = document.getElementById('church-metric-card-groups');
    [cUnread, cHist, cGrp].forEach(el => el && el.classList.remove('active-metric-card'));
    if (churchViewMode === 'groups' && cGrp) cGrp.classList.add('active-metric-card');
    else if (churchViewMode === 'history' && cHist) cHist.classList.add('active-metric-card');
    else if (cUnread) cUnread.classList.add('active-metric-card');
}

async function loadChurchClasses() {
    const container = document.getElementById('church-cards-container');
    if (!container) return;

    try {
        const res = await fetch('/api/church/classes');
        if (!res.ok) throw new Error('Error cargando /api/church/classes');
        const data = await res.json();

        churchUnreadCache = data.unread || [];
        churchHistoryCache = data.history || [];
        churchGroupsCache = data.groups || [];
        churchAvailableWaGroups = data.available_wa_groups || [];
        churchStatsCache = data.stats || {};

        const elUnread = document.getElementById('church-metric-unread');
        const elHist = document.getElementById('church-metric-archived');
        const elGrp = document.getElementById('church-metric-groups');
        const elSunday = document.getElementById('church-target-sunday');
        const clasesNavPill = document.getElementById('iglesia-clases-badge');

        if (elUnread) elUnread.textContent = churchStatsCache.unread_count ?? churchUnreadCache.length;
        if (elHist) elHist.textContent = churchStatsCache.history_count ?? churchHistoryCache.length;
        if (elGrp) elGrp.textContent = churchStatsCache.groups_count ?? churchGroupsCache.filter(g => g.active).length;
        if (elSunday && churchStatsCache.target_sunday) {
            elSunday.textContent = `Domingo ${churchStatsCache.target_sunday}`;
        }
        if (clasesNavPill) {
            const cnt = churchStatsCache.unread_count ?? churchUnreadCache.length;
            clasesNavPill.textContent = cnt > 0 ? `${cnt} Lista${cnt === 1 ? '' : 's'}` : 'Capilla';
        }

        updateChurchMetricsUI();
        renderChurchClassesView();
    } catch (err) {
        console.error('Error cargando clases automáticas:', err);
        container.innerHTML = `<div class="agent-error-state">⚠️ No se pudo conectar con /api/church/classes: ${err.message}</div>`;
    }
}

function escChurchHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

window.openChurchScripture = function (bofmSlug, bofmCh, externalUrl) {
    if (bofmSlug && bofmCh) {
        if (typeof window.switchMormonSubview === 'function') {
            window.switchMormonSubview('escrituras');
        }
        window.location.hash = `#${bofmSlug}-${bofmCh}`;
        return;
    }
    if (externalUrl) {
        window.open(externalUrl, '_blank', 'noopener');
    }
};

function renderChurchDigestCard(d) {
    const isArchived = d.status !== 'UNREAD';
    const tldrHtml = (d.tldr || []).map(x => `<li>${x}</li>`).join('');
    const kpHtml = (d.key_points || []).map(x => `<li>${x}</li>`).join('');

    const scriptures = d.scriptures || [];
    const scripturesHtml = scriptures.length > 0 ? `
        <div class="yt-chapters-block">
            <div class="yt-chapters-label">📖 Lecturas de Escrituras:</div>
            <div class="yt-chapters-grid">
                ${scriptures.map(s => {
                    const slug = escChurchHtml(s.bofm_slug || '');
                    const ch = s.bofm_ch ? Number(s.bofm_ch) : 0;
                    const extUrl = escChurchHtml(s.url || '');
                    const tooltip = ch ? `Abrir ${s.ref} en Libro de Mormón` : `Leer ${s.ref} en ChurchofJesusChrist.org`;
                    return `
                        <button type="button" class="yt-chapter-pill church-scripture-pill" onclick="window.openChurchScripture('${slug}', ${ch}, '${extUrl}')" title="${escChurchHtml(tooltip)}">
                            <span class="yt-ch-title">📜 ${escChurchHtml(s.ref)}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    ` : '';

    const wordsCount = [...(d.tldr || []), ...(d.key_points || [])].join(' ').trim().split(/\s+/).filter(Boolean).length;
    const readMins = Math.max(1, Math.ceil(wordsCount / 190));

    const openLinkBtn = d.url_source ? `
        <a href="${escChurchHtml(d.url_source)}" target="_blank" rel="noopener" class="yt-btn yt-btn-open yt-btn-icon-only" data-tooltip="Abrir discurso / lección oficial" aria-label="Abrir enlace oficial">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
    ` : '';

    const noteBtn = d.vault_path ? `
        <a href="/api/open-note?path=${encodeURIComponent(d.vault_path)}" target="_blank" rel="noopener" class="yt-btn yt-btn-note yt-btn-icon-only" data-tooltip="Abrir nota en Obsidian (.md YAML)" aria-label="Abrir en Obsidian">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </a>
    ` : '';

    return `
        <article class="yt-summary-card ${isArchived ? 'yt-card-archived' : ''}" id="church-card-${escChurchHtml(d.digest_id)}">
            <div class="yt-card-top">
                <div class="yt-badges-row">
                    <span class="yt-badge yt-badge-channel">${escChurchHtml(d.class_name)}</span>
                    ${d.verdict_badge ? `<span class="yt-badge yt-badge-verdict">${escChurchHtml(d.verdict_badge)}</span>` : ''}
                    ${isArchived ? `<span class="yt-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3);">✅ Vista / Archivada</span>` : ''}
                </div>
                <div class="yt-meta-right">
                    <span class="yt-reading-pill">📖 ${readMins} min lectura</span>
                    <span class="yt-date-pill">📅 Dom ${escChurchHtml(d.target_sunday || '')}</span>
                </div>
            </div>

            <h3 class="yt-video-title">
                ${d.url_source
                    ? `<a href="${escChurchHtml(d.url_source)}" target="_blank" rel="noopener">${escChurchHtml(d.title)}</a>`
                    : `<span>${escChurchHtml(d.title)}</span>`}
            </h3>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;">${escChurchHtml(d.source_label || '')}</div>

            <div class="yt-section-box yt-box-tldr">
                <div class="yt-section-title">⚡ El Núcleo</div>
                <ul class="yt-bullet-list yt-tldr-list">${tldrHtml}</ul>
            </div>

            <div class="yt-section-box yt-box-keypoints">
                <div class="yt-section-title">🔑 Puntos Clave & Participación</div>
                <ul class="yt-bullet-list yt-kp-list">${kpHtml}</ul>
            </div>

            ${scripturesHtml}

            <div class="yt-actions-footer">
                ${!isArchived ? `
                    <button type="button" class="yt-btn yt-btn-watched yt-btn-icon-only" onclick="window.handleChurchCardAction('${escChurchHtml(d.digest_id)}', 'archive')" data-tooltip="Marcar como Vista y Archivar en Obsidian" aria-label="Marcar vista">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>
                ` : `
                    <button type="button" class="yt-btn yt-btn-reactivate yt-btn-icon-only" onclick="window.handleChurchCardAction('${escChurchHtml(d.digest_id)}', 'unread')" data-tooltip="Regresar a pendientes del domingo" aria-label="Regresar a pendientes">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h10a5 5 0 0 1 5 5v2"/><polyline points="7 6 3 10 7 14"/></svg>
                    </button>
                `}
                ${openLinkBtn}
                ${noteBtn}
                <button type="button" class="yt-btn yt-btn-copy yt-btn-icon-only" onclick="window.copyChurchDigestSummary('${escChurchHtml(d.digest_id)}')" data-tooltip="Copiar síntesis para estudiar" aria-label="Copiar síntesis">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
            </div>
        </article>
    `;
}

function renderChurchGroupsPanel() {
    const waOptions = churchAvailableWaGroups.map(g =>
        `<option value="${escChurchHtml(g.jid)}">${escChurchHtml(g.name)}</option>`
    ).join('');

    const rows = churchGroupsCache.map((g, idx) => `
        <div class="yt-channel-item">
            <div class="yt-ch-num">#${idx + 1}</div>
            <div class="yt-ch-info">
                <div class="yt-ch-name">${escChurchHtml(g.name)} ${g.active ? '' : '<span style="color:var(--text-muted);font-size:0.74rem;">(Pausado)</span>'}</div>
                <div class="yt-ch-handle">
                    <span>${escChurchHtml(g.class_type)}</span> · <span>${escChurchHtml(g.schedule_hint || 'Domingos')}</span>
                </div>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <button type="button" class="btn-secondary" style="padding:4px 10px; font-size:0.76rem; cursor:pointer;" onclick="window.toggleChurchGroup('${escChurchHtml(g.jid)}', ${g.active ? 'false' : 'true'})">
                    ${g.active ? '⏸️ Pausar' : '▶️ Activar'}
                </button>
                <button type="button" class="yt-icon-btn yt-icon-trash" title="Quitar grupo" onclick="window.deleteChurchGroup('${escChurchHtml(g.jid)}', '${escChurchHtml(g.name)}')">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                </button>
            </div>
        </div>
    `).join('');

    return `
        <div class="yt-channels-panel">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:10px 14px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <button type="button" class="btn-secondary" onclick="window.backToChurchDigests()" style="padding:5px 11px; font-size:0.80rem; font-weight:600; cursor:pointer;">← Ver Clases</button>
                    <span style="font-weight:700; font-size:0.86rem;">📡 ${churchGroupsCache.length} grupos / clases configurados</span>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; flex:1; justify-content:flex-end;">
                    <select id="church-wa-group-select" class="translator-select" style="max-width:250px; padding:5px 8px; font-size:0.80rem; height:32px;">
                        <option value="">-- Elegir grupo de WhatsApp --</option>
                        ${waOptions}
                    </select>
                    <input type="text" id="church-custom-group-name" class="yt-quick-url-input" placeholder="O escribe nueva clase (ej: Preparación Templo)..." style="max-width:240px; height:32px; font-size:0.80rem;">
                    <button type="button" class="btn-primary" style="padding:5px 12px; height:32px; font-size:0.80rem; font-weight:600; cursor:pointer;" onclick="window.addChurchGroupFromUI()">+ Agregar</button>
                </div>
            </div>
            <div class="yt-channels-grid">${rows}</div>
        </div>
    `;
}

window.backToChurchDigests = function () {
    churchViewMode = 'unread';
    updateChurchMetricsUI();
    renderChurchClassesView();
};

function renderChurchClassesView() {
    const container = document.getElementById('church-cards-container');
    if (!container) return;

    if (churchViewMode === 'groups') {
        container.innerHTML = renderChurchGroupsPanel();
        return;
    }

    const baseList = churchViewMode === 'unread' ? churchUnreadCache : churchHistoryCache;
    const filtered = baseList.filter(d => {
        if (churchCurrentFilter !== 'all' && d.class_type !== churchCurrentFilter) return false;
        if (churchSearchQuery) {
            const hay = `${d.title} ${d.class_name} ${(d.tldr || []).join(' ')} ${(d.key_points || []).join(' ')}`.toLowerCase();
            if (!hay.includes(churchSearchQuery)) return false;
        }
        return true;
    });

    if (filtered.length === 0) {
        container.innerHTML = churchViewMode === 'unread'
            ? `<div class="agent-empty-state"><div class="empty-icon">⛪</div><h3>Bandeja Dominical al Día</h3><p>No hay clases pendientes sin leer para este filtro. Pulsa <b>🔄 Escanear WhatsApp</b> para revisar avisos nuevos de tus grupos.</p></div>`
            : `<div class="agent-empty-state"><div class="empty-icon">📚</div><h3>Sin Clases Archivadas</h3><p>Las clases que marques como vistas o cuyo domingo ya haya pasado aparecerán aquí respaldadas en Obsidian.</p></div>`;
        return;
    }

    container.innerHTML = filtered.map(renderChurchDigestCard).join('');
}

window.handleChurchCardAction = async function (digestId, action) {
    try {
        const res = await fetch('/api/church/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ digest_id: digestId, action })
        });
        const data = await res.json();
        if (data.success) {
            if (typeof showToast === 'function') {
                showToast(action === 'unread' ? 'Clase regresada a pendientes' : '✅ Clase archivada en Obsidian', 'success');
            }
            loadChurchClasses();
        }
    } catch (e) {
        console.error('Error actualizando clase:', e);
    }
};

window.copyChurchDigestSummary = function (digestId) {
    const all = [...churchUnreadCache, ...churchHistoryCache];
    const d = all.find(x => x.digest_id === digestId);
    if (!d) return;
    const strip = s => String(s || '').replace(/<[^>]+>/g, '');
    const text = [
        `⛪ ${d.title} (${d.class_name} - Dom ${d.target_sunday})`,
        '',
        '⚡ EL NÚCLEO:',
        ...(d.tldr || []).map(x => `• ${strip(x)}`),
        '',
        '🔑 PUNTOS CLAVE:',
        ...(d.key_points || []).map(x => `• ${strip(x)}`),
        d.url_source ? `\n🔗 ${d.url_source}` : ''
    ].join('\n');
    navigator.clipboard.writeText(text).then(() => {
        if (typeof showToast === 'function') showToast('📋 Síntesis de clase copiada', 'success');
    });
};

async function triggerChurchWhatsAppScan() {
    const btn = document.getElementById('church-trigger-scan-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Escaneando...';
    }
    try {
        const res = await fetch('/api/church/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const data = await res.json();
        if (typeof showToast === 'function') {
            showToast(`✅ Escaneo completado (${data.created_or_updated || 0} ficha(s) procesadas)`, 'success');
        }
        await loadChurchClasses();
    } catch (e) {
        if (typeof showToast === 'function') showToast('Error escaneando grupos de WhatsApp', 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '🔄 Escanear WhatsApp';
        }
    }
}

window.addChurchGroupFromUI = async function () {
    const sel = document.getElementById('church-wa-group-select');
    const customInput = document.getElementById('church-custom-group-name');
    let jid = sel ? sel.value : '';
    let name = '';
    if (jid && sel) {
        name = sel.options[sel.selectedIndex].textContent;
    } else if (customInput && customInput.value.trim()) {
        name = customInput.value.trim();
        jid = '';
    } else {
        if (typeof showToast === 'function') showToast('Selecciona un grupo de WhatsApp o escribe un nombre de clase', 'warning');
        return;
    }
    try {
        const res = await fetch('/api/church/groups/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jid, name, class_type: 'otro', schedule_hint: 'Domingos' })
        });
        const data = await res.json();
        if (data.success) {
            if (typeof showToast === 'function') showToast(`✅ Agregado: ${name}`, 'success');
            await loadChurchClasses();
        }
    } catch (e) {
        console.error(e);
    }
};

window.toggleChurchGroup = async function (jid, active) {
    try {
        await fetch('/api/church/groups/toggle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jid, active })
        });
        loadChurchClasses();
    } catch (e) {
        console.error(e);
    }
};

window.deleteChurchGroup = async function (jid, name) {
    if (!confirm(`¿Dejar de monitorear "${name}"?`)) return;
    try {
        await fetch('/api/church/groups/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jid })
        });
        loadChurchClasses();
    } catch (e) {
        console.error(e);
    }
};
