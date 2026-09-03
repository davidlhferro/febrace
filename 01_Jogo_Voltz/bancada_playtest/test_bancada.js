/**
 * SUÍTE DE TESTES AUTOMATIZADOS — BANCADA DE PLAYTEST VOLTZ
 * Verificações Mandatórias:
 * 1. Inicialização (0,0) e Baralho
 * 2. Regras Topológicas de Bandido
 * 3. Teste de Não-Perda de Vida: Jogar 5 resistores normais em ramos abertos (Vidas permanecem 3/3)
 * 4. Teste de Punição Única (One-Shot Penalty): Fechar em sobretensão perde 1 vida, jogadas seguintes NÃO perdem vida
 * 5. Teste de Inteligência do Bot (Prevenção de Curto e Fechamento com Sucesso Nominal)
 * 6. Simulação de 10 Turnos Contínuos
 * 7. Renderizador SVG
 */

const {
    TOPOLOGY_SHAPES,
    getRotatedPorts,
    CARDS_CATALOG,
    generateFullDeck,
    VoltzPlaytestEngine,
    renderCardSVG
} = require('./game.js');

console.log('================================================================================');
console.log('🧪 SUÍTE DE TESTES DE ALTA PRECISÃO — BANCADA DE PLAYTEST VOLTZ');
console.log('================================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
    totalTests++;
    if (!condition) {
        console.error(`❌ FALHA: ${message}`);
        throw new Error(message);
    } else {
        passedTests++;
        console.log(`✅ [PASS] ${message}`);
    }
}

// -------------------------------------------------------------
// TESTE 1: Inicialização da Mesa na Origem (0,0)
// -------------------------------------------------------------
console.log('--- TESTE 1: Origem e Gerador 12V ---');
const engine = new VoltzPlaytestEngine();
const originCard = engine.grid['0,0'];

assert(!!originCard, 'A bancada deve inicializar com uma carta em (0,0).');
assert(originCard.card.id === 'gen_12v', 'A carta em (0,0) deve ser o Gerador Central 12V.');
assert(
    originCard.card.currentPorts.top &&
    originCard.card.currentPorts.right &&
    originCard.card.currentPorts.bottom &&
    originCard.card.currentPorts.left,
    'O Gerador Central deve possuir todas as 4 portas de barramento de cobre abertas.'
);
assert(engine.deck.length === 71 - 6, 'O baralho deve ter distribuído 3 cartas para cada jogador (restando 65 cartas).');
assert(engine.networkLives === 3, 'A partida deve iniciar com exatamente 3 vidas da rede.');

// -------------------------------------------------------------
// TESTE 2: Regras Topológicas de Bandido
// -------------------------------------------------------------
console.log('\n--- TESTE 2: Regras Topológicas de Bandido ---');
const cardStraight = {
    id: 'res_1ohm_straight',
    type: 'resistor',
    name: 'Resistor 1Ω (Reta)',
    shape: 'STRAIGHT',
    basePorts: TOPOLOGY_SHAPES.STRAIGHT,
    r: 1
};

// 2.1 Posição ocupada
const vOccupied = engine.isValidPlacement(cardStraight, 0, 0, 0);
assert(!vOccupied.valid, 'Deve rejeitar posicionamento sobre (0,0) já ocupado.');

// 2.2 Carta isolada
const vIsolated = engine.isValidPlacement(cardStraight, 5, 5, 0);
assert(!vIsolated.valid, 'Deve rejeitar posicionamento isolado sem vizinhos.');

// 2.3 Conexão incompatível (Parede contra Cobre)
const vMismatch = engine.isValidPlacement(cardStraight, 0, 1, 0);
assert(!vMismatch.valid, 'Deve rejeitar conexão incompatível onde parede bate em trilha de cobre aberta.');

// 2.4 Conexão com rotação válida (90°)
const vValid = engine.isValidPlacement(cardStraight, 0, 1, 90);
assert(vValid.valid, 'Deve aceitar conexão quando a carta é rotacionada a 90° e a trilha coincide.');

// -------------------------------------------------------------
// TESTE 3: NÃO-PERDA DE VIDA EM JOGADAS INTERMEDIÁRIAS
// -------------------------------------------------------------
console.log('\n--- TESTE 3: Não-Perda de Vida em Jogadas Intermediárias em Ramos Abertos ---');
const openPlayEngine = new VoltzPlaytestEngine();

// Vamos jogar 5 cartas consecutivas expandindo trilhas abertas
const movesToPlay = [
    { x: 1, y: 0, rot: 0, card: { id: 'res_1', type: 'resistor', name: 'Resistor 1Ω', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 1 } },
    { x: 2, y: 0, rot: 0, card: { id: 'res_2', type: 'resistor', name: 'Resistor 2Ω', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 2 } },
    { x: 3, y: 0, rot: 0, card: { id: 'res_3', type: 'resistor', name: 'Resistor 3Ω', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 3 } },
    { x: 0, y: -1, rot: 90, card: { id: 'res_4', type: 'resistor', name: 'Resistor 1Ω Norte', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 1 } },
    { x: 0, y: -2, rot: 90, card: { id: 'res_5', type: 'resistor', name: 'Resistor 2Ω Norte', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 2 } }
];

movesToPlay.forEach((m, idx) => {
    // Força carta na mão do jogador 1
    const uid = `card_test_open_${idx}`;
    openPlayEngine.players[0].hand[0] = { ...m.card, uid };
    const res = openPlayEngine.playCard('p1', m.x, m.y, uid, m.rot);
    assert(res.success, `Jogada intermediária ${idx + 1} em (${m.x}, ${m.y}) deve ser bem sucedida.`);
    assert(openPlayEngine.networkLives === 3, `Após jogada ${idx + 1} em ramo aberto, as vidas devem permanecer em exatamente 3 (Atual: ${openPlayEngine.networkLives}).`);
});

// -------------------------------------------------------------
// TESTE 4: PUNIÇÃO ÚNICA (ONE-SHOT PENALTY) CONTRA SOBRETENSÃO
// -------------------------------------------------------------
console.log('\n--- TESTE 4: Punição Única (One-Shot Penalty) no Fechamento ---');
const penaltyEngine = new VoltzPlaytestEngine();

// Passo 4.1: Fechar o ramo Sul em Curto de 0Ω (GND direto no gerador a 90° em 0,1)
const gndShortCard = { id: 'gnd_short', type: 'gnd', name: 'Cabo Terra', shape: 'DEAD_END', basePorts: TOPOLOGY_SHAPES.DEAD_END, r: 0, uid: 'gnd_short_uid' };
penaltyEngine.players[0].hand[0] = gndShortCard;

// A 90°, a porta left do DEAD_END aponta para TOP (encaixa em 0,1 no bottom do gerador)
const gndResult = penaltyEngine.playCard('p1', 0, 1, 'gnd_short_uid', 90);
assert(gndResult.success, 'Deve aceitar posicionar o GND fechando o ramo Sul.');
assert(penaltyEngine.networkLives === 2, `O fechamento em curto de 0Ω deve subtrair exatamente 1 vida (Vidas atuais: ${penaltyEngine.networkLives}).`);

// Passo 4.2: Realizar 3 jogadas normais subsequentes no ramo Leste
const nextMoves = [
    { x: 1, y: 0, rot: 0, card: { id: 'res_e1', type: 'resistor', name: 'Resistor 1Ω', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 1 } },
    { x: 2, y: 0, rot: 0, card: { id: 'res_e2', type: 'resistor', name: 'Resistor 2Ω', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 2 } },
    { x: 3, y: 0, rot: 0, card: { id: 'res_e3', type: 'resistor', name: 'Resistor 3Ω', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 3 } }
];

nextMoves.forEach((m, idx) => {
    const uid = `card_next_${idx}`;
    penaltyEngine.players[0].hand[0] = { ...m.card, uid };
    const res = penaltyEngine.playCard('p1', m.x, m.y, uid, m.rot);
    assert(res.success, `Jogada subsequente ${idx + 1} em (${m.x}, ${m.y}) deve ser bem sucedida.`);
    assert(penaltyEngine.networkLives === 2, `BUG PREVENIDO: A jogada seguinte ${idx + 1} NÃO deve perder vidas novamente (Vidas mantidas em 2).`);
});

// -------------------------------------------------------------
// TESTE 5: INTELIGÊNCIA DO BOT (PREVENÇÃO DE CURTO & FECHAMENTO COM SUCESSO)
// -------------------------------------------------------------
console.log('\n--- TESTE 5: Inteligência Estratégica do Bot de Teste ---');
const botEngine = new VoltzPlaytestEngine();

// Cenário 5.1: Bot tem na mão apenas uma carta de GND que causaria curto-circuito em (0,1)
botEngine.players[1].hand = [
    { id: 'gnd_suicide', type: 'gnd', name: 'Cabo Terra', shape: 'DEAD_END', basePorts: TOPOLOGY_SHAPES.DEAD_END, r: 0, uid: 'bot_gnd_danger' }
];

const suicidalMove = botEngine.getBestBotMove();
assert(suicidalMove === null, 'O Bot inteligente DEVE REJEITAR jogadas de GND que resultem em curto de 0Ω (Score -1000).');

// Como o movimento é nulo, o Bot descarta com segurança
const discardSuccess = botEngine.discardAndPass('p2');
assert(discardSuccess, 'O Bot deve realizar descarte consciente quando todas as cartas forem perigosas.');
assert(botEngine.networkLives === 3, 'O descarte do Bot preserva 100% das 3 vidas.');

// Cenário 5.2: Montar um circuito quase fechado no ramo Leste que necessita de GND para salvar um Servidor 4V
// Gerador (0,0) -> Resistor 2Ω (1,0) -> Servidor 4V 1Ω (2,0) -> Slot livre em (3,0)
botEngine.grid['1,0'] = {
    x: 1, y: 0,
    card: { id: 'res_2', type: 'resistor', name: 'Resistor 2Ω', r: 2, currentPorts: { left: true, right: true } }
};
botEngine.grid['2,0'] = {
    x: 2, y: 0,
    card: { id: 'load_servidor', type: 'equipment', name: 'Servidor Central', vNom: 4, r: 1, currentPorts: { left: true, right: true } }
};

// Coloca na mão do Bot uma carta GND e um Resistor qualquer
botEngine.players[1].hand = [
    { id: 'gnd_win', type: 'gnd', name: 'Cabo Terra', shape: 'DEAD_END', basePorts: TOPOLOGY_SHAPES.DEAD_END, r: 0, uid: 'bot_gnd_winner' },
    { id: 'res_1', type: 'resistor', name: 'Resistor 1Ω', shape: 'STRAIGHT', basePorts: TOPOLOGY_SHAPES.STRAIGHT, r: 1, uid: 'bot_res_alt' }
];

const smartMove = botEngine.getBestBotMove();
assert(!!smartMove, 'O Bot deve encontrar o melhor movimento estratégico disponível.');
assert(smartMove.cardUid === 'bot_gnd_winner', 'O Bot deve escolher a carta de GND para finalizar o aparelho.');
assert(smartMove.x === 3 && smartMove.y === 0, 'O Bot deve posicionar o GND exatamente em (3, 0).');
assert(smartMove.rotation === 0, 'O Bot deve usar rotação 0° (porta left conectando na saída right do servidor).');

// Executa a jogada do Bot
const botPlayResult = botEngine.playCard('p2', smartMove.x, smartMove.y, smartMove.cardUid, smartMove.rotation);
assert(botPlayResult.success, 'A jogada do Bot deve ser executada com sucesso.');
assert(botEngine.networkLives === 3, 'Nenhuma vida deve ser perdida no fechamento nominal de 4V.');
assert(botEngine.savedEquipments === 1, 'O aparelho Servidor Central deve ser contabilizado como salvo.');

// -------------------------------------------------------------
// TESTE 6: SIMULAÇÃO DE 10 TURNOS CONTÍNUOS
// -------------------------------------------------------------
console.log('\n--- TESTE 6: Simulação de 10 Turnos Alternados (Operador vs Bot) ---');
const simEngine = new VoltzPlaytestEngine();
let turnsCompleted = 0;

for (let t = 0; t < 10; t++) {
    const curPlayerId = simEngine.turnIndex === 0 ? 'p1' : 'p2';
    const curPlayer = simEngine.players[simEngine.turnIndex];

    if (curPlayerId === 'p1') {
        // Operador tenta jogar a primeira carta segura ou descarta
        let played = false;
        for (const card of curPlayer.hand) {
            for (const rot of [0, 90, 180, 270]) {
                const slots = simEngine.getValidSlotsForCard(card, rot);
                if (slots.length > 0) {
                    const res = simEngine.playCard('p1', slots[0].x, slots[0].y, card.uid, rot);
                    if (res.success) {
                        played = true;
                        break;
                    }
                }
            }
            if (played) break;
        }
        if (!played) {
            simEngine.discardAndPass('p1');
        }
    } else {
        // Bot usa algoritmo de simulação heurística
        const move = simEngine.getBestBotMove();
        if (move) {
            simEngine.playCard('p2', move.x, move.y, move.cardUid, move.rotation);
        } else {
            simEngine.discardAndPass('p2');
        }
    }
    turnsCompleted++;
}

assert(turnsCompleted === 10, 'A simulação deve completar 10 turnos contínuos sem travar ou quebrar o estado.');
assert(simEngine.players[0].hand.length === 3, 'O Operador deve terminar com exatamente 3 cartas.');
assert(simEngine.players[1].hand.length === 3, 'O Bot deve terminar com exatamente 3 cartas.');

// -------------------------------------------------------------
// TESTE 7: Renderizador SVG de Alta Fidelidade
// -------------------------------------------------------------
console.log('\n--- TESTE 7: Renderizador SVG ---');
const svgGen = renderCardSVG(originCard.card, 0);
assert(svgGen.includes('<svg') && svgGen.includes('GERADOR 12V'), 'renderCardSVG deve gerar SVG válido para o Gerador.');

const svgRes = renderCardSVG(cardStraight, 90);
assert(svgRes.includes('<svg') && svgRes.includes('1Ω'), 'renderCardSVG deve gerar SVG válido para Resistores.');

console.log('\n================================================================================');
console.log(`🎉 SUCESSO TOTAL: ${passedTests} / ${totalTests} TESTES PASSARAM COM 100% DE APROVAÇÃO!`);
console.log('================================================================================\n');
