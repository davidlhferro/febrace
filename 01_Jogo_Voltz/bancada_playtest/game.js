/**
 * BANCADA DE TESTE RÁPIDO VOLTZ — Motor Principal & IA de Teste
 * Arquitetura Unslop: Regras Canônicas de Bandido, Física de Circuitos (Lei de Ohm e Divisores),
 * One-Shot Penalties (Zero bug de perda infinita de vidas), Bot Autônomo com Simulação Heurística e Suporte P2P.
 */

// -------------------------------------------------------------
// 1. TOPOLOGIAS E CATÁLOGO DE CARTAS
// -------------------------------------------------------------
const TOPOLOGY_SHAPES = {
    STRAIGHT: { top: false, right: true, bottom: false, left: true },
    CORNER_90: { top: false, right: false, bottom: true, left: true },
    T_JUNCTION: { top: false, right: true, bottom: true, left: true },
    CROSS_4WAY: { top: true, right: true, bottom: true, left: true },
    DEAD_END: { top: false, right: false, bottom: false, left: true },
    GENERATOR: { top: true, right: true, bottom: true, left: true }
};

function getRotatedPorts(basePorts, rotation = 0) {
    const rot = (rotation % 360 + 360) % 360;
    if (rot === 0) return { top: !!basePorts.top, right: !!basePorts.right, bottom: !!basePorts.bottom, left: !!basePorts.left };
    if (rot === 90) return { top: !!basePorts.left, right: !!basePorts.top, bottom: !!basePorts.right, left: !!basePorts.bottom };
    if (rot === 180) return { top: !!basePorts.bottom, right: !!basePorts.left, bottom: !!basePorts.top, left: !!basePorts.right };
    if (rot === 270) return { top: !!basePorts.right, right: !!basePorts.bottom, bottom: !!basePorts.left, left: !!basePorts.top };
    return { ...basePorts };
}

const CARDS_CATALOG = [
    // Gerador Central 12V (1 carta inicial na mesa)
    { id: 'gen_12v', type: 'generator', name: 'Gerador 12V', shape: 'GENERATOR', basePorts: TOPOLOGY_SHAPES.GENERATOR, voltageIn: 12, r: 0, count: 1 },
    
    // Resistores 1Ω (10 cartas)
    { id: 'res_1ohm_straight', type: 'resistor', name: 'Resistor 1Ω (Reta)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 1, count: 6 },
    { id: 'res_1ohm_corner', type: 'resistor', name: 'Resistor 1Ω (Curva)', shape: 'CORNER_90', basePorts: TOPOLOGY_SHAPES.CORNER_90, r: 1, count: 4 },

    // Resistores 2Ω (10 cartas)
    { id: 'res_2ohm_straight', type: 'resistor', name: 'Resistor 2Ω (Reta)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 2, count: 6 },
    { id: 'res_2ohm_corner', type: 'resistor', name: 'Resistor 2Ω (Curva)', shape: 'CORNER_90', basePorts: TOPOLOGY_SHAPES.CORNER_90, r: 2, count: 4 },

    // Resistores 3Ω (8 cartas)
    { id: 'res_3ohm_straight', type: 'resistor', name: 'Resistor 3Ω (Reta)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 3, count: 5 },
    { id: 'res_3ohm_corner', type: 'resistor', name: 'Resistor 3Ω (Curva)', shape: 'CORNER_90', basePorts: TOPOLOGY_SHAPES.CORNER_90, r: 3, count: 3 },

    // Condutores / Ramificações (14 cartas)
    { id: 'wire_straight', type: 'wire', name: 'Trilha Condutora (Reta)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 0, count: 4 },
    { id: 'wire_corner', type: 'wire', name: 'Curva 90°', shape: 'CORNER_90', basePorts: TOPOLOGY_SHAPES.CORNER_90, r: 0, count: 4 },
    { id: 'wire_t', type: 'wire', name: 'Conector T (3 Saídas)', shape: 'T_JUNCTION', basePorts: TOPOLOGY_SHAPES.T_JUNCTION, r: 0, count: 4 },
    { id: 'wire_cross', type: 'wire', name: 'Cruzamento (4 Saídas)', shape: 'CROSS_4WAY', basePorts: TOPOLOGY_SHAPES.CROSS_4WAY, r: 0, count: 2 },

    // Aparelhos / Cargas (12 cartas)
    { id: 'load_led_3v', type: 'equipment', name: 'LED Piloto (3V // 1Ω)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, vNom: 3, r: 1, count: 3 },
    { id: 'load_servidor_4v', type: 'equipment', name: 'Servidor Central (4V // 1Ω)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, vNom: 4, r: 1, count: 3 },
    { id: 'load_sirene_6v', type: 'equipment', name: 'Sirene de Alarme (6V // 1Ω)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, vNom: 6, r: 1, count: 2 },
    { id: 'load_bomba_6v', type: 'equipment', name: 'Bomba Centrífuga (6V // 2Ω)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, vNom: 6, r: 2, count: 2 },
    { id: 'load_tomografo_12v', type: 'equipment', name: 'Tomógrafo UTI (12V // 4Ω)', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, vNom: 12, r: 4, count: 2 },

    // Fechamento Nodal / Cabo Terra (14 cartas)
    { id: 'gnd_cable', type: 'gnd', name: 'Cabo Terra (GND 0V)', shape: 'DEAD_END', basePorts: TOPOLOGY_SHAPES.DEAD_END, r: 0, count: 14 },

    // Fusíveis de Proteção (3 cartas)
    { id: 'fuse_1a', type: 'fuse', name: 'Fusível 1A', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, iMax: 1.0, r: 0, count: 3 }
];

function generateFullDeck() {
    const deck = [];
    let counter = 1;
    CARDS_CATALOG.forEach(def => {
        if (def.id === 'gen_12v') return; // O gerador vai direto para (0,0)
        for (let i = 0; i < def.count; i++) {
            deck.push({
                ...def,
                uid: `card_${def.id}_${counter++}`,
                rotation: 0
            });
        }
    });

    // Embaralhamento Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// -------------------------------------------------------------
// 2. RENDERIZADOR VETORIAL SVG DAS CARTAS
// -------------------------------------------------------------
function renderCardSVG(card, rotation = 0, options = {}) {
    const w = options.width || 140;
    const h = options.height || 98;
    const rot = (rotation % 360 + 360) % 360;

    let bodyVisual = '';
    const pipeColor = '#d97706';
    const pipeStroke = '#04070e';
    const pipeWidth = 28;

    if (card.id === 'gen_12v') {
        bodyVisual = `
            <!-- 4 Barramentos Principais -->
            <rect x="56" y="0" width="28" height="98" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
            <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
            <!-- Núcleo do Gerador -->
            <circle cx="70" cy="49" r="26" fill="#04070e" stroke="${pipeColor}" stroke-width="3"/>
            <circle cx="70" cy="49" r="16" fill="#78350f"/>
            <polygon points="70,36 61,50 68,50 65,62 79,46 72,46" fill="#fbbf24"/>
            <text x="70" y="88" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#fbbf24" text-anchor="middle">GERADOR 12V</text>
        `;
    } else if (card.type === 'resistor') {
        const rColor = card.r === 1 ? '#059669' : (card.r === 2 ? '#2563eb' : '#d97706');
        if (card.shape === 'CORNER_90') {
            bodyVisual = `
                <path d="M 0 49 Q 70 49 70 98" fill="none" stroke="${pipeColor}" stroke-width="${pipeWidth}"/>
                <path d="M 0 49 Q 70 49 70 98" fill="none" stroke="${pipeStroke}" stroke-width="32" stroke-linecap="square"/>
                <path d="M 0 49 Q 70 49 70 98" fill="none" stroke="${pipeColor}" stroke-width="${pipeWidth}"/>
                <!-- Anel Cerâmico -->
                <circle cx="56" cy="56" r="18" fill="#f8fafc" stroke="${pipeStroke}" stroke-width="3"/>
                <circle cx="56" cy="56" r="12" fill="${rColor}"/>
                <text x="56" y="60" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">${card.r}Ω</text>
            `;
        } else {
            bodyVisual = `
                <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
                <!-- Corpo Resistor Cerâmico -->
                <rect x="42" y="27" width="56" height="44" rx="6" fill="#f8fafc" stroke="${pipeStroke}" stroke-width="3"/>
                <rect x="52" y="27" width="8" height="44" fill="${rColor}"/>
                <rect x="66" y="27" width="8" height="44" fill="#0f172a"/>
                <rect x="80" y="27" width="8" height="44" fill="${pipeColor}"/>
                <text x="70" y="20" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">${card.r}Ω</text>
            `;
        }
    } else if (card.type === 'equipment') {
        const vNom = card.vNom || 4;
        bodyVisual = `
            <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
            <!-- Chassi do Aparelho -->
            <rect x="30" y="20" width="80" height="58" rx="4" fill="#0f172a" stroke="${pipeStroke}" stroke-width="3"/>
            <rect x="36" y="26" width="68" height="34" rx="2" fill="#020617" stroke="#334155" stroke-width="1.5"/>
            <text x="70" y="47" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">${vNom}V</text>
            <text x="70" y="72" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="middle">${card.name.split(' ')[0]}</text>
        `;
    } else if (card.type === 'gnd') {
        bodyVisual = `
            <!-- Trilha entrando pela esquerda e aterrando -->
            <rect x="0" y="35" width="70" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
            <circle cx="70" cy="49" r="22" fill="#0f172a" stroke="${pipeStroke}" stroke-width="3"/>
            <!-- Símbolo de GND -->
            <line x1="70" y1="36" x2="70" y2="48" stroke="#22c55e" stroke-width="3"/>
            <line x1="58" y1="48" x2="82" y2="48" stroke="#22c55e" stroke-width="3.5"/>
            <line x1="62" y1="54" x2="78" y2="54" stroke="#22c55e" stroke-width="3"/>
            <line x1="66" y1="60" x2="74" y2="60" stroke="#22c55e" stroke-width="2.5"/>
            <text x="70" y="85" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#22c55e" text-anchor="middle">GND 0V</text>
        `;
    } else if (card.type === 'wire') {
        if (card.shape === 'CORNER_90') {
            bodyVisual = `
                <path d="M 0 49 Q 70 49 70 98" fill="none" stroke="${pipeColor}" stroke-width="${pipeWidth}"/>
                <path d="M 0 49 Q 70 49 70 98" fill="none" stroke="${pipeStroke}" stroke-width="32" stroke-linecap="square"/>
                <path d="M 0 49 Q 70 49 70 98" fill="none" stroke="${pipeColor}" stroke-width="${pipeWidth}"/>
            `;
        } else if (card.shape === 'T_JUNCTION') {
            bodyVisual = `
                <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
                <rect x="56" y="49" width="28" height="49" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
                <circle cx="70" cy="49" r="10" fill="#04070e"/>
            `;
        } else if (card.shape === 'CROSS_4WAY') {
            bodyVisual = `
                <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
                <rect x="56" y="0" width="28" height="98" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
                <circle cx="70" cy="49" r="10" fill="#04070e"/>
            `;
        } else {
            bodyVisual = `
                <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
            `;
        }
    } else if (card.type === 'fuse') {
        bodyVisual = `
            <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
            <rect x="42" y="31" width="56" height="36" rx="4" fill="#1e293b" stroke="${pipeStroke}" stroke-width="3"/>
            <rect x="48" y="35" width="44" height="28" fill="#020617"/>
            <line x1="48" y1="49" x2="92" y2="49" stroke="#fbbf24" stroke-width="2"/>
            <text x="70" y="24" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#fbbf24" text-anchor="middle">FUSÍVEL 1A</text>
        `;
    }

    return `
    <svg width="${w}" height="${h}" viewBox="0 0 140 98" style="display:block; border-radius:4px; overflow:hidden; background:#08101e; border:1px solid #1e293b;">
        <g transform="rotate(${rot} 70 49)">
            <!-- Fundo da Placa -->
            <rect width="140" height="98" fill="#08101e"/>
            <!-- Malha milimétrica interna -->
            <line x1="0" y1="49" x2="140" y2="49" stroke="#0f1c33" stroke-width="0.5"/>
            <line x1="70" y1="0" x2="70" y2="98" stroke="#0f1c33" stroke-width="0.5"/>
            ${bodyVisual}
        </g>
    </svg>
    `;
}

// -------------------------------------------------------------
// 3. MOTOR DA GRADE 2D & FÍSICA DOS CIRCUITOS
// -------------------------------------------------------------
class VoltzPlaytestEngine {
    constructor() {
        this.reset();
    }

    reset() {
        const genPorts = { top: true, right: true, bottom: true, left: true };
        this.deck = generateFullDeck();
        this.networkLives = 3;
        this.savedEquipments = 0;
        this.gameOver = false;
        this.victory = false;
        this.turnIndex = 0; // 0 = Player, 1 = Bot/Partner
        this.processedClosedBranches = new Set(); // Controle de penalidades e sucessos já processados (One-Shot)
        this.players = [
            { id: 'p1', name: 'Operador', hand: [] },
            { id: 'p2', name: 'Bot de Teste', hand: [] }
        ];

        // Grade 2D iniciando rigorosamente no (0,0) com o Gerador 12V
        this.grid = {
            '0,0': {
                x: 0, y: 0,
                card: {
                    id: 'gen_12v',
                    type: 'generator',
                    name: 'Gerador Central 12V',
                    shape: 'GENERATOR',
                    basePorts: genPorts,
                    currentPorts: genPorts,
                    rotation: 0,
                    voltageIn: 12,
                    r: 0
                }
            }
        };

        this.dealInitialHands();
        this.lastCircuitAnalysis = this.analyzeCircuits(false);
    }

    dealInitialHands() {
        this.players.forEach(p => {
            p.hand = [];
            for (let i = 0; i < 3; i++) {
                if (this.deck.length > 0) {
                    p.hand.push(this.deck.pop());
                }
            }
        });
    }

    getCardAt(x, y) {
        return this.grid[`${x},${y}`] || null;
    }

    // Validação estrita das regras de conexão de Bandido
    isValidPlacement(card, x, y, rotation = 0) {
        // 1. Posição já ocupada
        if (this.grid[`${x},${y}`]) {
            return { valid: false, reason: 'Coordenada já ocupada.' };
        }

        const myPorts = getRotatedPorts(card.basePorts, rotation);
        const neighbors = [
            { dir: 'top', opp: 'bottom', nx: x, ny: y - 1 },
            { dir: 'right', opp: 'left', nx: x + 1, ny: y },
            { dir: 'bottom', opp: 'top', nx: x, ny: y + 1 },
            { dir: 'left', opp: 'right', nx: x - 1, ny: y }
        ];

        let hasNeighbor = false;
        let connectedToCopper = false;

        for (const nb of neighbors) {
            const neighborNode = this.getCardAt(nb.nx, nb.ny);
            if (neighborNode) {
                hasNeighbor = true;
                const neighborPorts = neighborNode.card.currentPorts || getRotatedPorts(neighborNode.card.basePorts, neighborNode.card.rotation || 0);

                const myPortActive = !!myPorts[nb.dir];
                const neighborPortActive = !!neighborPorts[nb.opp];

                // REGRA DE OURO DO BANDIDO:
                // Se minha porta é cobre, a do vizinho DEVE ser cobre.
                // Se minha porta é parede (fechada), a do vizinho DEVE ser parede (fechada).
                if (myPortActive !== neighborPortActive) {
                    return {
                        valid: false,
                        reason: `Conexão incompatível na direção ${nb.dir}: ${myPortActive ? 'Trilha' : 'Parede'} contra ${neighborPortActive ? 'Trilha' : 'Parede'}.`
                    };
                }

                if (myPortActive && neighborPortActive) {
                    connectedToCopper = true;
                }
            }
        }

        if (!hasNeighbor) {
            return { valid: false, reason: 'A carta não pode ficar isolada no espaço.' };
        }

        if (!connectedToCopper) {
            return { valid: false, reason: 'Deve conectar em pelo menos 1 trilha ativa de cobre existente.' };
        }

        return { valid: true };
    }

    // Busca todos os slots válidos na mesa para uma carta com determinada rotação
    getValidSlotsForCard(card, rotation = 0) {
        const potentialCoords = new Set();

        // Pega todos os vizinhos vazios das cartas atuais da mesa
        Object.keys(this.grid).forEach(key => {
            const [gx, gy] = key.split(',').map(Number);
            const candidates = [
                { x: gx, y: gy - 1 },
                { x: gx + 1, y: gy },
                { x: gx, y: gy + 1 },
                { x: gx - 1, y: gy }
            ];
            candidates.forEach(c => {
                if (!this.grid[`${c.x},${c.y}`]) {
                    potentialCoords.add(`${c.x},${c.y}`);
                }
            });
        });

        const validSlots = [];
        potentialCoords.forEach(coordKey => {
            const [cx, cy] = coordKey.split(',').map(Number);
            const check = this.isValidPlacement(card, cx, cy, rotation);
            if (check.valid) {
                validSlots.push({ x: cx, y: cy });
            }
        });

        return validSlots;
    }

    // Executa a jogada de uma carta
    playCard(playerId, x, y, cardUid, rotation = 0) {
        if (this.gameOver) return { success: false, reason: 'Jogo encerrado.' };

        const player = this.players.find(p => p.id === playerId);
        if (!player) return { success: false, reason: 'Jogador não encontrado.' };

        const cardIndex = player.hand.findIndex(c => c.uid === cardUid);
        if (cardIndex === -1) return { success: false, reason: 'Carta não está na mão do jogador.' };

        const card = player.hand[cardIndex];
        const validation = this.isValidPlacement(card, x, y, rotation);
        if (!validation.valid) {
            return { success: false, reason: validation.reason };
        }

        // Posiciona na grade
        const currentPorts = getRotatedPorts(card.basePorts, rotation);
        this.grid[`${x},${y}`] = {
            x, y,
            card: {
                ...card,
                rotation,
                currentPorts
            }
        };

        // Remove da mão e compra 1 nova do baralho
        player.hand.splice(cardIndex, 1);
        if (this.deck.length > 0) {
            player.hand.push(this.deck.pop());
        }

        // Análise de circuito em tempo real aplicando penalidade apenas no fechamento (One-Shot Penalty)
        this.lastCircuitAnalysis = this.analyzeCircuits(true);

        if (this.networkLives <= 0) {
            this.gameOver = true;
        }

        // Passa o turno
        this.turnIndex = (this.turnIndex + 1) % this.players.length;

        return {
            success: true,
            analysis: this.lastCircuitAnalysis,
            gameOver: this.gameOver,
            networkLives: this.networkLives,
            savedEquipments: this.savedEquipments
        };
    }

    // Descarte de 3 cartas quando o jogador não tem movimentos legais
    discardAndPass(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return false;

        // Devolve as cartas para o fundo do monte
        while (player.hand.length > 0) {
            this.deck.unshift(player.hand.pop());
        }

        // Compra 3 novas
        for (let i = 0; i < 3; i++) {
            if (this.deck.length > 0) {
                player.hand.push(this.deck.pop());
            }
        }

        this.turnIndex = (this.turnIndex + 1) % this.players.length;
        return true;
    }

    // Análise de Física do Circuito (Traçado BFS a partir do Gerador 0,0)
    analyzeCircuits(applyPenalties = false) {
        const genNode = this.grid['0,0'];
        if (!genNode) {
            return {
                branches: [],
                primaryBranch: { rTotal: 0, iTheoretical: '0.00', isClosed: false, verdict: 'ABERTO', explanation: 'Gerador ausente.' },
                newOvervoltagesCount: 0,
                newSuccessCount: 0,
                deckCount: this.deck.length,
                networkLives: this.networkLives,
                savedEquipments: this.savedEquipments
            };
        }

        // Rastreamento das 4 saídas ortogonais do gerador
        const branches = [];
        let newOvervoltagesCount = 0;
        let newSuccessCount = 0;

        const genOutputs = [
            { dir: 'top', startX: 0, startY: -1, enterFrom: 'bottom' },
            { dir: 'right', startX: 1, startY: 0, enterFrom: 'left' },
            { dir: 'bottom', startX: 0, startY: 1, enterFrom: 'top' },
            { dir: 'left', startX: -1, startY: 0, enterFrom: 'right' }
        ];

        genOutputs.forEach((out, branchIndex) => {
            const branch = this.traceBranch(out.startX, out.startY, out.enterFrom);
            if (branch.cards.length > 0) {
                const branchObj = {
                    branchId: branchIndex + 1,
                    direction: out.dir,
                    ...branch
                };
                branches.push(branchObj);

                // CONTROLE DE PUNIÇÃO ÚNICA (ONE-SHOT PENALTY):
                // Só processa penalidade ou sucesso quando o ramo é FECHADO por GND ou Loop!
                if (branch.isClosed) {
                    const lastCard = branch.cards[branch.cards.length - 1];
                    const branchSig = `${out.dir}@${lastCard.x},${lastCard.y}@${branch.isClosedGnd ? 'GND' : 'LOOP'}`;
                    branchObj.signature = branchSig;

                    if (!this.processedClosedBranches.has(branchSig)) {
                        branchObj.isNewlyClosed = true;

                        if (branch.verdict === 'SOBRETENSAO') {
                            newOvervoltagesCount += 1;
                            if (applyPenalties) {
                                this.processedClosedBranches.add(branchSig);
                                this.networkLives = Math.max(0, this.networkLives - 1);
                            }
                        } else if (branch.verdict === 'NOMINAL') {
                            newSuccessCount += 1;
                            if (applyPenalties) {
                                this.processedClosedBranches.add(branchSig);
                                if (branch.equipments.length > 0) {
                                    this.savedEquipments += branch.equipments.length;
                                }
                            }
                        } else if (branch.verdict === 'SUBTENSAO') {
                            if (applyPenalties) {
                                this.processedClosedBranches.add(branchSig);
                            }
                        }
                    } else {
                        branchObj.isAlreadyProcessed = true;
                    }
                }
            }
        });

        // Resistência equivalente da malha mais ativa
        const primaryBranch = branches[0] || { rTotal: 0, iTheoretical: '0.00', isClosed: false, verdict: 'ABERTO', explanation: 'Nenhuma trilha conectada ao gerador.' };

        return {
            branches,
            primaryBranch,
            newOvervoltagesCount,
            newSuccessCount,
            deckCount: this.deck.length,
            networkLives: this.networkLives,
            savedEquipments: this.savedEquipments
        };
    }

    traceBranch(startX, startY, enterFrom) {
        const visited = new Set();
        const branchCards = [];
        let currX = startX;
        let currY = startY;
        let incomingSide = enterFrom;

        let rTotal = 0;
        let equipments = [];
        let isClosedGnd = false;
        let isClosedLoop = false;

        while (true) {
            const key = `${currX},${currY}`;
            if (visited.has(key)) break;
            const node = this.grid[key];
            if (!node) break;

            const ports = node.card.currentPorts || getRotatedPorts(node.card.basePorts, node.card.rotation || 0);
            if (!ports[incomingSide]) {
                // Não há conexão de entrada compatível
                break;
            }

            visited.add(key);
            branchCards.push(node);

            const card = node.card;
            rTotal += (card.r || 0);

            if (card.type === 'equipment') {
                equipments.push(card);
            }

            if (card.type === 'gnd') {
                isClosedGnd = true;
                break;
            }

            if (currX === 0 && currY === 0) {
                isClosedLoop = true;
                break;
            }

            // Descobre a próxima saída condutora
            const otherSides = Object.keys(ports).filter(s => s !== incomingSide && ports[s]);

            if (otherSides.length === 0) {
                // Trilha aberta sem continuação
                break;
            }

            // Segue a saída condutora
            const nextSide = otherSides[0];
            if (nextSide === 'top') { currY -= 1; incomingSide = 'bottom'; }
            else if (nextSide === 'bottom') { currY += 1; incomingSide = 'top'; }
            else if (nextSide === 'left') { currX -= 1; incomingSide = 'right'; }
            else if (nextSide === 'right') { currX += 1; incomingSide = 'left'; }
        }

        const isClosed = isClosedGnd || isClosedLoop;
        const iTheoretical = rTotal > 0 ? (12 / rTotal).toFixed(2) : (isClosed ? '∞ (Curto)' : '0.00');

        let verdict = 'ABERTO';
        let explanation = 'Malha aberta. Continue expandindo com resistores ou finalize com Cabo Terra (GND).';

        if (isClosed) {
            if (rTotal === 0) {
                verdict = 'SOBRETENSAO';
                explanation = 'Curto-circuito de 0Ω fechado direto no gerador! Perde 1 vida.';
            } else if (equipments.length > 0) {
                let hasOvervoltage = false;
                let hasExactNominal = true;
                const details = [];

                equipments.forEach(eq => {
                    const req = eq.r || 1;
                    const vEq = (12 * req) / rTotal;
                    const vFormatted = vEq.toFixed(1);
                    details.push(`${eq.name}: ${vFormatted}V (nom: ${eq.vNom}V)`);

                    if (vEq > eq.vNom + 0.25) {
                        hasOvervoltage = true;
                    }
                    if (Math.abs(vEq - eq.vNom) > 0.25) {
                        hasExactNominal = false;
                    }
                });

                if (hasOvervoltage) {
                    verdict = 'SOBRETENSAO';
                    explanation = `Sobretensão! ${details.join(' | ')}. Queimou fusível da rede.`;
                } else if (hasExactNominal) {
                    verdict = 'NOMINAL';
                    explanation = `Sucesso! Tensão exata operando aparelhos: ${details.join(' | ')}.`;
                } else {
                    verdict = 'SUBTENSAO';
                    explanation = `Subtensão segura: ${details.join(' | ')}. Circuito inativo.`;
                }
            } else {
                verdict = 'NOMINAL';
                explanation = `Malha fechada com resistência total de ${rTotal}Ω. Corrente de ${iTheoretical}A.`;
            }
        }

        return {
            cards: branchCards,
            rTotal,
            iTheoretical,
            equipments,
            isClosed,
            isClosedGnd,
            isClosedLoop,
            verdict,
            explanation
        };
    }

    // -------------------------------------------------------------
    // 4. IA DE TESTE AVANÇADA (SIMULAÇÃO HEURÍSTICA ANTES DE JOGAR)
    // -------------------------------------------------------------
    getBestBotMove() {
        const bot = this.players.find(p => p.id === 'p2') || this.players[1];
        if (!bot || !bot.hand || bot.hand.length === 0) return null;

        const evaluatedMoves = [];

        // Para cada carta na mão do Bot
        bot.hand.forEach(card => {
            // Testa todas as 4 rotações (0°, 90°, 180°, 270°)
            [0, 90, 180, 270].forEach(rot => {
                const validSlots = this.getValidSlotsForCard(card, rot);
                validSlots.forEach(slot => {
                    // Simulação temporária na grade
                    const currentPorts = getRotatedPorts(card.basePorts, rot);
                    this.grid[`${slot.x},${slot.y}`] = {
                        x: slot.x,
                        y: slot.y,
                        card: {
                            ...card,
                            rotation: rot,
                            currentPorts
                        }
                    };

                    // Análise de circuito na simulação (sem aplicar penalidades na vida real)
                    const simAnalysis = this.analyzeCircuits(false);

                    // Reverte imediatamente a simulação
                    delete this.grid[`${slot.x},${slot.y}`];

                    // Avaliação Heurística de Score
                    let score = 0;
                    let causedNewOvervoltage = false;
                    let causedNewNominalSuccess = false;
                    let causedNewSubvoltage = false;
                    let closedEmptyBranch = false;

                    simAnalysis.branches.forEach(b => {
                        if (b.isClosed) {
                            const lastCard = b.cards[b.cards.length - 1];
                            const sig = `${b.direction}@${lastCard.x},${lastCard.y}@${b.isClosedGnd ? 'GND' : 'LOOP'}`;
                            if (!this.processedClosedBranches.has(sig)) {
                                if (b.verdict === 'SOBRETENSAO') {
                                    causedNewOvervoltage = true;
                                } else if (b.verdict === 'NOMINAL') {
                                    if (b.equipments.length > 0) {
                                        causedNewNominalSuccess = true;
                                    } else {
                                        closedEmptyBranch = true;
                                    }
                                } else if (b.verdict === 'SUBTENSAO') {
                                    causedNewSubvoltage = true;
                                }
                            }
                        }
                    });

                    // REGRAS ESTRATÉGICAS DE PONTUAÇÃO DO BOT:
                    if (causedNewOvervoltage) {
                        // 🚫 PENALIDADE MÁXIMA: NUNCA fechar em curto de 0Ω ou queimar aparelho
                        score = -1000;
                    } else if (causedNewNominalSuccess) {
                        // ⭐ RECOMPENSA MÁXIMA: Salva o aparelho com tensão nominal perfeita
                        score = +250;
                    } else if (card.type === 'gnd') {
                        // Se for Cabo Terra (GND), só joga se fechar com sucesso
                        if (closedEmptyBranch) {
                            score = -50; // GND em ramo vazio desperdiça carta
                        } else if (causedNewSubvoltage) {
                            score = +10; // Subtensão é segura mas não ideal
                        } else {
                            score = -100; // GND colocado aleatoriamente sem fechar circuito
                        }
                    } else {
                        // Construção e expansão segura em ramos abertos:
                        if (card.type === 'resistor') {
                            score = +60 + ((card.r || 1) * 10); // Prioriza construir resistência
                        } else if (card.type === 'equipment') {
                            score = +50; // Conecta aparelhos na bancada
                        } else if (card.type === 'wire') {
                            score = +35; // Expande trilha
                        } else if (card.type === 'fuse') {
                            score = +40; // Proteção da rede
                        } else {
                            score = +20;
                        }
                    }

                    evaluatedMoves.push({
                        cardUid: card.uid,
                        cardName: card.name,
                        cardType: card.type,
                        x: slot.x,
                        y: slot.y,
                        rotation: rot,
                        score
                    });
                });
            });
        });

        // Filtra apenas movimentos positivos e seguros (score > 0)
        const safeMoves = evaluatedMoves.filter(m => m.score > 0);

        if (safeMoves.length === 0) {
            // Se todas as opções possíveis levariam a curto/sobretensão, ou se não há jogadas legais: descarta!
            return null;
        }

        // Ordena pelo maior score e escolhe a melhor jogada
        safeMoves.sort((a, b) => b.score - a.score);
        return safeMoves[0];
    }
}

// -------------------------------------------------------------
// 5. EXPORTAÇÃO PARA NAVEGADOR E NODE.JS
// -------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TOPOLOGY_SHAPES,
        getRotatedPorts,
        CARDS_CATALOG,
        generateFullDeck,
        VoltzPlaytestEngine,
        renderCardSVG
    };
}
