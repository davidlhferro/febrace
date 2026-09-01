/**
 * PORTAL VOLTZ — Catálogo Canônico de Cartas & Topologia 2D (Padrão Bandido)
 * Cada carta possui geometria de portas { top, right, bottom, left } e rotação (0°, 90°, 180°, 270°).
 */

// Geometrias Topológicas Básicas (Portas em Rotação 0°)
const TOPOLOGY_SHAPES = {
    // Linha Reta: Entrada Esquerda -> Saída Direita
    STRAIGHT: { top: false, right: true, bottom: false, left: true },
    // Joelho / Curva 90°: Entrada Esquerda -> Saída Baixo
    CORNER_90: { top: false, right: false, bottom: true, left: true },
    // Conector T: Entrada Esquerda -> Saídas Direita e Baixo
    T_JUNCTION: { top: false, right: true, bottom: true, left: true },
    // Cruz 4 Saídas: Cima, Direita, Baixo, Esquerda
    CROSS_4WAY: { top: true, right: true, bottom: true, left: true },
    // Cabo Terra (GND Dead-End): Entrada Esquerda -> Fim no GND
    DEAD_END: { top: false, right: false, bottom: false, left: true },
    // Gerador Central (0,0): 4 Saídas de Potência
    GENERATOR: { top: true, right: true, bottom: true, left: true }
};

// Calcula as portas após rotação horária (0, 90, 180, 270 graus)
function getRotatedPorts(basePorts, rotation = 0) {
    const rot = (rotation % 360 + 360) % 360;
    if (rot === 0) {
        return { top: !!basePorts.top, right: !!basePorts.right, bottom: !!basePorts.bottom, left: !!basePorts.left };
    }
    if (rot === 90) {
        return { top: !!basePorts.left, right: !!basePorts.top, bottom: !!basePorts.right, left: !!basePorts.bottom };
    }
    if (rot === 180) {
        return { top: !!basePorts.bottom, right: !!basePorts.left, bottom: !!basePorts.top, left: !!basePorts.right };
    }
    if (rot === 270) {
        return { top: !!basePorts.right, right: !!basePorts.bottom, bottom: !!basePorts.left, left: !!basePorts.top };
    }
    return { ...basePorts };
}

const VOLTZ_CARDS_CATALOG = [
    // 1. GERADOR CENTRAL (1 Carta - Posição Inicial 0,0)
    {
        id: 'gen_12v',
        type: 'generator',
        name: 'Gerador Central 12V',
        category: 'gen',
        shape: 'GENERATOR',
        basePorts: TOPOLOGY_SHAPES.GENERATOR,
        voltageIn: 12,
        r: 0,
        blocks: 12,
        title: 'Gerador Principal',
        badge: 'DC 12V',
        badgeColor: '#b45309',
        desc: 'Fonte principal de 12V posicionada no centro (0,0) com 4 saídas de barramento de potência.',
        count: 1
    },

    // 2. RESISTORES 1Ω (10 Cartas: 6 Retos + 4 Joelhos 90°)
    {
        id: 'res_1ohm_straight',
        type: 'resistor',
        name: 'Resistor 1Ω (Reta)',
        category: 'r1',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        r: 1,
        blocks: 1,
        title: 'Resistor 1Ω',
        badge: '1 Ω // RETA',
        badgeColor: '#059669',
        desc: '+1Ω de Resistência na linha reta.',
        count: 6
    },
    {
        id: 'res_1ohm_corner',
        type: 'resistor',
        name: 'Resistor 1Ω (Curva 90°)',
        category: 'r1',
        shape: 'CORNER_90',
        basePorts: TOPOLOGY_SHAPES.CORNER_90,
        r: 1,
        blocks: 1,
        title: 'Resistor 1Ω 90°',
        badge: '1 Ω // 90°',
        badgeColor: '#059669',
        desc: '+1Ω de Resistência com curva em L para manobra.',
        count: 4
    },

    // 3. RESISTORES 2Ω (10 Cartas: 6 Retos + 4 Joelhos 90°)
    {
        id: 'res_2ohm_straight',
        type: 'resistor',
        name: 'Resistor 2Ω (Reta)',
        category: 'r2',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        r: 2,
        blocks: 2,
        title: 'Resistor 2Ω',
        badge: '2 Ω // RETA',
        badgeColor: '#1d4ed8',
        desc: '+2Ω de Resistência na linha reta.',
        count: 6
    },
    {
        id: 'res_2ohm_corner',
        type: 'resistor',
        name: 'Resistor 2Ω (Curva 90°)',
        category: 'r2',
        shape: 'CORNER_90',
        basePorts: TOPOLOGY_SHAPES.CORNER_90,
        r: 2,
        blocks: 2,
        title: 'Resistor 2Ω 90°',
        badge: '2 Ω // 90°',
        badgeColor: '#1d4ed8',
        desc: '+2Ω de Resistência com curva em L para manobra.',
        count: 4
    },

    // 4. RESISTORES 3Ω (8 Cartas: 5 Retos + 3 Joelhos 90°)
    {
        id: 'res_3ohm_straight',
        type: 'resistor',
        name: 'Resistor 3Ω (Reta)',
        category: 'r3',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        r: 3,
        blocks: 3,
        title: 'Resistor 3Ω',
        badge: '3 Ω // RETA',
        badgeColor: '#c2410c',
        desc: '+3Ω de Resistência na linha reta.',
        count: 5
    },
    {
        id: 'res_3ohm_corner',
        type: 'resistor',
        name: 'Resistor 3Ω (Curva 90°)',
        category: 'r3',
        shape: 'CORNER_90',
        basePorts: TOPOLOGY_SHAPES.CORNER_90,
        r: 3,
        blocks: 3,
        title: 'Resistor 3Ω 90°',
        badge: '3 Ω // 90°',
        badgeColor: '#c2410c',
        desc: '+3Ω de Resistência com curva em L.',
        count: 3
    },

    // 5. RESISTORES 4Ω (4 Cartas: 2 Retos + 2 Joelhos 90°)
    {
        id: 'res_4ohm_straight',
        type: 'resistor',
        name: 'Resistor 4Ω (Reta)',
        category: 'r4',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        r: 4,
        blocks: 4,
        title: 'Resistor 4Ω',
        badge: '4 Ω // RETA',
        badgeColor: '#78350f',
        desc: '+4Ω de Resistência para cargas de alta tensão.',
        count: 2
    },
    {
        id: 'res_4ohm_corner',
        type: 'resistor',
        name: 'Resistor 4Ω (Curva 90°)',
        category: 'r4',
        shape: 'CORNER_90',
        basePorts: TOPOLOGY_SHAPES.CORNER_90,
        r: 4,
        blocks: 4,
        title: 'Resistor 4Ω 90°',
        badge: '4 Ω // 90°',
        badgeColor: '#78350f',
        desc: '+4Ω de Resistência com curva em L.',
        count: 2
    },

    // 6. EQUIPAMENTO: LED PILOTO 3V (4 Cartas) - Vnom = 3V, R = 1Ω (Requer +3Ω na malha)
    {
        id: 'load_led',
        type: 'equipment',
        name: 'LED Piloto 3V',
        category: 'load',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        vNom: 3,
        r: 1,
        blocks: 1,
        targetAddR: 3,
        title: 'LED Piloto',
        badge: '3V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Requer +3Ω adicionais no ramo para atingir 3V: 12V · (1/4) = 3V.',
        count: 4
    },

    // 7. EQUIPAMENTO: SERVIDOR CENTRAL 4V (4 Cartas) - Vnom = 4V, R = 1Ω (Requer +2Ω na malha)
    {
        id: 'load_servidor',
        type: 'equipment',
        name: 'Servidor Central 4V',
        category: 'load',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        vNom: 4,
        r: 1,
        blocks: 1,
        targetAddR: 2,
        title: 'Servidor Central',
        badge: '4V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Requer +2Ω adicionais no ramo para atingir 4V: 12V · (1/3) = 4V.',
        count: 4
    },

    // 8. EQUIPAMENTO: SIRENE DE ALARME 6V (3 Cartas) - Vnom = 6V, R = 1Ω (Requer +1Ω na malha)
    {
        id: 'load_sirene',
        type: 'equipment',
        name: 'Sirene de Alarme 6V',
        category: 'load',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        vNom: 6,
        r: 1,
        blocks: 1,
        targetAddR: 1,
        title: 'Sirene de Alarme',
        badge: '6V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Requer +1Ω adicional no ramo para atingir 6V: 12V · (1/2) = 6V.',
        count: 3
    },

    // 9. EQUIPAMENTO: BOMBA CENTRÍFUGA 6V (4 Cartas) - Vnom = 6V, R = 2Ω (Requer +2Ω na malha)
    {
        id: 'load_motor',
        type: 'equipment',
        name: 'Bomba Centrífuga 6V',
        category: 'load',
        shape: 'CORNER_90',
        basePorts: TOPOLOGY_SHAPES.CORNER_90,
        vNom: 6,
        r: 2,
        blocks: 2,
        targetAddR: 2,
        title: 'Bomba Centrífuga',
        badge: '6V // 2Ω (90°)',
        badgeColor: '#4338ca',
        desc: 'Requer +2Ω adicionais no ramo: 12V · (2/4) = 6V.',
        count: 4
    },

    // 10. EQUIPAMENTO: TOMÓGRAFO UTI 12V (3 Cartas) - Vnom = 12V, R = 4Ω (Requer +0Ω na malha)
    {
        id: 'load_tomografo',
        type: 'equipment',
        name: 'Tomógrafo UTI 12V',
        category: 'load',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        vNom: 12,
        r: 4,
        blocks: 4,
        targetAddR: 0,
        title: 'Tomógrafo UTI',
        badge: '12V // 4Ω',
        badgeColor: '#4338ca',
        desc: 'Conexão direta em 12V sem resistores: 12V · (4/4) = 12V.',
        count: 3
    },

    // 11. CABO TERRA GND 0V (6 Cartas) - Fechamento Dead-End
    {
        id: 'gnd_cable',
        type: 'gnd',
        name: 'Cabo Terra (GND // 0V)',
        category: 'gnd',
        shape: 'DEAD_END',
        basePorts: TOPOLOGY_SHAPES.DEAD_END,
        r: 0,
        blocks: 0,
        title: 'Cabo Terra (GND)',
        badge: 'GND // 0V',
        badgeColor: '#0f766e',
        desc: 'Fecha o circuito em potencial 0.0V e aciona o teste da Lei de Ohm.',
        count: 6
    },

    // 12. FUSÍVEL DE PROTEÇÃO 1A (4 Cartas)
    {
        id: 'special_fuse',
        type: 'fuse',
        name: 'Fusível 1A',
        category: 'special',
        shape: 'STRAIGHT',
        basePorts: TOPOLOGY_SHAPES.STRAIGHT,
        r: 0,
        blocks: 0,
        title: 'Fusível 1A',
        badge: 'PROTEÇÃO 1A',
        badgeColor: '#0369a1',
        desc: 'Protege contra sobretensão desarmando com segurança antes que o equipamento queime.',
        count: 4
    },

    // 13. CONECTOR Y / BIFURCAÇÃO EM T (4 Cartas - Efeito Bandido!)
    {
        id: 'node_y',
        type: 'node_y',
        name: 'Conector Y (Bifurcação)',
        category: 'special',
        shape: 'T_JUNCTION',
        basePorts: TOPOLOGY_SHAPES.T_JUNCTION,
        r: 0,
        blocks: 0,
        title: 'Conector Y',
        badge: 'BIFURCAÇÃO T',
        badgeColor: '#d97706',
        desc: 'Bifurca o circuito em 2 novos ramos de 12V (Efeito Hidra do Bandido)!',
        count: 4
    },

    // 14. CRUZAMENTO EM CRUZ 4-VIAS (2 Cartas)
    {
        id: 'cross_4way',
        type: 'topology',
        name: 'Cruzamento 4 Vias',
        category: 'special',
        shape: 'CROSS_4WAY',
        basePorts: TOPOLOGY_SHAPES.CROSS_4WAY,
        r: 0,
        blocks: 0,
        title: 'Cruzamento 4-Vias',
        badge: 'CRUZAMENTO 4X',
        badgeColor: '#8b5cf6',
        desc: 'Permite conexões em todas as 4 direções cardeais.',
        count: 2
    }
];

// Gera o baralho completo embaralhado (69 cartas no monte de compras + 1 Gerador inicial na mesa)
function generateFullDeck() {
    const deck = [];
    let uid = 1;
    for (const cardDef of VOLTZ_CARDS_CATALOG) {
        if (cardDef.id === 'gen_12v') continue; // O Gerador já inicia na coordenada (0,0)
        for (let i = 0; i < cardDef.count; i++) {
            deck.push({
                ...cardDef,
                uid: `card_${cardDef.id}_${uid++}`,
                rotation: 0, // 0, 90, 180, 270
                currentPorts: getRotatedPorts(cardDef.basePorts, 0)
            });
        }
    }
    return deck;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TOPOLOGY_SHAPES, getRotatedPorts, VOLTZ_CARDS_CATALOG, generateFullDeck };
}
