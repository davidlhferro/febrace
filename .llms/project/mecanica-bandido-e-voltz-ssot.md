# ⚡ SSOT: MECÂNICA CANÔNICA DE BANDIDO E TRANSPOSIÇÃO PARA O VOLTZ
**Documento Canônico de Referência e Diretriz Permanente de Game Design (Single Source of Truth)**

> [!IMPORTANT]
> **CLÁUSULA PÉTREA DE DESENVOLVIMENTO (DIRETRIZ PERMANENTE PARA IAs E DESENVOLVEDORES):**
> Este documento define a espinha dorsal matemática, topológica e lúdica do jogo **VOLTZ: Circuit Break**. É **estritamente proibido** a qualquer agente de inteligência artificial ou desenvolvedor alterar, simplificar, retroceder ou descaracterizar a mecânica de transposição do *Bandido* aqui documentada em futuras sessões de código.

---

## 🕵️ 1. Dissecação da Mecânica de Game Design do *Bandido* (Helvetiq)

O jogo *Bandido* (criado por Martin Nedergaard Andersen e publicado pela Helvetiq) é um dos designs cooperativos mais elegantes da história dos jogos de cartas modernos por operar com base em um dilema topológico minimalista de altíssima tensão:

```
                                  [ SUPER-CARTA CENTRAL ]
                                   (Cela do Prisioneiro)
                                       │   │   │   │
                                ┌──────┘   │   │   └──────┐
                                ▼          ▼   ▼          ▼
                           [Túnel 1]  [Túnel 2] [Túnel 3] [Túnel 4]... (5 ou 6 saídas)
                                           │
                           ┌───────────────┴───────────────┐
                           ▼                               ▼
                 [Cartas de Extensão]             [Cartas de Bifurcação (T / Cruz)]
                 (Retas e Curvas de 90°)          (EFEITO HIDRA: Abre +1 a +3 novas saídas!)
                           │                               │
                           └───────────────┬───────────────┘
                                           ▼
                                [CARTAS DE BLOQUEIO (DEAD-END)]
                                 (Lanternas / Pedras de Fechamento)
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
          [TODAS AS SAÍDAS FECHADAS]                    [MONTE DE COMPRAS ESGOTADO]
             🏆 VITÓRIA COLETIVA                           💀 DERROTA (FUGA DO BANDIDO)
```

### 1.1. O Ponto de Partida (A Super-Carta Central)
* O jogo inicia com a **Super-Carta** no centro da mesa representando a cela da prisão.
* Possui **5 saídas abertas de túnel** (lado normal) ou **6 saídas abertas** (lado difícil).
* Todas as pontas de túnel que saem da cela estão ativas e demandam atenção do grupo.

### 1.2. O Fluxo de Turno & Dilema de Mão (Mão Fixa de 3 Cartas)
* Cada jogador segura **exatamente 3 cartas** na mão.
* No seu turno, o jogador **DEVE colocar 1 carta da mão na mesa**, respeitando a regra de colocação contínua:
  * A carta jogada deve conectar-se legalmente com **TODAS as cartas adjacentes** com as quais fizer fronteira no grid (túnel com túnel, parede com parede).
  * Não é permitido criar conexões impossíveis ou sobreposições ilegais.
* Após colocar 1 carta, o jogador **compra 1 nova carta** do topo do monte para recompor a mão de 3 cartas.
* **Regra de Descarte / Mão Travada:** Se e somente se o jogador não puder jogar legalmente nenhuma de suas 3 cartas em nenhuma das saídas abertas da mesa, ele descarta as **3 cartas para o fundo do monte de compras** e compra **3 novas cartas do topo**, passando o turno.

### 1.3. A Tensão Matemática: O "Efeito Hidra"
* **Cartas Retas e Curvas em L (90°):** Apenas redirecionam o fluxo sem alterar o número total de saídas abertas.
* **Cartas de Bifurcação (T ou Cruz):** Facilitam a jogada imediata, mas funcionam como a *Hidra de Lerna* — cortar uma cabeça faz nascer duas! Jogar um "T" transforma 1 saída aberta em 2 saídas abertas; jogar uma cruz gera 3 novas saídas.
* **Cartas de Bloqueio (Dead-Ends):** Lanternas de vigia ou rochas que selam a ponta do túnel, reduzindo a contagem de saídas abertas em 1.

### 1.4. Condições Canônicas de Término
* **🏆 VITÓRIA:** A equipe vence no exato instante em que **TODAS as saídas abertas de túneis da mesa forem seladas com Dead-Ends** antes que o monte de compras se esgote.
* **💀 DERROTA:** A equipe perde se o **monte de compras esgotar** e ainda restar pelo menos 1 saída de túnel aberta na mesa (o bandido escapou pela tubulação).

---

## ⚡ 2. Matriz de Transposição 1-para-1: *Bandido* $\to$ *VOLTZ: Circuit Break*

O VOLTZ não é uma "gamificação cosmética", mas uma **tradução isomórfica exata** das regras de *Bandido* para as leis fundamentais da eletrodinâmica clássica (Leis de Kirchhoff e Lei de Ohm):

```
┌──────────────────────────────────────┬──────────────────────────────────────┬────────────────────────────────────────────────────────┐
│ ELEMENTO DO JOGO BANDIDO             │ EQUIVALENTE CANÔNICO NO VOLTZ        │ SIGNIFICADO E FUNÇÃO NA ELETRODINÂMICA                 │
├──────────────────────────────────────┼──────────────────────────────────────┼────────────────────────────────────────────────────────┤
│ 1. Cela Central do Bandido           │ ⚡ Gerador Principal 12V (4 Saídas)  │ Fonte DC de tensão contínua e barramento de potência.  │
│ 2. Túneis Abertos em Expansão        │ 🔌 Ramos de Circuito Energizados     │ Linhas de 12V sem terra que demandam equilíbrio ôhmico.│
│ 3. Túneis Retos e Curvas de 90°      │ 🟢 Resistores 1Ω, 2Ω, 3Ω, 4Ω         │ Causam queda de tensão (ΔV = R·I) e manobram o fio.   │
│ 4. Bifurcações em T / Cruz (Hidra)   │ 🔀 Conector Y em Paralelo (Nó)       │ 1ª Lei de Kirchhoff (ΣI = 0): divide corrente em 12V.  │
│ 5. Bloqueio / Lanternas (Dead-End)   │ ⏚ Cabo Terra (GND // 0V)             │ Fecha a malha em 0V, dispara o teste e sela o ramo.    │
│ 6. Cargas de Equipamentos            │ 💡 LED, Servidor, Bomba, Tomógrafo   │ Elementos que consomem tensão nominal (Vnom) na malha. │
│ 7. Fusível de Proteção               │ 🛡️ Fusível 1A (Ação Preventiva)      │ Sacrifica-se em sobretensão, reabrindo o ramo sem fogo.│
│ 8. Fuga do Bandido (Derrota)         │ 💥 Sobretensão (Fogo) ou Deckout     │ Queima de carga sem fusível ou esgotamento do monte.   │
│ 9. Captura do Bandido (Vitória)      │ 🟢 Malha Estabilizada e Aterrada     │ Todos os 4 setores alimentados em Vnom e aterrados.    │
└──────────────────────────────────────┴──────────────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 📐 3. Regras de Encaixe Topológico Espacial (Grid de 10mm)

```
        ┌─────────── 63 mm ───────────┐
        │                             │
        │                             │
─── 10mm───► [ TUBO DE COBRE CONDUTOR ] ───► 10mm ─── (Centro Y = 166px)
        │                             │
        │                             │
        └─────────────────────────────┘
```

1. **Continuidade de Barramento:**
   * Cada carta Poker Size ($63\text{mm} \times 88\text{mm}$) possui trilhas condutoras de cobre maciço com **largura padronizada de $10\text{mm}$ ($48\text{px}$)**.
   * Nos tubos horizontais (Leste-Oeste), o tubo entra exatamente em $Y=142\text{px}$ a $190\text{px}$.
   * Nos tubos verticais (Norte-Sul), o tubo entra exatamente em $X=95\text{px}$ a $143\text{px}$.
2. **Alinhamento e Snap:**
   * Duas cartas conectadas lado a lado encostam perfeitamente as seções de cobre, formando uma linha contínua ininterrupta na mesa (estética de bancada de hardware).
3. **Cartas de Joelho (90°) e Pontes:**
   * Resistores e cargas em formato de joelho permitem virar a tubulação em ângulos retos ($0^\circ, 90^\circ, 180^\circ, 270^\circ$), mantendo o circuito contido na mesa e evitando invasão de espaço.

---

## 🧮 4. Regra de Cálculo de Fechamento de Circuito (Divisor de Tensão)

Quando um jogador coloca a carta **Cabo Terra (GND // 0V)** na ponta de um ramo, o circuito é instantaneamente fechado e a física de Kirchhoff é calculada:

### 4.1. As Fórmulas Físicas
1. **Resistência Total da Malha em Série ($R_{\text{total}}$):**
   $$R_{\text{total}} = \sum R_{\text{resistores}} + R_{\text{equipamento}}$$
2. **Corrente Total da Malha ($I_{\text{total}}$):**
   $$I_{\text{total}} = \frac{V_{\text{in}}}{R_{\text{total}}} = \frac{12\text{V}}{R_{\text{total}}}$$
3. **Tensão Efetiva sobre o Equipamento ($V_{\text{calculado}}$):**
   $$V_{\text{calculado}} = V_{\text{in}} \cdot \left( \frac{R_{\text{equipamento}}}{R_{\text{total}}} \right) = 12\text{V} \cdot \left( \frac{R_{\text{equipamento}}}{\sum R_{\text{adicional}} + R_{\text{equipamento}}} \right)$$

---

### 4.2. Tabela de Soluções dos 4 Setores da Metrópole

```
┌────────────────────────────────┬─────────┬────────┬─────────────┬──────────────────────────────────────────┐
│ SETOR DA METRÓPOLE             │ Vnom    │ Requip │ R adicional │ CÁLCULO DO DIVISOR DE TENSÃO             │
├────────────────────────────────┼─────────┼────────┼─────────────┼──────────────────────────────────────────┤
│ 🏥 Hospital (Tomógrafo UTI)     │ 12.0 V  │ 4.0 Ω  │ +0.0 Ω      │ 12V · (4 / [0 + 4]) = 12.0 V 🟢 NOMINAL  │
│ 🖥️ Central de Dados (Servidor) │ 4.0 V   │ 1.0 Ω  │ +2.0 Ω      │ 12V · (1 / [2 + 1]) = 4.0 V  🟢 NOMINAL  │
│ 💧 Tratamento de Água (Bomba)  │ 6.0 V   │ 2.0 Ω  │ +2.0 Ω      │ 12V · (2 / [2 + 2]) = 6.0 V  🟢 NOMINAL  │
│ 💡 Residencial (LED Piloto)    │ 3.0 V   │ 1.0 Ω  │ +3.0 Ω      │ 12V · (1 / [3 + 1]) = 3.0 V  🟢 NOMINAL  │
│ 🚨 Residencial (Sirene Alarme) │ 6.0 V   │ 1.0 Ω  │ +1.0 Ω      │ 12V · (1 / [1 + 1]) = 6.0 V  🟢 NOMINAL  │
└────────────────────────────────┴─────────┴────────┴─────────────┴──────────────────────────────────────────┘
```

---

### 4.3. Resolução dos 3 Cenários de Diagnóstico no GND:

```
                                [ CABO TERRA (GND) JOGADO ]
                                             │
                       ┌─────────────────────┼─────────────────────┐
                       ▼                     ▼                     ▼
             [ Vcalculado == Vnom ]  [ Vcalculado > Vnom ]  [ Vcalculado < Vnom ]
             🟢 TENSÃO NOMINAL       💥 SOBRETENSÃO         ⚪ SUBTENSÃO
                       │                     │                     │
                       ▼                     ▼                     ▼
                 SETOR SALVO!         TEM FUSÍVEL 1A?        ENERGIA INSUFICIENTE
             (Ramo vira permanente)   ┌──────┴──────┐       (Ramo permanece aberto;
                                     SIM           NÃO       precisa de menos R)
                                      ▼             ▼
                                 🛡️ DESARME     💀 QUEIMA
                                (Fusível queima; (Fim de Jogo /
                                 ramo reabre)     Derrota)
```

---

## 🚫 5. Diretriz Permanente de Não-Regressão (Anti-Drift)

Qualquer implementação futura do VOLTZ (seja no simulador web, multiplayer P2P, baralhos físicos ou relatórios da FEBRACE) deve respeitar obrigatoriamente:
1. **Mão Estrita de 3 Cartas** com compra imediata e descarte para o fundo do monte.
2. **Padrão Ouro de 70 Cartas** estabelecido pela simulação Monte Carlo.
3. **Cabo Terra (GND) como o Dead-End oficial** de fechamento de circuito.
4. **Resistência Aditiva por Blocos e Divisores de Tensão de Kirchhoff** sem atalhos simplistas.
