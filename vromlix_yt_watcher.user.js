// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      4.0
// @description  Reproduce efectivamente los últimos 8s y auto-cierra la pestaña una vez registrado en el historial
// @author       Vromlix Core
// @match        https://www.youtube.com/watch*
// @grant        window.close
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 1. Solo intervenir si la URL tiene el parámetro vromlix_auto=1
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('vromlix_auto')) return;

    console.log('[Vromlix] Script v4.0 activo en YouTube watch page');

    // 2. HUD Visual no invasivo
    let hud = null;
    function updateHud(text, color = '#38bdf8') {
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
    let actualPlayedSeconds = 0;
    let lastTime = -1;
    let hasStartedRealPlay = false;

    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;
        updateHud('✅ <b>¡Video terminado al 100%!</b> Registrando en historial y cerrando...', '#10b981');
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube. Cerrando pestaña en 2s...');
        
        // Esperar 2 segundos para asegurar que el ping de watchtime se envíe a los servidores de Google
        setTimeout(() => {
            window.close();
        }, 2000);
    }

    // 3. Loop de control cada 250ms
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

        // Silenciar para garantizar que Firefox y el reproductor permitan autoplay
        if (player && typeof player.mute === 'function' && !player.isMuted()) {
            try { player.mute(); player.setVolume(0); } catch(e) {}
        }
        if (video && (!video.muted || video.volume > 0)) {
            video.muted = true;
            video.volume = 0;
        }

        // Intentar dar Play si está en pausa
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

        // Clic en botón central grande de play si existe
        const largeBtn = document.querySelector('.ytp-large-play-button');
        if (largeBtn && largeBtn.offsetParent !== null) {
            try { largeBtn.click(); } catch(e) {}
        }

        // Forzar play en la etiqueta <video>
        if (video) {
            if (video.ended) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }

            if (video.paused) {
                video.play().catch(() => {});
            }

            // Monitorear avance real de tiempo
            const curr = video.currentTime;
            if (lastTime >= 0) {
                const delta = curr - lastTime;
                // Si el tiempo avanzó suavemente entre 0.05s y 1.2s, es reproducción real (no salto de búfer)
                if (delta > 0.05 && delta < 1.2) {
                    hasStartedRealPlay = true;
                    actualPlayedSeconds += delta;
                    updateHud(`Reproduciendo últimos 8s: <b>${actualPlayedSeconds.toFixed(1)}s / 8.0s</b>`, '#38bdf8');
                } else if (delta > 1.2) {
                    updateHud('Cargando últimos 8 segundos...', '#f59e0b');
                }
            } else {
                updateHud('Conectando con reproductor...', '#38bdf8');
            }
            lastTime = curr;

            // Condición de cierre:
            // 1. Llegó al evento ended, O
            // 2. Ha acumulado al menos 7.5 segundos de reproducción real, O
            // 3. Ya arrancó y está a menos de 0.3s del final del video
            const isNearEnd = video.duration > 0 && curr >= (video.duration - 0.3);
            if (hasStartedRealPlay && (actualPlayedSeconds >= 7.5 || isNearEnd)) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        }
    }, 250);

    // 4. Temporizador de seguridad máximo (45 segundos)
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Timeout de seguridad (45s). Cerrando...');
            clearInterval(pollInterval);
            finishAndClose();
        }
    }, 45000);
})();
