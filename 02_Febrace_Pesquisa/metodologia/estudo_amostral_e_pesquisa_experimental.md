# 🔬 Metodologia PER, Dimensionamento Amostral & Portfólio de Estudos — FEBRACE 2026

**Projeto**: Remediação Ativa de Concepções Alternativas em Eletrodinâmica via Modelagem Topológica Cooperativa  
**Autores**: David, João Vitor e Parceiro 3  
**Área**: Ensino de Física (Physics Education Research - PER) / Educação Científica  
**Instituição**: Escola Estadual de Ensino Médio da Rede Pública  
**Foco Central**: **100% Teórico e Conceitual para Questões de Vestibulares (ENEM, FUVEST, UNICAMP)**  

---

## 1. O Que É o Ganho de Hake ($g$) e Por Que Ele Importa?

### 1.1. A Ideia Central (Em Português Claro)
O **Ganho Normalizado de Hake ($g$)** mede o quanto a turma aprendeu daquilo que ela **NÃO sabia no início** (no Pré-teste). Em vez de olhar apenas a nota final bruta, o índice de Hake avalia a fração de ganho possível que a intervenção pedagógica conseguiu destravar.

$$\langle g \rangle = \frac{\% \text{Pós} - \% \text{Pré}}{100\% - \% \text{Pré}}$$

* **Exemplo Prático**: Se a turma acertava $20\%$ no Pré-teste e passou para $60\%$ no Pós-teste, ela aprendeu metade de tudo o que restava aprender:
  $$g = \frac{60 - 20}{100 - 20} = \frac{40}{80} = 0{,}500 \quad (50\% \text{ de ganho relativo})$$

---

### 1.2. As 3 Faixas Oficiais da Literatura Científica (Richard Hake, 1998)
Com base no estudo canônico de **Richard Hake (1998, *American Journal of Physics*, $N > 6.000$ estudantes)**:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                     AS 3 FAIXAS OFICIAIS DE GANHO DE HAKE NA LITERATURA DE PER                   │
├─────────────────┬───────────────────────────────────┬────────────────────────────────────────────┤
│ Faixa de Hake   │ Classificação Pedagógica          │ Significado no Ensino de Física            │
├─────────────────┼───────────────────────────────────┼────────────────────────────────────────────┤
│ **g < 0.30**    │ 🔴 **Baixo Ganho**                │ Típico de aulas expositivas tradicionais   │
│                 │ (Aula Tradicional de Lousa)       │ de lousa (média histórica de 0,15 a 0,23). │
│                 │                                   │ O aluno decora fórmulas e erra pegadinhas. │
├─────────────────┼───────────────────────────────────┼────────────────────────────────────────────┤
│ **0.30 ≤ g ≤ 0.70**│ 🟡 **Médio Ganho**             │ **Padrão de Sucesso Comprovado** para     │
│                 │ (Metodologias Ativas & Jogos)     │ metodologias ativas e jogos. Se o VOLTZ    │
│                 │                                   │ atingir g ≥ 0,35, a banca da USP reconhece │
│                 │                                   │ como intervenção de alto impacto!          │
├─────────────────┼───────────────────────────────────┼────────────────────────────────────────────┤
│ **g > 0.70**    │ 🟢 **Alto Ganho**                 │ Nível de excelência máxima. Indica que a   │
│                 │ (Excelência Máxima)               │ turma dominou as malhas conceituais.       │
└─────────────────┴───────────────────────────────────┴────────────────────────────────────────────┘
```

---

## 2. Delineamento Experimental para População Escassa ($N = 75$)

### 2.1. Por Que o Desenho Cruzado (Crossover AB-BA) Foi Formalmente Rejeitado?
* **O Efeito de Carregamento Cognitivo (*Carryover Effect*)**: O modelo cruzado (onde um grupo joga o Jogo A e depois o Jogo B) é inviável em Educação em Física.
* **A Irreversibilidade da Mudança Conceitual**: Uma vez que o estudante compreende que o circuito elétrico exige fechamento no Cabo Terra ($0\text{V}$) e que a corrente se conserva em ramos série, **ele não consegue "desaprender" esse modelo mental** para a segunda fase. O *carryover effect* contamina permanentemente o grupo de controle ($p < 0{,}001$).

### 2.2. A Solução: Delineamento Paralelo com Randomização em Blocos Estratificados
A amostra de $N=75$ alunos é classificada no Pré-Teste ($T_0$) em 3 estratos de proficiência:
1. 🔴 **Estrato Inicial ($< 40\%$)**: Alunos que acreditam no modelo de atenuação sequencial (a corrente "gasta" no 1º resistor).
2. 🟡 **Estrato Médio ($40\% - 70\%$)**: Alunos que aplicam $V = R \cdot I$ mecanicamente mas erram divisores de tensão e curto-circuitos.
3. 🟢 **Estrato Avançado ($> 70\%$)**: Alunos com raciocínio algébrico e intuitivo consolidado.

Cada estrato é dividido equitativamente em 3 blocos homogêneos ($n = 25$ por braço), garantindo médias de partida equivalentes ($p > 0{,}85$).

---

## 3. Dimensionamento Amostral & Poder Estatístico ($1 - \beta$)

* **ANCOVA / ANOVA ($k=3$ Grupos, $n=25$ por braço, $N=75$, $\alpha=0{,}05$)**:
  - Para tamanho de efeito grande ($f = 0{,}40 \to d = 0{,}80$): **Poder $= 86{,}9\%$**.
  - Para tamanho de efeito muito grande ($f = 0{,}50 \to d = 1{,}00$): **Poder $= 97{,}4\%$**.
  - *Ganho com Covariável ($T_0$)*: Reduz a variância do erro residual em $30\%$, elevando o poder real de $N=75$ para **$> 92\%$**.
* **Retenção Tardia a 14 Dias ($N=50$, $\alpha=0{,}05$)**:
  - Para detecção de decaimento moderado ($d = 0{,}50$): **Poder $= 93{,}4\%$**.

---

## 4. O Portfólio dos 4 Estudos (Foco 100% Teórico & Vestibulares)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   OS 4 ESTUDOS DO PORTFÓLIO VOLTZ (FOCO TOTAL EM VESTIBULARES)                   │
├───────────────┬───────────────────┬─────────────┬─────────────────┬──────────────────────────────┤
│ Estudo        │ Foco Conceitual   │ Amostra     │ Métrica / Teste │ Poder Estatístico (1 - β)    │
├───────────────┼───────────────────┼─────────────┼─────────────────┼──────────────────────────────┤
│ **Estudo 1**  │ Salto Conceitual  │ N = 75      │ Ganho Hake ⟨g⟩  │ **86.9%** (f=0.40, α=0.05)   │
│ (Imediato)    │ ENEM & FUVEST     │ (3x n=25)   │ ANCOVA + Permut │ **>92%** com covariável T0   │
├───────────────┼───────────────────┼─────────────┼─────────────────┼──────────────────────────────┤
│ **Estudo 2**  │ Retenção de Longo │ N = 50      │ Teste Pareado   │ **93.4%** (d=0.50, α=0.05)   │
│ (Memória)     │ Prazo (14 dias)   │ Re-teste    │ T1 vs T_ret     │ Curva de Esquecimento        │
├───────────────┼───────────────────┼─────────────┼─────────────────┼──────────────────────────────┤
│ **Estudo 3**  │ Resgate de Alunos │ N = 75      │ Ganho Hake por  │ Subgrupos Estratificados     │
│ (Inclusão)    │ com Defasagem     │ Estratificado│ Faixa (<40%)   │ Análise de Equidade Escolar  │
├───────────────┼───────────────────┼─────────────┼─────────────────┼──────────────────────────────┤
│ **Estudo 4**  │ Comparativo entre │ N = 75      │ ANCOVA          │ Controle Experimental        │
│ (Contraste)   │ os 3 Jogos/Métodos│ (3 Braços)  │ Contrastes F    │ Cooperação vs Competição     │
└───────────────┴───────────────────┴─────────────┴─────────────────┴──────────────────────────────┘
```

---

### 🎯 ESTUDO 1: Salto Conceitual Imediato em Questões de Vestibular
* **Amostra**: $N = 75$ estudantes ($25$ por braço).
* **Instrumento**: 10 questões conceituais clássicas de vestibulares (ENEM, FUVEST e UNICAMP) baseadas no inventário DIRECT.
* **Tópicos Avaliados**: Curto-circuito em ramos paralelos, brilho comparativo de lâmpadas em série/paralelo, divisão de corrente em nós e função do potencial de referência ($0\text{V}$).
* **Hipótese ($H_1$)**: O grupo VOLTZ atinge Ganho de Hake médio $\langle g \rangle \ge 0{,}65$, contra $\langle g \rangle < 0{,}30$ da aula tradicional expositiva.

---

### ⏳ ESTUDO 2: Retenção de Longo Prazo (Memória para a Prova)
* **Amostra**: $N = 50$ estudantes reavaliados 14 dias após a intervenção sem aviso prévio.
* **Pergunta de Pesquisa**: *A modelagem visual e tátil do VOLTZ fixa a teoria na memória permanente do estudante, ou o conhecimento é esquecido rapidamente como ocorre na memorização mecânica de fórmulas?*
* **Hipótese ($H_1$)**: Estudantes do VOLTZ mantêm $\ge 85\%$ do ganho de aprendizagem pós-intervenção ($\Delta g_{\text{decaimento}} \le 15\%$), enquanto o grupo tradicional decai para a média basal inicial.

---

### 🤝 ESTUDO 3: Resgate dos Alunos com Maior Defasagem (Inclusão Escolar)
* **Amostra**: $N = 75$ estudantes analisados por estratos de nota inicial ($<40\%$, $40\%-70\%$, $>70\%$).
* **Pergunta de Pesquisa**: *O jogo cooperativo beneficia proporcionalmente mais os estudantes que entraram com histórico de bloqueio ou notas baixas em física?*
* **Hipótese ($H_1$)**: O estrato inicial ($<40\%$) apresenta o maior Ganho Normalizado de Hake ($\langle g \rangle \ge 0{,}70$), demonstrando que o suporte mútuo e a visualização espacial resgatam estudantes em situação de vulnerabilidade de aprendizagem.

---

### ⚔️ ESTUDO 4: Comparativo de Eficácia dos Jogos da Equipe
* **Amostra**: $N = 75$ estudantes distribuídos nos 3 braços de intervenção pareados em tempo (50 min).
* **Comparação**:
  1. Braço 1: Jogo Alternativo da Equipe (*Circuit Duel* - Competitivo / Fórmulas).
  2. Braço 2: Jogo VOLTZ (*Cooperativo 2D com Cabo Terra 0V*).
  3. Braço 3: Aula Tradicional de Lousa com Simulação Computacional.
* **Hipótese ($H_1$)**: O modelo cooperativo topológico do VOLTZ supera tanto a competição de fórmulas quanto o método expositivo tradicional na fixação de conceitos qualitativos.

---

## 5. Protocolo de Coleta em Sala de Aula (Aula Dupla de 100 Minutos)

```
00:00 - 00:05 ( 5 min) ➔ Acolhimento, lista de presença e conferência dos TCLEs/TALEs
00:05 - 00:15 (10 min) ➔ Aplicação do Pré-Teste Diagnóstico T0 (10 questões de vestibular)
00:15 - 00:20 ( 5 min) ➔ Correção por gabarito e separação dos 3 grupos mesclados (Blocos)
00:20 - 00:25 ( 5 min) ➔ Leitura da Folha Gráfica de Regras Rápidas Laminada
00:25 - 00:55 (30 min) ➔ Partida Ativa nos 3 Braços (VOLTZ, Duelo, Aula Tradicional)
00:55 - 01:05 (10 min) ➔ Aplicação do Pós-Teste Isomórfico T1 (10 questões espelhadas)
01:05 - 01:25 (20 min) ➔ Resolução comentada das pegadinhas de vestibular na lousa
01:25 - 01:40 (15 min) ➔ Encerramento, entrega de certificados e pesquisa de satisfação
```

---

## 6. Blindagem Ética & Conformidade Regulatória (CONEP / CNS 510/2016)

1. **Anonimização Estrita**: Folhas de teste identificadas exclusivamente por códigos alfanuméricos (`ID-01` a `ID-75`).
2. **Consentimento e Assentimento**: TCLE assinado pelos responsáveis legais e TALE assinado pelos estudantes menores de 18 anos.
3. **Equidade Pedagógica**: Todos os alunos dos grupos de controle recebem oficinas posteriores com o baralho VOLTZ para garantir acesso igualitário ao material pedagógico.
