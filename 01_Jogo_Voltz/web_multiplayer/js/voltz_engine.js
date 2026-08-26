/**
 * VOLTZ: CIRCUIT BREAK — Motor Canônico de Regras e Eletrodinâmica
 * Implementa 100% da física de divisores de tensão, Lei de Ohm e regras de turno.
 */

let getFullDeck = typeof generateFullDeck !== 'undefined' ? generateFullDeck : null;
if (!getFullDeck && typeof require !== 'undefined') {
    try {
        const cardsData = require('./voltz_cards_data.js');
        getFullDeck = cardsData.generateFullDeck;
    } catch (e) {}
}

class VoltzEngine {
    constructor() {
        this.resetGame();
    }

    resetGame() {
        this.gameState = {
            status: 'lobby', // 'lobby' | 'playing' | 'victory' | 'game_over'
            players: [],     // [{ id, name, hand: [], isHost, ready }]
            currentTurnPlayerIndex: 0,
            actionsRemaining: 2,
            deck: [],
            discardPile: [],
            board: {
                generator: { id: 'gen_12v', voltage: 12 },
                sectors: {
                    sector_hospital: { cards: [], status: 'blackout', name: 'Hospital Regional', vNom: 12, targetR: 4 },
                    sector_dados: { cards: [], status: 'blackout', name: 'Central de Dados', vNom: 4, targetR: 3 },
                    sector_agua: { cards: [], status: 'blackout', name: 'Tratamento de Água', vNom: 6, targetR: 4 },
                    sector_residencial: { cards: [], status: 'blackout', name: 'Rede Residencial', vNom: 3, targetR: 4 }
                }
            },
            actionLogs: [],
            lastGNDDiagnostic: null
        };
    }

    addPlayer(playerId, playerName, isHost = false) {
        const existing = this.gameState.players.find(p => p.id === playerId);
        if (existing) {
            existing.name = playerName;
            return existing;
        }
        if (this.gameState.players.length >= 4) {
            throw new Error('A sala já atingiu o limite máximo de 4 jogadores.');
        }
        const player = {
            id: playerId,
            name: playerName,
            hand: [],
            isHost: isHost || this.gameState.players.length === 0,
            ready: true
        };
        this.gameState.players.push(player);
        this.log(`${player.name} entrou na sala.`);
        return player;
    }

    removePlayer(playerId) {
        const idx = this.gameState.players.findIndex(p => p.id === playerId);
        if (idx !== -1) {
            const name = this.gameState.players[idx].name;
            this.gameState.players.splice(idx, 1);
            this.log(`${name} saiu da sala.`);
            if (this.gameState.currentTurnPlayerIndex >= this.gameState.players.length) {
                this.gameState.currentTurnPlayerIndex = 0;
            }
        }
    }

    startGame() {
        if (this.gameState.players.length < 1) {
            throw new Error('Necessário pelo menos 1 jogador para iniciar.');
        }

        // Embaralha o baralho completo de 53 cartas (excluindo Gerador central)
        const deckFn = getFullDeck || (typeof generateFullDeck !== 'undefined' ? generateFullDeck : null);
        const rawDeck = deckFn ? deckFn() : [];
        this.gameState.deck = this.shuffle(rawDeck);
        this.gameState.discardPile = [];
        this.gameState.status = 'playing';
        this.gameState.currentTurnPlayerIndex = 0;
        this.gameState.actionsRemaining = 2;

        // Distribui 3 cartas iniciais para cada jogador
        for (const player of this.gameState.players) {
            player.hand = [];
            for (let i = 0; i < 3; i++) {
                if (this.gameState.deck.length > 0) {
                    player.hand.push(this.gameState.deck.pop());
                }
            }
        }

        this.log('⚡ A PARTIDA COMEÇOU! O Gerador 12V foi ativado. Salvem os 4 setores da metrópole!');
        return this.gameState;
    }

    // AÇÃO: Jogar Carta da Mão em um dos Setores
    playCard(playerId, cardUid, sectorId) {
        this.validateTurn(playerId);
        const player = this.getPlayer(playerId);
        const cardIndex = player.hand.findIndex(c => c.uid === cardUid);
        if (cardIndex === -1) throw new Error('Carta não encontrada na mão do jogador.');

        const card = player.hand[cardIndex];
        const sector = this.gameState.board.sectors[sectorId];
        if (!sector) throw new Error('Setor inválido.');
        if (sector.status === 'energized') throw new Error('Este setor já foi energizado e salvo!');

        // Não permite adicionar cartas após o Cabo Terra já ter fechado o ramo sem teste
        const hasGND = sector.cards.some(c => c.type === 'gnd');
        if (hasGND) throw new Error('O ramo já possui um Cabo Terra conectado.');

        // Retira da mão e coloca no setor
        player.hand.splice(cardIndex, 1);
        sector.cards.push(card);
        this.gameState.actionsRemaining--;

        this.log(`${player.name} jogou [${card.name}] no Setor ${sector.name}. (Ações restantes: ${this.gameState.actionsRemaining})`);

        // Se a carta jogada foi o Cabo Terra (GND), dispara o diagnóstico automático de tensão!
        if (card.type === 'gnd') {
            const diag = this.diagnoseSector(sectorId);
            this.gameState.lastGNDDiagnostic = diag;
        }

        this.checkActionEnd(player);
        return this.gameState;
    }

    // AÇÃO: Descarte Ativo (Descarta até 2 cartas e compra o mesmo número)
    activeDiscard(playerId, cardUids) {
        this.validateTurn(playerId);
        const player = this.getPlayer(playerId);
        if (!Array.isArray(cardUids) || cardUids.length === 0 || cardUids.length > 2) {
            throw new Error('O Descarte Ativo permite descartar entre 1 e 2 cartas.');
        }

        for (const uid of cardUids) {
            const idx = player.hand.findIndex(c => c.uid === uid);
            if (idx !== -1) {
                const discarded = player.hand.splice(idx, 1)[0];
                this.gameState.discardPile.push(discarded);
                if (this.gameState.deck.length > 0) {
                    player.hand.push(this.gameState.deck.pop());
                }
            }
        }

        this.gameState.actionsRemaining--;
        this.log(`${player.name} realizou um Descarte Ativo (${cardUids.length} cartas renovadas).`);
        this.checkActionEnd(player);
        return this.gameState;
    }

    // Passar Turno Manualmente (ou quando as ações acabarem)
    endTurn(playerId) {
        this.validateTurn(playerId);
        this.advanceTurn();
        return this.gameState;
    }

    advanceTurn() {
        const prevPlayer = this.gameState.players[this.gameState.currentTurnPlayerIndex];
        this.gameState.currentTurnPlayerIndex = (this.gameState.currentTurnPlayerIndex + 1) % this.gameState.players.length;
        const nextPlayer = this.gameState.players[this.gameState.currentTurnPlayerIndex];
        this.gameState.actionsRemaining = 2;

        // Compra 2 cartas no início do turno (respeitando limite de 5 na mão)
        let drawn = 0;
        while (nextPlayer.hand.length < 5 && drawn < 2 && this.gameState.deck.length > 0) {
            nextPlayer.hand.push(this.gameState.deck.pop());
            drawn++;
        }

        this.log(`Turno finalizado. É a vez de ${nextPlayer.name}! (Comprou ${drawn} carta(s)).`);
        this.checkGameOverCondition();
    }

    checkActionEnd(player) {
        if (this.gameState.actionsRemaining <= 0) {
            this.advanceTurn();
        }
    }

    // ⚡ MOTOR DE FÍSICA & DIAGNÓSTICO DO CABO TERRA (GND)
    diagnoseSector(sectorId) {
        const sector = this.gameState.board.sectors[sectorId];
        const cards = sector.cards;
        const Vin = this.gameState.board.generator.voltage; // 12V

        // Encontra o equipamento de carga na linha
        const loadCard = cards.find(c => c.type === 'equipment');
        const hasFuse = cards.some(c => c.type === 'fuse');

        if (!loadCard) {
            return {
                sectorId,
                sectorName: sector.name,
                result: 'no_equipment',
                title: 'CIRCUITO SEM CARGA!',
                message: 'O circuito foi aterrado sem nenhum equipamento conectado (curto-circuito evitado pelo gerador).',
                color: '#64748b'
            };
        }

        // Calcula a resistência total do ramo em série
        let rTotal = 0;
        for (const c of cards) {
            if (c.r) {
                rTotal += c.r;
            }
        }

        if (rTotal <= 0) rTotal = 1;

        // Lei de Ohm / Divisor de Tensão: V_equip = Vin * (R_equip / R_total)
        const vCalculated = Vin * (loadCard.r / rTotal);
        const vNom = loadCard.vNom;

        // Arredondamento para 1 casa decimal
        const vEquipReal = Math.round(vCalculated * 10) / 10;

        let result = '';
        let title = '';
        let message = '';
        let color = '';

        if (Math.abs(vEquipReal - vNom) < 0.05) {
            // 🟢 SUCESSO: Voltagem Nominal Exata!
            result = 'success';
            title = '🟢 SUCESSO! SETOR ENERGIZADO!';
            message = `A voltagem sobre [${loadCard.name}] é exatamente ${vNom}V (${rTotal} blocos totais: 12V · ${loadCard.r}/${rTotal} = ${vNom}V). O setor foi salvo!`;
            color = '#059669';
            sector.status = 'energized';
            this.log(`🎉 VITÓRIA NO SETOR: ${sector.name} foi totalmente energizado!`);
            this.checkVictoryCondition();
        } else if (vEquipReal > vNom) {
            // 💥 SOBRETENSÃO: Corrente excessiva / resistência insuficiente
            result = 'overvoltage';
            title = '💥 SOBRETENSÃO! SOBRECARGA!';
            if (hasFuse) {
                message = `Tensão de ${vEquipReal}V excedeu o limite de ${vNom}V! O FUSÍVEL ESTOUROU e salvou o equipamento da destruição! (Remova o fusível queimado e ajuste os resistores).`;
                color = '#d97706';
                // Remove o fusível e o GND, mantendo o equipamento
                sector.cards = sector.cards.filter(c => c.type !== 'fuse' && c.type !== 'gnd');
                this.log(`⚠️ O Fusível protegeu o Setor ${sector.name} contra uma sobretensão de ${vEquipReal}V!`);
            } else {
                message = `Tensão de ${vEquipReal}V excedeu os ${vNom}V nominais! O equipamento QUEIMOU por excesso de corrente. As cartas do ramo foram para o descarte.`;
                color = '#dc2626';
                // Descarta todas as cartas do ramo
                this.gameState.discardPile.push(...sector.cards);
                sector.cards = [];
                this.log(`💥 SOBRETENSÃO no Setor ${sector.name}: Equipamento queimou com ${vEquipReal}V!`);
            }
        } else {
            // ⚪ SUBTENSÃO: Tensão insuficiente
            result = 'undervoltage';
            title = '⚪ SUBTENSÃO! TENSÃO INSUFICIENTE';
            message = `A tensão de ${vEquipReal}V foi insuficiente para ligar [${loadCard.name}] (exige ${vNom}V). O ramo possui resistores em excesso (${rTotal} blocos). O Cabo Terra foi removido para correção.`;
            color = '#475569';
            // Remove apenas o Cabo Terra para a equipe ajustar os blocos
            sector.cards = sector.cards.filter(c => c.type !== 'gnd');
            this.log(`⚪ SUBTENSÃO no Setor ${sector.name}: ${vEquipReal}V recebidos (necessário ${vNom}V).`);
        }

        return {
            sectorId,
            sectorName: sector.name,
            equipmentName: loadCard.name,
            vNom,
            vCalculated: vEquipReal,
            rTotal,
            rEquip: loadCard.r,
            result,
            title,
            message,
            color
        };
    }

    checkVictoryCondition() {
        const allSaved = Object.values(this.gameState.board.sectors).every(s => s.status === 'energized');
        if (allSaved) {
            this.gameState.status = 'victory';
            this.log('🏆 VITÓRIA COLETIVA TOTAL! A equipe restabeleceu com sucesso os 4 setores da metrópole!');
        }
    }

    checkGameOverCondition() {
        if (this.gameState.deck.length === 0 && this.gameState.status === 'playing') {
            const allSaved = Object.values(this.gameState.board.sectors).every(s => s.status === 'energized');
            if (!allSaved) {
                this.gameState.status = 'game_over';
                this.log('💀 O baralho de contingência se esgotou antes que todos os setores fossem salvos. Blecaute permanente!');
            }
        }
    }

    validateTurn(playerId) {
        if (this.gameState.status !== 'playing') {
            throw new Error('A partida não está em andamento.');
        }
        const currentPlayer = this.gameState.players[this.gameState.currentTurnPlayerIndex];
        if (!currentPlayer || currentPlayer.id !== playerId) {
            throw new Error(`Não é sua vez de jogar! Aguarde o turno de ${currentPlayer ? currentPlayer.name : 'outro jogador'}.`);
        }
    }

    getPlayer(playerId) {
        const p = this.gameState.players.find(p => p.id === playerId);
        if (!p) throw new Error('Jogador não encontrado.');
        return p;
    }

    log(message) {
        const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        this.gameState.actionLogs.unshift({ time, message });
        if (this.gameState.actionLogs.length > 50) this.gameState.actionLogs.pop();
    }

    shuffle(array) {
        const a = [...array];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzEngine };
}
