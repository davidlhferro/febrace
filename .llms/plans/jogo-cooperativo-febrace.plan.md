# Plan: Jogo Cooperativo de Eletrodinâmica & Projeto FEBRACE

- **ID / Slug**: `jogo-cooperativo-febrace`
- **Status**: `done`
- **Created**: 2026-08-17
- **Target Component / Scope**: `Jogo 2 (David) - Deckbuilder Cooperativo Físico & Documentação FEBRACE`

## 1. Objetivo & Contexto
- **Objetivo**: Projetar, diagramar e estruturar a pesquisa científica para o **Jogo 2 (David)**, um jogo de cartas 100% cooperativo em equipe (2 a 4 jogadores) inspirado na mecânica do *Bandido*, voltado para alunos do 3º ano do Ensino Médio de escola pública sem base prévia em Eletrodinâmica.
- **Por que importa**: Garante que o jogo seja extremamente divertido, livre de "brócolis com chocolate" (anti-padrões educacionais), e estruturado com rigor metodológico para a FEBRACE.
- **Fora do Escopo**: Versão digital mobile/web no momento (foco 100% físico imediato); alteração nas regras do Jogo 1 (João Vitor).

---

## 2. Abordagem Arquitetural & Game Design

```
                                [ PROJETO JOGO 2: VOLTZ COOP ]
                                              │
         ┌────────────────────────────────────┼────────────────────────────────────┐
         ▼                                    ▼                                    ▼
[ MECÂNICA ESTILO BANDIDO ]          [ PEDAGOGIA INTRÍNSECA ]             [ METODOLOGIA FEBRACE ]
 • Gerador Central (5 saídas)        • Ohm & Kirchhoff como regra física   • Experimento comparativo
 • Mão secreta (3 cartas)            • Valores simples (1Ω, 2Ω, 5Ω)        • Pré-teste vs. Pós-teste
 • Vitória: Aterrar/Fechar ramos     • Sem quizzes ou provas estáticas     • Métrica UEQ (Engajamento)
```

---

## 3. Tarefas Atômicas de Execução

- [x] **Etapa 1: Pesquisa de Psicopedagogia & Anti-Padrões**
  - **Ação**: Mapeamento completo dos fatores de engajamento (*Flow*, SDT, Octalysis) e catálogo de 10 anti-padrões a evitar.
  - **Status**: Concluído pelos subagentes de pesquisa.

- [x] **Etapa 2: Definição da Identidade & Mecânicas do Jogo 2**
  - **Ação**: Definição do formato 100% Cooperativo em Equipe (2-4 jogadores) estilo *Bandido*, com baralho de malha elétrica.
  - **Status**: Concluído e aprovado pelo David.

- [x] **Etapa 3: Diagramação Completa do Baralho Físico (54 Cartas)**
  - **Arquivos**: `C:\codigos\FEBRACE\baralho_cartas_jogo2.md`.
  - **Ação**: Especificar o layout visual, texto, conectores de borda e quantitativo exato de cada carta do baralho para recortar.
  - **Status**: Concluído (Arquivo gerado com as 54 cartas detalhadas em formato A4 cortável).

- [x] **Etapa 4: Redação do Manual de Regras Ilustrado**
  - **Arquivos**: `C:\codigos\FEBRACE\manual_jogo2_cooperativo.md`.
  - **Ação**: Escrever o manual oficial de instruções com linguagem jovem, clara e diagramas das mecânicas.
  - **Status**: Concluído (Manual oficial concluído).

- [x] **Etapa 5: Estruturação do Artigo Científico e Protocolo Experimental FEBRACE**
  - **Arquivos**: `C:\codigos\FEBRACE\projeto_febrace_artigo.md`.
  - **Ação**: Escrever o Plano de Pesquisa da FEBRACE com Pergunta de Pesquisa, Hipóteses, Grupo Controle vs. Experimental, formulários de Pré-teste/Pós-teste e Diário de Bordo.
  - **Status**: Concluído (Documento científico de pesquisa e formulários prontos).

---

## 4. Critérios de Aceitação (Definition of Done)
- [x] Baralho físico de 54 cartas 100% pronto para impressão (folhas A4 cortáveis).
- [x] Manual de regras em formato limpo, direto e sem pontas soltas.
- [x] Projeto científico FEBRACE estruturado para a equipe de 3 integrantes.
- [x] Pastas `.llms/` atualizadas com todo o histórico e planejamento persistido.
