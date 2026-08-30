/**
 * VOLTZ: CIRCUIT BREAK — Renderizador Visual Vetorial (SVG / HTML)
 * Renderiza as cartas e a mesa com arte editorial rica de alta fidelidade e índices de poker.
 */

const VoltzRender = {
    // Renderiza a Carta em HTML + SVG Vetorial de Alta Clareza
    renderCardHTML(card, options = {}) {
        if (!card) return '<div class="card-empty-slot">Vazio</div>';

        const isHand = options.isHand || false;
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

            <!-- SVG ESQUEMÁTICO INLINE DE ALTO IMPACTO (Arte Editorial 3D) -->
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

    // Gera o SVG com ilustrações ricas, gradientes e índices de canto
    getCardSVG(card) {
        const id = card.id || '';

        // 1. GERADOR CENTRAL 12V
        if (id === 'gen_12v') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#b45309">⚡12V</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#b45309" text-anchor="end">⚡12V</text>
                
                <rect x="100" y="0" width="38" height="85" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="119,25 110,40 128,40" fill="#0f172a"/>
                <rect x="100" y="247" width="38" height="85" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="119,307 110,292 128,292" fill="#0f172a"/>
                <rect x="0" y="147" width="85" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="25,166 40,157 40,175" fill="#0f172a"/>
                <rect x="153" y="147" width="85" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="213,166 198,157 198,175" fill="#0f172a"/>

                <circle cx="119" cy="166" r="54" fill="#1e293b" stroke="#0f172a" stroke-width="3.5"/>
                <circle cx="119" cy="166" r="46" fill="#fffbeb" stroke="#d97706" stroke-width="3"/>
                
                <rect x="92" y="148" width="54" height="7" rx="2" fill="#0f172a"/>
                <rect x="100" y="160" width="38" height="5" rx="1.5" fill="#b45309"/>
                <rect x="92" y="170" width="54" height="7" rx="2" fill="#0f172a"/>
                <rect x="100" y="182" width="38" height="5" rx="1.5" fill="#b45309"/>

                <text x="119" y="128" font-family="Inter, sans-serif" font-weight="900" font-size="12" fill="#b45309" text-anchor="middle">FONTE 12V</text>
            </svg>
            `;
        }

        // 2. RESISTORES (1Ω, 2Ω, 3Ω)
        if (id === 'res_1ohm' || id === 'res_2ohm' || id === 'res_3ohm') {
            const rVal = card.r || 1;
            const colorHex = rVal === 1 ? '#059669' : (rVal === 2 ? '#1d4ed8' : '#c2410c');
            const bandColor = rVal === 1 ? '#78350f' : (rVal === 2 ? '#dc2626' : '#ea580c');

            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="${colorHex}">${rVal}Ω</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="${colorHex}" text-anchor="end">${rVal}Ω</text>

                <rect x="0" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="32,166 18,157 18,175" fill="#0f172a"/>
                <polygon points="48,166 34,157 34,175" fill="#0f172a"/>
                
                <rect x="178" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="198,166 184,157 184,175" fill="#0f172a"/>
                <polygon points="214,166 200,157 200,175" fill="#0f172a"/>

                <line x1="58" y1="166" x2="74" y2="166" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
                <line x1="164" y1="166" x2="180" y2="166" stroke="#475569" stroke-width="8" stroke-linecap="round"/>

                <rect x="70" y="132" width="98" height="68" rx="14" fill="#fef08a" stroke="#0f172a" stroke-width="2.8"/>
                <rect x="86" y="132" width="10" height="68" fill="${bandColor}"/>
                <rect x="104" y="132" width="10" height="68" fill="#0f172a"/>
                <rect x="122" y="132" width="10" height="68" fill="#eab308"/>
                <rect x="144" y="132" width="8" height="68" fill="#d97706"/>
                <rect x="72" y="136" width="94" height="6" rx="3" fill="#ffffff" fill-opacity="0.6"/>

                <text x="119" y="116" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="${colorHex}" text-anchor="middle">R = ${rVal} OHM${rVal > 1 ? 'S' : ''}</text>
            </svg>
            `;
        }

        // 3. LED PILOTO (3V)
        if (id === 'load_led') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca">3V💡</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca" text-anchor="end">3V💡</text>

                <rect x="0" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="35,166 20,157 20,175" fill="#0f172a"/>
                <rect x="173" y="147" width="65" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="208,166 193,157 193,175" fill="#0f172a"/>

                <circle cx="119" cy="166" r="48" fill="#eef2ff" stroke="#4338ca" stroke-width="2.5"/>
                <circle cx="119" cy="166" r="38" fill="#4338ca" stroke="#0f172a" stroke-width="2"/>
                <line x1="140" y1="134" x2="162" y2="112" stroke="#4f46e5" stroke-width="3" stroke-linecap="round"/>
                <polygon points="162,112 152,114 160,122" fill="#4f46e5"/>
                <line x1="152" y1="144" x2="174" y2="122" stroke="#4f46e5" stroke-width="3" stroke-linecap="round"/>
                <polygon points="174,122 164,124 172,132" fill="#4f46e5"/>

                <text x="119" y="104" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#4338ca" text-anchor="middle">Vnom = 3 VOLTS</text>
            </svg>
            `;
        }

        // 4. SERVIDOR CENTRAL (4V)
        if (id === 'load_servidor') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca">4V🖥️</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca" text-anchor="end">4V🖥️</text>

                <rect x="0" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="32,166 18,157 18,175" fill="#0f172a"/>
                <rect x="183" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="212,166 198,157 198,175" fill="#0f172a"/>

                <rect x="52" y="118" width="134" height="96" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="3"/>
                <rect x="62" y="128" width="114" height="22" rx="3" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                <circle cx="74" cy="139" r="3.5" fill="#34d399"/><circle cx="84" cy="139" r="3.5" fill="#38bdf8"/>
                <rect x="62" y="156" width="114" height="22" rx="3" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                <circle cx="74" cy="167" r="3.5" fill="#34d399"/><circle cx="84" cy="167" r="3.5" fill="#fbbf24"/>

                <text x="119" y="106" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#4338ca" text-anchor="middle">Vnom = 4 VOLTS</text>
            </svg>
            `;
        }

        // 5. SIRENE DE ALARME (6V)
        if (id === 'load_sirene') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca">6V🚨</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca" text-anchor="end">6V🚨</text>

                <rect x="0" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="32,166 18,157 18,175" fill="#0f172a"/>
                <rect x="178" y="147" width="60" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="212,166 198,157 198,175" fill="#0f172a"/>

                <circle cx="119" cy="166" r="48" fill="#eef2ff" stroke="#4338ca" stroke-width="2.5"/>
                <path d="M 94 150 L 94 182 L 112 182 L 138 202 L 138 130 L 112 150 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2.5"/>
                <path d="M 148 148 Q 160 166 148 184" fill="none" stroke="#4338ca" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M 158 138 Q 176 166 158 194" fill="none" stroke="#4f46e5" stroke-width="3.5" stroke-linecap="round"/>

                <text x="119" y="104" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#4338ca" text-anchor="middle">Vnom = 6 VOLTS</text>
            </svg>
            `;
        }

        // 6. MOTOR DE BOMBA (6V)
        if (id === 'load_motor') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca">6V⚙️</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca" text-anchor="end">6V⚙️</text>

                <rect x="0" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="32,166 18,157 18,175" fill="#0f172a"/>
                <rect x="183" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="212,166 198,157 198,175" fill="#0f172a"/>

                <rect x="62" y="120" width="114" height="92" rx="10" fill="#cbd5e1" stroke="#0f172a" stroke-width="3"/>
                <circle cx="119" cy="166" r="32" fill="#0f172a" stroke="#d97706" stroke-width="2.5"/>
                <text x="119" y="177" font-family="Inter, sans-serif" font-weight="900" font-size="28" fill="#f8fafc" text-anchor="middle">M</text>

                <text x="119" y="104" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#4338ca" text-anchor="middle">Vnom = 6 VOLTS</text>
            </svg>
            `;
        }

        // 7. TOMÓGRAFO UTI (12V)
        if (id === 'load_tomografo') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca">12V🏥</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#4338ca" text-anchor="end">12V🏥</text>

                <rect x="0" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="32,166 18,157 18,175" fill="#0f172a"/>
                <rect x="183" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="212,166 198,157 198,175" fill="#0f172a"/>

                <circle cx="119" cy="166" r="54" fill="#0f172a" stroke="#dc2626" stroke-width="3"/>
                <circle cx="119" cy="166" r="44" fill="#1e293b" stroke="#e0f2fe" stroke-width="2"/>
                <circle cx="119" cy="166" r="30" fill="#f8fafc" stroke="#38bdf8" stroke-width="2"/>
                <circle cx="119" cy="166" r="14" fill="#0f172a"/>

                <text x="119" y="102" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#4338ca" text-anchor="middle">Vnom = 12 VOLTS</text>
            </svg>
            `;
        }

        // 8. CABO TERRA (GND)
        if (id === 'gnd_cable') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#0f766e">⏚ 0V</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#0f766e" text-anchor="end">⏚ 0V</text>

                <rect x="0" y="147" width="112" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="40,166 25,157 25,175" fill="#0f172a"/>
                <polygon points="70,166 55,157 55,175" fill="#0f172a"/>

                <rect x="110" y="106" width="112" height="120" rx="10" fill="#1e293b" stroke="#0f766e" stroke-width="3"/>
                <line x1="112" y1="166" x2="154" y2="166" stroke="#0f766e" stroke-width="6"/>
                <line x1="154" y1="130" x2="154" y2="202" stroke="#2dd4bf" stroke-width="8" stroke-linecap="round"/>
                <line x1="168" y1="142" x2="168" y2="190" stroke="#2dd4bf" stroke-width="7" stroke-linecap="round"/>
                <line x1="182" y1="154" x2="182" y2="178" stroke="#2dd4bf" stroke-width="6" stroke-linecap="round"/>
                <line x1="194" y1="162" x2="194" y2="170" stroke="#2dd4bf" stroke-width="5" stroke-linecap="round"/>

                <text x="160" y="94" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#0f766e" text-anchor="middle">POTENCIAL = 0V</text>
            </svg>
            `;
        }

        // 9. FUSÍVEL 1A
        if (id === 'special_fuse') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#0369a1">🛡️1A</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#0369a1" text-anchor="end">🛡️1A</text>

                <rect x="0" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="32,166 18,157 18,175" fill="#0f172a"/>
                <rect x="183" y="147" width="55" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="212,166 198,157 198,175" fill="#0f172a"/>

                <rect x="52" y="132" width="134" height="68" rx="14" fill="#e0f2fe" stroke="#0369a1" stroke-width="2.8"/>
                <rect x="52" y="132" width="24" height="68" rx="4" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
                <rect x="162" y="132" width="24" height="68" rx="4" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
                <path d="M 76 166 Q 96 142 119 166 T 162 166" fill="none" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>

                <text x="119" y="112" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#0369a1" text-anchor="middle">Imax = 1.0 A</text>
            </svg>
            `;
        }

        // 10. NÓ PARALELO EM Y
        if (id === 'special_node_y') {
            return `
            <svg class="schematic-svg" viewBox="0 0 238 332">
                <text x="12" y="28" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#0369a1">🔀 Y</text>
                <text x="226" y="318" font-family="JetBrains Mono" font-weight="900" font-size="10" fill="#0369a1" text-anchor="end">🔀 Y</text>

                <rect x="0" y="147" width="119" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="45,166 30,157 30,175" fill="#0f172a"/>
                <rect x="119" y="147" width="119" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
                <polygon points="195,166 180,157 180,175" fill="#0f172a"/>
                <path d="M 100 166 Q 119 100 119 0 L 157 0 Q 157 100 138 166 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>

                <circle cx="119" cy="166" r="24" fill="#0f172a"/>
                <circle cx="119" cy="166" r="16" fill="#f59e0b"/>

                <text x="119" y="112" font-family="JetBrains Mono, monospace" font-weight="900" font-size="12" fill="#0369a1" text-anchor="middle">DIVISOR DE RAMO</text>
            </svg>
            `;
        }

        // DEFAULT FALLBACK
        return `
        <svg class="schematic-svg" viewBox="0 0 238 332">
            <rect x="0" y="147" width="238" height="38" fill="#f59e0b" stroke="#0f172a" stroke-width="2.5"/>
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
