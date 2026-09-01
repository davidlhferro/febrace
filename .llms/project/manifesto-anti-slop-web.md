# 🚫 Manifesto Anti-Slop de Web Design & Direção de Arte Canônica

**Projeto**: VOLTZ: Circuit Break — Central FEBRACE 2026  
**Documento**: Diretriz Permanente de Design & Memória Visual do Projeto  
**Localização**: `.llms/project/manifesto-anti-slop-web.md`  
**Status**: Canônico / Regra de Ouro Permanente  

---

## 1. O Diagnóstico: O Que É o "AI-Slop" em Web Design?

O termo **AI-Slop** no design de interfaces refere-se ao conjunto de clichês visuais sintéticos, preguiçosos e repetitivos gerados por inteligências artificiais quando não há uma direção de arte humana intencional. São escolhas que fazem um site parecer um template genérico de startup de 2023, transmitindo amadorismo e falta de identidade.

---

## 2. A Lista Negra de Clichês Visuais Proibidos (BANNED LIST)

Qualquer interface do projeto VOLTZ / FEBRACE que contenha os itens abaixo será sumariamente reprovada:

| Clichê de IA Proibido | Por Que É Slop? | Regra Canônica de Substituição (VOLTZ) |
| :--- | :--- | :--- |
| **Gradientes Cósmicos Neon (Roxo/Rosa/Ciano Fluorescente)** | Fundo escuro com "manchas cósmicas" desfocadas (`radial-gradient` violeta/pink) é o maior sintoma de IA. | **Dark PCB FR-4 Substrate**: Fundo preto-azulado de placa de circuito (`#060b13` / `#0a111e`) com malha ortogonal milimétrica nítida. |
| **Cards Flutuantes com Cantos Hiper-Arredondados (`border-radius: 28px+`)** | Cards "bolha" que parecem chiclete, sem estrutura mecânica ou hierarquia. | **Chassi Modular Industrial**: Painéis estruturados com cantos chanfrados ou mecânicos (`border-radius: 4px` a `8px`) e bordas sólidas (`#1e293b`). |
| **Sombras Difusas e Borradas (`box-shadow: 0 25px 60px rgba(168,85,247,0.4)`)** | "Glow" exagerado que borra a leitura e cria poluição visual. | **Iluminação Física e Chanfros**: Sombras de contato secas (`0 2px 4px rgba(0,0,0,0.6)`) com bordas superiores iluminadas (`border-top: 1px solid rgba(255,255,255,0.1)`). |
| **Bento Grid Forçado para Tudo** | Fatiar textos lineares em 8 caixas quadradas desconexas sem propósito hierárquico. | **Layout Editorial Suíço**: Estrutura de leitura contínua com colunas proporcionais, cabeçalhos assertivos e tabelas de alta densidade. |
| **Badges Genéricos de Buzzwords ("AI-Powered", "Next-Gen")** | Pílulas decorativas sem função mecânica real. | **Telemetria de Engenharia**: Badges com dados técnicos reais (`N=75`, `12V DC`, `g ≥ 0.65`, `1-β = 86.9%`). |
| **Monotonia Tipográfica (Inter Padrão sem Ajuste)** | Texto uniforme, sem peso, sem números tabulares para fórmulas e grandezas. | **Tipografia Híbrida de Precisão**: `Inter` (pesos 600 a 900) para redação editorial + `JetBrains Mono` com numerais tabulares (`tnum`) para grandezas elétricas e métricas de Hake. |

---

## 3. A Identidade Visual Canônica: Industrial Precision & Dark Laboratory

A identidade visual do VOLTZ inspira-se em **equipamentos de bancada de instrumentação de física (Tektronix, HP Instruments, Braun de Dieter Rams e Bauhaus Suíça)**:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   DIREÇÃO DE ARTE: INDUSTRIAL DARK PCB & SWISS PRECISION                         │
├───────────────────────────────────┬──────────────────────────────────────────────────────────────┤
│ Elemento                          │ Especificação Técnica                                        │
├───────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ **Substrato Principal (Chassi)**  │ FR-4 Deep Black (`#050912`) com Grade Ortogonal (16px / 64px) │
│ **Painéis de Instrumentação**     │ Modulares Dark Slate (`#0c1424`) com borda mecânica `#1e293b` │
│ **Trilhas de Potência (Acento)**  │ Cobre Eletrolítico / Ouro ENIG (`#f59e0b` / `#fbbf24`)       │
│ **Indicadores de Sinal (LEDs)**   │ Verde Carga (`#22c55e`), Azul Medição (`#38bdf8`), GND (`#fff`)│
│ **Tipografia de Interface**       │ `Inter`, -apple-system, system-ui (Editorial Suíço)          │
│ **Tipografia de Telemetria**      │ `JetBrains Mono`, `Fira Code`, monospace (Numerais Tabulares)│
│ **Botões Táteis**                 │ Relevo mecânico com clique ativo de 1px e feedback sonoro/tátil│
│ **Cartas Oficiais na Mesa**       │ Renderização SVG 1:1 gap-zero borda a borda (Poker Size)    │
└───────────────────────────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 4. O Checklist Anti-Slop para Qualquer Nova Tela

Antes de aprovar qualquer alteração no Portal:
- [ ] O fundo utiliza o substrato de laboratório escuro sem borrões cósmicos coloridos?
- [ ] Os cantos arredondados são contidos e mecânicos ($4\text{px}$ a $8\text{px}$)?
- [ ] As voltagens, resistências e métricas de Hake estão formatadas em fonte monoespelhada com numerais tabulares?
- [ ] Os textos explicam a física e o método experimental sem rodeios acadêmicos ou clichês corporativos?
- [ ] As cartas do jogo encaixam perfeitamente borda a borda sem desalinhamentos?
