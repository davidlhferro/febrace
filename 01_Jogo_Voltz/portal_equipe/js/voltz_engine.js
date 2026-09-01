/**
 * PORTAL VOLTZ — Motor Eletrodinâmico & Grade 2D Oficial (Padrão Bandido)
 * Suporta colocação na grade 2D (x, y), rotação de cartas, fechamento por Loop e por GND.
 */

let getFullDeckFn = typeof generateFullDeck !== 'undefined' ? generateFullDeck : null;
let getRotatedPortsFn = typeof getRotatedPorts !== 'undefined' ? getRotatedPorts : null;

if ((!getFullDeckFn || !getRotatedPortsFn) && typeof require !== 'undefined') {
    try {
        const cardsData = require('./voltz_cards_data.js');
        getFullDeckFn = cardsData.generateFullDeck;
        getRotatedPortsFn = cardsData.getRotatedPorts;
    } catch (e) {}
}

class VoltzEngine {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        const genPorts = { top: true, right: true, bottom: true, left: true };
        this.gameState = {
            status: 'lobby', // 'lobby' | 'playing' | 'victory' | 'game_over'
            roomCode: null,
            players: [],     // [{ id, name, hand: [], isHost, ready }]
            currentTurnPlayerIndex: 0,
            networkLives: 3, // 3 Fusíveis de rede para absorver sobretensões
            savedEquipmentsCount: 0,
            targetEquipmentsToWin: 4,
            deck: [],
            discardPile: [],
            board: {
                grid: {
                    '0,0': {
                        x: 0,
                        y: 0,
                        card: {
                            id: 'gen_12v',
                            type: 'generator',
                            name: 'Gerador Central 12V',
                            shape: 'GENERATOR',
                            basePorts: genPorts,
                            currentPorts: genPorts,
                            rotation: 0,
                            voltageIn: 12,
                            badge: 'DC 12V',
                            badgeColor: '#b45309'
                        },
                        status: 'active'
                    }
                },
                minX: 0,
                maxX: 0,
                minY: 0,
                maxY: 0
            },
            actionLogs: [],
            lastCircuitTest: null
        };
    }

    addPlayer(playerId, playerName, isHost = false) {
        const existing = this.gameState.players.find(p => p.id === playerId);
        if (existing) {
            existing.name = playerName;
            return existing;
        }
        if (this.gameState.players.length >= 4) {
            throw new Error('A sala atingiu o limite de 4 jogadores.');
        }
        const player = {
            id: playerId,
            name: playerName,
            hand: [],
            isHost: isHost || this.gameState.players.length === 0,
            ready: true
        };
        this.gameState.players.push(player);
        this.log(`👋 ${player.name} conectou-se à bancada.`);
        return player;
    }

    removePlayer(playerId) {
        const idx = this.gameState.players.findIndex(p => p.id === playerId);
        if (idx !== -1) {
            const name = this.gameState.players[idx].name;
            this.gameState.players.splice(idx, 1);
            this.log(`🚪 ${name} desconectou-se da bancada.`);
            if (this.gameState.currentTurnPlayerIndex >= this.gameState.players.length) {
                this.gameState.currentTurnPlayerIndex = 0;
            }
        }
    }

    startGame() {
        if (this.gameState.players.length < 1) {
            throw new Error('Necessário pelo menos 1 jogador para iniciar.');
        }

        const deckFn = getFullDeckFn || (typeof generateFullDeck !== 'undefined' ? generateFullDeck : null);
        const rawDeck = deckFn ? deckFn() : [];
        this.gameState.deck = this.shuffle(rawDeck);
        this.gameState.discardPile = [];
        this.gameState.status = 'playing';
        this.gameState.currentTurnPlayerIndex = 0;
        this.gameState.networkLives = 3;
        this.gameState.savedEquipmentsCount = 0;

        // Distribui exatamente 3 cartas para cada jogador (Regra de Ouro do Bandido)
        for (const player of this.gameState.players) {
            player.hand = [];
            for (let i = 0; i < 3; i++) {
                if (this.gameState.deck.length > 0) {
                    player.hand.push(this.gameState.deck.pop());
                }
            }
        }

        this.log('⚡ GERADOR 12V LIGADO NO CENTRO (0,0)! Conectem os aparelhos e salvem a cidade!');
        return this.gameState;
    }

    // -------------------------------------------------------------
    // VALIDAÇÃO DE ENCAIXE NA GRADE 2D (REGRA CANÔNICA DO BANDIDO)
    // -------------------------------------------------------------
    isValidPlacement(card, x, y, rotation = 0) {
        const key = `${x},${y}`;
        if (this.gameState.board.grid[key]) {
            return { valid: false, reason: 'Essa posição já está ocupada por outra carta.' };
        }

        const rotFn = getRotatedPortsFn || (typeof getRotatedPorts !== 'undefined' ? getRotatedPorts : null);
        const cardPorts = rotFn ? rotFn(card.basePorts, rotation) : { ...card.basePorts };

        // Posições dos 4 vizinhos adjacentes
        const neighbors = [
            { dir: 'top', opp: 'bottom', x: x, y: y + 1 },     // Vizinho de Cima
            { dir: 'right', opp: 'left', x: x + 1, y: y },     // Vizinho da Direita
            { dir: 'bottom', opp: 'top', x: x, y: y - 1 },     // Vizinho de Baixo
            { dir: 'left', opp: 'right', x: x - 1, y: y }      // Vizinho da Esquerda
        ];

        let adjacentCount = 0;
        let connectedTracksCount = 0;

        for (const n of neighbors) {
            const nKey = `${n.x},${n.y}`;
            const neighborNode = this.gameState.board.grid[nKey];

            if (neighborNode) {
                adjacentCount++;
                const neighborPorts = neighborNode.card.currentPorts || neighborNode.card.basePorts;
                const myPortHasTrack = !!cardPorts[n.dir];
                const neighborPortHasTrack = !!neighborPorts[n.opp];

                // REGRA DE OURO: A borda DEVE coincidir perfeitamente!
                // Trilha deve bater com trilha; parede/sem-trilha deve bater com parede/sem-trilha.
                if (myPortHasTrack !== neighborPortHasTrack) {
                    return {
                        valid: false,
                        reason: `Conexão incompatível na direção ${n.dir.toUpperCase()}: uma trilha está batendo em uma parede cega!`
                    };
                }

                if (myPortHasTrack && neighborPortHasTrack) {
                    connectedTracksCount++;
                }
            }
        }

        // Deve ser adjacente a pelo menos 1 carta existente
        if (adjacentCount === 0) {
            return { valid: false, reason: 'A carta precisa ser colocada ao lado de uma carta já existente na mesa.' };
        }

        // Deve conectar pelo menos uma trilha condutora ativa
        if (connectedTracksCount === 0) {
            return { valid: false, reason: 'Nenhuma trilha condutora está conectada com as cartas vizinhas.' };
        }

        return { valid: true, cardPorts };
    }

    // AÇÃO: Jogar uma Carta da Mão na Posição (x, y) com Rotação
    playCard(playerId, cardUid, x, y, rotation = 0) {
        this.validateTurn(playerId);
        const player = this.getPlayer(playerId);
        const cardIndex = player.hand.findIndex(c => c.uid === cardUid);
        if (cardIndex === -1) throw new Error('Carta não encontrada na mão.');

        const card = player.hand[cardIndex];
        const validation = this.isValidPlacement(card, x, y, rotation);

        if (!validation.valid) {
            throw new Error(validation.reason);
        }

        // Remove da mão e atualiza rotação
        player.hand.splice(cardIndex, 1);
        card.rotation = rotation;
        card.currentPorts = validation.cardPorts;

        // Posiciona na grade
        const key = `${x},${y}`;
        this.gameState.board.grid[key] = {
            x,
            y,
            card,
            status: 'active'
        };

        // Atualiza limites da mesa (bounding box para Pan & Zoom)
        this.gameState.board.minX = Math.min(this.gameState.board.minX, x);
        this.gameState.board.maxX = Math.max(this.gameState.board.maxX, x);
        this.gameState.board.minY = Math.min(this.gameState.board.minY, y);
        this.gameState.board.maxY = Math.max(this.gameState.board.maxY, y);

        this.log(`🃏 ${player.name} jogou [${card.name}] em (${x}, ${y}) a ${rotation}°.`);

        // Compra 1 carta do monte para recompor a mão de 3 cartas
        if (this.gameState.deck.length > 0) {
            player.hand.push(this.gameState.deck.pop());
        }

        // Verifica fechamento de circuito (por Loop ou por GND) e calcula Lei de Ohm
        this.evaluateCircuitsOnBoard();

        this.checkGameEnd();
        this.advanceTurn();
        return this.gameState;
    }

    // AÇÃO: Renovar Mão (Bandido: descarta as 3 cartas para o fundo do monte e compra 3 novas)
    refreshHand(playerId) {
        this.validateTurn(playerId);
        const player = this.getPlayer(playerId);

        if (this.gameState.deck.length === 0) {
            throw new Error('O monte de compras está vazio; não é possível renovar a mão.');
        }

        const oldHand = player.hand.splice(0, player.hand.length);
        // Insere no FUNDO do monte (unshift)
        this.gameState.deck.unshift(...oldHand);

        // Compra 3 cartas novas do TOPO (pop)
        player.hand = [];
        while (this.gameState.deck.length > 0 && player.hand.length < 3) {
            player.hand.push(this.gameState.deck.pop());
        }

        this.log(`🔄 ${player.name} não tinha jogadas e trocou suas 3 cartas pelo fundo do monte.`);
        this.advanceTurn();
        return this.gameState;
    }

    // -------------------------------------------------------------
    // DISPARO E AVALIAÇÃO DE CIRCUITOS (LOOP OU CABO TERRA / GND)
    // -------------------------------------------------------------
    evaluateCircuitsOnBoard() {
        const grid = this.gameState.board.grid;
        const generatorNode = grid['0,0'];
        if (!generatorNode) return;

        // Explora caminhos a partir das 4 saídas do Gerador (0,0)
        const directions = [
            { dir: 'top', opp: 'bottom', dx: 0, dy: 1 },
            { dir: 'right', opp: 'left', dx: 1, dy: 0 },
            { dir: 'bottom', opp: 'top', dx: 0, dy: -1 },
            { dir: 'left', opp: 'right', dx: -1, dy: 0 }
        ];

        for (const outDir of directions) {
            const startX = outDir.dx;
            const startY = outDir.dy;
            const startKey = `${startX},${startY}`;
            const startNode = grid[startKey];

            if (startNode && startNode.card.currentPorts[outDir.opp]) {
                this.traceBranchFrom(startX, startY, outDir.opp);
            }
        }
    }

    // Traça um ramo condutor para verificar se fecha em GND ou retorna em Loop ao Gerador (0,0)
    traceBranchFrom(startX, startY, incomingDir) {
        const grid = this.gameState.board.grid;
        const visited = new Set();
        const path = [];

        let currentX = startX;
        let currentY = startY;
        let prevDir = incomingDir; // de onde viemos

        while (true) {
            const key = `${currentX},${currentY}`;
            if (visited.has(key)) break; // loop interno infinito evitado
            visited.add(key);

            const node = grid[key];
            if (!node) break;
            path.push(node);

            // CASO B: Encontrou um Cabo Terra (GND // 0V) -> Fechamento Seguro!
            if (node.card.type === 'gnd') {
                this.processClosedCircuit(path, 'GND');
                return;
            }

            // CASO A: Retornou ao Gerador (0,0) -> Fechamento em Loop (Malha Fechada)!
            if (currentX === 0 && currentY === 0) {
                this.processClosedCircuit(path, 'LOOP');
                return;
            }

            // Procura a próxima saída do componente
            const ports = node.card.currentPorts;
            const nextDirs = [
                { dir: 'top', opp: 'bottom', dx: 0, dy: 1 },
                { dir: 'right', opp: 'left', dx: 1, dy: 0 },
                { dir: 'bottom', opp: 'top', dx: 0, dy: -1 },
                { dir: 'left', opp: 'right', dx: -1, dy: 0 }
            ].filter(d => d.dir !== prevDir && ports[d.dir]);

            if (nextDirs.length === 1) {
                // Caminho linear
                const next = nextDirs[0];
                const nextKey = `${currentX + next.dx},${currentY + next.dy}`;
                const nextNode = grid[nextKey];

                if (nextNode && nextNode.card.currentPorts[next.opp]) {
                    currentX += next.dx;
                    currentY += next.dy;
                    prevDir = next.opp;
                } else {
                    break; // Ramo ainda aberto (circuito em expansão)
                }
            } else {
                // Bifurcação ou beco sem saída
                break;
            }
        }
    }

    // Calcula a Lei de Ohm e Divisores de Tensão no Ramo Fechado
    processClosedCircuit(pathNodes, closingType) {
        const vIn = 12; // 12V da Fonte Central
        const resistors = pathNodes.filter(n => n.card.type === 'resistor');
        const equipments = pathNodes.filter(n => n.card.type === 'equipment');
        const hasFuse = pathNodes.some(n => n.card.type === 'fuse');

        const rSeries = resistors.reduce((sum, r) => sum + (r.card.r || 0), 0);

        if (equipments.length === 0) {
            return; // Ramo fechado sem cargas
        }

        for (const eqNode of equipments) {
            if (eqNode.status === 'energized') continue; // Já foi salvo anteriormente

            const rLoad = eqNode.card.r || 1;
            const vNom = eqNode.card.vNom || 12;
            const rTotal = rSeries + rLoad;

            // Tensão calculada sobre a carga: V = V_in * (R_load / R_total)
            const vCalculated = Number((vIn * (rLoad / rTotal)).toFixed(2));
            const isNominal = Math.abs(vCalculated - vNom) <= 0.05;

            if (isNominal) {
                eqNode.status = 'energized';
                this.gameState.savedEquipmentsCount++;
                this.log(`🟢 [CIRCUITO FECHADO VIA ${closingType}] ${eqNode.card.name} recebeu ${vCalculated}V (Meta: ${vNom}V) e ACENDEU COM SUCESSO!`);
                this.gameState.lastCircuitTest = {
                    success: true,
                    title: '🟢 TENSÃO NOMINAL PERFEITA!',
                    desc: `${eqNode.card.name} alimentado com ${vCalculated}V com sucesso via ${closingType}.`,
                    vCalculated,
                    vNom
                };
            } else if (vCalculated > vNom) {
                // SOBRETENSÃO!
                if (hasFuse) {
                    this.log(`🛡️ [FUSÍVEL DESARMOU] Sobretensão de ${vCalculated}V evitada em ${eqNode.card.name}! O fusível 1A queimou para proteger o circuito.`);
                } else {
                    eqNode.status = 'burned';
                    this.gameState.networkLives--;
                    this.log(`💥 [SOBRETENSÃO] ${eqNode.card.name} recebeu ${vCalculated}V (Limite: ${vNom}V) e QUEIMOU! Vidas de Rede restantes: ${this.gameState.networkLives}`);
                    this.gameState.lastCircuitTest = {
                        success: false,
                        title: '💥 SOBRETENSÃO (QUEIMA DE APARELHO)!',
                        desc: `Tensão de ${vCalculated}V excedeu a nominal de ${vNom}V sem proteção de fusível.`,
                        vCalculated,
                        vNom
                    };
                }
            } else {
                // SUBTENSÃO!
                this.log(`⚪ [SUBTENSÃO] ${eqNode.card.name} recebeu apenas ${vCalculated}V (Necessário: ${vNom}V). Energia insuficiente para ligar.`);
                this.gameState.lastCircuitTest = {
                    success: false,
                    title: '⚪ SUBTENSÃO (ENERGIA INSUFICIENTE)',
                    desc: `Tensão de ${vCalculated}V é insuficiente para ligar ${eqNode.card.name} (Meta: ${vNom}V).`,
                    vCalculated,
                    vNom
                };
            }
        }
    }

    checkGameEnd() {
        if (this.gameState.savedEquipmentsCount >= this.gameState.targetEquipmentsToWin) {
            this.gameState.status = 'victory';
            this.log('🏆 VITÓRIA COLETIVA! A equipe estabilizou 4 aparelhos vitais da cidade!');
            return;
        }

        if (this.gameState.networkLives <= 0) {
            this.gameState.status = 'game_over';
            this.log('💀 FIM DE JOGO (BLACKOUT): Todos os fusíveis da rede foram queimados.');
            return;
        }

        const deckEmpty = this.gameState.deck.length === 0;
        const allHandsEmpty = this.gameState.players.every(p => p.hand.length === 0);

        if (deckEmpty && allHandsEmpty) {
            this.gameState.status = 'game_over';
            this.log('💀 FIM DE JOGO: As cartas do baralho acabaram antes de salvar a cidade.');
        }
    }

    advanceTurn() {
        if (this.gameState.status !== 'playing') return;
        this.gameState.currentTurnPlayerIndex = (this.gameState.currentTurnPlayerIndex + 1) % this.gameState.players.length;
        const nextPlayer = this.gameState.players[this.gameState.currentTurnPlayerIndex];
        this.log(`➡️ Vez de ${nextPlayer.name}.`);
    }

    validateTurn(playerId) {
        if (this.gameState.status !== 'playing') throw new Error('A partida não está em andamento.');
        const currentPlayer = this.gameState.players[this.gameState.currentTurnPlayerIndex];
        if (currentPlayer.id !== playerId) throw new Error(`Não é a vez de ${this.getPlayer(playerId).name}. Aguarde o seu turno.`);
    }

    getPlayer(playerId) {
        const player = this.gameState.players.find(p => p.id === playerId);
        if (!player) throw new Error('Jogador não encontrado.');
        return player;
    }

    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    log(msg) {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        this.gameState.actionLogs.unshift({ timestamp, text: msg });
        if (this.gameState.actionLogs.length > 60) {
            this.gameState.actionLogs.pop();
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzEngine };
}
