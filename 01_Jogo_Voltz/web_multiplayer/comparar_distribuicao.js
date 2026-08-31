/**
 * VOLTZ: CIRCUIT BREAK — Teste Comparativo do Baralho Rebalanceado
 * Compara o Baralho Atual (v1) com o Baralho Rebalanceado com Curvas em L/U e Chaves (v2)
 */

const { VOLTZ_CARDS_CATALOG } = require('./js/voltz_cards_data.js');

// Baralho Atual (v1)
const DECK_V1 = [
    { id: 'gen_12v', count: 1 },
    { id: 'res_1ohm', count: 8 },
    { id: 'res_2ohm', count: 8 },
    { id: 'res_3ohm', count: 6 },
    { id: 'load_led', count: 3 },
    { id: 'load_servidor', count: 3 },
    { id: 'load_sirene', count: 2 },
    { id: 'load_motor', count: 3 },
    { id: 'load_tomografo', count: 2 },
    { id: 'gnd_cable', count: 8 },
    { id: 'special_fuse', count: 3 },
    { id: 'special_node_y', count: 5 },
    { id: 'event_surge', count: 2 }
];

// Baralho Proposto com Topologia Espacial & Rebalanceamento (v2)
const DECK_V2 = [
    { id: 'gen_12v', count: 1 },
    { id: 'res_1ohm', count: 6 },
    { id: 'res_2ohm', count: 6 },
    { id: 'res_3ohm', count: 5 },
    { id: 'res_4ohm', count: 2 },        // NOVO: Resistor Industrial 4Ω
    { id: 'load_led', count: 3 },
    { id: 'load_servidor', count: 3 },
    { id: 'load_sirene', count: 2 },
    { id: 'load_motor', count: 3 },
    { id: 'load_tomografo', count: 2 },
    { id: 'gnd_cable', count: 6 },
    { id: 'curve_l_90', count: 4 },      // NOVO: Curva 90° (Joelho de Cobre)
    { id: 'curve_u_180', count: 2 },     // NOVO: Curva em U (Retorno)
    { id: 'switch_toggle', count: 2 },   // NOVO: Chave Seccionadora
    { id: 'special_node_y', count: 3 },
    { id: 'special_fuse', count: 2 },
    { id: 'event_surge', count: 2 }
];

function calculateDeckStats(deckList) {
    const total = deckList.reduce((sum, item) => sum + item.count, 0);
    const resistors = deckList.filter(i => i.id.startsWith('res_')).reduce((sum, i) => sum + i.count, 0);
    const loads = deckList.filter(i => i.id.startsWith('load_')).reduce((sum, i) => sum + i.count, 0);
    const gnd = deckList.filter(i => i.id === 'gnd_cable').reduce((sum, i) => sum + i.count, 0);
    const spatial = deckList.filter(i => i.id.startsWith('curve_') || i.id === 'switch_toggle' || i.id === 'special_node_y').reduce((sum, i) => sum + i.count, 0);
    const protection = deckList.filter(i => i.id === 'special_fuse').reduce((sum, i) => sum + i.count, 0);
    const danger = deckList.filter(i => i.id === 'event_surge').reduce((sum, i) => sum + i.count, 0);

    return { total, resistors, loads, gnd, spatial, protection, danger };
}

console.log('=== COMPARAÇÃO ESTRUTURAL DOS BARALHOS VOLTZ ===\n');
console.log('BARALHO V1 (ATUAL):', calculateDeckStats(DECK_V1));
console.log('BARALHO V2 (REBALANCEADO COM CURVAS & TOPOLOGIA):', calculateDeckStats(DECK_V2));
