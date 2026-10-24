// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      6.0
// @description  Reproduce efectivamente los últimos 8s con emulación de tecla K y auto-cierra la pestaña al terminar
// @author       Vromlix Core
// @match        https://www.youtube.com/watch*
// @grant        window.close
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 1. Solo intervenir si la URL tiene el parámetro vromlix_auto=1
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('vromlix_auto')) return;

    console.log('[Vromlix] Script v6.0 activo: iniciando sincronización con emulador de reproducción...');

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

    updateHud('Inicializando reproductor de YouTube...', '#f59e0b');

    let isFinished = false;
    let actualPlayedSeconds = 0;
    let lastTickTime = Date.now();
    let lastPlayAttemptTime = 0;

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

    // Función multi-método para ordenar la reproducción (tecla K, HTML5 video.play, botón play, API)
    function executePlayRoutine(video, player) {
        console.log('[Vromlix] Ejecutando rutina de reproducción (tecla K + video.play + UI)...');

        // A. Asegurar mute a nivel del elemento nativo <video>
        if (video) {
            try {
                video.muted = true;
                video.volume = 0;
            } catch(e) {}
        }
        if (player && typeof player.mute === 'function') {
            try { player.mute(); } catch(e) {}
        }

        // B. MÉTODO 1: Pulsación sintética de tecla 'K' (KeyK, keyCode 75)
        // Descubrimiento clave: YouTube responde a 'K' para reproducir de inmediato sin sonido
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
        try { window.dispatchEvent(new KeyboardEvent('keydown', keyEventInit)); } catch(e) {}
        try { window.dispatchEvent(new KeyboardEvent('keyup', keyEventInit)); } catch(e) {}

        // C. MÉTODO 2: HTML5 video.play() con manejo de promesa
        if (video && typeof video.play === 'function') {
            try {
                video.play().then(() => {
                    console.log('[Vromlix] video.play() iniciado correctamente');
                }).catch(err => {
                    console.log('[Vromlix] video.play() aviso:', err.message);
                });
            } catch(e) {}
        }

        // D. MÉTODO 3: Clic en el botón nativo de la barra (.ytp-play-button) si está en pausa
        const playBtn = document.querySelector('.ytp-play-button');
        if (playBtn) {
            const btnState = (playBtn.getAttribute('aria-label') || playBtn.getAttribute('title') || '').toLowerCase();
            if (btnState.includes('play') || btnState.includes('reproducir') || playBtn.getAttribute('data-title-no-tooltip') === 'Play') {
                try { playBtn.click(); } catch(e) {}
            }
        }

        // E. MÉTODO 4: Llamada directa al API del reproductor
        if (player && typeof player.playVideo === 'function') {
            try { player.playVideo(); } catch(e) {}
        }
    }

    // 3. Loop de control inteligente cada 250ms
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

        // Saltar anuncios automáticamente si aparecen
        const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern, .ytp-ad-overlay-close-button');
        if (skipBtn) {
            try { skipBtn.click(); } catch(e) {}
        }

        // Cerrar diálogos de confirmación ("¿Sigues ahí?")
        const confirmBtn = document.querySelector('yt-confirm-dialog-renderer #confirm-button button');
        if (confirmBtn) {
            try { confirmBtn.click(); } catch(e) {}
        }

        if (!player && !video) {
            updateHud('Esperando inicialización del reproductor...', '#f59e0b');
            return;
        }

        // Consultar estado nativo del reproductor de YouTube:
        // -1 = Unstarted, 0 = Ended, 1 = Playing, 2 = Paused, 3 = Buffering, 5 = Cued
        const state = (player && typeof player.getPlayerState === 'function') ? player.getPlayerState() : -1;
        const isActuallyPlaying = (state === 1) || (video && !video.paused && video.currentTime > 0);

        if (state === 0 || (video && video.ended)) {
            // Video finalizado por completo
            clearInterval(pollInterval);
            finishAndClose();
            return;
        }

        if (isActuallyPlaying) {
            // ESTADO REPRODUCIENDO: ¡NO INTERRUMPIR! Acumular tiempo real reproducido
            if (deltaReal > 0.05 && deltaReal < 2.0) {
                actualPlayedSeconds += deltaReal;
            }
            updateHud(`Reproduciendo últimos 8s: <b>${actualPlayedSeconds.toFixed(1)}s / 8.0s</b>`, '#38bdf8');

            // Si ya corrió al menos 7.5 segundos de reproducción activa
            if (actualPlayedSeconds >= 7.5) {
                clearInterval(pollInterval);
                finishAndClose();
                return;
            }
        } else if (state === 2 || state === -1 || state === 5 || (video && video.paused)) {
            // ESTADO PAUSADO O DETENIDO: Ejecutar rutina de play espaciada cada 1.5s
            if (now - lastPlayAttemptTime > 1500) {
                lastPlayAttemptTime = now;
                updateHud('Iniciando reproducción con tecla K...', '#f59e0b');
                executePlayRoutine(video, player);
            }
        } else if (state === 3) {
            // BUFFERING: Esperando chunks del stream
            updateHud('Cargando stream de video...', '#f59e0b');
        }
    }, 250);

    // 4. Temporizador de seguridad máximo (45 segundos)
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Timeout de seguridad alcanzado (45s). Finalizando...');
            clearInterval(pollInterval);
            finishAndClose();
        }
    }, 45000);
})();
