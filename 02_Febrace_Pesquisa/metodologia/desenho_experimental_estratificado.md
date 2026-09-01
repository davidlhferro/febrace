# 📐 Desenho Experimental Estratificado & Protocolo de Coleta — FEBRACE 2026

**Projeto**: Remediação Ativa de Concepções Alternativas em Eletrodinâmica: Estudo Quase-Experimental com Modelagem Topológica Cooperativa no Ensino Médio Público  
**Equipe**: David, João Vitor e Parceiro 3  
**Área**: Ensino de Física (Physics Education Research - PER)  
**Instituição**: Escola Estadual de Ensino Médio da Rede Pública  

---

## 1. OBJETIVO DO PROTOCOLO EXPERIMENTAL

Avaliar o impacto pedagógico relativo de 3 intervenções didáticas diferenciadas no ensino de eletrodinâmica (circuitos elétricos DC, Leis de Ohm e Kirchhoff), medindo o **Ganho Normalizado de Hake ($\langle g \rangle$)**, a superação do **Modelo de Atenuação Sequencial** e a capacidade de **Transferência Distante (*Far Transfer*)** em montagem física de protoboard com multímetro.

---

## 2. POPULAÇÃO E ESTRATIFICAÇÃO BASAL ($T_0$)

### 2.1. Amostra Total
* **População**: $N = 75$ estudantes do 3º ano do Ensino Médio de escola pública estadual.
* **Critério de Inclusão**: Estudantes com matrícula ativa, presença integral na sessão de intervenção e termos TCLE/TALE devidamente assinados.

### 2.2. Classificação em 3 Estratos de Proficiência
Antes de qualquer intervenção, todos os $N=75$ estudantes realizam o Pré-Teste diagnóstico ($T_0$) contendo 10 itens conceituais do inventário DIRECT:

1. 🔴 **Estrato 1 — Nível Inicial / Dificuldade Alta ($< 40\%$ de acertos)**:
   - *Perfil*: Alunos com bloqueio cognitivo severo e forte adesão ao modelo de atenuação sequencial (acreditam que a corrente "gasta" no primeiro resistor e não entendem o papel do terra/GND).
2. 🟡 **Estrato 2 — Nível Intermediário ($40\% - 70\%$ de acertos)**:
   - *Perfil*: Alunos que aplicam a fórmula $V = R \cdot I$ de forma mecânica em circuitos de uma malha simples, mas erram divisores de tensão, curto-circuitos e ramos paralelos.
3. 🟢 **Estrato 3 — Nível Avançado ($> 70\%$ de acertos)**:
   - *Perfil*: Alunos com boa intuição de conservação de carga e raciocínio algébrico consolidado.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           ESTRATIFICAÇÃO E RANDOMIZAÇÃO EM BLOCOS (N=75)                        │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                  AMOSTRA TOTAL: N = 75 ESTUDANTES                               │
│                                                 │                                               │
│                                  [ PRÉ-TESTE DIAGNÓSTICO T0 ]                                   │
│                                                 │                                               │
│             ┌───────────────────────────────────┼───────────────────────────────────┐           │
│             ▼                                   ▼                                   ▼           │
│   🔴 ESTRATO 1 (Baixo <40%)          🟡 ESTRATO 2 (Médio 40-70%)         🟢 ESTRATO 3 (Alto >70%) │
│          (~25 alunos)                        (~35 alunos)                        (~15 alunos)   │
│             │                                   │                                   │           │
│             └───────────────────────────┬───────┴───────────────────────────────────┘           │
│                                         ▼                                                       │
│                           [ RANDOMIZAÇÃO EM BLOCOS TRIPLOS ]                                    │
│                    (Distribuição de 1/3 de cada estrato para cada grupo)                        │
│                                         │                                                       │
│         ┌───────────────────────────────┼───────────────────────────────┐                       │
│         ▼                               ▼                               ▼                       │
│   [ BRAÇO 1 ]                     [ BRAÇO 2 ]                     [ BRAÇO 3 ]                   │
│   Controle Ativo (PhET)           VOLTZ (Cooperativo 2D)          Simulação Analítica           │
│   - 8 alunos Estrato 1            - 8 alunos Estrato 1            - 8 alunos Estrato 1          │
│   - 12 alunos Estrato 2           - 12 alunos Estrato 2           - 12 alunos Estrato 2         │
│   - 5 alunos Estrato 3            - 5 alunos Estrato 3            - 5 alunos Estrato 3          │
│   Total: n = 25 alunos            Total: n = 25 alunos            Total: n = 25 alunos          │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. OS 3 BRAÇOS EXPERIMENTAIS PAREADOS (50 MINUTOS)

### 🔵 Braço 1: Controle Ativo (Aula Tradicional + Simulador PhET)
* **Atividade**: Aula expositiva dialogada conduzida pelo professor regular com resolução de exercícios na lousa e projeção do simulador computacional PhET (*Circuit Construction Kit DC*).
* **Tempo**: 10 min Pré-teste + 30 min aula/simulador + 10 min Pós-teste.

### 🟢 Braço 2: Experimental (VOLTZ: Modelagem Topológica Cooperativa)
* **Atividade**: Jogo cooperativo em trios com baralho físico em grade 2D (*Bandido*), onde os alunos conectam cartas de 12V com blocos de $1\Omega$ e fecham o circuito com a carta de Cabo Terra (GND 0V).
* **Tempo**: 10 min Pré-teste + 3 min briefing + 24 min partida ativa + 10 min Pós-teste + 3 min Far Transfer.

### 🟣 Braço 3: Simulação Analítica / Competitiva (Jogo de Tabuleiro)
* **Atividade**: Jogo de tabuleiro competitivo de cálculo algébrico de equações de circuito, onde cada jogador disputa pontos resolvendo valores de corrente e tensão individualmente.
* **Tempo**: 10 min Pré-teste + 3 min briefing + 24 min partida ativa + 10 min Pós-teste.

---

## 4. BANCO DE QUESTÕES CONCEITUAIS ISOMÓRFICAS (DIRECT)

### 📋 Mapeamento de Itens: Pré-Teste ($T_0$) vs. Pós-Teste ($T_1$)

| Item | Conceito Físico Avaliado | Concepção Alternativa Alvo | Item $T_0$ | Item $T_1$ (Isomórfico) |
| :--- | :--- | :--- | :--- | :--- |
| **Q1** | Conservação de Corrente em Série | Modelo de Atenuação Sequencial | 2 resistores iguais sob 12V ($I_1 = I_2$) | 3 resistores diferentes sob 20V ($I_A = I_B = I_C$) |
| **Q2** | Divisor de Tensão Proporcional | Tensão Constante em todos os nós | $3\Omega + 1\Omega$ sob 12V $\to V_L = 3\text{V}$ | $2\Omega + 2\Omega$ sob 12V $\to V_2 = 6\text{V}$ |
| **Q3** | Curto-Circuito em Nó | Crença de corrente dividida em curto | Fio ideal em paralelo com lâmpada | Chave fechada em paralelo com resistor |
| **Q4** | Função do Terra (GND / 0V) | Aterramento visto como mero dreno | Nó aterrado em circuito fechado | LED apagado com 12V em ambos os polos |
| **Q5** | Associação em Paralelo | Interdependência de ramos paralelos | Remoção de 1 lâmpada em paralelo | Inserção de 4ª lâmpada em paralelo |
| **Q6** | Resistência Equivalente Série | Adição de resistor aumenta corrente | Inserção de novo resistor em série | Redução de resistência de potenciômetro |
| **Q7** | Lei dos Nós de Kirchhoff | Corrente dividida sempre ao meio | Nó com entrada 3A $\to 1\text{A} + 2\text{A}$ | Nó Y com 1.5A + 2.5A $\to 4.0\text{A}$ |
| **Q8** | Circuito Aberto vs Fechado | Tensão nula em chave aberta | Medição em chave aberta ($12\text{V}$) | Rompimento de condutor ($I = 0\text{A}$) |
| **Q9** | Efeito Joule e Dissipação | Primeiro resistor dissipa mais calor | $2\Omega$ vs $4\Omega$ em série sob 12V | Resistor série para proteger carga de 4V |
| **Q10**| Diagnóstico Far Transfer | D.d.p. nula interpretada como falha | Multímetro medindo 0V na protoboard | Sobretensão em LED ao trocar resistor |

---

## 5. PROTOCOLO DE TESTE PRÁTICO EM PROTOBOARD (*FAR TRANSFER*)

Para demonstrar a retenção prática do modelo mental, após o Pós-teste cada aluno do Braço 2 (e uma subamostra aleatória dos Braços 1 e 3) passa por um teste cego individual de 3 minutos:

1. **Hardware Disponível**: Protoboard física, fonte DC 12V, jumpers, resistores comerciais IEC ($1\Omega, 2\Omega, 3\Omega$) e 1 LED piloto nominal (3V / 1Ω).
2. **Desafio**: *"Monte na bancada o circuito para acender o LED de 3V sem queimar usando a fonte de 12V."*
3. **Avaliação Instrumental**:
   - O estudante deve calcular mentalmente que precisa de $+3\Omega$ em série ($12\text{V} \cdot \frac{1\Omega}{3\Omega + 1\Omega} = 3\text{V}$).
   - O avaliador insere o multímetro na escala DC e afere a tensão real.
   - **Resultado**: Acerto ($1$) se $V = 3{,}0\text{V} \pm 0{,}3\text{V}$; Erro ($0$) se queimar por sobretensão ou não acender.

---

## 6. MODELO ESTATÍSTICO DE ANÁLISE (PEQUENAS AMOSTRAS)

1. **Ganho de Hake Individual**:
   $$g_i = \frac{\%T_{1, i} - \%T_{0, i}}{100\% - \%T_{0, i}}$$
2. **Tamanho de Efeito com Correção de Hedges ($g_{\text{Hedges}}$)**:
   $$g_{\text{Hedges}} = \left( \frac{\bar{X}_1 - \bar{X}_2}{S_{\text{pooled}}} \right) \cdot \left( 1 - \frac{3}{4(n_1 + n_2) - 9} \right)$$
3. **ANCOVA (Análise de Covariância)**:
   $$T_{1, ij} = \mu + \tau_i + \beta (T_{0, ij} - \bar{T}_0) + \epsilon_{ij}$$
4. **Intervalos de Confiança via Bootstrap (10.000 Réplicas)**:
   Geração de intervalos de 95% empíricos para garantir robustez mesmo com $N=75$.
