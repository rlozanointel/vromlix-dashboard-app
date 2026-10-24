// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      1.0
// @description  Reproduce automáticamente los últimos 4s y cierra la pestaña de fondo de YouTube
// @author       Vromlix Core
// @match        https://www.youtube.com/watch*
// @grant        window.close
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Solo se activa cuando la pestaña fue enviada desde el Dashboard con el tag vromlix_auto=1
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has('vromlix_auto')) return;

    console.log('[Vromlix] Activando auto-reproducción y auto-cierre de 4s...');

    let attempts = 0;
    const maxAttempts = 40; // ~10 segundos máx

    const timer = setInterval(() => {
        attempts++;
        const video = document.querySelector('video');

        if (video) {
            // Silenciar para asegurar que el navegador permita la reproducción en segundo plano
            video.muted = true;

            // Forzar play programático en segundo plano
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Si el navegador requiere otro tick
                });
            }

            // Cuando termine el video, cerrar pestaña
            video.addEventListener('ended', () => {
                clearInterval(timer);
                setTimeout(() => {
                    window.close();
                }, 400);
            }, { once: true });

            // Cierre de seguridad a los 7 segundos (por si ya terminó o el evento ended ya pasó)
            setTimeout(() => {
                clearInterval(timer);
                window.close();
            }, 7000);

            clearInterval(timer);
        }

        if (attempts >= maxAttempts) {
            clearInterval(timer);
            window.close();
        }
    }, 250);
})();
