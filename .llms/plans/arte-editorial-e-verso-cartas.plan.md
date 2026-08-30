# Plan: Arte Editorial de Alta Fidelidade & Verso Oficial Anti-Cheat

- **ID / Slug**: `arte-editorial-e-verso-cartas`
- **Status**: `done`
- **Created**: 2026-08-29
- **Target Component / Scope**: `01_Jogo_Voltz/cartas/`, `01_Jogo_Voltz/web_multiplayer/`

## 1. Goal & Context
- **Goal**: Elevar a qualidade estética das 54 cartas do VOLTZ de vetores geométricos simples para ilustrações ricas com profundidade, luz e textura de componentes eletrônicos, adicionando mini-índices de canto (poker style) e criando o Verso Oficial (Card Back) com simetria rotacional perfeita de 180° anti-cheat.
- **Why it matters**: Transforma o produto visual em um jogo de tabuleiro comercial de padrão editorial internacional, aumentando o apelo para jogadores, educadores e bancas científicas.
- **Non-Goals**: Não alterar as regras canônicas, as contagens de cartas, a física de 12V ou as Leis de Ohm.

## 2. Architectural Approach & MVP Choice
- **Recommended Approach**: Ilustrações SVG vetoriais com gradientes lineares/radiais, oclusão de sombras e micro-grade de circuito; Verso em A4 3x3 simétrico com medalhão dourado central.

## 3. Atomic Implementation Tasks
- [x] **Step 1: Criação do Verso Oficial das Cartas (`verso_cartas_a4.html`)**
- [x] **Step 2: Redesenho Artístico das 54 Cartas com Índices de Canto (`cartas_print_visual.html`)**
- [x] **Step 3: Atualização do Motor de Renderização Web (`voltz_render.js` e `voltz_web.css`)**
- [x] **Step 4: Compilação dos PDFs de Frente e Verso (`exportar_pdf_baralho.py`)**
- [x] **Step 5: Atualização do Pacote ZIP e Documentação**
