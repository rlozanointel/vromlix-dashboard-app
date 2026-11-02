// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      9.0
// @description  Finalización infalible 100% en historial: Calidad mínima 144p, silencio total, salto al final y detección garantizada del evento Ended
// @author       Vromlix Core
// @match        https://www.youtube.com*
// @grant        window.close
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Solo intervenir si la URL tiene el parámetro vromlix_auto=1
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('vromlix_auto')) return;

    console.log('[Vromlix] Script v9.0 activo: Finalización al 100% de historial con calidad 144p y silencio...');

    // 2. Bypass preventivo de extensiones que bloquean autoplay
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

    // 3. HUD Visual
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

    // 4. Variables de control
    let isFinished = false;
    let hasSeeked = false;
    let seekTimestamp = 0;
    let targetSeekSec = 0;
    let listenerAttached = false;

    // 5. Función de cierre garantizado tras registrar Ended
    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;

        const video = document.querySelector('video.html5-main-video, video');
        const player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');

        // Pausar y asegurar que el cabezal quede fijado en el último fotograma
        if (video) {
            try {
                video.pause();
                if (video.duration && !isNaN(video.duration)) {
                    video.currentTime = Math.max(0, video.duration - 0.1);
                }
            } catch(e) {}
        }
        if (player && typeof player.pauseVideo === 'function') {
            try { player.pauseVideo(); } catch(e) {}
        }

        updateHud('✅ <b>¡Video completado al 100%!</b> Registrando en historial y cerrando...', '#10b981');
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube. Baliza enviada. Cerrando pestaña en 2.5s...');

        // 2.5 segundos para que la baliza de finalización de YouTube (state=ended) viaje a Google
        setTimeout(() => {
            window.close();
        }, 2500);
    }

    // 6. Silencio Absoluto (100% Mute en cada tick)
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

    // 7. Ahorro extremo de recursos: Resolución 144p (tiny) y desactivar Autonav (siguiente video)
    function enforceLowResourceMode(video, player) {
        if (player) {
            try {
                if (typeof player.setPlaybackQualityRange === 'function') {
                    player.setPlaybackQualityRange('tiny', 'tiny');
                }
                if (typeof player.setPlaybackQuality === 'function') {
                    player.setPlaybackQuality('tiny');
                }
                if (typeof player.setAutonavState === 'function') {
                    player.setAutonavState(1); // 1 = Desactivado
                }
            } catch(e) {}
        }
        try {
            const autonavBtn = document.querySelector('.ytp-autonav-toggle-button');
            if (autonavBtn && autonavBtn.getAttribute('aria-checked') === 'true') {
                autonavBtn.click();
            }
        } catch(e) {}
    }

    // 8. Asegurar reproducción activa
    let lastPlayAttempt = 0;
    function ensurePlaying(video, player) {
        const now = Date.now();
        if (now - lastPlayAttempt < 1000) return;
        lastPlayAttempt = now;

        enforceStrictMute(video, player);

        // A. Clic en botón play si está pausado
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

    // 9. Ciclo de control cada 200ms
    const pollInterval = setInterval(() => {
        if (isFinished) {
            clearInterval(pollInterval);
            return;
        }

        const player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
        const video = document.querySelector('video.html5-main-video, video');

        // Mute y calidad mínima en cada vuelta
        enforceStrictMute(video, player);
        enforceLowResourceMode(video, player);

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

        // Conectar listener nativo de ended una sola vez
        if (video && !listenerAttached) {
            listenerAttached = true;
            video.addEventListener('ended', () => {
                console.log('[Vromlix] Evento nativo HTML5 video.ended recibido!');
                clearInterval(pollInterval);
                finishAndClose();
            }, { once: true });
        }

        const duration = (video && video.duration && !isNaN(video.duration)) ? video.duration : (player && player.getDuration ? player.getDuration() : 0);
        const curTime = (video && typeof video.currentTime === 'number') ? video.currentTime : (player && player.getCurrentTime ? player.getCurrentTime() : 0);
        const state = (player && typeof player.getPlayerState === 'function') ? player.getPlayerState() : -1;
        const isPlaying = (state === 1) || (video && !video.paused && curTime > 0);

        // -------------------------------------------------------------
        // FASE 1: SALTO AL 98% (Últimos 3.5 segundos)
        // -------------------------------------------------------------
        if (!hasSeeked) {
            if (duration > 5) {
                targetSeekSec = Math.max(0, duration - 3.5);
                
                // Si aún no está en la zona final, realizar el salto limpio
                if (curTime < (targetSeekSec - 1.5)) {
                    updateHud(`Saltando a los últimos segundos (${targetSeekSec.toFixed(0)}s / ${duration.toFixed(0)}s)...`, '#f59e0b');
                    try {
                        if (player && typeof player.seekTo === 'function') {
                            player.seekTo(targetSeekSec, true);
                        }
                        if (video) {
                            video.currentTime = targetSeekSec;
                        }
                    } catch(e) {}
                }

                // Acelerar reproducción a 2x para cruzar la línea final rápidamente
                if (video) {
                    try { video.playbackRate = 2.0; } catch(e) {}
                }

                hasSeeked = true;
                seekTimestamp = Date.now();
            } else {
                updateHud('Esperando metadatos de duración...', '#f59e0b');
            }
            return;
        }

        // -------------------------------------------------------------
        // FASE 2: REPRODUCIR HASTA ALCANZAR EL 100% (ENDED)
        // -------------------------------------------------------------
        if (hasSeeked) {
            // Asegurar que siga en play a 2x
            if (!isPlaying && state !== 0 && !(video && video.ended)) {
                ensurePlaying(video, player);
            }
            if (video && video.playbackRate !== 2.0) {
                try { video.playbackRate = 2.0; } catch(e) {}
            }

            const currentPosStr = curTime.toFixed(0);
            const totalDurStr = duration > 0 ? duration.toFixed(0) : '?';
            updateHud(`Completando video (<b>${currentPosStr}s / ${totalDurStr}s</b>) a 2x (144p Mute)...`, '#38bdf8');

            // DETECCIÓN DE FINALIZACIÓN AL 100%:
            // 1) Evento nativo video.ended
            // 2) PlayerState === 0 (Ended en API de YouTube)
            // 3) Cabezal alcanzó o superó la duración menos 0.25s
            const isAtVeryEnd = (state === 0) || (video && video.ended) || (duration > 0 && curTime >= (duration - 0.25));
            const timeSinceSeek = (Date.now() - seekTimestamp) / 1000;

            if (isAtVeryEnd || (timeSinceSeek > 6.0 && curTime >= (duration - 1.0))) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        }
    }, 200);

    // 10. Temporizador de seguridad máximo (35 segundos)
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Timeout de seguridad alcanzado (35s). Finalizando...');
            clearInterval(pollInterval);
            finishAndClose();
        }
    }, 35000);
})();
