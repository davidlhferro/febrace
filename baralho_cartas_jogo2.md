# 🎴 Baralho Oficial para Impressão — VOLTZ: CIRCUIT BREAK (Versão Refinada LLM Council)
**Jogo de Cartas Cooperativo com Linguagem Acessível, Divisores de Tensão e Cabo Terra (GND)**

Este documento contém a especificação gráfica, textual e dimensional de todas as **54 cartas** do jogo físico para serem impressas em folhas A4 (formato de grade 3x3 por folha, total de 6 páginas A4).

---

## 📐 Especificações de Impressão e Ergonomia Visual

* **Tamanho Padrão de Carta**: $63\text{ mm} \times 88\text{ mm}$ (Poker Size).
* **Grid por Página A4**: 9 cartas por folha ($3 \times 3$).
* **Modelagem de Física Realista**:
  * As cartas de Equipamentos exibem apenas a **Energia Necessária ($V_{nom}$)** e a **Resistência Base ($R_{equip}$)**.
  * A tabela de conversão proporcional de blocos fica no **Guia Rápido de Mesa (Player Aid)**, estimulando a dedução real da Lei de Ohm sem receitas mágicas pré-calculadas.

---

## 🃏 Catálogo Completo das 54 Cartas

### 🔴 CARTA CENTRAL DO GERADOR (1 Carta)
```
┌──────────────────────────────────────────────────┐
│ [TOP: 2 Conectores]    [RIGHT: 1 Conector]       │
│                                                  │
│          ⚡ GERADOR PRINCIPAL ENERGIZADO         │
│          Bateria de 12 Blocos de Energia         │
│          [ 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨 ] (Vin = 12V)  │
│                                                  │
│ [LEFT: 1 Conector]    [BOTTOM: 1 Conector]       │
└──────────────────────────────────────────────────┘
```

---

### 🟢 CARTAS DE RESISTOR (22 Cartas)
* **Resistor Leve 1Ω (Verde)** — 8 Cartas: Estampa **1 Bloco** `[ ■ 1Ω ]`.
* **Resistor Médio 2Ω (Azul)** — 8 Cartas: Estampa **2 Blocos** `[ ■ ■ 2Ω ]`.
* **Resistor Pesado 3Ω (Laranja)** — 6 Cartas: Estampa **3 Blocos** `[ ■ ■ ■ 3Ω ]`.

---

### ⚙️ CARTAS DE EQUIPAMENTOS (13 Cartas)
> **LAYOUT REFINADO**: Exibe apenas Energia Necessária ($V_{nom}$) e Resistência Base ($R_{equip}$).

#### 💡 LED Piloto — 3 Cartas
* **Energia Necessária ($V_{nom}$)**: $3\text{ Volts}$.
* **Resistência Base ($R_{equip}$)**: `[ ■ ]` ($1\Omega$).
* **Efeito**: Ativa a iluminação do setor ao ser energizado com $3\text{V}$!

#### 🖥️ Servidor Central — 3 Cartas
* **Energia Necessária ($V_{nom}$)**: $4\text{ Volts}$.
* **Resistência Base ($R_{equip}$)**: `[ ■ ]` ($1\Omega$).
* **Efeito**: Ativa a rede de computadores ao ser energizado com $4\text{V}$!

#### 🚨 Sirene de Alerta — 2 Cartas
* **Energia Necessária ($V_{nom}$)**: $6\text{ Volts}$.
* **Resistência Base ($R_{equip}$)**: `[ ■ ]` ($1\Omega$).
* **Efeito**: Ativa o alarme ao ser energizado com $6\text{V}$!

#### ⚙️ Motor de Bomba — 3 Cartas
* **Energia Necessária ($V_{nom}$)**: $6\text{ Volts}$.
* **Resistência Base ($R_{equip}$)**: `[ ■ ■ ]` ($2\Omega$).
* **Efeito**: Ativa o sistema hidráulico ao ser energizado com $6\text{V}$!

#### 🏥 Tomógrafo UTI — 2 Cartas
* **Energia Necessária ($V_{nom}$)**: $12\text{ Volts}$.
* **Resistência Base ($R_{equip}$)**: `[ ■ ■ ■ ■ ]` ($4\Omega$).
* **Efeito**: Liga direto na fonte de $12\text{V}$!

---

### ⏚ CARTAS DE CABO TERRA (GND - 0V) (8 Cartas) 🛑
> **CARTA DE ATERRAMENTO E GATILHO**: Consome 1 Ação do turno. Fecha a malha ($12\text{V} \to 0\text{V}$) e dispara o Teste do Ramo.

```
┌──────────────────────────────────────────────────────────┐
│ ▲ [CONECTOR DE ATERRAMENTO]                              │
├──────────────────────────────────────────────────────────┤
│                    ⏚ CABO TERRA (GND - 0V)               │
│              << GATILHO DE TESTE DO CIRCUITO >>          │
│                                                          │
│  Gasta 1 Ação de Turno.                                  │
│  Confera a proporção de blocos com a Tabela de Mesa:     │
│  • Voltagem Exata == Vnom ──► 🟢 ACENDEU! Setor Salvo 🛑 │
│  • Voltagem Maior > Vnom  ──► 💥 SOBRETENSÃO (Queimou)   │
│  • Voltagem Menor < Vnom  ──► ⚪ SUBTENSÃO (Ação Gasta)  │
└──────────────────────────────────────────────────────────┘
```

---

### 🔀 CARTAS DE RAMIFICAÇÃO & EVENTOS (10 Cartas)

* **Conector Y em Paralelo** — 5 Cartas (Abre 2 ramos paralelos de 12V).
* **🛡️ Fusível de Proteção** — 3 Cartas (Evita que o equipamento queime em caso de erro).
* **⚠️ Surto de Voltagem ($24\text{V}$)** — 2 Cartas (Aumenta a voltagem para $24\text{V}$, desafiando o grupo).

---

## 📊 Matriz Resumida das 54 Cartas

| Carta | Resistência Base | Energia Necessária ($V_{nom}$) | Qtd |
| :--- | :---: | :---: | :---: |
| **Gerador Central** | N/A | Fonte $12\text{V}$ (12 Blocos) | 1 |
| **Resistor 1Ω** | `[ ■ ]` (1 Bloco) | N/A | 8 |
| **Resistor 2Ω** | `[ ■ ■ ]` (2 Blocos) | N/A | 8 |
| **Resistor 3Ω** | `[ ■ ■ ■ ]` (3 Blocos) | N/A | 6 |
| **Sirene Alarme** | `[ ■ ]` (1 Bloco) | $6\text{V}$ | 2 |
| **Servidor Central** | `[ ■ ]` (1 Bloco) | $4\text{V}$ | 3 |
| **LED Piloto** | `[ ■ ]` (1 Bloco) | $3\text{V}$ | 3 |
| **Motor de Bomba** | `[ ■ ■ ]` (2 Blocos) | $6\text{V}$ | 3 |
| **Tomógrafo UTI** | `[ ■ ■ ■ ■ ]` (4 Blocos) | $12\text{V}$ | 2 |
| **Cabo Terra (GND)**| N/A | **Gatilho de Teste (1 Ação)** | 8 |
| **Conector Y Paralelo**| N/A | Abre 2 ramos de 12V | 5 |
| **Fusível Proteção** | N/A | Absorve 1 sobretensão | 3 |
| **Surto de Rede** | N/A | Dobra para 24V | 2 |
| **TOTAL** | | | **54 Cartas** |
