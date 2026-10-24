// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      3.0
// @description  Reproduce efectivamente los últimos 4s en segundo plano y auto-cierra la pestaña una vez terminado
// @author       Vromlix Core
// @match        https://www.youtube.com/watch*
// @grant        window.close
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Solo intervenir si la URL tiene el parámetro vromlix_auto=1
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('vromlix_auto')) return;

    console.log('[Vromlix] Script v3.0 activado: monitoreo estricto de reproducción...');

    // 2. BYPASS DE VISIBILIDAD: Engañar a YouTube para que crea que la pestaña está activa y visible
    try {
        Object.defineProperty(document, 'hidden', { value: false, writable: false, configurable: true });
        Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: false, configurable: true });
    } catch(e) {}

    // Interceptar listeners de visibilitychange para que YouTube no pause el reproductor
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = function(type, listener, options) {
        if (type === 'visibilitychange') return; // Bloquear pausas automáticas de YouTube
        return originalAddEventListener.call(this, type, listener, options);
    };

    // 3. Crear HUD visual flotante en la esquina superior derecha
    let hud = null;
    function createOrUpdateHud(text, color = '#38bdf8') {
        try {
            if (!hud && document.body) {
                hud = document.createElement('div');
                hud.id = 'vromlix-yt-hud';
                hud.style.cssText = 'position:fixed;top:16px;right:16px;z-index:2147483647;background:rgba(15,23,42,0.96);color:#f8fafc;padding:12px 18px;border-radius:12px;font-family:system-ui,sans-serif;font-size:13px;border:1px solid #38bdf8;box-shadow:0 8px 30px rgba(0,0,0,0.8);pointer-events:none;';
                document.body.appendChild(hud);
            }
            if (hud) {
                hud.innerHTML = `<span style="color:${color};font-weight:700;">⚡ VROMLIX</span> · ${text}`;
            }
        } catch(e) {}
    }

    let isFinished = false;
    let actualPlaybackTicks = 0; // Contaremos ticks de 250ms donde el video ESTÁ ACTIVAMENTE AVANZANDO
    let lastTime = -1;
    let hasStartedRealPlay = false;

    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;
        createOrUpdateHud('✅ <b>¡Video terminado al 100%!</b> Registrando en historial y cerrando...', '#10b981');
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube. Cerrando pestaña en 1.5s...');
        
        // Esperar 1.5 segundos para garantizar que el beacon de watchtime llegue a los servidores de Google
        setTimeout(() => {
            window.close();
        }, 1500);
    }

    // 4. Loop de control inteligente cada 250ms
    const pollInterval = setInterval(() => {
        if (isFinished) {
            clearInterval(pollInterval);
            return;
        }

        const player = document.getElementById('movie_player');
        const video = document.querySelector('video');

        // Saltar anuncios si aparecen
        const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern');
        if (skipBtn) {
            try { skipBtn.click(); } catch(e) {}
        }

        // SILENCIAR SIEMPRE (Requisito fundamental para que Firefox permita reproducción automática sin interacción)
        if (player && typeof player.mute === 'function' && !player.isMuted()) {
            try { player.mute(); player.setVolume(0); } catch(e) {}
        }
        if (video && (!video.muted || video.volume > 0)) {
            video.muted = true;
            video.volume = 0;
        }

        // FORZAR PLAY
        if (player && typeof player.playVideo === 'function') {
            const state = player.getPlayerState();
            // -1: unstarted, 2: paused, 5: cued
            if (state === 2 || state === -1 || state === 5) {
                try { player.playVideo(); } catch(e) {}
            } else if (state === 0) { // 0 = ENDED
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        }

        // Clic en el botón grande de Play si está visible
        const largeBtn = document.querySelector('.ytp-large-play-button');
        if (largeBtn && largeBtn.offsetParent !== null) {
            try { largeBtn.click(); } catch(e) {}
        }

        // Forzar play en el tag <video>
        if (video) {
            if (video.ended) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }

            if (video.paused) {
                video.play().catch(() => {});
            }

            // MEDIR REPRODUCCIÓN REAL:
            // Un salto grande de tiempo (> 1.5s) es un SEEK del búfer, NO reproducción.
            // Solo contamos como reproducción real si el tiempo avanza suavemente entre 0.05s y 1.2s
            const curr = video.currentTime;
            if (lastTime >= 0) {
                const delta = curr - lastTime;
                if (delta > 0.05 && delta < 1.2) {
                    hasStartedRealPlay = true;
                    actualPlaybackTicks++;
                    const playedSeconds = (actualPlaybackTicks * 0.25).toFixed(1);
                    createOrUpdateHud(`Reproduciendo últimos 4s: <b>${playedSeconds}s / 4.0s</b>`, '#38bdf8');
                } else if (delta > 1.2) {
                    console.log(`[Vromlix] Salto de búfer detectado: ${lastTime.toFixed(1)}s -> ${curr.toFixed(1)}s`);
                    createOrUpdateHud('Posicionando en últimos 4 segundos...', '#f59e0b');
                }
            } else {
                createOrUpdateHud('Iniciando reproductor de YouTube...', '#38bdf8');
            }
            lastTime = curr;

            // CONDICIÓN DE TÉRMINO:
            // 1. El video llegó a su fin (video.ended), O
            // 2. Se han reproducido al menos 15 ticks reales (3.75 segundos de avance continuo), O
            // 3. El tiempo actual está dentro de los últimos 0.4s de la duración Y YA INICIÓ la reproducción real
            const isNearEnd = video.duration > 0 && curr >= (video.duration - 0.4);
            if (hasStartedRealPlay && (actualPlaybackTicks >= 15 || isNearEnd)) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        }
    }, 250);

    // 5. Temporizador de seguridad máximo (35 segundos) por si hay error grave de red o video inaccesible
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Timeout de seguridad alcanzado (35s). Cerrando...');
            clearInterval(pollInterval);
            finishAndClose();
        }
    }, 35000);
})();
