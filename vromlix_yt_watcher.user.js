// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      8.0
// @description  Secuencia infalible de 2 fases: Inicio (3s) + Salto al final hasta Ended para marcar 100% en historial con silencio absoluto
// @author       Vromlix Core
// @match        https://www.youtube.com/watch*
// @grant        window.close
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Solo intervenir si la URL tiene el parámetro vromlix_auto=1
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('vromlix_auto')) return;

    console.log('[Vromlix] Script v8.0 activo: Secuencia 2 Fases (Inicio + Final Completo)...');

    // 2. Bypass preventivo de 'Improve YouTube!' para evitar que congele la reproducción
    try {
        const injectScript = document.createElement('script');
        injectScript.textContent = `
            (function() {
                function unblock() {
                    if (window.ImprovedTube) {
                        window.ImprovedTube.user_interacted = true;
                        if (window.ImprovedTube.storage) {
                            window.ImprovedTube.storage.player_autoplay_disable = false;
                        }
                    }
                }
                unblock();
                setInterval(unblock, 200);
            })();
        `;
        (document.head || document.documentElement).appendChild(injectScript);
    } catch(e) {}

    // 3. HUD Visual no invasivo
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

    // 4. Máquina de Estados: 'INIT_PLAY' (3s) -> 'SEEKING' -> 'END_PLAY' -> 'FINISHED'
    let phase = 'INIT_PLAY';
    let initialPlayedSec = 0;
    let endPlayedSec = 0;
    let targetSeekSec = 0;
    let seekStartTime = 0;
    let lastTickTime = Date.now();
    let isFinished = false;

    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;
        updateHud('✅ <b>¡Video completado al 100%!</b> Registrando en historial y cerrando...', '#10b981');
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube. Cerrando pestaña en 3.5s...');
        
        // Esperar 3.5 segundos para garantizar que el beacon de finalización (state=ended, cmt=duration) viaje a los servidores de Google
        setTimeout(() => {
            window.close();
        }, 3500);
    }

    // 5. Silencio Absoluto (100% Mute en cada tick)
    function enforceStrictMute(video, player) {
        if (video) {
            if (!video.muted) video.muted = true;
            if (video.volume !== 0) video.volume = 0;
        }
        if (player && typeof player.isMuted === 'function') {
            if (!player.isMuted()) {
                try { player.mute(); } catch(e) {}
            }
        }
    }

    // 6. Asegurar reproducción activa si el reproductor está pausado
    let lastPlayAttempt = 0;
    function ensurePlaying(video, player) {
        const now = Date.now();
        if (now - lastPlayAttempt < 1200) return;
        lastPlayAttempt = now;

        enforceStrictMute(video, player);

        // A. Clic en botón de barra
        const playBtn = document.querySelector('.ytp-play-button');
        if (playBtn) {
            const btnState = (playBtn.getAttribute('aria-label') || playBtn.getAttribute('title') || '').toLowerCase();
            if (btnState.includes('play') || btnState.includes('reproducir') || playBtn.getAttribute('data-title-no-tooltip') === 'Play') {
                try { playBtn.click(); } catch(e) {}
            }
        }

        // B. Pulsación de tecla 'K'
        const keyEventInit = { key: 'k', code: 'KeyK', keyCode: 75, which: 75, bubbles: true, cancelable: true, composed: true, view: window };
        if (player) {
            try { player.focus(); } catch(e) {}
            try { player.dispatchEvent(new KeyboardEvent('keydown', keyEventInit)); } catch(e) {}
            try { player.dispatchEvent(new KeyboardEvent('keyup', keyEventInit)); } catch(e) {}
        }
        try { document.dispatchEvent(new KeyboardEvent('keydown', keyEventInit)); } catch(e) {}
        try { document.dispatchEvent(new KeyboardEvent('keyup', keyEventInit)); } catch(e) {}

        // C. HTML5 video.play()
        if (video && typeof video.play === 'function') {
            try { video.play().catch(() => {}); } catch(e) {}
        }

        // D. Player API
        if (player && typeof player.playVideo === 'function') {
            try { player.playVideo(); } catch(e) {}
        }
    }

    // 7. Loop de control cada 250ms
    const pollInterval = setInterval(() => {
        if (isFinished) {
            clearInterval(pollInterval);
            return;
        }

        const now = Date.now();
        const deltaReal = (now - lastTickTime) / 1000;
        lastTickTime = now;

        const player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
        const video = document.querySelector('video.html5-main-video, video');

        // Mute implacable en todo momento
        enforceStrictMute(video, player);

        // Saltar anuncios automáticamente
        const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern, .ytp-ad-overlay-close-button');
        if (skipBtn) {
            try { skipBtn.click(); } catch(e) {}
        }

        // Diálogo de confirmación
        const confirmBtn = document.querySelector('yt-confirm-dialog-renderer #confirm-button button');
        if (confirmBtn) {
            try { confirmBtn.click(); } catch(e) {}
        }

        if (!player && !video) {
            updateHud('Cargando reproductor de YouTube...', '#f59e0b');
            return;
        }

        const duration = (video && video.duration && !isNaN(video.duration)) ? video.duration : (player && player.getDuration ? player.getDuration() : 0);
        const curTime = (video && typeof video.currentTime === 'number') ? video.currentTime : (player && player.getCurrentTime ? player.getCurrentTime() : 0);
        const state = (player && typeof player.getPlayerState === 'function') ? player.getPlayerState() : -1;
        const isPlaying = (state === 1) || (video && !video.paused && curTime > 0);

        // Si está pausado y no hemos terminado, forzar play
        if (!isPlaying && state !== 0 && !(video && video.ended)) {
            ensurePlaying(video, player);
        }

        // -------------------------------------------------------------
        // FASE 1: REPRODUCCIÓN INICIAL (Primeros 3 segundos para sesión limpia)
        // -------------------------------------------------------------
        if (phase === 'INIT_PLAY') {
            if (isPlaying && deltaReal > 0.05 && deltaReal < 2.0) {
                initialPlayedSec += deltaReal;
            }
            updateHud(`Paso 1/2: Registrando inicio de video (<b>${initialPlayedSec.toFixed(1)}s / 3.0s</b>)...`, '#38bdf8');

            // Una vez que ya corrió 3 segundos al inicio y tenemos la duración total
            if (initialPlayedSec >= 3.0 && duration > 10) {
                targetSeekSec = Math.max(0, duration - 6);
                console.log(`[Vromlix] Paso 1 completado. Saltando al final: ${targetSeekSec.toFixed(1)}s de ${duration.toFixed(1)}s`);
                updateHud(`Paso 2/2: Saltando a los últimos segundos (${targetSeekSec.toFixed(0)}s de ${duration.toFixed(0)}s)...`, '#f59e0b');

                // UN SOLO SALTO LIMPIO
                try {
                    if (player && typeof player.seekTo === 'function') {
                        player.seekTo(targetSeekSec, true);
                    }
                    if (video) {
                        video.currentTime = targetSeekSec;
                        // Acelerar a 1.5x o 2x los últimos segundos para mayor rapidez
                        video.playbackRate = 1.5;
                    }
                } catch(e) {}

                phase = 'SEEKING';
                seekStartTime = now;
            }
            return;
        }

        // -------------------------------------------------------------
        // FASE 2: ESPERAR BUFFER DEL SALTO (Máximo 3.5s de buffer)
        // -------------------------------------------------------------
        if (phase === 'SEEKING') {
            const hasLandedAtEnd = (curTime >= targetSeekSec - 1.5);
            const seekTimeElapsed = (now - seekStartTime) / 1000;

            if (hasLandedAtEnd || seekTimeElapsed > 3.5) {
                phase = 'END_PLAY';
                console.log('[Vromlix] Salto completado con éxito. Reproduciendo final hasta el 100%...');
            } else {
                updateHud('Cargando últimos segundos...', '#f59e0b');
                return;
            }
        }

        // -------------------------------------------------------------
        // FASE 3: REPRODUCIR HASTA EL FINAL (ENDED / 100%)
        // -------------------------------------------------------------
        if (phase === 'END_PLAY') {
            if (isPlaying && deltaReal > 0.05 && deltaReal < 2.0) {
                endPlayedSec += deltaReal;
            }

            const currentPosStr = curTime.toFixed(0);
            const totalDurStr = duration > 0 ? duration.toFixed(0) : '?';
            updateHud(`Paso 2/2: Reproduciendo final (<b>${currentPosStr}s / ${totalDurStr}s</b>): ${endPlayedSec.toFixed(1)}s / 5.0s`, '#38bdf8');

            // DETECCIÓN DE FINALIZACIÓN 100%:
            // 1) Video llegó al evento nativo ended
            // 2) Player state es 0 (Ended)
            // 3) Cabezal está a menos de 0.4s de la duración total
            // 4) Ya corrió más de 5.5s en la fase final
            const isAtVeryEnd = (state === 0) || (video && video.ended) || (duration > 0 && curTime >= (duration - 0.4));
            
            if (isAtVeryEnd || endPlayedSec >= 5.5) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        }
    }, 250);

    // 8. Temporizador de seguridad máximo (45 segundos)
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Timeout de seguridad alcanzado (45s). Finalizando...');
            clearInterval(pollInterval);
            finishAndClose();
        }
    }, 45000);
})();
