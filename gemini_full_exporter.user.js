// ==UserScript==
// @name         Gemini to Obsidian Auto-Exporter (Cero Pérdida)
// @namespace    https://vromlix.local/
// @version      4.2
// @description  Auto-scroll real hasta el turno #1 de Google Gemini, visor Markdown, interacciones numeradas y guardado directo sin duplicados en Obsidian 03_CHATS_GEMINI.
// @author       Vromlix Core & Antigravity
// @match        https://gemini.google.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @connect      localhost
// @connect      127.0.0.1
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    console.log('[Gemini Exporter v4.0] Enlace permanente Obsidian cargado.');

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 1. DETECCIÓN INFALIBLE DEL CONTENEDOR DE SCROLL REAL (PRUEBA DE MUTACIÓN EN VIVO)
    function testScrollable(el) {
        if (!el || el === document.body || el === document.documentElement) return false;
        const style = window.getComputedStyle(el);
        const canOverflow = style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflowY === 'overlay';
        if (!canOverflow) return false;
        if (el.scrollHeight <= el.clientHeight + 25) return false;

        // Prueba real: verificar si asignar scrollTop realmente mueve el contenedor
        const orig = el.scrollTop;
        const probe = orig > 10 ? orig - 5 : 5;
        el.scrollTop = probe;
        const moved = (el.scrollTop !== orig);
        el.scrollTop = orig;
        return moved;
    }

    function findRealScrollContainer() {
        // Ancla dentro de los mensajes actuales del chat
        const anchor = document.querySelector('model-response, user-query, [class*="model-response"], [class*="user-query"], message-content');
        let el = anchor ? anchor.parentElement : null;
        while (el && el !== document.documentElement) {
            if (testScrollable(el)) {
                return el;
            }
            el = el.parentElement;
        }

        // Fallback: escanear todos los elementos que contengan mensajes y elegir el de mayor scrollHeight
        const all = document.querySelectorAll('infinite-scroller, div, main, section');
        let best = null;
        let maxScroll = 0;
        for (const cand of all) {
            if (cand.querySelector('user-query, model-response, [class*="user-query"], [class*="model-response"]') && testScrollable(cand)) {
                if (cand.scrollHeight > maxScroll) {
                    maxScroll = cand.scrollHeight;
                    best = cand;
                }
            }
        }
        return best || document.scrollingElement || document.documentElement;
    }

    function isChatLoadingSpinnerVisible(scroller) {
        const root = scroller || document;
        const spinners = root.querySelectorAll('mat-spinner, mat-progress-spinner, [role="progressbar"], [class*="loading-spinner"], [class*="shimmer"]');
        for (const sp of spinners) {
            // Ignorar spinners dentro de la barra de entrada inferior o botones
            if (sp.closest('input-area, .input-area-container, [class*="input-area"]')) continue;
            if (sp.offsetParent !== null && sp.getBoundingClientRect().height > 0) {
                return true;
            }
        }
        return false;
    }

    // 2. PARSER DOM A MARKDOWN (CERO INNERHTML, COMPATIBLE CON CONTENT-VISIBILITY)
    function nodeToMarkdown(node) {
        if (!node) return '';
        if (node.nodeType === Node.TEXT_NODE) return node.textContent;
        if (node.nodeType !== Node.ELEMENT_NODE) return '';

        const tag = node.tagName.toLowerCase();

        // Ignorar basura visual y textos ocultos de lector de pantalla
        if (['button', 'mat-icon', 'svg', 'nav', 'input', 'textarea', 'style', 'script'].includes(tag)) return '';
        if (node.classList && (
            node.classList.contains('cdk-visually-hidden') ||
            node.classList.contains('button') ||
            node.classList.contains('actions') ||
            node.classList.contains('response-footer') ||
            node.classList.contains('thumbs') ||
            node.classList.contains('feedback') ||
            node.classList.contains('spark-licensed-center-host') ||
            node.classList.contains('mat-mdc-button')
        )) return '';
        if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') return '';

        // Bloques de código (usar textContent para no perder bloques fuera de pantalla)
        if (tag === 'code-block' || (tag === 'pre' && !node.closest('code-block'))) {
            const codeEl = node.querySelector('code') || node.querySelector('pre') || node;
            let lang = '';
            const langEl = node.querySelector('.code-block-decoration span, .code-block-decoration, [class*="language"], [class*="lang"]');
            if (langEl && langEl.textContent) {
                lang = langEl.textContent.trim().split(/\s+/)[0].toLowerCase();
            } else if (codeEl.className) {
                const m = codeEl.className.match(/language-([a-z0-9_-]+)/i);
                if (m) lang = m[1];
            }
            const rawCode = (codeEl.querySelector('code') || codeEl).textContent || '';
            return `\n\n\`\`\`${lang}\n${rawCode.replace(/\r\n/g, '\n').trim()}\n\`\`\`\n\n`;
        }

        if (tag === 'code' && !node.closest('pre') && !node.closest('code-block')) {
            return `\`${node.textContent.replace(/`/g, '\\`')}\``;
        }

        const texAnnot = node.querySelector('annotation[encoding="application/x-tex"]');
        if (texAnnot) {
            const tex = texAnnot.textContent.trim();
            const isDisplay = node.classList.contains('math-display') || node.closest('.math-display');
            return isDisplay ? `\n\n$$${tex}$$\n\n` : `$${tex}$`;
        }

        if (/^h[1-6]$/.test(tag)) {
            const level = parseInt(tag[1], 10);
            const hashes = '#'.repeat(level);
            return `\n\n${hashes} ${Array.from(node.childNodes).map(nodeToMarkdown).join('').trim()}\n\n`;
        }

        if (tag === 'p') {
            const pText = Array.from(node.childNodes).map(nodeToMarkdown).join('').trim();
            return pText ? `\n\n${pText}\n\n` : '';
        }

        if (tag === 'br') return '\n';

        if (tag === 'ul') {
            return `\n\n${Array.from(node.children).filter(c => c.tagName.toLowerCase() === 'li').map(li => `- ${Array.from(li.childNodes).map(nodeToMarkdown).join('').trim()}`).join('\n')}\n\n`;
        }
        if (tag === 'ol') {
            return `\n\n${Array.from(node.children).filter(c => c.tagName.toLowerCase() === 'li').map((li, idx) => `${idx + 1}. ${Array.from(li.childNodes).map(nodeToMarkdown).join('').trim()}`).join('\n')}\n\n`;
        }

        if (tag === 'blockquote') {
            return `\n\n> ${Array.from(node.childNodes).map(nodeToMarkdown).join('').trim().replace(/\n/g, '\n> ')}\n\n`;
        }

        if (tag === 'table') {
            const rows = Array.from(node.querySelectorAll('tr'));
            if (!rows.length) return '';
            let tableMd = '\n\n';
            rows.forEach((tr, rIdx) => {
                const cells = Array.from(tr.querySelectorAll('th, td'));
                const cellTexts = cells.map(c => Array.from(c.childNodes).map(nodeToMarkdown).join('').replace(/\|/g, '\\|').trim());
                tableMd += `| ${cellTexts.join(' | ')} |\n`;
                if (rIdx === 0) tableMd += `| ${cells.map(() => '---').join(' | ')} |\n`;
            });
            return tableMd + '\n\n';
        }

        if (tag === 'strong' || tag === 'b') {
            const s = Array.from(node.childNodes).map(nodeToMarkdown).join('').trim();
            return s ? `**${s}**` : '';
        }
        if (tag === 'em' || tag === 'i') {
            const s = Array.from(node.childNodes).map(nodeToMarkdown).join('').trim();
            return s ? `*${s}*` : '';
        }
        if (tag === 'del' || tag === 's') {
            const s = Array.from(node.childNodes).map(nodeToMarkdown).join('').trim();
            return s ? `~~${s}~~` : '';
        }
        if (tag === 'a') return `[${Array.from(node.childNodes).map(nodeToMarkdown).join('').trim() || node.href}](${node.getAttribute('href') || ''})`;
        if (tag === 'img' || tag === 'generated-image') {
            const img = node.querySelector('img') || node;
            const src = img.getAttribute('src') || '';
            return src ? `\n\n![${img.getAttribute('alt') || 'Imagen'}](${src})\n\n` : '';
        }
        if (tag === 'hr') return '\n\n---\n\n';

        return Array.from(node.childNodes).map(nodeToMarkdown).join('');
    }

    // Extrae el texto limpio del prompt del usuario sin "Tú dijiste" ni textos ocultos, usando textContent seguro
    function extractCleanUserText(el) {
        if (!el || typeof el.cloneNode !== 'function') return '';
        const clone = el.cloneNode(true);
        const junk = clone.querySelectorAll('.cdk-visually-hidden, [class*="visually-hidden"], [aria-hidden="true"], button, mat-icon, svg');
        junk.forEach(j => j.remove());

        // Buscar contenedor específico de texto si existe
        const textContainer = clone.querySelector('.query-text, .text-content') || clone;
        // Convertir bloques <p> o .query-text-line en líneas separadas
        const lines = Array.from(textContainer.querySelectorAll('p, .query-text-line'));
        if (lines.length > 0) {
            return lines.map(l => l.textContent.trim()).filter(Boolean).join('\n');
        }
        return textContainer.textContent.replace(/^Tú dijiste\s*/i, '').trim();
    }

    // 3. EXTRACCIÓN DE TURNOS
    function getCleanConversationTurns() {
        const querySelectors = ['user-query', '.user-query-container', '[class*="user-query"]', '.query-content', 'div[data-turn-type="user"]'];
        const responseSelectors = ['model-response', 'response-element', '.response-container', '[class*="model-response"]', 'message-content', 'div[data-turn-type="model"]'];

        const allQueries = Array.from(document.querySelectorAll(querySelectors.join(',')))
            .filter(el => !el.parentElement || !el.parentElement.closest(querySelectors.join(',')));
        const allResponses = Array.from(document.querySelectorAll(responseSelectors.join(',')))
            .filter(el => !el.parentElement || !el.parentElement.closest(responseSelectors.join(',')));

        const turns = [];
        allQueries.forEach(el => turns.push({ type: 'user', el }));
        allResponses.forEach(el => turns.push({ type: 'model', el }));

        turns.sort((a, b) => {
            const pos = a.el.compareDocumentPosition(b.el);
            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
        });

        return turns;
    }

    function getChatTitle() {
        let title = document.title.replace(/\s*-\s*Google Gemini.*$/i, '').trim();
        if (!title || title.toLowerCase() === 'google gemini' || title.toLowerCase() === 'gemini') {
            const activeSidebar = document.querySelector('[aria-selected="true"] [class*="title"], [class*="selected"] [class*="title"], [class*="active"] [class*="title"]');
            if (activeSidebar && activeSidebar.textContent.trim()) {
                title = activeSidebar.textContent.trim();
            } else {
                const firstUser = document.querySelector('user-query, .user-query-container, [class*="user-query"]');
                title = firstUser ? extractCleanUserText(firstUser).slice(0, 45) : 'Conversacion_Gemini';
            }
        }
        return title || 'Conversacion_Gemini';
    }

    function buildObsidianMarkdown() {
        const turns = getCleanConversationTurns();
        const title = getChatTitle();
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0].slice(0, 5);
        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 50) || 'chat';

        let userCount = 0;
        let modelCount = 0;
        let firstPromptPreview = '';
        let body = '';

        turns.forEach(turn => {
            if (turn.type === 'user') {
                const rawText = extractCleanUserText(turn.el);
                if (!rawText) return;
                userCount++;
                if (!firstPromptPreview) firstPromptPreview = rawText.replace(/\s+/g, ' ').slice(0, 60);
                body += `\n### 👤 Rogelio (#${userCount})\n> ${rawText.replace(/\n/g, '\n> ')}\n\n`;
            } else {
                const mdContainer = turn.el.querySelector('.markdown, message-content, [class*="markdown"]') || turn.el;
                const mdText = nodeToMarkdown(mdContainer).replace(/\n{3,}/g, '\n\n').trim();
                if (!mdText) return;
                modelCount++;
                body += `### ✨ Gemini (#${modelCount})\n${mdText}\n\n---\n`;
            }
        });

        const interactionsCount = Math.max(userCount, modelCount);

        const header = [
            '---',
            `id: ${dateStr.replace(/-/g, '')}-gemini-${slug}`,
            `aliases: ["${title.replace(/"/g, '\\"')}"]`,
            'tags:',
            '  - fuente/gemini',
            '  - archivo/conversacion',
            `fecha_exportacion: ${dateStr} ${timeStr}`,
            `url_origen: "${window.location.href}"`,
            `total_interacciones: ${interactionsCount}`,
            `prompts_usuario: ${userCount}`,
            `respuestas_gemini: ${modelCount}`,
            '---',
            '',
            `# ${title}`,
            '',
            `> [!INFO] Respaldo de Conversación de Gemini Web`,
            `> **Fecha:** \`${dateStr} ${timeStr}\` | **Interacciones:** \`${interactionsCount}\` (\`${userCount}\` tuyas / \`${modelCount}\` de Gemini)`,
            `> **Carpeta:** \`Vault_Conocimiento/03_CHATS_GEMINI/\``,
            `> **URL:** [Abrir en Gemini](${window.location.href})`,
            '',
            '---',
            ''
        ].join('\n');

        return {
            title,
            filename: `${dateStr}_${slug}.md`,
            content: header + body,
            interactionsCount,
            totalTurns: interactionsCount,
            userCount,
            modelCount,
            firstPromptPreview
        };
    }

    // 4. AUTO-SCROLL ASCENDENTE REAL HASTA EL PRIMER MENSAJE
    let isAutoScrolling = false;
    let cancelAutoScroll = false;

    async function executeAutoScrollToTop(onStatus) {
        if (isAutoScrolling) return;
        isAutoScrolling = true;
        cancelAutoScroll = false;

        const scroller = findRealScrollContainer();
        const scrollerName = scroller.tagName ? `${scroller.tagName.toLowerCase()}` : 'window';
        const countInteractions = (turns) => Math.max(turns.filter(t => t.type === 'user').length, Math.ceil(turns.length / 2));
        let initialTurns = getCleanConversationTurns();
        let lastCount = initialTurns.length;
        let lastHeight = scroller.scrollHeight || document.documentElement.scrollHeight;
        let unchangedCycles = 0;
        let iteration = 0;

        console.log(`[Gemini Exporter] Contenedor real detectado: <${scrollerName}> (scrollTop=${scroller.scrollTop}, scrollHeight=${lastHeight})`);
        onStatus(`⏫ Subiendo en <${scrollerName}> (${countInteractions(initialTurns)} int.)...`, '#38bdf8');

        while (unchangedCycles < 6 && !cancelAutoScroll) {
            iteration++;

            // Forzar scroll al tope + evento scroll
            if (scroller === document.documentElement || scroller === document.body || scroller === window) {
                window.scrollTo({ top: 0, behavior: 'instant' });
            } else {
                scroller.scrollTop = 0;
                scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
            }

            // Si van 2 ciclos sin cambio, hacer un pequeño "wiggle" para despertar IntersectionObserver
            if (unchangedCycles >= 2) {
                await sleep(100);
                if (scroller !== window) {
                    scroller.scrollTop = 180;
                    scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
                    await sleep(100);
                    scroller.scrollTop = 0;
                    scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
                }
            }

            await sleep(950);

            // Si hay spinner de carga activo arriba, esperar sin consumir ciclos de paciencia
            if (isChatLoadingSpinnerVisible(scroller)) {
                const spinTurns = getCleanConversationTurns();
                onStatus(`⏳ Google cargando historial... (${countInteractions(spinTurns)} int.)`, '#f59e0b');
                unchangedCycles = 0;
                continue;
            }

            const currentTurns = getCleanConversationTurns();
            const currentCount = currentTurns.length;
            const currentHeight = scroller.scrollHeight || document.documentElement.scrollHeight;
            const currentScroll = (scroller === window || scroller === document.documentElement) ? window.scrollY : scroller.scrollTop;

            const firstUser = currentTurns.find(t => t.type === 'user');
            const firstSnippet = firstUser ? extractCleanUserText(firstUser.el).replace(/\s+/g, ' ').slice(0, 32) : '...';

            onStatus(`⏫ ${countInteractions(currentTurns)} interacciones | «${firstSnippet}...» (${unchangedCycles}/6)`, '#38bdf8');

            if (currentCount > lastCount || currentHeight > lastHeight + 40) {
                lastCount = currentCount;
                lastHeight = currentHeight;
                unchangedCycles = 0;
            } else {
                if (currentScroll <= 25) {
                    unchangedCycles++;
                } else {
                    // Gemini ajustó el scrollTop al insertar elementos arriba; seguir subiendo
                    unchangedCycles = 0;
                }
            }

            if (iteration > 400) break;
        }

        const wasCancelled = cancelAutoScroll;
        isAutoScrolling = false;
        const finalInteractions = countInteractions(getCleanConversationTurns());
        onStatus(
            wasCancelled
                ? `⏹️ Detenido en ${finalInteractions} interacciones`
                : `✅ ¡Tope alcanzado! ${finalInteractions} interacciones cargadas`,
            wasCancelled ? '#f59e0b' : '#10b981'
        );
        await sleep(300);
    }

    function downloadBlob(content, filename) {
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    }

    // 5. GUARDADO DIRECTO VÍA GM_xmlhttpRequest (BYPASS CSP & MIXED CONTENT)
    function saveToDashboardBridge(data) {
        return new Promise((resolve) => {
            if (typeof GM_xmlhttpRequest !== 'undefined') {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://127.0.0.1:8080/api/gemini/save_note',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(data),
                    timeout: 5000,
                    onload: (res) => {
                        try {
                            if (res.status === 200) {
                                resolve(JSON.parse(res.responseText));
                                return;
                            }
                        } catch (e) {}
                        resolve(null);
                    },
                    onerror: () => resolve(null),
                    ontimeout: () => resolve(null)
                });
            } else {
                fetch('http://127.0.0.1:8080/api/gemini/save_note', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(r => r.ok ? r.json() : null)
                .then(resolve)
                .catch(() => resolve(null));
            }
        });
    }

    function copyTextSafe(text) {
        if (typeof GM_setClipboard !== 'undefined') {
            GM_setClipboard(text);
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(() => {});
        }
    }

    // 6. CONSTRUCCIÓN DE HUD MEDIANTE DOM PURO
    let lastObsidianUri = null;

    function createExporterHUD() {
        if (document.getElementById('gemini-obsidian-hud')) return;
        if (!document.body) return;

        const hud = document.createElement('div');
        hud.id = 'gemini-obsidian-hud';
        hud.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:2147483647;background:rgba(15,23,42,0.96);backdrop-filter:blur(14px);border:1px solid #38bdf8;border-radius:14px;padding:14px 16px;width:345px;box-shadow:0 12px 35px rgba(0,0,0,0.65);color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;font-size:13px;line-height:1.4;';

        const header = document.createElement('div');
        header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:6px;';

        const titleDiv = document.createElement('div');
        titleDiv.style.cssText = 'display:flex;align-items:center;gap:6px;';
        const iconSpan = document.createElement('span');
        iconSpan.textContent = '🛡️';
        const titleText = document.createElement('strong');
        titleText.style.cssText = 'color:#38bdf8;font-size:12px;letter-spacing:0.5px;';
        titleText.textContent = 'OBSIDIAN EXPORTER v4.2';
        titleDiv.appendChild(iconSpan);
        titleDiv.appendChild(titleText);

        const minBtn = document.createElement('button');
        minBtn.style.cssText = 'background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;padding:2px 6px;line-height:1;';
        minBtn.textContent = '−';

        header.appendChild(titleDiv);
        header.appendChild(minBtn);
        hud.appendChild(header);

        const statusBox = document.createElement('div');
        statusBox.id = 'gem-hud-status';
        statusBox.style.cssText = 'margin-bottom:10px;font-size:11px;color:#94a3b8;background:rgba(30,41,59,0.8);padding:8px 10px;border-radius:8px;border:1px solid rgba(56,189,248,0.2);word-break:break-word;';
        statusBox.textContent = '🟢 Destino: 03_CHATS_GEMINI';
        hud.appendChild(statusBox);

        const bodyBox = document.createElement('div');
        bodyBox.id = 'gem-hud-body';
        bodyBox.style.cssText = 'display:flex;flex-direction:column;gap:8px;';

        const btnFull = document.createElement('button');
        btnFull.id = 'gem-btn-full';
        btnFull.style.cssText = 'background:linear-gradient(135deg,#0284c7,#2563eb);color:#fff;border:none;border-radius:8px;padding:10px 12px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;';
        btnFull.textContent = '🚀 Cargar Todo y Guardar en Obsidian';
        bodyBox.appendChild(btnFull);

        const btnViewer = document.createElement('button');
        btnViewer.id = 'gem-btn-viewer';
        btnViewer.style.cssText = 'background:#1e293b;color:#38bdf8;border:1px solid #0284c7;border-radius:8px;padding:8px 10px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;';
        btnViewer.textContent = '👁️ Ver Markdown en el Widget';
        bodyBox.appendChild(btnViewer);

        const row = document.createElement('div');
        row.style.cssText = 'display:flex;gap:6px;';

        const btnCopy = document.createElement('button');
        btnCopy.id = 'gem-btn-copy';
        btnCopy.style.cssText = 'flex:1;background:#1e293b;color:#e2e8f0;border:1px solid #475569;border-radius:8px;padding:7px;font-size:11px;cursor:pointer;';
        btnCopy.textContent = '📋 Copiar';

        const btnOpenObs = document.createElement('button');
        btnOpenObs.id = 'gem-btn-obs';
        btnOpenObs.style.cssText = 'flex:1.3;background:#1e293b;color:#a78bfa;border:1px solid #7c3aed;border-radius:8px;padding:7px;font-size:11px;cursor:pointer;display:none;';
        btnOpenObs.textContent = '📂 Abrir Obsidian';

        const btnScroll = document.createElement('button');
        btnScroll.id = 'gem-btn-scroll';
        btnScroll.style.cssText = 'flex:1;background:#1e293b;color:#e2e8f0;border:1px solid #475569;border-radius:8px;padding:7px;font-size:11px;cursor:pointer;';
        btnScroll.textContent = '⏫ Subir';

        row.appendChild(btnCopy);
        row.appendChild(btnOpenObs);
        row.appendChild(btnScroll);
        bodyBox.appendChild(row);
        hud.appendChild(bodyBox);

        // MODAL VISOR
        const viewerModal = document.createElement('div');
        viewerModal.id = 'gem-viewer-modal';
        viewerModal.style.cssText = 'display:none;position:fixed;top:40px;bottom:40px;right:40px;left:40px;z-index:2147483647;background:rgba(15,23,42,0.98);border:1px solid #38bdf8;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.85);padding:24px;flex-direction:column;gap:12px;';

        const viewerHeader = document.createElement('div');
        viewerHeader.style.cssText = 'display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:12px;';

        const viewerTitle = document.createElement('h3');
        viewerTitle.style.cssText = 'margin:0;color:#38bdf8;font-size:15px;';
        viewerTitle.textContent = '👁️ Visor Markdown del Chat (Verificación de Cero Pérdida)';

        const viewerCloseBtn = document.createElement('button');
        viewerCloseBtn.style.cssText = 'background:rgba(239,68,68,0.2);color:#f87171;border:none;border-radius:6px;padding:6px 14px;cursor:pointer;font-weight:600;font-size:12px;';
        viewerCloseBtn.textContent = '✕ Cerrar Visor';
        viewerCloseBtn.onclick = () => { viewerModal.style.display = 'none'; };

        viewerHeader.appendChild(viewerTitle);
        viewerHeader.appendChild(viewerCloseBtn);
        viewerModal.appendChild(viewerHeader);

        const viewerStats = document.createElement('div');
        viewerStats.style.cssText = 'font-size:12px;color:#94a3b8;background:rgba(30,41,59,0.6);padding:8px 12px;border-radius:6px;';
        viewerStats.textContent = 'Generando estadísticas...';
        viewerModal.appendChild(viewerStats);

        const viewerTextarea = document.createElement('textarea');
        viewerTextarea.style.cssText = 'flex:1;width:100%;background:#090d16;color:#e2e8f0;border:1px solid #334155;border-radius:8px;padding:14px;font-family:monospace;font-size:12px;line-height:1.5;resize:none;box-sizing:border-box;outline:none;';
        viewerTextarea.readOnly = true;
        viewerModal.appendChild(viewerTextarea);

        const viewerFooter = document.createElement('div');
        viewerFooter.style.cssText = 'display:flex;justify-content:flex-end;gap:10px;';

        const viewerCopyBtn = document.createElement('button');
        viewerCopyBtn.style.cssText = 'background:#1e293b;color:#e2e8f0;border:1px solid #475569;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:12px;';
        viewerCopyBtn.textContent = '📋 Copiar Todo';
        viewerCopyBtn.onclick = () => {
            copyTextSafe(viewerTextarea.value);
            viewerCopyBtn.textContent = '✅ ¡Copiado!';
            setTimeout(() => { viewerCopyBtn.textContent = '📋 Copiar Todo'; }, 1500);
        };

        const viewerSaveBtn = document.createElement('button');
        viewerSaveBtn.style.cssText = 'background:linear-gradient(135deg,#0284c7,#2563eb);color:#fff;border:none;border-radius:8px;padding:8px 18px;cursor:pointer;font-weight:600;font-size:12px;';
        viewerSaveBtn.textContent = '💾 Guardar en Obsidian';
        viewerSaveBtn.onclick = async () => {
            const res = buildObsidianMarkdown();
            const saved = await saveToDashboardBridge({
                title: res.title,
                filename: res.filename,
                markdown: res.content,
                total_turns: res.interactionsCount,
                url: window.location.href
            });
            if (saved && saved.success) {
                lastObsidianUri = saved.obsidian_uri || '';
                btnOpenObs.style.display = 'block';
                viewerSaveBtn.textContent = '✅ ¡Guardado en 03_CHATS_GEMINI!';
            } else {
                downloadBlob(res.content, res.filename);
                viewerSaveBtn.textContent = '✅ ¡Descargado en ~/Descargas!';
            }
            setTimeout(() => { viewerSaveBtn.textContent = '💾 Guardar en Obsidian'; }, 2500);
        };

        viewerFooter.appendChild(viewerCopyBtn);
        viewerFooter.appendChild(viewerSaveBtn);
        viewerModal.appendChild(viewerFooter);

        document.body.appendChild(hud);
        document.body.appendChild(viewerModal);

        function setStatus(text, color = '#38bdf8') {
            statusBox.textContent = text;
            statusBox.style.color = color;
        }

        let isMin = false;
        minBtn.onclick = () => {
            isMin = !isMin;
            bodyBox.style.display = isMin ? 'none' : 'flex';
            statusBox.style.display = isMin ? 'none' : 'block';
            minBtn.textContent = isMin ? '+' : '−';
            hud.style.width = isMin ? '170px' : '345px';
        };

        btnViewer.onclick = () => {
            const res = buildObsidianMarkdown();
            viewerTextarea.value = res.content;
            viewerStats.textContent = `📊 ${res.filename} | ${res.interactionsCount} interacciones (${res.userCount} tuyas, ${res.modelCount} Gemini) | ${(res.content.length / 1024).toFixed(1)} KB | Inicio: "${res.firstPromptPreview}..."`;
            viewerModal.style.display = 'flex';
            viewerTextarea.scrollTop = 0;
        };

        btnFull.onclick = async () => {
            if (isAutoScrolling) {
                cancelAutoScroll = true;
                return;
            }
            btnFull.textContent = '⏹️ Detener ascenso...';

            try {
                await executeAutoScrollToTop((msg, color) => setStatus(msg, color));
                setStatus('⚙️ Compilando Markdown...', '#f59e0b');
                await sleep(300);

                const result = buildObsidianMarkdown();
                setStatus(`💾 Guardando ${result.interactionsCount} interacciones (${(result.content.length / 1024).toFixed(1)} KB)...`, '#38bdf8');

                const saved = await saveToDashboardBridge({
                    title: result.title,
                    filename: result.filename,
                    markdown: result.content,
                    total_turns: result.interactionsCount,
                    url: window.location.href
                });

                if (saved && saved.success) {
                    lastObsidianUri = saved.obsidian_uri || '';
                    btnOpenObs.style.display = 'block';
                    setStatus(`🎉 ¡Obsidian 03_CHATS_GEMINI OK! (${result.interactionsCount} interacciones, ${(result.content.length / 1024).toFixed(1)} KB)`, '#10b981');
                } else {
                    downloadBlob(result.content, result.filename);
                    setStatus(`⚠️ Bridge apagado; descargado en Descargas (${result.interactionsCount} interacciones, ${(result.content.length / 1024).toFixed(1)} KB)`, '#f59e0b');
                }
            } catch (err) {
                console.error('[Gemini Exporter] Error:', err);
                setStatus(`❌ Error: ${err.message}`, '#ef4444');
            } finally {
                btnFull.textContent = '🚀 Cargar Todo y Guardar en Obsidian';
            }
        };

        btnCopy.onclick = () => {
            try {
                const res = buildObsidianMarkdown();
                copyTextSafe(res.content);
                setStatus(`📋 ¡Copiado! (${res.interactionsCount} interacciones, ${(res.content.length / 1024).toFixed(1)} KB)`, '#10b981');
            } catch (e) {
                setStatus(`❌ Error: ${e.message}`, '#ef4444');
            }
        };

        btnOpenObs.onclick = () => {
            window.location.href = lastObsidianUri || 'obsidian://open?vault=Vault_Conocimiento';
        };

        btnScroll.onclick = async () => {
            if (isAutoScrolling) {
                cancelAutoScroll = true;
                return;
            }
            btnScroll.textContent = '⏹️ Detener';
            try {
                await executeAutoScrollToTop((msg, color) => setStatus(msg, color));
            } finally {
                btnScroll.textContent = '⏫ Subir';
            }
        };
    }

    setInterval(createExporterHUD, 800);
})();
