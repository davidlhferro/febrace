/**
 * VOLTZ: CIRCUIT BREAK — Renderizador Visual Vetorial Limpo (Estilo Suíço / Bandido)
 * Renderiza as cartas e a mesa com gráficos vetoriais puros, precisos e elegantes.
 */

const VoltzRender = {
    getCornerIndex(card) {
        const id = card.id || '';
        if (id === 'gen_12v') return '⚡12V';
        if (id === 'res_1ohm') return '1Ω';
        if (id === 'res_2ohm') return '2Ω';
        if (id === 'res_3ohm') return '3Ω';
        if (id === 'load_led') return '3V💡';
        if (id === 'load_servidor') return '4V🖥️';
        if (id === 'load_motor') return '6V⚙️';
        if (id === 'load_sirene') return '6V🚨';
        if (id === 'load_tomografo') return '12V🏥';
        if (id === 'special_fuse') return '🛡️1A';
        if (id === 'gnd_cable') return '⏚0V';
        if (id === 'special_node_y') return '🔀Y';
        return '';
    },

    getSchematicSVG(card) {
        const id = card.id || '';
        const isGnd = card.type === 'gnd';
        const hasRight = !isGnd;

        // Trilha Base Horizontal Contínua
        let busSvg = `
            <rect x="0" y="38" width="${hasRight ? '80' : '50'}" height="14" fill="#f59e0b" stroke="#0f172a" stroke-width="1.2"/>
            <polygon points="18,45 10,40 10,50" fill="#0f172a"/>
        `;
        if (hasRight) {
            busSvg += `<polygon points="70,45 62,40 62,50" fill="#0f172a"/>`;
        }

        let symbolSvg = '';

        if (id === 'gen_12v') {
            symbolSvg = `
                <rect x="33" y="0" width="14" height="90" fill="#f59e0b" stroke="#0f172a" stroke-width="1.2"/>
                <rect x="0" y="38" width="80" height="14" fill="#f59e0b" stroke="#0f172a" stroke-width="1.2"/>
                <circle cx="40" cy="45" r="20" fill="#0f172a" stroke="#d97706" stroke-width="1.5"/>
                <circle cx="40" cy="45" r="16" fill="#fffbeb" stroke="#f59e0b" stroke-width="1"/>
                <text x="40" y="49" font-family="Inter, sans-serif" font-weight="900" font-size="9" fill="#b45309" text-anchor="middle">12V</text>
            `;
        } else if (id.startsWith('res_')) {
            const rVal = card.val || 1;
            const rColor = rVal === 1 ? '#059669' : (rVal === 2 ? '#2563eb' : '#ea580c');
            symbolSvg = `
                ${busSvg}
                <rect x="22" y="32" width="36" height="26" rx="5" fill="#fef9c3" stroke="#0f172a" stroke-width="1.5"/>
                <rect x="28" y="32" width="4" height="26" fill="${rColor}"/>
                <rect x="36" y="32" width="4" height="26" fill="#0f172a"/>
                <rect x="44" y="32" width="4" height="26" fill="#eab308"/>
                <text x="40" y="27" font-family="JetBrains Mono" font-weight="900" font-size="7" fill="${rColor}" text-anchor="middle">${rVal}Ω</text>
            `;
        } else if (id === 'load_led') {
            symbolSvg = `
                ${busSvg}
                <circle cx="40" cy="45" r="15" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.5"/>
                <circle cx="40" cy="45" r="10" fill="#4f46e5"/>
                <line x1="48" y1="36" x2="56" y2="28" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="52" y1="40" x2="60" y2="32" stroke="#4f46e5" stroke-width="1.5" stroke-linecap="round"/>
            `;
        } else if (id === 'load_servidor') {
            symbolSvg = `
                ${busSvg}
                <rect x="22" y="27" width="36" height="36" rx="3" fill="#0f172a" stroke="#4f46e5" stroke-width="1.5"/>
                <rect x="26" y="31" width="28" height="7" rx="1" fill="#1e293b"/>
                <circle cx="30" cy="34.5" r="1.5" fill="#10b981"/>
                <rect x="26" y="41" width="28" height="7" rx="1" fill="#1e293b"/>
                <circle cx="30" cy="44.5" r="1.5" fill="#f59e0b"/>
                <rect x="26" y="51" width="28" height="7" rx="1" fill="#1e293b"/>
                <circle cx="30" cy="54.5" r="1.5" fill="#38bdf8"/>
            `;
        } else if (id === 'load_motor') {
            symbolSvg = `
                ${busSvg}
                <rect x="22" y="27" width="36" height="36" rx="4" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.5"/>
                <circle cx="40" cy="45" r="12" fill="#0f172a"/>
                <text x="40" y="50" font-family="Inter" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">M</text>
            `;
        } else if (id === 'load_sirene') {
            symbolSvg = `
                ${busSvg}
                <circle cx="40" cy="45" r="16" fill="#eef2ff" stroke="#4f46e5" stroke-width="1.5"/>
                <path d="M 32 39 L 32 51 L 38 51 L 46 58 L 46 32 L 38 39 Z" fill="#0f172a"/>
                <path d="M 50 38 Q 54 45 50 52" fill="none" stroke="#4f46e5" stroke-width="1.8" stroke-linecap="round"/>
            `;
        } else if (id === 'load_tomografo') {
            symbolSvg = `
                ${busSvg}
                <circle cx="40" cy="45" r="18" fill="#0f172a" stroke="#dc2626" stroke-width="1.5"/>
                <circle cx="40" cy="45" r="10" fill="#ffffff" stroke="#dc2626" stroke-width="1"/>
                <line x1="40" y1="23" x2="40" y2="31" stroke="#dc2626" stroke-width="1.5"/>
                <line x1="40" y1="59" x2="40" y2="67" stroke="#dc2626" stroke-width="1.5"/>
            `;
        } else if (id === 'gnd_cable') {
            symbolSvg = `
                <rect x="0" y="38" width="40" height="14" fill="#f59e0b" stroke="#0f172a" stroke-width="1.2"/>
                <rect x="36" y="22" width="38" height="46" rx="4" fill="#0f172a" stroke="#0d9488" stroke-width="1.5"/>
                <line x1="48" y1="35" x2="48" y2="55" stroke="#2dd4bf" stroke-width="3" stroke-linecap="round"/>
                <line x1="54" y1="39" x2="54" y2="51" stroke="#2dd4bf" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="60" y1="43" x2="60" y2="47" stroke="#2dd4bf" stroke-width="2" stroke-linecap="round"/>
            `;
        } else if (id === 'special_fuse') {
            symbolSvg = `
                ${busSvg}
                <rect x="18" y="33" width="44" height="24" rx="4" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.5"/>
                <rect x="18" y="33" width="8" height="24" fill="#cbd5e1" stroke="#0f172a" stroke-width="1"/>
                <rect x="54" y="33" width="8" height="24" fill="#cbd5e1" stroke="#0f172a" stroke-width="1"/>
                <path d="M 26 45 Q 33 37 40 45 T 54 45" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
            `;
        } else if (id === 'special_node_y') {
            symbolSvg = `
                <rect x="0" y="38" width="80" height="14" fill="#f59e0b" stroke="#0f172a" stroke-width="1.2"/>
                <path d="M 33 38 Q 40 18 40 0 L 47 0 Q 47 18 47 38 Z" fill="#f59e0b" stroke="#0f172a" stroke-width="1.2"/>
                <circle cx="40" cy="45" r="8" fill="#0f172a"/>
                <circle cx="40" cy="45" r="5" fill="#f59e0b"/>
            `;
        }

        return `
        <svg class="schematic-svg" viewBox="0 0 80 90">
            ${symbolSvg}
        </svg>
        `;
    },

    // Renderiza a Carta em HTML
    renderCardHTML(card, options = {}) {
        if (!card) return '<div class="card-empty-slot">Vazio</div>';

        const isHand = options.isHand || false;
        const selected = options.selected || false;
        const showActions = options.showActions || false;

        const catClass = `card-${card.category || 'special'}`;
        const selClass = selected ? 'card-selected' : '';
        const cornerIndex = this.getCornerIndex(card);

        return `
        <div class="voltz-card ${catClass} ${selClass}" data-uid="${card.uid}" data-type="${card.type}">
            <!-- CABEÇALHO DA CARTA -->
            <div class="card-head">
                <div style="display:flex; align-items:center; gap:4px;">
                    <span class="web-poker-badge" style="color:${card.badgeColor || '#0f172a'};">${cornerIndex}</span>
                    <span class="title">${card.title || card.name}</span>
                </div>
                <span class="badge" style="background: ${card.badgeColor || '#0f172a'};">${card.badge || ''}</span>
            </div>

            <!-- ILUSTRAÇÃO ESQUEMÁTICA VETORIAL LIMPA -->
            ${this.getSchematicSVG(card)}

            <!-- RODAPÉ DA CARTA -->
            <div class="card-foot">
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    ${this.getBlocksIndicator(card)}
                    <span class="web-poker-badge" style="color:${card.badgeColor || '#0f172a'}; font-size:8px;">${cornerIndex}</span>
                </div>
                <div class="foot-text">${card.desc || ''}</div>
            </div>

            <!-- BOTÕES DE AÇÃO NA MÃO -->
            ${showActions ? this.getHandActionButtons(card) : ''}
        </div>
        `;
    },

    getBlocksIndicator(card) {
        if (!card.blocks) return '<div></div>';
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
