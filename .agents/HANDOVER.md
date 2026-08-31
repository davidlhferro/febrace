# Handoff Briefing

## Environment Metadata
- **Timestamp:** 2026-08-31T00:55:00-03:00
- **Git Branch:** `master`
- **Last Commit:** `e8f4887 - refactor(portal-equipe): complete user-friendly rewrite eliminating academic pedantry, adding 1-min tutorial, visual assistant, and USP jury translator`
- **Uncommitted Changes:** `.llms/project/plans-status.md`

## Goal & Objective
Construir o **Portal VOLTZ & Central de Comando FEBRACE** em `01_Jogo_Voltz/portal_equipe/` como uma aplicação web completa (Arena P2P WebRTC para 3 amigos, Painel FEBRACE sem jargões, Diário de Bordo com exportação PDF/Markdown e Tradutor da Banca da USP), acompanhado de um SSOT canônico da transposição de Game Design do *Bandido* (Helvetiq) para a Eletrodinâmica.

## Current Status
- **Completed in this session:**
  - **Portal VOLTZ & Central FEBRACE (`01_Jogo_Voltz/portal_equipe/`):**
    - `index.html`: SPA completa com 4 abas, tutorial visual "Como Jogar em 1 Minuto", barra assistente de voltagem em tempo real, lobby com lista de jogadores e tradutor da banca.
    - `css/style.css`: Tema Dark PCB refinado, tipografia acolhedora (Inter, Rubik, Fira Code), responsividade mobile e desktop.
    - `js/voltz_cards_data.js`: Catálogo das 70 cartas canônicas (1 gerador, 30 resistores, 18 cargas, 6 GNDs, 4 fusíveis, 4 nós Y, 2 chaves, 2 pontes, 3 surtos).
    - `js/voltz_engine.js`: Motor eletrodinâmico com cálculo de divisores de tensão ($V = V_{in} \cdot \frac{R_{load}}{R_{total}}$), detecção de sobretensão/subtensão/nominal, desarme de fusível e regras de turno estilo Bandido (mão de 3 cartas, descarte para o fundo do monte).
    - `js/voltz_p2p.js`: Gerenciador de salas P2P WebRTC via PeerJS com códigos de 4 letras e sincronização em tempo real.
    - `js/voltz_warroom.js`: Cards explicativos em linguagem humana dos 5 documentos obrigatórios da USP (o que é, por que pede, como fazer) e cálculo dinâmico de prontidão (0-100%).
    - `js/voltz_diario.js`: Formulário interativo de playtests com exportação oficial em 1 clique para Markdown (`.md`) e HTML Imprimível/PDF.
    - `js/voltz_banca.js`: Tradutor descomplicado do "juradês acadêmico" para o português do dia a dia e respostas na ponta da língua.
    - `js/app.js`: Controlador mestre conectando UI, PeerJS, assistente em tempo real e renderizadores.
    - `tests/test_portal_engine.js`: Suíte de 22 testes automatizados cobrindo física, regras de turno, diagnósticos e condições de vitória (100% PASS).
    - `README_DEPLOY.md`: Guia de deploy em 1 clique para Vercel e GitHub Pages.
  - **Documento Canônico SSOT (`.llms/project/mecanica-bandido-e-voltz-ssot.md`):**
    - Dissecação completa da mecânica de *Bandido* e matriz de transposição 1-para-1 para o VOLTZ, com cláusula pétrea anti-regressão.
  - **Servidor Web Local Ativo:**
    - Rodando na porta `3333` (sem conflitos com a porta 8000/8080).
- **In-Progress:**
  - N/A (todas as metas da sessão foram finalizadas com testes e commits).
- **Blockers / Known Issues:**
  - Nenhum.

## Decisions Made (Locked)
- **Eliminação Total de Pedantismo Acadêmico na UI:** O portal fala a língua dos estudantes do Ensino Médio, trazendo analogias diretas e o "Tradutor da Banca" em vez de siglas secas sem contexto.
- **Porta 3333 para o Servidor Local:** Para evitar colisão com instâncias existentes rodando na porta 8000/8080.
- **Suporte Nativo a Partidas de 3 Jogadores:** Lobby adaptado para 3 integrantes com botão de teste imediato na mesma tela (`btn-solo-3p`).

## Failed Approaches & Anti-Patterns (Do Not Retry)
- **Não usar portas ocupadas (8000/8080):** O projeto do Atlas/outras ferramentas roda nessas portas; sempre usar `3333` ou `5173`.
- **Não exibir To-Do Lists vazias de explicação:** Na FEBRACE, os estudantes precisam saber o propósito de cada documento para defender o projeto com autenticidade.

## Extracted User Preferences & Project Learnings
- O usuário e a equipe são **3 estudantes do Ensino Médio** que querem testar o jogo na prática juntos. O fluxo de criação de salas e entrada por código de 4 letras deve ser simples, sem burocracia técnica.

## Attention Routing (Key Pointers)
- **Active Plan File:** `.llms/project/plans-status.md`
- **SSOT de Game Design:** `.llms/project/mecanica-bandido-e-voltz-ssot.md`
- **Aplicação Web Principal:** `01_Jogo_Voltz/portal_equipe/index.html` (rodando em `http://localhost:3333`)
- **Suíte de Testes:** `01_Jogo_Voltz/portal_equipe/tests/test_portal_engine.js`

## Immediate Next Step
- Abrir [http://localhost:3333](http://localhost:3333) e realizar os primeiros playtests reais em 3 jogadores com a equipe, anotando as partidas no Diário de Bordo integrado.
