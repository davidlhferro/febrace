/**
 * BANCADA DE TESTE RÁPIDO VOLTZ — Motor Principal & IA de Teste
 * Arquitetura Unslop: Regras Canônicas de Bandido, Análise Nodal Modificada (MNA / Kirchhoff em Grafos),
 * Solucionador Linear Gaussiano de Alta Precisão, Telemetria Física Nodal (V, I, P) e IA Preditiva.
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
    const pipeColor = card.isBurned ? '#475569' : '#d97706';
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
        const screenColor = card.isBurned ? '#7f1d1d' : '#020617';
        const txtColor = card.isBurned ? '#ef4444' : '#38bdf8';
        bodyVisual = `
            <rect x="0" y="35" width="140" height="28" fill="${pipeColor}" stroke="${pipeStroke}" stroke-width="3"/>
            <!-- Chassi do Aparelho -->
            <rect x="30" y="20" width="80" height="58" rx="4" fill="#0f172a" stroke="${pipeStroke}" stroke-width="3"/>
            <rect x="36" y="26" width="68" height="34" rx="2" fill="${screenColor}" stroke="${card.isBurned ? '#ef4444' : '#334155'}" stroke-width="1.5"/>
            <text x="70" y="47" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="800" fill="${txtColor}" text-anchor="middle">${card.isBurned ? 'FALHA' : vNom + 'V'}</text>
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
    <svg width="${w}" height="${h}" viewBox="0 0 140 98" style="display:block; border-radius:4px; overflow:hidden; background:#08101e; border:1px solid ${card.isBurned ? '#ef4444' : '#1e293b'};">
        <g transform="rotate(${rot} 70 49)">
            <!-- Fundo da Placa -->
            <rect width="140" height="98" fill="${card.isBurned ? '#1c1012' : '#08101e'}"/>
            <!-- Malha milimétrica interna -->
            <line x1="0" y1="49" x2="140" y2="49" stroke="${card.isBurned ? '#450a0a' : '#0f1c33'}" stroke-width="0.5"/>
            <line x1="70" y1="0" x2="70" y2="98" stroke="${card.isBurned ? '#450a0a' : '#0f1c33'}" stroke-width="0.5"/>
            ${bodyVisual}
        </g>
    </svg>
    `;
}

// -------------------------------------------------------------
// 3. SOLUCIONADOR ELÉTRICO NODAL MODIFICADO (MNA / KIRCHHOFF)
// -------------------------------------------------------------
function solveCircuitMNA(grid) {
    const parent = {};
    function find(i) {
        if (!parent[i]) parent[i] = i;
        if (parent[i] === i) return i;
        parent[i] = find(parent[i]);
        return parent[i];
    }
    function union(i, j) {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            parent[rootI] = rootJ;
        }
    }

    const gridKeys = Object.keys(grid);
    if (gridKeys.length === 0 || !grid['0,0']) {
        return { success: false, nodeVoltages: {}, branches: [], maxCurrent: 0, deadShort: false, equipmentsSummary: [] };
    }

    // A. Unir contatos externos entre cartas vizinhas
    gridKeys.forEach(key => {
        const node = grid[key];
        const [x, y] = key.split(',').map(Number);
        const ports = node.card.currentPorts || getRotatedPorts(node.card.basePorts, node.card.rotation || 0);

        // Vizinho à direita (right -> left)
        if (ports.right && grid[`${x+1},${y}`]) {
            const nbPorts = grid[`${x+1},${y}`].card.currentPorts || getRotatedPorts(grid[`${x+1},${y}`].card.basePorts, grid[`${x+1},${y}`].card.rotation || 0);
            if (nbPorts.left) {
                union(`${x},${y}@right`, `${x+1},${y}@left`);
            }
        }
        // Vizinho abaixo (bottom -> top)
        if (ports.bottom && grid[`${x},${y+1}`]) {
            const nbPorts = grid[`${x},${y+1}`].card.currentPorts || getRotatedPorts(grid[`${x},${y+1}`].card.basePorts, grid[`${x},${y+1}`].card.rotation || 0);
            if (nbPorts.top) {
                union(`${x},${y}@bottom`, `${x},${y+1}@top`);
            }
        }
    });

    // B. Unir portas internas de condutores 0Ω (wire, fuse, generator)
    gridKeys.forEach(key => {
        const node = grid[key];
        const [x, y] = key.split(',').map(Number);
        const card = node.card;
        const ports = card.currentPorts || getRotatedPorts(card.basePorts, card.rotation || 0);
        const activeSides = ['top', 'right', 'bottom', 'left'].filter(s => ports[s]);

        if (card.type === 'generator' || card.type === 'wire' || card.type === 'fuse') {
            for (let i = 1; i < activeSides.length; i++) {
                union(`${x},${y}@${activeSides[0]}`, `${x},${y}@${activeSides[i]}`);
            }
        }
    });

    // C. Identificar supernós fixos (Gerador = 12V, GND = 0V)
    const fixedVoltages = {};
    let deadShort = false;

    // Gerador 12V em (0,0)
    const genNode = grid['0,0'];
    const genPorts = genNode.card.currentPorts || getRotatedPorts(genNode.card.basePorts, genNode.card.rotation || 0);
    const genActiveSide = ['top', 'right', 'bottom', 'left'].find(s => genPorts[s]) || 'top';
    const genSupernode = find(`0,0@${genActiveSide}`);
    fixedVoltages[genSupernode] = 12.0;

    // GNDs 0V
    gridKeys.forEach(key => {
        const node = grid[key];
        const [x, y] = key.split(',').map(Number);
        const card = node.card;
        if (card.type === 'gnd') {
            const ports = card.currentPorts || getRotatedPorts(card.basePorts, card.rotation || 0);
            const activeSide = ['top', 'right', 'bottom', 'left'].find(s => ports[s]);
            if (activeSide) {
                const gndSupernode = find(`${x},${y}@${activeSide}`);
                if (fixedVoltages[gndSupernode] === 12.0) {
                    deadShort = true; // Curto direto 0Ω entre fonte e terra!
                }
                fixedVoltages[gndSupernode] = 0.0;
            }
        }
    });

    // D. Coletar todos os ramos resistivos (Resistores e Aparelhos)
    const branches = [];
    gridKeys.forEach(key => {
        const node = grid[key];
        const [x, y] = key.split(',').map(Number);
        const card = node.card;
        const ports = card.currentPorts || getRotatedPorts(card.basePorts, card.rotation || 0);
        const activeSides = ['top', 'right', 'bottom', 'left'].filter(s => ports[s]);

        if (card.type === 'resistor' || card.type === 'equipment') {
            if (activeSides.length >= 2) {
                const nodeU = find(`${x},${y}@${activeSides[0]}`);
                const nodeV = find(`${x},${y}@${activeSides[1]}`);
                const r = Math.max(0.1, card.r || 1);
                branches.push({
                    card,
                    x, y,
                    u: nodeU,
                    v: nodeV,
                    r,
                    g: 1 / r,
                    termU: `${x},${y}@${activeSides[0]}`,
                    termV: `${x},${y}@${activeSides[1]}`
                });
            }
        }
    });

    // E. Coletar lista de todos os supernós do grafo
    const allSupernodesSet = new Set();
    gridKeys.forEach(key => {
        const node = grid[key];
        const [x, y] = key.split(',').map(Number);
        const ports = node.card.currentPorts || getRotatedPorts(node.card.basePorts, node.card.rotation || 0);
        ['top', 'right', 'bottom', 'left'].forEach(s => {
            if (ports[s]) {
                allSupernodesSet.add(find(`${x},${y}@${s}`));
            }
        });
    });

    const allSupernodes = Array.from(allSupernodesSet);
    const freeSupernodes = allSupernodes.filter(sn => fixedVoltages[sn] === undefined);

    const freeIdxMap = {};
    freeSupernodes.forEach((sn, idx) => { freeIdxMap[sn] = idx; });

    const N = freeSupernodes.length;
    const nodeVoltages = { ...fixedVoltages };

    if (N > 0) {
        // Monta matriz de condutância G [N x N] e vetor I [N]
        const G = Array.from({ length: N }, () => new Float64Array(N));
        const I = new Float64Array(N);

        branches.forEach(b => {
            const isUFree = freeIdxMap[b.u] !== undefined;
            const isVFree = freeIdxMap[b.v] !== undefined;

            if (isUFree && isVFree) {
                const uIdx = freeIdxMap[b.u];
                const vIdx = freeIdxMap[b.v];
                G[uIdx][uIdx] += b.g;
                G[vIdx][vIdx] += b.g;
                G[uIdx][vIdx] -= b.g;
                G[vIdx][uIdx] -= b.g;
            } else if (isUFree && !isVFree) {
                const uIdx = freeIdxMap[b.u];
                G[uIdx][uIdx] += b.g;
                I[uIdx] += b.g * (fixedVoltages[b.v] || 0);
            } else if (!isUFree && isVFree) {
                const vIdx = freeIdxMap[b.v];
                G[vIdx][vIdx] += b.g;
                I[vIdx] += b.g * (fixedVoltages[b.u] || 0);
            }
        });

        // Eliminação Gaussiana com Pivotamento Parcial
        for (let i = 0; i < N; i++) {
            let maxRow = i;
            let maxVal = Math.abs(G[i][i]);
            for (let r = i + 1; r < N; r++) {
                if (Math.abs(G[r][i]) > maxVal) {
                    maxVal = Math.abs(G[r][i]);
                    maxRow = r;
                }
            }

            if (maxVal < 1e-12) {
                continue;
            }

            if (maxRow !== i) {
                const tempRow = G[i];
                G[i] = G[maxRow];
                G[maxRow] = tempRow;
                const tempI = I[i];
                I[i] = I[maxRow];
                I[maxRow] = tempI;
            }

            for (let r = i + 1; r < N; r++) {
                if (Math.abs(G[r][i]) > 1e-12) {
                    const factor = G[r][i] / G[i][i];
                    for (let c = i; c < N; c++) {
                        G[r][c] -= factor * G[i][c];
                    }
                    I[r] -= factor * I[i];
                }
            }
        }

        // Substituição Regressiva
        const solV = new Float64Array(N);
        for (let i = N - 1; i >= 0; i--) {
            if (Math.abs(G[i][i]) > 1e-12) {
                let sum = I[i];
                for (let c = i + 1; c < N; c++) {
                    sum -= G[i][c] * solV[c];
                }
                solV[i] = sum / G[i][i];
            } else {
                solV[i] = 0.0;
            }
        }

        freeSupernodes.forEach((sn, idx) => {
            nodeVoltages[sn] = Math.round(solV[idx] * 100) / 100;
        });
    }

    // F. Calcular parâmetros físicos para cada componente
    let maxCurrent = 0;
    const equipmentsSummary = [];

    const solvedBranches = branches.map(b => {
        const vU = nodeVoltages[b.u] !== undefined ? nodeVoltages[b.u] : 0;
        const vV = nodeVoltages[b.v] !== undefined ? nodeVoltages[b.v] : 0;
        const deltaV = Math.abs(vU - vV);
        const current = deltaV / b.r;
        const power = deltaV * current;
        if (current > maxCurrent) maxCurrent = current;

        let status = 'ABERTO';
        const vNom = b.card.vNom || 4;

        if (b.card.type === 'equipment') {
            if (current < 0.001) {
                status = 'SUBTENSAO';
            } else if (deltaV > vNom + 0.3) {
                status = 'SOBRETENSAO';
            } else if (Math.abs(deltaV - vNom) <= 0.3) {
                status = 'NOMINAL';
            } else {
                status = 'SUBTENSAO';
            }

            equipmentsSummary.push({
                x: b.x,
                y: b.y,
                name: b.card.name,
                vNom,
                vReceived: Math.round(deltaV * 10) / 10,
                current: Math.round(current * 100) / 100,
                status
            });
        } else {
            status = current > 0.001 ? 'OPERANDO' : 'ABERTO';
        }

        const branchData = {
            card: b.card,
            x: b.x,
            y: b.y,
            vIn: Math.round(Math.max(vU, vV) * 100) / 100,
            vOut: Math.round(Math.min(vU, vV) * 100) / 100,
            deltaV: Math.round(deltaV * 100) / 100,
            current: Math.round(current * 100) / 100,
            power: Math.round(power * 100) / 100,
            status,
            r: b.r
        };

        // Salva telemetria diretamente na carta da grade
        if (grid[`${b.x},${b.y}`]) {
            grid[`${b.x},${b.y}`].card.telemetry = branchData;
        }

        return branchData;
    });

    // Atualiza telemetria de condutores, fusíveis, gerador e GND
    gridKeys.forEach(key => {
        const node = grid[key];
        const [x, y] = key.split(',').map(Number);
        const card = node.card;
        if (card.type === 'generator') {
            card.telemetry = { vIn: 12.0, vOut: 12.0, deltaV: 0, current: Math.round(maxCurrent * 100) / 100, power: Math.round(12 * maxCurrent * 100) / 100, status: 'FONTE_12V' };
        } else if (card.type === 'gnd') {
            card.telemetry = { vIn: 0.0, vOut: 0.0, deltaV: 0, current: Math.round(maxCurrent * 100) / 100, power: 0, status: 'TERRA_0V' };
        } else if (card.type === 'wire' || card.type === 'fuse') {
            const ports = card.currentPorts || getRotatedPorts(card.basePorts, card.rotation || 0);
            const activeSide = ['top', 'right', 'bottom', 'left'].find(s => ports[s]);
            const sn = activeSide ? find(`${x},${y}@${activeSide}`) : null;
            const v = sn && nodeVoltages[sn] !== undefined ? Math.round(nodeVoltages[sn] * 100) / 100 : 0;
            card.telemetry = { vIn: v, vOut: v, deltaV: 0, current: Math.round(maxCurrent * 100) / 100, power: 0, status: maxCurrent > 0.001 ? 'CONDUTOR_ATIVO' : 'ABERTO' };
        }
    });

    return {
        success: true,
        nodeVoltages,
        branches: solvedBranches,
        maxCurrent: Math.round(maxCurrent * 100) / 100,
        deadShort,
        equipmentsSummary,
        findSupernode: find
    };
}

// -------------------------------------------------------------
// 4. MOTOR DA GRADE 2D & FÍSICA DOS CIRCUITOS
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

    // Calcula a resistência prévia mínima necessária na linha para um aparelho não queimar:
    // R_alvo = (12 * r_eq) / V_nom
    // R_min_previo = R_alvo - r_eq
    getEquipmentMinPriorResistance(card) {
        if (card.type !== 'equipment') return 0;
        const vNom = card.vNom || 4;
        const rEq = card.r || 1;
        const rAlvo = (12 * rEq) / vNom;
        return Math.max(0, Math.round((rAlvo - rEq) * 10) / 10);
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
                currentPorts,
                isBurned: false
            }
        };

        // Remove da mão e compra 1 nova do baralho
        player.hand.splice(cardIndex, 1);
        if (this.deck.length > 0) {
            player.hand.push(this.deck.pop());
        }

        // Análise Nodal MNA em tempo real
        this.lastCircuitAnalysis = this.analyzeCircuits(true);

        if (this.networkLives <= 0) {
            this.gameOver = true;
        }

        // Passa o turno
        this.turnIndex = (this.turnIndex + 1) % this.players.length;

        return {
            success: true,
            analysis: this.lastCircuitAnalysis,
            overvoltageEvent: this.lastCircuitAnalysis.overvoltageEvent || null,
            gameOver: this.gameOver,
            networkLives: this.networkLives,
            savedEquipments: this.savedEquipments
        };
    }

    // Descarte de 3 cartas quando o jogador não tem movimentos legais
    discardAndPass(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (!player) return false;

        while (player.hand.length > 0) {
            this.deck.unshift(player.hand.pop());
        }

        for (let i = 0; i < 3; i++) {
            if (this.deck.length > 0) {
                player.hand.push(this.deck.pop());
            }
        }

        this.turnIndex = (this.turnIndex + 1) % this.players.length;
        return true;
    }

    // Análise Nodal Global e Traçado de Malhas
    analyzeCircuits(applyPenalties = false) {
        const mna = solveCircuitMNA(this.grid);

        const genOutputs = [
            { dir: 'top', startX: 0, startY: -1, enterFrom: 'bottom' },
            { dir: 'right', startX: 1, startY: 0, enterFrom: 'left' },
            { dir: 'bottom', startX: 0, startY: 1, enterFrom: 'top' },
            { dir: 'left', startX: -1, startY: 0, enterFrom: 'right' }
        ];

        const branches = [];
        let newOvervoltagesCount = 0;
        let newSuccessCount = 0;
        let overvoltageEvent = null;

        genOutputs.forEach((out, branchIndex) => {
            const branch = this.traceBranch(out.startX, out.startY, out.enterFrom);
            if (branch.cards.length > 0) {
                const branchObj = {
                    branchId: branchIndex + 1,
                    direction: out.dir,
                    ...branch
                };
                branches.push(branchObj);

                if (branch.isClosed) {
                    const lastCard = branch.cards[branch.cards.length - 1];
                    const branchSig = `${out.dir}@${lastCard.x},${lastCard.y}@${branch.isClosedGnd ? 'GND' : 'LOOP'}`;
                    branchObj.signature = branchSig;

                    if (!this.processedClosedBranches.has(branchSig)) {
                        branchObj.isNewlyClosed = true;

                        if (branch.verdict === 'SOBRETENSAO' || mna.deadShort) {
                            newOvervoltagesCount += 1;
                            overvoltageEvent = {
                                occurred: true,
                                branchId: branchIndex + 1,
                                direction: out.dir,
                                diagnosisMsg: branch.diagnosisMsg || branch.explanation,
                                burnedCards: branch.burnedNodes || []
                            };

                            if (applyPenalties) {
                                this.processedClosedBranches.add(branchSig);
                                this.networkLives = Math.max(0, this.networkLives - 1);

                                if (branch.burnedNodes && branch.burnedNodes.length > 0) {
                                    branch.burnedNodes.forEach(bNode => {
                                        const key = `${bNode.x},${bNode.y}`;
                                        if (this.grid[key]) {
                                            this.grid[key].card.isBurned = true;
                                        }
                                    });
                                }
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

        const primaryBranch = branches[0] || { rTotal: 0, iTheoretical: '0.00', isClosed: false, verdict: 'ABERTO', explanation: 'Nenhuma trilha conectada ao gerador.' };

        return {
            branches,
            primaryBranch,
            mna,
            newOvervoltagesCount,
            newSuccessCount,
            deckCount: this.deck.length,
            networkLives: this.networkLives,
            savedEquipments: this.savedEquipments,
            overvoltageEvent
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
                break;
            }

            visited.add(key);
            branchCards.push(node);

            const card = node.card;
            rTotal += (card.r || 0);

            if (card.type === 'equipment') {
                equipments.push({ ...card, nodeX: currX, nodeY: currY });
            }

            if (card.type === 'gnd') {
                isClosedGnd = true;
                break;
            }

            if (currX === 0 && currY === 0) {
                isClosedLoop = true;
                break;
            }

            const otherSides = Object.keys(ports).filter(s => s !== incomingSide && ports[s]);

            if (otherSides.length === 0) {
                break;
            }

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
        let diagnosisMsg = '';
        const burnedNodes = [];

        if (isClosed) {
            if (rTotal === 0) {
                verdict = 'SOBRETENSAO';
                explanation = 'Curto-circuito de 0Ω fechado direto no gerador! Perde 1 vida.';
                diagnosisMsg = 'ALERTA DE CURTO-CIRCUITO: Malha fechada com 0Ω direto no Gerador 12V (Corrente infinita). O fusível de rede rompeu e consumiu 1 vida!';
                if (branchCards.length > 0) {
                    burnedNodes.push(branchCards[branchCards.length - 1]);
                }
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
                        burnedNodes.push({ x: eq.nodeX, y: eq.nodeY, cardName: eq.name, vReceived: vFormatted, vNom: eq.vNom });
                    }
                    if (Math.abs(vEq - eq.vNom) > 0.25) {
                        hasExactNominal = false;
                    }
                });

                if (hasOvervoltage) {
                    verdict = 'SOBRETENSAO';
                    const mainBurned = burnedNodes[0];
                    const excessV = (parseFloat(mainBurned.vReceived) - mainBurned.vNom).toFixed(1);
                    explanation = `Sobretensão! ${details.join(' | ')}. Queimou fusível da rede.`;
                    diagnosisMsg = `ALERTA DE SOBRETENSÃO: O aparelho ${mainBurned.cardName} (${mainBurned.vNom}V) recebeu ${mainBurned.vReceived}V (Excesso de +${excessV}V). O aparelho queimou e a rede consumiu 1 vida!`;
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
            explanation,
            diagnosisMsg,
            burnedNodes
        };
    }

    // -------------------------------------------------------------
    // 5. IA DE TESTE AVANÇADA COM CONSULTA NODAL MNA
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
                            currentPorts,
                            isBurned: false
                        }
                    };

                    // Análise MNA na simulação temporária
                    const simMNA = solveCircuitMNA(this.grid);
                    const simAnalysis = this.analyzeCircuits(false);

                    // Reverte imediatamente a simulação
                    delete this.grid[`${slot.x},${slot.y}`];

                    // Identifica o ramo onde esta carta foi inserida
                    const branchWithSlot = simAnalysis.branches.find(b => b.cards.some(n => n.x === slot.x && n.y === slot.y));
                    const rPrior = branchWithSlot ? Math.max(0, branchWithSlot.rTotal - (card.r || 0)) : 0;

                    let score = 0;
                    let causedNewOvervoltage = simMNA.deadShort;
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

                    // Verifica se qualquer aparelho no MNA sofreu sobretensão
                    if (simMNA.equipmentsSummary.some(e => e.status === 'SOBRETENSAO')) {
                        causedNewOvervoltage = true;
                    }

                    // 1. CHECAGEM CRÍTICA DE FECHAMENTO (CURTO OU SOBRETENSÃO)
                    if (causedNewOvervoltage) {
                        score = -1000;
                    } else if (causedNewNominalSuccess) {
                        score = +350; // Recompensa máxima por salvar aparelho
                    }

                    // 2. CHECAGEM PREVENTIVA DE APARELHOS EM RAMOS ABERTOS
                    else if (card.type === 'equipment') {
                        const minPriorNeeded = this.getEquipmentMinPriorResistance(card);

                        if (rPrior < minPriorNeeded) {
                            // Bloqueado preventivamente contra queima!
                            score = -800;
                        } else if (rPrior === minPriorNeeded) {
                            score = +180; // Ponto ideal de inserção
                        } else {
                            score = +70; // Subtensão segura
                        }
                    }

                    // 3. CABO TERRA (GND)
                    else if (card.type === 'gnd') {
                        if (closedEmptyBranch) {
                            score = -150;
                        } else if (causedNewSubvoltage) {
                            score = +15;
                        } else if (!branchWithSlot || !branchWithSlot.isClosed) {
                            score = -200;
                        }
                    }

                    // 4. RESISTORES (CONSTRUÇÃO DE MALHA)
                    else if (card.type === 'resistor') {
                        score = +80 + ((card.r || 1) * 15);

                        const hasEquipmentInHand = bot.hand.some(c => {
                            if (c.type !== 'equipment') return false;
                            const needed = this.getEquipmentMinPriorResistance(c);
                            return (rPrior + (card.r || 0)) <= needed;
                        });
                        if (hasEquipmentInHand) {
                            score += 45;
                        }
                    }

                    // 5. CONDUTORES E FUSÍVEIS
                    else if (card.type === 'fuse') {
                        score = +50;
                    } else if (card.type === 'wire') {
                        score = +35;
                    } else {
                        score = +20;
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

        const safeMoves = evaluatedMoves.filter(m => m.score > 0);

        if (safeMoves.length === 0) {
            return null; // Descarte consciente
        }

        safeMoves.sort((a, b) => b.score - a.score);
        return safeMoves[0];
    }
}

// -------------------------------------------------------------
// 6. EXPORTAÇÃO PARA NAVEGADOR E NODE.JS
// -------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TOPOLOGY_SHAPES,
        getRotatedPorts,
        CARDS_CATALOG,
        generateFullDeck,
        VoltzPlaytestEngine,
        solveCircuitMNA,
        renderCardSVG
    };
}
