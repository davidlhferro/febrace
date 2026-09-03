# Plan: Solucionador Elétrico Nodal Preciso (MNA - Modified Nodal Analysis) para VOLTZ

- **ID / Slug**: `solucionador-nodal-mna-eletrico`
- **Status**: `done`
- **Created**: 2026-09-03
- **Target Component / Scope**: `C:\codigos\FEBRACE\01_Jogo_Voltz\bancada_playtest/` (`game.js`, `style.css`, `index.html`, `test_bancada.js`)

---

## 1. Goal & Context

- **Goal**: Substituir o traçado heurístico de ramos 1D por um **Solucionador de Análise Nodal Modificada (MNA / Leis de Kirchhoff em Grafos)** de alta precisão no motor do VOLTZ, calculando o potencial $V_n$ em cada nó da grade 2D e a corrente exata $I_k$ e potência $P_k$ em cada componente de malhas arbitrárias (série, paralelo, pontes e bifurcações em T).
- **Why it matters**: 
  1. Permite ao Bot e aos jogadores montar circuitos complexos (incluindo resistores e aparelhos em paralelo ou ramos bifurcados) com rigor físico irrefutável.
  2. Fornece à banca de avaliadores da USP/FEBRACE uma prova de software robusta, eliminando simplificações simplórias e entregando um motor equivalente ao SPICE/PhET em Vanilla JavaScript ultrarrápido (<0.1ms).
- **Non-Goals**: Modelagem não-linear de transientes AC/reativos (indutores/capacitores) — o jogo opera em regime estacionário DC (12V contínuos).

---

## 2. Mathematical Modeling & Architectural Approach

### A. Conversão da Grade 2D em Grafo Elétrico
Cada carta colocada na coordenada $(x, y)$ possui até 4 portas condutoras (top, right, bottom, left). Quando duas cartas vizinhas se tocam por portas de cobre compatíveis, elas compartilham um **Terminal de Contato**:

1. **Agrupamento de Supernós Equipotenciais (DSU / Disjoint Set Union):**
   - Todas as portas condutoras conectadas internamente por fios ou trilhas de $0\Omega$ (cartas `wire`, `fuse` fechado, barramentos) pertencem ao mesmo **Supernó Elétrico**.
   - O Gerador Central em $(0,0)$ fixa o **Supernó da Fonte** em $V_{fonte} = 12.0\text{V}$.
   - O Cabo Terra (`gnd`) fixa o **Supernó de Aterramento** em $V_{GND} = 0.0\text{V}$.

2. **Ramos Resistivos com Condutância ($G = 1/R$):**
   - Cartas com resistência $R > 0$ (Resistores $1\Omega, 2\Omega, 3\Omega$ e Aparelhos com $r_{eq}$) formam uma aresta entre o Supernó de Entrada $u$ e o Supernó de Saída $v$ com condutância $G_{uv} = \frac{1}{R}$.

### B. Sistema Linear de Condutâncias ($\mathbf{G} \cdot \mathbf{V} = \mathbf{I}_{ext}$)
Para cada supernó desconhecido $i$ (nós que não são $12\text{V}$ nem $0\text{V}$):
$$\sum_{j \in \text{vizinhos}(i)} G_{ij} (V_i - V_j) = 0 \implies \left( \sum_{j} G_{ij} \right) V_i - \sum_{j \text{ livre}} G_{ij} V_j = \sum_{k \text{ fixo}} G_{ik} V_{fixo\_k}$$

- A matriz $\mathbf{G}$ é estritamente simétrica, estritamente diagonal dominante e definida positiva.
- Como o número de nós livres em uma mesa de jogo típica varia entre $1$ e $25$, o sistema é resolvido em $<0.05\text{ms}$ através de **Eliminação Gaussiana com Pivotamento Parcial**.

### C. Extração dos Parâmetros por Componente
Uma vez obtido o vetor de potenciais $\mathbf{V}$:
1. **Diferença de Potencial no Componente $k$:** $\Delta V_k = |V_{in} - V_{out}|$
2. **Corrente no Componente $k$:** $I_k = \frac{\Delta V_k}{R_k}$ (para $R_k > 0$)
3. **Potência Dissipada:** $P_k = \Delta V_k \cdot I_k$
4. **Veredito do Aparelho:**
   - $|\Delta V_k - V_{nom}| \le 0.3\text{V} \implies$ 🟢 **Operação Nominal Perfeita! (Salvo)**
   - $\Delta V_k > V_{nom} + 0.3\text{V} \implies$ 💥 **Sobretensão / Queima!**
   - $\Delta V_k < V_{nom} - 0.3\text{V} \implies$ 🟡 **Subtensão (Inativo/Seguro)**

---

## 3. Atomic Implementation Tasks

### Step 1: Implementar o Módulo de Análise Nodal em `game.js`
- **Files**: `C:\codigos\FEBRACE\01_Jogo_Voltz\bancada_playtest\game.js`
- **Actions**:
  1. Criar classe/função `solveCircuitMNA(grid)`:
     - Identificar todos os nós de interface entre cartas.
     - Montar DSU para unir nós com $R=0$.
     - Identificar nós fixos ($12\text{V}$ do gerador e $0\text{V}$ dos GNDs).
     - Montar matriz de condutâncias $\mathbf{G}$ e vetor $\mathbf{I}$.
     - Executar eliminação gaussiana e calcular potenciais $V_n$.
     - Retornar mapa de nós com seus potenciais e componentes com seus $\Delta V, I, P$ e veredito físico.
- **Verification**: Executar teste de divisor $12\text{V} \to 2\Omega \to 1\Omega \to \text{GND}$ e validar potenciais $[12\text{V}, 4\text{V}, 0\text{V}]$.

### Step 2: Integrar o Solucionador ao Fluxo de Jogo (`VoltzPlaytestEngine`)
- **Files**: `C:\codigos\FEBRACE\01_Jogo_Voltz\bancada_playtest\game.js`
- **Actions**:
  1. Atualizar `analyzeCircuits()` para alimentar as estatísticas do jogo a partir do resultado do MNA.
  2. Armazenar telemetria detalhada no estado dos nós e cartas (`card.telemetry = { vIn, vOut, deltaV, current, power, status }`).
  3. Integrar detecção de queima de fusível quando a corrente total $I_{total} > 1.0\text{A}$ em fusíveis ou quando qualquer aparelho sofrer $\Delta V > V_{nom} + 0.3\text{V}$.
- **Verification**: `node 01_Jogo_Voltz/bancada_playtest/test_bancada.js` com testes de queima e sucesso.

### Step 3: Upgrade da IA do Bot com Consulta Nodal
- **Files**: `C:\codigos\FEBRACE\01_Jogo_Voltz\bancada_playtest\game.js`
- **Actions**:
  1. No método `getBestBotMove()`:
     - Ao simular cada candidato de jogada, invocar `solveCircuitMNA()`.
     - Se a jogada for um aparelho: verificar qual é o potencial do nó onde ele se conectará e calcular se $\Delta V$ ficará dentro de $V_{nom} \pm 0.3\text{V}$.
     - Se a jogada for um resistor: verificar se ele reduz a tensão do nó na medida necessária para atender aos aparelhos na mão do Bot.
     - Se a jogada for um GND: avaliar se o fechamento resulta em queima de qualquer nó do circuito.
- **Verification**: Bot jogando autonomamente sem causar sobretensão e montando divisores perfeitos.

### Step 4: Telemetria Visual & Tooltips Interativos no Tabuleiro
- **Files**: `C:\codigos\FEBRACE\01_Jogo_Voltz\bancada_playtest\index.html`, `C:\codigos\FEBRACE\01_Jogo_Voltz\bancada_playtest\style.css`
- **Actions**:
  1. Adicionar elemento de HUD / Tooltip flutuante `#circuit-node-tooltip` no DOM.
  2. No `renderBoard()`, adicionar listeners de `mouseenter`/`mousemove` em cada carta para exibir:
     - Nome do componente, $\Delta V$, Corrente $I$ (em Amperes) e Potência $P$ (em Watts).
  3. Adicionar classes CSS para brilho proporcional de corrente ativa (`.trilha-ativa`, `.corrente-alta`).
- **Verification**: Hover no navegador exibe tooltip em tempo real com dados da Lei de Ohm calculados pelo MNA.

### Step 5: Suíte de Testes Automatizados Expandida (`test_bancada.js`)
- **Files**: `C:\codigos\FEBRACE\01_Jogo_Voltz\bancada_playtest\test_bancada.js`
- **Actions**:
  1. Adicionar testes unitários para a rotina MNA:
     - Divisor de Tensão Série Simples ($12\text{V} \to 2\Omega \to 1\Omega \to \text{GND}$).
     - Circuito em Paralelo ($12\text{V} \to [2\Omega \parallel 2\Omega] \to \text{GND}$).
     - Detecção de Malha Aberta (potenciais flutuantes sem fechamento).
     - Teste de Precisão da IA do Bot.
- **Verification**: `node 01_Jogo_Voltz/bancada_playtest/test_bancada.js` com 100% dos testes aprovados.

---

## 4. Acceptance Criteria & Definition of Done (DoD)

- [ ] A classe `solveCircuitMNA` calcula com precisão matemática os potenciais e correntes de qualquer malha conectada.
- [ ] O Bot utiliza os potenciais nodais para decidir suas jogadas com zero chutes.
- [ ] O tabuleiro exibe tooltips com dados físicos reais ao passar o mouse sobre os componentes.
- [ ] Todos os testes automatizados em `test_bancada.js` passam com 100% de sucesso.
- [ ] O repositório Git e a implantação na Vercel (`https://teste-febrace.vercel.app/`) são atualizados.
