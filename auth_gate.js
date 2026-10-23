/**
 * VROMLIX SECURITY GATE (LOCK SCREEN & PIN SHIELD)
 * Master PIN: 3599 (Default)
 * SHA-256 Hash: 66849e29a8eb896b7e92bd83752a609d9b7106f7755561464df37c0bd9249781
 */
(function() {
    'use strict';

    const DEFAULT_PIN_HASH = '66849e29a8eb896b7e92bd83752a609d9b7106f7755561464df37c0bd9249781';
    let enteredPin = '';
    let isLocked = false;

    // Detect if running locally on laptop
    function checkIsLocalhost() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('test_lock') === '1') return false; // Permite probar el candado en local con ?test_lock=1
        const host = window.location.hostname;
        return host === 'localhost' || 
               host === '127.0.0.1' || 
               host === '0.0.0.0' || 
               host.startsWith('192.168.') || 
               window.location.protocol === 'file:';
    }

    // SHA-256 helper
    async function hashPin(pin) {
        if (window.crypto && window.crypto.subtle) {
            const buffer = new TextEncoder().encode(pin);
            const digest = await crypto.subtle.digest('SHA-256', buffer);
            return Array.from(new Uint8Array(digest))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }
        // Fallback for non-secure contexts (math sha256)
        let hash = 0;
        for (let i = 0; i < pin.length; i++) {
            hash = ((hash << 5) - hash) + pin.charCodeAt(i);
            hash |= 0;
        }
        return hash.toString(16);
    }

    function getTargetHash() {
        return localStorage.getItem('vromlix_pin_hash') || DEFAULT_PIN_HASH;
    }

    function checkIsAuthenticated() {
        if (checkIsLocalhost()) return true;
        const targetHash = getTargetHash();
        const localAuth = localStorage.getItem('vromlix_auth_token');
        const sessionAuth = sessionStorage.getItem('vromlix_auth_token');
        return localAuth === targetHash || sessionAuth === targetHash;
    }

    function updatePinDots(state = 'normal') {
        const dots = document.querySelectorAll('.pin-dot');
        dots.forEach((dot, idx) => {
            dot.className = 'pin-dot';
            if (state === 'error') {
                dot.classList.add('error');
            } else if (state === 'success') {
                dot.classList.add('success');
            } else if (idx < enteredPin.length) {
                dot.classList.add('filled');
            }
        });
    }

    async function handlePinComplete() {
        const card = document.querySelector('.auth-gate-card');
        const errorMsg = document.getElementById('auth-error-msg');
        const rememberChk = document.getElementById('auth-remember-device');
        const hashed = await hashPin(enteredPin);
        const target = getTargetHash();

        if (hashed === target) {
            // SUCCESS
            updatePinDots('success');
            if (errorMsg) errorMsg.textContent = '';
            
            const remember = rememberChk ? rememberChk.checked : true;
            if (remember) {
                localStorage.setItem('vromlix_auth_token', target);
            } else {
                sessionStorage.setItem('vromlix_auth_token', target);
            }

            // Smooth fade out
            const gate = document.getElementById('vromlix-auth-gate');
            if (gate) {
                gate.style.opacity = '0';
                gate.style.pointerEvents = 'none';
                setTimeout(() => {
                    gate.style.display = 'none';
                    gate.style.opacity = '1';
                    gate.style.pointerEvents = 'auto';
                }, 350);
            }

            const mainContainer = document.querySelector('.dashboard-container');
            if (mainContainer) {
                mainContainer.style.filter = '';
                mainContainer.style.pointerEvents = '';
            }

            isLocked = false;
            enteredPin = '';
            updatePinDots('normal');
        } else {
            // ERROR
            updatePinDots('error');
            if (card) {
                card.classList.add('auth-shake');
                setTimeout(() => card.classList.remove('auth-shake'), 400);
            }
            if (errorMsg) errorMsg.textContent = 'PIN Incorrecto. Intente de nuevo.';
            setTimeout(() => {
                enteredPin = '';
                updatePinDots('normal');
            }, 600);
        }
    }

    function addDigit(digit) {
        if (enteredPin.length < 4) {
            enteredPin += digit;
            updatePinDots('normal');
            if (enteredPin.length === 4) {
                handlePinComplete();
            }
        }
    }

    function removeDigit() {
        if (enteredPin.length > 0) {
            enteredPin = enteredPin.slice(0, -1);
            updatePinDots('normal');
            const errorMsg = document.getElementById('auth-error-msg');
            if (errorMsg) errorMsg.textContent = '';
        }
    }

    function clearPin() {
        enteredPin = '';
        updatePinDots('normal');
        const errorMsg = document.getElementById('auth-error-msg');
        if (errorMsg) errorMsg.textContent = '';
    }

    function initAuthGate() {
        if (checkIsAuthenticated()) {
            return;
        }

        // Show Lock Screen
        isLocked = true;
        const gate = document.getElementById('vromlix-auth-gate');
        if (gate) {
            gate.style.display = 'flex';
        }

        const mainContainer = document.querySelector('.dashboard-container');
        if (mainContainer) {
            mainContainer.style.filter = 'blur(16px)';
            mainContainer.style.pointerEvents = 'none';
        }

        // Attach Keypad Listeners
        document.querySelectorAll('.keypad-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const key = btn.getAttribute('data-key');
                if (key === 'clear') {
                    clearPin();
                } else if (key === 'backspace') {
                    removeDigit();
                } else if (/^[0-9]$/.test(key)) {
                    addDigit(key);
                }
            });
        });

        // Attach Physical Keyboard Listener
        window.addEventListener('keydown', (e) => {
            if (!isLocked) return;
            if (/^[0-9]$/.test(e.key)) {
                e.preventDefault();
                addDigit(e.key);
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                removeDigit();
            } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
                e.preventDefault();
                clearPin();
            }
        });
    }

    // Lock Terminal manually
    window.vromlixLockTerminal = function() {
        localStorage.removeItem('vromlix_auth_token');
        sessionStorage.removeItem('vromlix_auth_token');
        window.location.reload();
    };

    // Change Master PIN
    window.vromlixChangePin = async function() {
        const currentPin = prompt('🔒 Ingrese su PIN actual de 4 dígitos:');
        if (!currentPin) return;
        const currentHashed = await hashPin(currentPin.trim());
        if (currentHashed !== getTargetHash()) {
            alert('❌ El PIN actual no es correcto.');
            return;
        }

        const newPin = prompt('🔑 Ingrese el NUEVO PIN de 4 dígitos:');
        if (!newPin || newPin.trim().length !== 4 || !/^\d{4}$/.test(newPin.trim())) {
            alert('❌ El nuevo PIN debe contener exactamente 4 dígitos numéricos.');
            return;
        }

        const confirmPin = prompt('🔑 Confirme el NUEVO PIN de 4 dígitos:');
        if (newPin.trim() !== confirmPin.trim()) {
            alert('❌ Los PINs no coinciden.');
            return;
        }

        const newHash = await hashPin(newPin.trim());
        localStorage.setItem('vromlix_pin_hash', newHash);
        localStorage.setItem('vromlix_auth_token', newHash);
        alert('✅ PIN Maestro actualizado con éxito.');
    };

    // Run as early as DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuthGate);
    } else {
        initAuthGate();
    }
})();
