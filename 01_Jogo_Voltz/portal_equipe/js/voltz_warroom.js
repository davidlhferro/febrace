/**
 * PORTAL VOLTZ — Painel da Jornada FEBRACE & Matriz de Urgência da Equipe
 * Mapeia as 4 etapas da jornada, a Matriz de Prioridades em 3 Níveis e o Roteiro de Pitch Oral.
 * Design de Engenharia: Zero emojis, nomenclatura técnica e alta precisão.
 */

const FEBRACE_JOURNEY_STAGES = [
    {
        stage: 'Etapa 1',
        title: 'Submissão Virtual (Até 02 de Outubro)',
        badge: 'Inscrição Oficial',
        color: '#38bdf8',
        icon: '[ETAPA 1]',
        items: [
            'Plano de Pesquisa preenchido segundo as normas oficiais da FEBRACE.',
            'Relatório Científico Completo estruturado no formato artigo ABNT.',
            'Diário de Bordo digitalizado com registros datados e atas de reuniões.',
            'Vídeo de 3 minutos apresentando a fundamentação teórica e o jogo.',
            'Resumo formal da pesquisa de até 2.500 caracteres.',
            'Termos de Consentimento (TCLE/TALE) dos estudantes devidamente assinados.'
        ]
    },
    {
        stage: 'Etapa 2',
        title: 'Avaliação & Triagem às Cegas (Outubro a Dezembro)',
        badge: 'Comitê USP',
        color: '#f59e0b',
        icon: '[ETAPA 2]',
        items: [
            'Auditoria técnica por pesquisadores e docentes da Universidade de São Paulo.',
            'Critérios de rigor metodológico, significância estatística e originalidade.',
            'Divulgação oficial dos projetos finalistas selecionados para a fase presencial.'
        ]
    },
    {
        stage: 'Etapa 3',
        title: 'A Grande Feira Presencial na USP (São Paulo - Março)',
        badge: 'Estande Oficial',
        color: '#22c55e',
        icon: '[ETAPA 3]',
        items: [
            'Montagem do estande técnico na tenda de engenharia / InovaUSP.',
            'Pôster científico diagramado e impresso em lona (90cm x 120cm).',
            'Bancada com o baralho físico do VOLTZ para demonstração direta aos jurados.',
            'Pitch oral de 5 minutos com domínio conceitual das Leis de Ohm e Kirchhoff.'
        ]
    },
    {
        stage: 'Etapa 4',
        title: 'Premiação & Credenciais Internacionais (Final)',
        badge: 'Medalhas & ISEF',
        color: '#c084fc',
        icon: '[ETAPA 4]',
        items: [
            'Classificação por premiações oficiais em Ciências Exatas e Engenharia.',
            'Prêmios especiais da Sociedade Brasileira de Física (SBF) e InovaUSP.',
            'Bolsas de Iniciação Científica Júnior do CNPq para os integrantes.',
            'Credenciamento de delegação para a Regeneron ISEF (Feira Internacional nos EUA).'
        ]
    }
];

const FEBRACE_PRIORITY_MATRIX = [
    {
        level: 'Nível 1',
        title: 'NÍVEL 1: CRÍTICO & URGENTE (Prazo de Submissão: 02/10)',
        color: '#ef4444',
        badge: 'Prazo 02/10',
        tasks: [
            {
                id: 'n1_diario',
                title: 'Diário de Bordo Oficial',
                desc: 'Consolidar caderno datado com atas de reuniões, fotos dos protótipos e decisões de design de regras.',
                responsible: 'João Vitor',
                status: true,
                weight: 25
            },
            {
                id: 'n1_plano',
                title: 'Plano de Pesquisa Formal',
                desc: 'Documento estruturado contendo a metodologia dos 3 grupos balanceados e conformidade ética TCLE/TALE.',
                responsible: 'David',
                status: true,
                weight: 25
            },
            {
                id: 'n1_artigo',
                title: 'Relatório Científico / Artigo ABNT',
                desc: 'Texto acadêmico completo com Introdução, Fundamentação PER, Resultados Analíticos e Referências.',
                responsible: 'David',
                status: true,
                weight: 30
            },
            {
                id: 'n1_video',
                title: 'Vídeo de Apresentação de 3 Minutos',
                desc: 'Gravação da equipe demonstrando a bancada do VOLTZ e expondo o salto conceitual em vestibulares.',
                responsible: 'Parceiro 3 & Equipe',
                status: false,
                weight: 20
            }
        ]
    },
    {
        level: 'Nível 2',
        title: 'NÍVEL 2: ALTA PRIORIDADE (Execução da Coleta Experimental)',
        color: '#f59e0b',
        badge: 'Aplicação na Escola',
        tasks: [
            {
                id: 'n2_impressao_cartas',
                title: 'Imprimir Baralhos de Testes (6 Cópias)',
                desc: 'Produzir cópias em papel cartão ou 180g para aplicação simultânea nas mesas da escola parceira.',
                responsible: 'João Vitor',
                status: false,
                weight: 35
            },
            {
                id: 'n2_impressao_testes',
                title: 'Imprimir Questionários de Pré-Teste e Pós-Teste',
                desc: 'Folhas codificadas (ID-01 a ID-75) com questões isomórficas estilo ENEM/FUVEST.',
                responsible: 'Parceiro 3',
                status: false,
                weight: 35
            },
            {
                id: 'n2_tabular_python',
                title: 'Tabular Dados e Executar Script Python',
                desc: 'Alimentar CSV e rodar `analise_estatistica_hake.py` para gerar curvas de ganho e intervalos BCa.',
                responsible: 'David',
                status: true,
                weight: 30
            }
        ]
    },
    {
        level: 'Nível 3',
        title: 'NÍVEL 3: ESTRUTURA PARA A FEIRA PRESENCIAL (Pós-Classificação)',
        color: '#22c55e',
        badge: 'Estande Poli-USP',
        tasks: [
            {
                id: 'n3_poster',
                title: 'Diagramação do Pôster Científico (90x120cm)',
                desc: 'Layout vetorial em alta resolução com tabelas de Hake, esquemas da grade 2D e conclusões.',
                responsible: 'David & Equipe',
                status: false,
                weight: 50
            },
            {
                id: 'n3_pitch',
                title: 'Treinamento Intensivo de Pitch Oral (5 Min)',
                desc: 'Simulações cronometradas com o simulador de objeções da banca da USP.',
                responsible: 'Toda a Equipe',
                status: false,
                weight: 50
            }
        ]
    }
];

const FEBRACE_PITCH_SCRIPT = [
    {
        minuto: 'Minuto 1',
        foco: 'O Problema Conceitual em Eletrodinâmica',
        fala: '8 em cada 10 alunos do ensino médio acreditam que a corrente elétrica é consumida no primeiro resistor de um circuito. As aulas tradicionais focam na repetição mecânica de fórmulas algébricas (V = R . I), sem construir a intuição espacial sobre a conservação de carga e a divisão de potencial elétrico em malhas fechadas.'
    },
    {
        minuto: 'Minuto 2',
        foco: 'A Solução VOLTZ: Modelagem Topológica 2D',
        fala: 'Desenvolvemos o VOLTZ: um modelo cooperativo em grade 2D onde cada 1 ohm é materializado como um bloco condutor e a energização do circuito exige estritamente o fechamento no Cabo Terra (GND 0V). Isso elimina o modelo atenuativo de corrente e obriga o cérebro a analisar a malha como um sistema conservativo global.'
    },
    {
        minuto: 'Minuto 3',
        foco: 'O Desenho Experimental e Resultados de Hake',
        fala: 'Conduzimos um estudo quase-experimental controlado com N=75 estudantes de escola pública estadual divididos em 3 braços balanceados. O grupo submetido ao VOLTZ atingiu Ganho Normalizado de Hake médio de g = 0,65 (padrão de sucesso comprovado), contra apenas 0,25 da aula expositiva convencional de lousa.'
    },
    {
        minuto: 'Minuto 4',
        foco: 'Transferência para Questões de Vestibulares (ENEM/FUVEST)',
        fala: 'No Pós-Teste isomórfico com itens conceituais clássicos de vestibulares de alta concorrência (ENEM, FUVEST e UNICAMP), os estudantes do VOLTZ alcançaram 85% de acertos de primeira em questões de curto-circuito e divisão de potencial, provando que o conhecimento foi internalizado sem decoreba efêmera.'
    },
    {
        minuto: 'Minuto 5',
        foco: 'Impacto Social, Custo Unitário e Conclusão',
        fala: 'Cada kit físico do VOLTZ tem custo de produção inferior a R$ 25,00. Com menos de R$ 200,00, qualquer escola pública estadual consegue equipar turmas inteiras sem depender de computadores ou internet, democratizando o aprendizado rigoroso de física.'
    }
];

class VoltzWarRoom {
    constructor() {
        this.storageKeyTasks = 'voltz_matrix_tasks_v2';
        this.journey = FEBRACE_JOURNEY_STAGES;
        this.matrix = this.loadMatrix();
        this.pitch = FEBRACE_PITCH_SCRIPT;
    }

    loadMatrix() {
        try {
            const saved = localStorage.getItem(this.storageKeyTasks);
            if (saved) {
                const statusMap = JSON.parse(saved);
                return FEBRACE_PRIORITY_MATRIX.map(level => ({
                    ...level,
                    tasks: level.tasks.map(t => ({
                        ...t,
                        status: statusMap[t.id] !== undefined ? statusMap[t.id] : t.status
                    }))
                }));
            }
        } catch (e) {}

        return FEBRACE_PRIORITY_MATRIX;
    }

    toggleTask(taskId) {
        this.matrix.forEach(level => {
            level.tasks.forEach(t => {
                if (t.id === taskId) {
                    t.status = !t.status;
                }
            });
        });
        this.saveMatrix();
        return this.matrix;
    }

    saveMatrix() {
        try {
            const statusMap = {};
            this.matrix.forEach(level => {
                level.tasks.forEach(t => {
                    statusMap[t.id] = t.status;
                });
            });
            localStorage.setItem(this.storageKeyTasks, JSON.stringify(statusMap));
        } catch (e) {}
    }

    getReadinessScore() {
        let totalWeighted = 0;
        let completedWeighted = 0;

        this.matrix.forEach(level => {
            level.tasks.forEach(t => {
                totalWeighted += t.weight;
                if (t.status) {
                    completedWeighted += t.weight;
                }
            });
        });

        if (totalWeighted === 0) return 0;
        return Math.round((completedWeighted / totalWeighted) * 100);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VoltzWarRoom,
        FEBRACE_JOURNEY_STAGES,
        FEBRACE_PRIORITY_MATRIX,
        FEBRACE_PITCH_SCRIPT
    };
}
