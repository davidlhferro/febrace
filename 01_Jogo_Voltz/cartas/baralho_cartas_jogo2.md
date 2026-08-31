# 🎴 Baralho Oficial & Matriz Definitiva de 70 Cartas — VOLTZ: CIRCUIT BREAK
**Especificação Matemática e Eletrodinâmica Desacoplada de Restrições Físicas**

Este documento consolida a especificação canônica definitiva do baralho do **VOLTZ**, estabelecida por **Simulação Monte Carlo de 2.000 partidas** ([`simular_balanceamento.js`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/web_multiplayer/simular_balanceamento.js)) com foco exclusivo na excelência de game design, profundidade estratégica, tensão cooperativa e rigor de física.

---

## 🔬 1. Justificativa Científica da Decisão: Por que 70 Cartas?

| Tamanho Testado | Taxa de Vitória (2P/3P/4P) | Sobra Média no Monte | Diagnóstico de Game Design |
| :--- | :---: | :---: | :--- |
| **54 Cartas** | 93.3% / 96.0% / 97.7% | 9 a 11 cartas | Margem estreita demais; 33% de vitórias no limite sem margem para eventos. |
| **🏆 70 Cartas (Vencedor)** | **98.5% / 98.6% / 99.4%** | **~24 cartas** | **Equilíbrio perfeito (Padrão Ouro Bandido). Permite eventos de surto e manobras.** |
| **80 Cartas** | 99.1% / 99.8% / 99.9% | ~35 cartas | Sobra excessiva de 43% do baralho; dilui a urgência. |
| **90 Cartas** | 99.8% / 99.9% / 100% | ~49 cartas | Inflação de monte; mais de 50% das cartas não entram em jogo. |

---

## 🃏 2. Catálogo Oficial da Matriz Definitiva de 70 Cartas

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MATRIZ DEFINITIVA DE 70 CARTAS DO VOLTZ                         │
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
│ 🟤 Resistor Força │ res_4ohm_crn │ 4.0 Ω  │ Joelho 90°   │ 4x           │ Marrom / IEC │
│ 💡 LED Piloto     │ load_led     │ 3V/1Ω  │ Reto (L-O)   │ 4x           │ Amarelo / PN │
│ 🖥️ Servidor       │ load_servidor│ 4V/1Ω  │ Reto (L-O)   │ 4x           │ Azul Celeste │
│ 🚨 Sirene         │ load_sirene  │ 6V/1Ω  │ Lâmpada Rubi │ 3x           │ Vermelho Clás│
│ 💧 Bomba D'Água   │ load_motor   │ 6V/2Ω  │ Voluta Hidr. │ 4x           │ Voluta Azul  │
│ 🏥 Tomógrafo UTI  │ load_tomograf│ 12V/4Ω │ Reto (L-O)   │ 3x           │ Gantry Torus │
│ ⏚ Cabo Terra      │ gnd_straight │ 0.0 V  │ Reto Dead-End│ 4x           │ Verde-Água   │
│ ⏚ Cabo Terra      │ gnd_corner   │ 0.0 V  │ 90° Dead-End │ 2x           │ Verde-Água   │
│ 🔀 Conector Y     │ node_y       │ --     │ Bifurcação   │ 4x           │ Cobre Dourado│
│ 🌉 Ponte Cruzada  │ bridge_cross │ --     │ Cruzamento 3D│ 2x           │ Isolamento   │
│ 🔌 Chave Faca     │ switch_toggle│ On/Off │ Seccionadora │ 2x           │ Manobra      │
│ 🛡️ Fusível 1A     │ fuse_1a      │ 1.0 A  │ Reto (L-O)   │ 3x           │ Azul Petróleo│
│ ⚡ Surto de Tensão│ surge_24v    │ 24.0 V │ Desafio      │ 3x           │ Vermelho Fogo│
│ 📉 Queda de Tensão│ brownout_6v  │ 6.0 V  │ Desafio      │ 2x           │ Âmbar Alerta │
├───────────────────┴──────────────┴────────┴──────────────┼──────────────┼──────────────┤
│ TOTAL DE CARTAS NO BARALHO DEFINITIVO                    │ 70 CARTAS    │ Padrão Ouro  │
└──────────────────────────────────────────────────────────┴──────────────┴──────────────┘
```

---

## ⚡ 3. Rigor de Eletrodinâmica & Fórmulas da Lei de Ohm

1. **Relação de Tensão e Corrente:**
   $$V = R \cdot I \quad \Longleftrightarrow \quad I = \frac{V_{\text{fonte}}}{R_{\text{total}}}$$
2. **Divisor de Tensão sobre a Carga:**
   $$V_{\text{carga}} = V_{\text{fonte}} \cdot \frac{R_{\text{carga}}}{R_{\text{adicional}} + R_{\text{carga}}}$$
3. **Metas de Cada Setor da Metrópole:**
   * **🏥 Hospital Regional ($V_{\text{nom}} = 12\text{V}, R = 4\Omega$):**  
     $V_{\text{carga}} = 12\text{V} \cdot \frac{4}{0 + 4} = 12\text{V}$ (Conexão direta sem resistores adicionais).
   * **🖥️ Central de Dados ($V_{\text{nom}} = 4\text{V}, R = 1\Omega$):**  
     $V_{\text{carga}} = 12\text{V} \cdot \frac{1}{2 + 1} = 4\text{V}$ (Exige $2\Omega$ adicionais em série).
   * **💧 Tratamento de Água ($V_{\text{nom}} = 6\text{V}, R = 2\Omega$):**  
     $V_{\text{carga}} = 12\text{V} \cdot \frac{2}{2 + 2} = 6\text{V}$ (Exige $2\Omega$ adicionais em série).
   * **💡 Rede Residencial ($V_{\text{nom}} = 3\text{V}, R = 1\Omega$):**  
     $V_{\text{carga}} = 12\text{V} \cdot \frac{1}{3 + 1} = 3\text{V}$ (Exige $3\Omega$ adicionais em série).
   * **🚨 Alarme de Emergência ($V_{\text{nom}} = 6\text{V}, R = 1\Omega$):**  
     $V_{\text{carga}} = 12\text{V} \cdot \frac{1}{1 + 1} = 6\text{V}$ (Exige $1\Omega$ adicional em série).
