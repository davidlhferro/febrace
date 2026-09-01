# 🔬 Protocolo Experimental & Metodologia Científica Comparativa — FEBRACE 2026

**Projeto**: Remediação Ativa de Concepções Alternativas em Eletrodinâmica: Estudo Quase-Experimental com Modelagem Topológica Cooperativa no Ensino Médio Público  
**Área do Conhecimento**: Ciências Exatas e da Terra / Ensino de Física (Physics Education Research - PER)  
**Equipe**: David, João Vitor e Parceiro 3  
**Instituição**: Escola Estadual de Ensino Médio da Rede Pública Estadual  
**Versão**: 3.0 (Canônica / Pós-Auditoria LLM Council)  

---

## 1. FUNDAMENTAÇÃO EPISTEMOLÓGICA & ESTADO DA ARTE (PER)

### 1.1. O Diagnóstico das Concepções Alternativas em Circuitos DC
A literatura internacional em *Physics Education Research* (PER) (McDermott & Shaffer, 1992; Engelhardt & Beichner, 2004) estabelece que estudantes do Ensino Médio mantêm concepções intuitivas pré-newtonianas e modelos de senso comum sobre eletrodinâmica que resistem à instrução formal tradicional baseada em resolução mecânica de fórmulas ($V = R \cdot I$).

Mapeiam-se três modelos mentais incorretos predominantes:
1. **Modelo de Atenuação Sequencial (*Current Consumption Model*)**: O estudante assume que a corrente elétrica é uma substância consumida progressivamente ao atravessar cada componente. Consequentemente, acredita-se que o primeiro resistor a jusante da fonte opera sob maior corrente/tensão do que os resistores subsequentes.
2. **Confusão Ontológica entre Diferença de Potencial ($V$) e Corrente ($I$)**: Incapacidade de conceber a corrente como taxa de fluxo de carga dependente da resistência equivalente global da malha e a tensão como trabalho por unidade de carga entre dois nós.
3. **Ausência de Raciocínio Topológico Global (*Local/Sequential Reasoning*)**: O estudante analisa componentes como entidades isoladas, ignorando que qualquer alteração em um ramo de um circuito fechado reconfigura instantaneamente o estado estacionário de todos os nós (1ª e 2ª Leis de Kirchhoff).

```
                        [ MODELO MENTAL ERRÔNEO ]
                 (Modelo de Atenuação Sequencial Ingênuo)
         ┌────────────┐   Muita Corrente   ┌────────────┐   Pouca Corrente   ┌────────────┐
 12V (+) │  Bateria   │ ─────────────────> │ Resistor 1 │ ─────────────────> │ Resistor 2 │ ──> GND (0V)
         └────────────┘                    └────────────┘ (Consome 80%)      └────────────┘ (Recebe sobra)
                                                 │
                                                 ▼ (CONFLITO COGNITIVO COM O VOLTZ)
                        [ MODELO CIENTÍFICO REAL ]
                 (Conservação de Carga & Divisão de Potencial)
         ┌────────────┐     Corrente I     ┌────────────┐     Corrente I     ┌────────────┐
 12V (+) │  Bateria   │ ─────────────────> │ Resistor 1 │ ─────────────────> │ Resistor 2 │ ──> GND (0V)
         └────────────┘   (I é constante)  └────────────┘   (I é constante)  └────────────┘
                         V1 = 12V * (R1/Rtot)             V2 = 12V * (R2/Rtot)
```

---

## 2. DELINEAMENTO EXPERIMENTAL COMPARATIVO (3 BRAÇOS)

Para evitar a convalidação multivariável em bloco (*bundle confounding*) e eliminar o viés de confirmação (*strawman bias*), o experimento é estruturado em **3 braços de intervenção pareados em tempo (50 minutos)** e submetidos à mesma carga diagnóstica:

```
                                  [ AMOSTRA TOTAL: N = 75 ]
                            (Estudantes do 3º Ano do Ensino Médio)
                                            │
                          [ PRÉ-TESTE DIAGNÓSTICO T0 (DIRECT) ]
                          (Estratificação por Quartis de Desempenho)
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          ▼                                 ▼                                 ▼
    [ BRAÇO 1: CONTROLE ATIVO ]      [ BRAÇO 2: EXPERIMENTAL VOLTZ ]   [ BRAÇO 3: SIMULAÇÃO ANALÍTICA ]
    Aula Tradicional + PhET          Deckbuilder Cooperativo 2D        Jogo Competitivo de Tabuleiro
    (Padrão-Ouro Computacional)      (Modelagem Topológica & GND)      (Fixação Algébrica de Equações)
          (n = 25)                          (n = 25)                          (n = 25)
          │                                 │                                 │
          └─────────────────────────────────┼─────────────────────────────────┘
                                            ▼
                           [ INSTRUMENTAÇÃO PÓS-INTERVENÇÃO ]
                           1. Pós-Teste Isomórfico Imediato (T1 - DIRECT)
                           2. Far Transfer Individual em Protoboard Física
                           3. Protocolo Qualitativo Think-Aloud
                           4. Pós-Teste Tardio de Retenção (T2 - 21 Dias)
```

### 2.1. Caracterização Rigorosa dos 3 Braços Experimentais

| Parâmetro | Braço 1: Controle Ativo (PhET) | Braço 2: Experimental (VOLTZ) | Braço 3: Simulação Analítica |
| :--- | :--- | :--- | :--- |
| **Abordagem** | Expositiva dialogada + Simulador PhET | Deckbuilder físico em grade 2D (*Bandido*) | Jogo de tabuleiro competitivo |
| **Ontologia** | Diagramática virtual na tela | Topológica física tátil por blocos de $1\Omega$ | Simbólica / Algébrica em equações |
| **Dinâmica Social** | Individual / Demonstração do professor | Cooperativa em trios (meta de vitória coletiva) | Competitiva individual (disputa de pontos) |
| **Fechamento de Malha** | Arraste de fios no software | Carta Cabo Terra (GND 0V) ou Retorno (Loop) | Resolução de fórmula no papel |
| **Tempo de Exposição** | 50 minutos cravados | 50 minutos cravados | 50 minutos cravados |

### 2.2. Justificativa Metodológica do Abandono do Desenho Crossover (AB-BA)
Embora o desenho Crossover dobre o tamanho amostral aparente ($2N$), ele foi formalmente **rejeitado** após auditoria do LLM Council. Em intervenções cognitivas de Física, a mudança conceitual (*conceptual change*) é um processo irreversível. Uma vez superado o modelo de atenuação sequencial, o estudante não regride ao estado ingênuo inicial no bloco B (*irreversible carryover effect*), violando os pressupostos de independência temporal da análise.

---

## 3. PROTOCOLO DE ESTRATIFICAÇÃO E RANDOMIZAÇÃO EM BLOCOS

### 3.1. Classificação Inicial de Proficiência ($T_0$)
Após a aplicação do Pré-Teste diagnóstico ($T_0$), os $N=75$ estudantes são ordenados por escore e divididos em três estratos basais:
* 🔴 **Estrato 1 (Vulnerabilidade Alta / Dificuldade Severa)**: Escore $< 40\%$ no pré-teste (aderência total ao modelo atenuativo).
* 🟡 **Estrato 2 (Intermediário / Concepção Mista)**: Escore entre $40\%$ e $70\%$ (aplica fórmulas mas oscila em questões topológicas).
* 🟢 **Estrato 3 (Avançado / Domínio Formal)**: Escore $> 70\%$ (compreensão preliminar das Leis de Ohm).

### 3.2. Randomização Balanceada em Blocos
Para garantir que os 3 braços experimentais iniciem com médias e desvios-padrão idênticos de proficiência basal, a alocação ocorre por permutação estratificada:

$$\text{Bloco } k = \{E_{\text{baixo}, 1}, E_{\text{baixo}, 2}, E_{\text{baixo}, 3}\} \xrightarrow{\text{Random}} \{\text{Braço 1}, \text{Braço 2}, \text{Braço 3}\}$$

---

## 4. BANCO DE ITENS ISOMÓRFICOS PADRONIZADOS (DIRECT)

O instrumento de avaliação é composto por 10 itens conceituais no **Pré-Teste ($T_0$)** e 10 itens isomórficos (espelhados estruturalmente com alteração de valores e topologia de layout) no **Pós-Teste ($T_1$)**, baseados no inventário DIRECT (Engelhardt & Beichner, 2004).

---

### 📝 BATERIA A: PRÉ-TESTE DIAGNÓSTICO ($T_0$)

#### Questão 1 (Modelo de Atenuação — Conservação de Corrente em Série)
Dois resistores idênticos de $4\Omega$ ($R_1$ e $R_2$) estão conectados em série a uma bateria de $12\text{V}$. Sejam $I_1$ a corrente que passa por $R_1$, $I_2$ a corrente por $R_2$ e $I_{ret}$ a corrente que retorna ao polo negativo. Assinale a relação correta:
- A) $I_1 > I_2 > I_{ret}$, pois a corrente perde intensidade ao atravessar cada resistor. *(Distrator Atenuativo)*
- B) $I_1 = I_2 = I_{ret}$, pois a carga elétrica se conserva ao longo de todo o percurso fechado. **[GABARITO: B]**
- C) $I_1 = 12\text{A}$ e $I_2 = 0\text{A}$, pois toda a energia é consumida em $R_1$. *(Distrator Consumo Total)*
- D) $I_2 > I_1$, pois a corrente se acumula no segundo resistor antes de descarregar.

#### Questão 2 (Divisor de Tensão — Proporcionalidade em Malha Fechada)
Um circuito série é alimentado por $12\text{V}$ e contém um resistor $R_A = 3\Omega$ e uma lâmpada $R_L = 1\Omega$. Qual é a diferença de potencial elétrico ($\Delta V$) medida exclusivamente nos terminais da lâmpada $R_L$?
- A) $12\text{V}$, pois a fonte fornece $12\text{V}$ independentemente dos resistores presentes. *(Distrator Tensão Constante)*
- B) $9\text{V}$, pois $R_A$ consome a maior parte e sobram $3\text{V}$ na fonte.
- C) $3\text{V}$, pois a lâmpada representa $1/4$ da resistência total ($4\Omega$), recebendo $1/4$ de $12\text{V}$. **[GABARITO: C]**
- D) $0\text{V}$, pois o resistor de $3\Omega$ impede a passagem de tensão para a lâmpada.

#### Questão 3 (Curto-Circuito e Caminho de Menor Resistência)
Em um circuito com uma lâmpada acesa ligada a uma bateria, conecta-se um fio de cobre ideal (resistência nula) em paralelo com a lâmpada. O que ocorre com o brilho da lâmpada e com a bateria?
- A) O brilho permanece idêntico, pois a lâmpada ainda está ligada aos dois terminais.
- B) A lâmpada apaga completamente e a corrente total drenada da bateria cresce criticamente (curto-circuito). **[GABARITO: B]**
- C) O brilho dobra, pois a corrente encontra dois caminhos para passar.
- D) A lâmpada queima por receber excesso de voltagem.

#### Questão 4 (Função do Aterramento e Potencial de Referência - GND)
Um ponto de um circuito elétrico de $12\text{V}$ é conectado a uma barra de aterramento (Cabo Terra / GND). Qual é a função física desse nó no circuito?
- A) O terra serve apenas para descarregar corrente quando o circuito quebra.
- B) O terra estabelece um potencial de referência fixo de $0\text{V}$ e viabiliza o retorno de cargas para fechar a malha. **[GABARITO: B]**
- C) O terra neutraliza toda a voltagem da bateria, desligando o circuito.
- D) O terra converte corrente contínua em corrente alternada.

#### Questão 5 (Associação em Paralelo — Independência de Ramos)
Duas lâmpadas idênticas estão ligadas em paralelo a uma bateria de $12\text{V}$. Se uma das lâmpadas for desrosqueada e removida do soquete, o que ocorre com o brilho da outra lâmpada?
- A) O brilho da lâmpada restante permanece inalterado, pois a d.d.p. de $12\text{V}$ no seu ramo não se altera. **[GABARITO: A]**
- B) O brilho da lâmpada restante diminui pela metade, pois sobrou apenas um caminho.
- C) O brilho dobra, pois ela recebe a corrente que antes ia para a outra lâmpada.
- D) A lâmpada restante apaga instantaneamente.

#### Questão 6 (Resistência Equivalente em Série)
Adicionar um novo resistor em série em um circuito elétrico fechado alimentado por tensão constante provoca:
- A) Aumento da corrente total do circuito.
- B) Diminuição da resistência equivalente total.
- C) Aumento da resistência equivalente total e diminuição da corrente total fornecida pela fonte. **[GABARITO: C]**
- D) Manutenção exata da corrente e da potência total dissipada.

#### Questão 7 (Conservação Nodal — 1ª Lei de Kirchhoff)
Um nó elétrico recebe uma corrente de entrada de $3\text{A}$ por um condutor e divide-se em dois condutores secundários. Se um dos condutores drena $1\text{A}$, qual é a corrente no segundo condutor?
- A) $3\text{A}$, pois a corrente se duplica nos nós.
- B) $2\text{A}$, pois a soma das correntes que saem de um nó deve ser estritamente igual à corrente que entra. **[GABARITO: B]**
- C) $1\text{A}$, pois a corrente se divide sempre em partes iguais.
- D) $4\text{A}$, devido ao ganho de carga estática.

#### Questão 8 (Identificação de Circuito Aberto)
Um circuito contém bateria de $12\text{V}$, interruptor aberto e lâmpada. Ao medir com um voltímetro a d.d.p. entre os terminais do interruptor aberto e entre os terminais da lâmpada, os valores obtidos são, respectivamente:
- A) $0\text{V}$ no interruptor e $12\text{V}$ na lâmpada.
- B) $12\text{V}$ no interruptor e $0\text{V}$ na lâmpada. **[GABARITO: B]**
- C) $12\text{V}$ no interruptor e $12\text{V}$ na lâmpada.
- D) $0\text{V}$ no interruptor e $0\text{V}$ na lâmpada.

#### Questão 9 (Potência e Queda de Tensão)
Dois resistores de valores $R_1 = 2\Omega$ e $R_2 = 4\Omega$ estão em série sob $12\text{V}$. Em qual dos dois componentes haverá maior taxa de dissipação térmica (efeito Joule)?
- A) Em $R_1$, pois recebe a corrente primeiro.
- B) Em $R_2$, pois a corrente é a mesma em ambos e a potência dissipada ($P = R \cdot I^2$) é proporcional à resistência. **[GABARITO: B]**
- C) Em ambos dissipa-se a mesma potência ($24\text{W}$).
- D) Nenhum dissipa calor se houver aterramento.

#### Questão 10 (Far Transfer — Diagnóstico de Bancada)
Ao conectar as pontas de prova de um multímetro na função voltímetro DC sobre um componente em uma protoboard, o visor registra $0{,}00\text{V}$ embora a fonte esteja ligada em $12\text{V}$. Quais hipóteses explicam esse fato?
- A) O componente está em curto-circuito ou não há corrente fluindo por esse ramo do circuito. **[GABARITO: A]**
- B) O multímetro consumiu toda a tensão do circuito.
- C) O componente tem resistência infinita e portanto a tensão é nula.
- D) A fonte inverteu a polaridade automaticamente.

---

### 📝 BATERIA B: PÓS-TESTE ISOMÓRFICO ($T_1$)

#### Questão 1 (Isomórfica 1 — Conservação de Corrente em Série)
Três resistores de $2\Omega$, $3\Omega$ e $5\Omega$ estão ligados em série a um gerador de $20\text{V}$. Comparando as correntes elétricas $I_A$ (antes do primeiro resistor), $I_B$ (entre o 2º e o 3º) e $I_C$ (após o 3º resistor), temos:
- A) $I_A > I_B > I_C$. *(Distrator Atenuativo)*
- B) $I_A = I_B = I_C$, pois em um circuito série a taxa de fluxo de cargas é uniforme em todos os pontos. **[GABARITO: B]**
- C) $I_B$ é máxima por estar no centro de gravidade do circuito.
- D) $I_C = 0\text{A}$ porque a resistência total de $10\Omega$ esgota a corrente.

#### Questão 2 (Isomórfica 2 — Divisor de Tensão)
Um circuito série de $12\text{V}$ possui dois resistores: $R_1 = 2\Omega$ e $R_2 = 2\Omega$. Qual é a tensão elétrica medida sobre $R_2$?
- A) $12\text{V}$.
- B) $6\text{V}$, pois a resistência total de $4\Omega$ divide a tensão de $12\text{V}$ igualmente em duas metades ($2/4 \times 12\text{V}$). **[GABARITO: B]**
- C) $4\text{V}$.
- D) $0\text{V}$.

#### Questão 3 (Isomórfica 3 — Curto-Circuito em Nó)
Em uma malha de $12\text{V}$ com um resistor de $2\Omega$ em série com dois resistores em paralelo de $4\Omega$, fecha-se uma chave condutora em paralelo com um dos resistores de $4\Omega$. O que ocorre com a tensão no outro resistor de $4\Omega$?
- A) Cai para $0\text{V}$, pois o curto-circuito drena toda a corrente daquele bloco nodal. **[GABARITO: A]**
- B) Dobra para $8\text{V}$.
- C) Permanece fixa em $6\text{V}$.
- D) O gerador desliga imediatamente por falta de elétrons.

#### Questão 4 (Isomórfica 4 — Fechamento Nodal e GND)
Em um painel elétrico montado com fonte de $12\text{V}$ e resistores, o circuito não acende o LED indicador. O voltímetro acusa $12\text{V}$ no ânodo e $12\text{V}$ no cátodo do LED. O que está faltando para o circuito funcionar?
- A) Aumentar a tensão da fonte para $24\text{V}$.
- B) Conectar o terminal de saída ao barramento de retorno (Cabo Terra / GND 0V) para estabelecer diferença de potencial. **[GABARITO: B]**
- C) Remover todos os resistores para diminuir o atrito.
- D) Trocar o LED por um capacitor.

#### Questão 5 (Isomórfica 5 — Associação em Paralelo)
Três lâmpadas idênticas estão associadas em paralelo sob $12\text{V}$. Se adicionarmos uma quarta lâmpada idêntica em paralelo, o que acontece com a corrente total drenada da bateria e com o brilho das três lâmpadas originais?
- A) A corrente total aumenta e o brilho das lâmpadas originais permanece o mesmo. **[GABARITO: A]**
- B) A corrente total diminui e todas as lâmpadas ficam mais fracas.
- C) A corrente total permanece constante e as lâmpadas dividem o brilho.
- D) Todas as lâmpadas queimam por excesso de corrente.

#### Questão 6 (Isomórfica 6 — Variação de Resistência em Série)
Se um potenciômetro (resistor variável) ligado em série com um motor de $6\text{V}$ tem sua resistência reduzida de $4\Omega$ para $1\Omega$, a tensão nos terminais do motor:
- A) Diminui.
- B) Aumenta, pois a fração de resistência do motor em relação à malha total cresceu. **[GABARITO: B]**
- C) Permanece constante em $6\text{V}$.
- D) Cai instantaneamente para $0\text{V}$.

#### Questão 7 (Isomórfica 7 — Lei dos Nós de Kirchhoff)
Em uma bifurcação Y de um circuito elétrico, chegam dois ramos com correntes $I_1 = 1{,}5\text{A}$ e $I_2 = 2{,}5\text{A}$. A corrente total que sai pelo ramo principal convergente é:
- A) $1{,}0\text{A}$.
- B) $4{,}0\text{A}$, pela conservação da carga elétrica no nó ($I_{sai} = I_1 + I_2$). **[GABARITO: B]**
- C) $2{,}0\text{A}$.
- D) $0{,}0\text{A}$.

#### Questão 8 (Isomórfica 8 — Continuidade de Circuito)
Um circuito fechado de $12\text{V}$ com 3 resistores em série tem seu fio condutor rompido no meio. A corrente elétrica no circuito passa a ser:
- A) $0\text{A}$ em todos os pontos do circuito, pois a quebra de continuidade impede o movimento ordenado de cargas. **[GABARITO: A]**
- B) $12\text{A}$ até o ponto de ruptura.
- C) Metade da corrente inicial.
- D) Infinita, gerando faíscas contínuas.

#### Questão 9 (Isomórfica 9 — Divisão de Potencial com Carga Crítica)
Para alimentar um equipamento sensível de $4\text{V}$ e $1\Omega$ sem queimar a partir de uma fonte de $12\text{V}$, qual resistor em série $R_{ext}$ deve ser inserido na malha?
- A) $1\Omega$.
- B) $2\Omega$, pois $V_{equip} = 12\text{V} \cdot \frac{1\Omega}{2\Omega + 1\Omega} = 4\text{V}$. **[GABARITO: B]**
- C) $3\Omega$.
- D) $4\Omega$.

#### Questão 10 (Isomórfica 10 — Far Transfer em Protoboard)
Na bancada física, um estudante monta um divisor de tensão com $R_1 = 3\Omega$ e LED de $3\text{V}$ ($1\Omega$) sob $12\text{V}$. Ao fechar a chave geral, o multímetro mede $3\text{V}$ no LED e o LED acende normalmente. Se o estudante substituir $R_1$ por um resistor de $1\Omega$, o que acontecerá com o circuito?
- A) A tensão no LED subirá para $6\text{V}$ ($12 \cdot \frac{1}{2}$), excedendo a tensão nominal de $3\text{V}$ e queimando o LED (sobretensão). **[GABARITO: A]**
- B) O LED brilhará menos por falta de resistência de apoio.
- C) A tensão no LED permanecerá em $3\text{V}$ devido à auto-regulação.
- D) A fonte entrará em repouso térmico.

---

## 5. PROTOCOLO DE TESTE DE TRANSFERÊNCIA DISTANTE (*FAR TRANSFER*)

Para demonstrar que os ganhos conceituais não são fruto de memorização abstrata das cartas, cada estudante realiza individualmente um teste prático de bancada de 5 minutos na presença de um avaliador independente:

1. **Montagem Prática em Protoboard**: O estudante recebe uma fonte DC de $12\text{V}$, uma matriz de contato (protoboard), resistores reais com código de cores IEC ($1\Omega$, $2\Omega$, $3\Omega$) e um LED de carga nominal ($3\text{V} / 1\Omega$).
2. **Desafio Cego**: O estudante deve selecionar os resistores corretos e interligar os jumpers para obter a tensão de operação exata sem recorrer a tentativa e erro.
3. **Medição Instrumental**: O estudante utiliza um multímetro digital na escala de $20\text{V}$ DC para medir a d.d.p. entre os terminais do LED e registrar o valor obtido na folha de auditoria.
4. **Métrica Binária de Far Transfer**: Acerto ($1$) se o circuito operar com $V_{medido} = 3{,}0\text{V} \pm 0{,}3\text{V}$ sem disparo de sobretensão; Erro ($0$) em caso de queima, subtensão severa ou curto-circuito.

---

## 6. MODELO ESTATÍSTICO DE ANÁLISE PARA AMOSTRAS ESCASSAS

### 6.1. Ganho Normalizado de Hake ($\langle g \rangle$)
Para cada estudante $i$, o ganho relativo individual de Hake é formalizado como:

$$g_i = \frac{\%T_{1, i} - \%T_{0, i}}{100\% - \%T_{0, i}}$$

A média do ganho por braço experimental ($\langle g \rangle$) é categorizada de acordo com Hake (1998):
* **Alto Ganho**: $\langle g \rangle \ge 0{,}70$
* **Médio Ganho**: $0{,}30 \le \langle g \rangle < 0{,}70$
* **Baixo Ganho**: $\langle g \rangle < 0{,}30$ *(padrão documentado para o ensino tradicional expositivo: $\langle g \rangle \approx 0{,}23$)*.

### 6.2. Tamanho de Efeito com Correção de Hedges ($g_{\text{Hedges}}$)
Para amostras reduzidas ($N < 50$), o $d$ de Cohen superestima o tamanho de efeito populacional. Aplica-se o fator de correção não-viesado de Bessel $J$:

$$g_{\text{Hedges}} = d_{\text{Cohen}} \times J = \left( \frac{\bar{X}_1 - \bar{X}_2}{S_{\text{pooled}}} \right) \times \left( 1 - \frac{3}{4(n_1 + n_2) - 9} \right)$$

Onde o desvio-padrão combinado $S_{\text{pooled}}$ é dado por:

$$S_{\text{pooled}} = \sqrt{\frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2}}$$

### 6.3. Análise de Covariância (ANCOVA)
Para neutralizar eventuais assimetrias basais não capturadas pela randomização, o escore no Pós-Teste ($T_1$) é modelado em função do Braço Experimental ($X_{\text{Grupo}}$), controlando pelo Pré-Teste ($T_0$) como covariável:

$$T_{1, ij} = \mu + \tau_i + \beta (T_{0, ij} - \bar{T}_0) + \epsilon_{ij}$$

* **Verificação de Pressupostos**: Homocedasticidade testada via teste de Levene ($\alpha = 0{,}05$) e homogeneidade das inclinações de regressão avaliada pela interação $\text{Grupo} \times T_0$ ($p > 0{,}05$).

### 6.4. Testes de Permutação e Bootstrap BCa (10.000 Réplicas)
Devido à natureza não-paramétrica potencial de turmas escolares, todos os intervalos de confiança de 95% e $p$-valores são corroborados através de:
1. **Testes de Permutação Exatos**: Redistribuição aleatória dos rótulos de grupo em 10.000 permutações para derivar a distribuição nula empírica da estatística $F$.
2. **Bootstrap BCa (*Bias-Corrected and Accelerated*)**: Geração de intervalos de confiança não-paramétricos robustos a assimetrias distributivas para $\langle g \rangle$.

---

## 7. ROTEIRO DE APLICAÇÃO EM SALA DE AULA (50 MINUTOS)

```
[ 00-02 min ] ➔ Recepção dos estudantes e distribuição dos Envelopes Codificados (ID-01 a ID-75)
[ 02-12 min ] ➔ Aplicação do Pré-Teste Individual T0 (10 minutos cravados com alarme)
[ 12-15 min ] ➔ Briefing padronizado de 3 minutos via Folha Gráfica de Regras Rápidas Laminada
[ 15-38 min ] ➔ Sessão de Intervenção Pedagógica (23 minutos de jogo ativo nos 3 braços)
[ 38-48 min ] ➔ Rompimento do lacre e Pós-Teste Individual Isomórfico T1 (10 minutos)
[ 48-50 min ] ➔ Auditoria física, contagem e recolhimento dos 75 envelopes na porta
```

---

## 8. CONFORMIDADE ÉTICA & NORMAS SRC (FEBRACE / ISEF)

Em estrita conformidade com a **Resolução CNS nº 510/2016** (Pesquisas em Ciências Humanas e Sociais no Brasil) e o regulamento do **Comitê de Revisão Científica (SRC) da FEBRACE/ISEF**:

1. **Consentimento e Assentimento Formal**:
   * **TCLE (Termo de Consentimento Livre e Esclarecido)**: Assinado formalmente por pais ou responsáveis legais de 100% dos estudantes menores de idade participantes.
   * **TALE (Termo de Assentimento Livre e Esclarecido)**: Assinado pelos próprios estudantes em linguagem clara e acessível.
2. **Anonimização & Privacidade (LGPD — Lei nº 13.709/2018)**:
   * Todos os formulários físicos e arquivos de dados digitais são indexados exclusivamente por identificadores alfanuméricos cegados (ex: `EST_01` a `EST_75`). Nomes e turmas são arquivados em chave mestra criptografada sob custódia do orientador.
3. **Inexistência de Risco Físico ou Psicológico**: A atividade utiliza componentes de baixíssima tensão ($12\text{V}$ DC / correntes $< 0{,}5\text{A}$), sem risco de choque elétrico ou danos materiais.

---

## 9. MATRIZ DE HIPÓTESES FORMAIS

* **$H_0$ (Hipótese Nula)**: Não há diferença significativa no Ganho Normalizado de Hake ($\langle g \rangle$) entre o grupo VOLTZ, o grupo controle ativo PhET e o grupo de simulação analítica ($p \ge 0{,}05$).
* **$H_1$ (Hipótese Principal - Superioridade Conceitual)**: Estudantes submetidos ao VOLTZ alcançarão ganho de Hake significativamente superior ($\langle g \rangle \ge 0{,}60$; $p < 0{,}001$) com tamanho de efeito elevado ($g_{\text{Hedges}} > 1{,}20$) em relação aos grupos comparadores, devido ao feedback topológico tátil do fechamento nodal (GND/Loop).
* **$H_2$ (Hipótese de Transferência Prática - Far Transfer)**: O grupo VOLTZ apresentará taxa de sucesso em montagem correta na protoboard física significativamente superior ($> 80\%$) contra $< 40\%$ do grupo tradicional, comprovando a internalização do modelo mental aditivo de divisores de tensão.
