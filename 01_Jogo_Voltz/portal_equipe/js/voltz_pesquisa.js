/**
 * PORTAL VOLTZ — Hub de Planejamento da Pesquisa Científica & Central do Braço 1
 * Contém propostas interativas de jogos, calculadora de Hake, visualizador de testes DIRECT e sistema de votação.
 */

const VOLTZ_ARM1_PROPOSALS = [
    {
        id: 'prop_duelo',
        name: '⚡ CIRCUIT DUEL: Duelo de Sobrecarga',
        badge: 'Competitivo / Take-That',
        color: '#ef4444',
        icon: '⚔️',
        summary: 'Duelo rápido de 1v1 ou 4P onde cada jogador monta sua bancada enquanto ataca os rivais com sobretensão e curto-circuito!',
        comoJoga: 'Cada jogador puxa 4 cartas. No seu turno, baixa resistores para estabilizar seus aparelhos ou joga um resistor extra na malha do rival para causar subtensão. O primeiro a manter 3 aparelhos ligados vence!',
        contrasteVoltz: 'Competição vs. Cooperação. Testa se a rivalidade e o desejo de vencer estimulam os alunos a fazer contas de divisão de tensão mais rápido do que a ajuda mútua do VOLTZ.',
        opiniaoBanca: 'A banca da USP adora o contraste dinâmico: permite avaliar se a pressão competitiva ajuda ou prejudica quem tem mais dificuldade.',
        votosPadrao: 8
    },
    {
        id: 'prop_blackout',
        name: '🔍 DIAGNÓSTICO BLACKOUT: O Mistério da Caixa-Preta',
        badge: 'Dedução Lógica / Falhas',
        color: '#38bdf8',
        icon: '🕵️',
        summary: 'Investigação de circuitos ocultos onde os alunos usam pistas de multímetro para achar resistores escondidos e queimas.',
        comoJoga: 'Um painel de papel dobrado esconde 3 resistores. Os jogadores usam fichas de medição para perguntar a voltagem entre pares de nós e aplicam a Lei de Ohm (R = V/I) para deduzir o circuito secreto.',
        contrasteVoltz: 'Engenharia Reversa (Dedução) vs. Síntese Direta (Montagem). No VOLTZ, o aluno constrói; no Blackout, ele investiga um circuito com defeito para achar o erro.',
        opiniaoBanca: 'Altíssimo valor técnico para engenheiros da Poli-USP, pois reproduz com perfeição a rotina de bancada e medição com multímetro.',
        votosPadrao: 12
    },
    {
        id: 'prop_smartgrid',
        name: '🏙️ SMART GRID: A Cidade Sem Energia',
        badge: 'Gestão de Recursos / Kirchhoff',
        color: '#10b981',
        icon: '🏢',
        summary: 'Gestão de rede elétrica balanceando correntes em paralelo para abastecer hospitais e indústrias sem desarmar o disjuntor.',
        comoJoga: 'Cartas de clima exigem mais corrente nos bairros. Os jogadores distribuem a energia em ramos paralelos respeitando a 1ª Lei de Kirchhoff (soma de correntes <= 10A da subestação).',
        contrasteVoltz: 'Visão Macro (Rede de Distribuição) vs. Visão Micro (Malha Fechada de 12V). Foca na soma de correntes em paralelo em vez de divisão de tensão em série.',
        opiniaoBanca: 'Excelente apelo interdisciplinar com sustentabilidade, matriz energética e temas atuais da sociedade.',
        votosPadrao: 6
    }
];

const VOLTZ_DIRECT_ITEMS_PRE = [
    {
        id: 1,
        title: 'Q1. Conservação de Corrente em Série',
        question: 'Dois resistores de 4Ω estão ligados em série a uma bateria de 12V. Comparando a corrente antes do 1º resistor (I1) e depois do 2º (I2), o que é correto?',
        correctAnswer: 'I1 = I2 (A corrente é exatamente a mesma em todo o circuito fechado)',
        distractor: 'I1 > I2 (Erro comum: achar que o primeiro resistor consome corrente e sobra menos pro segundo).'
    },
    {
        id: 2,
        title: 'Q2. Divisor de Tensão em Malha de 12V',
        question: 'Em um circuito de 12V com resistor de 3Ω em série com lâmpada de 1Ω, qual é a tensão medida na lâmpada?',
        correctAnswer: '3V (Pois a lâmpada representa 1/4 da resistência total de 4Ω: 12V * 1/4 = 3V)',
        distractor: '12V (Erro: achar que a bateria entrega 12V direto em todos os componentes).'
    },
    {
        id: 3,
        title: 'Q3. Curto-Circuito em Nó',
        question: 'Um fio de cobre com resistência zero é ligado em paralelo com uma lâmpada acesa. O que acontece?',
        correctAnswer: 'A lâmpada apaga na hora e a corrente na bateria sobe muito (Curto-circuito)',
        distractor: 'A lâmpada brilha mais (Erro: achar que a corrente se divide nos dois caminhos).'
    },
    {
        id: 4,
        title: 'Q4. Papel do Cabo Terra (GND // 0V)',
        question: 'Qual é a função física do Cabo Terra (GND) no circuito de 12V?',
        correctAnswer: 'Define o potencial de referência de 0V e fecha o caminho para a corrente fluir',
        distractor: 'Apenas descarrega energia no lixo quando algo quebra.'
    },
    {
        id: 5,
        title: 'Q5. Lâmpadas em Paralelo',
        question: 'Duas lâmpadas iguais estão em paralelo sob 12V. Se uma lâmpada queimar e for retirada, o que acontece com a outra?',
        correctAnswer: 'O brilho da outra continua idêntico (Pois o ramo paralelo ainda recebe 12V)',
        distractor: 'A outra apaga ou fica com metade do brilho.'
    }
];

const VOLTZ_DIRECT_ITEMS_POST = [
    {
        id: 1,
        title: 'Q1 (Isomórfica). Três Resistores em Série',
        question: 'Três resistores de 2Ω, 3Ω e 5Ω estão em série sob 20V. Comparando as correntes IA (início), IB (meio) e IC (fim):',
        correctAnswer: 'IA = IB = IC (A taxa de fluxo de cargas é rigorosamente constante na linha toda)',
        distractor: 'IA > IB > IC (Modelo atenuativo sequencial).'
    },
    {
        id: 2,
        title: 'Q2 (Isomórfica). Dois Resistores Iguais',
        question: 'Dois resistores de 2Ω estão em série sob fonte de 12V. Qual é a tensão medida sobre o segundo resistor?',
        correctAnswer: '6V (Pois a malha de 4Ω divide os 12V em duas metades iguais: 12V * 2/4 = 6V)',
        distractor: '12V em cada um ou 0V.'
    },
    {
        id: 3,
        title: 'Q3 (Isomórfica). Chave em Curto',
        question: 'Uma chave fecha um fio condutor em paralelo com um resistor. O que ocorre com a tensão naquele resistor?',
        correctAnswer: 'Cai para 0V (O curto drena todo o fluxo, zerando a diferença de potencial)',
        distractor: 'Aumenta para 12V.'
    },
    {
        id: 4,
        title: 'Q4 (Isomórfica). LED com 12V em Ambos os Polos',
        question: 'Um LED tem 12V no ânodo e 12V no cátodo. Por que ele não acende?',
        correctAnswer: 'Falta conectar o cátodo no Cabo Terra (0V) para criar diferença de potencial (12V - 0V)',
        distractor: 'Falta aumentar a tensão da bateria para 24V.'
    },
    {
        id: 5,
        title: 'Q5 (Isomórfica). Quarta Lâmpada em Paralelo',
        question: 'Três lâmpadas estão em paralelo sob 12V. Adiciona-se uma quarta lâmpada em paralelo. O que acontece com o brilho das 3 originais?',
        correctAnswer: 'O brilho das 3 originais não muda e a bateria fornece mais corrente total',
        distractor: 'Todas ficam mais fracas porque dividem a luz.'
    }
];

class VoltzResearchManager {
    constructor() {
        this.storageKeyVotes = 'voltz_arm1_votes_v1';
        this.proposals = this.loadProposals();
        this.preItems = VOLTZ_DIRECT_ITEMS_PRE;
        this.postItems = VOLTZ_DIRECT_ITEMS_POST;
    }

    loadProposals() {
        try {
            const saved = localStorage.getItem(this.storageKeyVotes);
            if (saved) {
                const votesMap = JSON.parse(saved);
                return VOLTZ_ARM1_PROPOSALS.map(p => ({
                    ...p,
                    votes: votesMap[p.id] !== undefined ? votesMap[p.id] : p.votosPadrao
                }));
            }
        } catch (e) {}

        return VOLTZ_ARM1_PROPOSALS.map(p => ({ ...p, votes: p.votosPadrao }));
    }

    voteProposal(propId) {
        const prop = this.proposals.find(p => p.id === propId);
        if (prop) {
            prop.votes += 1;
            this.saveVotes();
        }
        return this.proposals;
    }

    saveVotes() {
        try {
            const votesMap = {};
            this.proposals.forEach(p => { votesMap[p.id] = p.votes; });
            localStorage.setItem(this.storageKeyVotes, JSON.stringify(votesMap));
        } catch (e) {}
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzResearchManager, VOLTZ_ARM1_PROPOSALS, VOLTZ_DIRECT_ITEMS_PRE, VOLTZ_DIRECT_ITEMS_POST };
}
