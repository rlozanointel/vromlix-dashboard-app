// =========================================================================
// VROMLIX OS - CONFERENCIA GENERAL OCTUBRE 2026
// Guía Interactiva de Estudio, Discursos Sintéticos, Citas y Retos de Acción
// =========================================================================

(function() {
    'use strict';

    let currentSessionFilter = 'all';
    let currentCallingFilter = 'all';
    let currentSearchQuery = '';

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initSubnavSwitcher();
        renderConfTalks();
        setupConfEventListeners();
    }

    // -------------------------------------------------------------
    // 1. SELECTOR DE SUB-PESTAÑA (Escrituras vs Conferencia)
    // -------------------------------------------------------------
    function initSubnavSwitcher() {
        const savedView = localStorage.getItem('vromlix_mormon_subview') || 'escrituras';
        window.switchMormonSubview(savedView, false);
    }

    window.switchMormonSubview = function(subviewId, saveState = true) {
        const escriturasPanel = document.getElementById('subview-escrituras');
        const conferenciaPanel = document.getElementById('subview-conferencia');
        const btnEscrituras = document.getElementById('btn-subview-escrituras');
        const btnConferencia = document.getElementById('btn-subview-conferencia');

        if (!escriturasPanel || !conferenciaPanel) return;

        if (subviewId === 'conferencia') {
            escriturasPanel.style.display = 'none';
            conferenciaPanel.style.display = 'block';
            if (btnEscrituras) btnEscrituras.classList.remove('active');
            if (btnConferencia) btnConferencia.classList.add('active');
            if (saveState) localStorage.setItem('vromlix_mormon_subview', 'conferencia');
        } else {
            escriturasPanel.style.display = 'block';
            conferenciaPanel.style.display = 'none';
            if (btnEscrituras) btnEscrituras.classList.add('active');
            if (btnConferencia) btnConferencia.classList.remove('active');
            if (saveState) localStorage.setItem('vromlix_mormon_subview', 'escrituras');
        }
    };

    // -------------------------------------------------------------
    // 2. RENDERIZADO DINÁMICO DE TARJETAS DE DISCURSOS
    // -------------------------------------------------------------
    function renderConfTalks() {
        const container = document.getElementById('conf-talks-container');
        const matchCountEl = document.getElementById('conf-match-count');
        if (!container) return;

        const allTalks = window.CONFERENCIA_DATA || [];
        const q = currentSearchQuery.trim().toLowerCase();

        const filtered = allTalks.filter(talk => {
            // Filtro por sesión
            if (currentSessionFilter !== 'all' && talk.sessionCode !== currentSessionFilter) {
                return false;
            }
            // Filtro por llamamiento
            if (currentCallingFilter !== 'all' && talk.authGroup !== currentCallingFilter) {
                return false;
            }
            // Filtro por texto de búsqueda
            if (q) {
                const combined = [
                    talk.speaker,
                    talk.calling,
                    talk.theme,
                    talk.topic,
                    talk.story,
                    talk.quote,
                    talk.action,
                    (talk.principles || []).join(' ')
                ].join(' ').toLowerCase();

                return combined.includes(q);
            }
            return true;
        });

        if (matchCountEl) {
            matchCountEl.textContent = filtered.length;
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="conf-empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No se encontraron discursos</h3>
                    <p>No hay discursos que coincidan con "${escapeHtml(q)}" en los filtros seleccionados.</p>
                    <button class="btn-clear-conf-filters" onclick="window.clearAllConfFilters()">
                        Restablecer Filtros
                    </button>
                </div>
            `;
            return;
        }

        const html = filtered.map(talk => createTalkCardHtml(talk)).join('');
        container.innerHTML = html;
    }

    function createTalkCardHtml(talk) {
        const numPadded = String(talk.num).padStart(2, '0');
        const sessionBadgeClass = `badge-${talk.sessionCode}`;

        // Principios en viñetas
        const principlesHtml = (talk.principles || []).map(p => {
            return `<li>${escapeHtml(p)}</li>`;
        }).join('');

        return `
            <article class="conf-talk-card" id="conf-talk-${talk.num}">
                <!-- ENCABEZADO DE LA TARJETA -->
                <div class="conf-card-header">
                    <div class="conf-meta-top">
                        <span class="conf-session-tag ${sessionBadgeClass}">
                            ${escapeHtml(talk.badge)}
                        </span>
                        <span class="conf-talk-number">Discurso #${numPadded}</span>
                        ${talk.theme ? `<span class="conf-theme-tag">🏷️ ${escapeHtml(talk.theme)}</span>` : ''}
                    </div>
                    <div class="conf-speaker-title-box">
                        <h3 class="conf-speaker-name">${escapeHtml(talk.speaker)}</h3>
                        <div class="conf-speaker-calling">${escapeHtml(talk.calling)}</div>
                    </div>
                    <div class="conf-talk-headline">
                        ${escapeHtml(talk.topic)}
                    </div>
                </div>

                <!-- CONTENIDO DEL DISCURSO -->
                <div class="conf-card-body">
                    <!-- ANÉCDOTA O RELATO CONMOVEDOR -->
                    ${talk.story ? `
                        <div class="conf-section-box conf-story-box">
                            <div class="conf-section-label">
                                <span class="label-icon">💡</span>
                                <span>Anécdota o Relato Conmovedor</span>
                            </div>
                            <div class="conf-story-text">
                                ${talk.story}
                            </div>
                        </div>
                    ` : ''}

                    <!-- PRINCIPIOS E IDEAS CLAVE -->
                    ${principlesHtml ? `
                        <div class="conf-section-box conf-principles-box">
                            <div class="conf-section-label">
                                <span class="label-icon">📖</span>
                                <span>Principios Doctrinales Clave</span>
                            </div>
                            <ul class="conf-principles-list">
                                ${principlesHtml}
                            </ul>
                        </div>
                    ` : ''}

                    <!-- CITA PARA ATESORAR Y MINISTRAR -->
                    ${talk.quote ? `
                        <div class="conf-quote-box">
                            <div class="conf-quote-header">
                                <span class="conf-quote-label">💬 Cita de Oro para Atesorar</span>
                                <button class="btn-copy-quote" onclick="window.copyConfQuote(${talk.num})" id="btn-copy-${talk.num}" title="Copiar cita con referencia para compartir por WhatsApp">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                    </svg>
                                    <span>Copiar para WhatsApp</span>
                                </button>
                            </div>
                            <blockquote class="conf-quote-text">
                                «${escapeHtml(talk.quote)}»
                            </blockquote>
                        </div>
                    ` : ''}

                    <!-- RETO PRÁCTICO DE ACCIÓN -->
                    ${talk.action ? `
                        <div class="conf-action-box">
                            <div class="conf-action-label">🎯 Reto de Acción Personal o Ministración:</div>
                            <div class="conf-action-text">${escapeHtml(talk.action)}</div>
                        </div>
                    ` : ''}
                </div>

                <!-- ACCIONES Y ENLACES EXTERNOS -->
                <div class="conf-card-footer">
                    <div class="conf-external-links">
                        ${talk.youtubeUrl ? `
                            <a href="${talk.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="conf-link-btn btn-yt" title="Ver discurso oficial en YouTube con audio en español">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span>Ver en YouTube</span>
                            </a>
                        ` : ''}
                        ${talk.churchUrl ? `
                            <a href="${talk.churchUrl}" target="_blank" rel="noopener noreferrer" class="conf-link-btn btn-church" title="Leer texto oficial en ChurchofJesusChrist.org">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"/>
                                </svg>
                                <span>Leer en Iglesia</span>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </article>
        `;
    }

    // -------------------------------------------------------------
    // 3. COPIAR CITA PARA WHATSAPP / MINISTRACIÓN
    // -------------------------------------------------------------
    window.copyConfQuote = function(talkNum) {
        const allTalks = window.CONFERENCIA_DATA || [];
        const talk = allTalks.find(t => t.num === talkNum);
        if (!talk || !talk.quote) return;

        const textToCopy = `«${talk.quote}»\n\n— ${talk.speaker} (${talk.calling})\nDiscurso: "${talk.topic}" • Conferencia General Octubre 2026`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const btn = document.getElementById(`btn-copy-${talkNum}`);
            if (btn) {
                const originalHtml = btn.innerHTML;
                btn.classList.add('copied');
                btn.innerHTML = `<span>✓ ¡Copiada para WhatsApp!</span>`;
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('copied');
                }, 2200);
            }

            if (typeof showToast === 'function') {
                showToast(`📋 Cita de ${talk.speaker} copiada al portapapeles`, 'success');
            }
        }).catch(err => {
            console.error('Error al copiar cita:', err);
        });
    };

    // -------------------------------------------------------------
    // 4. CONFIGURACIÓN DE EVENTOS DE FILTRADO Y BÚSQUEDA
    // -------------------------------------------------------------
    function setupConfEventListeners() {
        const searchInput = document.getElementById('conf-search-input');
        const clearBtn = document.getElementById('conf-clear-search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchQuery = e.target.value;
                if (clearBtn) {
                    clearBtn.style.display = currentSearchQuery ? 'block' : 'none';
                }
                renderConfTalks();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    currentSearchQuery = '';
                    clearBtn.style.display = 'none';
                    searchInput.focus();
                }
                renderConfTalks();
            });
        }

        // Píldoras de filtro por sesión
        const sessionPills = document.querySelectorAll('.conf-filter-pill');
        sessionPills.forEach(pill => {
            pill.addEventListener('click', () => {
                sessionPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentSessionFilter = pill.getAttribute('data-session') || 'all';
                renderConfTalks();
            });
        });

        // Píldoras de filtro por llamamiento
        const callingPills = document.querySelectorAll('.conf-calling-pill');
        callingPills.forEach(pill => {
            pill.addEventListener('click', () => {
                callingPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentCallingFilter = pill.getAttribute('data-calling') || 'all';
                renderConfTalks();
            });
        });
    }

    window.clearAllConfFilters = function() {
        currentSearchQuery = '';
        currentSessionFilter = 'all';
        currentCallingFilter = 'all';

        const searchInput = document.getElementById('conf-search-input');
        const clearBtn = document.getElementById('conf-clear-search-btn');
        if (searchInput) searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';

        document.querySelectorAll('.conf-filter-pill').forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-session') === 'all');
        });
        document.querySelectorAll('.conf-calling-pill').forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-calling') === 'all');
        });

        renderConfTalks();
    };

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
})();
