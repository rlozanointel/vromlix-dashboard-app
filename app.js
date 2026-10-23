
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
    initWeather();
    initTiempo();
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
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = btn.getAttribute('data-view');
            switchView(targetView);
            // Actualizar URL sin provocar scroll brusco hacia abajo
            if (history.replaceState) {
                history.replaceState(null, null, '#' + targetView);
            } else {
                window.location.hash = targetView;
            }
            // Asegurar que la barra de navegación permanezca visible arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    const hashView = window.location.hash.replace('#', '');
    if (hashView && document.getElementById(hashView)) {
        switchView(hashView);
        window.scrollTo({ top: 0, behavior: 'instant' });
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
// Drift-Free Epoch Sync & Android Lock/Suspend Wakeup Fix
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
        const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
        
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
        
        // Update Digital Text Display (if present)
        if (timeEl) {
            timeEl.textContent = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
        }
        
        // Clean English Date Display: "Monday 19 Oct" (or "Tuesday 20 Oct")
        if (dateEl) {
            const dateOptions = { timeZone: 'America/Mexico_City', weekday: 'long', day: 'numeric', month: 'short' };
            const dateParts = new Intl.DateTimeFormat('en-US', dateOptions).formatToParts(now);
            let wDay = '', mDay = '', mMonth = '';
            for (const p of dateParts) {
                if (p.type === 'weekday') wDay = p.value;
                if (p.type === 'day') mDay = p.value;
                if (p.type === 'month') mMonth = p.value;
            }
            dateEl.textContent = `${wDay} ${mDay} ${mMonth}`;
        }
    }
    
    // Drift-free Epoch Rescheduler (Self-aligning to exact millisecond boundary)
    let clockTimeoutId = null;
    function tickClock() {
        updateClock();
        const nowMs = Date.now();
        const nextDelay = Math.max(25, 1000 - (nowMs % 1000));
        clockTimeoutId = setTimeout(tickClock, nextDelay);
    }

    // Android Lock Screen / Tab Suspend Wakeup Listeners
    function forceWakeupSync() {
        if (clockTimeoutId) clearTimeout(clockTimeoutId);
        tickClock();
    }

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) forceWakeupSync();
    });
    window.addEventListener('focus', forceWakeupSync);
    window.addEventListener('pageshow', forceWakeupSync);

    tickClock();
}

// ==========================================
// OPEN-METEO WEATHER ENGINE (Puebla - Col. Universidades)
// Latitude: 19.0125, Longitude: -98.2045
// 100% Free, No Key, Rain probability for next 1-2 hours
// ==========================================
function initWeather() {
    const tempEl = document.getElementById('weather-temp');
    const humEl = document.getElementById('weather-humidity');
    const rainEl = document.getElementById('weather-rain');
    if (!tempEl) return;

    const CACHE_KEY = 'vromlix_weather_puebla_cache';
    const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

    function renderWeather(data) {
        if (!data) return;
        const temp = Math.round(data.temperature);
        const hum = Math.round(data.humidity);
        const rainProb = Math.round(data.rainProbNext1_2h);

        if (tempEl) tempEl.textContent = `${temp}°C`;
        if (humEl) humEl.textContent = `💧 ${hum}%`;
        if (rainEl) {
            rainEl.textContent = `☔ ${rainProb}% (1-2h)`;
            if (rainProb >= 40) {
                rainEl.className = 'weather-rain rain-warning';
                rainEl.title = `Alerta: Alta probabilidad de lluvia (${rainProb}%) en Puebla para las siguientes 1-2 horas`;
            } else {
                rainEl.className = 'weather-rain rain-safe';
                rainEl.title = `Baja probabilidad de lluvia (${rainProb}%) en Puebla para las siguientes 1-2 horas`;
            }
        }
    }

    // Load cached first
    try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            renderWeather(cached.data);
        }
    } catch(e) {}

    function fetchWeather() {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=19.0125&longitude=-98.2045&current=temperature_2m,relative_humidity_2m&hourly=precipitation_probability&timezone=America%2FMexico_City&forecast_hours=3';
        fetch(url)
            .then(res => res.json())
            .then(resData => {
                if (resData && resData.current) {
                    const curTemp = resData.current.temperature_2m;
                    const curHum = resData.current.relative_humidity_2m;
                    const hourlyRain = (resData.hourly && resData.hourly.precipitation_probability) || [];
                    const prob1 = hourlyRain[0] !== undefined ? hourlyRain[0] : 0;
                    const prob2 = hourlyRain[1] !== undefined ? hourlyRain[1] : prob1;
                    const maxProb = Math.max(prob1, prob2);

                    const weatherPayload = {
                        temperature: curTemp,
                        humidity: curHum,
                        rainProbNext1_2h: maxProb
                    };

                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        timestamp: Date.now(),
                        data: weatherPayload
                    }));

                    renderWeather(weatherPayload);
                }
            })
            .catch(err => {
                console.log("Open-Meteo no disponible en este momento:", err);
            });
    }

    fetchWeather();
    setInterval(fetchWeather, CACHE_TTL);

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
            if (!cached || (Date.now() - cached.timestamp >= CACHE_TTL)) {
                fetchWeather();
            }
        }
    });
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
    let pendingEditProject = null; // { catId: string, projectRef: object }

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
        
        if (taskModal) {
            taskModal.classList.remove("hidden");
            // Auto focus for immediate typing
            setTimeout(() => {
                if (day === "antigravity") {
                    if (modalDetailsInput && !modalDetailsInput.value) {
                        modalDetailsInput.focus();
                    } else if (modalActionsInput && !modalActionsInput.value) {
                        modalActionsInput.focus();
                    } else if (modalTitleInput) {
                        modalTitleInput.focus();
                    }
                } else {
                    if (modalTitleInput) modalTitleInput.focus();
                }
            }, 60);
        }
    }

    function closeTaskModal() {
        if (taskModal) taskModal.classList.add("hidden");
        currentEditingLocation = { day: null, index: null };
    }

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeTaskModal);
    
    // Close modal on outside click (anywhere outside .modal-card)
    let isMouseDownInsideModalCard = false;
    if (taskModal) {
        taskModal.addEventListener("mousedown", (e) => {
            isMouseDownInsideModalCard = !!e.target.closest(".modal-card");
        });
        taskModal.addEventListener("click", (e) => {
            if (!isMouseDownInsideModalCard && (e.target === taskModal || !e.target.closest(".modal-card"))) {
                closeTaskModal();
            }
            isMouseDownInsideModalCard = false;
        });

        // Ctrl+Enter or Cmd+Enter to save modal
        taskModal.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                if (saveModalBtn) saveModalBtn.click();
            }
        });
    }

    // Escape key closes modal immediately
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (taskModal && !taskModal.classList.contains("hidden")) {
                closeTaskModal();
            }
        }
    });

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
                
                const mainInfo = document.createElement("div");
                mainInfo.className = "weekly-task-main";

                const txt = document.createElement("span");
                txt.className = "weekly-task-text";
                const displayTitle = task.time ? `${task.time} — ${task.title || ""}` : (task.title || "");
                txt.textContent = displayTitle;
                mainInfo.appendChild(txt);

                // Meta row for Action Items badge or detail icon
                if (hasActions) {
                    const metaRow = document.createElement("div");
                    metaRow.className = "weekly-task-metarow";
                    const alertBadge = document.createElement("span");
                    alertBadge.className = "action-alert-badge";
                    alertBadge.title = "Tiene pendientes o tareas a realizar";
                    alertBadge.innerHTML = `⚡ Pendiente`;
                    metaRow.appendChild(alertBadge);
                    mainInfo.appendChild(metaRow);
                } else if (task.details && task.details.trim() !== "") {
                    const metaRow = document.createElement("div");
                    metaRow.className = "weekly-task-metarow";
                    const detailBadge = document.createElement("span");
                    detailBadge.className = "task-detail-icon";
                    detailBadge.title = "Tiene detalles (clic para ver)";
                    detailBadge.textContent = "📝 ver";
                    metaRow.appendChild(detailBadge);
                    mainInfo.appendChild(metaRow);
                }

                content.appendChild(checkbox);
                content.appendChild(mainInfo);
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
        renderProjects();
    }

    // ==========================================
    // BENTO PROJECTS DECK ENGINE (3 LAYERS: FOCUS, CATEGORIES & NEXT ACTION)
    // ==========================================
    let currentProjectScope = localStorage.getItem('vromlix_project_scope') || 'all'; // 'all' or 'focus'
    let currentProjectCat = localStorage.getItem('vromlix_project_cat') || 'all'; // 'all', 'negocios', 'carrera', 'tech', 'fe'

    function getProjectCategory(item) {
        if (item.category) return item.category;
        const t = (item.title || "").toLowerCase();
        if (t.includes("mera kirai") || t.includes("nexo") || t.includes("playera") || t.includes("negocio") || t.includes("publicidad")) return "negocios";
        if (t.includes("postula") || t.includes("cv") || t.includes("empleo") || t.includes("kheri")) return "carrera";
        if (t.includes("elder") || t.includes("family") || t.includes("lds") || t.includes("lectura")) return "fe";
        return "tech";
    }

    function getCategoryMeta(cat) {
        switch(cat) {
            case "negocios":
                return { label: "💼 Negocios", class: "cat-biz" };
            case "carrera":
                return { label: "🎯 Carrera & CV", class: "cat-career" };
            case "fe":
                return { label: "🏛️ Fe & Misión", class: "cat-faith" };
            case "tech":
            default:
                return { label: "🛠️ Tech / Ops", class: "cat-tech" };
        }
    }

    window.setProjectScope = function(scope) {
        currentProjectScope = scope;
        localStorage.setItem('vromlix_project_scope', scope);
        renderProjects();
    };

    window.setProjectCategory = function(cat) {
        currentProjectCat = cat;
        localStorage.setItem('vromlix_project_cat', cat);
        renderProjects();
    };

    window.quickAddProject = function() {
        const input = document.getElementById('new-project-input');
        const select = document.getElementById('new-project-cat-select');
        if (!input || !input.value.trim()) return;
        const title = input.value.trim();
        const cat = select ? select.value : 'tech';

        if (!tasksState.weekly.antigravity) tasksState.weekly.antigravity = [];
        tasksState.weekly.antigravity.unshift({
            time: "",
            title: title,
            details: "",
            action_items: "",
            completed: false,
            category: cat,
            is_focus: currentProjectScope === 'focus'
        });
        input.value = "";
        saveTasks();
        renderWeeklyTasks();
        showToast(`Proyecto "${title}" añadido con éxito`, 'success');
    };

    window.toggleExtraActions = function(index) {
        const el = document.getElementById(`proj-extra-${index}`);
        const btn = document.getElementById(`proj-btn-toggle-${index}`);
        if (!el) return;
        const isHidden = el.classList.toggle('hidden');
        if (btn) btn.textContent = isHidden ? btn.getAttribute('data-show-text') : 'Ocultar tareas ▴';
    };

    function renderProjects() {
        const grid = document.getElementById("projects-bento-grid");
        if (!grid) return;
        grid.innerHTML = "";

        const allProjects = tasksState.weekly.antigravity || [];

        // Ensure default is_focus on initial load
        allProjects.forEach(p => {
            if (p.is_focus === undefined) {
                const t = (p.title || "").toLowerCase();
                if (t.includes("mera kirai") || t.includes("postula") || t.includes("nexo")) {
                    p.is_focus = true;
                } else {
                    p.is_focus = false;
                }
            }
        });

        // Update counters
        const totalCount = allProjects.length;
        const focusCount = allProjects.filter(p => p.is_focus && !p.completed).length;

        const totalCounterEl = document.getElementById("projects-total-counter");
        if (totalCounterEl) totalCounterEl.textContent = `${totalCount} proyectos`;

        const countAllEl = document.getElementById("count-proj-all");
        if (countAllEl) countAllEl.textContent = totalCount;

        const countFocusEl = document.getElementById("count-proj-focus");
        if (countFocusEl) countFocusEl.textContent = focusCount;

        // Update scope buttons state
        document.querySelectorAll(".proj-scope-btn").forEach(btn => {
            btn.classList.toggle("active", (btn.id === `btn-proj-scope-${currentProjectScope}`));
        });

        // Update category pills state
        document.querySelectorAll(".proj-cat-pill").forEach(pill => {
            pill.classList.toggle("active", pill.getAttribute("data-cat") === currentProjectCat);
        });

        // Define 4 Macro-Area Categories
        const CATEGORIES = [
            { id: "negocios", label: "Negocios & Emprendimiento", icon: "💼", class: "cat-biz", placeholder: "+ Añadir a Negocios..." },
            { id: "carrera", label: "Carrera & CV", icon: "🎯", class: "cat-career", placeholder: "+ Añadir a Carrera..." },
            { id: "tech", label: "Tech & Ops", icon: "🛠️", class: "cat-tech", placeholder: "+ Añadir a Tech..." },
            { id: "fe", label: "Fe, Misión & Familia", icon: "🏛️", class: "cat-faith", placeholder: "+ Añadir a Fe..." }
        ];

        // Categories to display based on pill filter
        const visibleCategories = currentProjectCat === "all" 
            ? CATEGORIES 
            : CATEGORIES.filter(c => c.id === currentProjectCat);

        visibleCategories.forEach(cat => {
            // Get projects for this category
            const catProjects = allProjects
                .map((proj, origIdx) => ({ proj, origIdx }))
                .filter(({ proj }) => getProjectCategory(proj) === cat.id);

            // Separate into Micro-States (Opción A)
            const focusProjects = catProjects.filter(({ proj }) => proj.is_focus && !proj.completed);
            const reserveProjects = catProjects.filter(({ proj }) => !proj.is_focus && !proj.completed);
            const completedProjects = catProjects.filter(({ proj }) => proj.completed);

            // Sort each group alphabetically
            focusProjects.sort((a, b) => (a.proj.title || "").localeCompare(b.proj.title || ""));
            reserveProjects.sort((a, b) => (a.proj.title || "").localeCompare(b.proj.title || ""));
            completedProjects.sort((a, b) => (a.proj.title || "").localeCompare(b.proj.title || ""));

            // Build Column Container
            const col = document.createElement("div");
            col.className = `project-category-column ${cat.class}`;

            // Column Header
            const colHeader = document.createElement("div");
            colHeader.className = "proj-col-header";
            const badgeText = currentProjectScope === 'focus' 
                ? `${focusProjects.length}` 
                : (focusProjects.length > 0 ? `⭐ ${focusProjects.length} / ${catProjects.length}` : `${catProjects.length}`);
            colHeader.innerHTML = `
                <div class="proj-col-title-group">
                    <span class="proj-col-icon">${cat.icon}</span>
                    <h3 class="proj-col-title">${cat.label}</h3>
                </div>
                <span class="proj-col-badge">${badgeText}</span>
            `;
            col.appendChild(colHeader);

            // Cards List
            const cardsList = document.createElement("div");
            cardsList.className = "proj-col-cards-list";

            if (currentProjectScope === "focus") {
                // Focus Only View
                if (focusProjects.length === 0) {
                    const emptyMsg = document.createElement("div");
                    emptyMsg.className = "proj-col-empty";
                    emptyMsg.textContent = "Sin proyectos en foco aquí";
                    cardsList.appendChild(emptyMsg);
                } else {
                    focusProjects.forEach(({ proj, origIdx }) => {
                        const card = createProjectCard(proj, origIdx);
                        cardsList.appendChild(card);
                    });
                }
            } else {
                // Opción A: Macro-Áreas con Micro-Estados (En Marcha vs En Reserva)

                // 1. SECCIÓN: EN MARCHA / FOCO SEMANAL
                const focusHeader = document.createElement("div");
                focusHeader.className = "proj-subgroup-header";
                focusHeader.innerHTML = `
                    <div class="proj-subgroup-title-group">
                        <span class="subgroup-dot focus-dot"></span>
                        <span>En Marcha / Foco (${focusProjects.length})</span>
                    </div>
                `;
                cardsList.appendChild(focusHeader);

                if (focusProjects.length > 0) {
                    focusProjects.forEach(({ proj, origIdx }) => {
                        const card = createProjectCard(proj, origIdx);
                        cardsList.appendChild(card);
                    });
                } else {
                    const emptyDrop = document.createElement("div");
                    emptyDrop.className = "proj-focus-empty-drop";
                    emptyDrop.innerHTML = `<span>☆ Toca la estrella de un proyecto abajo para activarlo en marcha</span>`;
                    cardsList.appendChild(emptyDrop);
                }

                // 2. SECCIÓN: EN RESERVA / INCUBACIÓN
                if (reserveProjects.length > 0) {
                    const reserveHeader = document.createElement("div");
                    reserveHeader.className = "proj-subgroup-header";
                    reserveHeader.innerHTML = `
                        <div class="proj-subgroup-title-group">
                            <span class="subgroup-dot reserve-dot"></span>
                            <span>En Reserva (${reserveProjects.length})</span>
                        </div>
                    `;
                    cardsList.appendChild(reserveHeader);

                    reserveProjects.forEach(({ proj, origIdx }) => {
                        const strip = createCompactProjectStrip(proj, origIdx, cat);
                        cardsList.appendChild(strip);
                    });
                }

                // 3. SECCIÓN: COMPLETADOS (colapsada)
                if (completedProjects.length > 0) {
                    const compDetails = document.createElement("details");
                    compDetails.className = "proj-completed-details";
                    compDetails.innerHTML = `<summary>✓ Completados (${completedProjects.length})</summary>`;
                    const compList = document.createElement("div");
                    compList.className = "proj-completed-list";
                    completedProjects.forEach(({ proj, origIdx }) => {
                        const strip = createCompactProjectStrip(proj, origIdx, cat);
                        compList.appendChild(strip);
                    });
                    compDetails.appendChild(compList);
                    cardsList.appendChild(compDetails);
                }

                // Si toda la columna está completamente vacía
                if (catProjects.length === 0) {
                    cardsList.innerHTML = "";
                    const emptyMsg = document.createElement("div");
                    emptyMsg.className = "proj-col-empty";
                    emptyMsg.textContent = "Sin proyectos aún en esta área";
                    cardsList.appendChild(emptyMsg);
                }
            }
            col.appendChild(cardsList);

            // Inline Quick Add at bottom of column
            const quickAddBox = document.createElement("div");
            quickAddBox.className = "proj-col-quick-add";
            const quickInput = document.createElement("input");
            quickInput.type = "text";
            quickInput.className = "proj-col-input";
            quickInput.id = `proj-col-input-${cat.id}`;
            quickInput.placeholder = cat.placeholder;

            // If user just created a project in this column, keep focus and prompt for Enter
            if (pendingEditProject && pendingEditProject.catId === cat.id) {
                quickInput.classList.add("awaiting-edit-enter");
                quickInput.placeholder = "↵ Presiona Enter para abrir y editar detalles...";
                setTimeout(() => {
                    const el = document.getElementById(`proj-col-input-${cat.id}`);
                    if (el) el.focus();
                }, 40);
            }

            quickInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const title = quickInput.value.trim();
                    if (title !== "") {
                        // 1. Create card
                        if (!tasksState.weekly.antigravity) tasksState.weekly.antigravity = [];
                        const newProj = {
                            time: "",
                            title: title,
                            details: "",
                            action_items: "",
                            completed: false,
                            category: cat.id,
                            is_focus: currentProjectScope === "focus"
                        };
                        tasksState.weekly.antigravity.unshift(newProj);
                        pendingEditProject = { catId: cat.id, projectRef: newProj };
                        quickInput.value = "";
                        saveTasks();
                        renderWeeklyTasks();
                        showToast(`"${title}" añadido. Presiona Enter para abrir y editar 📝`, "success");
                    } else {
                        // 2. Empty input + Enter pressed -> Open card if pending
                        if (pendingEditProject && pendingEditProject.catId === cat.id) {
                            e.preventDefault();
                            const targetRef = pendingEditProject.projectRef;
                            pendingEditProject = null;
                            const origIdx = tasksState.weekly.antigravity.indexOf(targetRef);
                            if (origIdx !== -1) {
                                openTaskModal("antigravity", origIdx);
                            }
                        }
                    }
                } else if (e.key === "Escape") {
                    pendingEditProject = null;
                    quickInput.classList.remove("awaiting-edit-enter");
                    quickInput.placeholder = cat.placeholder;
                    quickInput.blur();
                } else {
                    // Typing any other key resets pendingEditProject
                    if (pendingEditProject && pendingEditProject.catId === cat.id) {
                        pendingEditProject = null;
                        quickInput.classList.remove("awaiting-edit-enter");
                        quickInput.placeholder = cat.placeholder;
                    }
                }
            });
            quickAddBox.appendChild(quickInput);
            col.appendChild(quickAddBox);

            grid.appendChild(col);
        });
    }

    function createProjectCard(proj, origIdx) {
        const cat = getProjectCategory(proj);
        const catMeta = getCategoryMeta(cat);

        // Parse action items
        const rawLines = (proj.action_items || "")
            .split("\n")
            .map(l => l.trim())
            .filter(l => l.length > 0);

        const card = document.createElement("div");
        card.className = `project-bento-card ${catMeta.class} ${proj.completed ? "completed" : ""} ${proj.is_focus ? "is-focus" : ""}`;
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Abrir proyecto ${proj.title || ''}`);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                if (e.target === card || e.target.classList.contains("proj-card-title") || e.target.classList.contains("proj-card-body")) {
                    e.preventDefault();
                    openTaskModal("antigravity", origIdx);
                }
            }
        });

        // Top Header: Tag + Controls (Star, Delete)
        const cardHeader = document.createElement("div");
        cardHeader.className = "proj-card-header";

        const tag = document.createElement("span");
        tag.className = `proj-cat-tag ${catMeta.class}`;
        tag.textContent = catMeta.label;

        const headerActions = document.createElement("div");
        headerActions.className = "proj-header-actions";

        const starBtn = document.createElement("button");
        starBtn.className = `btn-proj-star ${proj.is_focus ? "active" : ""}`;
        starBtn.title = proj.is_focus ? "Quitar de Foco Semanal" : "Marcar como Foco Semanal ⭐";
        starBtn.innerHTML = proj.is_focus ? "⭐" : "☆";
        starBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            proj.is_focus = !proj.is_focus;
            saveTasks();
            renderWeeklyTasks();
            showToast(proj.is_focus ? `"${proj.title}" añadido al Foco Semanal ⭐` : `Quitado del Foco`, "success");
        });

        const delBtn = document.createElement("button");
        delBtn.className = "btn-proj-delete";
        delBtn.title = "Eliminar proyecto";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(`¿Eliminar el proyecto "${proj.title}"?`)) {
                tasksState.weekly.antigravity.splice(origIdx, 1);
                saveTasks();
                renderWeeklyTasks();
                showToast("Proyecto eliminado", "success");
            }
        });

        headerActions.appendChild(starBtn);
        headerActions.appendChild(delBtn);
        cardHeader.appendChild(tag);
        cardHeader.appendChild(headerActions);
        card.appendChild(cardHeader);

        // Card Body
        const cardBody = document.createElement("div");
        cardBody.className = "proj-card-body";

        // Title & Checkbox
        const titleRow = document.createElement("div");
        titleRow.className = "proj-title-row";

        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "task-checkbox";
        chk.checked = !!proj.completed;
        chk.addEventListener("click", (e) => {
            e.stopPropagation();
            proj.completed = !proj.completed;
            saveTasks();
            renderWeeklyTasks();
        });

        const titleText = document.createElement("h3");
        titleText.className = "proj-card-title";
        titleText.textContent = proj.title || "Sin Título";

        titleRow.appendChild(chk);
        titleRow.appendChild(titleText);
        cardBody.appendChild(titleRow);

        if (proj.details && proj.details.trim() !== "") {
            const detailsP = document.createElement("p");
            detailsP.className = "proj-card-details";
            detailsP.textContent = proj.details;
            cardBody.appendChild(detailsP);
        }

        // Action Items Box & Next Action
        if (rawLines.length > 0) {
            const nextActionBox = document.createElement("div");
            nextActionBox.className = "proj-next-action-box";

            const cleanFirstLine = rawLines[0].replace(/^[\*\•\-\s]+/, "");
            nextActionBox.innerHTML = `
                <div class="next-action-header">
                    <span class="next-action-label">👉 PRÓXIMA ACCIÓN:</span>
                    <span class="proj-task-count-badge">${rawLines.length} pendientes</span>
                </div>
                <div class="next-action-text">${escapeHTML(cleanFirstLine)}</div>
            `;
            cardBody.appendChild(nextActionBox);

            if (rawLines.length > 1) {
                const extraBox = document.createElement("div");
                extraBox.className = "proj-extra-actions-box hidden";
                extraBox.id = `proj-extra-${origIdx}`;

                const extraList = document.createElement("ul");
                extraList.className = "proj-extra-list";
                rawLines.slice(1).forEach(itemLine => {
                    const li = document.createElement("li");
                    li.textContent = itemLine.replace(/^[\*\•\-\s]+/, "");
                    extraList.appendChild(li);
                });
                extraBox.appendChild(extraList);
                cardBody.appendChild(extraBox);

                const toggleBtn = document.createElement("button");
                toggleBtn.className = "proj-toggle-btn";
                toggleBtn.id = `proj-btn-toggle-${origIdx}`;
                toggleBtn.setAttribute("data-show-text", `Ver ${rawLines.length - 1} pendientes más ▾`);
                toggleBtn.textContent = `Ver ${rawLines.length - 1} pendientes más ▾`;
                toggleBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    window.toggleExtraActions(origIdx);
                });
                cardBody.appendChild(toggleBtn);
            }
        } else {
            const emptyAction = document.createElement("div");
            emptyAction.className = "proj-empty-action";
            emptyAction.textContent = "Sin tareas pendientes. Toca para redactar.";
            cardBody.appendChild(emptyAction);
        }

        card.appendChild(cardBody);

        // Card Footer / Edit Button
        const cardFooter = document.createElement("div");
        cardFooter.className = "proj-card-footer";
        const editBtn = document.createElement("button");
        editBtn.className = "btn-edit-proj";
        editBtn.innerHTML = `📝 Editar / Ver todo`;
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openTaskModal("antigravity", origIdx);
        });
        cardFooter.appendChild(editBtn);
        card.appendChild(cardFooter);

        // Clicking card also opens modal
        card.addEventListener("click", (e) => {
            if (e.target.closest("button") || e.target.classList.contains("task-checkbox")) return;
            openTaskModal("antigravity", origIdx);
        });

        return card;
    }

    function createCompactProjectStrip(proj, origIdx, cat) {
        const strip = document.createElement("div");
        strip.className = `proj-compact-strip ${proj.completed ? "completed" : ""}`;
        strip.tabIndex = 0;
        strip.setAttribute("role", "button");
        strip.setAttribute("aria-label", `Abrir proyecto ${proj.title || ''}`);
        strip.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                if (e.target === strip || e.target.classList.contains("compact-title") || e.target.classList.contains("compact-left")) {
                    e.preventDefault();
                    openTaskModal("antigravity", origIdx);
                }
            }
        });

        // Parse action items count
        const rawLines = (proj.action_items || "")
            .split("\n")
            .map(l => l.trim())
            .filter(l => l.length > 0);

        // Left: checkbox + dot + title
        const leftBox = document.createElement("div");
        leftBox.className = "compact-left";

        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "task-checkbox";
        chk.checked = !!proj.completed;
        chk.addEventListener("click", (e) => {
            e.stopPropagation();
            proj.completed = !proj.completed;
            saveTasks();
            renderWeeklyTasks();
        });

        const dot = document.createElement("span");
        dot.className = `compact-dot ${cat.class}`;

        const titleSpan = document.createElement("span");
        titleSpan.className = "compact-title";
        titleSpan.textContent = proj.title || "Sin título";

        leftBox.appendChild(chk);
        leftBox.appendChild(dot);
        leftBox.appendChild(titleSpan);

        // Right: count pill + Star + Edit + Delete
        const rightBox = document.createElement("div");
        rightBox.className = "compact-right";

        if (rawLines.length > 0) {
            const countPill = document.createElement("span");
            countPill.className = "compact-count-pill";
            countPill.textContent = `${rawLines.length} pend.`;
            rightBox.appendChild(countPill);
        }

        const starBtn = document.createElement("button");
        starBtn.className = `btn-compact-star ${proj.is_focus ? "active" : ""}`;
        starBtn.title = proj.is_focus ? "Quitar de Foco" : "Poner en Marcha ⭐";
        starBtn.textContent = proj.is_focus ? "⭐" : "☆";
        starBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            proj.is_focus = !proj.is_focus;
            saveTasks();
            renderWeeklyTasks();
            showToast(proj.is_focus ? `"${proj.title}" puesto En Marcha ⭐` : `Movido a Reserva`, "success");
        });

        const editBtn = document.createElement("button");
        editBtn.className = "btn-compact-edit";
        editBtn.title = "Editar / Ver detalles";
        editBtn.textContent = "✏️";
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            openTaskModal("antigravity", origIdx);
        });

        const delBtn = document.createElement("button");
        delBtn.className = "btn-compact-del";
        delBtn.title = "Eliminar";
        delBtn.textContent = "×";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(`¿Eliminar el proyecto "${proj.title}"?`)) {
                tasksState.weekly.antigravity.splice(origIdx, 1);
                saveTasks();
                renderWeeklyTasks();
                showToast("Proyecto eliminado", "success");
            }
        });

        rightBox.appendChild(starBtn);
        rightBox.appendChild(editBtn);
        rightBox.appendChild(delBtn);

        strip.appendChild(leftBox);
        strip.appendChild(rightBox);

        // Clicking strip body opens modal
        strip.addEventListener("click", (e) => {
            if (e.target.closest("button") || e.target.classList.contains("task-checkbox")) return;
            openTaskModal("antigravity", origIdx);
        });

        return strip;
    }

    const newProjInput = document.getElementById("new-project-input");
    if (newProjInput) {
        newProjInput.onkeydown = (e) => {
            if (e.key === "Enter") {
                window.quickAddProject();
            }
        };
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
        if (!textToSpeak) return;

        if (window.currentTtsAudio) {
            window.currentTtsAudio.pause();
            window.currentTtsAudio = null;
        }

        const cleanLang = langCode.startsWith('es') ? 'es' : 'en';
        const ttsUrl = `/api/tts?text=${encodeURIComponent(textToSpeak)}&lang=${cleanLang}`;
        const audio = new Audio(ttsUrl);
        window.currentTtsAudio = audio;

        audio.play().catch(err => {
            console.warn('Fallback a WebSpeech API:', err);
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = langCode;
                utterance.rate = rate;
                window.speechSynthesis.speak(utterance);
            }
        });
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
        if (!original) return;
        const cleanOrig = original.trim();
        if (cleanOrig.length < 2) return;

        const currLower = cleanOrig.toLowerCase();

        // If history has existing items, check if top item is a prefix of current phrase being typed
        if (historyState.length > 0) {
            const topLower = historyState[0].original.trim().toLowerCase();
            // If user is actively extending/modifying the top phrase (e.g. "no" -> "no cap"), update top entry!
            if (currLower.startsWith(topLower) || topLower.startsWith(currLower)) {
                historyState[0] = { original: cleanOrig, translated, targetLang, timestamp: Date.now() };
                localStorage.setItem('vromlix_translator_history', JSON.stringify(historyState));
                renderHistory();
                return;
            }
        }

        // Add new unique phrase to top of history
        historyState = historyState.filter(h => h.original.toLowerCase() !== currLower);
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

// ==========================================
// TIEMPO ENGINE (STOPWATCH, ACTIVIDADES & DESCANSO)
// Reboot-resilient, SQLite-backed, 25-45m Deep Work Pomodoro,
// Street / Errands, Leisure, Sleep & Wake 1-click tracking.
// ==========================================
function initTiempo() {
    const timerDisplay = document.getElementById('timer-display');
    const timerSublabel = document.getElementById('timer-sublabel');
    const heroCard = document.getElementById('tiempo-hero-card');
    const activeBadge = document.getElementById('active-phase-badge');
    const phaseDot = document.getElementById('tiempo-phase-dot');
    const pomodoroFill = document.getElementById('pomodoro-fill');
    const pomodoroAlert = document.getElementById('pomodoro-alert');

    // Stat Elements
    const statNetWork = document.getElementById('stat-net-work');
    const statWorkEff = document.getElementById('stat-work-efficiency');
    const statTotalPauses = document.getElementById('stat-total-pauses');
    const statPauseCount = document.getElementById('stat-pause-count');
    const statTotalStreet = document.getElementById('stat-total-street');
    const statStreetCount = document.getElementById('stat-street-count');
    const statLastSleep = document.getElementById('stat-last-sleep');

    // List & Table Elements
    const pausesList = document.getElementById('pauses-breakdown-list');
    const streetList = document.getElementById('street-breakdown-list');
    const historyBody = document.getElementById('tiempo-history-body');

    let currentServerState = null;
    let localTickInterval = null;

    const PHASE_CONFIG = {
        'trabajo': { title: '💻 Trabajo Efectivo', class: 'phase-trabajo', color: 'var(--accent-primary)', sub: 'Enfoque Profundo (25-45m)' },
        'pausa': { title: '☕ Pausa Corta', class: 'phase-pausa', color: 'var(--accent-warning)', sub: 'Recuperación de 5 min' },
        'cocinar': { title: '🍳 Cocinar / Preparar', class: 'phase-cocinar', color: '#f97316', sub: 'Preparar comida / recoger' },
        'comida': { title: '🍽️ Comer / Alimentos', class: 'phase-comida', color: '#a855f7', sub: 'Tiempo de comer' },
        'bano': { title: '🚿 Baño / Aseo', class: 'phase-bano', color: '#06b6d4', sub: 'Ducha y aseo personal' },
        'descanso': { title: '🛋️ Siesta / Descanso', class: 'phase-descanso', color: '#14b8a6', sub: 'Descanso / Siesta' },
        'calle': { title: '🚶‍♂️ En la Calle / Diligencia', class: 'phase-calle', color: '#ea580c', sub: 'Salida de casa' },
        'ocio': { title: '🎬 Ocio / Videos', class: 'phase-ocio', color: '#ef4444', sub: 'Videos y relajación' },
        'espiritual': { title: '📖 Libro de Mormón', class: 'phase-espiritual', color: '#38bdf8', sub: 'Estudio de escrituras / Spotify' },
        'dormir': { title: '🌙 Durmiendo / Descanso', class: 'phase-dormir', color: '#6366f1', sub: 'Sueño nocturno' },
        'detenido': { title: '⏹️ Detenido', class: 'phase-detenido', color: 'var(--text-muted)', sub: 'Jornada pausada' }
    };

    function formatSecs(sec) {
        if (!sec || sec < 0) return '00:00:00';
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = Math.floor(sec % 60);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function formatShortSecs(sec) {
        if (!sec || sec <= 0) return '0m';
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    }

    const navTabTiempo = document.querySelector('.nav-tab-btn[data-view="view-tiempo"]');

    function updateDynamicFavicon(color) {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 32, 32);
            ctx.beginPath();
            ctx.arc(16, 16, 14, 0, 2 * Math.PI);
            ctx.fillStyle = color || '#374151';
            ctx.fill();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
            let link = document.querySelector("link[rel*='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = canvas.toDataURL();
        } catch (e) {}
    }

    function setNavTabGlow(phaseKey) {
        if (!navTabTiempo) return;
        navTabTiempo.classList.remove(
            'nav-tiempo-trabajo', 'nav-tiempo-pausa', 'nav-tiempo-calle',
            'nav-tiempo-comida', 'nav-tiempo-ocio', 'nav-tiempo-espiritual', 'nav-tiempo-dormir'
        );
        if (phaseKey && phaseKey !== 'detenido') {
            navTabTiempo.classList.add(`nav-tiempo-${phaseKey}`);
        }
    }

    function updateLiveTimerUI() {
        if (!currentServerState || !currentServerState.active_interval) {
            if (timerDisplay) timerDisplay.textContent = '00:00:00';
            if (timerSublabel) timerSublabel.textContent = 'Jornada detenida o en espera';
            if (activeBadge) {
                activeBadge.textContent = '⏹️ Detenido';
                activeBadge.className = 'phase-badge phase-detenido';
            }
            if (heroCard) heroCard.className = 'section-card tiempo-hero-card';
            if (phaseDot) phaseDot.style.background = 'transparent';
            if (pomodoroFill) pomodoroFill.style.width = '0%';
            if (pomodoroAlert) pomodoroAlert.style.display = 'none';
            setNavTabGlow('detenido');
            updateDynamicFavicon('#6b7280');
            document.title = '⏹️ Vromlix • Dashboard';
            highlightActiveButton('detenido');
            return;
        }

        const active = currentServerState.active_interval;
        const nowEpoch = Date.now() / 1000.0;
        const elapsed = Math.max(0, nowEpoch - active.start_epoch);
        const timeFormatted = formatSecs(elapsed);

        if (timerDisplay) timerDisplay.textContent = timeFormatted;

        const phaseKey = (active.phase || '').toLowerCase();
        const cfg = PHASE_CONFIG[phaseKey] || PHASE_CONFIG['trabajo'];

        const displayTitle = active.subtag ? `${cfg.title} (${active.subtag})` : cfg.title;
        if (activeBadge) {
            activeBadge.textContent = displayTitle;
            activeBadge.className = `phase-badge ${cfg.class}`;
        }
        if (timerSublabel) {
            timerSublabel.textContent = `${cfg.sub} • Iniciado a las ${active.start_iso ? active.start_iso.substring(11, 16) : ''}`;
        }
        if (phaseDot) phaseDot.style.background = cfg.color;
        
        // Pestaña Nav y Pestaña del Navegador Dinámicas
        setNavTabGlow(phaseKey);
        updateDynamicFavicon(cfg.color);
        document.title = `${cfg.title.split(' ')[0]} ${timeFormatted} | ${phaseKey.toUpperCase()} • Vromlix`;

        highlightActiveButton(phaseKey);

        // Dynamic Card Glow & Color Transition
        if (heroCard) {
            heroCard.className = `section-card tiempo-hero-card card-glow-${phaseKey}`;
        }

        // Pomodoro Progress Bar (0 to 45 mins target)
        if (pomodoroFill) {
            if (phaseKey === 'trabajo') {
                const targetSec = 45 * 60; // 45m deep work
                const pct = Math.min(100, Math.round((elapsed / targetSec) * 100));
                pomodoroFill.style.width = `${pct}%`;

                if (elapsed >= 45 * 60) {
                    pomodoroFill.style.background = 'var(--accent-warning)';
                    if (pomodoroAlert) {
                        pomodoroAlert.style.display = 'block';
                        pomodoroAlert.innerHTML = `⚠️ <b>Límite de 45m alcanzado (${formatShortSecs(elapsed)}):</b> Es momento óptimo para tomar tu pausa corta de 5 min y estirar el cuerpo.`;
                    }
                } else if (elapsed >= 25 * 60) {
                    pomodoroFill.style.background = 'var(--accent-primary)';
                    if (pomodoroAlert) {
                        pomodoroAlert.style.display = 'block';
                        pomodoroAlert.innerHTML = `💡 <b>25m de trabajo cumplidos (${formatShortSecs(elapsed)}):</b> Al cerrar tu idea o función actual, puedes tomar 5 min de descanso.`;
                    }
                } else {
                    pomodoroFill.style.background = 'var(--accent-success)';
                    if (pomodoroAlert) pomodoroAlert.style.display = 'none';
                }
            } else if (phaseKey === 'pausa') {
                const pauseTarget = 5 * 60; // 5 min
                const pct = Math.min(100, Math.round((elapsed / pauseTarget) * 100));
                pomodoroFill.style.width = `${pct}%`;
                pomodoroFill.style.background = 'var(--accent-warning)';
                if (elapsed >= 5 * 60) {
                    if (pomodoroAlert) {
                        pomodoroAlert.style.display = 'block';
                        pomodoroAlert.innerHTML = `☕ <b>Pausa de 5 minutos completada:</b> Listo para volver al trabajo efectivo con la mente despejada.`;
                    }
                } else {
                    if (pomodoroAlert) pomodoroAlert.style.display = 'none';
                }
            } else {
                pomodoroFill.style.width = '0%';
                if (pomodoroAlert) pomodoroAlert.style.display = 'none';
            }
        }
    }

    function highlightActiveButton(phase) {
        document.querySelectorAll('.btn-tiempo-hero, .btn-tiempo-subaction, .btn-sleep-action').forEach(btn => btn.classList.remove('active-phase'));
        const targetBtn = document.getElementById(`btn-phase-${phase}`);
        if (targetBtn) targetBtn.classList.add('active-phase');
    }

    function renderStats(state) {
        if (!state) return;
        currentServerState = state;

        if (statNetWork) statNetWork.textContent = state.net_work_formatted || '0m';
        if (statWorkEff) statWorkEff.textContent = `Eficiencia: ${state.efficiency_pct || 0}%`;

        if (statTotalPauses) statTotalPauses.textContent = state.total_pause_formatted || '0m';
        if (statPauseCount) statPauseCount.textContent = `${state.pause_count || 0} pausas`;

        if (statTotalStreet) statTotalStreet.textContent = state.street_formatted || '0m';
        if (statStreetCount) statStreetCount.textContent = `${(state.street_breakdown || []).length} salidas hoy`;

        if (statLastSleep) {
            if (state.last_sleep && state.last_sleep.duration_hours) {
                statLastSleep.textContent = `${state.last_sleep.duration_hours}h`;
            } else {
                statLastSleep.textContent = '--h';
            }
        }

        // Render Pauses Breakdown List
        if (pausesList) {
            const list = state.pauses_breakdown || [];
            if (list.length === 0) {
                pausesList.innerHTML = '<div class="empty-text">No has tomado pausas cortas aún hoy.</div>';
            } else {
                pausesList.innerHTML = list.map((p, idx) => `
                    <div class="tiempo-breakdown-item">
                        <span class="breakdown-idx">Pausa #${idx + 1}</span>
                        <span class="breakdown-range">${p.start} ➔ ${p.end}</span>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span class="breakdown-dur badge-amber">${p.duration_formatted}</span>
                            <button class="tiempo-delete-btn" onclick="window.eliminarIntervalo(${p.id})" title="Eliminar registro de prueba">🗑️</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Render Street Breakdown List
        if (streetList) {
            const list = state.street_breakdown || [];
            if (list.length === 0) {
                streetList.innerHTML = '<div class="empty-text">Sin salidas registradas hoy.</div>';
            } else {
                streetList.innerHTML = list.map(s => `
                    <div class="tiempo-breakdown-item">
                        <span class="breakdown-idx">🚶‍♂️ ${escapeHTML(s.subtag)}</span>
                        <span class="breakdown-range">${s.time}</span>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span class="breakdown-dur badge-orange">${s.duration_formatted}</span>
                            <button class="tiempo-delete-btn" onclick="window.eliminarIntervalo(${s.id})" title="Eliminar registro de prueba">🗑️</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Render ALL Sessions of Today (with dynamic category filter & prominent delete buttons)
        window.lastKnownTimeIntervals = state.today_intervals || [];
        renderFilteredIntervals();
    }

    let currentIntervalFilter = 'todos';
    window.filtrarIntervalos = function(filter) {
        currentIntervalFilter = filter;
        document.querySelectorAll('.filter-pill').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${filter}'`));
        });
        renderFilteredIntervals();
    };

    function renderFilteredIntervals() {
        const allIntervalsList = document.getElementById('today-all-intervals-list');
        if (!allIntervalsList) return;

        const list = window.lastKnownTimeIntervals || [];
        let filtered = list;
        if (currentIntervalFilter === 'trabajo') {
            filtered = list.filter(item => (item.phase || '').toLowerCase() === 'trabajo');
        } else if (currentIntervalFilter === 'pausa') {
            filtered = list.filter(item => (item.phase || '').toLowerCase() === 'pausa');
        } else if (currentIntervalFilter === 'calle') {
            filtered = list.filter(item => (item.phase || '').toLowerCase() === 'calle');
        } else if (currentIntervalFilter === 'otros') {
            filtered = list.filter(item => {
                const p = (item.phase || '').toLowerCase();
                return p === 'comida' || p === 'cocinar' || p === 'bano' || p === 'descanso' || p === 'ocio' || p === 'espiritual';
            });
        }

        if (filtered.length === 0) {
            allIntervalsList.innerHTML = '<div class="empty-text">Sin registros bajo este filtro hoy.</div>';
            return;
        }

        allIntervalsList.innerHTML = filtered.map(item => {
            const phase = (item.phase || '').toLowerCase();
            const cfg = PHASE_CONFIG[phase] || { title: phase.toUpperCase(), color: '#9ca3af' };
            const startStr = item.start_iso ? item.start_iso.substring(11, 16) : '';
            const endStr = item.end_iso ? item.end_iso.substring(11, 16) : (item.is_active ? 'En curso ⏳' : '');
            const dur = formatShortSecs(item.duration_seconds || 0);
            return `
                <div class="tiempo-breakdown-item" style="border-left: 3px solid ${cfg.color};">
                    <div>
                        <span class="breakdown-idx" style="color: ${cfg.color}; font-weight: 700;">${cfg.title}</span>
                        ${item.subtag ? `<span style="color: #cbd5e1; font-size: 0.88rem; margin-left: 6px;">• ${escapeHTML(item.subtag)}</span>` : ''}
                        <span class="breakdown-range" style="margin-left: 10px; color: #94a3b8; font-size: 0.84rem;">(${startStr} ➔ ${endStr})</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span class="breakdown-dur" style="background: rgba(255,255,255,0.06); color: ${cfg.color}; font-weight:700;">${dur}</span>
                        <button class="tiempo-delete-btn" onclick="window.eliminarIntervalo(${item.id})" title="Eliminar este registro de prueba">🗑️ Borrar</button>
                    </div>
                </div>
            `;
        }).reverse().join('');
    }

    window.eliminarIntervalo = function(id) {
        if (!id) return;
        if (!confirm("¿Eliminar este registro de tiempo? (Ideal para limpiar pruebas)")) return;
        fetch('/api/time/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        .then(res => res.json())
        .then(data => {
            if (data.state) {
                renderStats(data.state);
                updateLiveTimerUI();
                loadHistory();
                showToast("🗑️ Registro de prueba eliminado.");
            }
        })
        .catch(err => {
            showToast("Error eliminando registro.");
        });
    };

    function loadServerState() {
        fetch('/api/time/state')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    renderStats(data);
                    updateLiveTimerUI();
                    localStorage.setItem('vromlix_time_cached_state', JSON.stringify(data));
                    updateSyncBadge(true);
                }
            })
            .catch(err => {
                console.log("No se pudo conectar a /api/time/state, usando caché offline:", err);
                updateSyncBadge(false);
                try {
                    const cached = JSON.parse(localStorage.getItem('vromlix_time_cached_state') || 'null');
                    if (cached) renderStats(cached);
                } catch(e) {}
            });
    }

    function loadHistory() {
        if (!historyBody) return;
        fetch('/api/time/history')
            .then(res => res.json())
            .then(data => {
                const list = data.history || [];
                if (list.length === 0) {
                    historyBody.innerHTML = '<tr><td colspan="7" style="text-align:center; color: var(--text-muted); padding: 12px;">Sin registros anteriores aún.</td></tr>';
                    return;
                }
                historyBody.innerHTML = list.map(item => `
                    <tr>
                        <td><b>${item.date}</b></td>
                        <td>${item.sleep_hours ? `<span class="badge-indigo">${item.sleep_hours}h</span>` : '--'}</td>
                        <td><span class="badge-cyan">${formatShortSecs(item.trabajo)}</span></td>
                        <td>${formatShortSecs(item.pausa)}</td>
                        <td>${formatShortSecs(item.calle)}</td>
                        <td>${formatShortSecs(item.comida)}</td>
                        <td>${formatShortSecs(item.ocio)}</td>
                    </tr>
                `).join('');
            })
            .catch(() => {});
    }

    function updateSyncBadge(isOnline) {
        const syncBadge = document.getElementById('sync-status-indicator');
        if (syncBadge) {
            if (isOnline) {
                syncBadge.textContent = '🟢 Sync';
                syncBadge.className = 'sync-indicator sync-online';
                syncBadge.title = 'Conectado y sincronizado con tu laptop';
            } else {
                syncBadge.textContent = '🟠 Offline';
                syncBadge.className = 'sync-indicator sync-offline';
                syncBadge.title = 'Modo local autónomo (se sincronizará al conectar)';
            }
        }
    }

    // Exposed Global Actions for UI Buttons
    window.cambiarFaseTiempo = function(phase, subtag = '', note = '') {
        const calleMenu = document.getElementById('calle-presets-menu');
        if (calleMenu) calleMenu.classList.add('hidden');

        // Optimistic UI state
        if (currentServerState) {
            if (phase === 'detener') {
                currentServerState.active_interval = null;
            } else {
                currentServerState.active_interval = {
                    phase: phase,
                    subtag: subtag,
                    start_epoch: Date.now() / 1000.0,
                    start_iso: new Date().toISOString()
                };
            }
            updateLiveTimerUI();
        }

        fetch('/api/time/lap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phase, subtag, note })
        })
        .then(res => res.json())
        .then(data => {
            if (data.state) {
                renderStats(data.state);
                updateLiveTimerUI();
                if (phase.toLowerCase() === 'trabajo') {
                    showToast("⚡ SOY UN GENERADOR IMPARABLE DE RIQUEZA Y VALOR");
                } else {
                    showToast(`Fase activada: ${phase.toUpperCase()}`);
                }
            }
        })
        .catch(err => {
            if (phase.toLowerCase() === 'trabajo') {
                showToast("⚡ SOY UN GENERADOR IMPARABLE DE RIQUEZA Y VALOR");
            } else {
                showToast(`Fase activada localmente: ${phase.toUpperCase()}`);
            }
            updateSyncBadge(false);
        });
    };

    window.marcarDormir = function() {
        if (!confirm("¿Marcar inicio de descanso / A dormir?")) return;
        window.cambiarFaseTiempo('dormir', 'noche', 'A dormir');
        showToast("🌙 Que descanses bien Roger. Sueño registrado.");
    };

    window.marcarDespertar = function() {
        fetch('/api/time/wake', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note: 'Despertar' })
        })
        .then(res => res.json())
        .then(data => {
            if (data.state) {
                renderStats(data.state);
                updateLiveTimerUI();
                loadHistory();
                showToast("☀️ ¡Buenos días! Sueño guardado. Selecciona tu siguiente actividad (Baño, Libro de Mormón, Cocinar o Trabajo).");
            }
        })
        .catch(() => {
            window.cambiarFaseTiempo('detener', '', 'Despertar');
            showToast("☀️ ¡Buenos días! Sueño finalizado.");
        });
    };

    window.toggleCalleMenu = function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        const menu = document.getElementById('calle-presets-menu');
        if (menu) menu.classList.toggle('hidden');
    };

    // Cerrar menú de calle al dar clic fuera
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('calle-presets-menu');
        const btn = document.getElementById('btn-phase-calle');
        if (menu && !menu.classList.contains('hidden')) {
            if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
                menu.classList.add('hidden');
            }
        }
    });

    window.handleAudioFileSelected = function(fileInput) {
        if (!fileInput.files || !fileInput.files[0]) return;
        const file = fileInput.files[0];
        const statusLabel = document.getElementById('audio-upload-status');
        if (statusLabel) {
            statusLabel.textContent = `⏳ Subiendo "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`;
            statusLabel.style.color = 'var(--accent-warning)';
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Audio = e.target.result;
            fetch('/api/audio/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: file.name,
                    audio_base64: base64Audio
                })
            })
            .then(res => res.json())
            .then(resp => {
                if (resp.success) {
                    if (statusLabel) {
                        statusLabel.textContent = `✅ Guardado en VROMLIX_DATA/audio_recordings listo para Whisper`;
                        statusLabel.style.color = 'var(--accent-success)';
                    }
                    showToast(`Grabación recibida: ${file.name}`);
                } else {
                    if (statusLabel) statusLabel.textContent = `❌ Error: ${resp.error}`;
                }
            })
            .catch(err => {
                if (statusLabel) statusLabel.textContent = `❌ Error al subir: ${err.message}`;
            });
        };
        reader.readAsDataURL(file);
    };

    // Auto-ticking interval (1s)
    if (localTickInterval) clearInterval(localTickInterval);
    localTickInterval = setInterval(updateLiveTimerUI, 1000);

    // Initial load
    loadServerState();
    loadHistory();

    // Polling periódico continuo (cada 3s) para sincronización en tiempo real con widget y móvil
    setInterval(loadServerState, 3000);

    // Re-check on visibilitychange and focus
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            loadServerState();
            loadHistory();
        }
    });
}

