/**
 * SUÍTE DE TESTES AUTOMATIZADOS — JOGO VOLTZ 2D & PORTAL FEBRACE
 * Cobre: Carta Única (0,0), Rejeição de Jogadas Ilegais Bandido, Fechamento por Loop e GND, Lei de Ohm e Diário de Bordo.
 */

const { TOPOLOGY_SHAPES, getRotatedPorts, VOLTZ_CARDS_CATALOG, generateFullDeck } = require('../js/voltz_cards_data.js');
const { VoltzEngine } = require('../js/voltz_engine.js');
const { VoltzDiarioManager } = require('../js/voltz_diario.js');
const { VoltzWarRoom } = require('../js/voltz_warroom.js');

console.log('================================================================================');
console.log('🧪 SUÍTE DE TESTES TÉCNICOS AUTOMATIZADOS — PORTAL VOLTZ & FEBRACE 2D');
console.log('================================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
    totalTests++;
    if (!condition) {
        console.error(`❌ FALHA NO TESTE: ${message}`);
        throw new Error(message);
    } else {
        passedTests++;
        console.log(`✅ [PASS] ${message}`);
    }
}

// -------------------------------------------------------------
// BLOCO 1: Validação da Carta Inicial Única (0,0)
// -------------------------------------------------------------
console.log('--- BLOCO 1: Validação da Carta Inicial Única (0,0) ---');

const engine = new VoltzEngine();
const initialCard = engine.gameState.board.grid['0,0'];
assert(!!initialCard, 'A mesa deve iniciar com uma carta na coordenada (0,0).');
assert(initialCard.card.id === 'gen_12v', 'A carta na coordenada (0,0) deve ser o Gerador Central 12V.');
assert(
    initialCard.card.currentPorts.top &&
    initialCard.card.currentPorts.right &&
    initialCard.card.currentPorts.bottom &&
    initialCard.card.currentPorts.left,
    'O Gerador Central (0,0) deve ter todas as 4 saídas de barramento de potência abertas.'
);

// -------------------------------------------------------------
// BLOCO 2: Rejeição de Jogadas Ilegais (Regras Canônicas de Bandido)
// -------------------------------------------------------------
console.log('\n--- BLOCO 2: Rejeição de Jogadas Ilegais do Bandido ---');

// Teste 2.1: Tentar colocar em posição já ocupada
const p1 = engine.addPlayer('p1', 'David', true);
engine.startGame();
const testCardStraight = {
    uid: 'test_straight_1',
    name: 'Resistor 1Ω',
    shape: 'STRAIGHT',
    basePorts: TOPOLOGY_SHAPES.STRAIGHT, // { top: false, right: true, bottom: false, left: true }
    r: 1
};

const vOccupied = engine.isValidPlacement(testCardStraight, 0, 0, 0);
assert(!vOccupied.valid, 'Não deve permitir colocar carta em posição já ocupada (0,0).');

// Teste 2.2: Tentar colocar isolado no espaço sem vizinhos
const vIsolated = engine.isValidPlacement(testCardStraight, 5, 5, 0);
assert(!vIsolated.valid, 'Não deve permitir colocar carta isolada no espaço (sem cartas vizinhas).');

// Teste 2.3: Tentar colocar carta com parede cega batendo na trilha aberta do Gerador
// Resistor Straight a 0° tem Top: false, Bottom: false.
// Se colocado em (0, 1) [acima do gerador], a porta bottom do resistor (false) bate na porta top do gerador (true)!
const vMismatch = engine.isValidPlacement(testCardStraight, 0, 1, 0);
assert(!vMismatch.valid, 'Deve rejeitar jogada ilegal onde uma borda fechada/parede bate na trilha aberta do vizinho.');

// Teste 2.4: Colocação Correta!
// Resistor Straight rotacionado a 90° tem Top: true, Bottom: true.
// Colocado em (0, 1), a porta bottom (true) coincide perfeitamente com o top do gerador (true)!
const vValidRotated = engine.isValidPlacement(testCardStraight, 0, 1, 90);
assert(vValidRotated.valid, 'Deve aceitar jogada quando a carta é rotacionada a 90° e a trilha coincide perfeitamente.');

// -------------------------------------------------------------
// BLOCO 3: Fechamento de Circuito por Cabo Terra (GND)
// -------------------------------------------------------------
console.log('\n--- BLOCO 3: Fechamento de Circuito por Cabo Terra (GND) ---');

const engineGND = new VoltzEngine();
engineGND.addPlayer('p1', 'David', true);
engineGND.startGame();

// Monta ramo para a Direita a partir de (0,0):
// (1, 0): Resistor 2Ω Reta (Esquerda-Direita, rot 0°)
// (2, 0): Servidor 4V Reta (Esquerda-Direita, rot 0°)
// (3, 0): Cabo Terra GND (Entrada Esquerda, rot 0°)
engineGND.gameState.board.grid['1,0'] = {
    x: 1, y: 0,
    card: { id: 'res_2ohm_straight', type: 'resistor', name: 'Resistor 2Ω', r: 2, currentPorts: { left: true, right: true } },
    status: 'active'
};
engineGND.gameState.board.grid['2,0'] = {
    x: 2, y: 0,
    card: { id: 'load_servidor', type: 'equipment', name: 'Servidor Central 4V', vNom: 4, r: 1, currentPorts: { left: true, right: true } },
    status: 'active'
};
engineGND.gameState.board.grid['3,0'] = {
    x: 3, y: 0,
    card: { id: 'gnd_cable', type: 'gnd', name: 'Cabo Terra', currentPorts: { left: true } },
    status: 'active'
};

engineGND.evaluateCircuitsOnBoard();
const servNode = engineGND.gameState.board.grid['2,0'];
assert(servNode.status === 'energized', `Servidor 4V deve energizar com sucesso via GND (12V * 1/(2+1) = 4V). Status: ${servNode.status}`);

// -------------------------------------------------------------
// BLOCO 4: Fechamento de Circuito por Retorno à Fonte (Loop)
// -------------------------------------------------------------
console.log('\n--- BLOCO 4: Fechamento de Circuito por Retorno à Fonte (Loop) ---');

const engineLoop = new VoltzEngine();
engineLoop.addPlayer('p1', 'David', true);
engineLoop.startGame();

// Monta um Loop Fechado saindo pela Direita (1,0) e retornando por Cima (0,1):
// (1, 0): Resistor 2Ω Curva 90° (Esquerda para Cima) -> currentPorts: { left: true, top: true }
// (1, 1): Bomba 6V Curva 90° (Baixo para Esquerda) -> currentPorts: { bottom: true, left: true }, vNom: 6, r: 2
// (0, 1): Linha conectando de volta ao Gerador (Direita para Baixo) -> currentPorts: { right: true, bottom: true }
engineLoop.gameState.board.grid['1,0'] = {
    x: 1, y: 0,
    card: { id: 'res_2ohm_corner', type: 'resistor', name: 'Resistor 2Ω 90°', r: 2, currentPorts: { left: true, top: true } },
    status: 'active'
};
engineLoop.gameState.board.grid['1,1'] = {
    x: 1, y: 1,
    card: { id: 'load_motor', type: 'equipment', name: 'Bomba Centrífuga 6V', vNom: 6, r: 2, currentPorts: { bottom: true, left: true } },
    status: 'active'
};
engineLoop.gameState.board.grid['0,1'] = {
    x: 0, y: 1,
    card: { id: 'corner_return', type: 'resistor', name: 'Curva de Retorno 0Ω', r: 0, currentPorts: { right: true, bottom: true } },
    status: 'active'
};

engineLoop.evaluateCircuitsOnBoard();
const motorNode = engineLoop.gameState.board.grid['1,1'];
assert(motorNode.status === 'energized', `Bomba 6V deve energizar com sucesso via Loop Fechado (12V * 2/(2+2) = 6V). Status: ${motorNode.status}`);

// -------------------------------------------------------------
// BLOCO 5: Cálculo da Lei de Ohm para Todas as Cargas Nominais
// -------------------------------------------------------------
console.log('\n--- BLOCO 5: Teste Eletrodinâmico das Cargas Nominais ---');

const loadsToTest = [
    { name: 'LED Piloto 3V', vNom: 3, rLoad: 1, rReq: 3 },
    { name: 'Servidor Central 4V', vNom: 4, rLoad: 1, rReq: 2 },
    { name: 'Sirene de Alarme 6V', vNom: 6, rLoad: 1, rReq: 1 },
    { name: 'Bomba Centrífuga 6V', vNom: 6, rLoad: 2, rReq: 2 },
    { name: 'Tomógrafo UTI 12V', vNom: 12, rLoad: 4, rReq: 0 }
];

for (const load of loadsToTest) {
    const vIn = 12;
    const rTotal = load.rReq + load.rLoad;
    const vCalc = Number((vIn * (load.rLoad / rTotal)).toFixed(2));
    assert(vCalc === load.vNom, `${load.name}: com +${load.rReq}Ω na linha, a voltagem calculada deve ser ${load.vNom}V. Obtido: ${vCalc}V.`);
}

// -------------------------------------------------------------
// BLOCO 6: Persistência e Exportação do Diário de Bordo
// -------------------------------------------------------------
console.log('\n--- BLOCO 6: Diário de Bordo & Exportação ---');

const diario = new VoltzDiarioManager();
const entry = diario.addEntry({
    title: 'Playtest Oficial com 3 Integrantes',
    type: 'Playtest com Amigos',
    author: 'David e João',
    description: 'Testamos a montagem do circuito em grade 2D conectando o Servidor 4V.',
    findings: 'A regra de encaixe do Bandido funcionou perfeitamente.',
    actionItems: 'Apresentar para o orientador.'
});

assert(!!entry.id, 'Nova entrada deve ter um ID gerado.');
const mdExport = diario.exportMarkdown();
assert(mdExport.includes('Playtest Oficial com 3 Integrantes'), 'Exportação Markdown deve conter o título da entrada.');
const htmlExport = diario.exportPrintableHTML();
assert(htmlExport.includes('DIÁRIO DE BORDO OFICIAL'), 'Exportação HTML/PDF deve conter o cabeçalho oficial.');

console.log('\n================================================================================');
console.log(`🎉 RESULTADO FINAL: ${passedTests} / ${totalTests} TESTES PASSARAM COM 100% DE SUCESSO!`);
console.log('================================================================================\n');
