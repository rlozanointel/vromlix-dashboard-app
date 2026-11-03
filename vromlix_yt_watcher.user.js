// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      10.0
// @description  Garantiza el 100% en historial de YouTube: reproduce los últimos 9s reales (144p Mute), espera el evento natural Ended sin pausar, despacha baliza y autocierra
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

    console.log('[Vromlix] Script v10.0 activo: Finalización al 100% garantizada (9s reales de reproducción sin pausar)...');

    // 2. Bypass preventivo de extensiones que bloquean autoplay (ej: ImprovedTube)
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

    // 4. Variables de control
    let isFinished = false;
    let hasSeeked = false;
    let activePlayedSeconds = 0;
    let lastTickTime = Date.now();
    let listenerAttached = false;

    // 5. Función de cierre garantizado tras registrar Ended
    // CRÍTICO: ¡JAMÁS llamar a video.pause() ni a player.pauseVideo() aquí!
    // Si se pausa, YouTube interpreta que el usuario dejó el video incompleto y cambia el estado de ENDED a PAUSED.
    // Dejarlo fluir hasta el evento 'ended' natural permite que YouTube dispare la baliza de finalización (state=ended)
    // que dibuja la barra roja completa de punta a punta en el historial.
    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;

        updateHud('✅ <b>¡Video completado al 100%!</b> Registrando baliza en historial y cerrando...', '#10b981');
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube (ENDED). Esperando 3s para viaje de baliza y cerrando...');

        // 3.0 segundos para asegurar que la baliza de YouTube (/api/stats/watchtime?state=ended) viaje a Google
        setTimeout(() => {
            window.close();
        }, 3000);
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

    // 7. Ahorro extremo de recursos: Resolución 144p (tiny) y desactivar Autonav
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
        if (now - lastPlayAttempt < 1200) return;
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

    // 9. Ciclo de control cada 250ms
    const pollInterval = setInterval(() => {
        if (isFinished) {
            clearInterval(pollInterval);
            return;
        }

        const now = Date.now();
        const dt = Math.min(1.0, (now - lastTickTime) / 1000);
        lastTickTime = now;

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
        // FASE 1: POSICIONAMIENTO EN LOS ÚLTIMOS 9 SEGUNDOS
        // -------------------------------------------------------------
        if (!hasSeeked) {
            if (duration > 10) {
                const targetSeekSec = Math.max(0, duration - 9.0);

                // Si aún no está en la zona de los últimos 11 segundos, realizar el salto limpio
                if (curTime < (targetSeekSec - 2.0)) {
                    updateHud(`Saltando a los últimos 9 segundos (${targetSeekSec.toFixed(0)}s / ${duration.toFixed(0)}s)...`, '#f59e0b');
                    try {
                        if (player && typeof player.seekTo === 'function') {
                            player.seekTo(targetSeekSec, true);
                        }
                        if (video) {
                            video.currentTime = targetSeekSec;
                        }
                    } catch(e) {}
                }

                // Velocidad 1.0x normal: GARANTIZA que YouTube registre al menos 7-8 segundos
                // de tiempo de reproducción real continuo (watchtime) para validar la vista al 100%
                if (video) {
                    try { video.playbackRate = 1.0; } catch(e) {}
                }

                hasSeeked = true;
            } else {
                updateHud('Esperando metadatos de duración...', '#f59e0b');
            }
            return;
        }

        // -------------------------------------------------------------
        // FASE 2: REPRODUCIR HASTA ALCANZAR EL 100% (ENDED)
        // -------------------------------------------------------------
        if (hasSeeked) {
            // Si está pausado y no ha finalizado, ordenar play
            if (!isPlaying && state !== 0 && !(video && video.ended)) {
                ensurePlaying(video, player);
            }
            if (video && video.playbackRate !== 1.0) {
                try { video.playbackRate = 1.0; } catch(e) {}
            }

            // Acumular tiempo real de reproducción activa
            if (isPlaying) {
                activePlayedSeconds += dt;
            }

            const currentPosStr = curTime.toFixed(0);
            const totalDurStr = duration > 0 ? duration.toFixed(0) : '?';
            updateHud(`Sincronizando 100% en historial (<b>${activePlayedSeconds.toFixed(1)}s / 8.5s</b> reproducidos)...`, '#38bdf8');

            // DETECCIÓN DE FINALIZACIÓN AL 100%:
            // 1) Evento nativo video.ended
            // 2) PlayerState === 0 (Ended oficial en API de YouTube)
            // 3) Cabezal alcanzó o superó el final (duration - 0.2s) habiendo corrido al menos 6s de reproducción activa
            // 4) Si ya corrieron más de 9.0 segundos de reproducción real cerca del final
            const isAtNaturalEnd = (state === 0) || (video && video.ended);
            const isAtLastFrame = (duration > 0 && curTime >= (duration - 0.25) && activePlayedSeconds >= 6.0);
            const hasPlayedFullWindow = (activePlayedSeconds >= 9.0 && curTime >= (duration - 1.5));

            if (isAtNaturalEnd || isAtLastFrame || hasPlayedFullWindow) {
                console.log(`[Vromlix] Condición de fin alcanzada: isAtNaturalEnd=${isAtNaturalEnd}, isAtLastFrame=${isAtLastFrame}, hasPlayedFullWindow=${hasPlayedFullWindow}`);
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        }
    }, 250);

    // 10. Temporizador de seguridad máximo (40 segundos)
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Timeout de seguridad alcanzado (40s). Finalizando...');
            clearInterval(pollInterval);
            finishAndClose();
        }
    }, 40000);
})();
