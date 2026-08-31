# 🎴 Baralho Oficial & Matriz Topológica — VOLTZ: CIRCUIT BREAK
**Especificação Matemática e Espacial Validada por Simulação Monte Carlo (1.000 Partidas)**

Este documento consolida a especificação canônica do baralho do VOLTZ, incorporando as descobertas da **Simulação Monte Carlo de Topologia 2D** ([`simular_balanceamento.js`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/web_multiplayer/simular_balanceamento.js)).

---

## 🔬 1. Decisões Baseadas em Dados da Simulação Monte Carlo

### 📏 Decisão A: Tamanho do Baralho (63 Cartas // 7 Páginas A4)
* **Comparação Estatística (1.000 Partidas por Cenário):**
  * **54 Cartas (6 Folhas A4):** Vitória de $81.7\%$, sobram apenas $11\text{ a }13\text{ cartas}$ no monte. Excelente para partidas rápidas de 2 jogadores, mas apertado para 4 jogadores.
  * **63 Cartas (7 Folhas A4 — Vencedor Oficial):** Vitória equilibrada de $77.8\% \text{ a } 81.6\%$, com média de **$20.2\text{ cartas}$ restantes ao vencer**. Ponto ideal de tensão cooperativa para 2, 3 e 4 jogadores.
  * **72 Cartas (8 Folhas A4):** Vitória de $85.6\%$, com sobra excessiva de $33\text{ cartas}$ no monte (quase metade do baralho intocada, diluindo a urgência).

---

### 📐 Decisão B: Curvas Integradas nos Componentes (Zero Cartas Vazias)
* **Problema Resolvido:** Circuitos puramente retos avançam $35.2\text{cm}$ por ramo e escapam da mesa.
* **Solução Adotada:** Em vez de cartas de "arame vazio", **as curvas de 90° são integradas diretamente nos corpos dos resistores, cargas e aterramentos**:
  * Resistor $1\Omega$ Reto ($5\times$) + Resistor $1\Omega$ em Joelho 90° ($4\times$).
  * Resistor $2\Omega$ Reto ($5\times$) + Resistor $2\Omega$ em Joelho 90° ($4\times$).
  * Resistor $3\Omega$ Reto ($4\times$) + Resistor $3\Omega$ em Joelho 90° ($3\times$).
  * Resistor $4\Omega$ Industrial em Joelho 90° ($2\times$).
  * Cargas em Esquina (Sirene e Motor com saída em 90°).

---

## 🃏 2. Catálogo Oficial da Matriz Canônica (63 Cartas // 7 Páginas A4)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MATRIZ CANÔNICA DE 63 CARTAS DO VOLTZ                           │
├───────────────────┬──────────────┬────────┬──────────────┬──────────────┬──────────────┤
│ CATEGORIA         │ ID DA CARTA  │ VALOR  │ TOPOLOGIA    │ QUANTIDADE   │ COR / SÍMBOLO│
├───────────────────┼──────────────┼────────┼──────────────┼──────────────┼──────────────┤
│ ⚡ Fonte Central   │ gen_12v      │ DC 12V │ 4 Saídas 10mm│ 1x           │ Cobre Escuro │
│ 🟢 Resistor Leve  │ res_1ohm_str │ 1.0 Ω  │ Reto (L-O)   │ 5x           │ Verde / IEC  │
│ 🟢 Resistor Leve  │ res_1ohm_crn │ 1.0 Ω  │ Joelho 90°   │ 4x           │ Verde / IEC  │
│ 🔵 Resistor Médio │ res_2ohm_str │ 2.0 Ω  │ Reto (L-O)   │ 5x           │ Azul / IEC   │
│ 🔵 Resistor Médio │ res_2ohm_crn │ 2.0 Ω  │ Joelho 90°   │ 4x           │ Azul / IEC   │
│ 🟠 Resistor Pesado│ res_3ohm_str │ 3.0 Ω  │ Reto (L-O)   │ 4x           │ Laranja / IEC│
│ 🟠 Resistor Pesado│ res_3ohm_crn │ 3.0 Ω  │ Joelho 90°   │ 3x           │ Laranja / IEC│
│ 🟤 Resistor Força │ res_4ohm_crn │ 4.0 Ω  │ Joelho 90°   │ 2x           │ Marrom / IEC │
│ 💡 LED Piloto     │ load_led     │ 3V/1Ω  │ Reto (L-O)   │ 3x           │ Amarelo / PN │
│ 🖥️ Servidor       │ load_servidor│ 4V/1Ω  │ Reto (L-O)   │ 3x           │ Azul Celeste │
│ 🚨 Sirene         │ load_sirene  │ 6V/1Ω  │ Joelho 90°   │ 3x           │ Vermelho-Rubi│
│ 💧 Bomba D'Água   │ load_motor   │ 6V/2Ω  │ Joelho 90°   │ 3x           │ Voluta Azul  │
│ 🏥 Tomógrafo UTI  │ load_tomograf│ 12V/4Ω │ Reto (L-O)   │ 2x           │ Gantry Torus │
│ ⏚ Cabo Terra      │ gnd_straight │ 0.0 V  │ Reto Dead-End│ 5x           │ Verde-Água   │
│ ⏚ Cabo Terra      │ gnd_corner   │ 0.0 V  │ 90° Dead-End │ 3x           │ Verde-Água   │
│ 🔀 Conector Y     │ node_y       │ --     │ Bifurcação   │ 3x           │ Cobre Dourado│
│ 🛡️ Fusível 1A     │ fuse_1a      │ 1.0 A  │ Reto (L-O)   │ 4x           │ Azul Petróleo│
│ ⚡ Surto de Tensão│ surge_24v    │ 24.0 V │ Desafio      │ 2x           │ Vermelho Fogo│
├───────────────────┴──────────────┴────────┴──────────────┼──────────────┼──────────────┤
│ TOTAL DE CARTAS NO BARALHO OFICIAL                       │ 63 CARTAS    │ 7 Folhas A4  │
└──────────────────────────────────────────────────────────┴──────────────┴──────────────┘
```

---

## 📐 3. Guia de Conexão Espacial e Topologia em Mesa

1. **Alinhamento Padrão de 10mm:**
   * Todas as conexões nas 4 bordas (Norte, Sul, Leste, Oeste) possuem **$10\text{mm}$ ($48\text{px}$) de espessura de cobre maciço centralizado**, garantindo continuidade visual estilo *Bandido*.
2. **Uso das Cartas de Joelho (90°):**
   * Podem ser rotacionadas em qualquer ângulo ($0^\circ, 90^\circ, 180^\circ, 270^\circ$) ao serem jogadas.
   * Permitem que um ramo contorne as bordas da mesa ou dê meia-volta, limitando o espaço total de jogo a **$45\text{cm} \times 45\text{cm}$**.
3. **Resolução de Kirchhoff:**
   * $\text{Hospital (12V): } 12\text{V} \text{ direto sem resistores } (R_{\text{eq}} = 4\Omega, I = 3\text{A})$.
   * $\text{Dados (4V): } 1\times 2\Omega \text{ ou } 2\times 1\Omega \text{ em série com Servidor } 1\Omega \to 12\text{V} / 3\Omega = 4\text{V}$.
   * $\text{Água (6V): } 1\times 2\Omega \text{ em série com Bomba } 2\Omega \to 12\text{V} \cdot \frac{2}{4} = 6\text{V}$.
   * $\text{Residencial (3V): } 1\times 3\Omega \text{ ou } (1\times 2\Omega + 1\times 1\Omega) \text{ em série com LED } 1\Omega \to 12\text{V} / 4\Omega = 3\text{V}$.
   * $\text{Residencial (6V Alternativa): } 1\times 1\Omega \text{ em série com Sirene } 1\Omega \to 12\text{V} / 2\Omega = 6\text{V}$.
