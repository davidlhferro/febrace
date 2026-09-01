/**
 * SUÍTE DE TESTES AUTOMATIZADOS — BANCADA DE PLAYTEST VOLTZ
 * Valida: Inicialização (0,0), Conexão Bandido, Lei de Ohm, Análise de Circuitos, Bot IA e Descarte.
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
console.log('🧪 SUÍTE DE TESTES — BANCADA DE PLAYTEST RÁPIDO VOLTZ');
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

// -------------------------------------------------------------
// TESTE 2: Mãos Iniciais dos Jogadores
// -------------------------------------------------------------
console.log('\n--- TESTE 2: Mão do Operador e do Bot ---');
assert(engine.players[0].hand.length === 3, 'O Operador deve receber exatamente 3 cartas na mão.');
assert(engine.players[1].hand.length === 3, 'O Bot de Teste deve receber exatamente 3 cartas na mão.');

// -------------------------------------------------------------
// TESTE 3: Validação de Conexão Rígida (Bandido)
// -------------------------------------------------------------
console.log('\n--- TESTE 3: Regras Topológicas de Bandido ---');
const cardStraight = {
    id: 'res_1ohm_straight',
    type: 'resistor',
    name: 'Resistor 1Ω',
    shape: 'STRAIGHT',
    basePorts: TOPOLOGY_SHAPES.STRAIGHT,
    r: 1
};

// 3.1 Posição ocupada
const vOccupied = engine.isValidPlacement(cardStraight, 0, 0, 0);
assert(!vOccupied.valid, 'Deve rejeitar posicionamento sobre (0,0) já ocupado.');

// 3.2 Carta isolada
const vIsolated = engine.isValidPlacement(cardStraight, 5, 5, 0);
assert(!vIsolated.valid, 'Deve rejeitar posicionamento isolado sem vizinhos.');

// 3.3 Conexão parede com cobre (Ilegal)
// Em (0, 1), a porta TOP do Straight a 0° é false (parede), mas a porta BOTTOM do gerador em (0,0) é true (cobre)
const vMismatch = engine.isValidPlacement(cardStraight, 0, 1, 0);
assert(!vMismatch.valid, 'Deve rejeitar conexão incompatível onde parede bate em trilha de cobre aberta.');

// 3.4 Conexão com rotação válida (90°)
// A 90°, a porta TOP do Straight vira left (true), encaixando perfeitamente na porta BOTTOM do gerador!
const vValid = engine.isValidPlacement(cardStraight, 0, 1, 90);
assert(vValid.valid, 'Deve aceitar conexão quando a carta é rotacionada a 90° e a trilha coincide.');

// -------------------------------------------------------------
// TESTE 4: Execução de Jogada e Compra de Carta
// -------------------------------------------------------------
console.log('\n--- TESTE 4: Jogada do Operador e Atualização de Estado ---');
const p1Card = engine.players[0].hand[0];
const slots = engine.getValidSlotsForCard(p1Card, 0);
assert(Array.isArray(slots), 'getValidSlotsForCard deve retornar um array de slots válidos.');

// Se a carta a 0° não couber, testa 90°
let targetSlot = slots[0];
let chosenRot = 0;
if (!targetSlot) {
    const slots90 = engine.getValidSlotsForCard(p1Card, 90);
    if (slots90.length > 0) {
        targetSlot = slots90[0];
        chosenRot = 90;
    }
}

if (targetSlot) {
    const playResult = engine.playCard('p1', targetSlot.x, targetSlot.y, p1Card.uid, chosenRot);
    assert(playResult.success, 'Jogada do Operador em slot válido deve ter sucesso.');
    assert(engine.players[0].hand.length === 3, 'O jogador deve recomprar automaticamente e manter 3 cartas.');
    assert(engine.turnIndex === 1, 'Após a jogada, o turno deve passar para o Bot de Teste.');
}

// -------------------------------------------------------------
// TESTE 5: Tomada de Decisão do Bot de Teste
// -------------------------------------------------------------
console.log('\n--- TESTE 5: Algoritmo de Decisão do Bot de Teste ---');
const botMove = engine.getBestBotMove();
if (botMove) {
    assert(!!botMove.cardUid, 'O Bot deve identificar a carta a ser jogada.');
    assert(typeof botMove.x === 'number' && typeof botMove.y === 'number', 'O Bot deve calcular coordenadas válidas.');
    const botResult = engine.playCard('p2', botMove.x, botMove.y, botMove.cardUid, botMove.rotation);
    assert(botResult.success, 'A jogada calculada pelo Bot deve ser executada com sucesso.');
    assert(engine.turnIndex === 0, 'Após o Bot jogar, o turno deve retornar ao Operador.');
} else {
    // Se não houver jogadas, testa o descarte
    const discarded = engine.discardAndPass('p2');
    assert(discarded, 'Se o Bot não tiver jogadas, deve descartar e comprar 3 cartas.');
    assert(engine.turnIndex === 0, 'O turno deve retornar ao Operador após o descarte.');
}

// -------------------------------------------------------------
// TESTE 6: Cálculo Eletrodinâmico (Ohm & Divisores de Tensão)
// -------------------------------------------------------------
console.log('\n--- TESTE 6: Verificação da Física (Lei de Ohm e GND) ---');
const testPhysicsEngine = new VoltzPlaytestEngine();

// Monta circuito em série na direção leste: Gerador (0,0) -> Resistor 2Ω (1,0) -> Servidor 4V (2,0) -> GND (3,0)
testPhysicsEngine.grid['1,0'] = {
    x: 1, y: 0,
    card: { id: 'res_2ohm', type: 'resistor', name: 'Resistor 2Ω', r: 2, currentPorts: { left: true, right: true } }
};
testPhysicsEngine.grid['2,0'] = {
    x: 2, y: 0,
    card: { id: 'load_servidor', type: 'equipment', name: 'Servidor 4V', vNom: 4, r: 1, currentPorts: { left: true, right: true } }
};
testPhysicsEngine.grid['3,0'] = {
    x: 3, y: 0,
    card: { id: 'gnd', type: 'gnd', name: 'Cabo Terra', currentPorts: { left: true } }
};

const analysis = testPhysicsEngine.analyzeCircuits();
const eastBranch = analysis.branches.find(b => b.direction === 'right');

assert(!!eastBranch, 'Deve identificar o ramo ativo conectado na saída leste do gerador.');
assert(eastBranch.isClosedGnd, 'O ramo deve ser reconhecido como fechado via Cabo Terra (GND).');
assert(eastBranch.rTotal === 3, 'A resistência total deve ser 2Ω (resistor) + 1Ω (servidor) = 3Ω.');
assert(eastBranch.iTheoretical === '4.00', 'A corrente deve ser I = 12V / 3Ω = 4.00A.');
assert(eastBranch.verdict === 'NOMINAL', 'O veredito deve ser NOMINAL (12V * (1/3) = 4V no servidor).');

// -------------------------------------------------------------
// TESTE 7: Renderização SVG sem Erros
// -------------------------------------------------------------
console.log('\n--- TESTE 7: Renderizador SVG de Alta Fidelidade ---');
const svgOutput = renderCardSVG(originCard.card, 0);
assert(svgOutput.includes('<svg') && svgOutput.includes('GERADOR 12V'), 'renderCardSVG deve gerar SVG válido para o Gerador.');

const svgResistor = renderCardSVG(cardStraight, 90);
assert(svgResistor.includes('<svg') && svgResistor.includes('1Ω'), 'renderCardSVG deve gerar SVG válido para Resistores.');

console.log('\n================================================================================');
console.log(`🎉 RESULTADO: ${passedTests} / ${totalTests} TESTES PASSARAM COM 100% DE SUCESSO!`);
console.log('================================================================================\n');
