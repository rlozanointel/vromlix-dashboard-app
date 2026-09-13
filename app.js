
function openYtVideo(url) {
    window.open(url, '_blank');
}
/* -------------------------------------------------------------
   VROMLIX OS Light Dashboard JS
   Core Interaction Engine - Version 1.3
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    initMainNavigation();
    initClock();
    initWhiteboard();
    initTasks();
    initPrayers();
    initClasses();
    initMedia();
    initDownloads();
    initChats();
    initPrompts();
    initTranslator();
});

// ==========================================
// MAIN NAVIGATION ENGINE (MENÚS/PÁGINAS UNIFICADAS)
// ==========================================
function initMainNavigation() {
    const navButtons = document.querySelectorAll('.nav-tab-btn');
    const views = document.querySelectorAll('.dashboard-view');
    const savedView = localStorage.getItem('activeDashboardView') || 'view-principal';

    function switchView(viewId) {
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-view') === viewId);
        });
        views.forEach(v => {
            v.classList.toggle('active', v.id === viewId);
        });
        localStorage.setItem('activeDashboardView', viewId);
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');
            switchView(targetView);
            window.location.hash = targetView;
        });
    });

    const hashView = window.location.hash.replace('#', '');
    if (hashView && document.getElementById(hashView)) {
        switchView(hashView);
    } else if (document.getElementById(savedView)) {
        switchView(savedView);
    }
}

// ==========================================
// UTILITIES & NOTIFICATIONS
// ==========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') {
        icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else {
        icon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    }
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s reverse ease-in forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2700);
}

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================
// BINARY CLOCK (Puebla / CDMX Timezone - 6 bits Aligned)
// ==========================================
function initClock() {
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');
    
    function setBits(rowId, val, numBits) {
        const row = document.getElementById(rowId);
        if (!row) return;
        const bits = row.querySelectorAll('.bit');
        
        for (let i = 0; i < numBits; i++) {
            // Power of 2 from left to right (highest to lowest, e.g. 32, 16, 8, 4, 2, 1)
            const power = 1 << (numBits - 1 - i);
            const bitEl = bits[i];
            if (bitEl) {
                if ((val & power) !== 0) {
                    bitEl.classList.add('active');
                } else {
                    bitEl.classList.remove('active');
                }
            }
        }
    }

    function updateClock() {
        const now = new Date();
        
        // Format time strictly to Mexico City (Puebla) timezone
        const options = { timeZone: 'America/Mexico_City', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const parts = new Intl.DateTimeFormat('es-MX', options).formatToParts(now);
        
        let hour = 0, minute = 0, second = 0;
        for (const part of parts) {
            if (part.type === 'hour') hour = parseInt(part.value, 10);
            else if (part.type === 'minute') minute = parseInt(part.value, 10);
            else if (part.type === 'second') second = parseInt(part.value, 10);
        }
        
        // Update Aligned Binary LEDs (6 bits for all rows)
        setBits('binary-hours', hour, 6);
        setBits('binary-minutes', minute, 6);
        setBits('binary-seconds', second, 6);
        
        // Update Digital Text Display (element may not exist if hidden in layout)
        if (timeEl) {
            timeEl.textContent = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
        }
        
        // Date display
        if (dateEl) {
            const dateOptions = { timeZone: 'America/Mexico_City', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('es-MX', dateOptions);
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// ==========================================
// WHITEBOARD / APUNTES RÁPIDOS
// ==========================================
function initWhiteboard() {
    const area = document.getElementById('whiteboard-area');
    if (!area) return;
    const status = document.getElementById('save-status');
    
    // Load existing notes
    fetch('/api/whiteboard')
        .then(res => res.json())
        .then(data => {
            if (data.text && area) area.value = data.text;
        })
        .catch(err => console.error("Error cargando notas rápidas:", err));

    // Debounced Auto-save (saves 750ms after typing stops)
    const saveNotes = debounce(() => {
        if (!status || !area) return;
        status.textContent = 'Guardando...';
        status.className = 'status-indicator saving';
        
        fetch('/api/whiteboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: area.value })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                status.textContent = 'Guardado';
                status.className = 'status-indicator saved';
            } else {
                status.textContent = 'Error';
                status.className = 'status-indicator error';
            }
        })
        .catch(err => {
            console.error("Error guardando notas:", err);
            status.textContent = 'Error';
            status.className = 'status-indicator error';
        });
    }, 750);

    area.addEventListener('input', saveNotes);
}

// ==========================================
// TASKS ENGINE (PIZARRÓN SEMANAL DE 4 CAMPOS, ORDEN CRONOLÓGICO Y ALERTAS VISUALES)
// ==========================================
function initTasks() {
    let tasksState = {
        today: [],
        weekly: {
            lunes: [], martes: [], miercoles: [], jueves: [], viernes: [], sabado: [], domingo: [], antigravity: []
        }
    };

    // Modal elements
    const taskModal = document.getElementById("task-modal");
    const modalCategory = document.getElementById("modal-task-category");
    const modalTitle = document.getElementById("modal-task-title");
    const modalTimeInput = document.getElementById("modal-task-time-input");
    const modalTitleInput = document.getElementById("modal-task-title-input");
    const modalDetailsInput = document.getElementById("modal-task-details-input");
    const modalActionsInput = document.getElementById("modal-task-actions-input");
    const closeModalBtn = document.getElementById("close-task-modal-btn");
    const saveModalBtn = document.getElementById("save-modal-task-btn");
    const deleteModalBtn = document.getElementById("delete-modal-task-btn");

    let currentEditingLocation = { day: null, index: null };

    // Days mapping to match Date.getDay() (Sunday is 0, Monday is 1, etc.)
    const daysOfWeek = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

    function openTaskModal(day, index) {
        currentEditingLocation = { day, index };
        const taskObj = tasksState.weekly[day] ? tasksState.weekly[day][index] : null;
        if (!taskObj) return;

        if (modalCategory) modalCategory.textContent = day === "antigravity" ? "Proyecto / Meta" : day.toUpperCase();
        if (modalTitle) modalTitle.textContent = taskObj.title || "Detalle del Pendiente";
        
        if (modalTimeInput) modalTimeInput.value = taskObj.time || "";
        if (modalTitleInput) modalTitleInput.value = taskObj.title || taskObj.text || "";
        if (modalDetailsInput) modalDetailsInput.value = taskObj.details || "";
        if (modalActionsInput) modalActionsInput.value = taskObj.action_items || "";
        
        if (taskModal) taskModal.classList.remove("hidden");
    }

    function closeTaskModal() {
        if (taskModal) taskModal.classList.add("hidden");
        currentEditingLocation = { day: null, index: null };
    }

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeTaskModal);
    
    if (taskModal) {
        taskModal.addEventListener("click", (e) => {
            if (e.target === taskModal) closeTaskModal();
        });
    }

    if (saveModalBtn) {
        saveModalBtn.addEventListener("click", () => {
            const { day, index } = currentEditingLocation;
            if (tasksState.weekly[day] && tasksState.weekly[day][index]) {
                const item = tasksState.weekly[day][index];
                item.time = modalTimeInput ? modalTimeInput.value.trim() : "";
                item.title = modalTitleInput ? modalTitleInput.value.trim() : "";
                item.details = modalDetailsInput ? modalDetailsInput.value.trim() : "";
                item.action_items = modalActionsInput ? modalActionsInput.value.trim() : "";
            }
            saveTasks();
            renderWeeklyTasks();
            closeTaskModal();
            showToast("Pendiente actualizado", "success");
        });
    }

    if (deleteModalBtn) {
        deleteModalBtn.addEventListener("click", () => {
            const { day, index } = currentEditingLocation;
            if (tasksState.weekly[day] && tasksState.weekly[day][index]) {
                tasksState.weekly[day].splice(index, 1);
            }
            saveTasks();
            renderWeeklyTasks();
            closeTaskModal();
            showToast("Pendiente eliminado", "success");
        });
    }

    // Save tasks state to API and LocalStorage (Two-Way Sync)
    function saveTasks() {
        try {
            localStorage.setItem('vromlix_tasks', JSON.stringify(tasksState));
        } catch(e) { console.error("Error guardando tareas en LocalStorage:", e); }

        fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tasksState)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Tareas sincronizadas exitosamente con servidor local.");
        })
        .catch(err => {
            console.log("Servidor local no alcanzable, tareas guardadas localmente en celular.");
        });
    }

    // Load tasks with LocalStorage + Server + INITIAL_DASHBOARD_DATA fallback
    function loadTasks() {
        const localSaved = localStorage.getItem('vromlix_tasks');
        if (localSaved) {
            try {
                tasksState = JSON.parse(localSaved);
                renderWeeklyTasks();
            } catch(e) {}
        }

        fetch("/api/tasks")
            .then(res => res.json())
            .then(data => {
                if (data && data.weekly) {
                    tasksState = data;
                    localStorage.setItem('vromlix_tasks', JSON.stringify(tasksState));
                    renderWeeklyTasks();
                }
            })
            .catch(err => {
                if (!localSaved && window.INITIAL_DASHBOARD_DATA && window.INITIAL_DASHBOARD_DATA.tasks) {
                    tasksState = window.INITIAL_DASHBOARD_DATA.tasks;
                    renderWeeklyTasks();
                }
            });
    }

    // Helper to sort tasks chronologically by time
    function sortTasksByTime(taskList) {
        return taskList.sort((a, b) => {
            const timeA = a.time || "";
            const timeB = b.time || "";
            if (!timeA && !timeB) return 0;
            if (!timeA) return 1;
            if (!timeB) return -1;
            return timeA.localeCompare(timeB);
        });
    }

    // WEEKLY TASKS (GOOGLE CALENDAR STYLE + 4 FIELDS + TODAY HIGHLIGHT + ACTION ALERTS)
    function renderWeeklyTasks() {
        const todayDayName = daysOfWeek[new Date().getDay()];
        const columns = document.querySelectorAll(".weekly-column");

        columns.forEach(col => {
            const day = col.getAttribute("data-day");
            const listEl = col.querySelector(".weekly-task-list");
            const inputEl = col.querySelector(".weekly-input");
            
            // Highlight today column
            if (day === todayDayName) {
                col.classList.add("is-today");
                const titleEl = col.querySelector(".column-title");
                if (titleEl && !titleEl.querySelector(".today-badge")) {
                    const badge = document.createElement("span");
                    badge.className = "today-badge";
                    badge.textContent = "HOY";
                    titleEl.appendChild(badge);
                }
            } else {
                col.classList.remove("is-today");
                const badge = col.querySelector(".today-badge");
                if (badge) badge.remove();
            }

            if (!listEl) return;
            listEl.innerHTML = "";
            
            let dayTasks = tasksState.weekly[day] || [];
            
            // Ensure legacy text items migrate to 4-field schema cleanly
            dayTasks = dayTasks.map(t => {
                if (typeof t === "string") return { time: "", title: t, details: "", action_items: "", completed: false };
                if (!t.title && t.text) {
                    // Extract HH:MM if text starts with "10:30 — Title"
                    const match = t.text.match(/^(\d{1,2}:\d{2})\s*[—\-]\s*(.*)$/);
                    if (match) {
                        t.time = match[1];
                        t.title = match[2];
                    } else {
                        t.title = t.text;
                    }
                }
                if (!t.action_items) t.action_items = "";
                return t;
            });

            // Sort chronologically by time
            sortTasksByTime(dayTasks);
            tasksState.weekly[day] = dayTasks;

            dayTasks.forEach((task, idx) => {
                const hasActions = task.action_items && task.action_items.trim() !== "" && !task.completed;
                const item = document.createElement("div");
                item.className = `weekly-task-item ${task.completed ? "completed" : ""} ${hasActions ? "has-pending-actions" : ""}`;
                
                const content = document.createElement("div");
                content.className = "weekly-task-content";
                
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "task-checkbox";
                checkbox.checked = !!task.completed;
                checkbox.addEventListener("click", (e) => {
                    e.stopPropagation();
                    tasksState.weekly[day][idx].completed = !tasksState.weekly[day][idx].completed;
                    renderWeeklyTasks();
                    saveTasks();
                });
                
                const txt = document.createElement("span");
                txt.className = "weekly-task-text";
                const displayTitle = task.time ? `${task.time} — ${task.title || ""}` : (task.title || "");
                txt.textContent = displayTitle;

                content.appendChild(checkbox);
                content.appendChild(txt);

                // Visual Alert Badge for Pending Action Items (Campo 4)
                if (hasActions) {
                    const alertBadge = document.createElement("span");
                    alertBadge.className = "action-alert-badge";
                    alertBadge.title = "Tiene pendientes o tareas a realizar";
                    alertBadge.innerHTML = `⚡ Pendiente`;
                    content.appendChild(alertBadge);
                } else if (task.details && task.details.trim() !== "") {
                    const detailBadge = document.createElement("span");
                    detailBadge.className = "task-detail-icon";
                    detailBadge.title = "Tiene detalles (clic para ver)";
                    detailBadge.textContent = "📝 ver";
                    content.appendChild(detailBadge);
                }

                item.appendChild(content);

                // Open modal on click
                item.addEventListener("click", (e) => {
                    if (e.target.classList.contains("task-checkbox") || e.target.classList.contains("weekly-task-delete")) return;
                    openTaskModal(day, idx);
                });
                
                // Delete Button
                const del = document.createElement("span");
                del.className = "weekly-task-delete";
                del.textContent = "×";
                del.addEventListener("click", (e) => {
                    e.stopPropagation();
                    tasksState.weekly[day].splice(idx, 1);
                    renderWeeklyTasks();
                    saveTasks();
                });
                
                item.appendChild(del);
                listEl.appendChild(item);
            });
            
            if (inputEl) {
                inputEl.onkeydown = null;
                inputEl.onkeydown = (e) => {
                    if (e.key === "Enter" && inputEl.value.trim() !== "") {
                        if (!tasksState.weekly[day]) tasksState.weekly[day] = [];
                        
                        const inputVal = inputEl.value.trim();
                        let newTime = "";
                        let newTitle = inputVal;
                        
                        const match = inputVal.match(/^(\d{1,2}:\d{2})\s*[—\-]?\s*(.*)$/);
                        if (match) {
                            newTime = match[1];
                            newTitle = match[2] || inputVal;
                        }

                        tasksState.weekly[day].push({
                            time: newTime,
                            title: newTitle,
                            details: "",
                            action_items: "",
                            completed: false
                        });
                        inputEl.value = "";
                        renderWeeklyTasks();
                        saveTasks();
                    }
                };
            }
        });
    }

    loadTasks();
}

// ==========================================
// ORACIONES SUD (CLICK TO COPY)
// ==========================================
function initPrayers() {
    const container = document.getElementById('prayers-list');
    const searchInput = document.getElementById('prayer-search');
    let prayersList = [];

    function renderPrayers(filter = '') {
        container.innerHTML = '';
        const filtered = prayersList.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
        
        if (filtered.length === 0) {
            container.innerHTML = '<div style="color: hsl(220, 15%, 50%); font-size: 0.85rem; padding: 10px;">Ninguna oración coincide con la búsqueda.</div>';
            return;
        }

        filtered.forEach((prayer, idx) => {
            const card = document.createElement('div');
            card.className = 'prayer-group-card';
            card.style.cssText = 'padding: 0; overflow: hidden; border-radius: 12px; margin-bottom: 12px;';

            const header = document.createElement('div');
            header.style.cssText = 'padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; background: hsla(230, 20%, 15%, 0.4); transition: background 0.2s;';
            header.innerHTML = `
                <span style="font-size: 0.95rem; font-weight: 600; color: hsl(220, 15%, 95%);">${prayer.title}</span>
                <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s; color: hsl(220, 10%, 50%);"><polyline points="6 9 12 15 18 9"></polyline></svg>
            `;

            const body = document.createElement('div');
            body.className = 'card-body';
            body.style.cssText = 'max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: hsla(230, 20%, 10%, 0.2);';

            const content = document.createElement('div');
            content.style.cssText = 'padding: 16px; border-top: 1px solid hsla(0, 0%, 100%, 0.03);';

            if (prayer.body.includes('###')) {
                const parts = prayer.body.split(/###\s+/);
                parts.forEach(part => {
                    const lines = part.trim().split('\n');
                    const subTitle = lines[0].trim();
                    const subBody = lines.slice(1).join('\n').trim();
                    
                    if (subTitle && subBody) {
                        const subDetails = document.createElement('details');
                        subDetails.style.cssText = 'margin-bottom: 10px; border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; background: hsla(230, 20%, 12%, 0.4);';
                        
                        const subSummary = document.createElement('summary');
                        subSummary.style.cssText = 'font-weight: 600; font-size: 0.9rem; color: var(--accent-primary); cursor: pointer; outline: none; margin-bottom: 6px;';
                        subSummary.textContent = subTitle;
                        
                        const subContent = document.createElement('div');
                        subContent.style.cssText = 'margin-top: 8px; font-size: 0.88rem; color: hsl(220, 10%, 90%); line-height: 1.5; white-space: pre-wrap;';
                        subContent.textContent = subBody;

                        const copyBtn = document.createElement('button');
                        copyBtn.className = 'btn-copy';
                        copyBtn.style.cssText = 'margin-top: 10px; padding: 6px 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border: 1px solid var(--border-color); border-radius: 6px; background: rgba(255,255,255,0.03); color: white; cursor: pointer;';
                        copyBtn.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                            <span>Copiar</span>
                        `;
                        copyBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(subBody)
                                .then(() => {
                                    copyBtn.classList.add('copied');
                                    copyBtn.style.borderColor = 'var(--accent-success)';
                                    copyBtn.style.background = 'hsla(145, 80%, 45%, 0.15)';
                                    showToast(`Copiado: "${prayer.title} - ${subTitle}"`);
                                    setTimeout(() => {
                                        copyBtn.classList.remove('copied');
                                        copyBtn.style.borderColor = '';
                                        copyBtn.style.background = '';
                                    }, 2000);
                                });
                        });
                        
                        subContent.appendChild(copyBtn);
                        subDetails.appendChild(subSummary);
                        subDetails.appendChild(subContent);
                        content.appendChild(subDetails);
                    }
                });
            } else {
                const singleContent = document.createElement('div');
                singleContent.style.cssText = 'font-size: 0.88rem; color: hsl(220, 10%, 90%); line-height: 1.5; white-space: pre-wrap;';
                singleContent.textContent = prayer.body;

                const copyBtn = document.createElement('button');
                copyBtn.className = 'btn-copy';
                copyBtn.style.cssText = 'margin-top: 10px; padding: 6px 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; border: 1px solid var(--border-color); border-radius: 6px; background: rgba(255,255,255,0.03); color: white; cursor: pointer;';
                copyBtn.innerHTML = `
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                    <span>Copiar</span>
                `;
                copyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(prayer.body)
                        .then(() => {
                            copyBtn.classList.add('copied');
                            copyBtn.style.borderColor = 'var(--accent-success)';
                            copyBtn.style.background = 'hsla(145, 80%, 45%, 0.15)';
                            showToast(`Copiado: "${prayer.title}"`);
                            setTimeout(() => {
                                copyBtn.classList.remove('copied');
                                copyBtn.style.borderColor = '';
                                copyBtn.style.background = '';
                            }, 2000);
                        });
                });
                
                singleContent.appendChild(copyBtn);
                content.appendChild(singleContent);
            }

            body.appendChild(content);
            card.appendChild(header);
            card.appendChild(body);
            container.appendChild(card);

            header.addEventListener('click', () => {
                const chevron = header.querySelector('.chevron');
                const isExpanded = card.classList.toggle('expanded');
                
                if (isExpanded) {
                    chevron.style.transform = 'rotate(180deg)';
                    chevron.style.color = 'var(--accent-primary)';
                    body.style.maxHeight = body.scrollHeight + "px";
                    
                    const onTransitionEnd = () => {
                        if (card.classList.contains('expanded')) {
                            body.style.maxHeight = 'none';
                        }
                        body.removeEventListener('transitionend', onTransitionEnd);
                    };
                    body.addEventListener('transitionend', onTransitionEnd);
                } else {
                    body.style.maxHeight = body.scrollHeight + "px";
                    body.offsetHeight; 
                    chevron.style.transform = '';
                    chevron.style.color = '';
                    body.style.maxHeight = '0';
                }
            });
        });
    }

    fetch('/api/prayers')
        .then(res => res.json())
        .then(data => {
            prayersList = data.prayers || [];
            prayersList.sort((a, b) => {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                const aIsGuide = aTitle.includes('guía') || aTitle.includes('guia');
                const bIsGuide = bTitle.includes('guía') || bTitle.includes('guia');
                
                if (aIsGuide && !bIsGuide) return -1;
                if (!aIsGuide && bIsGuide) return 1;
                return 0;
            });
            renderPrayers();
        })
        .catch(err => {
            console.warn("API de oraciones no disponible, usando respaldo PWA:", err);
            if (window.INITIAL_DASHBOARD_DATA && window.INITIAL_DASHBOARD_DATA.prayers) {
                prayersList = window.INITIAL_DASHBOARD_DATA.prayers;
                renderPrayers();
            } else {
                container.innerHTML = '<div style="color: var(--accent-danger); font-size: 0.85rem; padding: 10px;">Error al cargar las oraciones desde oraciones.md</div>';
            }
        });

    searchInput.addEventListener('input', (e) => {
        renderPrayers(e.target.value);
    });
}

// ==========================================
// MEDIA (MOVIES & SERIES ASC SCORE, NO AL DÍA, FILTROS Y OCULTADOS)
// ==========================================
function initMedia() {
    const moviesContainer = document.getElementById('movies-container');
    const seriesContainer = document.getElementById('series-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    const showRecentCheckbox = document.getElementById('show-recent-checkbox');
    const toggleHiddenBtn = document.getElementById('toggle-hidden-media-btn');
    const moviesFilterContainer = document.getElementById('movies-filter-container');

    let hiddenTitles = JSON.parse(localStorage.getItem('hiddenMediaTitles') || '[]');
    let showHidden = false;
    let showRecent = localStorage.getItem('showRecent') !== 'false';
    let mediaData = { movies: [], series: [] };

    if (showRecentCheckbox) {
        showRecentCheckbox.checked = showRecent;
        showRecentCheckbox.addEventListener('change', (e) => {
            showRecent = e.target.checked;
            localStorage.setItem('showRecent', showRecent);
            renderMedia();
        });
    }

    toggleHiddenBtn.addEventListener('click', () => {
        showHidden = !showHidden;
        toggleHiddenBtn.classList.toggle('active', showHidden);
        toggleHiddenBtn.textContent = showHidden ? 'Ocultar Ocultos' : 'Mostrar Ocultos';
        renderMedia();
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
            
            moviesFilterContainer.style.display = (targetId === 'tab-movies') ? 'flex' : 'none';
        });
    });

    moviesFilterContainer.style.display = 'flex';

    function fetchMedia() {
        fetch('/api/movies')
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    moviesContainer.innerHTML = `<div style="color: var(--accent-warning); font-size: 0.85rem; grid-column: 1/-1;">${data.error}</div>`;
                    seriesContainer.innerHTML = `<div style="color: var(--accent-warning); font-size: 0.85rem; grid-column: 1/-1;">${data.error}</div>`;
                    return;
                }
                mediaData = data;
                renderMedia();
            })
            .catch(err => {
                console.warn("API de multimedia no disponible, usando respaldo PWA:", err);
                if (window.INITIAL_DASHBOARD_DATA && (window.INITIAL_DASHBOARD_DATA.movies || window.INITIAL_DASHBOARD_DATA.series)) {
                    mediaData = {
                        movies: window.INITIAL_DASHBOARD_DATA.movies || [],
                        series: window.INITIAL_DASHBOARD_DATA.series || []
                    };
                    renderMedia();
                } else {
                    moviesContainer.innerHTML = '<div style="color: var(--accent-danger); font-size: 0.85rem; grid-column: 1/-1;">Error al consultar base de datos de películas.</div>';
                }
            });
    }

    function toggleHideTitle(title) {
        const idx = hiddenTitles.indexOf(title);
        if (idx > -1) {
            hiddenTitles.splice(idx, 1);
            showToast(`"${title}" ahora es visible.`);
        } else {
            hiddenTitles.push(title);
            showToast(`"${title}" se ha ocultado del tablero.`);
        }
        localStorage.setItem('hiddenMediaTitles', JSON.stringify(hiddenTitles));
        renderMedia();
    }

    function renderMedia() {
        renderMovies(mediaData.movies);
        renderSeries(mediaData.series);
    }

    function parseReleaseDate(dateStr) {
        if (!dateStr) return null;
        dateStr = dateStr.trim();
        if (dateStr === '' || dateStr.toLowerCase() === 'none' || dateStr.toLowerCase() === 'n/a') {
            return null;
        }
        
        // Try YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            const parts = dateStr.split('-');
            return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        }
        
        // Try parsing with new Date() for formats like "06 Feb 2027"
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) {
            return parsed;
        }
        
        return null;
    }

    function parseReleaseYear(yearStr) {
        if (!yearStr) return null;
        const match = String(yearStr).match(/\d{4}/);
        return match ? parseInt(match[0], 10) : null;
    }

    function getCompactReleaseDate(releaseDate, releaseYear) {
        const parsedDate = parseReleaseDate(releaseDate);
        if (parsedDate) {
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            const monthStr = months[parsedDate.getMonth()];
            const yearShort = String(parsedDate.getFullYear()).substring(2);
            return `${monthStr}-${yearShort}`;
        }
        return releaseYear || 'N/A';
    }

    function getAvailabilityStatus(releaseDate, releaseYear) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentYear = today.getFullYear();

        const parsedDate = parseReleaseDate(releaseDate);
        if (parsedDate) {
            parsedDate.setHours(0, 0, 0, 0);
            if (parsedDate > today) {
                return 'futuro';
            }
            const diffTime = today - parsedDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 90) {
                return 'reciente';
            } else {
                return 'disponible';
            }
        }

        // Fallback to release year
        const parsedYear = parseReleaseYear(releaseYear);
        if (parsedYear !== null) {
            if (parsedYear > currentYear) {
                return 'futuro';
            } else if (parsedYear === currentYear) {
                // If it is the current year and date is missing, treat as futuro
                return 'futuro';
            } else {
                return 'disponible';
            }
        }

        // Default for missing data (e.g. Creed IV)
        return 'futuro';
    }

    function renderMovies(movies) {
        moviesContainer.innerHTML = '';
        if (!movies || movies.length === 0) {
            moviesContainer.innerHTML = '<div style="color: hsl(220, 15%, 55%); font-size: 0.85rem; grid-column: 1/-1;">No tienes películas pendientes por ver.</div>';
            return;
        }

        let renderedCount = 0;
        movies.forEach(movie => {
            const title = movie['Official Title'] || 'Título Desconocido';
            const year = movie['Release Year'] || 'N/A';
            const releaseDate = movie['Release Date'] || '';
            const isHidden = hiddenTitles.includes(title);

            const status = getAvailabilityStatus(releaseDate, year);

            // Futuro: nunca se muestran
            if (status === 'futuro') {
                return;
            }

            // Reciente: se muestran solo si showRecent está activo (marcado)
            if (status === 'reciente' && !showRecent) {
                return;
            }

            if (isHidden && !showHidden) {
                return;
            }

            renderedCount++;
            const card = document.createElement('div');
            card.className = `media-item ${isHidden ? 'hidden-state' : ''}`;
            
            const genre = movie['Genres'] || 'Sin género';
            const rating = movie['IMDb Rating'] || '0.0';
            const score = movie['Vromlix Score'] !== null ? movie['Vromlix Score'] : 'N/A';
            const plot = movie['Plot Summary'] || '';

            const hideBtn = document.createElement('button');
            hideBtn.className = `hide-media-btn ${isHidden ? 'unhide-mode' : ''}`;
            hideBtn.title = isHidden ? 'Volver a mostrar en el listado' : 'Esconder de mi tablero';
            hideBtn.innerHTML = isHidden 
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
            
            hideBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleHideTitle(title);
            });

            const estreno = getCompactReleaseDate(releaseDate, year);
            let statusBadge = '';
            if (status === 'reciente') {
                statusBadge = `<span class="media-tag status-reciente" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);">🟡 Reciente</span>`;
            } else if (status === 'disponible') {
                statusBadge = `<span class="media-tag status-disponible" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">🟢 Disponible</span>`;
            }

            const imdbLink = movie['IMDb Link'] || '';
            const spanishTitle = movie['Spanish Title'] || title;
            const displayTitleHTML = (movie['Spanish Title'] && movie['Spanish Title'] !== title)
                ? `${title} <span style="font-size: 0.78rem; font-weight: normal; opacity: 0.85; color: var(--accent-secondary);">(${movie['Spanish Title']})</span>`
                : title;

            card.innerHTML = `
                <div class="media-title" title="Haz clic para copiar en español: ${spanishTitle}">${displayTitleHTML}</div>
                <div class="media-meta" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-top: 4px;">
                    <span class="media-tag" title="Fecha de estreno">${estreno}</span>
                    ${statusBadge}
                    <span class="media-tag" style="max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="Género">${genre.split(',')[0]}</span>
                </div>
                <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 4px;">
                    <div class="media-score">VS: <span>${score}</span></div>
                </div>
                ${plot ? `<div class="media-plot-overlay"><p>${plot}</p></div>` : ''}
            `;
            
            const movieTitleEl = card.querySelector('.media-title');
            if (movieTitleEl) {
                movieTitleEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(spanishTitle).then(() => {
                        showToast(`Título copiado: "${spanishTitle}"`);
                    }).catch(err => {
                        console.error('Error al copiar título:', err);
                        showToast('Error al copiar título', 'error');
                    });
                });
            }

            const topActions = document.createElement('div');
            topActions.className = 'media-top-actions';
            topActions.style.cssText = 'position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; align-items: center; z-index: 30;';

            if (imdbLink) {
                const imdbBtn = document.createElement('a');
                imdbBtn.href = imdbLink;
                imdbBtn.target = '_blank';
                imdbBtn.rel = 'noopener';
                imdbBtn.className = 'media-imdb-icon-btn';
                imdbBtn.title = 'Abrir en IMDb (póster y detalles)';
                imdbBtn.innerHTML = '🌐';
                imdbBtn.addEventListener('click', (e) => e.stopPropagation());
                topActions.appendChild(imdbBtn);
            }

            topActions.appendChild(hideBtn);
            card.appendChild(topActions);
            moviesContainer.appendChild(card);
        });

        if (renderedCount === 0) {
            moviesContainer.innerHTML = '<div style="color: hsl(220, 15%, 55%); font-size: 0.85rem; grid-column: 1/-1;">No hay películas que coincidan con los filtros seleccionados.</div>';
        }
    }

    function renderSeries(series) {
        seriesContainer.innerHTML = '';
        if (!series || series.length === 0) {
            seriesContainer.innerHTML = '<div style="color: hsl(220, 15%, 55%); font-size: 0.85rem; grid-column: 1/-1;">No tienes series activas pendientes.</div>';
            return;
        }

        let renderedCount = 0;
        series.forEach(show => {
            const title = show['Official Title'] || 'Título Desconocido';
            const isHidden = hiddenTitles.includes(title);

            if (isHidden && !showHidden) {
                return;
            }

            renderedCount++;
            const card = document.createElement('div');
            card.className = `media-item ${isHidden ? 'hidden-state' : ''}`;

            const season = show['Current Season'] !== null ? show['Current Season'] : '?';
            const episode = show['Current Episode'] !== null ? show['Current Episode'] : '?';
            const showStatus = show['Show Status'] || 'N/A';
            const watchStatus = show['Watch Status'] || 'N/A';
            const score = show['Vromlix Score'] !== null ? show['Vromlix Score'] : 'N/A';
            const plot = show['Plot Summary'] || '';
            const imdbLink = show['IMDb Link'] || '';

            const hideBtn = document.createElement('button');
            hideBtn.className = `hide-media-btn ${isHidden ? 'unhide-mode' : ''}`;
            hideBtn.title = isHidden ? 'Volver a mostrar en el listado' : 'Esconder de mi tablero';
            hideBtn.innerHTML = isHidden 
                ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
                : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
            
            hideBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleHideTitle(title);
            });

            const spanishTitle = show['Spanish Title'] || title;
            const displayTitleHTML = (show['Spanish Title'] && show['Spanish Title'] !== title)
                ? `${title} <span style="font-size: 0.78rem; font-weight: normal; opacity: 0.85; color: var(--accent-secondary);">(${show['Spanish Title']})</span>`
                : title;

            card.innerHTML = `
                <div class="media-title" title="Haz clic para copiar en español: ${spanishTitle}">${displayTitleHTML}</div>
                <div class="media-meta" style="display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-top: 4px;">
                    <span class="media-tag" style="color: var(--accent-primary);">Progreso: T${season} E${episode}</span>
                    <span class="media-tag">${watchStatus}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                    <div style="font-size: 0.7rem; color: hsl(220, 15%, 60%);">${showStatus}</div>
                    <div class="media-score">VS: <span>${score}</span></div>
                </div>
                ${plot ? `<div class="media-plot-overlay"><p>${plot}</p></div>` : ''}
            `;
            
            const seriesTitleEl = card.querySelector('.media-title');
            if (seriesTitleEl) {
                seriesTitleEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(spanishTitle).then(() => {
                        showToast(`Título copiado: "${spanishTitle}"`);
                    }).catch(err => {
                        console.error('Error al copiar título:', err);
                        showToast('Error al copiar título', 'error');
                    });
                });
            }

            const topActions = document.createElement('div');
            topActions.className = 'media-top-actions';
            topActions.style.cssText = 'position: absolute; top: 8px; right: 8px; display: flex; gap: 6px; align-items: center; z-index: 30;';

            if (imdbLink) {
                const imdbBtn = document.createElement('a');
                imdbBtn.href = imdbLink;
                imdbBtn.target = '_blank';
                imdbBtn.rel = 'noopener';
                imdbBtn.className = 'media-imdb-icon-btn';
                imdbBtn.title = 'Abrir en IMDb (póster y detalles)';
                imdbBtn.innerHTML = '🌐';
                imdbBtn.addEventListener('click', (e) => e.stopPropagation());
                topActions.appendChild(imdbBtn);
            }

            topActions.appendChild(hideBtn);
            card.appendChild(topActions);
            seriesContainer.appendChild(card);
        });

        if (renderedCount === 0) {
            seriesContainer.innerHTML = '<div style="color: hsl(220, 15%, 55%); font-size: 0.85rem; grid-column: 1/-1;">No hay series que coincidan con los filtros seleccionados.</div>';
        }
    }

    fetchMedia();
}

// ==========================================
// DOWNLOADS ORGANIZER
// ==========================================
function initDownloads() {
    const container = document.getElementById('downloads-container');
    const refreshBtn = document.getElementById('refresh-downloads-btn');
    if (!container) return;

    function loadDownloads() {
        container.innerHTML = '<tr><td colspan="4" style="text-align: center; color: hsl(220, 15%, 50%);">Buscando archivos...</td></tr>';
        
        fetch('/api/downloads')
            .then(res => res.json())
            .then(data => {
                container.innerHTML = '';
                if (data.error) {
                    container.innerHTML = `<tr><td colspan="4" style="color: var(--accent-warning); text-align: center;">${data.error}</td></tr>`;
                    return;
                }
                
                const files = data.files || [];
                if (files.length === 0) {
                    container.innerHTML = '<tr><td colspan="4" style="text-align: center; color: hsl(220, 15%, 50%);">No hay archivos en la carpeta de Descargas.</td></tr>';
                    return;
                }

                files.forEach(file => {
                    const row = document.createElement('tr');
                    
                    const nameTd = document.createElement('td');
                    nameTd.textContent = file.name;
                    nameTd.title = file.name;
                    
                    const sizeTd = document.createElement('td');
                    sizeTd.textContent = file.size_formatted;
                    
                    const dateTd = document.createElement('td');
                    dateTd.textContent = file.date;
                    
                    const actionTd = document.createElement('td');
                    actionTd.className = 'action-td';
                    actionTd.style.textAlign = 'center';
                    
                    const archiveBtn = document.createElement('button');
                    archiveBtn.className = 'btn-action-downloads archive-btn';
                    archiveBtn.innerHTML = '📁 Docs';
                    archiveBtn.title = 'Mover a 05_docs';
                    archiveBtn.addEventListener('click', () => {
                        archiveFile(file.name);
                    });
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'btn-action-downloads delete-btn';
                    deleteBtn.innerHTML = '🗑️';
                    deleteBtn.title = 'Borrar permanentemente';
                    deleteBtn.addEventListener('click', () => {
                        if (confirm(`¿Estás seguro de que deseas eliminar permanentemente: \n"${file.name}"?`)) {
                            deleteFile(file.name);
                        }
                    });
                    
                    actionTd.appendChild(archiveBtn);
                    actionTd.appendChild(deleteBtn);
                    
                    row.appendChild(nameTd);
                    row.appendChild(sizeTd);
                    row.appendChild(dateTd);
                    row.appendChild(actionTd);
                    
                    container.appendChild(row);
                });
            })
            .catch(err => {
                console.error("Error loading downloads:", err);
                container.innerHTML = '<tr><td colspan="4" style="color: var(--accent-danger); text-align: center;">Error de conexión.</td></tr>';
            });
    }

    function archiveFile(filename) {
        fetch('/api/downloads/archive', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showToast("Archivo movido a 05_docs");
                loadDownloads();
            } else {
                showToast(data.error || "Error al archivar", "error");
            }
        })
        .catch(err => {
            console.error("Error archiving file:", err);
            showToast("Error de conexión", "error");
        });
    }

    function deleteFile(filename) {
        fetch('/api/downloads/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filename })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                showToast("Archivo eliminado");
                loadDownloads();
            } else {
                showToast(data.error || "Error al eliminar", "error");
            }
        })
        .catch(err => {
            console.error("Error deleting file:", err);
            showToast("Error de conexión", "error");
        });
    }

    refreshBtn.addEventListener('click', loadDownloads);
    loadDownloads();
}

// ==========================================
// ANTIGRAVITY CHATS LOG HISTORY & REAL-TIME SEARCH
// ==========================================
function initChats() {
    const container = document.getElementById('chats-container');
    const refreshBtn = document.getElementById('refresh-chats-btn');
    const searchInput = document.getElementById('chat-search-input');
    let allChats = [];

    function renderChats(chatsToRender, query = '') {
        container.innerHTML = '';
        if (chatsToRender.length === 0) {
            container.innerHTML = `<div style="color: hsl(220, 15%, 50%); font-size: 0.85rem; padding: 12px;">No se encontraron chats que coincidan con "${query}".</div>`;
            return;
        }

        chatsToRender.forEach(chat => {
            const item = document.createElement('div');
            item.className = 'chat-item';
            item.title = `Haz clic para copiar el ID de esta conversación:\n${chat.id}`;
            
            // Build snippet preview
            let snippetHTML = '';
            if (query && chat.full_text) {
                const idx = chat.full_text.toLowerCase().indexOf(query.toLowerCase());
                if (idx !== -1) {
                    const start = Math.max(0, idx - 40);
                    const end = Math.min(chat.full_text.length, idx + query.length + 60);
                    let snippet = chat.full_text.substring(start, end);
                    if (start > 0) snippet = '...' + snippet;
                    if (end < chat.full_text.length) snippet += '...';
                    
                    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                    const highlightedSnippet = snippet.replace(regex, '<mark style="background: rgba(255, 215, 0, 0.35); color: #fff; border-radius: 3px; padding: 0 2px;">$1</mark>');
                    snippetHTML = `<div class="chat-snippet" style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px; font-style: italic;">"${highlightedSnippet}"</div>`;
                }
            } else if (chat.full_text) {
                const preview = chat.full_text.substring(0, 140) + '...';
                snippetHTML = `<div class="chat-snippet" style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px; font-style: italic;">"${preview}"</div>`;
            }

            item.innerHTML = `
                <div class="chat-info" style="flex: 1;">
                    <div class="chat-title" title="${chat.title}">${chat.title}</div>
                    <div class="chat-meta">ID: <code>${chat.id.substring(0, 8)}...</code> | ${chat.date}</div>
                    ${snippetHTML}
                </div>
                <div class="chat-copy-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </div>
            `;
            
            item.addEventListener('click', () => {
                navigator.clipboard.writeText(chat.id)
                    .then(() => {
                        showToast(`ID Copiado: ${chat.id.substring(0, 8)}...`);
                    })
                    .catch(err => {
                        console.error('Error al copiar ID:', err);
                        showToast("Error al copiar ID", "error");
                    });
            });
            
            container.appendChild(item);
        });
    }

    function loadChats() {
        container.innerHTML = '<div style="color: hsl(220, 15%, 50%); font-size: 0.85rem; padding: 10px;">Cargando historial de los 60+ chats...</div>';
        
        fetch('/api/conversations')
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    container.innerHTML = `<div style="color: var(--accent-warning); font-size: 0.85rem; padding: 10px;">${data.error}</div>`;
                    return;
                }
                
                allChats = data.conversations || [];
                const currentQuery = searchInput ? searchInput.value.trim() : '';
                filterChats(currentQuery);
            })
            .catch(err => {
                console.error("Error loading chats:", err);
                container.innerHTML = '<div style="color: var(--accent-danger); font-size: 0.85rem; padding: 10px;">Error al conectar con la API de chats.</div>';
            });
    }

    function filterChats(query) {
        if (!query) {
            renderChats(allChats);
            return;
        }
        const q = query.toLowerCase();
        const filtered = allChats.filter(chat => {
            const inTitle = (chat.title || '').toLowerCase().includes(q);
            const inId = (chat.id || '').toLowerCase().includes(q);
            const inText = (chat.full_text || '').toLowerCase().includes(q);
            return inTitle || inId || inText;
        });
        renderChats(filtered, query);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterChats(e.target.value.trim());
        });
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadChats);
    }
    
    loadChats();
}

// ==========================================
// CLASSES & CHURCH NOTES ENGINE
// ==========================================
function initClasses() {
    const tabsContainer = document.getElementById('dashboard-class-tabs');
    const contentContainer = document.getElementById('class-notes-container');
    let classesList = [];
    let activeClassIdx = 0;

    function renderTabs() {
        tabsContainer.innerHTML = '';
        classesList.forEach((cls, idx) => {
            const btn = document.createElement('button');
            btn.className = `tab-btn ${idx === activeClassIdx ? 'active' : ''}`;
            btn.textContent = cls.title;
            btn.addEventListener('click', () => {
                activeClassIdx = idx;
                document.querySelectorAll('#dashboard-class-tabs .tab-btn').forEach((b, bIdx) => {
                    b.classList.toggle('active', bIdx === idx);
                });
                renderContent();
            });
            tabsContainer.appendChild(btn);
        });
    }

    function renderContent() {
        contentContainer.innerHTML = '';
        const classObj = classesList[activeClassIdx];
        if (!classObj) {
            contentContainer.innerHTML = '<div style="color: hsl(220, 15%, 50%); font-size: 0.85rem; padding: 10px;">No hay apuntes disponibles.</div>';
            return;
        }

        const parsedHTML = parseClassMarkdown(classObj.body);
        contentContainer.innerHTML = `<div class="class-notes-grid">${parsedHTML}</div>`;
    }

    function parseClassMarkdown(text) {
        let html = escapeHTML(text);
        
        // 1. Bold: **texto**
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // 2. Links: [texto](url)
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

        // 3. Checkboxes and Lists FIRST (process bullet '*' BEFORE italic to avoid consuming the bullet asterisk)
        html = html.replace(/^\s*-\s+\[[xX]\]\s+(.*?)$/gm, '<div class="checkbox-item"><input type="checkbox" checked disabled> <span>$1</span></div>');
        html = html.replace(/^\s*-\s+\[ \]\s+(.*?)$/gm, '<div class="checkbox-item"><input type="checkbox" disabled> <span>$1</span></div>');
        html = html.replace(/^\s*-\s+(?!<div)(.*?)$/gm, '<li>$1</li>');
        html = html.replace(/^\s*\*\s+(?!<div)(.*?)$/gm, '<li>$1</li>');
        html = html.replace(/^\s*(\d+\.)\s+(.*?)$/gm, '<div class="list-item-numbered"><strong>$1</strong> $2</div>');
        
        // 4. Italic: *texto* (safe after list bullet asterisk is converted to <li>)
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 5. Subtitles ### text and #### text
        html = html.replace(/^###\s+(.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^####\s+(.*?)$/gm, '<h4>$1</h4>');

        // Blockquotes > text or &gt; text
        html = html.replace(/^(&gt;|>)\s*(.*?)$/gm, '<blockquote>$2</blockquote>');

        // Restore details and summary tags from escaping
        html = html.replace(/&lt;details&gt;/g, '<details>');
        html = html.replace(/&lt;\/details&gt;/g, '</details>');
        html = html.replace(/&lt;summary&gt;/g, '<summary>');
        html = html.replace(/&lt;\/summary&gt;/g, '</summary>');
        html = html.replace(/&lt;b&gt;/g, '<b>');
        html = html.replace(/&lt;\/b&gt;/g, '</b>');

        // Remove line breaks immediately after block elements to prevent duplicate spacing
        html = html.replace(/(<\/li>|<\/div>|<\/h3>|<\/h4>|<\/blockquote>)\s*\n/g, '$1');

        // Newlines to <br>
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }

    function fetchClasses() {
        fetch('/api/classes')
            .then(res => res.json())
            .then(data => {
                classesList = data.classes || [];
                renderTabs();
                renderContent();
            })
            .catch(err => {
                console.warn("API de clases no disponible, usando respaldo PWA:", err);
                if (window.INITIAL_DASHBOARD_DATA && window.INITIAL_DASHBOARD_DATA.classes) {
                    classesList = window.INITIAL_DASHBOARD_DATA.classes;
                    renderTabs();
                    renderContent();
                } else {
                    contentContainer.innerHTML = '<div style="color: var(--accent-danger); font-size: 0.85rem; padding: 10px;">Error al cargar las clases desde clases_iglesia.md</div>';
                }
            });
    }

    fetchClasses();
}

// ==========================================
// SYSTEM PROMPTS ENGINE (10 DOMAIN PROMPTS)
// ==========================================
function initPrompts() {
    const container = document.getElementById('prompts-container');
    const searchInput = document.getElementById('prompt-search-input');
    let promptsList = [];

    function renderPrompts(filter = '') {
        container.innerHTML = '';
        const q = filter.toLowerCase().trim();
        const filtered = promptsList.filter(p => 
            p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            container.innerHTML = '<div style="color: hsl(220, 15%, 50%); font-size: 0.85rem; padding: 10px;">Ningún prompt coincide con la búsqueda.</div>';
            return;
        }

        filtered.forEach((prompt) => {
            const card = document.createElement('div');
            card.className = 'prompt-group-card';
            card.style.cssText = 'padding: 0; overflow: hidden; border-radius: 12px; margin-bottom: 12px; border: 1px solid var(--border-color); background: var(--bg-card);';

            const isIndexCard = (prompt.title || '').includes('ÍNDICE');
            const cleanBody = (prompt.body || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            const previewText = isIndexCard 
                ? 'Despliega para ver la lista interactiva de los 10 dominios y chats absorbidos.'
                : (cleanBody.substring(0, 90) + (cleanBody.length > 90 ? '...' : ''));

            const header = document.createElement('div');
            header.style.cssText = 'padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; background: var(--bg-subtle); transition: background 0.2s;';
            header.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 2px; flex: 1; padding-right: 12px;">
                    <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-primary);">${prompt.title}</span>
                    <span style="font-size: 0.78rem; color: var(--text-muted); font-family: monospace;">${previewText}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    ${!isIndexCard ? `
                    <button class="btn-copy-prompt" style="padding: 4px 10px; font-size: 0.8rem; display: flex; align-items: center; gap: 4px; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-card); color: var(--text-primary); cursor: pointer;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                        <span>Copiar Prompt</span>
                    </button>` : ''}
                    <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s; color: var(--text-muted);"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            `;

            const copyBtn = header.querySelector('.btn-copy-prompt');
            if (copyBtn) {
                copyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(prompt.body)
                        .then(() => {
                            copyBtn.style.borderColor = 'var(--accent-success)';
                            copyBtn.style.color = 'var(--accent-success)';
                            copyBtn.querySelector('span').textContent = '¡Copiado!';
                            showToast(`Prompt copiado: "${prompt.title}"`);
                            setTimeout(() => {
                                copyBtn.style.borderColor = 'var(--border-color)';
                                copyBtn.style.color = 'var(--text-primary)';
                                copyBtn.querySelector('span').textContent = 'Copiar Prompt';
                            }, 2000);
                        });
                });
            }

            const body = document.createElement('div');
            body.className = 'card-body';
            body.style.cssText = 'max-height: 0; overflow: hidden; transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1); background: var(--bg-page);';

            const content = document.createElement('div');
            content.style.cssText = 'padding: 16px; border-top: 1px solid var(--border-color); font-family: sans-serif; font-size: 0.88rem; color: var(--text-primary); line-height: 1.5; word-break: break-word;';
            if (prompt.body && (prompt.body.includes('<details') || prompt.body.includes('<summary') || prompt.body.includes('<ul') || prompt.body.includes('<div'))) {
                content.style.whiteSpace = 'normal';
                content.innerHTML = prompt.body;
            } else {
                content.style.fontFamily = 'monospace';
                content.style.fontSize = '0.85rem';
                content.style.whiteSpace = 'pre-wrap';
                content.innerHTML = escapeHTML(prompt.body);
            }

            body.appendChild(content);
            card.appendChild(header);
            card.appendChild(body);
            container.appendChild(card);

            header.addEventListener('click', (e) => {
                if (e.target.closest('.btn-copy-prompt')) return;
                const chevron = header.querySelector('.chevron');
                const isExpanded = card.classList.toggle('expanded');
                
                if (isExpanded) {
                    chevron.style.transform = 'rotate(180deg)';
                    chevron.style.color = 'var(--accent-primary)';
                    body.style.maxHeight = body.scrollHeight + "px";
                    
                    const onTransitionEnd = () => {
                        if (card.classList.contains('expanded')) {
                            body.style.maxHeight = 'none';
                        }
                        body.removeEventListener('transitionend', onTransitionEnd);
                    };
                    body.addEventListener('transitionend', onTransitionEnd);
                } else {
                    body.style.maxHeight = body.scrollHeight + "px";
                    body.offsetHeight; 
                    chevron.style.transform = '';
                    chevron.style.color = '';
                    body.style.maxHeight = '0';
                }
            });
        });
    }

    fetch('/api/prompts')
        .then(res => res.json())
        .then(data => {
            promptsList = data.prompts || [];
            renderPrompts();
        })
        .catch(err => {
            console.warn("API de prompts no disponible, usando respaldo PWA:", err);
            if (window.INITIAL_DASHBOARD_DATA && window.INITIAL_DASHBOARD_DATA.prompts) {
                promptsList = window.INITIAL_DASHBOARD_DATA.prompts;
                renderPrompts();
            } else {
                container.innerHTML = '<div style="color: var(--accent-danger); font-size: 0.85rem; padding: 10px;">Error al cargar los prompts de sistema desde prompts_sistema_chats_especializados.md</div>';
            }
        });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderPrompts(e.target.value);
        });
    }
}


// =============================================================
// CARISMA & COMUNICACION INTERACTIVE MODULE (VANESSA VAN EDWARDS)
// =============================================================

function copyPhrase(btn, text) {
    if (!navigator.clipboard) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    } else {
        navigator.clipboard.writeText(text);
    }

    // Visual feedback on button
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '✓ ¡Copiado!';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 2000);
    }

    // Toast notification if toast function exists
    if (typeof showToast === 'function') {
        showToast('¡Frase copiada al portapapeles!');
    }
}

function copyMusicQuery(btn, query) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(query);
    }
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg> ¡Copiado!`;
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 2000);
    }
    if (typeof showToast === 'function') {
        showToast(`Copiado para YouTube Music: "${query}"`, 'success');
    }
}

function openYtMusic(query) {
    const url = 'https://music.youtube.com/search?q=' + encodeURIComponent(query);
    window.open(url, '_blank');
}

function initCarismaModule() {
    const searchInput = document.getElementById('carisma-search-input');
    const chipBtns = document.querySelectorAll('.carisma-chip');
    const cards = document.querySelectorAll('.carisma-card');
    const sectionTitles = document.querySelectorAll('.carisma-section-title');
    const sparklesContainer = document.querySelector('.carisma-sparkles-container');
    const archetypesGrid = document.querySelector('.archetypes-grid');
    const exitCard = document.querySelector('.graceful-exit-card');
    const monologoWrapper = document.querySelector('.monologo-interactive-wrapper');

    let currentFilter = 'all';
    let searchQuery = '';

    function filterContent() {
        cards.forEach(card => {
            const cat = card.getAttribute('data-cat');
            const keywords = (card.getAttribute('data-keywords') || '') + ' ' + card.innerText.toLowerCase();
            const matchesCat = (currentFilter === 'all' || currentFilter === cat);
            const matchesSearch = (!searchQuery || keywords.toLowerCase().includes(searchQuery));

            if (matchesCat && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Filter sections
        sectionTitles.forEach(title => {
            const cat = title.getAttribute('data-cat');
            if (currentFilter === 'all' || currentFilter === cat) {
                title.style.display = 'block';
            } else {
                title.style.display = 'none';
            }
        });

        if (sparklesContainer) sparklesContainer.style.display = (currentFilter === 'all' || currentFilter === 'chispas') ? 'flex' : 'none';
        if (archetypesGrid) archetypesGrid.style.display = (currentFilter === 'all' || currentFilter === 'arquetipos') ? 'grid' : 'none';
        if (exitCard) exitCard.style.display = (currentFilter === 'all' || currentFilter === 'salidas') ? 'block' : 'none';
        if (monologoWrapper) monologoWrapper.style.display = (currentFilter === 'all' || currentFilter === 'monologos') ? 'flex' : 'none';
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterContent();
        });
    }

    chipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chipBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterContent();
        });
    });

    generateExitFormula();
}

function generateExitFormula() {
    const select = document.getElementById('exit-context-select');
    const outputBox = document.getElementById('exit-output-box');
    if (!select || !outputBox) return;

    const ctx = select.value;
    let text = '';

    if (ctx === 'cita') {
        text = `<b>1. Señal Futura (Future Cue):</b> "¿Tienes planes divertidos o algún proyecto chévere para este fin de semana?"<br><br>
<b>2. Cumplido & Salida:</b> "¡Suena genial! Espero que te vaya increíble con eso. Me dio muchísimo gusto conectar contigo, se me pasó el tiempo volando. Voy a pedir la cuenta / saludar a un amigo, pero me quedé con ganas de escuchar más sobre [tema divertido]. Pásame tu contacto y seguimos la charla luego."<br><br>
<i>🎙️ Tono de voz: Caída vocal suave al despedirte, sonrisa sincera y un paso atrás relajado.</i>`;
    } else if (ctx === 'fiesta') {
        text = `<b>1. Señal Futura (Future Cue):</b> "¿Vas a estar en el viaje/evento del próximo mes o tienes planes el finde?"<br><br>
<b>2. Cumplido & Salida:</b> "¡Excelente! Espero que la pases increíble. Me dio mucho gusto platicar contigo, voy por un vaso de agua antes de que se llene la barra. ¡Que disfrutes mucho la noche!"<br><br>
<i>🎙️ Tono de voz: Alegre, contacto visual cálido de despedida.</i>`;
    } else if (ctx === 'trabajo') {
        text = `<b>1. Señal Futura (Future Cue):</b> "¿En qué proyecto o conferencia te veremos trabajando el próximo mes?"<br><br>
<b>2. Cumplido & Salida:</b> "Te deseo todo el éxito con eso. Fue un verdadero placer conectar contigo; voy a saludar a un colega que acaba de llegar. ¡Seguimos en contacto por LinkedIn!"<br><br>
<i>🎙️ Tono de voz: Firme, profesional y estructurado.</i>`;
    }

    outputBox.innerHTML = text;
}

document.addEventListener('DOMContentLoaded', () => {
    initCarismaModule();
});

// Run init in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initCarismaModule();
}



// =============================================================
// HAMLET MONOLOGUE INTERACTIVE CONTROLLERS
// =============================================================
function openYtSearch(query) {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    window.open(url, '_blank');
}

function toggleMonologoMode(lang) {
    if (lang === 'english') {
        const boxes = document.querySelectorAll('.english-box');
        const btn = document.getElementById('btn-toggle-english');
        let isHidden = false;
        boxes.forEach(b => {
            b.classList.toggle('hidden-lang');
            if (b.classList.contains('hidden-lang')) isHidden = true;
        });
        if (btn) {
            btn.classList.toggle('hidden-mode', isHidden);
            btn.innerHTML = isHidden ? '🙈 Inglés Oculto (Modo Test)' : '👁️ Ocultar/Mostrar Inglés';
        }
        if (typeof showToast === 'function') {
            showToast(isHidden ? 'Texto en Inglés oculto para memorización.' : 'Texto en Inglés visible.');
        }
    } else if (lang === 'spanish') {
        const boxes = document.querySelectorAll('.spanish-box');
        const btn = document.getElementById('btn-toggle-spanish');
        let isHidden = false;
        boxes.forEach(b => {
            b.classList.toggle('hidden-lang');
            if (b.classList.contains('hidden-lang')) isHidden = true;
        });
        if (btn) {
            btn.classList.toggle('hidden-mode', isHidden);
            btn.innerHTML = isHidden ? '🙈 Traducción Oculta' : '🇪🇸 Ocultar/Mostrar Traducción';
        }
        if (typeof showToast === 'function') {
            showToast(isHidden ? 'Traducción en español oculta.' : 'Traducción en español visible.');
        }
    }
}

function copyFullMonologoText() {
    const fullText = `To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them. To die—to sleep,
No more; and by a sleep to say we end
The heart-ache and the thousand natural shocks
That flesh is heir to: 'tis a consummation
Devoutly to be wish'd. To die, to sleep;
To sleep, perchance to dream—ay, there's the rub:
For in that sleep of death what dreams may come
When we have shuffled off this mortal coil,
Must give us pause. There's the respect
That makes calamity of so long life;
For who would bear the whips and scorns of time,
The oppressor's wrong, the proud man's contumely,
The pangs of disprized love, the law's delay,
The insolence of office, and the spurns
That patient merit of the unworthy takes,
When he himself might his quietus make
With a bare bodkin?`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullText);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
    if (typeof showToast === 'function') {
        showToast('¡Monólogo completo copiado al portapapeles!');
    }
}

function copyTextFromElement(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText || el.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    }
    if (typeof showToast === 'function') {
        showToast('Texto copiado al portapapeles');
    }
}

// ==========================================
// TRADUCTOR RÁPIDO & INTÉRPRETE EDUCATIVO (STT, TTS, FONÉTICA & EJEMPLOS)
// ==========================================
function initTranslator() {
    const inputArea = document.getElementById('translator-input');
    const translateBtn = document.getElementById('trigger-translate-btn');
    const micBtn = document.getElementById('translator-mic-btn');
    const micStatusLabel = document.getElementById('mic-status-label');
    const clearBtn = document.getElementById('clear-translator-btn');
    const directionSelect = document.getElementById('translator-direction');
    const charCounter = document.getElementById('char-counter');
    
    const resultsGrid = document.getElementById('translator-results-grid');
    const langBadge = document.getElementById('translation-lang-badge');
    const translatedTextDisplay = document.getElementById('translated-text-display');
    const phoneticDisplay = document.getElementById('phonetic-display');
    const explanationDisplay = document.getElementById('explanation-display');
    const examplesDisplay = document.getElementById('examples-list-display');
    const historyListDisplay = document.getElementById('translator-history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    const playAudioBtn = document.getElementById('play-audio-btn');
    const playSlowAudioBtn = document.getElementById('play-slow-audio-btn');
    const copyTranslationBtn = document.getElementById('copy-translation-btn');

    let isRecording = false;
    let recognition = null;
    let currentTranslationState = null;
    let historyState = JSON.parse(localStorage.getItem('vromlix_translator_history') || '[]');

    // TRADUCCIÓN AUTOMÁTICA AL ESCRIBIR (DEBOUNCE DE 400MS)
    const debouncedAutoTranslate = debounce(() => {
        if (inputArea && inputArea.value.trim().length > 0) {
            performTranslation(true);
        }
    }, 400);

    if (inputArea && charCounter) {
        inputArea.addEventListener('input', () => {
            charCounter.textContent = `${inputArea.value.length} caracteres`;
            if (inputArea.value.trim().length > 0) {
                debouncedAutoTranslate();
            } else if (resultsGrid) {
                resultsGrid.classList.add('hidden');
            }
        });
    }

    if (clearBtn && inputArea) {
        clearBtn.addEventListener('click', () => {
            inputArea.value = '';
            charCounter.textContent = '0 caracteres';
            if (resultsGrid) resultsGrid.classList.add('hidden');
        });
    }

    if (directionSelect) {
        directionSelect.addEventListener('change', () => {
            if (inputArea && inputArea.value.trim().length > 0) {
                performTranslation(false);
            }
        });
    }

    // GRABACIÓN NATIVA DE MICRÓFONO (HTML5 MediaRecorder + Server /api/transcribe)
    let mediaRecorder = null;
    let audioChunks = [];

    if (micBtn) {
        micBtn.addEventListener('click', () => {
            if (isRecording && mediaRecorder) {
                mediaRecorder.stop();
                return;
            }

            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                showToast('Tu navegador no soporta captura de micrófono.', 'warning');
                return;
            }

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    audioChunks = [];
                    mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.onstart = () => {
                        isRecording = true;
                        micBtn.classList.add('recording');
                        micStatusLabel.textContent = '🔴 Grabando... Haz clic para finalizar y traducir';
                        showToast('Habla claro por tu micrófono/audífonos. Haz clic de nuevo al terminar.', 'info');
                    };

                    mediaRecorder.ondataavailable = (e) => {
                        if (e.data && e.data.size > 0) {
                            audioChunks.push(e.data);
                        }
                    };

                    mediaRecorder.onstop = () => {
                        isRecording = false;
                        micBtn.classList.remove('recording');
                        micStatusLabel.textContent = 'Hablar por Micrófono';
                        stream.getTracks().forEach(track => track.stop());

                        if (audioChunks.length === 0) return;

                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        const reader = new FileReader();
                        reader.readAsDataURL(audioBlob);
                        reader.onloadend = () => {
                            const base64Audio = reader.result;
                            const dir = directionSelect ? directionSelect.value : 'auto';
                            const targetLang = dir === 'es_en' ? 'es-ES' : 'en-US';

                            micStatusLabel.textContent = 'Transcribiendo voz...';
                            fetch('/api/transcribe', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ audio: base64Audio, lang: targetLang })
                            })
                            .then(res => res.json())
                            .then(data => {
                                micStatusLabel.textContent = 'Hablar por Micrófono';
                                if (data.success && data.text) {
                                    if (inputArea) inputArea.value = data.text;
                                    if (charCounter) charCounter.textContent = `${data.text.length} caracteres`;
                                    performTranslation(false);
                                } else {
                                    showToast(data.error || 'No se logró interpretar el audio. Intenta de nuevo.', 'warning');
                                }
                            })
                            .catch(err => {
                                micStatusLabel.textContent = 'Hablar por Micrófono';
                                console.error('Error enviando audio:', err);
                                showToast('Error al procesar audio en el servidor.', 'warning');
                            });
                        };
                    };

                    mediaRecorder.start();
                })
                .catch(err => {
                    console.error('getUserMedia error:', err);
                    showToast('⚠️ Permiso de micrófono denegado. Haz clic en el candado de la URL y activa el Micrófono.', 'warning');
                });
        });
    }

    function performTranslation(isAuto = false) {
        if (!inputArea || !inputArea.value.trim()) {
            if (!isAuto) showToast('Por favor escribe o habla una frase para traducir.', 'warning');
            return;
        }

        const queryText = inputArea.value.trim();
        const direction = directionSelect ? directionSelect.value : 'auto';

        if (translateBtn && !isAuto) {
            translateBtn.classList.add('loading');
            translateBtn.disabled = true;
        }

        fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: queryText, direction: direction })
        })
        .then(res => res.json())
        .then(data => {
            if (translateBtn) {
                translateBtn.classList.remove('loading');
                translateBtn.disabled = false;
            }
            if (data.error) {
                if (!isAuto) showToast(data.error, 'warning');
                return;
            }
            renderTranslationResults(data, isAuto);
            addToHistory(data.original, data.translated, data.target_lang, isAuto);
        })
        .catch(err => {
            if (translateBtn) {
                translateBtn.classList.remove('loading');
                translateBtn.disabled = false;
            }
            console.error('Error traduciendo:', err);
        });
    }

    if (translateBtn) translateBtn.addEventListener('click', performTranslation);

    if (inputArea) {
        inputArea.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                performTranslation();
            }
        });
    }

    function renderTranslationResults(data, isAuto = false) {
        currentTranslationState = data;
        if (resultsGrid) resultsGrid.classList.remove('hidden');

        if (langBadge) {
            langBadge.textContent = data.target_lang === 'es' ? '🇺🇸 Inglés ➔ 🇲🇽 Español' : '🇲🇽 Español ➔ 🇺🇸 Inglés';
        }

        if (translatedTextDisplay) {
            translatedTextDisplay.textContent = data.translated;
        }

        if (phoneticDisplay) {
            phoneticDisplay.textContent = data.phonetic ? `[ ${data.phonetic} ]` : '[ Pronunciación similar a la escrita ]';
        }

        if (explanationDisplay) {
            explanationDisplay.innerHTML = escapeHTML(data.explanation || '💡 Traducción clara y directa.').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        }

        if (examplesDisplay) {
            examplesDisplay.innerHTML = '';
            if (data.examples && data.examples.length > 0) {
                data.examples.forEach(ex => {
                    const exCard = document.createElement('div');
                    exCard.className = 'example-sentence-card';
                    exCard.innerHTML = `
                        <div class="example-source">
                            <span>${escapeHTML(ex.source)}</span>
                            <button class="btn-icon-audio" onclick="speakText('${escapeHTML(ex.source).replace(/'/g, "\\'")}', '${data.source_lang === 'es' ? 'es-ES' : 'en-US'}')">🔊</button>
                        </div>
                        <div class="example-target">➔ ${escapeHTML(ex.target)}</div>
                    `;
                    examplesDisplay.appendChild(exCard);
                });
            } else {
                examplesDisplay.innerHTML = '<div class="no-examples-text" style="color: var(--text-muted); font-size: 0.85rem; padding: 8px;">Traducción directa. Presta atención a la pronunciación fonética arriba.</div>';
            }
        }

        if (!isAuto) {
            speakText(data.translated, data.target_lang === 'es' ? 'es-ES' : 'en-US');
        }
    }

    function speakText(textToSpeak, langCode = 'en-US', rate = 1.0) {
        if (!('speechSynthesis' in window)) {
            showToast('SpeechSynthesis no soportado en tu navegador.', 'warning');
            return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = langCode;
        utterance.rate = rate;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith(langCode.substring(0, 2)) && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium')));
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    window.speakText = speakText;

    if (playAudioBtn) {
        playAudioBtn.addEventListener('click', () => {
            if (currentTranslationState) {
                speakText(currentTranslationState.translated, currentTranslationState.target_lang === 'es' ? 'es-ES' : 'en-US', 1.0);
            }
        });
    }

    if (playSlowAudioBtn) {
        playSlowAudioBtn.addEventListener('click', () => {
            if (currentTranslationState) {
                speakText(currentTranslationState.translated, currentTranslationState.target_lang === 'es' ? 'es-ES' : 'en-US', 0.6);
            }
        });
    }

    if (copyTranslationBtn) {
        copyTranslationBtn.addEventListener('click', () => {
            if (currentTranslationState && currentTranslationState.translated) {
                navigator.clipboard.writeText(currentTranslationState.translated).then(() => {
                    showToast('Traducción copiada al portapapeles', 'success');
                });
            }
        });
    }

    function addToHistory(original, translated, targetLang, isAuto = false) {
        if (isAuto) return; // Do not store live typing auto-translations in history!

        if (!original || original.trim().length < 2) return;
        const cleanOrig = original.trim();

        historyState = historyState.filter(h => h.original.toLowerCase() !== cleanOrig.toLowerCase());
        historyState.unshift({ original: cleanOrig, translated, targetLang, timestamp: Date.now() });
        if (historyState.length > 20) historyState.pop();
        localStorage.setItem('vromlix_translator_history', JSON.stringify(historyState));
        renderHistory();
    }

    function renderHistory() {
        if (!historyListDisplay) return;
        historyListDisplay.innerHTML = '';
        
        // Clean out any legacy invalid items from history
        historyState = historyState.filter(item => item && item.original && item.original.trim().length >= 2);

        if (historyState.length === 0) {
            historyListDisplay.innerHTML = '<span style="font-size: 0.85rem; color: hsl(220, 15%, 50%); padding: 6px;">Sin búsquedas recientes.</span>';
            return;
        }

        historyState.forEach(item => {
            const chip = document.createElement('button');
            chip.className = 'history-chip';
            chip.innerHTML = `<span>${escapeHTML(item.original)}</span> <small style="opacity:0.7;">➔ ${escapeHTML(item.translated)}</small>`;
            chip.addEventListener('click', () => {
                if (inputArea) inputArea.value = item.original;
                performTranslation(false);
            });
            historyListDisplay.appendChild(chip);
        });
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            historyState = [];
            localStorage.removeItem('vromlix_translator_history');
            renderHistory();
            showToast('Historial limpiado');
        });
    }

    renderHistory();
}
