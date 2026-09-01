# Plan: Portfólio de Estudos Experimentais & Dimensionamento Amostral PER

- **ID / Slug**: `estudo-amostral-e-pesquisa-experimental`
- **Status**: `in-progress`
- **Created**: 2026-09-01
- **Target Component / Scope**: `02_Febrace_Pesquisa/metodologia/`, `02_Febrace_Pesquisa/artigo/`, `01_Jogo_Voltz/portal_equipe/`

## 1. Goal & Context
- **Goal**: Definir, dimensionar e validar estatisticamente o portfólio completo de 4 estudos experimentais da equipe VOLTZ para a FEBRACE 2026 / ISEF, considerando a restrição de contingente escasso de alunos ($N = 75$).
- **Why it matters**: Transforma a limitação de contingente em um diferencial metodológico de alto impacto, combinando ganho conceitual (Hake), transferência prática para bancada (*Far Transfer* em protoboard), microanálise cognitiva (*Think-Aloud*) e retenção a longo prazo (follow-up de 28 dias), com poder estatístico $1 - \beta \ge 86.9\%$.
- **Non-Goals**: Delineamento Crossover AB-BA (rejeitado por *carryover effect* irreversível).

## 2. Architectural Approach & MVP Choice
- **Recommended Approach**: Delineamento Quase-Experimental Paralelo com Randomização em Blocos Estratificados ($N=75$, 3x $n=25$) + 3 Sub-estudos aninhados (*Nested Designs*: Far Transfer $N=30$, Think-Aloud $N=6$, Retenção Tardia $N=50$).
- **MVP Version**: Aplicação concentrada em aula dupla de 100 minutos na escola estadual com Pré-Teste, Partida Ativa e Pós-Teste + Bancada com Multímetro.

## 3. Atomic Implementation Tasks

- [x] **Step 1: Pesquisa de Desenhos Experimentais em PER & Rejeição de Crossover**
  - **Files**: `02_Febrace_Pesquisa/metodologia/estudo_amostral_e_pesquisa_experimental.md`
  - **Action**: Analisar literatura PER e justificar formalmente a rejeição do Crossover devido à irreversibilidade da mudança conceitual.
  - **Verification**: Documentação canônica salva e revisada.

- [x] **Step 2: Análise Formal de Poder Estatístico ($1 - \beta$) e Curvas Amostrais**
  - **Files**: `02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py`
  - **Action**: Calcular poder da ANCOVA ($F$-test, $\lambda = 12.00$, $1-\beta = 86.9\%$), teste de duas proporções ($1-\beta = 81.7\%$) e teste pareado de retenção ($1-\beta = 93.4\%$).
  - **Verification**: Execução de script Python validando os valores numéricos.

- [x] **Step 3: Definição do Portfólio dos 4 Estudos Interconectados**
  - **Files**: `02_Febrace_Pesquisa/metodologia/estudo_amostral_e_pesquisa_experimental.md`
  - **Action**: Estruturar Estudo 1 (Conceitual DIRECT), Estudo 2 (Far Transfer Protoboard), Estudo 3 (Think-Aloud Ericsson & Simon) e Estudo 4 (Retenção Tardia a 28 dias).
  - **Verification**: Seções 2, 3 e 4 completas com hipóteses $H_0/H_1$ e métricas.

- [ ] **Step 4: Integração do Portfólio de 4 Estudos no Portal Web da Equipe**
  - **Files**: `01_Jogo_Voltz/portal_equipe/js/voltz_pesquisa.js`, `01_Jogo_Voltz/portal_equipe/index.html`
  - **Action**: Adicionar visualizador dos 4 estudos na Aba 2 do portal da equipe.
  - **Verification**: Testes automatizados executando com 100% de sucesso.

## 4. Acceptance Criteria & Definition of Done (DoD)
- [x] Relatório completo em `02_Febrace_Pesquisa/metodologia/estudo_amostral_e_pesquisa_experimental.md`.
- [x] Cálculo numérico de poder estatístico para todos os testes ($1 - \beta \ge 80\%$).
- [x] Cronograma operacional minuto a minuto para a aula dupla de 100 minutos.
- [x] Blindagem ética (TCLE/TALE e Resolução CNS 510/2016).

## 5. Risks & Mitigation
- **Risk**: Falta de alunos no dia da aplicação (absenteísmo escolar).
- **Mitigation**: A análise de poder prova que mesmo com $N=60$ ($n=20$ por grupo), o poder da ANCOVA com covariável basal permanece acima de $80\%$.
