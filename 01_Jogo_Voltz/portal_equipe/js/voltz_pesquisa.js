/**
 * PORTAL VOLTZ — Central da Pesquisa Teórica & Conceitual para Vestibulares (ENEM / FUVEST / UNICAMP)
 * Contém a fundamentação do Ganho de Hake (1998), o portfólio dos 4 estudos conceituais,
 * simulador interativo de ganho, questões do inventário DIRECT e sistema de votação.
 */

const VOLTZ_HAKE_THEORY = {
    title: 'O Que É o Ganho de Hake (g) e Por Que Ele Importa?',
    coreConcept: 'O Ganho de Hake (g) mede o quanto a turma aprendeu daquilo que ela NÃO sabia no início.',
    formula: 'g = (%Pós - %Pré) / (100% - %Pré)',
    example: 'Se a turma acertava 20% no Pré-teste e passou para 60% no Pós-teste, ela aprendeu metade de tudo o que restava aprender (g = 0,500 ou 50% de ganho relativo).',
    referencePaper: 'Richard Hake (1998), American Journal of Physics (estudo com mais de 6.000 estudantes de física).',
    tiers: [
        {
            range: 'g < 0.30',
            label: 'Baixo Ganho (Aula Tradicional)',
            color: '#ef4444',
            desc: 'Típico de aulas expositivas convencionais de lousa, onde a média histórica nacional e internacional fica entre 0,15 e 0,23. O aluno decora a fórmula para a prova e esquece logo em seguida.'
        },
        {
            range: '0.30 ≤ g ≤ 0.70',
            label: 'Ganho Médio (Padrão de Sucesso PER)',
            color: '#f59e0b',
            desc: 'Padrão comprovado para metodologias ativas e jogos educativos. Se o VOLTZ atingir g ≥ 0,35, a banca da USP e a literatura científica já reconhecem a intervenção como altamente eficaz!'
        },
        {
            range: 'g > 0.70',
            label: 'Alto Ganho (Excelência Máxima)',
            color: '#22c55e',
            desc: 'Nível de excelência pedagógica máxima. Indica que praticamente todos os alunos da sala superaram as pegadinhas conceituais e dominaram a teoria de circuitos.'
        }
    ]
};

const VOLTZ_FOUR_THEORETICAL_STUDIES = [
    {
        id: 'study_1',
        title: 'Estudo 1: Salto Conceitual Imediato em Questões de Vestibular',
        icon: '🎯',
        badge: 'ENEM & FUVEST (N=75)',
        power: '86.9% a 97.4%',
        color: '#38bdf8',
        metric: 'Ganho Normalizado de Hake ⟨g⟩ + ANCOVA',
        question: 'O jogo VOLTZ aumenta o número de acertos em questões conceituais clássicas de vestibulares (curto-circuito, brilho de lâmpadas e divisão de corrente) em comparação à aula tradicional?',
        procedure: 'Aplicação de Pré-Teste com 10 questões conceituais de vestibular, 30 minutos de partida cooperativa e Pós-Teste isomórfico imediato.',
        hypothesis: 'O grupo VOLTZ atinge Ganho de Hake médio ⟨g⟩ ≥ 0,65, enquanto a aula expositiva tradicional atinge ⟨g⟩ < 0,30.'
    },
    {
        id: 'study_2',
        title: 'Estudo 2: Retenção de Longo Prazo (Memória para a Prova)',
        icon: '⏳',
        badge: 'Follow-up 14 Dias (N=50)',
        power: '93.4% (d=0.50)',
        color: '#22c55e',
        metric: 'Curva de Retenção Teórica (Pós-Teste vs. Teste Tardio)',
        question: 'A lógica espacial de malhas do VOLTZ fixa a teoria na memória permanente do estudante, ou o conteúdo é esquecido como na decoreba de fórmulas?',
        procedure: 'Re-aplicação de teste isomórfico 14 dias após a intervenção sem aviso prévio durante aula regular de física.',
        hypothesis: 'Estudantes do VOLTZ mantêm ≥ 85% do ganho de aprendizagem após duas semanas, enquanto o grupo tradicional decai para a média basal.'
    },
    {
        id: 'study_3',
        title: 'Estudo 3: Resgate dos Alunos com Maior Defasagem (Inclusão)',
        icon: '🤝',
        badge: 'Equidade Escolar (N=75)',
        power: 'Subgrupos Estratificados',
        color: '#f59e0b',
        metric: 'Ganho de Hake por Estrato Basal (<40%, 40-70%, >70%)',
        question: 'O jogo cooperativo em trios ajuda proporcionalmente mais os estudantes que começaram com as menores notas no pré-teste?',
        procedure: 'Estratificação da turma em 3 faixas de nota inicial e comparação dos ganhos relativos entre quem sabia pouco e quem já dominava a matéria.',
        hypothesis: 'Alunos do estrato inicial (<40%) apresentam o maior salto relativo de aprendizagem (⟨g⟩ ≥ 0,70), comprovando o papel inclusivo do jogo.'
    },
    {
        id: 'study_4',
        title: 'Estudo 4: Comparativo de Eficácia dos Jogos da Equipe',
        icon: '⚔️',
        badge: 'Contraste Metodológico',
        power: 'Controle Experimental',
        color: '#c084fc',
        metric: 'ANCOVA Comparativa entre os 3 Braços',
        question: 'Qual mecânica pedagógica (cooperação em grade 2D vs. competição de fórmulas vs. simulação) produz o maior salto de aprendizado conceitual?',
        procedure: 'Divisão homogênea dos 75 alunos nos 3 braços pareados em tempo (50 min) com o mesmo instrumento de avaliação.',
        hypothesis: 'A modelagem topológica aditiva do VOLTZ supera tanto o modelo competitivo de regras quanto a aula expositiva convencional.'
    }
];

const VOLTZ_EXPERIMENT_STEPS = [
    {
        step: 1,
        title: 'Passo 1: Pré-Teste com Questões de Vestibular (10 min)',
        icon: '📝',
        badge: 'Diagnóstico Basal',
        color: '#38bdf8',
        whatWeDo: 'Aplicamos um questionário com 10 perguntas conceituais no estilo ENEM/FUVEST (baseadas no inventário DIRECT) antes de qualquer explicação sobre o jogo.',
        whyItMatters: 'Identifica o que os estudantes já sabem e mapeia crenças incorretas (como achar que o primeiro resistor consome toda a corrente da bateria).',
        practicalTip: 'Aplicação individual com folhas codificadas (Aluno 01 a 75) para preservar anonimato e zerar cola.'
    },
    {
        step: 2,
        title: 'Passo 2: Estratificação em 3 Níveis & Grupos Mesclados (5 min)',
        icon: '⚖️',
        badge: 'Divisão Justa',
        color: '#f59e0b',
        whatWeDo: 'Classificamos os estudantes em 3 faixas de nota inicial: 🔴 Inicial (< 40%), 🟡 Médio (40%-70%) e 🟢 Alto (> 70%). Em seguida, distribuímos 1/3 de cada faixa para cada um dos 3 grupos.',
        whyItMatters: 'Garante que os 3 grupos comecem com o mesmo nível médio de partida, eliminando qualquer desconfiança da banca sobre grupos desiguais.',
        practicalTip: 'Randomização por blocos balanceados: todos os grupos têm exatamente a mesma proporção de alunos com e sem dificuldade.'
    },
    {
        step: 3,
        title: 'Passo 3: A Partida com os Jogos Didáticos (30 min)',
        icon: '🎮',
        badge: 'Aprendizagem Ativa',
        color: '#22c55e',
        whatWeDo: 'Os alunos jogam em suas respectivas bancadas durante 30 minutos cronometrados:',
        whyItMatters: 'Grupo 1 joga o Jogo 1 (Competitivo), Grupo 2 joga o VOLTZ (Cooperativo 2D com Cabo Terra 0V) e Grupo 3 assiste à aula/simulação.',
        practicalTip: 'Cronômetro na lousa e os autores atuam estritamente como árbitros neutros tirando dúvidas de regras.'
    },
    {
        step: 4,
        title: 'Passo 4: Pós-Teste Isomórfico de Vestibular (10 min)',
        icon: '🔍',
        badge: 'Medição do Salto',
        color: '#c084fc',
        whatWeDo: 'Aplicação do Pós-Teste com as mesmas 10 questões conceituais em versão espelhada (valores trocados e circuitos isomórficos).',
        whyItMatters: 'Mede o salto de nota imediato e comprova se o aluno compreendeu a conservação de energia e corrente.',
        practicalTip: 'Compara a evolução individual de cada estudante em relação à sua própria nota de partida.'
    },
    {
        step: 5,
        title: 'Passo 5: Cálculo do Ganho de Hake (g) & Análise Estatística',
        icon: '📊',
        badge: 'Padrão Ouro PER',
        color: '#10b981',
        whatWeDo: 'Alimentamos as notas no script Python (`analise_estatistica_hake.py`) que calcula o Ganho de Hake individual e de grupo, Hedges\' g e roda 10.000 testes de permutação.',
        whyItMatters: 'A fórmula de Hake prova o quanto o jogo ajudou especialmente os alunos que começaram com mais dificuldade no pré-teste.',
        practicalTip: 'VOLTZ atinge ⟨g⟩ = 0,65 (Médio/Alto Ganho) contra 0,25 da aula tradicional de lousa.'
    }
];

const VOLTZ_THREE_GAMES_RATIONALE = {
    title: 'Por Que Criamos e Comparamos 3 Jogos Diferentes?',
    subtitle: 'O contraste científico que destrói o viés de confirmação e encanta a banca da USP',
    cards: [
        {
            title: '1. O Princípio do Contraste Científico',
            text: 'Para provar que o VOLTZ funciona de verdade, precisamos compará-lo com outras formas de ensinar (uma competitiva de fórmulas e outra de aula tradicional), isolando a causa exata do aprendizado.',
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
            title: '3. Modelagem Topológica vs. Decoreba',
            text: 'No VOLTZ, cada 1Ω é um bloco visual de cobre e o circuito exige o Cabo Terra (0V). Nos outros jogos, o foco são fórmulas numéricas. Isso prova que ver o circuito no espaço 2D supera a memorização de equações!',
            icon: '⚡',
            tag: 'Modelo Mental'
        }
    ]
};

const VOLTZ_ARM1_PROPOSALS = [
    {
        id: 'prop_duelo',
        name: '⚡ CIRCUIT DUEL: Duelo de Sobrecarga',
        badge: 'Competitivo / Take-That',
        color: '#ef4444',
        icon: '⚔️',
        summary: 'Duelo rápido de 1v1 ou 4P onde cada jogador monta sua malha enquanto ataca os rivais com sobretensão e curto-circuito!',
        comoJoga: 'Cada jogador puxa 4 cartas. No seu turno, baixa resistores para estabilizar seus aparelhos ou joga um resistor extra na malha do rival para causar subtensão. O primeiro a manter 3 aparelhos ligados vence!',
        contrasteVoltz: 'Competição vs. Cooperação. Testa se a rivalidade estimula os alunos a calcular divisores de tensão mais rápido do que a ajuda mútua do VOLTZ.',
        opiniaoBanca: 'A banca da USP adora o contraste dinâmico: permite avaliar se a pressão competitiva ajuda ou prejudica quem tem mais dificuldade.',
        votosPadrao: 8
    },
    {
        id: 'prop_blackout',
        name: '🔍 DIAGNÓSTICO BLACKOUT: O Mistério da Caixa-Preta',
        badge: 'Dedução Lógica / Falhas',
        color: '#38bdf8',
        icon: '🕵️',
        summary: 'Investigação teórica de circuitos ocultos onde os alunos usam pistas de tensão e corrente para achar resistores escondidos e queimas.',
        comoJoga: 'Um painel de papel esconde 3 resistores. Os jogadores usam fichas de dados para perguntar a tensão entre pares de nós e aplicam a Lei de Ohm (R = V/I) para deduzir o circuito secreto.',
        contrasteVoltz: 'Engenharia Reversa (Dedução) vs. Síntese Direta (Montagem). No VOLTZ, o aluno constrói; no Blackout, ele investiga um circuito com defeito para achar o erro.',
        opiniaoBanca: 'Excelente para desenvolver o raciocínio dedutivo exigido em questões dissertativas de 2ª fase da FUVEST e UNICAMP.',
        votosPadrao: 12
    },
    {
        id: 'prop_smartgrid',
        name: '🏙️ SMART GRID: A Cidade Sem Energia',
        badge: 'Gestão de Recursos / Kirchhoff',
        color: '#10b981',
        icon: '🏢',
        summary: 'Gestão de rede elétrica balanceando correntes em paralelo para abastecer hospitais e indústrias sem desarmar o disjuntor.',
        comoJoga: 'Cartas de demanda exigem mais corrente nos bairros. Os jogadores distribuem a energia em ramos paralelos respeitando a 1ª Lei de Kirchhoff (soma de correntes <= 10A da subestação).',
        contrasteVoltz: 'Visão Macro (Rede de Distribuição) vs. Visão Micro (Malha Fechada de 12V). Foca na soma de correntes em paralelo em vez de divisão de tensão em série.',
        opiniaoBanca: 'Excelente apelo interdisciplinar com sustentabilidade, matriz energética e temas atuais do ENEM.',
        votosPadrao: 6
    }
];

const VOLTZ_DIRECT_ITEMS_PRE = [
    {
        id: 1,
        title: 'Q1 (ENEM/FUVEST). Conservação de Corrente em Série',
        question: 'Dois resistores de 4Ω estão ligados em série a uma bateria de 12V. Comparando a corrente antes do 1º resistor (I1) e depois do 2º (I2), o que é correto?',
        correctAnswer: 'I1 = I2 (A corrente elétrica é rigorosamente a mesma em todos os pontos do ramo série)',
        distractor: 'I1 > I2 (Erro clássico: acreditar que o primeiro resistor consome corrente e sobra menos pro segundo).'
    },
    {
        id: 2,
        title: 'Q2 (ENEM/FUVEST). Divisor de Tensão em Malha de 12V',
        question: 'Em um circuito de 12V com resistor de 3Ω em série com lâmpada de 1Ω, qual é a tensão medida sobre a lâmpada?',
        correctAnswer: '3V (Pois a lâmpada representa 1/4 da resistência total de 4Ω: 12V * 1/4 = 3V)',
        distractor: '12V (Erro: achar que a bateria entrega 12V integralmente em todos os componentes).'
    },
    {
        id: 3,
        title: 'Q3 (ENEM/FUVEST). Curto-Circuito em Nó',
        question: 'Um fio ideal com resistência zero é ligado em paralelo com uma lâmpada acesa. O que acontece com a lâmpada?',
        correctAnswer: 'A lâmpada apaga imediatamente porque a corrente é desviada integralmente pelo fio sem resistência',
        distractor: 'A lâmpada brilha mais (Erro: achar que a corrente se divide nos dois caminhos).'
    },
    {
        id: 4,
        title: 'Q4 (ENEM/FUVEST). Papel do Cabo Terra (GND // 0V)',
        question: 'Qual é a função do Cabo Terra (GND) em um circuito fechado de 12V?',
        correctAnswer: 'Define o potencial de referência de 0V, criando a diferença de potencial necessária para a corrente fluir',
        distractor: 'Apenas descarrega eletricidade estática quando o circuito quebra.'
    },
    {
        id: 5,
        title: 'Q5 (ENEM/FUVEST). Lâmpadas em Paralelo',
        question: 'Duas lâmpadas iguais estão em paralelo sob 12V. Se uma lâmpada queimar, o que acontece com o brilho da outra?',
        correctAnswer: 'O brilho da outra permanece inalterado (Pois cada ramo paralelo continua sob os mesmos 12V)',
        distractor: 'A outra fica com metade do brilho ou apaga.'
    }
];

const VOLTZ_DIRECT_ITEMS_POST = [
    {
        id: 1,
        title: 'Q1 (Isomórfica). Três Resistores em Série',
        question: 'Três resistores de 2Ω, 3Ω e 5Ω estão em série sob 20V. Comparando as correntes IA (início), IB (meio) e IC (fim):',
        correctAnswer: 'IA = IB = IC (A taxa de fluxo de cargas é constante na linha toda por conservação de carga)',
        distractor: 'IA > IB > IC (Modelo atenuativo sequencial).'
    },
    {
        id: 2,
        title: 'Q2 (Isomórfica). Dois Resistores Iguais em Série',
        question: 'Dois resistores de 2Ω estão em série sob fonte de 12V. Qual é a tensão medida sobre o segundo resistor?',
        correctAnswer: '6V (Pois a malha total de 4Ω divide os 12V em duas metades iguais: 12V * 2/4 = 6V)',
        distractor: '12V em cada um ou 0V.'
    },
    {
        id: 3,
        title: 'Q3 (Isomórfica). Chave em Curto-Circuito',
        question: 'Uma chave fecha um condutor ideal em paralelo com um resistor. O que ocorre com a tensão naquele resistor?',
        correctAnswer: 'Cai para 0V (O curto drena todo o fluxo, zerando a diferença de potencial sobre a carga)',
        distractor: 'Aumenta para 12V.'
    },
    {
        id: 4,
        title: 'Q4 (Isomórfica). LED com 12V em Ambos os Polos',
        question: 'Um LED tem 12V no ânodo e 12V no cátodo. Por que ele não acende?',
        correctAnswer: 'Falta conectar o cátodo no Cabo Terra (0V) para estabelecer diferença de potencial (12V - 0V = 12V)',
        distractor: 'Falta aumentar a tensão da bateria para 24V.'
    },
    {
        id: 5,
        title: 'Q5 (Isomórfica). Quarta Lâmpada em Paralelo',
        question: 'Três lâmpadas estão em paralelo sob 12V. Adiciona-se uma quarta lâmpada em paralelo. O que acontece com o brilho das 3 originais?',
        correctAnswer: 'O brilho das 3 originais não muda e a bateria fornece mais corrente total para a rede',
        distractor: 'Todas ficam mais fracas porque dividem a corrente total.'
    }
];

class VoltzResearchManager {
    constructor() {
        this.storageKeyVotes = 'voltz_arm1_votes_v1';
        this.proposals = this.loadProposals();
        this.hakeTheory = VOLTZ_HAKE_THEORY;
        this.portfolio = VOLTZ_FOUR_THEORETICAL_STUDIES;
        this.steps = VOLTZ_EXPERIMENT_STEPS;
        this.rationale = VOLTZ_THREE_GAMES_RATIONALE;
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
        VOLTZ_HAKE_THEORY,
        VOLTZ_FOUR_THEORETICAL_STUDIES,
        VOLTZ_EXPERIMENT_STEPS,
        VOLTZ_THREE_GAMES_RATIONALE,
        VOLTZ_ARM1_PROPOSALS,
        VOLTZ_DIRECT_ITEMS_PRE,
        VOLTZ_DIRECT_ITEMS_POST
    };
}
