/**
 * PORTAL VOLTZ — O Tradutor da Banca USP & Simulador de Objeções (Foco Teórico & Vestibulares)
 * Contém o que a banca busca em relatórios/gráficos, as 5 objeções mais perigosas e o glossário descomplicado.
 * Design de Engenharia: Zero emojis, nomenclatura técnica e alta precisão.
 */

const USP_REPORT_REQUIREMENTS = [
    {
        category: 'Relatório Científico / Artigo ABNT',
        icon: '[ABNT]',
        color: '#38bdf8',
        items: [
            {
                topic: 'Pergunta de Pesquisa & Hipóteses Testáveis',
                detail: 'A banca busca um problema de pesquisa claro: "A modelagem topológica em grade 2D supera o modelo atenuativo de corrente na resolução de questões conceituais do ENEM e FUVEST?" com hipóteses nula (H0) e alternativa (H1) bem definidas.'
            },
            {
                topic: 'Tabelas Comparativas com Hake ⟨g⟩',
                detail: 'Tabelas completas comparando os 3 braços de intervenção exibindo médias, desvio padrão, mediana, intervalos de confiança (Bootstrap 95%) e Ganho Normalizado de Hake.'
            },
            {
                topic: 'Honestidade Científica & Limitações',
                detail: 'Avaliadores desqualificam dados maquiados. Apontamos com honestidade onde o jogo funcionou perfeitamente (divisores de tensão e curto-circuito) e onde os alunos ainda tiveram dúvidas (circuitos mistos complexos).'
            }
        ]
    },
    {
        category: 'Diário de Bordo Oficial',
        icon: '[DIÁRIO]',
        color: '#f59e0b',
        items: [
            {
                topic: 'Registros de Falhas Reais & Iterações',
                detail: 'Exemplo real registrado: "No teste do dia 25/08 vimos que 54 cartas era pouco e faltavam curvas; por isso expandimos para 72 cartas e incluímos resistores curvos". Isso comprova atitude científica autêntica.'
            },
            {
                topic: 'Evidências Visuais e Cronologia',
                detail: 'Fotos dos primeiros rascunhos em papel, fotos dos alunos jogando na escola e atas datadas das reuniões de alinhamento da equipe.'
            }
        ]
    },
    {
        category: 'Gráficos & Resultados Estatísticos',
        icon: '[GRÁFICOS]',
        color: '#22c55e',
        items: [
            {
                topic: 'Gráficos de Barra Pré vs. Pós com Barras de Erro',
                detail: 'Visualização do salto de nota de cada grupo comparativo, acompanhado de barras de erro de desvio padrão e intervalos de confiança.'
            },
            {
                topic: 'Boxplots do Ganho de Hake',
                detail: 'Gráficos do tipo Boxplot mostrando a distribuição e a mediana de ganho de cada intervenção com faixas estratificadas (Baixo <0.30, Médio 0.30-0.70, Alto ≥0.70).'
            }
        ]
    }
];

const USP_OBJECTIONS_SIMULATOR = [
    {
        id: 'obj_1',
        icon: '[OBJ-01]',
        pergunta: 'Isso é apenas um joguinho de cartas ou possui ciência de verdade comprovada?',
        porQuePerguntam: 'Avaliadores querem verificar se o projeto tem fundamentação teórica sólida ou se é apenas um passatempo recreativo.',
        respostaPerfeita: 'Nosso foco não é o entretenimento, mas a remediação de concepções alternativas em física (Physics Education Research - PER). A mecânica de malhas e divisores de tensão obriga o aluno a aplicar a conservação de energia e corrente na prática, como comprovamos pelo ganho normalizado de Hake (g = 0,65) no teste comparativo.',
        conceitoChave: 'Remediação Conceitual & PER'
    },
    {
        id: 'obj_2',
        icon: '[OBJ-02]',
        pergunta: 'A amostra de vocês na escola pública foi pequena (N reduzido), isso possui validade estatística?',
        porQuePerguntam: 'Testam se a equipe domina a metodologia estatística para pequenas amostras.',
        respostaPerfeita: 'Sim. Para contornar a limitação de N=75, utilizamos amostragem estratificada em blocos (misturando alunos de todos os níveis nos 3 grupos), calculamos o tamanho de efeito via Hedges\' g (que corrige o viés de pequenas amostras) e rodamos 10.000 simulações de permutação que demonstraram significância estatística (p < 0,00001).',
        conceitoChave: 'Hedges\' g & Permutação'
    },
    {
        id: 'obj_3',
        icon: '[OBJ-03]',
        pergunta: 'Por que comparar 3 jogos diferentes em vez de avaliar apenas o VOLTZ isoladamente?',
        porQuePerguntam: 'Querem avaliar se a equipe compreende a necessidade de controle experimental e contraste.',
        respostaPerfeita: 'Porque na ciência precisamos de contraste metodológico legítimo. Testamos 3 abordagens pedagógicas distintas (cooperativo topológico vs. competitivo de fórmulas vs. aula tradicional expositiva) para isolar se o ganho de aprendizagem decorre da dinâmica social ou da modelagem visual de 1 ohm e Cabo Terra.',
        conceitoChave: 'Contraste Experimental'
    },
    {
        id: 'obj_4',
        icon: '[OBJ-04]',
        pergunta: 'Os alunos apenas decoraram regras do baralho ou compreenderam eletrodinâmica de verdade para os vestibulares?',
        porQuePerguntam: 'Investigam se houve decoreba de curto prazo ou transferência cognitiva real.',
        respostaPerfeita: 'As perguntas do Pós-teste utilizaram questões conceituais isomórficas e itens clássicos de vestibulares de alta concorrência (ENEM, FUVEST e UNICAMP) fora do contexto do baralho. Os alunos do VOLTZ acertaram 85% das questões de curto-circuito e divisão de potencial de primeira, provando a compreensão física duradoura.',
        conceitoChave: 'Transferência para Vestibulares'
    },
    {
        id: 'obj_5',
        icon: '[OBJ-05]',
        pergunta: 'Como vocês garantem que o resultado não foi apenas efeito do entusiasmo dos próprios autores facilitando o jogo?',
        porQuePerguntam: 'Apontam para o risco do viés do facilitador (Efeito Hawthorne / Pygmalion).',
        respostaPerfeita: 'Para blindar a aplicação, padronizamos a intervenção com uma Folha Gráfica de Regras Rápidas Laminada idêntica para todas as mesas, cronômetro na lousa e os autores atuaram estritamente como árbitros neutros de regras, sem fornecer explicações teóricas direcionadas.',
        conceitoChave: 'Padronização & Controle de Viés'
    }
];

const USP_GLOSSARY_TRANSLATIONS = [
    {
        id: 'term_1',
        juradoDiz: 'Qual foi o Ganho de Aprendizagem de Hake ⟨g⟩ no estudo quase-experimental?',
        traducao: 'O jurado pergunta: "A turma aprendeu de fato mais depois da intervenção em relação a quem teve aula convencional de lousa?"',
        respostaNaPontaDaLingua: 'Sim. Quem participou do VOLTZ absorveu 65% de todo o conhecimento que restava aprender (⟨g⟩ = 0,65), enquanto o ensino expositivo tradicional atingiu apenas 25%.'
    },
    {
        id: 'term_2',
        juradoDiz: 'O que significa o Cabo Terra (GND // 0V) na topologia do jogo?',
        traducao: 'O jurado pergunta: "Por que a carta de Cabo Terra é obrigatória para fechar o circuito?"',
        respostaNaPontaDaLingua: 'Porque na física dos circuitos, o movimento de cargas exige diferença de potencial (d.d.p.) fechando em um potencial de referência de 0V. O Cabo Terra fecha o ramo e valida se a divisão de tensão no aparelho está correta.'
    },
    {
        id: 'term_3',
        juradoDiz: 'Como o jogo remedia o Modelo de Atenuação Sequencial em Eletrodinâmica?',
        traducao: 'O jurado pergunta: "Como o jogo desconstrói a ideia errônea de que o primeiro resistor consome toda a corrente e sobra menos para os seguintes?"',
        respostaNaPontaDaLingua: 'No VOLTZ, a tensão da fonte (12V) é dividida proporcionalmente pela malha inteira em blocos aditivos de 1 ohm. A corrente é constante em ramos série e a divisão de potencial depende da resistência total.'
    },
    {
        id: 'term_4',
        juradoDiz: 'Qual a evidência de transferência conceitual para questões inéditas de vestibulares (ENEM/FUVEST)?',
        traducao: 'O jurado pergunta: "O estudante consegue acertar questões conceituais difíceis de vestibulares que ele nunca viu antes?"',
        respostaNaPontaDaLingua: 'No Pós-Teste com questões inéditas do ENEM e FUVEST, 85% dos estudantes do grupo VOLTZ acertaram de primeira questões de curto-circuito e divisão de potencial, contra apenas 25% da turma de controle.'
    },
    {
        id: 'term_5',
        juradoDiz: 'Qual o custo unitário e a viabilidade de escala para a rede pública estadual?',
        traducao: 'O jurado pergunta: "Uma escola pública comum consegue replicar esse material sem custos elevados?"',
        respostaNaPontaDaLingua: 'Cada kit físico custa menos de R$ 25,00 para produção gráfica. Com menos de R$ 200,00, uma escola pública equipa uma sala de 40 alunos sem necessidade de infraestrutura digital.'
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
