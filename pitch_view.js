// =========================================================================
// VROMLIX SALES PITCH & NEGOTIATION COCKPIT ENGINE
// Guía de referencia ultrarrápida para llamadas y cierre con Jorge Mares (Transporte Ejecutivo)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initPitchView();
});

function initPitchView() {
    initPitchFilterChips();
    initPitchSearch();
    initPitchQuickCalculator();
}

// Filtro rápido por chips temáticos
function initPitchFilterChips() {
    const chips = document.querySelectorAll('.pitch-filter-chip');
    const sections = document.querySelectorAll('.pitch-section-block');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.getAttribute('data-pitch-filter');
            sections.forEach(sec => {
                if (filter === 'all' || sec.getAttribute('data-section-type') === filter) {
                    sec.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });
        });
    });
}

// Buscador dinámico de argumentos y datos
function initPitchSearch() {
    const searchInput = document.getElementById('pitch-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.pitch-searchable');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (query === '' || text.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Copiar speech al portapapeles con feedback visual
window.copiarSpeechPitch = function(elementId, btnElement) {
    const target = document.getElementById(elementId);
    if (!target) return;

    const textToCopy = target.innerText.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btnElement.innerHTML;
        btnElement.innerHTML = `✅ ¡Copiado!`;
        btnElement.classList.add('copied');

        if (typeof showToast === 'function') {
            showToast('Argumento copiado al portapapeles', 'success');
        }

        setTimeout(() => {
            btnElement.innerHTML = originalText;
            btnElement.classList.remove('copied');
        }, 2200);
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
};

// Cotizador de bolsillo para dar estimados en vivo por llamada
function initPitchQuickCalculator() {
    const origenSelect = document.getElementById('calc-origen');
    const destinoSelect = document.getElementById('calc-destino');
    const vanSelect = document.getElementById('calc-van');
    const resultSpan = document.getElementById('calc-result-price');
    const detailSpan = document.getElementById('calc-result-detail');

    if (!destinoSelect || !vanSelect || !resultSpan) return;

    // Tarifas base de referencia mercado CDMX (Ida y Vuelta / Servicio Ejecutivo)
    const preciosBase = {
        'queretaro': { 'sprinter': 12500, 'suburban': 10500, 'hiace': 8500, km: '440 km R/T', horas: '12h serv.' },
        'acapulco': { 'sprinter': 22000, 'suburban': 19500, 'hiace': 15500, km: '760 km R/T', horas: '24-48h serv.' },
        'puebla': { 'sprinter': 9500, 'suburban': 8000, 'hiace': 6800, km: '260 km R/T', horas: '10h serv.' },
        'toluca': { 'sprinter': 7500, 'suburban': 6500, 'hiace': 5500, km: '140 km R/T', horas: '8h serv.' },
        'cuernavaca': { 'sprinter': 8500, 'suburban': 7200, 'hiace': 6200, km: '180 km R/T', horas: '10h serv.' },
        'aeropuerto': { 'sprinter': 4500, 'suburban': 3800, 'hiace': 3000, km: 'AICM / AIFA', horas: 'Traslado one-way' },
        'valle_bravo': { 'sprinter': 13500, 'suburban': 11500, 'hiace': 9500, km: '320 km R/T', horas: '12h serv.' }
    };

    function calcular() {
        const dest = destinoSelect.value;
        const van = vanSelect.value;
        const info = preciosBase[dest];

        if (info && info[van]) {
            const precio = info[van];
            resultSpan.textContent = `$${precio.toLocaleString('es-MX')} MXN`;
            detailSpan.textContent = `Estimado referencia: ${info.km} • ${info.horas} • Incluye chofer, seguro de viajero y combustible estándar.`;
        }
    }

    destinoSelect.addEventListener('change', calcular);
    vanSelect.addEventListener('change', calcular);
    calcular();
}
