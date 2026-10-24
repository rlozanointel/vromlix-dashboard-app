// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      7.0
// @description  Silencio absoluto (100% Mute), salto forzado a los últimos 8s para barra roja al 100% en historial, y auto-cierre
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

    console.log('[Vromlix] Script v7.0 activo: Silencio estricto + Salto a los últimos 8s + Registro 100%...');

    // 2. Extraer el tiempo objetivo en segundos desde el parámetro 't' (ej. t=1087s -> 1087)
    let urlTargetSec = 0;
    if (urlParams.has('t')) {
        urlTargetSec = parseFloat(urlParams.get('t').replace('s', '')) || 0;
    }

    // 3. Bypass de 'Improve YouTube!' para evitar que congele la reproducción
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

    // 4. HUD Visual no invasivo
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
    let lastTickTime = Date.now();
    let lastPlayAttemptTime = 0;
    let hasSeekedToEnd = false;

    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;
        updateHud('✅ <b>¡Video terminado al 100%!</b> Registrando en historial y cerrando...', '#10b981');
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube. Cerrando pestaña en 2.5s...');
        
        // Esperar 2.5 segundos para garantizar que el ping de watchtime termine de enviarse a YouTube
        setTimeout(() => {
            window.close();
        }, 2500);
    }

    // 5. Función para forzar MUTE CONTINUO e INFALIBLE
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

    // 6. Función para forzar la reproducción si está pausado
    function executePlayRoutine(video, player) {
        enforceStrictMute(video, player);

        // A. Clic en botón nativo de la barra
        const playBtn = document.querySelector('.ytp-play-button');
        if (playBtn) {
            const btnState = (playBtn.getAttribute('aria-label') || playBtn.getAttribute('title') || '').toLowerCase();
            if (btnState.includes('play') || btnState.includes('reproducir') || playBtn.getAttribute('data-title-no-tooltip') === 'Play') {
                try { playBtn.click(); } catch(e) {}
            }
        }

        // B. Pulsación sintética de tecla 'K'
        const keyEventInit = {
            key: 'k',
            code: 'KeyK',
            keyCode: 75,
            which: 75,
            charCode: 0,
            bubbles: true,
            cancelable: true,
            composed: true,
            view: window
        };
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

    // 7. Loop de control inteligente cada 250ms
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

        // FORZAR MUTE EN CADA TICK (garantiza cero sonido en cualquier momento)
        enforceStrictMute(video, player);

        // Saltar anuncios automáticamente si aparecen
        const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern, .ytp-ad-overlay-close-button');
        if (skipBtn) {
            try { skipBtn.click(); } catch(e) {}
        }

        // Confirmar diálogo de "¿Sigues ahí?"
        const confirmBtn = document.querySelector('yt-confirm-dialog-renderer #confirm-button button');
        if (confirmBtn) {
            try { confirmBtn.click(); } catch(e) {}
        }

        if (!player && !video) {
            updateHud('Cargando reproductor de YouTube...', '#f59e0b');
            return;
        }

        const duration = (video && video.duration) ? video.duration : (player && player.getDuration ? player.getDuration() : 0);
        const curTime = (video && typeof video.currentTime === 'number') ? video.currentTime : (player && player.getCurrentTime ? player.getCurrentTime() : 0);

        // DETERMINAR TIEMPO OBJETIVO EXACTO (Últimos 8 segundos antes del final)
        let effectiveTarget = urlTargetSec;
        if (duration > 15) {
            effectiveTarget = Math.max(0, duration - 8);
        }

        // FORZAR SALTO AL FINAL SI ESTÁ EN EL INICIO (evita reproducir desde el minuto 0:00)
        if (effectiveTarget > 0 && curTime < (effectiveTarget - 2) && !hasSeekedToEnd) {
            console.log(`[Vromlix] Video en ${curTime.toFixed(1)}s. Saltando a los últimos 8s (${effectiveTarget.toFixed(1)}s / ${duration.toFixed(1)}s)...`);
            updateHud(`Saltando a los últimos 8s (${effectiveTarget.toFixed(0)}s de ${duration.toFixed(0)}s)...`, '#f59e0b');
            
            try {
                if (video) video.currentTime = effectiveTarget;
                if (player && typeof player.seekTo === 'function') player.seekTo(effectiveTarget, true);
            } catch(e) {}
            return; // Esperar siguiente tick para que se aplique el seek
        } else if (effectiveTarget > 0 && curTime >= (effectiveTarget - 2)) {
            hasSeekedToEnd = true;
        }

        // Consultar estado nativo del reproductor de YouTube:
        // -1 = Unstarted, 0 = Ended, 1 = Playing, 2 = Paused, 3 = Buffering, 5 = Cued
        const state = (player && typeof player.getPlayerState === 'function') ? player.getPlayerState() : -1;
        const isActuallyPlaying = (state === 1) || (video && !video.paused && curTime > 0);

        // ¿Llegó al final absoluto?
        const hasReachedEnd = (state === 0) || (video && video.ended) || (duration > 0 && curTime >= (duration - 0.6));
        if (hasReachedEnd) {
            clearInterval(pollInterval);
            finishAndClose();
            return;
        }

        if (isActuallyPlaying) {
            // SOLO ACUMULAR TIEMPO SI YA ESTÁ EN LOS ÚLTIMOS SEGUNDOS
            const isNearTarget = (effectiveTarget > 0) ? (curTime >= effectiveTarget - 2) : true;
            if (isNearTarget && deltaReal > 0.05 && deltaReal < 2.0) {
                actualPlayedSeconds += deltaReal;
            }

            const currentPosStr = curTime.toFixed(0);
            const totalDurStr = duration > 0 ? duration.toFixed(0) : '?';
            updateHud(`Reproduciendo final (<b>${currentPosStr}s / ${totalDurStr}s</b>): ${actualPlayedSeconds.toFixed(1)}s / 8.0s`, '#38bdf8');

            // Si ya corrió al menos 7.5s cerca del final o sobrepasó la meta
            if (isNearTarget && (actualPlayedSeconds >= 7.5 || (duration > 0 && curTime >= duration - 1.0))) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        } else if (state === 2 || state === -1 || state === 5 || (video && video.paused)) {
            // ESTADO PAUSADO O DETENIDO: Reanudar cada 1.5s
            if (now - lastPlayAttemptTime > 1500) {
                lastPlayAttemptTime = now;
                updateHud('Iniciando reproducción silenciosa...', '#f59e0b');
                executePlayRoutine(video, player);
            }
        } else if (state === 3) {
            // BUFFERING
            updateHud('Cargando buffer de video...', '#f59e0b');
        }
    }, 250);

    // 8. Temporizador de seguridad máximo (50 segundos)
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Timeout de seguridad alcanzado (50s). Cerrando...');
            clearInterval(pollInterval);
            finishAndClose();
        }
    }, 50000);
})();
