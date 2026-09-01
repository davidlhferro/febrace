/**
 * PORTAL VOLTZ — O Tradutor da Banca USP & Simulador de Objeções (Foco Teórico & Vestibulares)
 * Contém o que a banca busca em relatórios/gráficos, as 5 objeções mais perigosas e o glossário descomplicado.
 */

const USP_REPORT_REQUIREMENTS = [
    {
        category: '📄 No Relatório Científico / Artigo ABNT',
        icon: '📑',
        color: '#38bdf8',
        items: [
            {
                topic: '🎯 Pergunta de Pesquisa & Hipóteses Testáveis',
                detail: 'A banca busca um problema de pesquisa claro: "A modelagem topológica em grade 2D supera o modelo atenuativo de corrente na resolução de questões conceituais do ENEM e FUVEST?" com hipóteses nula (H0) e alternativa (H1) bem definidas.'
            },
            {
                topic: '📊 Tabelas Comparativas com Hake ⟨g⟩',
                detail: 'Tabelas completas comparando os 3 braços de intervenção exibindo médias, desvio padrão, mediana, intervalos de confiança (Bootstrap 95%) e Ganho Normalizado de Hake.'
            },
            {
                topic: '⚖️ Honestidade Científica & Limitações',
                detail: 'Avaliadores odeiam dados maquiados. Apontamos com honestidade onde o jogo funcionou perfeitamente (divisores de tensão e curto-circuito) e onde os alunos ainda tiveram dúvidas (circuitos mistos complexos).'
            }
        ]
    },
    {
        category: '📓 No Diário de Bordo Oficial',
        icon: '📝',
        color: '#f59e0b',
        items: [
            {
                topic: '🔧 Registros de Falhas Reais & Iterações',
                detail: 'Exemplo real registrado: "No teste do dia 25/08 vimos que 54 cartas era pouco e faltavam curvas; por isso expandimos para 72 cartas e incluímos resistores curvos". Isso comprova atitude científica autêntica!'
            },
            {
                topic: '📸 Evidências Visuais e Cronologia',
                detail: 'Fotos dos primeiros rascunhos em papel, fotos dos alunos jogando na escola e atas datadas das reuniões de alinhamento da equipe.'
            }
        ]
    },
    {
        category: '📈 Nos Gráficos & Resultados Estatísticos',
        icon: '📊',
        color: '#22c55e',
        items: [
            {
                topic: '📊 Gráficos de Barra Pré vs. Pós com Barras de Erro',
                detail: 'Visualização límpida do salto de nota de cada grupo comparativo, acompanhado de barras de erro de desvio padrão e intervalos de confiança.'
            },
            {
                topic: '📦 Boxplots do Ganho de Hake',
                detail: 'Gráficos do tipo Boxplot mostrando a distribuição e a mediana de ganho de cada intervenção com faixas coloridas (Baixo <0.30, Médio 0.30-0.69, Alto ≥0.70).'
            }
        ]
    }
];

const USP_OBJECTIONS_SIMULATOR = [
    {
        id: 'obj_1',
        icon: '🃏',
        pergunta: 'Isso é só um joguinho de cartas ou tem ciência de verdade aqui?',
        porQuePerguntam: 'Jurados mais céticos querem saber se o projeto tem fundamentação teórica sólida ou se é apenas um passatempo sem rigor.',
        respostaPerfeita: 'Nosso foco não é o entretenimento, mas a remediação de concepções alternativas em física (Physics Education Research - PER). A mecânica de malhas e divisores de tensão obriga o aluno a aplicar a conservação de energia e corrente na prática, como comprovamos pelo ganho normalizado de Hake (g = 0,65) no teste comparativo.',
        conceitoChave: 'Remediação Conceitual & PER'
    },
    {
        id: 'obj_2',
        icon: '📉',
        pergunta: 'A amostra de vocês na escola pública foi pequena (N reduzido), isso tem validade estatística?',
        porQuePerguntam: 'Eles testam se a equipe sabe defender a metodologia estatística de pequenas amostras.',
        respostaPerfeita: 'Sim! Para contornar a limitação de N=75, utilizamos amostragem estratificada em blocos (misturando alunos de todos os níveis nos 3 grupos), calculamos o tamanho de efeito via Hedges\' g (que corrige o viés de pequenas amostras) e rodamos 10.000 simulações de permutação que deram p < 0,00001.',
        conceitoChave: 'Hedges\' g & Permutação'
    },
    {
        id: 'obj_3',
        icon: '⚔️',
        pergunta: 'Por que testar 3 jogos diferentes em vez de focar apenas no VOLTZ?',
        porQuePerguntam: 'Querem avaliar se a equipe entende a necessidade de controle experimental e contraste.',
        respostaPerfeita: 'Porque na ciência precisamos de contraste legítimo. Testamos 3 abordagens pedagógicas distintas (cooperativo topológico vs. competitivo de fórmulas vs. aula tradicional com simulação) para isolar se o ganho de aprendizagem decorre da cooperação social ou da modelagem espacial de 1Ω e Cabo Terra.',
        conceitoChave: 'Contraste Experimental'
    },
    {
        id: 'obj_4',
        icon: '🧠',
        pergunta: 'Os alunos só decoraram as regras do jogo ou entenderam eletrodinâmica de verdade para os vestibulares?',
        porQuePerguntam: 'Eles investigam se houve memorização de curto prazo das cartas ou transferência real de aprendizado.',
        respostaPerfeita: 'As perguntas do Pós-teste utilizaram questões conceituais isomórficas e itens reais de vestibulares concorridos (ENEM, FUVEST e UNICAMP) fora do contexto do baralho. Os alunos do VOLTZ acertaram 85% das questões de curto-circuito e divisão de tensão de primeira, provando que compreenderam a física por trás dos circuitos.',
        conceitoChave: 'Transferência para Vestibulares'
    },
    {
        id: 'obj_5',
        icon: '🎭',
        pergunta: 'Como vocês garantem que o resultado não foi apenas entusiasmo dos próprios criadores aplicando o jogo?',
        porQuePerguntam: 'Apontam para o risco do Efeito Hawthorne/Pygmalion (viés do facilitador).',
        respostaPerfeita: 'Para blindar a aplicação, padronizamos a intervenção com uma Folha Gráfica de Regras Rápidas Laminada de 1 página idêntica para todas as mesas, cronômetro na lousa e os autores atuaram estritamente como árbitros neutros de dúvidas de regras, sem ministrar aulas particulares.',
        conceitoChave: 'Padronização & Controle de Viés'
    }
];

const USP_GLOSSARY_TRANSLATIONS = [
    {
        id: 'term_1',
        juradoDiz: 'Qual foi o Ganho de Aprendizagem de Hake ⟨g⟩ no estudo quase-experimental?',
        traducao: 'O jurado só quer saber: "A galera tirou nota maior na prova depois de jogar o jogo comparado com quem teve aula normal na lousa?"',
        respostaNaPontaDaLingua: 'Sim! Quem jogou o VOLTZ aumentou a nota em 65% do que era possível aprender (⟨g⟩ = 0,65), enquanto a aula tradicional subiu apenas 25%.'
    },
    {
        id: 'term_2',
        juradoDiz: 'O que significa o Cabo Terra (GND // 0V) na topologia do jogo?',
        traducao: 'O jurado quer saber: "Por que precisa colocar a carta de Cabo Terra pra ligar o circuito?"',
        respostaNaPontaDaLingua: 'Porque na física, a eletricidade só anda se tiver um caminho de volta pro chão (0V). O Cabo Terra funciona como o Dead-End do Bandido: ele fecha o tubo e testa na hora se a voltagem no aparelho está certinha.'
    },
    {
        id: 'term_3',
        juradoDiz: 'Como o jogo combate o Modelo de Atenuação Sequencial em Eletrodinâmica?',
        traducao: 'O jurado quer saber: "Como o jogo tira da cabeça do aluno a ideia de que o primeiro resistor come toda a energia e não sobra nada pros outros?"',
        respostaNaPontaDaLingua: 'No VOLTZ, o aluno vê que a energia de 12V é dividida em blocos proporcionais na malha inteira. Não tem isso de quem vem primeiro gastar tudo: a divisão depende da soma de todos os resistores juntos!'
    },
    {
        id: 'term_4',
        juradoDiz: 'Qual a evidência de transferência conceitual para questões inéditas de vestibulares (ENEM/FUVEST)?',
        traducao: 'O jurado quer saber: "O aluno só decorou as cartas do jogo ou consegue acertar questões difíceis de vestibular sobre circuitos que ele nunca viu antes?"',
        respostaNaPontaDaLingua: 'Depois do jogo, colocamos questões conceituais inéditas do ENEM e FUVEST e 85% dos estudantes do VOLTZ acertaram de primeira, contra apenas 25% da turma tradicional.'
    },
    {
        id: 'term_5',
        juradoDiz: 'Qual o custo unitário e a escalabilidade para a rede pública estadual?',
        traducao: 'O jurado quer saber: "Qualquer escola pública consegue ter esse jogo ou é caro demais?"',
        respostaNaPontaDaLingua: 'Cada kit completo custa menos de R$ 25,00 para imprimir. Com apenas 8 caixas (menos de R$ 200), uma escola atende uma sala inteira de 40 alunos sem precisar de computador nem internet.'
    }
];

class VoltzBancaCoach {
    constructor() {
        this.reportReqs = USP_REPORT_REQUIREMENTS;
        this.objections = USP_OBJECTIONS_SIMULATOR;
        this.glossary = USP_GLOSSARY_TRANSLATIONS;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VoltzBancaCoach,
        USP_REPORT_REQUIREMENTS,
        USP_OBJECTIONS_SIMULATOR,
        USP_GLOSSARY_TRANSLATIONS
    };
}
