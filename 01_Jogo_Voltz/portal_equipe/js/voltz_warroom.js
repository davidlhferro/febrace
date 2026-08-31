/**
 * PORTAL VOLTZ — Painel de Missões FEBRACE (Linguagem Descomplicada)
 * Cards explicativos que mostram exatamente o que fazer sem juridiquês ou termos pedantes.
 */

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

class VoltzWarRoom {
    constructor() {
        this.storageKey = 'voltz_febrace_warroom_human_v2';
        this.items = this.loadChecklist();
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
    module.exports = { VoltzWarRoom, FEBRACE_CHECKLIST_DEFAULT };
}
