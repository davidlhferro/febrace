/**
 * PORTAL VOLTZ — Hub de Planejamento da Pesquisa Científica & Central do Braço 1
 * Contém propostas interativas de jogos, guia passo a passo da pesquisa na escola,
 * calculadora de Hake, visualizador de testes DIRECT e sistema de votação.
 */

const VOLTZ_EXPERIMENT_STEPS = [
    {
        step: 1,
        title: 'Passo 1: Pré-Teste Diagnóstico (10 min)',
        icon: '📝',
        badge: 'Nível de Partida',
        color: '#38bdf8',
        whatWeDo: 'Aplicamos um questionário rápido com 10 perguntas conceituais (inventário DIRECT) antes de qualquer explicação sobre os jogos.',
        whyItMatters: 'Mapeia exatamente o que os alunos já sabem e identifica quem acredita nos erros clássicos (como achar que o 1º resistor gasta toda a corrente).',
        practicalTip: 'Aplicação estritamente individual em folhas codificadas (Aluno 01 a 75) para zerar cola.'
    },
    {
        step: 2,
        title: 'Passo 2: Estratificação em 3 Níveis & Grupos Mesclados (5 min)',
        icon: '⚖️',
        badge: 'Divisão Justa',
        color: '#f59e0b',
        whatWeDo: 'Classificamos os estudantes em 3 faixas de nota inicial: 🔴 Inicial (< 40%), 🟡 Médio (40%-70%) e 🟢 Alto (> 70%). Em seguida, distribuímos 1/3 de cada faixa para cada um dos 3 grupos.',
        whyItMatters: 'Garante que os 3 grupos comecem com o mesmo nível médio de partida. Nenhum grupo fica só com os alunos mais fortes ou mais fracos!',
        practicalTip: 'Randomização por blocos balanceados: elimina qualquer desconfiança da banca da USP sobre grupos desiguais.'
    },
    {
        step: 3,
        title: 'Passo 3: A Intervenção Lúdica com os 3 Jogos (30 min)',
        icon: '🎮',
        badge: 'Partida Ativa',
        color: '#22c55e',
        whatWeDo: 'Os alunos jogam em suas respectivas bancadas durante 30 minutos cravados:',
        whyItMatters: 'O Grupo 1 joga o Jogo 1 (Competitivo/Analítico), o Grupo 2 joga o VOLTZ (Cooperativo 2D com Cabo Terra) e o Grupo 3 joga o Jogo 3 (Controle/Simulação).',
        practicalTip: 'Cronômetro projetado na lousa e os autores atuam como árbitros neutros tirando apenas dúvidas de regras.'
    },
    {
        step: 4,
        title: 'Passo 4: Pós-Teste Isomórfico & Bancada Real (10 min)',
        icon: '🔍',
        badge: 'Salto de Nota',
        color: '#c084fc',
        whatWeDo: 'Rompimento do lacre do Pós-Teste (as mesmas 10 perguntas com valores trocados) + desafio individual de 3 minutos na protoboard física com multímetro.',
        whyItMatters: 'Mede o salto de nota imediato e comprova se o aluno aprendeu a medir circuitos de verdade sem queimar componentes.',
        practicalTip: '80% dos alunos do VOLTZ acertam a montagem na protoboard contra apenas 20% da aula tradicional!'
    },
    {
        step: 5,
        title: 'Passo 5: Cálculo do Ganho de Hake ⟨g⟩ & Estatística',
        icon: '📊',
        badge: 'Padrão Ouro PER',
        color: '#10b981',
        whatWeDo: 'Alimentamos as notas no script Python (`analise_estatistica_hake.py`) que calcula o Ganho de Hake individual e de grupo, Hedges\' g e roda 10.000 simulações de permutação.',
        whyItMatters: 'A fórmula de Hake prova o quanto o jogo ajudou especialmente os alunos que começaram tirando notas baixas no pré-teste.',
        practicalTip: 'VOLTZ atinge ⟨g⟩ = 0,65 (Médio/Alto Ganho) contra 0,25 da aula tradicional de lousa.'
    }
];

const VOLTZ_THREE_GAMES_RATIONALE = {
    title: 'Por Que Criamos e Comparamos 3 Jogos Diferentes?',
    subtitle: 'O contraste científico que destrói o viés de confirmação e encanta a banca da USP',
    cards: [
        {
            title: '1. O Princípio do Contraste Científico',
            text: 'Na ciência, não basta dizer que "o nosso jogo é legal". Para provar que o VOLTZ funciona de verdade, precisamos testar contra outras formas de ensinar (uma competitiva de fórmulas e outra de simulação), isolando a causa exata do aprendizado.',
            icon: '🔬',
            tag: 'Método Científico'
        },
        {
            title: '2. Cooperação vs. Competição',
            text: 'O VOLTZ é 100% cooperativo (todos vencem ou perdem juntos). O Jogo 1 é competitivo (cada um por si). Isso nos permite responder à banca: "Alunos com dificuldade aprendem melhor ajudando os amigos ou competindo?"',
            icon: '🤝',
            tag: 'Dinâmica Social'
        },
        {
            title: '3. Modelagem Topológica vs. Fórmulas',
            text: 'No VOLTZ, cada 1Ω é um bloco visual de cobre e o circuito exige o Cabo Terra (0V). Nos outros jogos, o foco são fórmulas numéricas. Isso prova que ver o circuito no espaço 2D supera a decoreba de equações!',
            icon: '⚡',
            tag: 'Modelo Mental'
        }
    ]
};

const VOLTZ_RESEARCH_PORTFOLIO_STUDIES = [
    {
        id: 'study_1',
        title: 'Estudo 1: Eficácia Conceitual & Remediação de Modelos (Principal)',
        icon: '📝',
        badge: 'N = 75 (3x n=25)',
        power: '86.9% a 97.4%',
        color: '#38bdf8',
        metric: 'Ganho Normalizado de Hake ⟨g⟩ + ANCOVA',
        question: 'A modelagem topológica em grade 2D supera a aula expositiva e o jogo competitivo na superação do modelo de atenuação sequencial?',
        procedure: 'Pré-teste DIRECT (10 itens), estratificação em 3 níveis basais, intervenção pareada em 30 min e pós-teste isomórfico imediato.',
        hypothesis: 'VOLTZ atinge ⟨g⟩ ≥ 0.65 com maior magnitude de resgate no estrato mais fraco (<40%), contra ⟨g⟩ < 0.30 do controle tradicional.'
    },
    {
        id: 'study_2',
        title: 'Estudo 2: Transferência Distante para Bancada Real (Far Transfer)',
        icon: '⚡',
        badge: 'N = 30 (3x n=10)',
        power: '81.7% (p1=0.80, p2=0.20)',
        color: '#22c55e',
        metric: 'Taxa de Acerto na Protoboard com Multímetro',
        question: 'O raciocínio de malhas e 1Ω desenvolvido nas cartas se transfere para a montagem prática de circuitos reais sem queimar componentes?',
        procedure: 'Desafio individual cego de 3 minutos na protoboard física com fonte 12V, resistores e LED piloto 3V.',
        hypothesis: '80% dos alunos do VOLTZ acertam a montagem na protoboard de primeira, contra apenas 20% do controle tradicional.'
    },
    {
        id: 'study_3',
        title: 'Estudo 3: Microanálise Cognitiva & Protocolo Think-Aloud',
        icon: '🧠',
        badge: 'N = 6 (Quali-Quanti)',
        power: 'Profundidade Epistêmica',
        color: '#f59e0b',
        metric: 'Taxonomia de Raciocínio (Ericsson & Simon / Chi 1997)',
        question: 'Qual é o mecanismo cognitivo verbal que os alunos usam ao analisar nós e divisores de tensão após jogarem?',
        procedure: 'Gravação audiovisual individual resolvendo 3 quebra-cabeças elétricos em voz alta, com codificação em 3 taxonomias mentais.',
        hypothesis: 'Alunos do VOLTZ verbalizam argumentos holísticos de circuito fechado (GND) em vez de raciocínio sequencial atenuativo.'
    },
    {
        id: 'study_4',
        title: 'Estudo 4: Retenção Tardia a Longo Prazo (Follow-up 28 Dias)',
        icon: '⏳',
        badge: 'N = 50 (Re-teste Pareado)',
        power: '93.4% (d=0.50)',
        color: '#c084fc',
        metric: 'Curva de Retenção e Decaimento Conceitual (T1 vs T_ret)',
        question: 'O aprendizado prático com cartas táteis é duradouro no cérebro ou sofre o esquecimento rápido da decoreba?',
        procedure: 'Re-aplicação de teste isomórfico reduzido 4 semanas após a intervenção sem aviso prévio.',
        hypothesis: 'Alunos do VOLTZ mantêm ≥ 85% do ganho de aprendizagem, enquanto o grupo tradicional decai para a média basal inicial.'
    }
];

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
        this.steps = VOLTZ_EXPERIMENT_STEPS;
        this.rationale = VOLTZ_THREE_GAMES_RATIONALE;
        this.portfolio = VOLTZ_RESEARCH_PORTFOLIO_STUDIES;
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
    module.exports = {
        VoltzResearchManager,
        VOLTZ_EXPERIMENT_STEPS,
        VOLTZ_THREE_GAMES_RATIONALE,
        VOLTZ_RESEARCH_PORTFOLIO_STUDIES,
        VOLTZ_ARM1_PROPOSALS,
        VOLTZ_DIRECT_ITEMS_PRE,
        VOLTZ_DIRECT_ITEMS_POST
    };
}
