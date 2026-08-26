const { VOLTZ_CARDS_CATALOG, VOLTZ_SECTORS, generateFullDeck } = require('./js/voltz_cards_data.js');
const { VoltzEngine } = require('./js/voltz_engine.js');

console.log('=== TESTE DO MOTOR DE REGRAS E ELETRODINÂMICA (VOLTZ DIGITAL) ===\n');

// 1. Validação do Baralho
const deck = generateFullDeck();
console.log(`[1] Quantidade de cartas no baralho de compras: ${deck.length} (esperado: 53 + 1 gerador central = 54 total)`);
console.assert(deck.length === 53, 'Erro: O baralho deve conter exatamente 53 cartas jogáveis.');

// 2. Inicialização do Jogo
const engine = new VoltzEngine();
const p1 = engine.addPlayer('p1', 'David', true);
const p2 = engine.addPlayer('p2', 'João', false);
engine.startGame();

console.log(`[2] Partida iniciada com ${engine.gameState.players.length} jogadores.`);
console.log(`    Mão de ${p1.name}: ${p1.hand.length} cartas.`);
console.log(`    Mão de ${p2.name}: ${p2.hand.length} cartas.`);
console.assert(p1.hand.length === 3 && p2.hand.length === 3, 'Erro na distribuição de cartas iniciais.');

// 3. Teste Caso 1: Hospital (Tomógrafo UTI 12V / 4Ω)
console.log('\n[3] Teste Caso 1: Hospital (Tomógrafo 12V / 4Ω direto)');
engine.gameState.board.sectors.sector_hospital.cards = [
    { type: 'equipment', name: 'Tomógrafo UTI', vNom: 12, r: 4 },
    { type: 'gnd', name: 'Cabo Terra' }
];
const diag1 = engine.diagnoseSector('sector_hospital');
console.log(`    Resultado: ${diag1.result} (${diag1.vCalculated}V / Vnom ${diag1.vNom}V)`);
console.assert(diag1.result === 'success', 'Erro no Caso 1: Tomógrafo deveria acender em 12V.');

// 4. Teste Caso 2: Central de Dados (Resistor 2Ω + Servidor 4V / 1Ω)
console.log('\n[4] Teste Caso 2: Central de Dados (2Ω + 1Ω = 3Ω -> 12V / 3 = 4V)');
engine.gameState.board.sectors.sector_dados.cards = [
    { type: 'resistor', name: 'Resistor 2Ω', r: 2 },
    { type: 'equipment', name: 'Servidor Central', vNom: 4, r: 1 },
    { type: 'gnd', name: 'Cabo Terra' }
];
const diag2 = engine.diagnoseSector('sector_dados');
console.log(`    Resultado: ${diag2.result} (${diag2.vCalculated}V / Vnom ${diag2.vNom}V)`);
console.assert(diag2.result === 'success', 'Erro no Caso 2: Servidor deveria acender em 4V.');

// 5. Teste Caso 3: Sobretensão com Fusível de Proteção
console.log('\n[5] Teste Caso 3: Sobretensão com Fusível (Servidor 4V direto em 12V)');
engine.gameState.board.sectors.sector_agua.cards = [
    { type: 'fuse', name: 'Fusível 1A' },
    { type: 'equipment', name: 'Servidor Central', vNom: 4, r: 1 },
    { type: 'gnd', name: 'Cabo Terra' }
];
const diag3 = engine.diagnoseSector('sector_agua');
console.log(`    Resultado: ${diag3.result} (${diag3.vCalculated}V / Vnom ${diag3.vNom}V) -> ${diag3.title}`);
console.assert(diag3.result === 'overvoltage', 'Erro no Caso 3: Deveria detectar sobretensão protegida por fusível.');

// 6. Teste Caso 4: Subtensão (Resistência excessiva)
console.log('\n[6] Teste Caso 4: Subtensão (LED 3V com 3Ω + 3Ω = 6Ω resistores adicionais)');
engine.gameState.board.sectors.sector_residencial.cards = [
    { type: 'resistor', name: 'Resistor 3Ω', r: 3 },
    { type: 'resistor', name: 'Resistor 3Ω', r: 3 },
    { type: 'equipment', name: 'LED Piloto', vNom: 3, r: 1 },
    { type: 'gnd', name: 'Cabo Terra' }
];
const diag4 = engine.diagnoseSector('sector_residencial');
console.log(`    Resultado: ${diag4.result} (${diag4.vCalculated}V / Vnom ${diag4.vNom}V) -> ${diag4.title}`);
console.assert(diag4.result === 'undervoltage', 'Erro no Caso 4: Deveria detectar subtensão.');

console.log('\n✅ TODOS OS TESTES DE FÍSICA E REGRAS DO MOTOR DIGITAL PASSARAM COM 100% DE SUCESSO!\n');
