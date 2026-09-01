# Handoff Briefing

## Environment Metadata
- **Timestamp:** 2026-09-01T04:36:00-03:00
- **Git Branch:** `master`
- **Last Commit:** `d30c67d - feat(portal): integrate Arm 1 voting, interactive Hake calculator, DIRECT viewer, and 5-min pitch script`
- **Uncommitted Changes:** None (Clean working tree)

## Goal & Objective
Consolidate the Physics Education Research (PER) experimental methodology, isomorphic DIRECT concept tests, and Python statistical analysis pipeline for FEBRACE 2026 / Regeneron ISEF, integrating the 3 Arm 1 game proposals and interactive research tools into the team's web portal.

## Current Status
- **Completed in this session:**
  - **LLM Council Session & Audit:** Convened 5 independent advisors (Contrarian, First Principles, Expansionist, Outsider, Executor) and 5 peer reviewers. Generated visual report [`council-report-metodologia-febrace.html`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/artigo/council-report-metodologia-febrace.html) and full transcript [`council-transcript-metodologia-febrace.md`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/artigo/council-transcript-metodologia-febrace.md).
  - **Canonical PER Experimental Methodology:** Created [`02_Febrace_Pesquisa/artigo/metodologia_experimental_comparativa.md`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/artigo/metodologia_experimental_comparativa.md) and [`02_Febrace_Pesquisa/metodologia/desenho_experimental_estratificado.md`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/metodologia/desenho_experimental_estratificado.md) with 3-arm design, CONSORT flow, and 10 Pre/Post isomorphic items.
  - **Accessible Research Dossier & Arm 1 Proposals:** Created [`02_Febrace_Pesquisa/dossie_pesquisa_e_braco1.md`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/dossie_pesquisa_e_braco1.md) detailing the 3 contrasting game candidates (*Circuit Duel*, *Diagnóstico Blackout*, *Smart Grid*) in humanized Portuguese.
  - **Python Statistical Engine (3.12+):** Developed and ran [`02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py) using pure NumPy/SciPy OLS ANCOVA, Hedges' $g$ ($J$ correction), 10k permutation tests, and interactive Plotly HTML charts.
  - **Portal Visual & Interactive Integration:** Updated [`01_Jogo_Voltz/portal_equipe/`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/portal_equipe/) and synced with [`01_Jogo_Voltz/web_multiplayer/`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/web_multiplayer/) with live Arm 1 voting buttons, Hake gain calculator, DIRECT viewer, and 5-min pitch script.
  - **Automated Test Suite:** `01_Jogo_Voltz/portal_equipe/tests/test_game_and_portal.js` executing with **25/25 tests passing (100%)**.
  - **Local Web Server:** Running on port `8080` (accessible at `http://localhost:8080/`).
- **In-Progress:**
  - Team voting on the Arm 1 game proposal (Circuit Duel vs Diagnóstico Blackout vs Smart Grid).
- **Blockers / Known Issues:**
  - None.

## Decisions Made (Locked)
- **Rejection of Crossover Design (AB-BA):** Crossover was formally discarded because conceptual change in physics is irreversible (*irreversible carryover effect*); once a student grasps closed loops/GND, they cannot unlearn it for the second arm.
- **3-Arm Parallel Evaluation:** Arm 1 (Alternative Game), Arm 2 (VOLTZ Cooperative 2D), and Active Control (PhET + Traditional Lecture) with balanced block randomization.
- **Port Selection:** Local server runs on port `8080` because port `8000` is reserved for Atlas.
- **Pure NumPy/SciPy ANCOVA:** Replaced statsmodels with native least-squares OLS in SciPy to eliminate external dependency failures.

## Failed Approaches & Anti-Patterns (Do Not Retry)
- **Do NOT use `statsmodels` in scripts:** `statsmodels` is not installed in the global Python environment. Always use `scipy.stats` and `numpy.linalg.lstsq`.
- **Do NOT use Crossover (AB-BA) for cognitive learning interventions:** Violates temporal independence due to persistent conceptual gains.
- **Do NOT pass `ArtifactMetadata` when writing to repository paths:** `ArtifactMetadata` is strictly reserved for the AppData artifact directory.

## Extracted User Preferences & Project Learnings
- The user prefers clear, anti-slop, welcoming Portuguese explanations over academic jargon.
- All portal files in `portal_equipe/` must remain synchronized with `web_multiplayer/`.

## Attention Routing (Key Pointers)
- **Active Plan File:** [`.llms/plans/plano-metodologia-experimental-e-protocolo-3jogos.md`](file:///C:/codigos/FEBRACE/.llms/plans/plano-metodologia-experimental-e-protocolo-3jogos.md)
- **Permanent SSOT:** [`.llms/project/pesquisa-e-metodologia-ssot.md`](file:///C:/codigos/FEBRACE/.llms/project/pesquisa-e-metodologia-ssot.md)
- **Primary Code Files:**
  - [`01_Jogo_Voltz/portal_equipe/js/voltz_pesquisa.js`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/portal_equipe/js/voltz_pesquisa.js)
  - [`01_Jogo_Voltz/portal_equipe/js/voltz_warroom.js`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/portal_equipe/js/voltz_warroom.js)
  - [`01_Jogo_Voltz/portal_equipe/js/app.js`](file:///C:/codigos/FEBRACE/01_Jogo_Voltz/portal_equipe/js/app.js)
  - [`02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py`](file:///C:/codigos/FEBRACE/02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py)

## Immediate Next Step
- Open [`http://localhost:8080/`](http://localhost:8080/), navigate to Tab 2 (*Central da Pesquisa*), review the team votes on Arm 1 proposals (*Circuit Duel* vs *Diagnóstico Blackout* vs *Smart Grid*), and begin production/print-and-play card layout for the chosen Arm 1 game.
