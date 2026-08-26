/**
 * VOLTZ: CIRCUIT BREAK — Catálogo Canônico das 54 Cartas
 * Especificação 100% idêntica ao Baralho Físico Oficial
 */

const VOLTZ_CARDS_CATALOG = [
    // 1. GERADOR CENTRAL (1 Carta) - Vin = 12V
    {
        id: 'gen_12v',
        type: 'generator',
        name: 'Gerador Central 12V',
        category: 'gen',
        voltageIn: 12,
        r: 0,
        blocks: 12,
        title: 'Gerador Central',
        badge: 'DC 12V',
        badgeColor: '#b45309',
        desc: 'Fonte principal de 12V com 4 saídas de corrente (Norte, Leste, Sul, Oeste)',
        count: 1
    },

    // 2. RESISTORES 1Ω (8 Cartas) - Verde Esmeralda
    {
        id: 'res_1ohm',
        type: 'resistor',
        name: 'Resistor Leve 1Ω',
        category: 'r1',
        r: 1,
        blocks: 1,
        title: 'Resistor Leve',
        badge: '1 Ω',
        badgeColor: '#059669',
        desc: '+1 Bloco de Resistência na Linha',
        count: 8
    },

    // 3. RESISTORES 2Ω (8 Cartas) - Azul Cobalto
    {
        id: 'res_2ohm',
        type: 'resistor',
        name: 'Resistor Médio 2Ω',
        category: 'r2',
        r: 2,
        blocks: 2,
        title: 'Resistor Médio',
        badge: '2 Ω',
        badgeColor: '#1d4ed8',
        desc: '+2 Blocos de Resistência na Linha',
        count: 8
    },

    // 4. RESISTORES 3Ω (6 Cartas) - Laranja Queimado
    {
        id: 'res_3ohm',
        type: 'resistor',
        name: 'Resistor Pesado 3Ω',
        category: 'r3',
        r: 3,
        blocks: 3,
        title: 'Resistor Pesado',
        badge: '3 Ω',
        badgeColor: '#c2410c',
        desc: '+3 Blocos de Resistência na Linha',
        count: 6
    },

    // 5. LED PILOTO 3V (3 Cartas) - Vnom = 3V, R = 1Ω (Meta: 4 blocos)
    {
        id: 'load_led',
        type: 'equipment',
        name: 'LED Piloto 3V',
        category: 'load',
        vNom: 3,
        r: 1,
        blocks: 1,
        targetBlocks: 4,
        sectorTarget: 'sector_residencial',
        title: 'LED Piloto',
        badge: '3V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Meta: 4 Blocos Totais no Ramo (12V / 4 = 3V)',
        count: 3
    },

    // 6. SERVIDOR CENTRAL 4V (3 Cartas) - Vnom = 4V, R = 1Ω (Meta: 3 blocos)
    {
        id: 'load_servidor',
        type: 'equipment',
        name: 'Servidor Central 4V',
        category: 'load',
        vNom: 4,
        r: 1,
        blocks: 1,
        targetBlocks: 3,
        sectorTarget: 'sector_dados',
        title: 'Servidor Central',
        badge: '4V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Meta: 3 Blocos Totais no Ramo (12V / 3 = 4V)',
        count: 3
    },

    // 7. SIRENE DE ALARME 6V (2 Cartas) - Vnom = 6V, R = 1Ω (Meta: 2 blocos)
    {
        id: 'load_sirene',
        type: 'equipment',
        name: 'Sirene de Alarme 6V',
        category: 'load',
        vNom: 6,
        r: 1,
        blocks: 1,
        targetBlocks: 2,
        sectorTarget: 'sector_residencial',
        title: 'Sirene de Alarme',
        badge: '6V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Meta: 2 Blocos Totais no Ramo (12V / 2 = 6V)',
        count: 2
    },

    // 8. MOTOR DE BOMBA 6V (3 Cartas) - Vnom = 6V, R = 2Ω (Meta: 4 blocos)
    {
        id: 'load_motor',
        type: 'equipment',
        name: 'Motor de Bomba 6V',
        category: 'load',
        vNom: 6,
        r: 2,
        blocks: 2,
        targetBlocks: 4,
        sectorTarget: 'sector_agua',
        title: 'Motor de Bomba',
        badge: '6V // 2Ω',
        badgeColor: '#4338ca',
        desc: 'Meta: 4 Blocos Totais no Ramo (12V · 2/4 = 6V)',
        count: 3
    },

    // 9. TOMÓGRAFO UTI 12V (2 Cartas) - Vnom = 12V, R = 4Ω (Meta: 4 blocos / direto)
    {
        id: 'load_tomografo',
        type: 'equipment',
        name: 'Tomógrafo UTI 12V',
        category: 'load',
        vNom: 12,
        r: 4,
        blocks: 4,
        targetBlocks: 4,
        sectorTarget: 'sector_hospital',
        title: 'Tomógrafo UTI',
        badge: '12V // 4Ω',
        badgeColor: '#4338ca',
        desc: 'Meta: 4 Blocos Totais (Liga direto em 12V sem resistores)',
        count: 2
    },

    // 10. CABO TERRA GND 0V (8 Cartas) - Gatilho de Teste
    {
        id: 'gnd_cable',
        type: 'gnd',
        name: 'Cabo Terra (GND)',
        category: 'gnd',
        r: 0,
        blocks: 0,
        title: 'Cabo Terra',
        badge: 'GND // 0V',
        badgeColor: '#0f766e',
        desc: 'Fecha o circuito no potencial 0V e dispara o Teste do Ramo imediatamente!',
        count: 8
    },

    // 11. FUSÍVEL DE PROTEÇÃO 1A (3 Cartas)
    {
        id: 'special_fuse',
        type: 'fuse',
        name: 'Fusível 1A',
        category: 'special',
        r: 0,
        blocks: 0,
        title: 'Fusível 1A',
        badge: 'PROTEÇÃO',
        badgeColor: '#0369a1',
        desc: 'Protege a carga queimando-se em caso de Sobretensão',
        count: 3
    },

    // 12. NÓ PARALELO EM Y (5 Cartas)
    {
        id: 'special_node_y',
        type: 'node_y',
        name: 'Nó Paralelo (Y)',
        category: 'special',
        r: 0,
        blocks: 0,
        title: 'Nó Paralelo (Y)',
        badge: 'BIFURCAÇÃO',
        badgeColor: '#0369a1',
        desc: 'Bifurca o circuito em 2 sub-ramos independentes de 12V',
        count: 5
    },

    // 13. SURTO DE REDE 24V (2 Cartas - Evento Opcional / Desafio)
    {
        id: 'event_surge',
        type: 'event',
        name: 'Surto de Rede 24V',
        category: 'danger',
        r: 0,
        blocks: 0,
        title: 'Surto 24V',
        badge: 'ALERTA',
        badgeColor: '#b91c1c',
        desc: 'Aumenta temporariamente a voltagem para 24V',
        count: 2
    }
];

// SETORES DA CIDADE (4 SETORES CANÔNICOS)
const VOLTZ_SECTORS = [
    {
        id: 'sector_hospital',
        name: 'Hospital Regional',
        icon: '🏥',
        requiredEquipment: 'load_tomografo',
        targetGoal: 'Tomógrafo UTI (12V)',
        color: '#dc2626',
        cardCountTarget: 4,
        direction: 'north',
        status: 'blackout' // 'blackout' | 'energized'
    },
    {
        id: 'sector_dados',
        name: 'Central de Dados',
        icon: '🖥️',
        requiredEquipment: 'load_servidor',
        targetGoal: 'Servidor Central (4V)',
        color: '#2563eb',
        cardCountTarget: 3,
        direction: 'east',
        status: 'blackout'
    },
    {
        id: 'sector_agua',
        name: 'Tratamento de Água',
        icon: '⚙️',
        requiredEquipment: 'load_motor',
        targetGoal: 'Motor de Bomba (6V)',
        color: '#059669',
        cardCountTarget: 4,
        direction: 'south',
        status: 'blackout'
    },
    {
        id: 'sector_residencial',
        name: 'Rede Residencial',
        icon: '💡',
        requiredEquipment: ['load_led', 'load_sirene'],
        targetGoal: 'LED Piloto (3V) ou Sirene (6V)',
        color: '#7c3aed',
        cardCountTarget: 4,
        direction: 'west',
        status: 'blackout'
    }
];

// GERA O BARALHO COMPLETO DE 54 CARTAS EXPANDIDAS COM IDs ÚNICOS
function generateFullDeck() {
    const deck = [];
    let uid = 1;
    for (const cardDef of VOLTZ_CARDS_CATALOG) {
        if (cardDef.id === 'gen_12v') continue; // O Gerador já inicia no centro da mesa
        for (let i = 0; i < cardDef.count; i++) {
            deck.push({
                ...cardDef,
                uid: `card_${cardDef.id}_${uid++}`
            });
        }
    }
    return deck;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VOLTZ_CARDS_CATALOG, VOLTZ_SECTORS, generateFullDeck };
}
