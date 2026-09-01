/**
 * PORTAL VOLTZ — Painel da Jornada FEBRACE & Metas da Equipe
 * Mapeia as 4 etapas da jornada: Submissão Virtual, Triagem, Feira Presencial na USP e Premiações/ISEF.
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

const FEBRACE_CHECKLIST_DEFAULT = [
    {
        id: 'doc_diario',
        title: '1. Diário de Bordo Oficial (O Caderno da Equipe)',
        tag: 'Registro Diário',
        weight: 20,
        status: true,
        queE: 'É o caderno onde a gente anota dia a dia tudo o que testou, fotos das partidas na escola e o que deu certo ou errado.',
        porQuePede: 'A banca de jurados da USP ama ver os erros que a gente cometeu e como corrigimos cada um. Isso prova que o projeto é 100% nosso e autêntico!',
        comoFazer: 'Basta registrar as partidas na aba "Diário de Bordo" aqui do portal e clicar no botão "Imprimir / PDF" para encadernar.'
    },
    {
        id: 'doc_relatorio',
        title: '2. Relatório Científico (O Artigo do Jogo)',
        tag: 'Artigo Completo',
        weight: 30,
        status: true,
        queE: 'É o texto formal da pesquisa explicando por que o jogo VOLTZ ajuda os alunos a entender circuitos elétricos muito melhor do que uma aula chata só de lousa.',
        porQuePede: 'Para avaliar se a gente testou o jogo com turmas reais de alunos e se as notas deles realmente subiram depois de jogar.',
        comoFazer: 'O artigo já está pronto na pasta `02_Febrace_Pesquisa/artigo/` com os gráficos de notas e comparações de turmas.'
    },
    {
        id: 'doc_plano',
        title: '3. Plano de Pesquisa & Autorização de Ética (Formulário 4)',
        tag: 'Documentação Escolar',
        weight: 20,
        status: true,
        queE: 'O documento inicial que autoriza a gente a aplicar os testes de física com os estudantes na escola com autorização dos pais (TCLE).',
        porQuePede: 'A FEBRACE e a feira internacional (ISEF) exigem que qualquer teste com pessoas garanta sigilo total e autorização assinada.',
        comoFazer: 'Preencher o Formulário 4 padrão da FEBRACE e guardar os termos de autorização assinados na pasta do projeto.'
    },
    {
        id: 'doc_resumo',
        title: '4. Resumo da Inscrição (Texto Curto de 2.500 caracteres)',
        tag: 'Inscrição no Site',
        weight: 15,
        status: true,
        queE: 'Um textinho direto ao ponto resumindo: qual era o problema (física difícil), o que a gente criou (o jogo VOLTZ) e o resultado (todo mundo aprendeu).',
        porQuePede: 'É o primeiro texto que os jurados leem na triagem virtual para decidir se o projeto vai para a final na USP.',
        comoFazer: 'Copiar o resumo pronto do artigo e colar no formulário de inscrição da FEBRACE.'
    },
    {
        id: 'doc_poster_video',
        title: '5. Vídeo de 3 Minutos & Pôster de Bancada (90x120cm)',
        tag: 'Apresentação Visual',
        weight: 15,
        status: false,
        queE: 'O vídeo rápido da equipe jogando na mesa e o banner gigante que fica atrás do nosso estande na feira presencial.',
        porQuePede: 'Para a banca ver a nossa energia ao vivo e avaliar se a gente sabe explicar o projeto com clareza e entusiasmo.',
        comoFazer: 'Gravar um vídeo de 3 minutos no celular mostrando a partida de 3 jogadores e mandar o pôster para imprimir em lona.'
    }
];

const FEBRACE_TEAM_TASKS_DEFAULT = [
    { task: 'Artigo & Estatística de Ganho de Hake', responsible: 'David', status: 'Concluído 🟢' },
    { task: 'Diário de Bordo & Playtests na Escola', responsible: 'João Vitor', status: 'Em Andamento 🟡' },
    { task: 'Gravação do Vídeo de 3 Minutos na Mesa', responsible: 'Parceiro 3 & David', status: 'Próxima Etapa ⏳' },
    { task: 'Impressão do Pôster 90x120cm em Lona', responsible: 'Toda a Equipe', status: 'Aguardando ⏳' },
    { task: 'Formulário 4 e Termos de Consentimento (TCLE)', responsible: 'João Vitor', status: 'Concluído 🟢' }
];

class VoltzWarRoom {
    constructor() {
        this.storageKey = 'voltz_febrace_warroom_human_v3';
        this.items = this.loadChecklist();
        this.journey = FEBRACE_JOURNEY_STAGES;
        this.tasks = FEBRACE_TEAM_TASKS_DEFAULT;
    }

    loadChecklist() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) return JSON.parse(saved);
        } catch (e) {}
        return JSON.parse(JSON.stringify(FEBRACE_CHECKLIST_DEFAULT));
    }

    saveChecklist() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (e) {}
    }

    toggleItem(id) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.status = !item.status;
            this.saveChecklist();
        }
        return this.getReadinessScore();
    }

    getReadinessScore() {
        let totalWeight = 0;
        let earnedWeight = 0;
        for (const item of this.items) {
            totalWeight += item.weight;
            if (item.status) earnedWeight += item.weight;
        }
        return Math.round((earnedWeight / totalWeight) * 100);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzWarRoom, FEBRACE_CHECKLIST_DEFAULT, FEBRACE_JOURNEY_STAGES, FEBRACE_TEAM_TASKS_DEFAULT };
}
