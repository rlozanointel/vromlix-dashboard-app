// =========================================================================
// VROMLIX YOUTUBE EXECUTIVE DIGEST VIEW (localhost:8080)
// Bandeja de Lectura Rápida (Visual Chunking) + 1-Click Mark Watched (-4s)
// =========================================================================

let ytCurrentFilter = 'all';
let ytViewMode = 'unread'; // 'unread' or 'history'
let ytSearchQuery = '';
let ytUnreadCache = [];
let ytAllCache = [];
let ytChannelsCache = [];
let ytUnreadLimit = 10;
let ytHistoryLimit = 10;

document.addEventListener('DOMContentLoaded', () => {
    initYouTubeView();
});

function initYouTubeView() {
    loadYouTubeSummaries();

    const scanBtn = document.getElementById('yt-trigger-scan-btn');
    if (scanBtn) {
        scanBtn.addEventListener('click', triggerYouTubeChannelScan);
    }

    const tabUnread = document.getElementById('yt-tab-unread');
    const tabHistory = document.getElementById('yt-tab-history');
    if (tabUnread && tabHistory) {
        tabUnread.addEventListener('click', () => {
            ytViewMode = 'unread';
            ytUnreadLimit = 10;
            updateViewModeUI();
            renderYouTubeView();
        });
        tabHistory.addEventListener('click', () => {
            ytViewMode = 'history';
            ytHistoryLimit = 10;
            updateViewModeUI();
            renderYouTubeView();
        });
    }

    const cardUnread = document.getElementById('yt-metric-card-unread');
    const cardArchived = document.getElementById('yt-metric-card-archived');
    if (cardUnread) {
        cardUnread.addEventListener('click', () => {
            ytViewMode = 'unread';
            ytUnreadLimit = 10;
            updateViewModeUI();
            renderYouTubeView();
        });
    }
    if (cardArchived) {
        cardArchived.addEventListener('click', () => {
            ytViewMode = 'history';
            ytHistoryLimit = 10;
            updateViewModeUI();
            renderYouTubeView();
        });
    }

    const searchInput = document.getElementById('yt-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            ytSearchQuery = (e.target.value || '').toLowerCase().trim();
            renderYouTubeView();
        });
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
            ytUnreadLimit = 10;
            ytHistoryLimit = 10;
            renderYouTubeView();
        });
    });
}

function updateViewModeUI() {
    const tabUnread = document.getElementById('yt-tab-unread');
    const tabHistory = document.getElementById('yt-tab-history');
    if (tabUnread && tabHistory) {
        if (ytViewMode === 'unread') {
            tabUnread.style.background = 'var(--primary-color, #3b82f6)';
            tabUnread.style.color = '#fff';
            tabHistory.style.background = 'transparent';
            tabHistory.style.color = 'var(--text-secondary)';
        } else {
            tabHistory.style.background = 'var(--primary-color, #3b82f6)';
            tabHistory.style.color = '#fff';
            tabUnread.style.background = 'transparent';
            tabUnread.style.color = 'var(--text-secondary)';
        }
    }
}

async function loadYouTubeSummaries() {
    const container = document.getElementById('yt-cards-container');
    if (!container) return;

    try {
        const res = await fetch('/api/youtube/summaries');
        if (!res.ok) throw new Error('No se pudo cargar /api/youtube/summaries');
        const data = await res.json();

        ytUnreadCache = data.unread || [];
        ytAllCache = data.all_summaries || [];
        ytChannelsCache = data.channels || [];
        const stats = data.stats || {};

        const unreadCount = stats.unread_count ?? ytUnreadCache.length;
        const archivedCount = stats.archived_count ?? 0;

        const badgeUnread = document.getElementById('yt-metric-unread');
        const badgeArchived = document.getElementById('yt-metric-archived');
        const badgeChannels = document.getElementById('yt-metric-channels');
        const navBadge = document.getElementById('nav-yt-badge');
        const pillUnread = document.getElementById('yt-pill-unread-count');
        const pillHistory = document.getElementById('yt-pill-history-count');

        if (badgeUnread) badgeUnread.textContent = unreadCount;
        if (badgeArchived) badgeArchived.textContent = archivedCount;
        if (badgeChannels) badgeChannels.textContent = stats.channels_count ?? 17;
        if (pillUnread) pillUnread.textContent = unreadCount;
        if (pillHistory) pillHistory.textContent = archivedCount;

        if (navBadge) {
            navBadge.textContent = unreadCount;
            navBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
        }

        updateViewModeUI();
        renderYouTubeView();
    } catch (err) {
        console.error('Error cargando resúmenes YouTube:', err);
        container.innerHTML = `<div class="agent-error-state">⚠️ Error conectando con el motor de YouTube: ${err.message}</div>`;
    }
}

function getYouTubeItemTimestamp(item) {
    if (item.published_timestamp && typeof item.published_timestamp === 'number' && item.published_timestamp > 0) {
        return item.published_timestamp;
    }
    if (item.published_at) {
        const parsed = new Date(item.published_at).getTime();
        if (!isNaN(parsed) && parsed > 0) return Math.floor(parsed / 1000);
    }
    if (item.upload_date) {
        const parsed = new Date(item.upload_date + 'T00:00:00Z').getTime();
        if (!isNaN(parsed) && parsed > 0) return Math.floor(parsed / 1000);
    }
    return 0;
}

function ytLoadMore(mode) {
    if (mode === 'unread') {
        ytUnreadLimit += 10;
    } else {
        ytHistoryLimit += 10;
    }
    renderYouTubeView();
}

function renderYouTubeView() {
    const container = document.getElementById('yt-cards-container');
    if (!container) return;

    if (ytCurrentFilter === 'channels_list') {
        container.innerHTML = renderMonitoredChannelsGrid();
        return;
    }

    const sourceList = (ytViewMode === 'unread') 
        ? [...ytUnreadCache] 
        : ytAllCache.filter(item => item.status !== 'UNREAD');

    // ORDENAMIENTO CRONOLÓGICO ESTRICTO HASTA EN LOS SEGUNDOS:
    // Pendientes (Bandeja): Del más antiguo al más reciente (ASC)
    // Historial (Archivados): Del más reciente al más antiguo (DESC)
    if (ytViewMode === 'unread') {
        sourceList.sort((a, b) => {
            const diff = getYouTubeItemTimestamp(a) - getYouTubeItemTimestamp(b);
            if (diff !== 0) return diff;
            return (a.video_id || '').localeCompare(b.video_id || '');
        });
    } else {
        sourceList.sort((a, b) => {
            const diff = getYouTubeItemTimestamp(b) - getYouTubeItemTimestamp(a);
            if (diff !== 0) return diff;
            return (b.video_id || '').localeCompare(a.video_id || '');
        });
    }

    const filtered = sourceList.filter(item => {
        // Filtro por categoría inteligente
        if (ytCurrentFilter !== 'all') {
            const cat = (item.category_ui || '').toLowerCase();
            const filter = ytCurrentFilter.toLowerCase();
            if (filter === 'entrevistas' || filter === 'negocios_ia_tech' || filter === 'ia') {
                if (cat !== 'entrevistas' && cat !== 'negocios_ia_tech') return false;
            } else if (filter === 'politica' || filter === 'geopolitica_noticias') {
                if (cat !== 'politica' && cat !== 'geopolitica_noticias') return false;
            } else if (filter === 'ciencia' || filter === 'ciencia_divulgacion') {
                if (cat !== 'ciencia' && cat !== 'ciencia_divulgacion') return false;
            } else if (filter === 'visual' || filter === 'historia_arquitectura') {
                if (cat !== 'visual' && cat !== 'historia_arquitectura') return false;
            } else if (cat !== filter) {
                return false;
            }
        }
        // Filtro por buscador en vivo
        if (ytSearchQuery) {
            const titleMatch = (item.title || '').toLowerCase().includes(ytSearchQuery);
            const chanMatch = (item.channel_name || '').toLowerCase().includes(ytSearchQuery);
            const tldrMatch = (item.tldr || []).some(t => t.toLowerCase().includes(ytSearchQuery));
            const kpMatch = (item.key_points || []).some(k => k.toLowerCase().includes(ytSearchQuery));
            if (!titleMatch && !chanMatch && !tldrMatch && !kpMatch) {
                return false;
            }
        }
        return true;
    });

    if (filtered.length === 0) {
        if (ytViewMode === 'unread') {
            container.innerHTML = `
                <div class="agent-empty-state">
                    <div class="empty-icon">🎬</div>
                    <h3>Bandeja de YouTube al Día</h3>
                    <p>No tienes resúmenes pendientes en esta categoría. El próximo corte automático se ejecutará a las <b>10:00 AM (CDMX)</b>, o puedes pegar cualquier enlace arriba.</p>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="agent-empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>Historial de Videos</h3>
                    <p>No se encontraron videos archivados con los filtros seleccionados.</p>
                </div>
            `;
        }
        return;
    }

    // COLA VISUAL DE 10 VIDEOS (Anti-saturación):
    const isUnread = (ytViewMode === 'unread');
    const currentLimit = isUnread ? ytUnreadLimit : ytHistoryLimit;
    const visibleCards = filtered.slice(0, currentLimit);
    const remainingCount = filtered.length - visibleCards.length;

    let cardsHtml = visibleCards.map(item => renderYouTubeSummaryCard(item)).join('');

    if (remainingCount > 0) {
        const loadMoreLabel = isUnread 
            ? `⬇️ Cargar 10 más en cola (${remainingCount} pendientes restantes)`
            : `⬇️ Cargar 10 más archivados (${remainingCount} restantes)`;
        const loadMoreMode = isUnread ? 'unread' : 'history';
        cardsHtml += `
            <div class="yt-load-more-row">
                <button class="yt-btn-load-more" onclick="ytLoadMore('${loadMoreMode}')">
                    ${loadMoreLabel}
                </button>
            </div>
        `;
    }

    container.innerHTML = cardsHtml;
}

function renderYouTubeSummaryCard(v) {
    const isVisual = v.channel_mode === 'MODO_C_VISUAL';
    const isArchived = v.status !== 'UNREAD';

    const tldrHtml = (v.tldr || []).map(line => `<li>${line}</li>`).join('');
    const kpHtml = (v.key_points || []).map(line => `<li>${line}</li>`).join('');

    // Renderizado progresivo de capítulos (Tufte / Shneiderman: máx 3 visibles, resto bajo acordeón)
    let chaptersHtml = '';
    const allChapters = v.chapters || [];
    if (allChapters.length > 0) {
        const renderPill = (ch) => {
            const sec = ch.sec || 0;
            const tsUrl = `https://www.youtube.com/watch?v=${v.video_id}&t=${sec}s`;
            const titleTooltip = ch.ts ? `Ir al minuto ${ch.ts} en YouTube` : 'Abrir este momento en YouTube';
            return `
                <a href="${tsUrl}" target="_blank" rel="noopener" class="yt-chapter-pill" title="${titleTooltip}">
                    <span class="yt-ch-title">${ch.title}</span>
                </a>
            `;
        };

        if (allChapters.length <= 4) {
            chaptersHtml = allChapters.map(renderPill).join('');
        } else {
            const primary = allChapters.slice(0, 3).map(renderPill).join('');
            const remaining = allChapters.slice(3).map(renderPill).join('');
            chaptersHtml = `
                ${primary}
                <details class="yt-chapters-details">
                    <summary class="yt-chapters-toggle">
                        <span>+${allChapters.length - 3} momentos más</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </summary>
                    <div class="yt-chapters-collapsed-grid">
                        ${remaining}
                    </div>
                </details>
            `;
        }
    }

    // Tooltip no intrusivo con el segundo exacto de publicación (si existe)
    let dateTooltip = `Publicado: ${v.upload_date || ''}`;
    if (v.published_at && !v.published_at.endsWith('T00:00:00Z')) {
        const cleanPub = v.published_at.replace('T', ' ').replace('Z', ' UTC');
        dateTooltip = `Publicado: ${cleanPub}`;
    }

    const noteBtnHtml = v.vault_path ? `
        <a href="/api/open-note?path=${encodeURIComponent(v.vault_path)}" target="_blank" rel="noopener" class="yt-btn yt-btn-note" title="Segundo Cerebro: ${v.vault_path}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>Abrir en .md</span>
        </a>
    ` : '';

    // Veredicto diferencial (Tufte: Eliminar badge si es solo texto redundante invariante)
    const verdictBadgeHtml = (v.verdict_badge && v.verdict_badge !== '🔥 Resumen Ejecutivo')
        ? `<span class="yt-badge yt-badge-verdict">${v.verdict_badge}</span>`
        : '';

    return `
        <article class="yt-summary-card ${isVisual ? 'yt-card-visual' : ''} ${isArchived ? 'yt-card-archived' : ''}" id="yt-card-${v.video_id}">
            <!-- CABECERA DE LA FICHA -->
            <div class="yt-card-top">
                <div class="yt-badges-row">
                    <span class="yt-badge yt-badge-channel">${v.channel_name}</span>
                    ${verdictBadgeHtml}
                    ${isArchived ? `<span class="yt-badge" style="background: rgba(16, 185, 129, 0.15); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3);">✅ Visto / Archivado</span>` : ''}
                </div>
                <div class="yt-meta-right">
                    <span class="yt-duration-pill">⏱️ ${v.duration_str}</span>
                    <span class="yt-date-pill" title="${dateTooltip}">📅 ${v.upload_date || ''}</span>
                </div>
            </div>

            <h3 class="yt-video-title">
                <a href="${v.url_video}" target="_blank" rel="noopener">${v.title}</a>
            </h3>

            <!-- 1. EL NÚCLEO -->
            <div class="yt-section-box yt-box-tldr">
                <div class="yt-section-title">⚡ El Núcleo</div>
                <ul class="yt-bullet-list yt-tldr-list">
                    ${tldrHtml}
                </ul>
            </div>

            <!-- 2. IDEAS PRINCIPALES -->
            <div class="yt-section-box yt-box-keypoints">
                <div class="yt-section-title">🔑 Ideas Principales</div>
                <ul class="yt-bullet-list yt-kp-list">
                    ${kpHtml}
                </ul>
            </div>

            <!-- 3. MAPA RÁPIDO DE MOMENTOS -->
            ${chaptersHtml ? `
                <div class="yt-chapters-block">
                    <div class="yt-chapters-label">⏱️ Momentos Clave:</div>
                    <div class="yt-chapters-grid">
                        ${chaptersHtml}
                    </div>
                </div>
            ` : ''}

            <!-- BARRA DE ACCIONES -->
            <div class="yt-actions-footer">
                ${!isArchived ? `
                    <button class="yt-btn yt-btn-watched" onclick="handleYouTubeCardAction('${v.video_id}', 'watched', '${v.url_mark_watched}')" title="Abre los últimos 8 segundos en YouTube para que quede con barra roja de Visto en tus Suscripciones y quita la ficha de esta bandeja">
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>Visto (Últimos 8s) y Quitar</span>
                    </button>

                    <a href="${v.url_video}" target="_blank" rel="noopener" class="yt-btn yt-btn-open" title="Solo abrir el video en YouTube desde el inicio sin borrar esta ficha">
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        <span>Abrir en YouTube</span>
                    </a>

                    ${noteBtnHtml}

                    <button class="yt-btn yt-btn-dismiss" onclick="handleYouTubeCardAction('${v.video_id}', 'dismiss', '')" title="Solo quitar la ficha de esta bandeja sin abrir YouTube (el respaldo .md permanece en tu Segundo Cerebro)">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                        <span>Solo Quitar</span>
                    </button>
                ` : `
                    <a href="${v.url_video}" target="_blank" rel="noopener" class="yt-btn yt-btn-open" title="Abrir el video en YouTube">
                        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        <span>Ver en YouTube</span>
                    </a>

                    ${noteBtnHtml}

                    <button class="yt-btn yt-btn-dismiss" onclick="handleReactivateCard('${v.video_id}')" title="Mover nuevamente a la bandeja de pendientes">
                        <span>📥 Regresar a Pendientes</span>
                    </button>
                `}
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

    const cards = ytChannelsCache.map((ch, idx) => {
        const isPlaylist = (ch.handle || '').startsWith('playlist:');
        const plId = isPlaylist ? ch.handle.replace('playlist:', '') : '';
        const chUrl = isPlaylist ? `https://www.youtube.com/playlist?list=${plId}` : `https://www.youtube.com/${ch.handle}`;
        const displayBadge = isPlaylist ? '📋 Playlist de Temporada' : (modeBadges[ch.mode] || ch.mode);
        const handleLabel = isPlaylist ? '📋 Playlist' : ch.handle;

        return `
        <div class="yt-channel-item" id="yt-channel-card-${ch.handle.replace(/[^a-zA-Z0-9]/g, '')}">
            <div class="yt-ch-num">#${idx + 1}</div>
            <div class="yt-ch-info">
                <div class="yt-ch-name">${ch.name}</div>
                <div class="yt-ch-handle">
                    <a href="${chUrl}" target="_blank" rel="noopener" style="color: var(--accent-primary); text-decoration: none;">${handleLabel}</a> 
                    · <span>${displayBadge}</span>
                </div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <a href="${chUrl}" target="_blank" rel="noopener" class="yt-icon-btn yt-icon-yt" title="Abrir en YouTube (${ch.name})">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </a>
                <button class="yt-icon-btn yt-icon-trash" title="Dejar de monitorear" onclick="deleteMonitoredChannel('${ch.handle}', '${ch.name.replace(/'/g, "\\'")}')">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </button>
            </div>
        </div>
        `;
    }).join('');

    return `
        <div class="yt-channels-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <h3 style="margin-bottom: 4px; color: var(--text-primary);">📡 Canales & Playlists Monitoreadas (${ytChannelsCache.length} Activos)</h3>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Corte diario: 10:00 AM (CDMX) · Videos normales y en vivos · Sin Shorts</p>
                </div>
            </div>

            <!-- BUSCADOR PARA AGREGAR NUEVO CANAL O PLAYLIST -->
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 22px;">
                <label style="display: block; font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                    ➕ Agregar Canal o Playlist (Escribe el nombre, @handle, o pega el enlace de la playlist):
                </label>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <input type="text" id="yt-channel-search-input" class="yt-quick-url-input" style="flex: 1; min-width: 250px;" placeholder="Ej: Platzi, QuantumFracture, @nombre, o enlace de Playlist de temporada..." onkeydown="if(event.key==='Enter') searchNewYouTubeChannel();">
                    <button id="yt-search-channel-btn" class="btn-primary" style="padding: 9px 18px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; white-space: nowrap;" onclick="searchNewYouTubeChannel();">
                        🔍 Buscar
                    </button>
                </div>
                <div id="yt-search-results-container" style="margin-top: 14px; display: none;"></div>
            </div>

            <!-- GRILLA DE CANALES ACTIVOS -->
            <div class="yt-channels-grid">
                ${cards}
            </div>
        </div>
    `;
}

async function searchNewYouTubeChannel() {
    const input = document.getElementById('yt-channel-search-input');
    const container = document.getElementById('yt-search-results-container');
    const btn = document.getElementById('yt-search-channel-btn');
    if (!input || !container) return;

    const query = input.value.trim();
    if (!query) return;

    if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Buscando...';
    }

    container.style.display = 'block';
    container.innerHTML = `<div style="font-size: 0.88rem; color: var(--text-muted); padding: 8px 0;">🔍 Buscando "${query}" en YouTube...</div>`;

    try {
        const res = await fetch('/api/youtube/channels/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });
        const data = await res.json();
        const candidates = data.candidates || [];

        if (candidates.length === 0) {
            container.innerHTML = `<div style="font-size: 0.88rem; color: var(--accent-warning); padding: 8px 0;">⚠️ No se encontraron canales para "${query}". Intenta escribir el @handle exacto o su enlace.</div>`;
            return;
        }

        const itemsHtml = candidates.map(c => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 8px;">
                <div>
                    <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${c.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        <b>${c.handle}</b> ${c.sample_title ? `· Último video: <i>"${c.sample_title}"</i>` : ''}
                    </div>
                </div>
                <button class="btn-primary" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 700; border-radius: var(--radius-md); cursor: pointer;" onclick="addMonitoredChannel('${c.handle}', '${c.name.replace(/'/g, "\\'")}')">
                    ➕ Agregar Canal
                </button>
            </div>
        `).join('');

        container.innerHTML = `
            <div style="margin-top: 6px;">
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">¿Cuál de estos canales deseas monitorear?</div>
                ${itemsHtml}
            </div>
        `;
    } catch (err) {
        container.innerHTML = `<div style="color: var(--accent-danger); font-size: 0.88rem;">Error buscando: ${err.message}</div>`;
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = '🔍 Buscar Canal';
        }
    }
}

async function addMonitoredChannel(handle, name) {
    try {
        const res = await fetch('/api/youtube/channels/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ handle: handle, name: name })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Error al agregar');

        if (typeof showAgentNotification === 'function') {
            showAgentNotification(`Canal ${name} agregado con éxito`, 'success');
        } else if (typeof showToast === 'function') {
            showToast(`Canal "${name}" agregado al monitoreo`, 'success');
        }
        await loadYouTubeSummaries();
    } catch (err) {
        if (typeof showToast === 'function') {
            showToast(err.message, 'error');
        } else {
            console.error('Error:', err);
        }
    }
}

async function deleteMonitoredChannel(handle, name) {
    const ok = confirm(`¿Estás seguro de que deseas dejar de monitorear el canal "${name}" (${handle})?`);
    if (!ok) return;

    try {
        const res = await fetch('/api/youtube/channels/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ handle: handle })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Error al eliminar');

        if (typeof showAgentNotification === 'function') {
            showAgentNotification(`Canal ${name} eliminado del monitoreo`, 'info');
        } else if (typeof showToast === 'function') {
            showToast(`Canal "${name}" eliminado`, 'info');
        }
        await loadYouTubeSummaries();
    } catch (err) {
        if (typeof showToast === 'function') {
            showToast(err.message, 'error');
        } else {
            console.error('Error:', err);
        }
    }
}


let ytActiveToastTimer = null;

function triggerYouTubeAutoMark(markWatchedUrl, videoId) {
    if (!markWatchedUrl) return;

    // 1. Agregar autoplay=1, mute=1 y el marcador de automatización vromlix_auto=1
    let finalUrl = markWatchedUrl;
    if (!finalUrl.includes('autoplay=')) {
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&vromlix_auto=1';
    } else {
        if (!finalUrl.includes('mute=')) finalUrl += '&mute=1';
        if (!finalUrl.includes('vromlix_auto=')) finalUrl += '&vromlix_auto=1';
    }

    // 2. Abrir como pestaña limpia (_blank sin window features como width/height).
    // Con la preferencia de Firefox 'browser.tabs.loadDivertedInBackground = true',
    // esto abre la pestaña A UN LADO EN SEGUNDO PLANO sin moverte jamás de tu Dashboard.
    try {
        window.open(finalUrl, '_blank');
    } catch (e) {
        console.warn('Error al abrir pestaña:', e);
    }

    // 3. Mantener el foco en la pestaña del Dashboard
    try {
        if (window.focus) window.focus();
    } catch (e) {}

    // 4. Mostrar Toast informativo breve
    try {
        showMarkWatchedToast(4);
    } catch (e) {
        console.warn('Error mostrando toast:', e);
    }
}

function showMarkWatchedToast(seconds = 4) {
    hideMarkWatchedToast();

    const toast = document.createElement('div');
    toast.id = 'yt-mark-toast';
    toast.className = 'yt-mark-toast';
    toast.innerHTML = `
        <div class="yt-toast-spinner"></div>
        <div style="display: flex; flex-direction: column; gap: 2px;">
            <div style="font-weight: 600; color: #f1f5f9;">Pestaña enviada a un lado</div>
            <div style="font-size: 0.8rem; color: #94a3b8;">
                Sincronizando últimos 8s en YouTube en segundo plano...
            </div>
        </div>
        <button class="yt-toast-btn-dismiss" title="Cerrar aviso" onclick="hideMarkWatchedToast()">✕</button>
    `;
    document.body.appendChild(toast);

    if (ytActiveToastTimer) clearTimeout(ytActiveToastTimer);
    ytActiveToastTimer = setTimeout(() => {
        hideMarkWatchedToast();
    }, seconds * 1000);
}

function hideMarkWatchedToast() {
    if (ytActiveToastTimer) {
        clearTimeout(ytActiveToastTimer);
        ytActiveToastTimer = null;
    }
    const toast = document.getElementById('yt-mark-toast');
    if (toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px) scale(0.96)';
        setTimeout(() => {
            if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }
}

async function handleYouTubeCardAction(videoId, actionType, markWatchedUrl) {
    if (actionType === 'watched' && markWatchedUrl) {
        try {
            triggerYouTubeAutoMark(markWatchedUrl, videoId);
        } catch (e) {
            console.warn('Error en triggerYouTubeAutoMark:', e);
        }
    }

    const cardEl = document.getElementById(`yt-card-${videoId}`);
    if (cardEl) {
        cardEl.style.transition = 'all 0.28s ease';
        cardEl.style.opacity = '0';
        cardEl.style.transform = 'translateY(-8px) scale(0.98)';
    }

    // Actualización inmediata de la cola local (deslizar el video #11 hacia la pantalla)
    if (actionType === 'watched' || actionType === 'dismiss') {
        setTimeout(() => {
            ytUnreadCache = ytUnreadCache.filter(item => item.video_id !== videoId);
            const found = ytAllCache.find(item => item.video_id === videoId);
            if (found) {
                found.status = (actionType === 'watched') ? 'READ_WATCHED' : 'DISMISSED';
            }
            const badgeUnread = document.getElementById('yt-metric-unread');
            const pillUnread = document.getElementById('yt-pill-unread-count');
            const navBadge = document.getElementById('nav-yt-badge');
            const count = ytUnreadCache.length;
            if (badgeUnread) badgeUnread.textContent = count;
            if (pillUnread) pillUnread.textContent = count;
            if (navBadge) {
                navBadge.textContent = count;
                navBadge.style.display = count > 0 ? 'inline-flex' : 'none';
            }
            renderYouTubeView();
        }, 150);
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
        }, 300);
    } catch (err) {
        if (typeof showToast === 'function') {
            showToast(err.message, 'error');
        } else {
            console.error('Error:', err);
        }
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

        if (data.video && data.video.cached) {
            if (typeof showAgentNotification === 'function') {
                showAgentNotification('⚡ Video recuperado al instante desde tu Segundo Cerebro (Caché local)', 'success');
            } else if (typeof showToast === 'function') {
                showToast('⚡ Video recuperado al instante (Caché)', 'success');
            }
        } else {
            if (typeof showAgentNotification === 'function') {
                showAgentNotification('✅ Resumen generado y respaldado en tu Segundo Cerebro', 'success');
            } else if (typeof showToast === 'function') {
                showToast('✅ Resumen generado y respaldado', 'success');
            }
        }

        if (input) input.value = '';
        await loadYouTubeSummaries();
    } catch (err) {
        if (typeof showToast === 'function') {
            showToast('No se pudo resumir: ' + err.message, 'error');
        } else {
            console.error('Error:', err);
        }
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
        } else if (typeof showToast === 'function') {
            showToast('Escaneo iniciado en segundo plano', 'info');
        }
        setTimeout(() => {
            loadYouTubeSummaries();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '🔄 Buscar Nuevos Ahora';
            }
        }, 4000);
    } catch (err) {
        if (typeof showToast === 'function') {
            showToast(err.message, 'error');
        } else {
            console.error('Error:', err);
        }
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '🔄 Buscar Nuevos Ahora';
        }
    }
}


async function handleReactivateCard(videoId) {
    try {
        const res = await fetch('/api/youtube/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ video_id: videoId, action: 'unread' })
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Error al reactivar video');
        await loadYouTubeSummaries();
        if (typeof showToast === 'function') {
            showToast('Video reactivado en pendientes', 'success');
        }
    } catch (err) {
        if (typeof showToast === 'function') {
            showToast(err.message, 'error');
        } else {
            console.error('Error:', err);
        }
    }
}

