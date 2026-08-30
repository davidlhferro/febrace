/**
 * VOLTZ: CIRCUIT BREAK — Renderizador Visual Masterclass (Pinturas em Alta Resolução + Gold Fingers)
 * Renderiza as cartas e a mesa com ilustrações ricas em estilo Kickstarter/Netrunner.
 */

const VoltzRender = {
    // Mapeamento de imagens para cada componente
    getImagePath(card) {
        const id = card.id || '';
        if (id === 'gen_12v') return 'assets_art/gen_12v.jpg';
        if (id.startsWith('res_')) return 'assets_art/resistor.jpg';
        if (id === 'load_led') return 'assets_art/load_led.jpg';
        if (id === 'load_servidor') return 'assets_art/load_server.jpg';
        if (id === 'load_motor') return 'assets_art/load_motor.jpg';
        if (id === 'load_sirene') return 'assets_art/load_siren.jpg';
        if (id === 'load_tomografo') return 'assets_art/load_tomografo.jpg';
        if (id === 'special_fuse') return 'assets_art/fuse.jpg';
        if (id === 'gnd_cable') return 'assets_art/gnd.jpg';
        if (id === 'special_node_y') return 'assets_art/gen_12v.jpg';
        return 'assets_art/resistor.jpg';
    },

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

    // Renderiza a Carta em HTML com Pintura Real
    renderCardHTML(card, options = {}) {
        if (!card) return '<div class="card-empty-slot">Vazio</div>';

        const isHand = options.isHand || false;
        const selected = options.selected || false;
        const showActions = options.showActions || false;

        const catClass = `card-${card.category || 'special'}`;
        const selClass = selected ? 'card-selected' : '';
        const imgPath = this.getImagePath(card);
        const cornerIndex = this.getCornerIndex(card);
        const isGnd = card.type === 'gnd';

        return `
        <div class="voltz-card ${catClass} ${selClass}" data-uid="${card.uid}" data-type="${card.type}">
            <!-- Conectores Gold Finger de 10mm -->
            <div class="web-gold-finger-left"></div>
            ${!isGnd ? '<div class="web-gold-finger-right"></div>' : ''}

            <!-- CABEÇALHO DA CARTA -->
            <div class="card-head">
                <div style="display:flex; align-items:center; gap:4px;">
                    <span class="web-poker-badge" style="color:${card.badgeColor || '#f59e0b'};">${cornerIndex}</span>
                    <span class="title">${card.title || card.name}</span>
                </div>
                <span class="badge" style="background: ${card.badgeColor || '#0f172a'};">${card.badge || ''}</span>
            </div>

            <!-- ILUSTRAÇÃO HERO EM ALTA DEFINIÇÃO -->
            <div class="web-hero-art">
                <img src="${imgPath}" alt="${card.name}">
            </div>

            <!-- RODAPÉ DA CARTA -->
            <div class="card-foot">
                <div class="foot-text">${card.desc || ''}</div>
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-top:2px;">
                    ${this.getBlocksIndicator(card)}
                    <span class="web-poker-badge" style="color:${card.badgeColor || '#f59e0b'}; font-size:9px;">${cornerIndex}</span>
                </div>
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
