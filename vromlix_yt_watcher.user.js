// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      5.0
// @description  Reproduce efectivamente los últimos 8s sin interrupciones y auto-cierra la pestaña al terminar
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

    console.log('[Vromlix] Script v5.0 activo: iniciando sincronización...');

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

    updateHud('Cargando reproductor de YouTube...', '#f59e0b');

    let isFinished = false;
    let hasMuted = false;
    let actualPlayedSeconds = 0;
    let lastPlayVideoAttempt = 0;

    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;
        updateHud('✅ <b>¡Video terminado al 100%!</b> Registrando en historial y cerrando...', '#10b981');
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube. Cerrando pestaña en 2.5s...');
        
        // Esperar 2.5 segundos para garantizar que el ping de watchtime termine de enviarse
        setTimeout(() => {
            window.close();
        }, 2500);
    }

    // 3. Loop de control inteligente cada 250ms
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

        if (!player) {
            updateHud('Esperando inicialización del reproductor...', '#f59e0b');
            return;
        }

        // Silenciar UNA SOLA VEZ para no generar eventos continuos de volumen
        if (!hasMuted && typeof player.mute === 'function') {
            try {
                player.mute();
                hasMuted = true;
            } catch(e) {}
        }

        // Consultar estado nativo del reproductor de YouTube:
        // -1 = Unstarted, 0 = Ended, 1 = Playing, 2 = Paused, 3 = Buffering, 5 = Cued
        const state = (typeof player.getPlayerState === 'function') ? player.getPlayerState() : -1;

        if (state === 0 || (video && video.ended)) {
            // Video finalizado por completo
            clearInterval(pollInterval);
            finishAndClose();
            return;
        }

        if (state === 1) {
            // ESTADO REPRODUCIENDO: ¡NO TOCAR NADA! Dejar que fluya naturalmente sin clics ni llamadas
            actualPlayedSeconds += 0.25;
            updateHud(`Reproduciendo últimos 8s: <b>${actualPlayedSeconds.toFixed(1)}s / 8.0s</b>`, '#38bdf8');

            // Si ya corrió al menos 7.5 segundos de reproducción activa
            if (actualPlayedSeconds >= 7.5) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        } else if (state === 2 || state === -1 || state === 5) {
            // ESTADO PAUSADO O INICIAL: Ordenar play de manera espaciada (máximo 1 vez cada 1.5s para no hacer toggle)
            const now = Date.now();
            if (now - lastPlayVideoAttempt > 1500) {
                lastPlayVideoAttempt = now;
                updateHud('Iniciando reproducción de los últimos 8 segundos...', '#f59e0b');
                try {
                    player.playVideo();
                } catch(e) {}
            }
        } else if (state === 3) {
            // BUFFERING: Esperar a que cargue
            updateHud('Cargando stream de video...', '#f59e0b');
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
