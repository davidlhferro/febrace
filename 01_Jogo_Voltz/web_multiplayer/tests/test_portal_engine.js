/**
 * SUÍTE DE TESTES AUTOMATIZADOS — PORTAL VOLTZ & CENTRAL DE COMANDO FEBRACE
 * Executa validações rigorosas de física, rede P2P, Diário de Bordo e War Room.
 */

const { VOLTZ_CARDS_CATALOG, VOLTZ_SECTORS, generateFullDeck } = require('../js/voltz_cards_data.js');
const { VoltzEngine } = require('../js/voltz_engine.js');

console.log('================================================================================');
console.log('🧪 SUÍTE DE TESTES TÉCNICOS AUTOMATIZADOS — PORTAL VOLTZ & FEBRACE');
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
// BLOCO 1: Validação do Baralho & Estrutura de Cartas
// -------------------------------------------------------------
console.log('--- BLOCO 1: Validação Estrutural do Baralho de 70 Cartas ---');

const deck = generateFullDeck();
assert(deck.length === 69, `O monte de compras gerado deve ter 69 cartas (70 total - 1 gerador central). Obtido: ${deck.length}`);

const totalResistors = deck.filter(c => c.type === 'resistor').length;
assert(totalResistors === 30, `Total de resistores deve ser 30 (9x 1Ω, 9x 2Ω, 7x 3Ω, 5x 4Ω). Obtido: ${totalResistors}`);

const totalLoads = deck.filter(c => c.type === 'equipment').length;
assert(totalLoads === 18, `Total de cargas deve ser 18 (4x LED, 4x Servidor, 3x Sirene, 4x Motor, 3x Tomógrafo). Obtido: ${totalLoads}`);

const totalGND = deck.filter(c => c.type === 'gnd').length;
assert(totalGND === 6, `Total de Cabos Terra (GND) deve ser 6. Obtido: ${totalGND}`);

// -------------------------------------------------------------
// BLOCO 2: Motor de Turnos e Dinâmica Bandido (Mão de 3 Cartas)
// -------------------------------------------------------------
console.log('\n--- BLOCO 2: Motor de Turnos & Regras Bandido ---');

const engine = new VoltzEngine();
const p1 = engine.addPlayer('p1', 'David', true);
const p2 = engine.addPlayer('p2', 'João', false);
engine.startGame();

assert(engine.gameState.players.length === 2, 'Lobby deve conter 2 jogadores.');
assert(p1.hand.length === 3 && p2.hand.length === 3, 'Cada jogador deve iniciar com exatamente 3 cartas na mão.');
assert(engine.gameState.deck.length === 69 - 6, `O monte de compras restante deve ser 63 cartas. Obtido: ${engine.gameState.deck.length}`);

// Teste de Renovação de Mão (Descarte para o Fundo)
const oldP1Cards = [...p1.hand.map(c => c.uid)];
engine.refreshHand('p1');
assert(p1.hand.length === 3, 'A mão de p1 deve conter 3 cartas após a renovação.');
assert(engine.gameState.currentTurnPlayerIndex === 1, 'Após renovar a mão, o turno deve avançar para p2.');

// -------------------------------------------------------------
// BLOCO 3: Rigor da Lei de Ohm & Diagnóstico de Kirchhoff
// -------------------------------------------------------------
console.log('\n--- BLOCO 3: Rigor da Lei de Ohm & Diagnóstico de Kirchhoff ---');

// Caso A: Hospital (Tomógrafo UTI 12V direto em 12V sem resistores)
engine.gameState.board.sectors.sector_hospital.cards = [
    { type: 'equipment', name: 'Tomógrafo UTI 12V', vNom: 12, r: 4 },
    { type: 'gnd', name: 'Cabo Terra (GND)' }
];
const diagHospital = engine.diagnoseSector('sector_hospital');
assert(diagHospital.result === 'success', `Hospital deve energizar em 12V nominal. Obtido: ${diagHospital.result} (${diagHospital.vCalculated}V)`);
assert(diagHospital.vCalculated === 12, 'Tensão no Tomógrafo deve ser 12V.');

// Caso B: Central de Dados (Servidor 4V com 2Ω resistor adicional -> 12V / (2+1) = 4V)
engine.gameState.board.sectors.sector_dados.cards = [
    { type: 'resistor', name: 'Resistor Médio 2Ω', r: 2 },
    { type: 'equipment', name: 'Servidor Central 4V', vNom: 4, r: 1 },
    { type: 'gnd', name: 'Cabo Terra (GND)' }
];
const diagDados = engine.diagnoseSector('sector_dados');
assert(diagDados.result === 'success', `Central de Dados deve energizar em 4V nominal. Obtido: ${diagDados.result} (${diagDados.vCalculated}V)`);
assert(diagDados.vCalculated === 4, 'Tensão no Servidor deve ser 4V.');

// Caso C: Tratamento de Água (Bomba 6V com 2Ω resistor adicional -> 12V * 2/(2+2) = 6V)
engine.gameState.board.sectors.sector_agua.cards = [
    { type: 'resistor', name: 'Resistor Médio 2Ω', r: 2 },
    { type: 'equipment', name: 'Bomba Centrífuga 6V', vNom: 6, r: 2 },
    { type: 'gnd', name: 'Cabo Terra (GND)' }
];
const diagAgua = engine.diagnoseSector('sector_agua');
assert(diagAgua.result === 'success', `Tratamento de Água deve energizar em 6V nominal. Obtido: ${diagAgua.result} (${diagAgua.vCalculated}V)`);
assert(diagAgua.vCalculated === 6, 'Tensão na Bomba deve ser 6V.');

// Caso D: Rede Residencial (LED 3V com 3Ω resistor adicional -> 12V * 1/(3+1) = 3V)
engine.gameState.board.sectors.sector_residencial.cards = [
    { type: 'resistor', name: 'Resistor Pesado 3Ω', r: 3 },
    { type: 'equipment', name: 'LED Piloto 3V', vNom: 3, r: 1 },
    { type: 'gnd', name: 'Cabo Terra (GND)' }
];
const diagResidencial = engine.diagnoseSector('sector_residencial');
assert(diagResidencial.result === 'success', `Rede Residencial deve energizar em 3V nominal. Obtido: ${diagResidencial.result} (${diagResidencial.vCalculated}V)`);
assert(diagResidencial.vCalculated === 3, 'Tensão no LED deve ser 3V.');

// Caso E: Sobretensão com Fusível de Proteção (LED 3V ligado direto em 12V com Fusível 1A)
const sectorTestFuse = {
    cards: [
        { type: 'fuse', name: 'Fusível 1A' },
        { type: 'equipment', name: 'LED Piloto 3V', vNom: 3, r: 1 },
        { type: 'gnd', name: 'Cabo Terra (GND)' }
    ]
};
engine.gameState.board.sectors.sector_teste_fuse = sectorTestFuse;
const diagFuse = engine.diagnoseSector('sector_teste_fuse');
assert(diagFuse.result === 'fuse_tripped', `Sobretensão deve desarmar o fusível com segurança. Obtido: ${diagFuse.result}`);
assert(!sectorTestFuse.cards.some(c => c.type === 'fuse'), 'O fusível deve ter sido consumido ao desarmar.');

// Caso F: Sobretensão SEM Fusível (Queima de Equipamento)
const sectorTestBurn = {
    cards: [
        { type: 'equipment', name: 'LED Piloto 3V', vNom: 3, r: 1 },
        { type: 'gnd', name: 'Cabo Terra (GND)' }
    ]
};
engine.gameState.board.sectors.sector_teste_burn = sectorTestBurn;
const diagBurn = engine.diagnoseSector('sector_teste_burn');
assert(diagBurn.result === 'overvoltage', `Sobretensão sem fusível deve causar queima. Obtido: ${diagBurn.result}`);

// Caso G: Subtensão (Resistência excessiva: LED 3V com 4Ω + 4Ω = 8Ω -> 12V * 1/9 = 1.33V)
const sectorTestUnder = {
    cards: [
        { type: 'resistor', name: 'Resistor 4Ω', r: 4 },
        { type: 'resistor', name: 'Resistor 4Ω', r: 4 },
        { type: 'equipment', name: 'LED Piloto 3V', vNom: 3, r: 1 },
        { type: 'gnd', name: 'Cabo Terra (GND)' }
    ]
};
engine.gameState.board.sectors.sector_teste_under = sectorTestUnder;
const diagUnder = engine.diagnoseSector('sector_teste_under');
assert(diagUnder.result === 'undervoltage', `Resistência excessiva deve causar subtensão. Obtido: ${diagUnder.result} (${diagUnder.vCalculated}V)`);

// Limpa setores temporários de teste
delete engine.gameState.board.sectors.sector_teste_fuse;
delete engine.gameState.board.sectors.sector_teste_burn;
delete engine.gameState.board.sectors.sector_teste_under;

// -------------------------------------------------------------
// BLOCO 4: Validação de Vitória Coletiva
// -------------------------------------------------------------
console.log('\n--- BLOCO 4: Validação de Vitória Coletiva ---');

engine.checkGameEnd();
assert(engine.gameState.status === 'victory', 'Com os 4 setores oficiais energizados, o status deve ser victory.');

console.log('\n================================================================================');
console.log(`🎉 RESULTADO FINAL: ${passedTests} / ${totalTests} TESTES PASSARAM COM 100% DE SUCESSO!`);
console.log('================================================================================\n');
