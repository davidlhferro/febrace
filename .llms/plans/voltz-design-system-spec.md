# 📐 Especificação Canônica: VOLTZ Bespoke Design System
**Versão:** 1.0.0 (Editorial Metrológico)  
**Status:** Aprovado para Implementação  
**Arquitetura:** W3C DTCG 3-Tier • OKLCH Perceptual • Tailwind v4 / Pure CSS  
**Diretiva Central:** *Zero Formas Vazias. Cada elemento gráfico é físico, diegético ou metrológico.*

---

## 🏛️ 1. Filosofia de Design & Manifesto Anti-Slop

O **VOLTZ Design System** é a fusão rigorosa entre o **Design Editorial Suíço (Müller-Brockmann / Bauhaus / Oink Games)** e os **Padrões Técnicos de Eletrodinâmica da IEEE (Std 315) e DIN EN 60617**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        O VOCABULÁRIO VISUAL FUNCIONAL DO VOLTZ                         │
├──────────────────────────────┬─────────────────────────────────────────────────────────┤
│ ❌ O QUE É PROIBIDO (AI SLOP) │ ✅ O QUE É OBRIGATÓRIO (FÍSICA REAL & METROLOGIA)       │
├──────────────────────────────┼─────────────────────────────────────────────────────────┤
│ Formas abstratas flutuantes  │ Trilhas de circuito com curvas a 45° e barramentos.     │
│ Círculos/quadrados sem função│ Pontos de teste (Test Points TP-01) e ilhas de solda.   │
│ Gradientes roxo/rosa neon    │ Cores de materiais físicos (Cobre, Cerâmica, Fósforo).  │
│ Emojis de celular na UI      │ Pictogramas vetoriais esquemáticos monocromáticos (3pt).│
│ Caixas e divisores vazios    │ Malha milimetrada técnica de bancada (Grid 1mm/5mm).    │
└──────────────────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 🎨 2. Paleta de Cores OKLCH: Materiais Físicos de Bancada

Em vez de valores hexadecimais arbitrários ou gradientes sintéticos de IA, a paleta do VOLTZ é derivada diretamente dos **materiais reais de condutividade, isolamento e sinalização elétrica**.

### 2.1 Tokens Primitivos de Materiais Físicos

| Material Físico | Token Primitivo | Valor OKLCH | Cor Hex Equiv. | Aplicação Canônica |
| :--- | :--- | :--- | :--- | :--- |
| **Cobre Bruto (Annealed Copper)** | `--mat-copper-raw` | `oklch(0.65 0.17 58)` | `#d97706` | Artéria condutora central de 10mm |
| **Cobre Polido (ENIG Gold)** | `--mat-copper-gold` | `oklch(0.78 0.19 75)` | `#f59e0b` | Núcleo de condução e chevrons de fluxo |
| **Cobre Oxidado / Escuro** | `--mat-copper-dark` | `oklch(0.45 0.14 48)` | `#92400e` | Sombras de barramento e chanfros |
| **Grafite Carbono Industrial** | `--mat-graphite-dark` | `oklch(0.14 0.01 260)` | `#09090b` | Linhas de contorno 3pt e tipografia |
| **Papel Técnico Oatmeal / Kraft** | `--mat-paper-oatmeal` | `oklch(0.95 0.015 85)` | `#f4efe6` | Substrato tátil de cartas e tabuleiros |
| **Papel Branco Técnico / PnP** | `--mat-paper-white` | `oklch(0.99 0.002 90)` | `#ffffff` | Versão de alta economia de tinta PnP |
| **Cerâmica Isolante / Alumina** | `--mat-ceramic-body` | `oklch(0.97 0.04 100)` | `#fef9c3` | Corpo físico dos resistores 1Ω, 2Ω, 3Ω |
| **Fósforo Catódico CRT (P31)** | `--mat-phosphor-green`| `oklch(0.82 0.22 142)` | `#10b981` | 1Ω Resistor e sinais de condução segura |
| **Cobalto Metrológico** | `--mat-cobalt-blue` | `oklch(0.52 0.22 260)` | `#1d4ed8` | 2Ω Resistor e divisores intermediários |
| **Laranja Térmico / Nixie** | `--mat-nixie-orange` | `oklch(0.62 0.21 42)` | `#c2410c` | 3Ω Resistor e avisos térmicos |
| **Índigo Eletrodinâmico** | `--mat-indigo-load` | `oklch(0.44 0.24 275)` | `#4338ca` | Equipamentos de carga (LED, Servidor, Motor) |
| **Teal Aterramento (GND)** | `--mat-teal-gnd` | `oklch(0.52 0.15 185)` | `#0f766e` | Linha de referência de potencial 0V |
| **Vermilion Alerta / Sobrecarga**| `--mat-vermilion-alert`| `oklch(0.58 0.24 25)` | `#b91c1c` | Apagão em setores e limites críticos |

---

## 🔤 3. Sistema Tipográfico & Micro-Hierarquia

O sistema tipográfico do VOLTZ elimina fontes genéricas não calibradas e estabelece uma hierarquia de alta densidade técnica com suporte a **numerais tabulares alinhados** (`font-variant-numeric: tabular-nums`).

### 3.1 Pares Tipográficos Canônicos
* **Display & Estrutura (Primária):** `Inter` / `Geist Sans` (Pesos: 700 Bold, 800 ExtraBold, 900 Black).
  * *Tracking:* Condensado (`letter-spacing: -0.02em` a `+0.04em`).
* **Metrologia & Grandezas Físicas (Técnica):** `JetBrains Mono` / `Space Mono` (Pesos: 600 SemiBold, 800 ExtraBold).
  * *Uso:* Símbolos de Ohm ($\Omega$), Volts ($\text{V}$), Ampères ($\text{A}$), designadores de circuito (`R1`, `C4`, `TP-01`, `⏚ 0V`).

### 3.2 Escala Tipográfica do Baralho (Poker Size: 63mm × 88mm)

| Nível Hierárquico | Família Tipográfica | Peso | Tamanho | Tracking | Aplicação no Card |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Índice de Poker (Canto)** | `JetBrains Mono` | 900 | `10.5pt` (`14px`) | `0` | Cantos espelhados (`1Ω`, `3V`, `⏚0V`) |
| **Título do Componente** | `Inter` | 900 | `6.5pt` (`9px`) | `+0.05em` | Cabeçalho (`RESISTOR LEVE`, `GERADOR`) |
| **Tag de Categoria / Badge**| `JetBrains Mono` | 800 | `5.2pt` (`7px`) | `+0.08em` | Badge (`DC 12V`, `1 OHM`, `GND 0V`) |
| **Valor de Grandeza Hero** | `JetBrains Mono` | 900 | `13.0pt` (`17px`)| `+0.02em` | Centro da carta (`R = 1 OHM`, `Vnom = 3V`) |
| **Especificação de Regra** | `Inter` | 600 | `4.8pt` (`6.5px`)| `0` | Instrução de bancada no rodapé |
| **Metrologia / Rodapé** | `JetBrains Mono` | 800 | `4.2pt` (`5.5px`)| `+0.05em` | Contagem de blocos e alertas técnicos |

---

## ⚡ 4. Vocabulário de Componentes Funcionais (Substituição de Formas Vazias)

Nenhum elemento geométrico existe no VOLTZ por mero preenchimento decorativo. Cada marca visual corresponde a um elemento de hardware de bancada:

```
[ BARRAMENTO CENTRAL DE COBRE 10mm ]
  ══════════════════════════════════════════════════════════════════════════════
  ►► Traço de 10mm maciço com chevrons serigráficos guiando o fluxo de elétrons.
  ►► Cruza de borda a borda (X=0 a X=63mm) na altura exata de 50% (Y=44mm).

[ PONTOS DE TESTE (TEST POINTS // TP-01) ]
  (●) Anéis concêntricos de cobre exposto indicando nós de medição com multímetro.

[ ILHAS DE SOLDA & VIAS (SOLDER PADS) ]
  (○) Furos metalizados circulares que ancoram terminais e bifurcações em nós Y.

[ RESISTOR CERÂMICO INDUSTRIAL ]
  [ ■ ■ ■ ] Corpo de alumina com 4 anéis de tolerância IEC oficiais e terminais axiais.

[ BLOCOS DE RESISTÊNCIA MODULAR (OHM CUBES) ]
  [■] Cubos sólidos de 11x11px com borda preta de 1.8px (1 cubo = 1Ω de queda).

[ MALHA MILIMETRADA DE BANCADA (BENCH GRID) ]
  Padrão pontilhado/ortogonal de 1mm/5mm com 4% de opacidade de tinta grafite.
```

---

## 💻 5. Tokens CSS Prontos para Uso (Tailwind v4 & Pure CSS)

```css
/* ========================================================================= */
/* VOLTZ DESIGN SYSTEM — TOKENS CANÔNICOS OKLCH (W3C DTCG SPEC)              */
/* ========================================================================= */

@theme {
  /* Fontes do Sistema */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Materiais Físicos de Bancada (OKLCH) */
  --color-mat-copper-raw: oklch(0.65 0.17 58);
  --color-mat-copper-gold: oklch(0.78 0.19 75);
  --color-mat-copper-dark: oklch(0.45 0.14 48);
  --color-mat-graphite: oklch(0.14 0.01 260);
  --color-mat-paper-oatmeal: oklch(0.95 0.015 85);
  --color-mat-paper-white: oklch(0.99 0.002 90);
  --color-mat-ceramic: oklch(0.97 0.04 100);

  /* Categorias Eletrodinâmicas */
  --color-cat-gen: oklch(0.55 0.16 52);      /* Gerador 12V */
  --color-cat-r1: oklch(0.58 0.18 155);     /* 1Ω Verde */
  --color-cat-r2: oklch(0.52 0.22 260);     /* 2Ω Azul */
  --color-cat-r3: oklch(0.62 0.21 42);      /* 3Ω Laranja */
  --color-cat-load: oklch(0.44 0.24 275);   /* Cargas 3V, 4V, 6V, 12V */
  --color-cat-gnd: oklch(0.52 0.15 185);    /* Terra 0V */
  --color-cat-special: oklch(0.58 0.18 220);/* Fusível e Nós */
  --color-cat-danger: oklch(0.58 0.24 25);  /* Apagão / Alerta */

  /* Espaçamentos e Dimensões de Carta */
  --card-width-poker: 63mm;
  --card-height-poker: 88mm;
  --busbar-track-height: 10mm;
}

:root {
  /* CSS Custom Properties com Fallback Direto */
  --voltz-bg-canvas: var(--color-mat-paper-oatmeal, #f4efe6);
  --voltz-ink-main: var(--color-mat-graphite, #09090b);
  --voltz-ink-copper: var(--color-mat-copper-raw, #d97706);
  --voltz-ink-gold: var(--color-mat-copper-gold, #f59e0b);
  --voltz-border-width-heavy: 2.4px;
  --voltz-border-width-regular: 1.5px;
  --voltz-border-width-hairline: 0.8px;
}
```

---

## 📋 6. Roteiro de Aplicação & Checklist de Migração

- [x] **Fase 1: Auditoria e Banimento de AI Slop** (Concluído).
- [x] **Fase 2: Especificação do Design System Bespoke** (`voltz-design-system-spec.md` criado).
- [ ] **Fase 3: Refatoração das 54 Cartas** (`cartas_print_visual.html` com substituição de emojis por pictogramas vetoriais puros de 3pt).
- [ ] **Fase 4: Refatoração do Verso Oficial** (`verso_cartas_a4.html` com grid geométrico estrito).
- [ ] **Fase 5: Sincronização da Versão Web Multiplayer** (`voltz_render.js` e `voltz_web.css` alinhados aos tokens OKLCH).
- [ ] **Fase 6: Compilação de PDFs e Teste de Física** (`exportar_pdf_baralho.py` e `test_engine.js`).
