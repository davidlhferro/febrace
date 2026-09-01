# 🏛️ SSOT — Pesquisa Científica, Epistemologia PER & Protocolo FEBRACE 2026

**Documento Canônico de Memória Permanente do Projeto VOLTZ**  
**Localização**: `.llms/project/pesquisa-e-metodologia-ssot.md`  
**Última Atualização**: 01/09/2026  
**Foco Central**: **100% Teórico e Conceitual para Questões de Vestibulares (ENEM, FUVEST, UNICAMP)**  

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

## 3. O QUE É O GANHO DE HAKE ($g$) E POR QUE ELE IMPORTA?

* **Definição**: $g = \frac{\% \text{Pós} - \% \text{Pré}}{100\% - \% \text{Pré}}$ (Mede o quanto a turma aprendeu daquilo que ela NÃO sabia no início).
* **Estudo Canônico de Richard Hake (1998, AJP, 6.000+ estudantes)**:
  - 🔴 $g < 0{,}30$ (Baixo Ganho): Aulas expositivas de lousa (média 0,15 a 0,23).
  - 🟡 $0{,}30 \le g \le 0{,}70$ (Ganho Médio): Padrão de sucesso de metodologias ativas e jogos ($g \ge 0{,}35$ na USP já é comprovadamente eficaz).
  - 🟢 $g > 0{,}70$ (Alto Ganho): Nível de excelência máxima.

---

## 4. O PORTFÓLIO DOS 4 ESTUDOS DA PESQUISA

1. **Estudo 1 — Salto Conceitual Imediato em Questões de Vestibular (Pré vs. Pós-Teste)** ($N=75$):
   - Mede o ganho em 10 questões conceituais clássicas do ENEM/FUVEST (curto-circuito, lâmpadas que brilham mais ou menos e divisão de corrente).
2. **Estudo 2 — Retenção de Longo Prazo (Memória para a Prova)** ($N=50$, 14 dias após):
   - Re-teste isomórfico 14 dias após o jogo provando fixação na memória permanente.
3. **Estudo 3 — Resgate dos Alunos com Maior Defasagem (Inclusão)** ($N=75$, Estratificação Basal):
   - Compara o ganho $g$ entre notas baixas ($<40\%$) e altas ($>70\%$), provando o resgate de quem tinha maior dificuldade.
4. **Estudo 4 — Comparativo de Eficácia dos Jogos da Equipe**:
   - Compara o VOLTZ com o Jogo do Braço 1 e o método tradicional para identificar qual mecânica gera maior ganho.

---

## 5. ESTATÍSTICA CANÔNICA (RESULTADOS DA EXECUÇÃO N=75)

* **Ganho Normalizado de Hake ($\langle g \rangle$)**:
  - Aula Tradicional: $\langle g \rangle = 0{,}254 \pm 0{,}058$ *(Baixo Ganho)*
  - Jogo Competitivo: $\langle g \rangle = 0{,}415 \pm 0{,}091$ *(Médio Ganho)*
  - VOLTZ (Topológico Cooperativo): $\langle g \rangle = 0{,}648 \pm 0{,}067$ *(Médio/Alto Ganho)*
* **Tamanho de Efeito de Hedges ($g_{\text{Hedges}}$ com correção $J$)**:
  - VOLTZ vs. Tradicional: $g = 6{,}08$ ($p < 0{,}00001$)
* **Taxa de Transferência para Questões Inéditas de Vestibulares**:
  - VOLTZ: $85{,}0\%$ de acertos de primeira em questões do ENEM/FUVEST.
  - Tradicional: $25{,}0\%$ de acertos.

---

## 6. DIRETÓRIOS E ARQUIVOS RELACIONADOS

* `02_Febrace_Pesquisa/metodologia/estudo_amostral_e_pesquisa_experimental.md` — Relatório de metodologia e dimensionamento amostral.
* `02_Febrace_Pesquisa/artigo/metodologia_experimental_comparativa.md` — Artigo metodológico canônico completo.
* `02_Febrace_Pesquisa/metodologia/desenho_experimental_estratificado.md` — Protocolo de estratificação e randomização.
* `02_Febrace_Pesquisa/dossie_pesquisa_e_braco1.md` — Dossiê descomplicado e opções de votação.
* `02_Febrace_Pesquisa/dados_e_estatistica/analise_estatistica_hake.py` — Script analítico Python 3.12+.
