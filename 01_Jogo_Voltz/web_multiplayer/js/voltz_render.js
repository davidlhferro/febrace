/**
 * VOLTZ: CIRCUIT BREAK — Renderizador Visual Vetorial (SVG / HTML)
 * Renderiza as cartas e a mesa com trilhas de cobre de 10mm e esquemas inline.
 */

const VoltzRender = {
    // Renderiza a Carta em HTML + SVG Vetorial de Alta Clareza
    renderCardHTML(card, options = {}) {
        if (!card) return '<div class="card-empty-slot">Vazio</div>';

        const isHand = options.isHand || false;
        const selectable = options.selectable || false;
        const selected = options.selected || false;
        const showActions = options.showActions || false;

        const catClass = `card-${card.category || 'special'}`;
        const selClass = selected ? 'card-selected' : '';

        return `
        <div class="voltz-card ${catClass} ${selClass}" data-uid="${card.uid}" data-type="${card.type}">
            <!-- CABEÇALHO DA CARTA -->
            <div class="card-head">
                <span class="title">${card.title || card.name}</span>
                <span class="badge" style="background: ${card.badgeColor || '#0f172a'};">${card.badge || ''}</span>
            </div>

            <!-- SVG ESQUEMÁTICO INLINE DE ALTO IMPACTO (Trilha de Cobre de 10mm) -->
            ${this.getCardSVG(card)}

            <!-- RODAPÉ DA CARTA -->
            <div class="card-foot">
                ${this.getBlocksIndicator(card)}
                <div class="foot-text">${card.desc || ''}</div>
            </div>

            <!-- BOTÕES DE AÇÃO NA MÃO -->
            ${showActions ? this.getHandActionButtons(card) : ''}
        </div>
        `;
    },

    // Gera o SVG monolítico de acordo com a categoria da carta
    getCardSVG(card) {
        const id = card.id || '';

        // 1. GERADOR CENTRAL 12V
        if (id === 'gen_12v') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="100" y="0" width="38" height="85" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="119,25 110,40 128,40" fill="#0f172a"/>
                <rect x="100" y="247" width="38" height="85" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="119,307 110,292 128,292" fill="#0f172a"/>
                <rect x="0" y="147" width="85" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="25,166 40,157 40,175" fill="#0f172a"/>
                <rect x="153" y="147" width="85" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="213,166 198,157 198,175" fill="#0f172a"/>
                <circle cx="119" cy="166" r="54" fill="#ffffff" stroke="#0f172a" stroke-width="4"/>
                <circle cx="119" cy="166" r="46" fill="#fffbeb" stroke="#f59e0b" stroke-width="3"/>
                <line x1="90" y1="152" x2="148" y2="152" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
                <line x1="102" y1="166" x2="136" y2="166" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
                <line x1="90" y1="180" x2="148" y2="180" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
                <text x="119" y="132" font-family="Inter, sans-serif" font-weight="900" font-size="14" fill="#b45309" text-anchor="middle">FONTE 12V</text>
            </svg>
            `;
        }

        // 2. RESISTOR 1Ω
        if (id === 'res_1ohm') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="35,166 22,157 22,175" fill="#0f172a"/>
                <polygon points="50,166 37,157 37,175" fill="#0f172a"/>
                <rect x="173" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="195,166 182,157 182,175" fill="#0f172a"/>
                <polygon points="210,166 197,157 197,175" fill="#0f172a"/>
                <rect x="62" y="122" width="114" height="88" rx="8" fill="#f0fdf4" stroke="#059669" stroke-width="3"/>
                <path d="M62,166 L85,166 L98,136 L124,196 L150,136 L163,166 L176,166" fill="none" stroke="#059669" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="119" y="112" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#059669" text-anchor="middle">R = 1 OHM</text>
            </svg>
            `;
        }

        // 3. RESISTOR 2Ω
        if (id === 'res_2ohm') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="50" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="28,166 15,157 15,175" fill="#0f172a"/><polygon points="42,166 29,157 29,175" fill="#0f172a"/>
                <rect x="188" y="147" width="50" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="210,166 197,157 197,175" fill="#0f172a"/><polygon points="225,166 212,157 212,175" fill="#0f172a"/>
                <rect x="48" y="122" width="142" height="88" rx="8" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
                <path d="M48,166 L68,166 L82,136 L104,196 L126,136 L148,196 L162,136 L175,166 L190,166" fill="none" stroke="#1d4ed8" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="119" y="112" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#1d4ed8" text-anchor="middle">R = 2 OHMS</text>
            </svg>
            `;
        }

        // 4. RESISTOR 3Ω
        if (id === 'res_3ohm') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="40" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="22,166 10,157 10,175" fill="#0f172a"/>
                <rect x="198" y="147" width="40" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="222,166 210,157 210,175" fill="#0f172a"/>
                <rect x="38" y="122" width="162" height="88" rx="8" fill="#fff7ed" stroke="#c2410c" stroke-width="3"/>
                <path d="M38,166 L52,166 L64,136 L82,196 L100,136 L118,196 L136,136 L154,196 L172,136 L184,166 L200,166" fill="none" stroke="#c2410c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="119" y="112" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#c2410c" text-anchor="middle">R = 3 OHMS</text>
            </svg>
            `;
        }

        // 5. LED PILOTO (3V)
        if (id === 'load_led') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="70" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="40,166 25,157 25,175" fill="#0f172a"/>
                <rect x="168" y="147" width="70" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="205,166 190,157 190,175" fill="#0f172a"/>
                <circle cx="119" cy="166" r="48" fill="#eef2ff" stroke="#4338ca" stroke-width="3"/>
                <polygon points="96,140 96,192 136,166" fill="#4338ca" stroke="#0f172a" stroke-width="2"/>
                <line x1="138" y1="138" x2="138" y2="194" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
                <line x1="126" y1="130" x2="146" y2="110" stroke="#4338ca" stroke-width="3" stroke-linecap="round"/>
                <polygon points="146,110 136,112 144,120" fill="#4338ca"/>
                <line x1="140" y1="138" x2="160" y2="118" stroke="#4338ca" stroke-width="3" stroke-linecap="round"/>
                <polygon points="160,118 150,120 158,128" fill="#4338ca"/>
                <text x="119" y="98" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#4338ca" text-anchor="middle">Vnom = 3 VOLTS</text>
            </svg>
            `;
        }

        // 6. SERVIDOR CENTRAL (4V)
        if (id === 'load_servidor') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="35,166 20,157 20,175" fill="#0f172a"/>
                <rect x="178" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="210,166 195,157 195,175" fill="#0f172a"/>
                <rect x="58" y="120" width="122" height="92" rx="8" fill="#eef2ff" stroke="#4338ca" stroke-width="3"/>
                <rect x="74" y="136" width="90" height="24" rx="3" fill="#312e81"/><circle cx="86" cy="148" r="4" fill="#34d399"/>
                <rect x="74" y="168" width="90" height="24" rx="3" fill="#312e81"/><circle cx="86" cy="180" r="4" fill="#38bdf8"/>
                <text x="119" y="106" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#4338ca" text-anchor="middle">Vnom = 4 VOLTS</text>
            </svg>
            `;
        }

        // 7. SIRENE DE ALARME (6V)
        if (id === 'load_sirene') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="35,166 20,157 20,175" fill="#0f172a"/>
                <rect x="173" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="210,166 195,157 195,175" fill="#0f172a"/>
                <circle cx="119" cy="166" r="46" fill="#eef2ff" stroke="#4338ca" stroke-width="3"/>
                <path d="M102,150 L102,182 L116,182 L136,198 L136,134 L116,150 Z" fill="#4338ca" stroke="#0f172a" stroke-width="2"/>
                <path d="M146,150 Q156,166 146,182" fill="none" stroke="#4338ca" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M154,142 Q168,166 154,190" fill="none" stroke="#4338ca" stroke-width="3.5" stroke-linecap="round"/>
                <text x="119" y="106" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#4338ca" text-anchor="middle">Vnom = 6 VOLTS</text>
            </svg>
            `;
        }

        // 8. MOTOR DE BOMBA (6V)
        if (id === 'load_motor') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="35,166 20,157 20,175" fill="#0f172a"/>
                <rect x="173" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="210,166 195,157 195,175" fill="#0f172a"/>
                <circle cx="119" cy="166" r="48" fill="#eef2ff" stroke="#4338ca" stroke-width="4"/>
                <text x="119" y="177" font-family="Inter, sans-serif" font-weight="900" font-size="32" fill="#4338ca" text-anchor="middle">M</text>
                <rect x="67" y="156" width="6" height="20" fill="#0f172a"/>
                <rect x="165" y="156" width="6" height="20" fill="#0f172a"/>
                <text x="119" y="104" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#4338ca" text-anchor="middle">Vnom = 6 VOLTS</text>
            </svg>
            `;
        }

        // 9. TOMÓGRAFO UTI (12V)
        if (id === 'load_tomografo') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="35,166 20,157 20,175" fill="#0f172a"/>
                <rect x="178" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="210,166 195,157 195,175" fill="#0f172a"/>
                <circle cx="119" cy="166" r="50" fill="#eef2ff" stroke="#4338ca" stroke-width="4"/>
                <circle cx="119" cy="166" r="32" fill="#ffffff" stroke="#4338ca" stroke-width="2.5"/>
                <circle cx="119" cy="166" r="14" fill="#312e81"/>
                <text x="119" y="102" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#4338ca" text-anchor="middle">Vnom = 12 VOLTS</text>
            </svg>
            `;
        }

        // 10. CABO TERRA (GND)
        if (id === 'gnd_cable') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="119" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="45,166 30,157 30,175" fill="#0f172a"/><polygon points="75,166 60,157 60,175" fill="#0f172a"/>
                <rect x="115" y="105" width="108" height="122" rx="10" fill="#f0fdf4" stroke="#0f766e" stroke-width="3.5"/>
                <line x1="119" y1="166" x2="160" y2="166" stroke="#0f766e" stroke-width="6"/>
                <line x1="160" y1="130" x2="160" y2="202" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
                <line x1="174" y1="142" x2="174" y2="190" stroke="#0f766e" stroke-width="7" stroke-linecap="round"/>
                <line x1="188" y1="154" x2="188" y2="178" stroke="#0f766e" stroke-width="6" stroke-linecap="round"/>
                <line x1="200" y1="162" x2="200" y2="170" stroke="#0f766e" stroke-width="5" stroke-linecap="round"/>
                <text x="160" y="95" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#0f766e" text-anchor="middle">POTENCIAL = 0V</text>
            </svg>
            `;
        }

        // 11. FUSÍVEL 1A
        if (id === 'special_fuse') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="30,166 18,157 18,175" fill="#0f172a"/>
                <rect x="183" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
                <polygon points="215,166 203,157 203,175" fill="#0f172a"/>
                <rect x="52" y="132" width="134" height="68" rx="14" fill="#f0f9ff" stroke="#0369a1" stroke-width="3"/>
                <rect x="52" y="132" width="24" height="68" rx="4" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
                <rect x="162" y="132" width="24" height="68" rx="4" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
                <path d="M76,166 Q100,146 119,166 T162,166" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
                <text x="119" y="112" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#0369a1" text-anchor="middle">Imax = 1.0 A</text>
            </svg>
            `;
        }

        // 12. NÓ PARALELO EM Y
        if (id === 'special_node_y') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <rect x="0" y="147" width="119" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/><polygon points="45,166 30,157 30,175" fill="#0f172a"/>
                <rect x="119" y="147" width="119" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/><polygon points="195,166 180,157 180,175" fill="#0f172a"/>
                <path d="M100,166 Q119,100 119,0 L157,0 Q157,100 138,166 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/><polygon points="138,40 128,55 148,55" fill="#0f172a"/>
                <circle cx="119" cy="166" r="24" fill="#0f172a"/><circle cx="119" cy="166" r="14" fill="#f59e0b"/>
                <text x="119" y="112" font-family="JetBrains Mono, monospace" font-weight="900" font-size="13" fill="#0369a1" text-anchor="middle">DIVISOR DE RAMO</text>
            </svg>
            `;
        }

        // DEFAULT FALLBACK
        return `
        <svg class="schematic-svg" viewBox="0 0 238 332">
            <rect x="0" y="147" width="238" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="3"/>
            <text x="119" y="172" font-family="Inter" font-weight="800" font-size="16" fill="#0f172a" text-anchor="middle">${card.name}</text>
        </svg>
        `;
    },

    getBlocksIndicator(card) {
        if (!card.blocks) return '';
        let cubes = '';
        const cat = card.category || 'gen';
        for (let i = 0; i < card.blocks; i++) {
            cubes += `<div class="ohm-cube c-${cat}"></div>`;
        }
        return `<div class="blocks-indicator">${cubes}</div>`;
    },

    getHandActionButtons(card) {
        if (card.type === 'gnd') {
            return `
            <div class="card-action-bar">
                <button class="btn-action btn-gnd" onclick="App.openSectorPicker('${card.uid}', 'gnd')">
                    ⏚ Aterrar Setor
                </button>
            </div>
            `;
        }
        return `
        <div class="card-action-bar">
            <button class="btn-action btn-play" onclick="App.openSectorPicker('${card.uid}', 'play')">
                ⚡ Jogar no Ramo
            </button>
        </div>
        `;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzRender };
}
