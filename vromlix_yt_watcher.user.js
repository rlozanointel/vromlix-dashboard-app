// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      2.0
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

    console.log('[Vromlix] Script activado: forzando visibilidad y reproducción en segundo plano...');

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

    let secondsPlayed = 0;
    let lastReportedTime = -1;
    let isFinished = false;

    function finishAndClose() {
        if (isFinished) return;
        isFinished = true;
        console.log('[Vromlix] ✅ Video completado al 100% en YouTube. Cerrando pestaña en 800ms...');
        setTimeout(() => {
            window.close();
        }, 800);
    }

    // 3. Loop inteligente de monitoreo y reproducción activa
    let pollInterval = setInterval(() => {
        if (isFinished) {
            clearInterval(pollInterval);
            return;
        }

        const player = document.getElementById('movie_player');
        const video = document.querySelector('video');

        // Silenciar para garantizar que el navegador permita la reproducción
        if (player && typeof player.mute === 'function') {
            player.mute();
        }
        if (video) {
            video.muted = true;
        }

        // Si la API del reproductor de YouTube está disponible, ordenar Play
        if (player && typeof player.playVideo === 'function') {
            const state = player.getPlayerState();
            // -1: unstarted, 2: paused, 3: buffering, 0: ended, 1: playing
            if (state === 2 || state === -1) {
                player.playVideo();
            } else if (state === 0) {
                finishAndClose();
                return;
            }
        }

        // Respaldo directo en el elemento HTML5 <video>
        if (video) {
            if (video.paused && !video.ended) {
                video.play().catch(() => {});
            }

            if (video.ended) {
                finishAndClose();
                return;
            }

            // Monitorear avance real del tiempo del video
            if (lastReportedTime >= 0 && video.currentTime > lastReportedTime + 0.1) {
                secondsPlayed += (video.currentTime - lastReportedTime);
                console.log(`[Vromlix] Progreso verificado: ${secondsPlayed.toFixed(1)}s reproducidos`);
            }
            lastReportedTime = video.currentTime;

            // Si ya avanzó al menos 3.5 segundos o llegó al segundo final de la duración
            if (secondsPlayed >= 3.5 || (video.duration > 0 && video.currentTime >= video.duration - 0.5)) {
                finishAndClose();
                return;
            }
        }
    }, 250);

    // 4. Temporizador de seguridad máximo (20 segundos) para no dejar pestañas colgadas en caso de fallo de red
    setTimeout(() => {
        if (!isFinished) {
            console.log('[Vromlix] Límite de tiempo de seguridad alcanzado. Cerrando...');
            finishAndClose();
        }
    }, 20000);
})();
