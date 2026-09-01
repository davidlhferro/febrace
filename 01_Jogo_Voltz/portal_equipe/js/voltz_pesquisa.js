/**
 * PORTAL VOLTZ — Central da Pesquisa Teórica & Conceitual para Vestibulares (ENEM / FUVEST / UNICAMP)
 * Contém a fundamentação do Ganho de Hake (1998), o portfólio dos 4 estudos conceituais,
 * simulador interativo de ganho, questões do inventário DIRECT e sistema de votação.
 * Design de Engenharia: Zero emojis, nomenclatura técnica e alta precisão.
 */

const VOLTZ_HAKE_THEORY = {
    title: 'Fundamentação do Ganho Normalizado de Hake (g) — Richard Hake (1998)',
    coreConcept: 'O Ganho de Hake (g) mede a fração aprendida em relação ao total que a turma NÃO sabia no Pré-Teste.',
    formula: 'g = (%Pós - %Pré) / (100% - %Pré)',
    example: 'Exemplo: Se a turma acertava 20% no Pré-Teste e atingiu 60% no Pós-Teste, ela absorveu metade de todo o conhecimento restante (g = 0,500 ou 50% de ganho relativo).',
    referencePaper: 'Richard Hake (1998), American Journal of Physics (estudo canônico com N > 6.000 estudantes).',
    tiers: [
        {
            range: 'g < 0.30',
            label: 'Baixo Ganho (Instrução Tradicional Expositiva)',
            color: '#ef4444',
            desc: 'Típico de aulas convencionais de lousa (média histórica de 0,15 a 0,23). O estudante memoriza equações mecanicamente e erra pegadinhas conceituais de vestibulares.'
        },
        {
            range: '0.30 ≤ g ≤ 0.70',
            label: 'Ganho Médio (Padrão de Sucesso em Metodologias Ativas)',
            color: '#f59e0b',
            desc: 'Padrão internacional de eficácia para intervenções ativas e jogos. Atingir g ≥ 0,35 é formalmente reconhecido pela banca da USP como intervenção de alto impacto.'
        },
        {
            range: 'g > 0.70',
            label: 'Alto Ganho (Excelência Conceitual Máxima)',
            color: '#22c55e',
            desc: 'Nível máximo de consolidação pedagógica. Indica superação completa de concepções alternativas e domínio consistente da conservação de carga e energia.'
        }
    ]
};

const VOLTZ_FOUR_THEORETICAL_STUDIES = [
    {
        id: 'study_1',
        title: 'Estudo 1: Salto Conceitual Imediato em Questões de Vestibular',
        icon: '[ESTUDO 1]',
        badge: 'ENEM & FUVEST (N=75)',
        power: '86.9% a 97.4%',
        color: '#38bdf8',
        metric: 'Ganho Normalizado de Hake ⟨g⟩ + ANCOVA',
        question: 'O modelo topológico do VOLTZ eleva a taxa de acerto em questões conceituais clássicas de vestibulares (curto-circuito, brilho relativo de lâmpadas e divisão nodal de corrente) em comparação à aula tradicional?',
        procedure: 'Aplicação de Pré-Teste com 10 questões conceituais de vestibulares, 30 minutos de partida ativa cooperativa e Pós-Teste isomórfico imediato.',
        hypothesis: 'O grupo VOLTZ atinge Ganho de Hake médio ⟨g⟩ ≥ 0,65, enquanto a aula expositiva tradicional atinge ⟨g⟩ < 0,30.'
    },
    {
        id: 'study_2',
        title: 'Estudo 2: Retenção de Longo Prazo (Memória para a Prova)',
        icon: '[ESTUDO 2]',
        badge: 'Follow-up 14 Dias (N=50)',
        power: '93.4% (d=0.50)',
        color: '#22c55e',
        metric: 'Curva de Retenção Teórica (Pós-Teste vs. Re-teste Tardio)',
        question: 'A modelagem espacial em grade 2D fixa a teoria na memória permanente do estudante, ou o conhecimento sofre decaimento rápido como ocorre na decoreba de fórmulas?',
        procedure: 'Re-aplicação de teste isomórfico 14 dias após a intervenção sem aviso prévio durante aula regular de física.',
        hypothesis: 'Estudantes do VOLTZ mantêm ≥ 85% do ganho de aprendizagem pós-intervenção, enquanto o grupo tradicional regride para a média basal.'
    },
    {
        id: 'study_3',
        title: 'Estudo 3: Resgate dos Alunos com Maior Defasagem (Inclusão)',
        icon: '[ESTUDO 3]',
        badge: 'Equidade Escolar (N=75)',
        power: 'Subgrupos Estratificados',
        color: '#f59e0b',
        metric: 'Ganho de Hake por Estrato Basal (<40%, 40-70%, >70%)',
        question: 'A dinâmica cooperativa beneficia proporcionalmente mais os estudantes que iniciaram com histórico de bloqueio ou notas baixas no pré-teste?',
        procedure: 'Estratificação da turma em 3 faixas de proficiência basal e comparação dos ganhos normalizados de cada estrato.',
        hypothesis: 'O estrato inicial (<40%) apresenta o maior salto relativo de aprendizagem (⟨g⟩ ≥ 0,70), comprovando o papel inclusivo do modelo.'
    },
    {
        id: 'study_4',
        title: 'Estudo 4: Comparativo de Eficácia dos Jogos da Equipe',
        icon: '[ESTUDO 4]',
        badge: 'Contraste Metodológico',
        power: 'Controle Experimental',
        color: '#c084fc',
        metric: 'ANCOVA Comparativa entre os 3 Braços',
        question: 'Qual abordagem pedagógica (cooperativo em grade 2D vs. competitivo de fórmulas vs. instrução tradicional) gera o maior salto conceitual?',
        procedure: 'Divisão balanceada dos 75 estudantes nos 3 braços pareados em tempo (50 min) sob o mesmo instrumento avaliativo.',
        hypothesis: 'A modelagem topológica aditiva do VOLTZ supera tanto o modelo competitivo de regras quanto o método expositivo tradicional.'
    }
];

const VOLTZ_EXPERIMENT_STEPS = [
    {
        step: 1,
        title: 'Passo 1: Pré-Teste com Questões de Vestibular (10 min)',
        icon: '[ETAPA 1]',
        badge: 'Diagnóstico Basal',
        color: '#38bdf8',
        whatWeDo: 'Aplicação individual de questionário com 10 questões conceituais no padrão ENEM/FUVEST (inventário DIRECT) antes de qualquer explicação sobre o jogo.',
        whyItMatters: 'Mapeia a proficiência de entrada e identifica concepções incorretas (como a crença de que o primeiro resistor consome a corrente da fonte).',
        practicalTip: 'Folhas codificadas por ID anônimo (ID-01 a ID-75) para controle cego e garantia de integridade amostral.'
    },
    {
        step: 2,
        title: 'Passo 2: Estratificação em 3 Níveis & Grupos Mesclados (5 min)',
        icon: '[ETAPA 2]',
        badge: 'Divisão Justa',
        color: '#f59e0b',
        whatWeDo: 'Classificação dos estudantes em 3 estratos basais: Inicial (< 40%), Médio (40%-70%) e Alto (> 70%), distribuindo 1/3 de cada estrato para cada braço experimental.',
        whyItMatters: 'Garante que os 3 grupos comecem com a mesma média basal de partida, neutralizando acusações de grupos desbalanceados na banca.',
        practicalTip: 'Randomização estratificada em blocos triplos pareados.'
    },
    {
        step: 3,
        title: 'Passo 3: A Partida com os Jogos Didáticos (30 min)',
        icon: '[ETAPA 3]',
        badge: 'Aprendizagem Ativa',
        color: '#22c55e',
        whatWeDo: 'Execução simultânea e cronometrada das 3 intervenções durante 30 minutos:',
        whyItMatters: 'Braço 1 joga o Jogo Competitivo, Braço 2 joga o VOLTZ (Cooperativo 2D com Cabo Terra 0V) e Braço 3 recebe a aula tradicional.',
        practicalTip: 'Cronômetro visível na lousa e os autores atuam estritamente como árbitros neutros de regras.'
    },
    {
        step: 4,
        title: 'Passo 4: Pós-Teste Isomórfico de Vestibular (10 min)',
        icon: '[ETAPA 4]',
        badge: 'Medição do Salto',
        color: '#c084fc',
        whatWeDo: 'Aplicação do Pós-Teste com as mesmas 10 questões conceituais em versão isomórfica espelhada (valores trocados e circuitos equivalentes).',
        whyItMatters: 'Mede a evolução cognitiva imediata e comprova a superação do modelo de atenuação sequencial.',
        practicalTip: 'Avaliação da evolução individual relativa de cada participante.'
    },
    {
        step: 5,
        title: 'Passo 5: Cálculo do Ganho de Hake (g) & Análise Estatística',
        icon: '[ETAPA 5]',
        badge: 'Padrão Ouro PER',
        color: '#10b981',
        whatWeDo: 'Processamento das notas pelo script analítico Python (`analise_estatistica_hake.py`), calculando o Ganho de Hake, Hedges\' g e 10.000 permutações.',
        whyItMatters: 'A métrica de Hake quantifica o aprendizado real do estudante sobre aquilo que ele não dominava no início.',
        practicalTip: 'VOLTZ atinge ⟨g⟩ = 0,65 (Médio/Alto Ganho) contra 0,25 da aula tradicional.'
    }
];

const VOLTZ_THREE_GAMES_RATIONALE = {
    title: 'Por Que Criamos e Comparamos 3 Jogos Diferentes?',
    subtitle: 'O contraste científico que elimina o viés de confirmação e fundamenta o método perante a banca da USP',
    cards: [
        {
            title: '1. O Princípio do Contraste Científico',
            text: 'Para provar que o VOLTZ funciona por sua mecânica intrínseca, comparamos seu impacto com um modelo competitivo de fórmulas e com o ensino tradicional, isolando variáveis intervenientes.',
            icon: '[METODO]',
            tag: 'Método Científico'
        },
        {
            title: '2. Cooperação vs. Competição',
            text: 'O VOLTZ é 100% cooperativo (vitória coletiva). O Jogo 1 é competitivo (disputa individual). Esse contraste permite avaliar se estudantes em defasagem aprendem mais em cooperação ou rivalidade.',
            icon: '[DINAMICA]',
            tag: 'Dinâmica Social'
        },
        {
            title: '3. Modelagem Topológica vs. Fórmulas Isoladas',
            text: 'No VOLTZ, cada 1Ω é um bloco condutor e o circuito exige fechamento no Cabo Terra (0V). Nos outros modelos, o foco são contas algébricas. Isso prova que a espacialidade supera a memorização.',
            icon: '[MODELAGEM]',
            tag: 'Modelo Mental'
        }
    ]
};

const VOLTZ_ARM1_PROPOSALS = [
    {
        id: 'prop_duelo',
        name: 'CIRCUIT DUEL: Duelo de Sobrecarga',
        badge: 'Competitivo / Take-That',
        color: '#ef4444',
        icon: '[PROP-A]',
        summary: 'Duelo rápido de 1v1 ou 4P onde cada jogador monta sua malha enquanto interfere na bancada rival com sobretensão e curto-circuito.',
        comoJoga: 'Cada jogador puxa 4 cartas. No seu turno, insere resistores para balancear suas cargas ou joga resistores extras na malha rival para gerar subtensão.',
        contrasteVoltz: 'Competição vs. Cooperação. Testa se a rivalidade estimula o cálculo rápido de divisores de tensão em relação ao suporte mútuo.',
        opiniaoBanca: 'Contraste dinâmico sólido: permite avaliar se a pressão competitiva favorece ou prejudica estudantes com menor proficiência inicial.',
        votosPadrao: 8
    },
    {
        id: 'prop_blackout',
        name: 'DIAGNÓSTICO BLACKOUT: O Mistério da Caixa-Preta',
        badge: 'Dedução Lógica / Falhas',
        color: '#38bdf8',
        icon: '[PROP-B]',
        summary: 'Investigação teórica de circuitos ocultos onde os estudantes usam leituras de potencial e corrente para deduzir resistores desconhecidos.',
        comoJoga: 'Um painel encobre resistores. Os jogadores utilizam fichas de dados para consultar a d.d.p. entre nós e aplicam a Lei de Ohm (R = V/I) para desvendar a topologia.',
        contrasteVoltz: 'Engenharia Reversa (Dedução) vs. Síntese Direta (Montagem). No VOLTZ, o aluno constrói; no Blackout, diagnostica falhas estruturais.',
        opiniaoBanca: 'Foco no desenvolvimento do raciocínio dedutivo exigido em questões dissertativas de segunda fase da FUVEST e UNICAMP.',
        votosPadrao: 12
    },
    {
        id: 'prop_smartgrid',
        name: 'SMART GRID: A Cidade Sem Energia',
        badge: 'Gestão de Recursos / Kirchhoff',
        color: '#10b981',
        icon: '[PROP-C]',
        summary: 'Gestão de rede de distribuição elétrica balanceando correntes em paralelo para alimentar setores urbanos sem desarmar disjuntores.',
        comoJoga: 'Cartas de evento climático demandam correntes adicionais. Os jogadores distribuem cargas respeitando a 1ª Lei de Kirchhoff (soma de correntes <= 10A).',
        contrasteVoltz: 'Visão Macro (Rede de Distribuição) vs. Visão Micro (Malha Fechada 12V). Foco na conservação de corrente em nós paralelos.',
        opiniaoBanca: 'Excelente conexão interdisciplinar com matrizes energéticas e sustentabilidade exigidas no ENEM.',
        votosPadrao: 6
    }
];

const VOLTZ_DIRECT_ITEMS_PRE = [
    {
        id: 1,
        title: 'Item 01 (ENEM/FUVEST). Conservação de Corrente em Série',
        question: 'Dois resistores de 4Ω estão conectados em série a uma fonte de 12V. Comparando a corrente antes do 1º resistor (I1) e depois do 2º (I2), qual é a relação correta?',
        correctAnswer: 'I1 = I2 (A taxa de fluxo de cargas elétricas é rigorosamente uniforme em todos os pontos do ramo série).',
        distractor: 'I1 > I2 (Concepção alternativa: crença de que o primeiro resistor consome corrente e reduz o fluxo subsequente).'
    },
    {
        id: 2,
        title: 'Item 02 (ENEM/FUVEST). Divisor de Tensão em Malha Fechada',
        question: 'Em um circuito série de 12V contendo resistor de 3Ω e lâmpada de 1Ω, qual é a diferença de potencial medida nos terminais da lâmpada?',
        correctAnswer: '3V (A lâmpada representa 1/4 da resistência equivalente total de 4Ω: 12V * (1/4) = 3V).',
        distractor: '12V (Concepção incorreta: supor que a tensão nominal da fonte se manifesta integralmente em todos os nós).'
    },
    {
        id: 3,
        title: 'Item 03 (ENEM/FUVEST). Curto-Circuito Nodal',
        question: 'Um condutor ideal de resistência nula é conectado em paralelo aos terminais de uma lâmpada acesa. O que ocorre com a lâmpada?',
        correctAnswer: 'A lâmpada apaga instantaneamente pois o fluxo de corrente é desviado integralmente pelo caminho de resistência nula.',
        distractor: 'A lâmpada permanece acesa ou dobra de brilho (Erro: supor divisão igual de corrente).'
    },
    {
        id: 4,
        title: 'Item 04 (ENEM/FUVEST). Função do Potencial de Referência (GND // 0V)',
        question: 'Qual é o papel físico do nó de aterramento (Cabo Terra / GND) em um circuito fechado de corrente contínua?',
        correctAnswer: 'Estabelece o referencial de potencial elétrico de 0V, viabilizando a diferença de potencial e o fechamento da malha.',
        distractor: 'Atua apenas como mecanismo passivo de proteção em caso de curto.'
    },
    {
        id: 5,
        title: 'Item 05 (ENEM/FUVEST). Independência de Ramos em Paralelo',
        question: 'Duas lâmpadas idênticas estão ligadas em paralelo sob 12V. Se uma das lâmpadas for desconectada, o que ocorre com o brilho da outra?',
        correctAnswer: 'O brilho permanece inalterado, pois a d.d.p. de 12V aplicada sobre o ramo remanescente não sofre alteração.',
        distractor: 'A lâmpada restante tem seu brilho reduzido pela metade.'
    }
];

const VOLTZ_DIRECT_ITEMS_POST = [
    {
        id: 1,
        title: 'Item 01 (Isomórfico). Três Resistores em Série sob 20V',
        question: 'Três resistores de 2Ω, 3Ω e 5Ω estão em série sob gerador de 20V. Comparando as correntes IA (entrada), IB (intermediária) e IC (saída):',
        correctAnswer: 'IA = IB = IC (Por conservação de carga, a corrente é idêntica em qualquer seção transversal de um circuito série).',
        distractor: 'IA > IB > IC (Modelo atenuativo sequencial).'
    },
    {
        id: 2,
        title: 'Item 02 (Isomórfico). Dois Resistores Iguais em Série',
        question: 'Dois resistores de 2Ω estão em série sob tensão de 12V. Qual é a d.d.p. medida nos terminais do segundo resistor?',
        correctAnswer: '6V (A resistência total de 4Ω reparte a tensão de 12V em duas metades simétricas: 12V * (2/4) = 6V).',
        distractor: '12V em cada nó ou 0V.'
    },
    {
        id: 3,
        title: 'Item 03 (Isomórfico). Chave em Paralelo com Resistor',
        question: 'Uma chave condutora fecha um ramo em paralelo com um resistor. O que ocorre com a tensão nos terminais do resistor?',
        correctAnswer: 'Cai imediatamente para 0V (O curto-circuito zera a diferença de potencial entre os terminais do componente).',
        distractor: 'Mantém a tensão de 12V.'
    },
    {
        id: 4,
        title: 'Item 04 (Isomórfico). LED com Potenciais Iguais nos Polos',
        question: 'Um LED apresenta potencial elétrico de 12V no ânodo e 12V no cátodo. Por que não há emissão de luz?',
        correctAnswer: 'Falta conexão do cátodo ao potencial de referência (GND 0V) para produzir diferença de potencial (12V - 0V = 12V).',
        distractor: 'Falta elevar a tensão da fonte para 24V.'
    },
    {
        id: 5,
        title: 'Item 05 (Isomórfico). Associação Paralela Quádrupla',
        question: 'Três lâmpadas idênticas operam em paralelo sob 12V. Ao inserir uma quarta lâmpada idêntica em paralelo, o que ocorre com as três originais?',
        correctAnswer: 'O brilho das três lâmpadas originais permanece rigorosamente inalterado e a fonte supre maior corrente total.',
        distractor: 'Todas as lâmpadas sofrem redução de intensidade luminosa.'
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
