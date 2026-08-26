# ⚡ VOLTZ: CIRCUIT BREAK
**Jogo de Cartas Cooperativo de Eletrodinâmica & Pesquisa Científica FEBRACE 2026**

> **Remediação Ativa de Concepções Alternativas em Eletrodinâmica através de Modelagem Topológica Cooperativa**

---

## 🎮 1. Pacote Print-and-Play do Jogo (Pronto para Jogar — Zero Código!)

Se você deseja apenas **baixar, imprimir e jogar** o VOLTZ com seus amigos, familiares ou turmas de estudantes (sem precisar rodar código ou ver dados acadêmicos de feira), todos os arquivos prontos estão disponíveis na pasta [`01_Jogo_Voltz/dist_print_and_play/`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/dist_print_and_play/):

| Arquivo | Descrição | Formato |
| :--- | :--- | :--- |
| 🗜️ [**VOLTZ_Print_and_Play_Completo.zip**](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/dist_print_and_play/VOLTZ_Print_and_Play_Completo.zip) | **Pacote Completo em 1 Clique** (Manual + Baralho + Tabuleiro + Guia de Montagem) | Arquivo ZIP (455 KB) |
| 📖 [**VOLTZ_Manual_de_Regras.pdf**](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/dist_print_and_play/VOLTZ_Manual_de_Regras.pdf) | Manual Oficial com Tabela de Mesa, Fluxo de Turno e Modo Tutorial (3 págs) | PDF A4 Pronto |
| 🃏 [**VOLTZ_Baralho_54_Cartas_PrintAndPlay.pdf**](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/dist_print_and_play/VOLTZ_Baralho_54_Cartas_PrintAndPlay.pdf) | Baralho Modular com 54 Cartas e Trilhas de Encaixe Borda a Borda (6 págs A4) | PDF A4 Toner-Safe |
| 🗺️ [**VOLTZ_Tabuleiro_Guia_Mesa_A4.pdf**](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/dist_print_and_play/VOLTZ_Tabuleiro_Guia_Mesa_A4.pdf) | Tabuleiro de Apoio de Mesa Opcional para montagem dos 4 setores (1 pág A4) | PDF A4 Landscape |
| 🌐 [**Versão Digital Web Multiplayer**](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/web_multiplayer/index.html) | Jogue online em tempo real no navegador (2 a 4 jogadores via WebRTC P2P) | Web SPA HTML5/JS |
| 📝 [**Guia_de_Impressao_e_Montagem.txt**](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/dist_print_and_play/Guia_de_Impressao_e_Montagem.txt) | Instruções simples de papel (Couchê 250g–300g / Sulfite + Sleeves) e corte | Texto Puro |

*Licença do Jogo: Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional (CC BY-NC-SA 4.0).*

---

## 📂 2. Organização Modular do Repositório

O projeto adota uma arquitetura de separação radical entre o **produto lúdico autônomo**, a **versão digital multiplayer**, a **documentação científica da FEBRACE** e os **relatórios de governança do LLM Council**:

```
C:\codigos\FEBRACE\
│
├── 📁 01_Jogo_Voltz/                        # 🎴 Produto Autônomo do Jogo (Agnóstico a Feiras)
│   ├── 📁 web_multiplayer/                 # 🌐 JOGO DIGITAL MULTIPLAYER WEB (2 a 4 Jogadores)
│   │   ├── index.html                      # Interface SPA (Lobby + Mesa 4 Setores + Mão)
│   │   ├── js/                             # Motor Canônico (Regras, Cartas, WebRTC)
│   │   ├── css/                            # Estilos Visuais com Trilhas de 10mm
│   │   ├── server.js                       # Servidor Node.js Opcional para LAN/Cloud
│   │   └── README_MULTIPLAYER.md           # Guia de Início Rápido Online
│   ├── 📁 dist_print_and_play/             # 📦 DISTRIBUIÇÃO PRONTA (Zero Código / PDFs Pré-Compilados)
│   │   ├── VOLTZ_Print_and_Play_Completo.zip # Pacote ZIP para Compartilhamento Fácil
│   │   ├── VOLTZ_Manual_de_Regras.pdf      # Manual Oficial Puro em PDF
│   │   ├── VOLTZ_Baralho_54_Cartas_PrintAndPlay.pdf # 54 Cartas com Trilhas Contínuas
│   │   ├── VOLTZ_Tabuleiro_Guia_Mesa_A4.pdf # Tabuleiro de Apoio Central
│   │   └── Guia_de_Impressao_e_Montagem.txt # Passo a Passo de Papel e Tesoura
│   ├── 📁 cartas/                          # 🛠️ Código-Fonte do Baralho
│   │   ├── cartas_print_visual.html        # Layout Editorial com Trilhas PCB em HTML/SVG
│   │   ├── tabuleiro_mesa_a4.html          # Tabuleiro de Mesa Modular em HTML
│   │   ├── exportar_pdf_baralho.py         # Automação de Exportação via Edge Headless
│   │   ├── exportar_pdf_tabuleiro.py       # Automação do Tabuleiro via Edge Headless
│   │   └── baralho_cartas_jogo2.md         # Especificação Canônica das 54 Cartas
│   └── 📁 manual_e_regras/                 # 🛠️ Código-Fonte do Manual
│       ├── gerar_pdf_manual_oficial.py     # Script ReportLab do Manual Oficial Puro
│       ├── manual_jogo2_cooperativo.md     # Especificação das Regras em Markdown (SSOT)
│       ├── manual_ilustrado.html           # Manual Ilustrado Web Editorial
│       └── gerar_pdf_regulamento.py        # Script do Regulamento Acadêmico FEBRACE
│
├── 📁 02_Febrace_Pesquisa/                 # 🔬 Documentação Científica para a Feira
│   ├── 📁 artigo/
│   │   └── projeto_febrace_artigo.md       # Artigo Científico Completo (DIRECT, Hake, Far Transfer)
│   ├── 📁 diario_de_bordo_e_professores/
│   │   └── guia_professor_diario.md        # Guia de 50 min, Diário de Bordo e Modelos TCLE/TALE
│   ├── 📁 apresentacao_e_poster/
│   │   ├── poster_febrace.html             # Pôster Oficial Regulamentar (90cm x 120cm)
│   │   └── apresentacao_febrace.html       # Pitch Deck Interativo (Slides 16:9 com Chart.js)
│   ├── 📁 dados_e_estatistica/
│   │   ├── analise_estatistica_febrace.py  # Pipeline SciPy/Plotly (Hake g, ANOVA, Cohen d)
│   │   ├── dados_experimentais_febrace.csv # Base de Dados Bruta (N = 75 Estudantes)
│   │   ├── grafico_hake_boxplot.html       # Boxplot Interativo com Jitter dos Grupos
│   │   └── grafico_pre_vs_pos_dispersao.html # Gráfico de Dispersão Pré vs. Pós com Faixas de Hake
│   └── 📁 historico_e_brutos/              # Fotos de Campo, Protótipos Iniciais e Anotações
│
├── 📁 03_Relatorios_Council/               # 🏛️ Transcrições e Relatórios Visuais do LLM Council
│   ├── council-report-20260825-desacoplamento-pnp.html # Relatório Visual do Desacoplamento PNP
│   ├── council-transcript-20260825-desacoplamento-pnp.md # Transcrição do Desacoplamento PNP
│   ├── council-report-20260825-science-fair.html # Relatório Visual da Avaliação Science Fair
│   └── council-transcript-20260825-science-fair.md # Transcrição da Avaliação Science Fair
│
├── 📁 .agents/                             # 🧠 Metadados do Agente e Handover de Sessão
├── 📁 .llms/                               # 📝 Planos e Histórico de Decisões
└── README.md                               # Este Índice Geral
```

---

## 🔬 3. Pesquisa Científica & Síntese Estatística (FEBRACE 2026)

O projeto investiga a superação de vícios conceituais prévios em circuitos elétricos (modelo sequencial de corrente) através da topologia de divisores de tensão no VOLTZ:

* **Amostra Total**: $N = 75$ estudantes do 3º ano do Ensino Médio de escola pública.
* **Ganho Normalizado de Hake ($\langle g \rangle$)**:
  * **Grupo 1 (Controle Ativo - Aula Tradicional + PhET)**: $\langle g \rangle = 0{,}24 \pm 0{,}06$ *(Baixo Ganho)*
  * **Grupo 2 (VOLTZ Cooperativo)**: $\langle g \rangle = 0{,}64 \pm 0{,}08$ *(Alto Ganho)*
  * **Grupo 3 (Simulação Coopetitiva)**: $\langle g \rangle = 0{,}40 \pm 0{,}10$ *(Médio Ganho)*
* **Inferência Estatística**: ANOVA One-Way $F = 149{,}76$ ($p = 2{,}21 \times 10^{-26}$); Tamanho de Efeito $d\text{ de Cohen} = 5{,}34$.
* **Transferência Prática (*Far Transfer* em Protoboard)**: 64,0% de acertos no grupo VOLTZ vs. 36,0% no grupo de controle.
* **Custo Unitário de Produção**: **R$ 22,50 por kit**, viabilizando ampla replicação em escolas públicas.

---

## 🛠️ 4. Comandos de Desenvolvimento Interno

Para recompilar os artefatos a partir do código-fonte:

```powershell
# Compilar o Manual Oficial Puro do Jogo em PDF:
python 01_Jogo_Voltz/manual_e_regras/gerar_pdf_manual_oficial.py

# Exportar o Baralho de 54 Cartas em PDF A4:
python 01_Jogo_Voltz/cartas/exportar_pdf_baralho.py

# Rodar o pipeline estatístico dos dados da FEBRACE:
python 02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_febrace.py
```
