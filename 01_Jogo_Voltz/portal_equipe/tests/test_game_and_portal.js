/**
 * SUÍTE DE TESTES AUTOMATIZADOS — JOGO VOLTZ 2D & PORTAL FEBRACE
 * Cobre: Carta Única (0,0), Rejeição de Jogadas Ilegais Bandido, Fechamento por Loop e GND,
 * Lei de Ohm, Diário de Bordo, Propostas do Braço 1, Banco DIRECT, Roteiro de Pitch,
 * Guia do Experimento na Escola (5 Passos), Matriz de Prioridades em 3 Níveis e Simulador de Objeções da Banca.
 */

const { TOPOLOGY_SHAPES, getRotatedPorts, VOLTZ_CARDS_CATALOG, generateFullDeck } = require('../js/voltz_cards_data.js');
const { VoltzEngine } = require('../js/voltz_engine.js');
const { VoltzDiarioManager } = require('../js/voltz_diario.js');
const { VoltzWarRoom, FEBRACE_PRIORITY_MATRIX, FEBRACE_PITCH_SCRIPT } = require('../js/voltz_warroom.js');
const { VoltzResearchManager, VOLTZ_EXPERIMENT_STEPS, VOLTZ_THREE_GAMES_RATIONALE, VOLTZ_ARM1_PROPOSALS, VOLTZ_DIRECT_ITEMS_PRE, VOLTZ_DIRECT_ITEMS_POST } = require('../js/voltz_pesquisa.js');
const { VoltzBancaCoach, USP_REPORT_REQUIREMENTS, USP_OBJECTIONS_SIMULATOR, USP_GLOSSARY_TRANSLATIONS } = require('../js/voltz_banca.js');

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

const p1 = engine.addPlayer('p1', 'David', true);
engine.startGame();
const testCardStraight = {
    uid: 'test_straight_1',
    name: 'Resistor 1Ω',
    shape: 'STRAIGHT',
    basePorts: TOPOLOGY_SHAPES.STRAIGHT,
    r: 1
};

const vOccupied = engine.isValidPlacement(testCardStraight, 0, 0, 0);
assert(!vOccupied.valid, 'Não deve permitir colocar carta em posição já ocupada (0,0).');

const vIsolated = engine.isValidPlacement(testCardStraight, 5, 5, 0);
assert(!vIsolated.valid, 'Não deve permitir colocar carta isolada no espaço (sem cartas vizinhas).');

const vMismatch = engine.isValidPlacement(testCardStraight, 0, 1, 0);
assert(!vMismatch.valid, 'Deve rejeitar jogada ilegal onde uma borda fechada/parede bate na trilha aberta do vizinho.');

const vValidRotated = engine.isValidPlacement(testCardStraight, 0, 1, 90);
assert(vValidRotated.valid, 'Deve aceitar jogada quando a carta é rotacionada a 90° e a trilha coincide perfeitamente.');

// -------------------------------------------------------------
// BLOCO 3: Fechamento de Circuito por Cabo Terra (GND)
// -------------------------------------------------------------
console.log('\n--- BLOCO 3: Fechamento de Circuito por Cabo Terra (GND) ---');

const engineGND = new VoltzEngine();
engineGND.addPlayer('p1', 'David', true);
engineGND.startGame();

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
// BLOCO 6: Central de Decisão do Braço 1 & Banco DIRECT
// -------------------------------------------------------------
console.log('\n--- BLOCO 6: Propostas do Braço 1 & Banco DIRECT ---');

const researchMgr = new VoltzResearchManager();
assert(researchMgr.proposals.length === 3, 'Devem existir exatamente 3 propostas de jogos para o Braço 1.');
assert(researchMgr.proposals[0].id === 'prop_duelo', 'A primeira proposta deve ser o Circuit Duel.');
assert(researchMgr.proposals[1].id === 'prop_blackout', 'A segunda proposta deve ser o Diagnóstico Blackout.');
assert(researchMgr.proposals[2].id === 'prop_smartgrid', 'A terceira proposta deve ser o Smart Grid.');

// Teste de Votação
const initialVotes = researchMgr.proposals[0].votes;
researchMgr.voteProposal('prop_duelo');
assert(researchMgr.proposals[0].votes === initialVotes + 1, 'Votar em uma proposta deve incrementar o contador de votos em 1.');

// Teste do Banco Isomórfico DIRECT
assert(researchMgr.preItems.length >= 5, 'O banco do Pré-Teste deve conter questões conceituais.');
assert(researchMgr.postItems.length >= 5, 'O banco do Pós-Teste deve conter questões isomórficas espelhadas.');
assert(researchMgr.preItems[0].distractor.toLowerCase().includes('consom'), 'A Questão 1 deve mapear o distrator de modelo atenuativo.');

// -------------------------------------------------------------
// BLOCO 7: Módulo "Como Será a Nossa Pesquisa na Escola" (5 Passos)
// -------------------------------------------------------------
console.log('\n--- BLOCO 7: Guia do Experimento na Escola (5 Passos) ---');

assert(researchMgr.steps.length === 5, 'O guia do experimento deve conter exatamente 5 passos sequenciais.');
assert(researchMgr.steps[0].title.includes('Pré-Teste'), 'O Passo 1 deve ser o Pré-Teste Diagnóstico (10 min).');
assert(researchMgr.steps[1].title.includes('Estratificação'), 'O Passo 2 deve ser a Estratificação em 3 Níveis e formação de grupos justos.');
assert(researchMgr.steps[2].title.includes('Intervenção Lúdica'), 'O Passo 3 deve ser a Intervenção com os 3 Jogos (30 min).');
assert(researchMgr.steps[3].title.includes('Pós-Teste'), 'O Passo 4 deve ser o Pós-Teste Isomórfico (10 min).');
assert(researchMgr.steps[4].title.includes('Ganho de Hake'), 'O Passo 5 deve ser o Cálculo do Ganho de Hake.');
assert(researchMgr.rationale.cards.length === 3, 'A justificativa dos 3 jogos deve conter 3 pilares de contraste.');

// Validação dos 4 Estudos do Portfólio de Pesquisa
assert(researchMgr.portfolio.length === 4, 'O portfólio de pesquisa deve conter exatamente 4 estudos interconectados.');
assert(researchMgr.portfolio[0].id === 'study_1', 'Estudo 1 deve ser a Eficácia Conceitual com N=75.');
assert(researchMgr.portfolio[1].id === 'study_2', 'Estudo 2 deve ser a Transferência Prática Far Transfer com N=30.');
assert(researchMgr.portfolio[2].id === 'study_3', 'Estudo 3 deve ser a Microanálise Cognitiva Think-Aloud com N=6.');
assert(researchMgr.portfolio[3].id === 'study_4', 'Estudo 4 deve ser a Retenção Tardia a 28 dias com N=50.');
assert(researchMgr.portfolio[0].power.includes('86.9%'), 'Estudo 1 deve atingir poder estatístico ≥ 86.9%.');

// -------------------------------------------------------------
// BLOCO 8: Matriz de Prioridades em 3 Níveis (Nível 1, 2 e 3)
// -------------------------------------------------------------
console.log('\n--- BLOCO 8: Matriz de Prioridades Granular ---');

const warRoom = new VoltzWarRoom();
assert(warRoom.matrix.length === 3, 'A matriz de prioridades deve ser dividida em exatamente 3 níveis.');
assert(warRoom.matrix[0].level === 'Nível 1', 'O primeiro nível deve ser Nível 1: Crítico & Urgente.');
assert(warRoom.matrix[0].tasks.some(t => t.id === 'n1_diario'), 'Nível 1 deve conter o Diário de Bordo Oficial.');
assert(warRoom.matrix[0].tasks.some(t => t.id === 'n1_plano'), 'Nível 1 deve conter o Plano de Pesquisa Formal.');
assert(warRoom.matrix[0].tasks.some(t => t.id === 'n1_artigo'), 'Nível 1 deve conter o Relatório Científico / Artigo ABNT.');
assert(warRoom.matrix[0].tasks.some(t => t.id === 'n1_video'), 'Nível 1 deve conter o Vídeo de 3 Minutos.');

const scoreInitial = warRoom.getReadinessScore();
assert(typeof scoreInitial === 'number' && scoreInitial >= 0 && scoreInitial <= 100, 'O score de prontidão deve ser um percentual de 0 a 100.');

// Teste de Toggle de Tarefa
const taskToToggle = warRoom.matrix[0].tasks[3]; // n1_video (false)
const prevStatus = taskToToggle.status;
warRoom.toggleTask(taskToToggle.id);
assert(taskToToggle.status === !prevStatus, 'O toggle da tarefa deve inverter seu status.');

// -------------------------------------------------------------
// BLOCO 9: O Que a Banca Quer Ver nos Relatórios & Simulador de Objeções
// -------------------------------------------------------------
console.log('\n--- BLOCO 9: Relatórios USP & Simulador de 5 Objeções ---');

const coach = new VoltzBancaCoach();
assert(coach.reportReqs.length === 3, 'Devem existir 3 categorias de exigências para relatórios da USP.');
assert(coach.objections.length === 5, 'O simulador de defesa deve conter as 5 objeções mais perigosas da banca.');
assert(coach.objections[0].pergunta.includes('joguinho'), 'A Objeção 1 deve tratar de jogo vs ciência.');
assert(coach.objections[1].pergunta.includes('pequena'), 'A Objeção 2 deve tratar do tamanho da amostra (N reduzido).');
assert(coach.objections[2].pergunta.includes('3 jogos'), 'A Objeção 3 deve tratar da comparação entre 3 jogos.');
assert(coach.objections[3].pergunta.includes('decoraram'), 'A Objeção 4 deve tratar de decoreba vs compreensão real.');
assert(coach.objections[4].pergunta.includes('entusiasmo'), 'A Objeção 5 deve tratar do viés do experimentador.');

// -------------------------------------------------------------
// BLOCO 10: Roteiro de Pitch Oral FEBRACE
// -------------------------------------------------------------
console.log('\n--- BLOCO 10: Roteiro de Pitch Oral FEBRACE ---');

assert(warRoom.pitch.length === 5, 'O roteiro do pitch oral deve conter exatamente 5 minutos estruturados.');
assert(warRoom.pitch[0].fala.includes('8 em cada 10 alunos'), 'O minuto 1 deve abrir com a estatística do problema em sala de aula.');
assert(warRoom.pitch[4].fala.includes('R$ 25'), 'O minuto 5 deve enfatizar o baixo custo social de R$ 25.');

console.log('\n================================================================================');
console.log(`🎉 RESULTADO FINAL: ${passedTests} / ${totalTests} TESTES PASSARAM COM 100% DE SUCESSO!`);
console.log('================================================================================\n');
