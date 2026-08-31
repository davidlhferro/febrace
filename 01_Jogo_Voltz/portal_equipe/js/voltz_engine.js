/**
 * PORTAL VOLTZ — Motor Eletrodinâmico & Regras de Circuito (Lei de Ohm & Kirchhoff)
 */

let getFullDeckFn = typeof generateFullDeck !== 'undefined' ? generateFullDeck : null;
if (!getFullDeckFn && typeof require !== 'undefined') {
    try {
        const cardsData = require('./voltz_cards_data.js');
        getFullDeckFn = cardsData.generateFullDeck;
    } catch (e) {}
}

class VoltzEngine {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        this.gameState = {
            status: 'lobby', // 'lobby' | 'playing' | 'victory' | 'game_over'
            roomCode: null,
            players: [],     // [{ id, name, hand: [], isHost, ready }]
            currentTurnPlayerIndex: 0,
            actionsRemaining: 1, // 1 Jogada por turno (Padrão Bandido) ou 2 ações
            deck: [],
            discardPile: [],
            board: {
                generator: { id: 'gen_12v', voltage: 12 },
                sectors: {
                    sector_hospital: { cards: [], status: 'blackout', name: 'Hospital Regional', vNom: 12, targetAddR: 0, vCalculated: 0 },
                    sector_dados: { cards: [], status: 'blackout', name: 'Central de Dados', vNom: 4, targetAddR: 2, vCalculated: 0 },
                    sector_agua: { cards: [], status: 'blackout', name: 'Tratamento de Água', vNom: 6, targetAddR: 2, vCalculated: 0 },
                    sector_residencial: { cards: [], status: 'blackout', name: 'Rede Residencial', vNom: 3, targetAddR: 3, vCalculated: 0 }
                }
            },
            actionLogs: [],
            lastDiagnostic: null
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
        this.log(`${player.name} conectou-se à bancada.`);
        return player;
    }

    removePlayer(playerId) {
        const idx = this.gameState.players.findIndex(p => p.id === playerId);
        if (idx !== -1) {
            const name = this.gameState.players[idx].name;
            this.gameState.players.splice(idx, 1);
            this.log(`${name} desconectou-se da bancada.`);
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
        this.gameState.actionsRemaining = 1;

        // Distribui 3 cartas iniciais para cada jogador (Regra Oficial Bandido)
        for (const player of this.gameState.players) {
            player.hand = [];
            for (let i = 0; i < 3; i++) {
                if (this.gameState.deck.length > 0) {
                    player.hand.push(this.gameState.deck.pop());
                }
            }
        }

        this.log('⚡ GERADOR 12V ATIVADO! Salvem os 4 setores da metrópole antes do baralho esgotar!');
        return this.gameState;
    }

    // AÇÃO: Jogar Carta da Mão em um dos Setores
    playCard(playerId, cardUid, sectorId) {
        this.validateTurn(playerId);
        const player = this.getPlayer(playerId);
        const cardIndex = player.hand.findIndex(c => c.uid === cardUid);
        if (cardIndex === -1) throw new Error('Carta não encontrada na mão.');

        const card = player.hand[cardIndex];
        const sector = this.gameState.board.sectors[sectorId];
        if (!sector) throw new Error('Setor inválido.');
        if (sector.status === 'energized') throw new Error('Este setor já foi salvo!');

        // Não permite adicionar componentes após o Cabo Terra (GND) já ter selado o ramo
        const hasGND = sector.cards.some(c => c.type === 'gnd');
        if (hasGND) throw new Error('O ramo já está selado por um Cabo Terra.');

        // Retira da mão e coloca no setor
        player.hand.splice(cardIndex, 1);
        sector.cards.push(card);
        this.log(`${player.name} instalou [${card.name}] no Setor ${sector.name}.`);

        // Se a carta jogada foi o Cabo Terra (GND), fecha a malha e dispara o diagnóstico de Kirchhoff!
        if (card.type === 'gnd') {
            const diag = this.diagnoseSector(sectorId);
            this.gameState.lastDiagnostic = diag;
            this.log(`🔍 [DIAGNÓSTICO GND] Setor ${sector.name}: ${diag.title} (${diag.vCalculated}V / Meta: ${diag.vNom}V)`);
        }

        // Compra 1 carta do monte para recompor a mão de 3 cartas
        if (this.gameState.deck.length > 0) {
            player.hand.push(this.gameState.deck.pop());
        }

        this.checkGameEnd();
        this.advanceTurn();
        return this.gameState;
    }

    // AÇÃO: Descarte de Mão Presa (Bandido: descarta as 3 cartas para o fundo do monte e compra 3 novas)
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

        this.log(`🔄 ${player.name} renovou sua mão, enviando as cartas para o fundo do monte.`);
        this.advanceTurn();
        return this.gameState;
    }

    // CÁLCULO CIENTÍFICO DA LEI DE OHM E KIRCHHOFF
    diagnoseSector(sectorId) {
        const sector = this.gameState.board.sectors[sectorId];
        const cards = sector.cards;

        const loadCard = cards.find(c => c.type === 'equipment');
        const resistors = cards.filter(c => c.type === 'resistor');
        const hasGND = cards.some(c => c.type === 'gnd');
        const hasFuse = cards.some(c => c.type === 'fuse');

        const vIn = 12; // Fonte constante de 12V
        const rSeries = resistors.reduce((sum, r) => sum + (r.r || 0), 0);

        if (!loadCard) {
            return {
                result: 'no_load',
                status: 'blackout',
                title: 'Circuito Sem Carga',
                desc: 'O ramo foi aterrado sem nenhum equipamento conectado (curto-circuito puro).',
                vCalculated: 0,
                vNom: 0,
                iTotal: 0
            };
        }

        const rLoad = loadCard.r || 1;
        const vNom = loadCard.vNom || 12;
        const rTotal = rSeries + rLoad;

        // Corrente total da malha: I = V / R_total
        const iTotal = vIn / rTotal;

        // Tensão nos terminais do equipamento (Divisor de Tensão): V_equip = V_in * (R_load / R_total)
        const vCalculated = Number((vIn * (rLoad / rTotal)).toFixed(2));
        sector.vCalculated = vCalculated;

        // Tolerância de 5%
        const isNominal = Math.abs(vCalculated - vNom) <= 0.05;

        if (isNominal) {
            sector.status = 'energized';
            return {
                result: 'success',
                status: 'energized',
                title: '🟢 TENSÃO NOMINAL PERFEITA!',
                desc: `O equipamento [${loadCard.name}] recebeu exatamente ${vCalculated}V e acendeu com sucesso!`,
                vCalculated,
                vNom,
                rSeries,
                rLoad,
                iTotal: Number(iTotal.toFixed(2))
            };
        } else if (vCalculated > vNom) {
            // SOBRETENSÃO!
            if (hasFuse) {
                // Fusível absorve o impacto!
                sector.cards = sector.cards.filter(c => c.type !== 'fuse' && c.type !== 'gnd');
                return {
                    result: 'fuse_tripped',
                    status: 'blackout',
                    title: '🛡️ FUSÍVEL DESARMOU!',
                    desc: `Sobretensão de ${vCalculated}V detectada (Meta: ${vNom}V). O Fusível 1A queimou para proteger o equipamento! O ramo voltou ao estado aberto.`,
                    vCalculated,
                    vNom,
                    rSeries,
                    rLoad,
                    iTotal: Number(iTotal.toFixed(2))
                };
            } else {
                sector.status = 'overvoltage';
                return {
                    result: 'overvoltage',
                    status: 'overvoltage',
                    title: '💥 SOBRETENSÃO (QUEIMA DE EQUIPAMENTO)!',
                    desc: `Tensão de ${vCalculated}V ultrapassou a nominal de ${vNom}V sem proteção de fusível. O equipamento queimou!`,
                    vCalculated,
                    vNom,
                    rSeries,
                    rLoad,
                    iTotal: Number(iTotal.toFixed(2))
                };
            }
        } else {
            // SUBTENSÃO!
            return {
                result: 'undervoltage',
                status: 'undervoltage',
                title: '⚪ SUBTENSÃO (ENERGIA INSUFICIENTE)',
                desc: `Tensão de ${vCalculated}V é insuficiente para ativar [${loadCard.name}] (Meta: ${vNom}V). O ramo permaneceu desligado.`,
                vCalculated,
                vNom,
                rSeries,
                rLoad,
                iTotal: Number(iTotal.toFixed(2))
            };
        }
    }

    checkGameEnd() {
        const sectors = Object.values(this.gameState.board.sectors);
        const allEnergized = sectors.every(s => s.status === 'energized');

        if (allEnergized) {
            this.gameState.status = 'victory';
            this.log('🏆 VITÓRIA HEROICA! Todos os 4 setores da metrópole foram energizados com sucesso!');
            return;
        }

        const anyBurned = sectors.some(s => s.status === 'overvoltage');
        const deckEmpty = this.gameState.deck.length === 0;
        const allHandsEmpty = this.gameState.players.every(p => p.hand.length === 0);

        if (anyBurned || (deckEmpty && allHandsEmpty)) {
            this.gameState.status = 'game_over';
            this.log('💀 FIM DE JOGO (BLACKOUT TOTAL): A metrópole ficou sem energia.');
        }
    }

    advanceTurn() {
        if (this.gameState.status !== 'playing') return;
        this.gameState.currentTurnPlayerIndex = (this.gameState.currentTurnPlayerIndex + 1) % this.gameState.players.length;
        this.gameState.actionsRemaining = 1;
        const nextPlayer = this.gameState.players[this.gameState.currentTurnPlayerIndex];
        this.log(`➡️ Vez de ${nextPlayer.name}.`);
    }

    validateTurn(playerId) {
        if (this.gameState.status !== 'playing') throw new Error('A partida não está em andamento.');
        const currentPlayer = this.gameState.players[this.gameState.currentTurnPlayerIndex];
        if (currentPlayer.id !== playerId) throw new Error(`Não é o turno de ${this.getPlayer(playerId).name}. Aguarde sua vez.`);
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
        if (this.gameState.actionLogs.length > 50) {
            this.gameState.actionLogs.pop();
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzEngine };
}
