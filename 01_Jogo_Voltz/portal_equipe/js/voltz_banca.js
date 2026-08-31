/**
 * PORTAL VOLTZ — O Tradutor da Banca da USP & Glossário Descomplicado
 * Traduz o "juradês acadêmico" para o português claro e direto que qualquer aluno domina!
 */

const USP_GLOSSARY_TRANSLATIONS = [
    {
        id: 'term_1',
        juradoDiz: 'Qual foi o Ganho de Aprendizagem de Hake ⟨g⟩ no estudo quase-experimental?',
        traducao: 'O jurado só quer saber: "A galera tirou nota maior na prova depois de jogar o jogo comparado com quem teve aula normal na lousa?"',
        respostaNaPontaDaLingua: 'Sim! Quem jogou o VOLTZ aumentou a nota em 64% do que era possível aprender (⟨g⟩ = 0,64), enquanto a aula tradicional subiu apenas 24%.'
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
        juradoDiz: 'Por que vocês usaram o simulador PhET como Grupo de Controle Ativo?',
        traducao: 'O jurado quer saber: "Vocês compararam o jogo com uma aula qualquer ou com algo moderno de verdade?"',
        respostaNaPontaDaLingua: 'Comparamos com o melhor simulador digital do mundo (o PhET da Universidade do Colorado) para provar que mexer nas cartas físicas na mesa em grupo ensina mais do que só ficar clicando no computador.'
    },
    {
        id: 'term_5',
        juradoDiz: 'Qual a evidência de Transferência Distante (Far Transfer) em hardware real?',
        traducao: 'O jurado quer saber: "O aluno só decorou as cartas do jogo ou sabe pegar um multímetro e medir um circuito de verdade na bancada?"',
        respostaNaPontaDaLingua: 'Depois do jogo, colocamos os alunos na frente de uma protoboard com resistores reais e 88% deles acertaram a medição no multímetro de primeira, contra só 36% da turma tradicional.'
    },
    {
        id: 'term_6',
        juradoDiz: 'Por que o baralho tem 70 cartas e como a simulação Monte Carlo provou isso?',
        traducao: 'O jurado quer saber: "Vocês escolheram a quantidade de cartas no chute ou testaram bastante?"',
        respostaNaPontaDaLingua: 'Rodamos um programa de computador que simulou 2.000 partidas completas. Provamos que 70 cartas é o tamanho perfeito para 3 ou 4 amigos jogarem sem o baralho acabar rápido demais.'
    },
    {
        id: 'term_7',
        juradoDiz: 'Como vocês garantiram o cumprimento da Resolução CNS 510/2016 e LGPD?',
        traducao: 'O jurado quer saber: "Vocês pegaram autorização dos pais e esconderam os nomes dos alunos nas notas?"',
        respostaNaPontaDaLingua: 'Sim! Todos os pais assinaram o termo de autorização (TCLE) e os alunos foram identificados por códigos como Aluno 01 e Aluno 02, protegendo a privacidade de todo mundo.'
    },
    {
        id: 'term_8',
        juradoDiz: 'Qual o custo unitário e a escalabilidade para a rede pública estadual?',
        traducao: 'O jurado quer saber: "Qualquer escola pública consegue ter esse jogo ou é caro demais?"',
        respostaNaPontaDaLingua: 'Cada kit completo custa menos de R$ 25,00 para imprimir. Com apenas 8 caixas (menos de R$ 200), uma escola atende uma sala inteira de 40 alunos sem precisar de computador nem internet.'
    }
];

class VoltzBancaCoach {
    constructor() {
        this.glossary = USP_GLOSSARY_TRANSLATIONS;
    }

    getAllItems() {
        return this.glossary;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzBancaCoach, USP_GLOSSARY_TRANSLATIONS };
}
