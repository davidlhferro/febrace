# 📋 Plano de Execução — Metodologia Experimental Comparativa (PER & FEBRACE 2026)

## 🎯 Objetivos
1. **Fundamentação em Physics Education Research (PER)**: Mapear o estado da arte dos inventários conceituais (DIRECT - McDermott, Shaffer, Engelhardt, Beichner) e estatística para pequenas amostras (Hake, Hedges' $g$, ANCOVA, Bootstrap/Permutação).
2. **Desenho Experimental Comparativo dos 3 Jogos**: Estruturar a randomização em blocos estratificados (Baixo, Médio, Alto desempenho no pré-teste $T_0$), grupos paralelos vs. crossover AB-BA, e pós-teste isomórfico $T_1$ com *Far Transfer*.
3. **Submissão ao LLM Council**: Executar o ciclo de 5 conselheiros + peer review anônimo + síntese do Chairman para auditar ameaças à validade interna, viés de seleção e perguntas da banca da USP.
4. **Instrumentos de Avaliação Isomórficos**: Redigir o banco canônico de 10 itens para o Pré-Teste $T_0$ e 10 itens isomórficos espelhados para o Pós-Teste $T_1$.
5. **Redação do Documento Metodológico Canônico**: Salvar em `02_Febrace_Pesquisa/artigo/metodologia_experimental_comparativa.md` no padrão ASD-STE100 / Academic Precision (Tier 2 Anti-Slop).
6. **Script Estatístico Automatizado em Python**: Desenvolver `02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py` em Python 3.12+ com tipagem estrita, dataclasses, Hake, Hedges' $g$, ANCOVA, Bootstrap e geração de gráficos científicos.

---

## 🗺️ Fases de Execução

### Fase 1: Síntese Teórica & Delineamento do Protocolo
- Revisão dos conceitos de modelo atenuativo, curto-circuito e divisão de potencial.
- Estruturação do fluxo CONSORT educacional para $N=75$ (ou desenho crossover para $N$ reduzido).
- Definição formal das variáveis independentes (Tipo de Jogo: 1, 2, 3), dependentes (Ganho de Hake $g$, Escore Pós-teste, Taxa de Far Transfer) e covariáveis (Pré-teste $T_0$).

### Fase 2: Sessão do LLM Council (Auditoria & Stress-Testing)
- Enquadramento do protocolo experimental para o Council.
- Despacho em paralelo dos 5 Conselheiros (Contrarian, First Principles, Expansionist, Outsider, Executor).
- Rodada de Peer Review cruzado anônimo (Respostas A-E).
- Síntese final do Chairman com veredito, pontos de convergência, divergências e ações imediatas.
- Geração dos relatórios `council-report-metodologia-febrace.html` e `council-transcript-metodologia-febrace.md`.

### Fase 3: Redação do Documento Canônico de Metodologia
- Criação de `02_Febrace_Pesquisa/artigo/metodologia_experimental_comparativa.md` com:
  - Epistemologia PER e modelo conceitual.
  - Matriz de variáveis e hipóteses ($H_0$, $H_1$, $H_2$).
  - Protocolo de estratificação por quartis/tercis de proficiência.
  - Procedimentos de intervenção pareados em tempo e carga cognitiva.
  - Banco de 10 questões de Pré-Teste e 10 questões Isomórficas de Pós-Teste com gabarito comentado e mapa de distratores conceituais.
  - Protocolo de Think-Aloud e gravação qualitativa.
  - Conformidade ética (TCLE, TALE, Resolução CNS 510/2016, LGPD).

### Fase 4: Desenvolvimento do Script Estatístico em Python
- Criação de `02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py` seguindo `python-patterns` (Python 3.12+, dataclasses com slots/frozen, anotações de tipo rigorosas, docstrings completas).
- Funções para cálculo de Hake individual e médio, Hedges' $g$ com correção $J$, ANCOVA via OLS/Statsmodels, IC 95% por Bootstrap BCa e Testes de Permutação.
- Exportação de tabelas formatadas e gráficos estáticos/interativos.
- Execução e validação do script.
