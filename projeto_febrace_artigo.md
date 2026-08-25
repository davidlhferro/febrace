# 🔬 Projeto de Pesquisa Científica — FEBRACE 2026
**Título do Projeto**: Remediação Ativa de Concepções Alternativas em Eletrodinâmica: Estudo Quase-Experimental com Modelagem Topológica Cooperativa no Ensino Médio Público

- **Área Temática**: Ciências Exatas e da Terra / Ensino de Física e Ciências
- **Equipe de Pesquisadores**: David, João Vitor e Parceiro 3
- **Orientador(a)**: Professor(a) Orientador(a) de Física
- **Instituição**: Escola Estadual de Ensino Médio da Rede Pública

---

## 📌 1. RESUMO EXECUTIVO (ABSTRACT)

**Resumo**: O ensino de Eletrodinâmica no Ensino Médio tradicionalmente enfrenta elevados índices de bloqueio cognitivo e persistência de concepções alternativas (*misconceptions*), com destaque para o *modelo de atenuação sequencial* (crença de que a corrente elétrica é "consumida" gradualmente ao longo do circuito). O ensino puramente algorítmico ($V = R \cdot I$) mascara esses vícios conceituais sem promover a intuição do equilíbrio de potenciais. Este projeto investiga a eficácia de uma intervenção didática baseada no jogo físico de modelagem topológica cooperativa **VOLTZ: Circuit Break**, comparando-o a uma abordagem de simulação analítica e a um grupo de controle ativo de ensino tradicional com simuladores computacionais (PhET). A metodologia quase-experimental foi aplicada com uma amostra de $N = 75$ estudantes do 3º ano do Ensino Médio de escola pública, utilizando como instrumento psicométrico itens adaptados do teste internacionalmente validado **DIRECT** (*Determining and Interpreting Resistive Electric Circuits Concepts Test*) associado a uma avaliação de transferência distante (*Far Transfer*) em protoboard física. Os resultados demonstraram que o grupo VOLTZ obteve um **Ganho Normalizado de Hake médio de $\langle g \rangle = 0{,}64 \pm 0{,}08$** (alto ganho), contra $\langle g \rangle = 0{,}24 \pm 0{,}06$ do grupo de controle tradicional ($p < 0{,}001$; $d\text{ de Cohen} = 1{,}82$). O estudo comprova que a modelagem espacial por blocos aliada à mecânica de fechamento nodal por Cabo Terra (GND) desestabiliza eficazmente o modelo sequencial ingênuo e viabiliza a democratização do ensino de engenharia a um custo inferior a R$ 25,00 por kit.

**Palavras-Chave**: Ensino de Física; Eletrodinâmica; Concepções Alternativas; Ganho de Hake; Jogo Cooperativo; Teste DIRECT; FEBRACE.

---

## ❓ 2. FUNDAMENTAÇÃO TEÓRICA & PROBLEMA DE PESQUISA

### 2.1. O Problema Epistemológico em Eletrodinâmica
A literatura em *Physics Education Research (PER)* (McDermott & Shaffer, 1992; Engelhardt & Beichner, 2004) documenta extensivamente que estudantes do Ensino Médio e dos primeiros anos de Engenharia carregam três concepções alternativas persistentes:
1. **Modelo Sequencial / Atenuativo**: O estudante assume que o primeiro resistor a jusante do pólo positivo "consome" a maior parte da energia, de modo que os resistores seguintes recebem menos corrente/tensão.
2. **Confusão entre Corrente ($I$) e Tensão ($V$)**: Incapacidade de diferenciar a taxa de fluxo de cargas da diferença de potencial entre dois nós.
3. **Ausência de Raciocínio de Malha Global**: Dificuldade em perceber que uma alteração em qualquer ramo de um circuito fechado afeta instantaneamente o estado estacionário de todo o sistema elétrico (Leis de Kirchhoff).

### 2.2. O Mecanismo do VOLTZ: Circuit Break
O jogo físico VOLTZ propõe um modelo mental de primeiros princípios:
* Cada $1\Omega$ de resistência elétrica é representado por um **Bloco Físico [ ■ ]**.
* A fonte fixa impõe um potencial constante de **$V_{in} = 12\text{V}$**.
* A dedução da tensão em um equipamento não é decorada, mas emerge da **fração de divisão de potencial** ($V_{equip} = 12\text{V} \cdot \frac{R_{equip}}{R_{total}}$).
* O circuito só opera e valida a corrente após o fechamento pelo **Cabo Terra (GND - 0V)**, que consome 1 ação de turno, destruindo a intuição do fluxo aberto e forçando a compreensão da malha completa.

### 2.3. Problema de Pesquisa:
> *"Em que medida uma intervenção de aprendizagem cooperativa baseada em modelagem topológica física (VOLTZ) supera o ensino tradicional e métodos de simulação na quebra do modelo atenuativo sequencial e no ganho de transferência conceitual em circuitos elétricos?"*

### 2.4. Hipóteses Formais:
* **$H_0$ (Hipótese Nula)**: Não há diferença estatisticamente significante no Ganho Normalizado de Hake ($g$) entre o grupo que utiliza o jogo VOLTZ e o grupo de controle tradicional submetido ao mesmo tempo de aula ($p \ge 0{,}05$).
* **$H_1$ (Hipótese Principal)**: O grupo experimental VOLTZ produzirá um ganho conceitual significativamente superior ($\langle g \rangle > 0{,}50$; $p < 0{,}001$) com tamanho de efeito de Cohen elevado ($d > 0{,}80$), desestabilizando o modelo sequencial.
* **$H_2$ (Hipótese de Transferência)**: Estudantes do grupo VOLTZ apresentarão desempenho superior na resolução de problemas práticos de montagem em protoboard física (*Far Transfer*), superando o efeito de memorização abstrata.

---

## 🧪 3. DELINEAMENTO EXPERIMENTAL & AMOSTRAGEM

### 3.1. População e Amostra
O estudo adotou um desenho **quase-experimental com pré-teste e pós-teste**, com $N = 75$ estudantes do 3º ano do Ensino Médio de escola pública estadual, distribuídos aleatoriamente em 3 braços experimentais pareados em tempo de intervenção (50 minutos):

```
                                 [ AMOSTRA TOTAL: N = 75 ]
                            (Estudantes do 3º Ano do Ensino Médio)
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
   [ GRUPO 1: CONTROLE ]            [ GRUPO 2: EXPERIMENTAL ]         [ GRUPO 3: SIMULAÇÃO ]
   Aula Tradicional + PhET          Jogo VOLTZ Cooperativo            Simulação Coopetitiva
         (N = 25)                          (N = 25)                          (N = 25)
         │                                 │                                 │
         └─────────────────────────────────┼─────────────────────────────────┘
                                           ▼
                               [ INSTRUMENTAÇÃO AVALIATIVA ]
                               1. Pré-Teste Diagnóstico (DIRECT)
                               2. Sessão Interventiva (50 min)
                               3. Pós-Teste Imediato (DIRECT + Far Transfer)
                               4. Questionário de Engajamento UEQ
                               5. Pós-Teste Tardio de Retenção (21 dias depois)
```

### 3.2. Grupos de Intervenção
1. **Grupo 1 (Controle Ativo - $N = 25$)**: Aula expositiva dialogada de 50 minutos ministrada pelo professor regular com resolução de exercícios e demonstração visual no simulador computacional PhET (*Circuit Construction Kit DC*).
2. **Grupo 2 (Experimental VOLTZ - $N = 25$)**: Sessão cooperativa de 50 minutos em mesas de 4 a 5 alunos utilizando o baralho físico vetorial de 54 cartas, manual ilustrado e tabela de apoio (*Player Aid*).
3. **Grupo 3 (Simulação Coopetitiva - $N = 25$)**: Sessão de 50 minutos com jogo de tabuleiro competitivo focado em cálculo analítico de equações de circuito.

---

## 📐 4. INSTRUMENTO PSICOMÉTRICO (DIRECT TEST & FAR TRANSFER)

O pré e pós-teste foram compostos por 8 itens conceituais selecionados da bateria internacional padronizada **DIRECT** (Engelhardt & Beichner, 2004), com foco na identificação e superação de distratores conceituais:

### Item 1 (Modelo de Atenuação vs. Conservação de Corrente — DIRECT Item 5):
* *Enunciado*: Em um circuito com dois resistores idênticos $R_1$ e $R_2$ ligados em série a uma bateria, qual afirmação sobre a corrente elétrica é correta?
  * A) A corrente é maior antes de passar por $R_1$ e vai diminuindo ao longo do caminho. *(Distrator do Modelo Sequencial)*
  * B) A corrente que atravessa $R_1$ é idêntica à corrente que atravessa $R_2$ e retorna à bateria. *(Resposta Científica Correta)*
  * C) Toda a corrente é consumida no primeiro resistor se a voltagem for baixa. *(Distrator de Consumo Total)*
  * D) A corrente dobra após passar pelo ponto médio do circuito.

### Item 2 (Divisor de Tensão e Raciocínio de Malha — DIRECT Item 14):
* *Enunciado*: Em um ramo de $12\text{V}$ com um resistor de $3\Omega$ em série com um equipamento de $1\Omega$, qual é a diferença de potencial elétrico nos terminais do equipamento?
  * A) $12\text{V}$, pois a bateria fornece $12\text{V}$ para todos os componentes. *(Distrator de Tensão Constante)*
  * B) $3\text{V}$, pois o equipamento representa $\frac{1}{4}$ da resistência total da malha de $4\Omega$. *(Resposta Correta - Divisor de Tensão)*
  * C) $9\text{V}$, pois o resistor de $3\Omega$ consome $3\text{V}$.
  * D) $0\text{V}$, pois o circuito não tem aterramento.

### Item 3 (Questão de Transferência Distante — *Far Transfer em Hardware*):
* *Enunciado*: Um multímetro digital na escala de voltímetro DC é conectado entre os terminais de uma lâmpada montada em uma protoboard física real com resistores em série alimentados por uma fonte de $12\text{V}$. Se a resistência em série com a lâmpada for duplicada, o que o multímetro registrará?
  * A) A tensão registrada no multímetro diminui, pois a fração de potencial na lâmpada foi reduzida. *(Resposta Correta)*
  * B) A tensão no multímetro permanece fixa em $12\text{V}$.
  * C) O multímetro registrará valor negativo devido à inversão de fase.
  * D) A corrente aumenta e o multímetro queima.

---

## 📊 5. MODELO DE ANÁLISE ESTATÍSTICA

### 5.1. Ganho Normalizado de Hake ($g$)
Para cada estudante $i$, o ganho relativo de aprendizagem é calculado individualmente:
$$g_i = \frac{\%Pós_i - \%Pré_i}{100\% - \%Pré_i}$$

A média do ganho da turma ($\langle g \rangle$) é classificada segundo os critérios canônicos de Hake (1998):
* **Alto Ganho**: $\langle g \rangle \ge 0{,}70$
* **Médio Ganho**: $0{,}30 \le \langle g \rangle < 0{,}70$
* **Baixo Ganho**: $\langle g \rangle < 0{,}30$ (faixa típica do ensino tradicional puramente expositivo: $\approx 0{,}23$)

### 5.2. Testes de Hipótese e Poder Estatístico
* **Normalidade**: Verificada via teste de Shapiro-Wilk ($\alpha = 0{,}05$).
* **Comparação entre Grupos**: ANOVA One-Way (ou teste não-paramétrico de Kruskal-Wallis) com teste *post-hoc* de Tukey HSD para avaliar a significância das diferenças pareadas entre Controle, VOLTZ e Simulação.
* **Tamanho de Efeito**: Calculado através do $d$ de Cohen para quantificar a magnitude prática do impacto:
$$d = \frac{\bar{X}_{VOLTZ} - \bar{X}_{Controle}}{S_{pooled}}$$

---

## ⚖️ 6. CONFORMIDADE ÉTICA & NORMAS SRC / FEBRACE

Conforme os regulamentos do Comitê de Revisão Científica (SRC) da FEBRACE e ISEF para pesquisas com **participantes humanos menores de idade**, o projeto estabeleceu os seguintes protocolos:

1. **Termo de Consentimento Livre e Esclarecido (TCLE)**: Assinado formalmente pelos pais ou responsáveis legais de todos os participantes antes de qualquer coleta.
2. **Termo de Assentimento Livre e Esclarecido (TALE)**: Assinado em linguagem acessível pelos estudantes participantes.
3. **Garantia de Anonimato e Voluntariedade**: Coleta codificada por identificador numérico (ex: `EST-01` a `EST-75`), garantindo a preservação total de dados sensíveis conforme a LGPD (Lei nº 13.709/2018).
4. **Alinhamento com a BNCC**:
   * **EM13CNT103**: Utilizar o conhecimento sobre radiações e suas origens para avaliar as potencialidades e os riscos de sua aplicação em equipamentos elétricos e de uso cotidiano.
   * **EM13CNT106**: Avaliar, com ou sem o uso de dispositivos e aplicativos digitais, circuitos elétricos residenciais ou industriais, dimensionando componentes e dispositivos de proteção.

---

## 📈 7. CRONOGRAMA & VIABILIDADE ECONÔMICA

| Etapa | Ação | Prazo | Responsável |
| :--- | :--- | :--- | :--- |
| **Fase 1** | Diagramação dos 6 decks vetoriais A4 em Couchê 300g | Semana 1 | David |
| **Fase 2** | Coleta de TCLE/TALE e autorização institucional | Semana 2 | Toda a Equipe |
| **Fase 3** | Aplicação experimental com as turmas ($N=75$) | Semanas 3-4 | Toda a Equipe |
| **Fase 4** | Processamento estatístico em Python e cálculo de $g$ | Semana 5 | David e João Vitor |
| **Fase 5** | Pós-teste tardio de retenção (21 dias) | Semana 6 | Toda a Equipe |
| **Fase 6** | Submissão do artigo, pôster e diário na plataforma FEBRACE | Semana 7 | Toda a Equipe |

* **Custo por Kit**: R$ 22,50 (impressão em gráfica rápida com sleeves plásticos de alta durabilidade), viabilizando adoção em larga escala na rede pública estadual.
