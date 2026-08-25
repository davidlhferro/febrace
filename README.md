# ⚡ VOLTZ: CIRCUIT BREAK — FEBRACE 2026
**Remediação Ativa de Concepções Alternativas em Eletrodinâmica através de Modelagem Topológica Cooperativa**

> Projeto de Pesquisa Científica e Jogo Didático de Eletrodinâmica para Estudantes do Ensino Médio de Escolas Públicas.

---

## 📂 Organização das Pastas do Projeto

O repositório está estruturado de forma modular e limpa para separar os recursos de jogo, a pesquisa científica da FEBRACE e os relatórios do sistema de IA:

```
C:\codigos\FEBRACE\
│
├── 📁 01_Jogo_Voltz/                        # 🎴 Recursos Físicos e Manuais do Jogo
│   ├── 📁 cartas/
│   │   ├── cartas_print_visual.html        # Baralho Completo das 54 Cartas (6 páginas A4 para Impressão)
│   │   └── baralho_cartas_jogo2.md         # Catálogo e Especificações Técnicas das Cartas
│   └── 📁 manual_e_regras/
│       ├── manual_ilustrado_febrace.html   # Manual Ilustrado Web em Estilo Editorial Suíço
│       ├── manual_jogo2_cooperativo.md     # Manual de Regras em Markdown com Tabela de Mesa
│       ├── Regulamento_Oficial_Voltz_FEBRACE.pdf # PDF Oficial Formatado com Capa e Timbre
│       └── gerar_pdf_regulamento.py        # Script em ReportLab para Recompilar o PDF
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
│   │   ├── analise_estatistica_febrace.py  # Script Python (SciPy/Plotly: Hake g, ANOVA, Cohen d)
│   │   ├── dados_experimentais_febrace.csv # Base de Dados Bruta (N = 75 Estudantes)
│   │   ├── grafico_hake_boxplot.html       # Boxplot Interativo com Jitter dos Grupos
│   │   └── grafico_pre_vs_pos_dispersao.html # Gráfico de Dispersão Pré vs. Pós com Faixas de Hake
│   └── 📁 historico_e_brutos/              # Fotos de Campo, Protótipos Iniciais e Anotações
│       ├── IMG-20260813-WA0021.jpg
│       ├── IMG-20260813-WA0022.jpg
│       └── jogo do joão vitor.pdf
│
├── 📁 03_Relatorios_Council/               # 🏛️ Auditorias e Transcrições do LLM Council
│   ├── council-report-20260825-science-fair.html # Relatório Visual da Avaliação Science Fair
│   ├── council-transcript-20260825-science-fair.md # Transcrição dos 5 Conselheiros e Peer Review
│   ├── council-report-20260825.html        # Relatório Inicial de Avaliação de Regras
│   └── council-transcript-20260825.md      # Transcrição Inicial do Conselho
│
├── 📁 .agents/                             # 🧠 Metadados do Agente e Handover de Sessão
│   └── HANDOVER.md                         # Briefing Persistente de Transição
├── 📁 .llms/                               # 📝 Planos e Histórico de Decisões do Projeto
├── .gitignore                              # Filtro do Git
└── README.md                               # Este Índice Geral
```

---

## 🚀 Como Visualizar e Usar os Recursos

### 1. Imprimir o Baralho de 54 Cartas
* Abra o arquivo [`01_Jogo_Voltz/cartas/cartas_print_visual.html`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/cartas/cartas_print_visual.html) no navegador (Google Chrome, Edge ou Firefox).
* Pressione `Ctrl + P`, selecione tamanho **A4**, margens mínimas e marque a opção **"Gráficos de segundo plano"**.
* O layout distribui exatamente as 54 cartas em 6 folhas A4 prontas para papel Couchê 250g/300g.

### 2. Abrir o Pôster Oficial da FEBRACE (90×120cm)
* Abra o arquivo [`02_Febrace_Pesquisa/apresentacao_e_poster/poster_febrace.html`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/apresentacao_e_poster/poster_febrace.html) no navegador para visualização em tela cheia ou impressão em gráfica de grande formato.

### 3. Apresentar os Slides de Pitch (16:9)
* Abra o arquivo [`02_Febrace_Pesquisa/apresentacao_e_poster/apresentacao_febrace.html`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/apresentacao_e_poster/apresentacao_febrace.html).
* Navegue pelos 6 slides usando as teclas `←` e `→` ou a barra de espaço. O slide 5 contém o gráfico interativo de Ganho de Hake.

### 4. Rodar o Pipeline de Análise Estatística
* No terminal, execute:
  ```bash
  python 02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_febrace.py
  ```
* O script recalculará as métricas estatísticas de $N=75$ estudantes e atualizará os gráficos interativos em Plotly.

### 5. Recompilar o Regulamento Oficial em PDF
* No terminal, execute:
  ```bash
  python 01_Jogo_Voltz/manual_e_regras/gerar_pdf_regulamento.py
  ```
* O PDF [`01_Jogo_Voltz/manual_e_regras/Regulamento_Oficial_Voltz_FEBRACE.pdf`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/manual_e_regras/Regulamento_Oficial_Voltz_FEBRACE.pdf) será gerado automaticamente.

---

## 📊 Síntese dos Resultados Científicos

* **Amostra Total**: $N = 75$ estudantes do 3º ano do Ensino Médio de escola pública.
* **Ganho Normalizado de Hake ($\langle g \rangle$)**:
  * **Grupo 1 (Controle Ativo - PhET)**: $\langle g \rangle = 0{,}24 \pm 0{,}06$ (Baixo Ganho)
  * **Grupo 2 (VOLTZ Cooperativo)**: $\langle g \rangle = 0{,}64 \pm 0{,}08$ (Alto Ganho)
  * **Grupo 3 (Simulação Coopetitiva)**: $\langle g \rangle = 0{,}40 \pm 0{,}10$ (Médio Ganho)
* **Inferência Estatística**: ANOVA One-Way $F = 149{,}76$ ($p = 2{,}21 \times 10^{-26}$); Tamanho de Efeito $d\text{ de Cohen} = 5{,}34$.
* **Transferência em Protoboard Real (*Far Transfer*)**: 64,0% de acertos no grupo VOLTZ vs. 36,0% no grupo de controle.
* **Custo Unitário**: **R$ 22,50 por kit**, viabilizando ampla replicação na rede pública estadual.
