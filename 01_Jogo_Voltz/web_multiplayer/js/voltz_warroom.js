/**
 * PORTAL VOLTZ — Painel da Jornada FEBRACE & Matriz de Urgência da Equipe
 * Mapeia as 4 etapas da jornada, a Matriz de Prioridades em 3 Níveis e o Roteiro de Pitch Oral.
 */

const FEBRACE_JOURNEY_STAGES = [
    {
        stage: 'Etapa 1',
        title: 'Submissão Virtual (Até 02 de Outubro)',
        badge: 'Inscrição no Site',
        color: '#38bdf8',
        icon: '💻',
        items: [
            'Plano de Pesquisa preenchido no padrão FEBRACE.',
            'Relatório Científico Completo (em formato artigo ABNT).',
            'Diário de Bordo digitalizado com fotos e atas de reuniões.',
            'Vídeo de 3 minutos apresentando a equipe e o jogo na prática.',
            'Resumo da pesquisa de até 2.500 caracteres.',
            'Termos de Consentimento (TCLE/TALE) dos estudantes assinados.'
        ]
    },
    {
        stage: 'Etapa 2',
        title: 'Avaliação & Triagem às Cegas (Outubro a Dezembro)',
        badge: 'Comitê USP',
        color: '#f59e0b',
        icon: '🔍',
        items: [
            'Avaliação técnica por doutores e pesquisadores da USP.',
            'Critérios de rigor metodológico, clareza do problema e análise estatística.',
            'Divulgação oficial dos projetos finalistas e semifinalistas convidados.'
        ]
    },
    {
        stage: 'Etapa 3',
        title: 'A Grande Feira Presencial na USP (São Paulo - Março)',
        badge: 'Estande Oficial',
        color: '#22c55e',
        icon: '🏛️',
        items: [
            'Montagem do estande oficial na tenda da Poli-USP / InovaUSP.',
            'Pôster científico impresso em lona (90cm x 120cm).',
            'Bancada com o jogo VOLTZ físico pronto para os jurados jogarem 1 turno ao vivo.',
            'Pitch oral de 5 minutos com domínio firme das Leis de Ohm e Kirchhoff.'
        ]
    },
    {
        stage: 'Etapa 4',
        title: 'Premiação & Credenciais Internacionais (Final)',
        badge: 'Medalhas & ISEF',
        color: '#c084fc',
        icon: '🏆',
        items: [
            'Medalhas de 1º, 2º, 3º e 4º lugar por categoria de Engenharia / Ciências Exatas.',
            'Prêmios especiais da Sociedade Brasileira de Física (SBF) e InovaUSP.',
            'Bolsas de Iniciação Científica Júnior do CNPq para os integrantes.',
            'Credenciamento de delegação para a Regeneron ISEF (Maior feira mundial nos EUA).'
        ]
    }
];

const FEBRACE_PRIORITY_MATRIX = [
    {
        level: 'Nível 1',
        title: '🔴 NÍVEL 1: CRÍTICO & URGENTE (Prazo Inscrição: 02/10)',
        color: '#ef4444',
        badge: 'Prazo 02/10',
        tasks: [
            {
                id: 'n1_diario',
                title: 'Diário de Bordo Oficial',
                desc: 'Criar caderno datado com registros das reuniões, fotos dos protótipos de cartas e anotações de regras corrigidas.',
                responsible: 'João Vitor',
                status: true,
                weight: 25
            },
            {
                id: 'n1_plano',
                title: 'Plano de Pesquisa Formal',
                desc: 'Documento de 3 a 5 páginas com a metodologia dos 3 grupos estratificados e termos TCLE/TALE.',
                responsible: 'David',
                status: true,
                weight: 25
            },
            {
                id: 'n1_artigo',
                title: 'Relatório Científico / Artigo ABNT',
                desc: 'Texto acadêmico completo com Introdução, Metodologia, Resultados Esperados e Referências bibliográficas.',
                responsible: 'David',
                status: true,
                weight: 30
            },
            {
                id: 'n1_video',
                title: 'Vídeo de Apresentação de 3 Minutos',
                desc: 'Gravação simples da equipe demonstrando as cartas na mesa e explicando o problema dos circuitos.',
                responsible: 'Parceiro 3 & Toda a Equipe',
                status: false,
                weight: 20
            }
        ]
    },
    {
        level: 'Nível 2',
        title: '🟡 NÍVEL 2: ALTA PRIORIDADE (Execução da Pesquisa na Escola)',
        color: '#f59e0b',
        badge: 'Aplicação Real',
        tasks: [
            {
                id: 'n2_impressao_cartas',
                title: 'Imprimir 6 Cópias do Baralho de Testes',
                desc: 'Imprimir os baralhos em papel sulfite ou 180g para levar nas mesas da escola.',
                responsible: 'João Vitor',
                status: false,
                weight: 35
            },
            {
                id: 'n2_impressao_testes',
                title: 'Imprimir Questionários de Pré-Teste e Pós-Teste',
                desc: '1 folha frente e verso codificada (ID-01 a ID-75) para cada estudante da turma.',
                responsible: 'Parceiro 3',
                status: false,
                weight: 35
            },
            {
                id: 'n2_tabular_python',
                title: 'Tabular Notas no CSV e Rodar Script Python',
                desc: 'Digitar as notas coletadas e executar `analise_estatistica_hake.py` para gerar os gráficos finais.',
                responsible: 'David',
                status: true,
                weight: 30
            }
        ]
    },
    {
        level: 'Nível 3',
        title: '🟢 NÍVEL 3: IMPORTANTE PARA A FEIRA PRESENCIAL (Pós-Classificação)',
        color: '#22c55e',
        badge: 'Estande Poli-USP',
        tasks: [
            {
                id: 'n3_poster',
                title: 'Diagramação do Pôster Oficial (90x120cm)',
                desc: 'Montar o layout vetorial com gráficos e fotos dos baralhos para impressão em lona com canaleta.',
                responsible: 'David & Equipe',
                status: false,
                weight: 50
            },
            {
                id: 'n3_pitch',
                title: 'Ensaiar o Pitch Oral de 3 a 5 Minutos',
                desc: 'Treinar as falas na ponta da língua para responder aos jurados e professores da USP.',
                responsible: 'Toda a Equipe',
                status: true,
                weight: 50
            }
        ]
    }
];

const FEBRACE_PITCH_SCRIPT = [
    {
        minuto: 'Minuto 1',
        foco: 'O Problema Real da Sala de Aula',
        fala: 'Vocês sabiam que 8 em cada 10 alunos do ensino médio acham que a corrente elétrica "gasta" no primeiro resistor e não sobra nada pros outros? As aulas tradicionais forçam a decorar fórmulas (V = R·I) sem ensinar como o circuito se comporta como uma malha viva.'
    },
    {
        minuto: 'Minuto 2',
        foco: 'A Nossa Solução: O Jogo VOLTZ',
        fala: 'Nós criamos o VOLTZ: um jogo cooperativo em grade 2D onde cada 1Ω é um bloco físico de cobre e o circuito só fecha e gera corrente se estiver conectado ao Cabo Terra (0V) ou voltar para a fonte de 12V.'
    },
    {
        minuto: 'Minuto 3',
        foco: 'A Comprovação Estatística (N = 75)',
        fala: 'Testamos com 75 estudantes divididos em 3 grupos com pré e pós-teste padronizado (DIRECT). O grupo do VOLTZ alcançou Ganho de Hake de g = 0,65, contra apenas 0,25 da aula tradicional de lousa, com p < 0,00001 no teste de permutação.'
    },
    {
        minuto: 'Minuto 4',
        foco: 'A Prova de Bancada (Far Transfer)',
        fala: 'Depois do teste no papel, levamos os alunos para a bancada real com multímetro e protoboard. 80% dos alunos do VOLTZ acertaram a montagem de primeira sem queimar nada, contra apenas 20% da aula tradicional.'
    },
    {
        minuto: 'Minuto 5',
        foco: 'Impacto Social & Convite ao Jurado',
        fala: 'Cada baralho do VOLTZ custa menos de R$ 25 para imprimir. Com menos de R$ 200, qualquer escola pública do Brasil atende uma sala inteira sem computador nem internet. Convidamos os professores a jogarem 1 turno aqui na nossa bancada!'
    }
];

class VoltzWarRoom {
    constructor() {
        this.storageKey = 'voltz_febrace_priorities_v4';
        this.journey = FEBRACE_JOURNEY_STAGES;
        this.matrix = this.loadPriorityMatrix();
        this.pitch = FEBRACE_PITCH_SCRIPT;
    }

    loadPriorityMatrix() {
        try {
            const saved = localStorage.getItem(this.storageKey);
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
        return JSON.parse(JSON.stringify(FEBRACE_PRIORITY_MATRIX));
    }

    savePriorityMatrix() {
        try {
            const statusMap = {};
            this.matrix.forEach(level => {
                level.tasks.forEach(t => {
                    statusMap[t.id] = t.status;
                });
            });
            localStorage.setItem(this.storageKey, JSON.stringify(statusMap));
        } catch (e) {}
    }

    toggleTask(taskId) {
        for (const level of this.matrix) {
            const task = level.tasks.find(t => t.id === taskId);
            if (task) {
                task.status = !task.status;
                this.savePriorityMatrix();
                break;
            }
        }
        return this.getReadinessScore();
    }

    getReadinessScore() {
        let total = 0;
        let done = 0;
        this.matrix.forEach(level => {
            level.tasks.forEach(t => {
                total += 1;
                if (t.status) done += 1;
            });
        });
        return total === 0 ? 0 : Math.round((done / total) * 100);
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
