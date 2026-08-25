# Plan: Aplicação dos Ajustes Críticos do LLM Council

- **ID / Slug**: `ajustes-llm-council`
- **Status**: `in-progress`
- **Created**: 2026-08-25
- **Target Component / Scope**: `Cartas, Manual, PDF de Regulamento e Dossiê do Jogo 2 (David)`

## 1. Objetivo & Contexto
- **Objetivo**: Implementar as 4 correções estratégicas exigidas pelo veredito do **LLM Council** para eliminar fragilidades perante a banca da FEBRACE e melhorar a ergonomia em sala de aula.
- **Mudanças Principais**:
  1. Remoção da "Meta 🎯 = 4 Blocos" impressa na carta do equipamento (forçando a dedução da voltagem sem trapaça de adição primária).
  2. Ajuste do custo da Carta Terra (GND) para consumir 1 ação (prevenindo brute-force em subtensão).
  3. Adição da ação de Descarte Ativo para evitar travamento de mão (*deadlock*).
  4. Substituição de jargões pedantes por nomes amigáveis (*"Energia Necessária"*, *"Resistência Base"*, *"Cabo Terra"*).
  5. Atualização e recompilação do PDF formal (`Regulamento_Oficial_Voltz_FEBRACE.pdf`).

---

## 2. Tarefas Atômicas de Execução

- [ ] **Etapa 1: Atualizar Especificação do Baralho (`baralho_cartas_jogo2.md`)**
  - Remover metas prontas pré-calculadas das 13 cartas de equipamentos.
  - Substituir jargões por termos amigáveis com notação formal em parênteses.

- [ ] **Etapa 2: Atualizar Aplicação Visual das Cartas (`cartas_print_visual.html`)**
  - Atualizar o layout das cartas físicas A4 sem o target pré-calculado.

- [ ] **Etapa 3: Atualizar Manual e Guia de Mesa (`manual_jogo2_cooperativo.md` e `manual_ilustrado_febrace.html`)**
  - Incluir regra de descarte ativo e custo de ação no Terra (GND).
  - Manter a Tabela de Metas apenas no Player Aid de Mesa.

- [ ] **Etapa 4: Recompilar o PDF do Regulamento Oficial (`gerar_pdf_regulamento.py`)**
  - Atualizar o script python com os novos textos e executar a geração do PDF `Regulamento_Oficial_Voltz_FEBRACE.pdf`.

- [ ] **Etapa 5: Atualizar Dossiê e Status (`.llms/`)**
  - Registrar a conclusão das alterações nos arquivos de acompanhamento.

---

## 3. Critérios de Aceitação (Definition of Done)
- [ ] Cartas de equipamento sem meta estampada direta.
- [ ] Regras de descarte ativo e custo de ação do GND documentadas no manual e PDF.
- [ ] Arquivo PDF `Regulamento_Oficial_Voltz_FEBRACE.pdf` recompilado e validado.
