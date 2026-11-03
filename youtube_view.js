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
let ytChannelsSort = 'default'; // 'default', 'alpha', 'recent'
let ytScanPollTimer = null;

function setChannelsSort(mode) {
    ytChannelsSort = mode;
    renderYouTubeView();
}

function updateYouTubeScanStatusUI(status) {
    const pill = document.getElementById('yt-scan-status-pill');
    const dot = document.getElementById('yt-scan-status-dot');
    const text = document.getElementById('yt-scan-status-text');
    const scanBtn = document.getElementById('yt-trigger-scan-btn');
    if (!pill || !dot || !text) return;

    if (status && status.is_scanning) {
        pill.style.background = 'rgba(245, 158, 11, 0.14)';
        pill.style.color = '#f59e0b';
        pill.style.borderColor = 'rgba(245, 158, 11, 0.35)';
        dot.style.background = '#f59e0b';
        dot.style.animation = 'statusDotPulse 1.4s ease-in-out infinite';
        text.textContent = 'Escaneando...';
        if (scanBtn) {
            scanBtn.disabled = true;
            scanBtn.innerHTML = '⏳ Escaneando...';
        }
    } else {
        pill.style.background = 'rgba(16, 185, 129, 0.12)';
        pill.style.color = '#10b981';
        pill.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        dot.style.background = '#10b981';
        dot.style.animation = 'none';
        text.textContent = (status && status.status_text) ? status.status_text : ((status && status.completed_time) ? `Al día · ${status.completed_time}` : 'Al día');
        if (scanBtn) {
            scanBtn.disabled = false;
            scanBtn.innerHTML = '🔄 Escanear';
        }
    }
}

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
    const cardChannels = document.getElementById('yt-metric-card-channels');

    if (cardUnread) {
        cardUnread.addEventListener('click', () => {
            ytViewMode = 'unread';
            if (ytCurrentFilter === 'channels_list') ytCurrentFilter = 'all';
            ytUnreadLimit = 10;
            updateViewModeUI();
            renderYouTubeView();
        });
    }
    if (cardArchived) {
        cardArchived.addEventListener('click', () => {
            ytViewMode = 'history';
            if (ytCurrentFilter === 'channels_list') ytCurrentFilter = 'all';
            ytHistoryLimit = 10;
            updateViewModeUI();
            renderYouTubeView();
        });
    }
    if (cardChannels) {
        cardChannels.addEventListener('click', () => {
            if (ytCurrentFilter === 'channels_list') {
                ytCurrentFilter = 'all';
            } else {
                ytCurrentFilter = 'channels_list';
            }
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
            updateViewModeUI();
            renderYouTubeView();
        });
    });
}

function updateViewModeUI() {
    const cardUnread = document.getElementById('yt-metric-card-unread');
    const cardArchived = document.getElementById('yt-metric-card-archived');
    const cardChannels = document.getElementById('yt-metric-card-channels');

    [cardUnread, cardArchived, cardChannels].forEach(el => {
        if (el) el.classList.remove('active-metric-card');
    });

    if (ytCurrentFilter === 'channels_list') {
        if (cardChannels) cardChannels.classList.add('active-metric-card');
        document.querySelectorAll('.yt-filter-chip').forEach(b => b.classList.remove('active'));
    } else if (ytViewMode === 'unread') {
        if (cardUnread) cardUnread.classList.add('active-metric-card');
        // Asegurar que chip activo se mantenga
        const activeChip = document.querySelector(`.yt-filter-chip[data-yt-filter="${ytCurrentFilter}"]`);
        if (activeChip) activeChip.classList.add('active');
    } else {
        if (cardArchived) cardArchived.classList.add('active-metric-card');
        const activeChip = document.querySelector(`.yt-filter-chip[data-yt-filter="${ytCurrentFilter}"]`);
        if (activeChip) activeChip.classList.add('active');
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
        if (data.scan_status) {
            updateYouTubeScanStatusUI(data.scan_status);
        }

        const unreadCount = stats.unread_count ?? ytUnreadCache.length;
        const archivedCount = stats.archived_count ?? 0;
        const channelsCount = stats.channels_count ?? (ytChannelsCache.length || 20);

        const badgeUnread = document.getElementById('yt-metric-unread');
        const badgeArchived = document.getElementById('yt-metric-archived');
        const badgeChannels = document.getElementById('yt-metric-channels');
        const navBadge = document.getElementById('nav-yt-badge');

        if (badgeUnread) badgeUnread.textContent = unreadCount;
        if (badgeArchived) badgeArchived.textContent = archivedCount;
        if (badgeChannels) badgeChannels.textContent = channelsCount;

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
        <a href="/api/open-note?path=${encodeURIComponent(v.vault_path)}" target="_blank" rel="noopener" class="yt-btn yt-btn-note yt-btn-icon-only" onclick="openObsidianNote(event, '${v.vault_path.replace(/'/g, "\\'")}')" data-tooltip="Abrir en Obsidian (.md)" aria-label="Abrir en Obsidian">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </a>
    ` : '';

    // Veredicto diferencial (Tufte: Eliminar badge si es solo texto redundante invariante)
    const verdictBadgeHtml = (v.verdict_badge && v.verdict_badge !== '🔥 Resumen Ejecutivo')
        ? `<span class="yt-badge yt-badge-verdict">${v.verdict_badge}</span>`
        : '';

    // Estimación ergonómica de tiempo de lectura (Tufte / Bringhurst: ~190 ppm)
    const allSummaryWords = [...(v.tldr || []), ...(v.key_points || [])].join(' ');
    const wordCount = allSummaryWords.trim().split(/\s+/).filter(Boolean).length;
    const readingMins = Math.max(1, Math.ceil(wordCount / 190));

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
                    <span class="yt-reading-pill" title="Estimado a ~190 palabras por minuto (${wordCount} palabras de síntesis)">📖 ${readingMins} min lectura</span>
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

            <!-- BARRA DE ACCIONES ERGONÓMICA COMPACTA -->
            <div class="yt-actions-footer">
                ${!isArchived ? `
                    <button class="yt-btn yt-btn-watched yt-btn-icon-only" onclick="handleYouTubeCardAction('${v.video_id}', 'watched', '${v.url_mark_watched}')" data-tooltip="Marcar Visto (100% en historial)" aria-label="Marcar Visto">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>

                    <a href="${v.url_video}" target="_blank" rel="noopener" class="yt-btn yt-btn-open yt-btn-icon-only" data-tooltip="Abrir en YouTube" aria-label="Abrir en YouTube">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>

                    <button class="yt-btn yt-btn-copy yt-btn-icon-only" onclick="copyYouTubeLink('${v.video_id}', this)" data-tooltip="Copiar enlace (youtu.be)" aria-label="Copiar enlace">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    </button>

                    ${noteBtnHtml}

                    <button class="yt-btn yt-btn-dismiss yt-btn-icon-only" onclick="handleYouTubeCardAction('${v.video_id}', 'dismiss', '')" data-tooltip="Solo quitar de pendientes" data-tooltip-pos="left" aria-label="Solo quitar">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                    </button>
                ` : `
                    <a href="${v.url_video}" target="_blank" rel="noopener" class="yt-btn yt-btn-open yt-btn-icon-only" data-tooltip="Abrir en YouTube" aria-label="Abrir en YouTube">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </a>

                    <button class="yt-btn yt-btn-copy yt-btn-icon-only" onclick="copyYouTubeLink('${v.video_id}', this)" data-tooltip="Copiar enlace (youtu.be)" aria-label="Copiar enlace">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    </button>

                    ${noteBtnHtml}

                    <button class="yt-btn yt-btn-reactivate yt-btn-icon-only" onclick="handleReactivateCard('${v.video_id}')" data-tooltip="Regresar a pendientes" data-tooltip-pos="left" aria-label="Regresar a pendientes">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h10a5 5 0 0 1 5 5v2"/><polyline points="7 6 3 10 7 14"/></svg>
                    </button>
                `}
            </div>
        </article>
    `;
}

function renderMonitoredChannelsGrid() {
    const modeBadges = {
        'MODO_A_ENTREVISTA': '🎙️ Entrevista',
        'MODO_B_MULTITEMA': '📰 Noticias',
        'MODO_C_VISUAL': '🖼️ Visual'
    };

    let sortedChannels = [...ytChannelsCache];
    if (ytChannelsSort === 'alpha') {
        sortedChannels.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'es', { sensitivity: 'base' }));
    } else if (ytChannelsSort === 'recent') {
        sortedChannels.sort((a, b) => {
            const dA = a.created_at || '';
            const dB = b.created_at || '';
            if (dA && dB) return dB.localeCompare(dA);
            return (b.rowid || 0) - (a.rowid || 0);
        });
    }

    const cards = sortedChannels.map((ch, idx) => {
        const isPlaylist = (ch.handle || '').startsWith('playlist:');
        const plId = isPlaylist ? ch.handle.replace('playlist:', '') : '';
        const chUrl = isPlaylist ? `https://www.youtube.com/playlist?list=${plId}` : `https://www.youtube.com/${ch.handle}`;
        const displayBadge = isPlaylist ? '📋 Playlist' : (modeBadges[ch.mode] || ch.mode);
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
            <!-- BARRA UNIFICADA EN UNA SOLA FILA: VOLVER + TOTAL + ORDENAR + BUSCADOR COMPACTO -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 7px 12px;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-secondary" onclick="ytCurrentFilter='all'; updateViewModeUI(); renderYouTubeView();" style="padding: 5px 11px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 0.80rem;" title="Volver a los videos">
                        ← Videos
                    </button>
                    <span style="font-weight: 700; font-size: 0.84rem; color: var(--text-primary); display: flex; align-items: center; gap: 4px; padding-right: 6px; border-right: 1px solid var(--border-color);">
                        📡 <span>${ytChannelsCache.length} canales</span>
                    </span>
                    <div style="display: inline-flex; align-items: center; gap: 2px;">
                        <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600; margin-right: 2px;">Orden:</span>
                        <button class="btn-secondary" onclick="setChannelsSort('default')" style="padding: 3px 8px; font-size: 0.76rem; border-radius: var(--radius-sm); font-weight: ${ytChannelsSort === 'default' ? '700' : '500'}; background: ${ytChannelsSort === 'default' ? 'var(--accent-primary)' : 'transparent'}; color: ${ytChannelsSort === 'default' ? '#fff' : 'var(--text-secondary)'}; border: 1px solid ${ytChannelsSort === 'default' ? 'var(--accent-primary)' : 'var(--border-color)'}; cursor: pointer;" title="Orden de configuración original">
                            Original
                        </button>
                        <button class="btn-secondary" onclick="setChannelsSort('alpha')" style="padding: 3px 8px; font-size: 0.76rem; border-radius: var(--radius-sm); font-weight: ${ytChannelsSort === 'alpha' ? '700' : '500'}; background: ${ytChannelsSort === 'alpha' ? 'var(--accent-primary)' : 'transparent'}; color: ${ytChannelsSort === 'alpha' ? '#fff' : 'var(--text-secondary)'}; border: 1px solid ${ytChannelsSort === 'alpha' ? 'var(--accent-primary)' : 'var(--border-color)'}; cursor: pointer;" title="Orden alfabético A-Z">
                            A-Z
                        </button>
                        <button class="btn-secondary" onclick="setChannelsSort('recent')" style="padding: 3px 8px; font-size: 0.76rem; border-radius: var(--radius-sm); font-weight: ${ytChannelsSort === 'recent' ? '700' : '500'}; background: ${ytChannelsSort === 'recent' ? 'var(--accent-primary)' : 'transparent'}; color: ${ytChannelsSort === 'recent' ? '#fff' : 'var(--text-secondary)'}; border: 1px solid ${ytChannelsSort === 'recent' ? 'var(--accent-primary)' : 'var(--border-color)'}; cursor: pointer;" title="Canales agregados recientemente primero">
                            Recientes
                        </button>
                    </div>
                </div>

                <!-- BUSCADOR COMPACTO EN LA MISMA LÍNEA -->
                <div style="display: flex; align-items: center; gap: 6px; position: relative; min-width: 250px; max-width: 360px; flex: 1;">
                    <input type="text" id="yt-channel-search-input" class="yt-quick-url-input" style="padding: 4px 10px; font-size: 0.80rem; height: 30px; width: 100%; border-radius: var(--radius-md);" placeholder="➕ Canal (@handle, nombre o URL)..." onkeydown="if(event.key==='Enter') searchNewYouTubeChannel();">
                    <button id="yt-search-channel-btn" class="btn-primary" style="padding: 4px 11px; height: 30px; border-radius: var(--radius-md); font-size: 0.80rem; font-weight: 600; cursor: pointer; white-space: nowrap;" onclick="searchNewYouTubeChannel();">
                        Buscar
                    </button>
                    <div id="yt-search-results-container" style="position: absolute; top: 35px; right: 0; width: 100%; min-width: 310px; max-height: 380px; overflow-y: auto; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); box-shadow: 0 10px 28px rgba(0,0,0,0.45); z-index: 100; display: none; padding: 10px;"></div>
                </div>
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
        btn.textContent = '⏳ ...';
    }

    container.style.display = 'block';
    container.innerHTML = `<div style="font-size: 0.85rem; color: var(--text-muted); padding: 8px 0;">🔍 Buscando "${query}" en YouTube...</div>`;

    try {
        const res = await fetch('/api/youtube/channels/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query })
        });
        const data = await res.json();
        const candidates = data.candidates || [];

        if (candidates.length === 0) {
            container.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 0.82rem; color: var(--accent-warning);">⚠️ Sin resultados</span>
                    <button onclick="document.getElementById('yt-search-results-container').style.display='none'" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.95rem;">✕</button>
                </div>
                <div style="font-size: 0.80rem; color: var(--text-muted);">Prueba con el @handle o URL exacta del canal.</div>
            `;
            return;
        }

        const itemsHtml = candidates.map(c => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 6px; gap: 8px;">
                <div style="min-width: 0; flex: 1;">
                    <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        <b>${c.handle}</b> ${c.sample_title ? `· "${c.sample_title}"` : ''}
                    </div>
                </div>
                <button class="btn-primary" style="padding: 4px 10px; font-size: 0.78rem; font-weight: 600; border-radius: var(--radius-sm); cursor: pointer; white-space: nowrap;" onclick="addMonitoredChannel('${c.handle}', '${c.name.replace(/'/g, "\\'")}')">
                    + Agregar
                </button>
            </div>
        `).join('');

        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">
                <span style="font-size: 0.80rem; font-weight: 700; color: var(--accent-primary);">Canales encontrados:</span>
                <button onclick="document.getElementById('yt-search-results-container').style.display='none'" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.95rem; padding: 0 4px;" title="Cerrar">✕</button>
            </div>
            ${itemsHtml}
        `;
    } catch (err) {
        container.innerHTML = `<div style="color: var(--accent-danger); font-size: 0.82rem;">Error buscando: ${err.message}</div>`;
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = 'Buscar';
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

        const container = document.getElementById('yt-search-results-container');
        if (container) container.style.display = 'none';
        const input = document.getElementById('yt-channel-search-input');
        if (input) input.value = '';

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
                Sincronizando 100% en historial de YouTube en segundo plano...
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

function smoothScrollToCard(cardIndex = 0, fallbackY = null) {
    requestAnimationFrame(() => {
        setTimeout(() => {
            const container = document.getElementById('yt-cards-container');
            if (!container) return;
            const cards = container.querySelectorAll('.yt-summary-card');
            const target = cards[cardIndex] || cards[cards.length - 1];
            if (target) {
                const rect = target.getBoundingClientRect();
                // 85px de holgura para la barra superior fija (.main-nav-bar) + margen estético
                const targetY = Math.max(0, window.scrollY + rect.top - 85);
                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });
            } else if (fallbackY !== null) {
                window.scrollTo({
                    top: fallbackY,
                    behavior: 'smooth'
                });
            }
        }, 15);
    });
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
    let cardIndex = 0;
    let fallbackY = null;

    if (cardEl) {
        const container = document.getElementById('yt-cards-container');
        if (container) {
            const allCards = Array.from(container.querySelectorAll('.yt-summary-card'));
            const foundIdx = allCards.indexOf(cardEl);
            if (foundIdx !== -1) cardIndex = foundIdx;
        }
        fallbackY = Math.max(0, window.scrollY + cardEl.getBoundingClientRect().top - 85);
        cardEl.style.transition = 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
        cardEl.style.opacity = '0';
        cardEl.style.transform = 'translateY(-8px) scale(0.98)';
    }

    // Actualización inmediata de la cola local (deslizar el siguiente video al lugar del visto)
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
            const badgeArchived = document.getElementById('yt-metric-archived');
            const pillHistory = document.getElementById('yt-pill-history-count');

            const count = ytUnreadCache.length;
            if (badgeUnread) badgeUnread.textContent = count;
            if (pillUnread) pillUnread.textContent = count;
            if (navBadge) {
                navBadge.textContent = count;
                navBadge.style.display = count > 0 ? 'inline-flex' : 'none';
            }
            if (actionType === 'watched' && badgeArchived) {
                const currentArchived = parseInt(badgeArchived.textContent, 10) || 0;
                badgeArchived.textContent = currentArchived + 1;
                if (pillHistory) pillHistory.textContent = currentArchived + 1;
            }

            renderYouTubeView();
            smoothScrollToCard(cardIndex, fallbackY);
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
        setTimeout(() => {
            loadYouTubeSummaries();
        }, 300);
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
    const totalChannels = (ytChannelsCache && ytChannelsCache.length) ? ytChannelsCache.length : 20;
    updateYouTubeScanStatusUI({ is_scanning: true });

    try {
        if (typeof showToast === 'function') {
            showToast(`⏳ Escaneando ${totalChannels} canales en segundo plano...`, 'info');
        }
        const res = await fetch('/api/youtube/trigger-scan', { method: 'POST' });
        const data = await res.json();

        // Polling no bloqueante en segundo plano (revisa cada 5s sin congelar la pantalla)
        if (ytScanPollTimer) clearInterval(ytScanPollTimer);
        ytScanPollTimer = setInterval(async () => {
            try {
                const sRes = await fetch('/api/youtube/scan-status');
                if (!sRes.ok) return;
                const status = await sRes.json();
                if (!status.is_scanning) {
                    clearInterval(ytScanPollTimer);
                    ytScanPollTimer = null;
                    updateYouTubeScanStatusUI(status);
                    loadYouTubeSummaries();
                    const newCount = status.new_videos_count || 0;
                    const timeLabel = status.completed_time ? ` (${status.completed_time})` : '';
                    const msg = newCount > 0 
                        ? `✅ Escaneo completado: ${newCount} videos nuevos${timeLabel}` 
                        : `✅ Todo al día: sin videos pendientes${timeLabel}`;
                    if (typeof showToast === 'function') {
                        showToast(msg, 'success');
                    }
                } else {
                    updateYouTubeScanStatusUI(status);
                }
            } catch (pollErr) {
                console.warn('Error verificando estado de escaneo:', pollErr);
            }
        }, 5000);
    } catch (err) {
        if (typeof showToast === 'function') {
            showToast(err.message, 'error');
        } else {
            console.error('Error:', err);
        }
        updateYouTubeScanStatusUI({ is_scanning: false, status_text: 'Error en escaneo' });
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

async function copyYouTubeLink(videoId, btnEl) {
    if (!videoId) return;
    const shareUrl = `https://youtu.be/${videoId}`;
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareUrl);
        } else {
            const ta = document.createElement('textarea');
            ta.value = shareUrl;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }

        if (typeof showToast === 'function') {
            showToast('📋 Enlace de YouTube copiado al portapapeles', 'success');
        }

        if (btnEl) {
            btnEl.classList.add('copied');
            const originalTooltip = btnEl.getAttribute('data-tooltip') || 'Copiar enlace';
            btnEl.setAttribute('data-tooltip', '¡Copiado!');
            const originalHtml = btnEl.innerHTML;
            btnEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
            setTimeout(() => {
                btnEl.classList.remove('copied');
                btnEl.setAttribute('data-tooltip', originalTooltip);
                btnEl.innerHTML = originalHtml;
            }, 1800);
        }
    } catch (err) {
        console.error('Error copiando link:', err);
        if (typeof showToast === 'function') {
            showToast('No se pudo copiar el enlace', 'error');
        }
    }
}

async function openObsidianNote(evt, vaultPath) {
    if (evt) {
        if (evt.preventDefault) evt.preventDefault();
        if (evt.stopPropagation) evt.stopPropagation();
    }
    if (!vaultPath) {
        if (typeof showToast === 'function') showToast('No hay nota asociada a este video', 'error');
        return;
    }
    try {
        if (typeof showToast === 'function') {
            showToast('🧠 Abriendo nota en Obsidian...', 'info', 2000);
        }
        const res = await fetch(`/api/open-note?path=${encodeURIComponent(vaultPath)}&format=json`);
        const data = await res.json();
        if (!res.ok || !data.success) {
            throw new Error(data.error || 'No se pudo abrir la nota');
        }
        if (typeof showToast === 'function') {
            showToast('✅ Nota abierta en Obsidian', 'success', 3000);
        }
    } catch (err) {
        console.warn('Fallback abriendo nota:', err);
        window.open(`/api/open-note?path=${encodeURIComponent(vaultPath)}`, '_blank');
    }
}

