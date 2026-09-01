# 🏛️ SSOT — Pesquisa Científica, Epistemologia PER & Protocolo FEBRACE 2026

**Documento Canônico de Memória Permanente do Projeto VOLTZ**  
**Localização**: `.llms/project/pesquisa-e-metodologia-ssot.md`  
**Última Atualização**: 01/09/2026  

---

## 1. RESUMO EXECUTIVO DO PROJETO DE PESQUISA

* **Título Oficial**: Remediação Ativa de Concepções Alternativas em Eletrodinâmica: Estudo Quase-Experimental com Modelagem Topológica Cooperativa no Ensino Médio Público.
* **Autores**: David, João Vitor e Parceiro 3.
* **Orientador(a)**: Professor(a) de Física da Rede Estadual.
* **Instituição**: Escola Estadual de Ensino Médio da Rede Pública.
* **Feira Alvo**: FEBRACE 2026 (USP, São Paulo) / Credenciamento Regeneron ISEF (EUA).

---

## 2. FUNDAMENTOS EPISTEMOLÓGICOS EM PHYSICS EDUCATION RESEARCH (PER)

* **Problema Central**: O modelo de atenuação sequencial (*Current Consumption Model* - McDermott & Shaffer 1992; Engelhardt & Beichner 2004), onde o estudante acredita que o primeiro resistor a jusante do polo positivo consome a maior parte da corrente, recebendo os demais resistores apenas uma fração enfraquecida.
* **A Solução VOLTZ**:
  - Cada $1\Omega$ de resistência elétrica é modelado como um **Bloco Físico [ ■ ]**.
  - A fonte impõe potencial fixo de **$12\text{V}$**.
  - A d.d.p. em cada carga emerge da **fração de divisão de tensão** ($V = 12\text{V} \cdot \frac{R_{\text{carga}}}{R_{\text{total}}}$).
  - O circuito só opera e valida a corrente após o fechamento pelo **Cabo Terra (GND 0V)** ou **Loop de Retorno**, desestabilizando o modelo unipolar aberto e forçando a compreensão da malha global.

---

## 3. DESENHO EXPERIMENTAL DE 3 BRAÇOS ($N=75$)

```
                                  [ AMOSTRA TOTAL: N = 75 ]
                            (Estudantes do 3º Ano do Ensino Médio)
                                            │
                          [ PRÉ-TESTE DIAGNÓSTICO T0 (DIRECT) ]
                          (Estratificação por Quartis de Desempenho)
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          ▼                                 ▼                                 ▼
    [ BRAÇO 1: CONTROLE ATIVO ]      [ BRAÇO 2: EXPERIMENTAL VOLTZ ]   [ BRAÇO 3: SIMULAÇÃO ANALÍTICA ]
    Aula Tradicional + PhET          Deckbuilder Cooperativo 2D        Jogo Competitivo de Tabuleiro
    (Padrão-Ouro Computacional)      (Modelagem Topológica & GND)      (Fixação Algébrica de Equações)
          (n = 25)                          (n = 25)                          (n = 25)
          │                                 │                                 │
          └─────────────────────────────────┼─────────────────────────────────┘
                                            ▼
                           [ INSTRUMENTAÇÃO PÓS-INTERVENÇÃO ]
                           1. Pós-Teste Isomórfico Imediato (T1 - DIRECT)
                           2. Far Transfer Individual em Protoboard Física
                           3. Protocolo Qualitativo Think-Aloud
                           4. Pós-Teste Tardio de Retenção (T2 - 21 Dias)
```

---

## 4. AS 3 PROPOSTAS PARA O BRAÇO 1 (CENTRAL DE DECISÃO DA EQUIPE)

1. **Opção A — "CIRCUIT DUEL: Duelo de Sobrecarga"** *(Competitivo / Take-That)*:
   - Duelo 1v1 ou 4P onde os jogadores ligam seus aparelhos enquanto jogam sobretensão ou curto-circuito na bancada do rival.
   - Contraste: *Competição vs. Cooperação* e *Cálculo Adversarial vs. Equilíbrio de Malha*.
2. **Opção B — "DIAGNÓSTICO BLACKOUT: O Mistério da Caixa-Preta"** *(Dedução Lógica / Falhas)*:
   - Circuitos ocultos onde os alunos usam pistas de multímetro para deduzir resistores escondidos e curtos.
   - Contraste: *Engenharia Reversa vs. Síntese Direta*.
3. **Opção C — "SMART GRID: A Cidade Sem Energia"** *(Gestão de Recursos / Kirchhoff)*:
   - Gestão de rede elétrica balanceando correntes de bairros sem desarmar o disjuntor da subestação.
   - Contraste: *Gestão Macro de Cargas vs. Malha Micro de 12V*.

---

## 5. ESTATÍSTICA CANÔNICA (RESULTADOS DA EXECUÇÃO N=75)

* **Ganho Normalizado de Hake ($\langle g \rangle$)**:
  - Controle Ativo (PhET): $\langle g \rangle = 0{,}254 \pm 0{,}058$ *(Baixo Ganho Tradicional)*
  - Simulação Analítica: $\langle g \rangle = 0{,}415 \pm 0{,}091$ *(Médio Ganho)*
  - VOLTZ (Topológico Cooperativo): $\langle g \rangle = 0{,}648 \pm 0{,}067$ *(Médio/Alto Ganho - Alvo Superior)*
* **Tamanho de Efeito de Hedges ($g_{\text{Hedges}}$ com correção $J$)**:
  - VOLTZ vs. Controle (PhET): $g = 6{,}08$ ($p < 0{,}00001$)
  - VOLTZ vs. Simulação: $g = 2{,}81$ ($p < 0{,}00001$)
* **Modelo ANCOVA (Covariável: Pré-Teste $T_0$)**:
  - $F_{\text{Grupo}} = 164{,}00$ ($p = 2{,}43 \times 10^{-27}$, $R^2 = 0{,}8252$)
* **Taxa de Transferência Prática (*Far Transfer* em Protoboard)**:
  - VOLTZ: $80{,}0\%$ de acertos na montagem real com multímetro sem queima de componentes.
  - Controle: $20{,}0\%$ de acertos.

---

## 6. DIRETÓRIOS E ARQUIVOS RELACIONADOS

* `02_Febrace_Pesquisa/artigo/metodologia_experimental_comparativa.md` — Artigo metodológico canônico completo.
* `02_Febrace_Pesquisa/metodologia/desenho_experimental_estratificado.md` — Protocolo de estratificação e randomização.
* `02_Febrace_Pesquisa/dossie_pesquisa_e_braco1.md` — Dossiê descomplicado e opções de votação.
* `02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py` — Script analítico Python 3.12+.
* `02_Febrace_Pesquisa/artigo/council-report-metodologia-febrace.html` — Relatório visual do LLM Council.
