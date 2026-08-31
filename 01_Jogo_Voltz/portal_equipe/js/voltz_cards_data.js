/**
 * PORTAL VOLTZ — Catálogo Canônico de Cartas & Setores (Padrão 70 Cartas)
 * Mapeamento fiel das grandezas elétricas e metrópole do VOLTZ
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
        title: 'Gerador Principal',
        badge: 'DC 12V',
        badgeColor: '#b45309',
        desc: 'Fonte principal de 12V com 4 saídas radiais (Norte, Leste, Sul, Oeste)',
        count: 1
    },

    // 2. RESISTORES 1Ω (9 Cartas) - 5x Retos + 4x Joelhos 90°
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
        desc: '+1 Bloco de Resistência na Linha (R = 1Ω)',
        count: 9
    },

    // 3. RESISTORES 2Ω (9 Cartas) - 5x Retos + 4x Joelhos 90°
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
        desc: '+2 Blocos de Resistência na Linha (R = 2Ω)',
        count: 9
    },

    // 4. RESISTORES 3Ω (7 Cartas) - 4x Retos + 3x Joelhos 90°
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
        desc: '+3 Blocos de Resistência na Linha (R = 3Ω)',
        count: 7
    },

    // 5. RESISTOR INDUSTRIAL 4Ω (5 Cartas) - 1x Reto + 4x Joelhos 90°
    {
        id: 'res_4ohm',
        type: 'resistor',
        name: 'Resistor de Potência 4Ω',
        category: 'r4',
        r: 4,
        blocks: 4,
        title: 'Resistor de Potência',
        badge: '4 Ω',
        badgeColor: '#78350f',
        desc: '+4 Blocos de Resistência (R = 4Ω) para proteção pesada',
        count: 5
    },

    // 6. LED PILOTO 3V (4 Cartas) - Vnom = 3V, R = 1Ω (Meta: 3Ω adicional)
    {
        id: 'load_led',
        type: 'equipment',
        name: 'LED Piloto 3V',
        category: 'load',
        vNom: 3,
        r: 1,
        blocks: 1,
        targetAddR: 3,
        sectorTarget: 'sector_residencial',
        title: 'LED Piloto',
        badge: '3V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Requer 3Ω adicionais no ramo: 12V · (1/4) = 3V',
        count: 4
    },

    // 7. SERVIDOR CENTRAL 4V (4 Cartas) - Vnom = 4V, R = 1Ω (Meta: 2Ω adicional)
    {
        id: 'load_servidor',
        type: 'equipment',
        name: 'Servidor Central 4V',
        category: 'load',
        vNom: 4,
        r: 1,
        blocks: 1,
        targetAddR: 2,
        sectorTarget: 'sector_dados',
        title: 'Servidor Central',
        badge: '4V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Requer 2Ω adicionais no ramo: 12V · (1/3) = 4V',
        count: 4
    },

    // 8. SIRENE DE ALARME 6V (3 Cartas) - Vnom = 6V, R = 1Ω (Meta: 1Ω adicional)
    {
        id: 'load_sirene',
        type: 'equipment',
        name: 'Sirene de Alarme 6V',
        category: 'load',
        vNom: 6,
        r: 1,
        blocks: 1,
        targetAddR: 1,
        sectorTarget: 'sector_residencial',
        title: 'Sirene de Alarme',
        badge: '6V // 1Ω',
        badgeColor: '#4338ca',
        desc: 'Requer 1Ω adicional no ramo: 12V · (1/2) = 6V',
        count: 3
    },

    // 9. BOMBA D\'ÁGUA 6V (4 Cartas) - Vnom = 6V, R = 2Ω (Meta: 2Ω adicional)
    {
        id: 'load_motor',
        type: 'equipment',
        name: 'Bomba Centrífuga 6V',
        category: 'load',
        vNom: 6,
        r: 2,
        blocks: 2,
        targetAddR: 2,
        sectorTarget: 'sector_agua',
        title: 'Bomba Centrífuga',
        badge: '6V // 2Ω',
        badgeColor: '#4338ca',
        desc: 'Requer 2Ω adicionais no ramo: 12V · (2/4) = 6V',
        count: 4
    },

    // 10. TOMÓGRAFO UTI 12V (3 Cartas) - Vnom = 12V, R = 4Ω (Meta: 0Ω adicional)
    {
        id: 'load_tomografo',
        type: 'equipment',
        name: 'Tomógrafo UTI 12V',
        category: 'load',
        vNom: 12,
        r: 4,
        blocks: 4,
        targetAddR: 0,
        sectorTarget: 'sector_hospital',
        title: 'Tomógrafo UTI',
        badge: '12V // 4Ω',
        badgeColor: '#4338ca',
        desc: 'Conexão direta em 12V sem resistores: 12V · (4/4) = 12V',
        count: 3
    },

    // 11. CABO TERRA GND 0V (6 Cartas) - Dead-End / Gatilho de Teste
    {
        id: 'gnd_cable',
        type: 'gnd',
        name: 'Cabo Terra (GND // 0V)',
        category: 'gnd',
        r: 0,
        blocks: 0,
        title: 'Cabo Terra',
        badge: 'GND // 0V',
        badgeColor: '#0f766e',
        desc: 'Fecha o potencial 0V (Dead-End) e dispara o teste de Kirchhoff imediato!',
        count: 6
    },

    // 12. FUSÍVEL DE PROTEÇÃO 1A (4 Cartas)
    {
        id: 'special_fuse',
        type: 'fuse',
        name: 'Fusível de Proteção 1A',
        category: 'special',
        r: 0,
        blocks: 0,
        title: 'Fusível 1A',
        badge: 'PROTEÇÃO',
        badgeColor: '#0369a1',
        desc: 'Sacrifica-se em caso de sobretensão, impedindo a queima do equipamento',
        count: 4
    },

    // 13. CONECTOR Y PARALELO (4 Cartas)
    {
        id: 'special_node_y',
        type: 'node_y',
        name: 'Nó Paralelo (Y)',
        category: 'special',
        r: 0,
        blocks: 0,
        title: 'Nó Paralelo (Y)',
        badge: 'BIFURCAÇÃO',
        badgeColor: '#d97706',
        desc: 'Bifurca o circuito em 2 sub-ramos independentes de 12V',
        count: 4
    },

    // 14. CHAVE SECCIONADORA ON/OFF (2 Cartas)
    {
        id: 'switch_toggle',
        type: 'switch',
        name: 'Chave Seccionadora',
        category: 'special',
        r: 0,
        blocks: 0,
        title: 'Chave Seccionadora',
        badge: 'MANOBRA',
        badgeColor: '#6366f1',
        desc: 'Permite isolar um ramo para troca de componentes sem risco de queima',
        count: 2
    },

    // 15. PONTE CRUZADA 3D (2 Cartas)
    {
        id: 'bridge_cross',
        type: 'topology',
        name: 'Ponte Cruzada 3D',
        category: 'special',
        r: 0,
        blocks: 0,
        title: 'Ponte Cruzada',
        badge: 'CRUZAMENTO',
        badgeColor: '#8b5cf6',
        desc: 'Permite cruzar dois ramos perpendiculares com isolamento elétrico total',
        count: 2
    },

    // 16. SURTO DE REDE 24V (3 Cartas)
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
        desc: 'Eleva a tensão temporariamente para 24V desafiando a proteção da malha',
        count: 3
    }
];

// 4 SETORES OFICIAIS DA METRÓPOLE
const VOLTZ_SECTORS = [
    {
        id: 'sector_hospital',
        name: 'Hospital Regional',
        icon: '🏥',
        requiredEquipment: 'load_tomografo',
        targetGoal: 'Tomógrafo UTI (12V)',
        color: '#dc2626',
        direction: 'north',
        vNom: 12,
        targetAddR: 0,
        status: 'blackout'
    },
    {
        id: 'sector_dados',
        name: 'Central de Dados',
        icon: '🖥️',
        requiredEquipment: 'load_servidor',
        targetGoal: 'Servidor Central (4V)',
        color: '#2563eb',
        direction: 'east',
        vNom: 4,
        targetAddR: 2,
        status: 'blackout'
    },
    {
        id: 'sector_agua',
        name: 'Tratamento de Água',
        icon: '💧',
        requiredEquipment: 'load_motor',
        targetGoal: 'Bomba Centrífuga (6V)',
        color: '#059669',
        direction: 'south',
        vNom: 6,
        targetAddR: 2,
        status: 'blackout'
    },
    {
        id: 'sector_residencial',
        name: 'Rede Residencial',
        icon: '💡',
        requiredEquipment: ['load_led', 'load_sirene'],
        targetGoal: 'LED Piloto (3V) ou Sirene (6V)',
        color: '#7c3aed',
        direction: 'west',
        vNom: 3,
        targetAddR: 3,
        altVNom: 6,
        altTargetAddR: 1,
        status: 'blackout'
    }
];

// GERA O BARALHO COMPLETO DE 70 CARTAS EXPANDIDAS COM IDs ÚNICOS
function generateFullDeck() {
    const deck = [];
    let uid = 1;
    for (const cardDef of VOLTZ_CARDS_CATALOG) {
        if (cardDef.id === 'gen_12v') continue; // O Gerador central já começa na mesa
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
