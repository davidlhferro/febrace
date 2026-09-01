/**
 * PORTAL VOLTZ — Hub de Planejamento da Pesquisa Científica FEBRACE
 * Tradução cristalina e sem jargões da metodologia científica para a equipe.
 */

const VOLTZ_RESEARCH_PLAN = {
    overview: {
        title: 'Estudo de Eficácia do Jogo VOLTZ no Ensino de Eletrodinâmica',
        sample: '75 Estudantes (3 turmas de 3º ano do Ensino Médio)',
        school: 'Escola Pública Estadual',
        duration: '4 Semanas (Intervenção de 8 horas/aula)',
        hypothesis: 'Estudantes que aprendem circuitos com o jogo cooperativo VOLTZ alcançam ganho de aprendizagem de Hake (g > 0.70) significativamente superior a turmas com aulas tradicionais ou softwares virtuais.'
    },

    pillars: [
        {
            id: 'pillar_experiment',
            title: '1. O Experimento Prático na Escola',
            badge: 'Amostra N=75',
            color: '#22c55e',
            icon: '🏫',
            summary: 'Como organizamos as turmas de estudantes sem interferir nas aulas normais.',
            details: [
                { label: 'Turma A (Controle 1):', text: '25 alunos com aulas expositivas tradicionais na lousa e resolução de exercícios do livro didático.' },
                { label: 'Turma B (Controle 2):', text: '25 alunos no laboratório de informática usando simuladores virtuais na tela (PhET Interactive Simulations).' },
                { label: 'Turma C (Experimental - VOLTZ):', text: '25 alunos jogando em trios cooperativos com o baralho físico e portal digital do VOLTZ.' }
            ],
            whyJudgesLove: 'Os jurados da USP exigem grupos de comparação legítimos para provar que a melhora nas notas veio do jogo, e não de outros fatores externos.'
        },

        {
            id: 'pillar_tests',
            title: '2. Pré-Teste vs. Pós-Teste (Teste DIRECT)',
            badge: 'Diagnóstico Conceitual',
            color: '#38bdf8',
            icon: '📝',
            summary: 'O questionário padronizado internacionalmente para medir o raciocínio físico antes e depois da intervenção.',
            details: [
                { label: 'Pré-Teste (Antes de Jogar):', text: '12 questões conceituais para mapear as dúvidas clássicas (ex: achar que a corrente "gasta" ao passar pelo primeiro resistor).' },
                { label: 'Pós-Teste (Depois de Jogar):', text: 'O mesmo teste com ordem aleatorizada para medir se os conceitos foram assimilados.' },
                { label: 'O que avaliamos:', text: '1ª Lei de Ohm (V = R·I), Divisores de Tensão, Circuitos em Série/Paralelo e Papel do Terra/GND.' }
            ],
            whyJudgesLove: 'Usar um teste padronizado (DIRECT) dá credibilidade mundial ao trabalho, permitindo comparação direta com pesquisas de Harvard e USP.'
        },

        {
            id: 'pillar_hake',
            title: '3. Ganho Normalizado de Hake (g)',
            badge: 'Métrica de Ouro',
            color: '#f59e0b',
            icon: '📈',
            summary: 'A fórmula matemática que prova a porcentagem de evolução real da turma.',
            formula: 'g = (% Pós - % Pré) / (100% - % Pré)',
            details: [
                { label: 'g < 0.30 (Baixo Ganho):', text: 'Típico de aulas tradicionais onde o aluno só decora fórmulas sem entender o circuito.' },
                { label: '0.30 ≤ g ≤ 0.69 (Médio Ganho):', text: 'Bom aprendizado obtido com simuladores de computador.' },
                { label: 'g ≥ 0.70 (Alto Ganho):', text: '🌟 O NOSSO ALVO: Prova que os estudantes aprenderam mais de 70% do que não sabiam antes!' }
            ],
            whyJudgesLove: 'O Ganho de Hake elimina o viés de turmas que começam sabendo mais ou menos, medindo apenas o mérito pedagógico do jogo.'
        },

        {
            id: 'pillar_far_transfer',
            title: '4. Transferência Remota (Far Transfer na Protoboard)',
            badge: 'Prática de Bancada',
            color: '#c084fc',
            icon: '🔌',
            summary: 'A prova final de fogo: levar os alunos para a bancada real com multímetro e componentes eletrônicos.',
            details: [
                { label: 'O Desafio:', text: 'Montar fisicamente na protoboard o circuito de divisor de tensão aprendido na carta sem queimar o LED ou o resistor.' },
                { label: 'A Medição com Multímetro:', text: 'Os alunos medem com as pontas de prova e conferem se a voltagem real no componente bate com o cálculo mental do jogo.' }
            ],
            whyJudgesLove: 'Demonstra que o jogo não é apenas um passatempo isolado, mas ensina habilidades práticas transferíveis para o mundo real da engenharia.'
        }
    ]
};

class VoltzResearchManager {
    constructor() {
        this.data = VOLTZ_RESEARCH_PLAN;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzResearchManager, VOLTZ_RESEARCH_PLAN };
}
