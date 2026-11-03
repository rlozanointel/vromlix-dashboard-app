// ==UserScript==
// @name         Vromlix YouTube Auto-Watched & Closer
// @namespace    https://vromlix.local/
// @version      12.0
// @description  Garantiza el 100% en historial de YouTube: Baliza InnerTube directa (st=0 a et=len) + Bypass de visibilidad de pestañas en segundo plano + Autocierre ultrarrápido
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

    const videoId = urlParams.get('v');
    console.log(`[Vromlix] Script v12.0 activo para video: ${videoId}`);

    // 2. Bypass total de visibilidad: Evita que YouTube congele o pause pestañas en segundo plano
    try {
        Object.defineProperty(document, 'hidden', { get: () => false });
        Object.defineProperty(document, 'visibilityState', { get: () => 'visible' });
        document.dispatchEvent(new Event('visibilitychange'));
    } catch(e) {}

    // 3. Bypass preventivo de extensiones que bloquean autoplay
    try {
        const injectScript = document.createElement('script');
        injectScript.textContent = `
            (function() {
                try {
                    Object.defineProperty(document, 'hidden', { get: () => false });
                    Object.defineProperty(document, 'visibilityState', { get: () => 'visible' });
                } catch(e) {}
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

    // 4. HUD Visual elegante
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

    // 5. Motor de Telemetría InnerTube (Sincronización Directa de Baliza al 100%)
    const CPN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    function randomCpn() {
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        return Array.from(bytes, (b) => CPN_ALPHABET[b & 63]).join("");
    }

    function cfg(key) {
        const w = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
        return w.ytcfg?.get?.(key) ?? w.ytcfg?.data_?.[key];
    }

    function getCookie(name) {
        const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + name.replace(/[-_]/g, "\\$&") + "=([^;]*)"));
        return match ? decodeURIComponent(match[1]) : null;
    }

    async function sha1Hex(text) {
        const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
        return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
    }

    async function authHeaders() {
        const sapisid = getCookie("SAPISID") || getCookie("__Secure-3PAPISID");
        if (!sapisid) return null;
        const ts = Math.floor(Date.now() / 1000);
        const hash = await sha1Hex(`${ts} ${sapisid} ${location.origin}`);
        const headers = {
            Authorization: `SAPISIDHASH ${ts}_${hash}`,
            "X-Goog-AuthUser": String(cfg("SESSION_INDEX") ?? 0),
            "X-Origin": location.origin,
        };
        const pageId = cfg("DELEGATED_SESSION_ID");
        if (pageId) headers["X-Goog-PageId"] = pageId;
        return headers;
    }

    async function fetchPlayerResponse(vid, auth) {
        const w = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
        try {
            const live = (w.document.getElementById("movie_player") || document.getElementById("movie_player"))?.getPlayerResponse?.();
            if (live?.videoDetails?.videoId === vid && live.playbackTracking) return live;
        } catch {}

        try {
            if (w.ytInitialPlayerResponse?.videoDetails?.videoId === vid && w.ytInitialPlayerResponse.playbackTracking) {
                return w.ytInitialPlayerResponse;
            }
        } catch {}

        const context = cfg("INNERTUBE_CONTEXT") || {};
        const apiKey = cfg("INNERTUBE_API_KEY");
        const url = `/youtubei/v1/player?prettyPrint=false${apiKey ? `&key=${apiKey}` : ""}`;
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                ...auth,
                "Content-Type": "application/json",
                "X-Youtube-Client-Name": String(cfg("INNERTUBE_CONTEXT_CLIENT_NAME") ?? 1),
                "X-Youtube-Client-Version": context.client?.clientVersion || cfg("INNERTUBE_CLIENT_VERSION") || "",
            },
            body: JSON.stringify({
                context,
                videoId: vid,
                playbackContext: {
                    contentPlaybackContext: { html5Preference: "HTML5_PREF_WANTS", signatureTimestamp: cfg("STS") },
                },
                racyCheckOk: true,
                contentCheckOk: true,
            }),
        });
        if (!res.ok) throw new Error(`player HTTP ${res.status}`);
        const json = await res.json();
        if (!json?.playbackTracking) throw new Error("no playback tracking");
        return json;
    }

    function statsUrl(baseUrl, params) {
        const url = new URL(baseUrl, location.origin);
        url.protocol = location.protocol;
        url.host = location.host;
        for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
        return url.toString();
    }

    async function ping(url) {
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) throw new Error(`stats HTTP ${res.status}`);
    }

    let isMarked = false;

    async function directMarkAsWatched(vid) {
        if (isMarked) return;
        updateHud('Registrando 100% en historial con Google...', '#38bdf8');

        const auth = await authHeaders();
        if (!auth) throw new Error("No hay cookies de sesión activas");

        const w = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
        const player = w.document.getElementById("movie_player") || document.getElementById("movie_player");
        if (player && typeof player.pauseVideo === 'function') {
            try { player.pauseVideo(); } catch(e) {}
        }

        const response = await fetchPlayerResponse(vid, auth);
        const tracking = response?.playbackTracking;
        const length = Number(response?.videoDetails?.lengthSeconds);
        if (!tracking?.videostatsPlaybackUrl?.baseUrl || !tracking?.videostatsWatchtimeUrl?.baseUrl) {
            throw new Error("No se encontraron URLs de telemetría");
        }
        if (!length || length <= 0) throw new Error("Duración desconocida");

        const client = cfg("INNERTUBE_CONTEXT")?.client || {};
        const len = length.toFixed(3);
        const common = {
            ver: 2,
            cpn: randomCpn(),
            c: client.clientName || "WEB",
            cver: client.clientVersion || cfg("INNERTUBE_CLIENT_VERSION") || "",
            len,
            volume: 100,
            muted: 0,
            fs: 0,
            lact: Math.floor(Math.random() * 5000) + 1000,
        };

        // 1. Playback ping (arranque en 0s)
        await ping(statsUrl(tracking.videostatsPlaybackUrl.baseUrl, { ...common, cmt: "0.000", rt: "0.500" }));

        // 2. Watchtime ping (segmento completo: de st=0.000 a et=len, cmt=len, final=1, state="paused")
        await ping(
            statsUrl(tracking.videostatsWatchtimeUrl.baseUrl, {
                ...common,
                st: "0.000",
                et: len,
                cmt: len,
                rt: len,
                rtn: len,
                rti: Math.floor(length),
                state: "paused",
                final: 1,
            })
        );

        isMarked = true;
        updateHud('✅ <b>¡Video completado al 100%!</b> Barra sincronizada en historial. Cerrando...', '#10b981');
        console.log(`[Vromlix] ✅ Video ${vid} marcado exitosamente al 100% en historial de YouTube!`);

        setTimeout(() => {
            window.close();
        }, 1200);
    }

    // 6. Ejecución inmediata al cargar la página
    let attempts = 0;
    const runTimer = setInterval(async () => {
        attempts++;
        if (isMarked) {
            clearInterval(runTimer);
            return;
        }

        const w = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
        const hasCfg = Boolean(w.ytcfg && (w.ytcfg.get || w.ytcfg.data_));

        if (hasCfg && videoId) {
            clearInterval(runTimer);
            try {
                await directMarkAsWatched(videoId);
            } catch (err) {
                console.warn('[Vromlix] Error en sincronización directa:', err);
                fallbackPlayerSeek();
            }
        } else if (attempts > 30) {
            // Si pasaron 6 segundos sin ytcfg, intentar fallback
            clearInterval(runTimer);
            fallbackPlayerSeek();
        }
    }, 200);

    // 7. Método de Respaldo por Reproductor (Fallback clásico)
    function fallbackPlayerSeek() {
        if (isMarked) return;
        console.log('[Vromlix] Usando método de respaldo por reproductor...');
        updateHud('Sincronizando vía reproductor...', '#f59e0b');

        let seeked = false;
        const playerInterval = setInterval(() => {
            if (isMarked) {
                clearInterval(playerInterval);
                return;
            }

            const player = document.getElementById('movie_player') || document.querySelector('.html5-video-player');
            const video = document.querySelector('video.html5-main-video, video');

            if (!player && !video) return;

            const duration = (video && video.duration && !isNaN(video.duration)) ? video.duration : (player && player.getDuration ? player.getDuration() : 0);
            if (duration > 0 && !seeked) {
                seeked = true;
                const endPos = Math.max(0, duration - 0.1);
                try {
                    if (video) {
                        video.currentTime = endPos;
                        video.playbackRate = 2.0;
                        video.muted = true;
                        video.play().catch(() => {});
                    }
                    if (player && typeof player.seekTo === 'function') {
                        player.seekTo(endPos, true);
                    }
                } catch(e) {}

                setTimeout(() => {
                    try {
                        if (video) video.pause();
                        if (player && player.pauseVideo) player.pauseVideo();
                    } catch(e) {}
                    isMarked = true;
                    updateHud('✅ <b>¡Video completado!</b> Cerrando...', '#10b981');
                    setTimeout(() => window.close(), 1500);
                }, 2000);
            }
        }, 300);
    }

    // 8. Timeout general de seguridad (15 segundos)
    setTimeout(() => {
        if (!isMarked) {
            console.log('[Vromlix] Timeout general alcanzado (15s). Cerrando...');
            window.close();
        }
    }, 15000);
})();
