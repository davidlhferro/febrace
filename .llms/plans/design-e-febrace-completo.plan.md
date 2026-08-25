# Plan: Design Gráfico Profissional das Cartas & Kit Completo FEBRACE

- **ID / Slug**: `design-e-febrace-completo`
- **Status**: `done`
- **Created**: 2026-08-17
- **Target Component / Scope**: `Assets Gráficos do Jogo 2 (David), Manual HTML/PDF, Pôster e Pitch Deck FEBRACE`

## 1. Objetivo & Contexto
- **Objetivo**: Elevar o Jogo 2 (David) e o projeto da equipe de 3 alunos ao padrão profissional de feiras de ciências internacionais (FEBRACE / ISEF), criando assets de alta fidelidade visual (cartas físicas em HTML/CSS prontas para impressão A4, livro de regras diagramado, arte da caixa, pôster científico oficial $90\times120\text{cm}$, pitch deck interativo em HTML 16:9 e modelo de Diário de Bordo).
- **Por que importa**: Na FEBRACE, a qualidade visual da apresentação, a clareza do pôster e o rigor da documentação de bordo contam pontos cruciais nos critérios de avaliação (Atitude Científica, Clareza, Organização e Apresentação Visual).

---

## 2. Abordagem Arquitetural de Design

```
                                 [ KIT COMPLETO DO PROJETO ]
                                             │
         ┌───────────────────────────────────┼───────────────────────────────────┐
         ▼                                   ▼                                   ▼
[ COMPONENTES DO JOGO FÍSICO ]       [ DOCUMENTAÇÃO ACADÊMICA ]         [ APRESENTAÇÃO FEBRACE ]
 • Layout HTML/CSS de 54 Cartas       • Artigo Científico ABNT/FEBRACE   • Pôster $90 \times 120\text{cm}$
 • Livro de Regras Diagramado        • Modelo Diário de Bordo            • Pitch Deck 16:9 Interativo
 • Guia Rápido de Mesa (Player Aid)  • Guia do Professor / Avaliador    • Gráficos de Aprendizagem
 • Arte da Caixa (Box Art)
```

---

## 3. Tarefas Atômicas de Execução

- [x] **Etapa 1: Design das Cartas Prontas para Impressão A4 (`cartas_print_visual.html`)**
  - **Arquivo**: `C:\codigos\FEBRACE\cartas_print_visual.html`.
  - **Ação**: Criar aplicação HTML/CSS que renderiza as 54 cartas no formato exato Poker Size ($63\text{mm} \times 88\text{mm}$) em 6 páginas A4 cortáveis, com gradientes sci-fi/cyberpunk limpos, conectores laterais, dentes de encaixe, ícones de equipamentos e régua de blocos `[ ■ ]`.
  - **Status**: Concluído (Aplicação de impressão gerada).

- [x] **Etapa 2: Livro de Regras Diagramado & Formal (`manual_ilustrado_febrace.html`)**
  - **Arquivo**: `C:\codigos\FEBRACE\manual_ilustrado_febrace.html`.
  - **Ação**: Criar manual formal e elegante com estética de board game comercial (capa, índice, componentes, diagramas de jogadas em SVG, player aid de mesa e perguntas frequentes).
  - **Status**: Concluído (Manual ilustrado formatado).

- [x] **Etapa 3: Pôster Científico Oficial FEBRACE (`poster_febrace.html`)**
  - **Arquivo**: `C:\codigos\FEBRACE\poster_febrace.html`.
  - **Ação**: Desenvolver o pôster científico oficial no formato regulamentar FEBRACE ($90\text{cm} \times 120\text{cm}$), dividido em 3 colunas (Introdução, Metodologia Experimento A vs B vs C, Gráficos $g$ de Hake, Conclusão e QR Code do jogo).
  - **Status**: Concluído (Pôster 90x120cm finalizado).

- [x] **Etapa 4: Apresentação de Slides / Pitch Deck Interativo FEBRACE (`apresentacao_febrace.html`)**
  - **Arquivo**: `C:\codigos\FEBRACE\apresentacao_febrace.html`.
  - **Ação**: Criar pitch deck 16:9 em HTML/CSS com suporte a navegação por setas do teclado, contendo 10 slides estratégicos com gráficos Chart.js interativos para a banca avaliadora.
  - **Status**: Concluído (Pitch deck interativo 16:9 gerado).

- [x] **Etapa 5: Guia do Professor / Avaliador e Diário de Bordo (`guia_professor_diario.md`)**
  - **Arquivo**: `C:\codigos\FEBRACE\guia_professor_diario.md`.
  - **Ação**: Redigir a guia pedagógica para o professor aplicador da escola pública e os modelos formais do Diário de Bordo para os 3 integrantes assinarem.
  - **Status**: Concluído (Guia e Diário de Bordo entregues).

---

## 4. Critérios de Aceitação (Definition of Done)
- [x] Cartas físicas renderizadas em HTML/CSS prontas para salvar como PDF A4 e imprimir.
- [x] Livro de regras formatado profissionalmente com diagramas visuais de circuito.
- [x] Pôster científico $90\times120\text{cm}$ pronto para impressão de lona/banner.
- [x] Pitch deck 16:9 interativo pronto para apresentação ao vivo.
- [x] Dossiê acadêmico completo com Guia do Professor e Diário de Bordo.
