# Handoff Briefing (FEBRACE - VOLTZ)

## Environment Metadata
- **Timestamp:** 2026-08-31T00:55:50-03:00
- **Git Branch:** `master`
- **Last Commit:** `e8f4887 - refactor(portal-equipe): complete user-friendly rewrite eliminating academic pedantry, adding 1-min tutorial, visual assistant, and USP jury translator`
- **Uncommitted Changes:** None (Working tree clean)

## Goal & Objective
Desenvolver e finalizar o jogo *VOLTZ: Circuit Break*, incluindo a produção física das cartas em PDF vetorial 300 DPI, o motor de regras, a transposição canônica do jogo *Bandido*, o balanceamento por Monte Carlo e a aplicação web multiplayer/war room para a equipe.

## Current Status
- **Concluído nesta sessão:**
  - Redesign vetorial completo anti-slop das 54 cartas em `01_Jogo_Voltz/cartas/cartas_print_visual.html` e `verso_cartas_a4.html`.
  - Compilação dos PDFs de alta resolução em `01_Jogo_Voltz/dist_print_and_play/`:
    - `VOLTZ_Baralho_54_Cartas_PrintAndPlay.pdf` (3.95 MB).
    - `VOLTZ_Verso_Oficial_A4.pdf` (614 KB).
    - `VOLTZ_Print_and_Play_Completo.zip` (1.7 MB).
  - Testes do motor (`test_engine.js`) executados e aprovados com 100% de sucesso.
  - Formulação de prompts avançados para Simulação Monte Carlo (72 cartas / 8 folhas A4 com curvas integradas a resistores e cargas) e Portal Web P2P desmistificado para a equipe.

## Decisions Made (Locked)
- **Zero AI-Slop:** Fundo Dark PCB FR-4 com malha ortogonal, barramento de cobre ENIG de 10mm maciço para alinhamento contínuo na mesa e arte de patente técnica.
- **Topologia de Curvas:** Curvas devem conter resistores/cargas ativos (nunca cartas de arame vazio).
- **Portal sem Servidor:** Usar WebRTC / PeerJS para multiplayer gratuito sem necessidade de banco de dados ou login complexo.

## Attention Routing (Key Pointers)
- `C:\codigos\FEBRACE\01_Jogo_Voltz\cartas\cartas_print_visual.html`
- `C:\codigos\FEBRACE\01_Jogo_Voltz\dist_print_and_play\VOLTZ_Baralho_54_Cartas_PrintAndPlay.pdf`
- `C:\codigos\FEBRACE\01_Jogo_Voltz\portal_equipe/`

## Immediate Next Step
- Construir a aplicação web do Portal da Equipe em `01_Jogo_Voltz/portal_equipe/` com os 4 módulos desmistificados e suporte multiplayer P2P.
