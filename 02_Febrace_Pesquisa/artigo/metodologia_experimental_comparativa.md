# 🔬 Protocolo Experimental & Metodologia Científica — FEBRACE 2026

**Projeto**: Remediação Ativa de Concepções Alternativas em Eletrodinâmica: Estudo Quase-Experimental com Modelagem Topológica Cooperativa no Ensino Médio Público  
**Área do Conhecimento**: Ciências Exatas e da Terra / Ensino de Física (Physics Education Research - PER)  
**Equipe**: David, João Vitor e Parceiro 3  
**Instituição**: Escola Estadual de Ensino Médio da Rede Pública Estadual  
**Foco**: **100% Teórico e Conceitual para Questões de Vestibulares (ENEM, FUVEST, UNICAMP)**  

---

## 1. FUNDAMENTAÇÃO EPISTEMOLÓGICA & ESTADO DA ARTE (PER)

### 1.1. O Diagnóstico das Concepções Alternativas em Circuitos DC
A literatura internacional em *Physics Education Research* (PER) (McDermott & Shaffer, 1992; Engelhardt & Beichner, 2004) estabelece que estudantes do Ensino Médio mantêm concepções intuitivas pré-newtonianas sobre eletrodinâmica que resistem à instrução formal tradicional baseada em resolução mecânica de fórmulas ($V = R \cdot I$).

Mapeiam-se três modelos mentais incorretos predominantes:
1. **Modelo de Atenuação Sequencial (*Current Consumption Model*)**: O estudante assume que a corrente elétrica é consumida progressivamente ao atravessar cada componente. Consequentemente, acredita-se que o primeiro resistor opera sob maior corrente do que os resistores subsequentes.
2. **Confusão Ontológica entre Diferença de Potencial ($V$) e Corrente ($I$)**: Incapacidade de conceber a corrente como taxa de fluxo de carga dependente da resistência equivalente global da malha e a tensão como trabalho por unidade de carga entre dois nós.
3. **Ausência de Raciocínio Topológico Global (*Local/Sequential Reasoning*)**: O estudante analisa componentes como entidades isoladas, ignorando que qualquer alteração em um ramo de um circuito fechado reconfigura instantaneamente o estado estacionário de todos os nós (1ª e 2ª Leis de Kirchhoff).

```
                        [ MODELO MENTAL ERRÔNEO ]
                 (Modelo de Atenuação Sequencial Ingênuo)
         ┌────────────┐   Muita Corrente   ┌────────────┐   Pouca Corrente   ┌────────────┐
 12V (+) │  Bateria   │ ─────────────────> │ Resistor 1 │ ─────────────────> │ Resistor 2 │ ──> GND (0V)
         └────────────┘                    └────────────┘ (Consome 80%)      └────────────┘ (Recebe sobra)
                                                 │
                                                 ▼ (CONFLITO COGNITIVO COM O VOLTZ)
                        [ MODELO CIENTÍFICO REAL ]
                 (Conservação de Carga & Divisão de Potencial)
         ┌────────────┐     Corrente I     ┌────────────┐     Corrente I     ┌────────────┐
 12V (+) │  Bateria   │ ─────────────────> │ Resistor 1 │ ─────────────────> │ Resistor 2 │ ──> GND (0V)
         └────────────┘   (I é constante)  └────────────┘   (I é constante)  └────────────┘
                         V1 = 12V * (R1/Rtot)             V2 = 12V * (R2/Rtot)
```

---

## 2. O QUE É O GANHO DE HAKE ($g$) E POR QUE ELE IMPORTA?

### 2.1. A Ideia Central (Em Português Claro)
O **Ganho Normalizado de Hake ($g$)** mede o quanto a turma aprendeu daquilo que ela **NÃO sabia no início** (no Pré-teste).

$$\langle g \rangle = \frac{\% \text{Pós} - \% \text{Pré}}{100\% - \% \text{Pré}}$$

* **Exemplo Prático**: Se a turma acertava $20\%$ no Pré-teste e passou para $60\%$ no Pós-teste, ela aprendeu metade de tudo o que restava aprender ($g = 0{,}500$).

### 2.2. As 3 Faixas Oficiais da Literatura Científica (Richard Hake, 1998)
Com base no estudo canônico de Richard Hake (1998, *American Journal of Physics*, $N > 6.000$ estudantes):
* 🔴 **$g < 0{,}30$ (Baixo Ganho)**: Típico de aulas expositivas convencionais de lousa (média histórica de 0,15 a 0,23).
* 🟡 **$0{,}30 \le g \le 0{,}70$ (Ganho Médio)**: **Padrão de Sucesso Comprovado** para metodologias ativas e jogos. Se o VOLTZ atingir $g \ge 0{,}35$, a banca da USP já reconhece a intervenção como altamente eficaz!
* 🟢 **$g > 0{,}70$ (Alto Ganho)**: Nível de excelência pedagógica máxima.

---

## 3. DELINEAMENTO EXPERIMENTAL COMPARATIVO (3 BRAÇOS)

```
                                  [ AMOSTRA TOTAL: N = 75 ]
                            (Estudantes do 3º Ano do Ensino Médio)
                                            │
                          [ PRÉ-TESTE DIAGNÓSTICO T0 (DIRECT) ]
                          (Estratificação por Níveis de Desempenho)
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          ▼                                 ▼                                 ▼
    [ BRAÇO 1: COMPETITIVO ]         [ BRAÇO 2: VOLTZ COOPERATIVO ]   [ BRAÇO 3: CONTROLE ATIVO ]
    Jogo de Regras / Fórmulas        Deckbuilder Cooperativo 2D       Aula Expositiva Tradicional
    (Disputa de Recursos)            (Modelagem Topológica & GND)     (Lousa + Exercícios Vestibular)
          (n = 25)                          (n = 25)                          (n = 25)
          │                                 │                                 │
          └─────────────────────────────────┼─────────────────────────────────┘
                                            ▼
                           [ PÓS-TESTE ISOMÓRFICO IMEDIATO T1 ]
                                            │
                           [ O PORTFÓLIO DOS 4 ESTUDOS PER ]
```

---

## 4. O PORTFÓLIO DOS 4 ESTUDOS DA PESQUISA (FOCO EM VESTIBULARES)

1. **Estudo 1 — Salto Conceitual Imediato em Questões de Vestibular (Pré vs. Pós-Teste)** ($N=75$):
   - Mede o ganho em 10 questões conceituais clássicas do ENEM/FUVEST (curto-circuito, lâmpadas que brilham mais ou menos e divisão de corrente).
2. **Estudo 2 — Retenção de Longo Prazo (Memória para a Prova)** ($N=50$, 14 dias após):
   - Aplicação de teste 14 dias após o jogo para provar que a lógica do VOLTZ fixa a teoria na memória permanente, em contraste com a decoreba de fórmulas que é esquecida na semana seguinte.
3. **Estudo 3 — Resgate dos Alunos com Maior Defasagem (Inclusão)** ($N=75$, Estratificação Basal):
   - Compara o ganho $g$ entre os alunos com notas baixas ($<40\%$) e altas ($>70\%$), provando que o jogo cooperativo resgata os estudantes com maior dificuldade em física.
4. **Estudo 4 — Comparativo de Eficácia dos Jogos da Equipe**:
   - Compara o VOLTZ com o Jogo do Braço 1 e o método tradicional para identificar qual mecânica lúdica gera o maior ganho de aprendizagem para cada perfil de estudante.

---

## 5. BANCO DE QUESTÕES CONCEITUAIS ISOMÓRFICAS (ENEM / FUVEST)

### 📝 Pré-Teste ($T_0$)
1. **Q1 (Conservação de Corrente)**: Dois resistores iguais de $4\Omega$ em série sob $12\text{V}$ $\to I_1 = I_2$ em todo o ramo.
2. **Q2 (Divisor de Tensão)**: Resistor de $3\Omega$ em série com lâmpada de $1\Omega$ sob $12\text{V} \to V_L = 3\text{V}$.
3. **Q3 (Curto-Circuito)**: Fio ideal em paralelo com lâmpada $\to$ lâmpada apaga.
4. **Q4 (Cabo Terra / GND 0V)**: Função do terra como potencial de referência e fechamento de malha.
5. **Q5 (Lâmpadas em Paralelo)**: Remoção de 1 lâmpada em paralelo $\to$ brilho da outra não se altera.
6. **Q6 (Resistência Equivalente Série)**: Adição de resistor em série reduz a corrente total da malha.
7. **Q7 (1ª Lei de Kirchhoff)**: Nó com entrada de 3A e saída de 1A $\to$ segundo ramo drena 2A.
8. **Q8 (Circuito Aberto)**: Tensão de 12V nos terminais de um interruptor aberto.
9. **Q9 (Efeito Joule)**: Maior dissipação térmica no resistor de maior valor em ramo série ($P = R \cdot I^2$).
10. **Q10 (Brilho Relativo)**: Comparação de brilho em circuito misto com lâmpadas idênticas.

### 📝 Pós-Teste Isomórfico ($T_1$)
1. **Q1 (Isomórfica 1)**: Três resistores diferentes em série sob $20\text{V} \to I_A = I_B = I_C$.
2. **Q2 (Isomórfica 2)**: Dois resistores iguais de $2\Omega$ em série sob $12\text{V} \to V_2 = 6\text{V}$.
3. **Q3 (Isomórfica 3)**: Chave fechada em paralelo com resistor $\to$ tensão cai para 0V.
4. **Q4 (Isomórfica 4)**: LED com 12V em ambos os polos $\to$ falta conexão ao Cabo Terra (0V).
5. **Q5 (Isomórfica 5)**: Inserção de quarta lâmpada em paralelo $\to$ brilho original mantido.
6. **Q6 (Isomórfica 6)**: Redução de resistência de reostato aumenta tensão sobre motor em série.
7. **Q7 (Isomórfica 7)**: Nó Y com entradas 1.5A e 2.5A $\to$ saída de 4.0A.
8. **Q8 (Isomórfica 8)**: Rompimento de condutor zera a corrente em toda a malha.
9. **Q9 (Isomórfica 9)**: Cálculo de resistor externo de proteção para carga sensível de 4V.
10. **Q10 (Isomórfica 10)**: Alteração de resistor de malha provocando sobretensão teórica sobre carga.

---

## 6. MODELO ESTATÍSTICO DE ANÁLISE

1. **Ganho de Hake Individual**: $g_i = \frac{\%T_{1, i} - \%T_{0, i}}{100\% - \%T_{0, i}}$
2. **Tamanho de Efeito Não-Viesado (Hedges' $g$)**: $g_{\text{Hedges}} = d_{\text{Cohen}} \times \left( 1 - \frac{3}{4(n_1 + n_2) - 9} \right)$
3. **ANCOVA com $T_0$ como Covariável**: $T_{1, ij} = \mu + \tau_i + \beta (T_{0, ij} - \bar{T}_0) + \epsilon_{ij}$
4. **Testes de Permutação Exata (10.000 iterações)**: Verificação empírica de significância ($p < 0{,}00001$).

---

## 7. MATRIZ DE HIPÓTESES FORMAIS

* **$H_0$ (Hipótese Nula)**: Não há diferença significativa no Ganho Normalizado de Hake ($\langle g \rangle$) entre o grupo VOLTZ, o jogo competitivo e a aula tradicional ($p \ge 0{,}05$).
* **$H_1$ (Hipótese Principal - Eficácia Teórica)**: Estudantes submetidos ao VOLTZ alcançarão ganho de Hake significativamente superior ($\langle g \rangle \ge 0{,}65$; $p < 0{,}001$) com tamanho de efeito elevado ($g_{\text{Hedges}} > 1{,}00$) na resolução de questões conceituais do ENEM e FUVEST.
* **$H_2$ (Hipótese de Retenção a Longo Prazo)**: Estudantes do grupo VOLTZ manterão $\ge 85\%$ do ganho após 14 dias sem decaimento para a média basal, provando a consolidação na memória permanente.
* **$H_3$ (Hipótese de Inclusão e Resgate)**: O ganho de Hake será estatisticamente superior no estrato com maior defasagem inicial ($<40\%$), comprovando a eficácia inclusiva da modelagem cooperativa.
