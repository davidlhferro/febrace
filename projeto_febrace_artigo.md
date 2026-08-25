# 🔬 Projeto de Pesquisa Científica — FEBRACE
**Título do Projeto**: Estudo Comparativo do Impacto de Jogos Educativos com Abordagens Distintas na Aprendizagem e Engajamento em Eletrodinâmica no Ensino Médio

- **Área Temática**: Ciências Sociais Aplicadas / Ciências Humanas (Educação) OU Ciências Exatas e da Terra (Ensino de Ciências / Computação).
- **Equipe de Estudantes**: 3 Integrantes (David, João Vitor, Parceiro 3).
- **Instituição Target**: Escolas Públicas do Ensino Médio (Estudantes do 3º Ano).

---

## 📌 1. RESUMO EXECUTIVO
O ensino de Eletrodinâmica no Ensino Médio tradicionalmente enfrenta altos índices de rejeição e ansiedade cognitiva por conta do excesso de fórmulas abstratas ($V=I \cdot R$, Leis de Kirchhoff) desvinculadas de intuição prática. Este projeto investiga como três abordagens distintas de game design (*Jogo 1: Simulação Estratégica Coopetitiva*, *Jogo 2: Deckbuilder Físico Cooperativo de Conexão Espacial*, e *Jogo 3: Arcade / Velocidade de Resposta*) afetam o ganho relativo de aprendizagem ($g$ de Hake), a redução da ansiedade e o nível de engajamento (*UEQ - User Experience Questionnaire*) em estudantes do 3º ano do Ensino Médio de escola pública sem base prévia no assunto.

---

## ❓ 2. PROBLEMA DE PESQUISA & HIPÓTESES

### Problema de Pesquisa:
> *"Em que medida a abordagem pedagógica de um jogo educativo (Simulação Estratégica vs. Conexão Cooperativa em Equipe vs. Arcade Rápido) influencia o ganho conceitual, a fluência de raciocínio e o engajamento de alunos do Ensino Médio de escola pública no aprendizado de circuitos elétricos?"*

### Hipótese Principal ($H_1$):
* **$H_1$ (Jogo 2 - David)**: O jogo de conexão espacial 100% cooperativo em equipe (Jogo 2), fundamentado no ensino por pares (*Peer Instruction*) e com regras intuitivas sem formulismo numérico pesado, produzirá o **maior ganho relativo de aprendizagem ($g > 0.5$) e menor índice de ansiedade** em alunos sem conhecimento prévio de Eletrodinâmica.
* **$H_2$ (Jogo 1 - João Vitor)**: A simulação estratégica coopetitiva com cálculo direto (Jogo 1) produzirá maior maestria em alunos que já possuem raciocínio matemático prévio, mas apresentará maior barreira de entrada para iniciantes.

---

## 🧪 3. METODOLOGIA EXPERIMENTAL

```
                                [ POPULAÇÃO DE TESTE ]
                      (Alunos do 3º Ano do EM de Escola Pública)
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        ▼                                 ▼                                 ▼
   [ GRUPO A ]                       [ GRUPO B ]                       [ GRUPO C ]
Testa Jogo 1 (João Vitor)         Testa Jogo 2 (David)              Testa Jogo 3
Simulação Coopetitiva             Deckbuilder Cooperativo           Arcade Rápido
        │                                 │                                 │
        └─────────────────────────────────┼─────────────────────────────────┘
                                          ▼
                         [ AVALIAÇÃO DE RESULTADOS ]
                          1. Pré-Teste (Conhecimento inicial)
                          2. Sessão de Jogo (30-45 min)
                          3. Pós-Teste (Retenção conceitual)
                          4. Questionário UEQ (Engajamento)
```

### 📏 Métricas de Análise Científica:
1. **Ganho Relativo de Aprendizagem ($g$ de Hake)**:
   $$g = \frac{\%Pós - \%Pré}{100\% - \%Pré}$$
   * *Interpretação*: $g \ge 0.7$ (Ganho Alto), $0.3 \le g < 0.7$ (Ganho Médio), $g < 0.3$ (Ganho Baixo).
2. **Nível de Engajamento e Experiência de Uso (Escala UEQ)**:
   * Medindo 6 dimensões: Atraência, Perspicuidade, Eficiência, Dependabilidade, Estímulo e Inovação.
3. **Redução da Carga Cognitiva Extrínseca (Escala Likert 5 pontos)**:
   * Medindo o grau de ansiedade e facilidade percebida no aprendizado de circuitos.

---

## 📝 4. INSTRUMENTO DE COLETA DE DADOS (PRÉ/PÓS-TESTE)

### Questões Amostrais para Validação Conceitual:

#### Questão 1 (Conceito de Série):
* *Pergunta*: "Se adicionarmos mais um resistor em fila indiana (em série) em um caminho elétrico, o que acontece com a resistência total daquele caminho e com a corrente que passa por ele?"
  * A) A resistência diminui e a corrente aumenta.
  * B) A resistência aumenta e a corrente diminui. (Correta)
  * C) A resistência e a corrente permanecem iguais.
  * D) O circuito entra em curto-circuito.

#### Questão 2 (Lei dos Nós - Kirchhoff):
* *Pergunta*: "Quando um fio condutor se divide em dois caminhos (em paralelo), o que acontece com a corrente elétrica total que vinha do gerador?"
  * A) A corrente é destruída no ponto de divisão.
  * B) A corrente se divide entre os dois caminhos, e a soma das partes é igual ao total que entrou. (Correta)
  * C) A corrente dobra de valor em ambos os caminhos.
  * D) A corrente passa apenas pelo caminho que não tem resistores.

---

## 📓 5. MODELO DE DIÁRIO DE BORDO (EXIGÊNCIA FEBRACE)

Conforme as normas da FEBRACE, a equipe deve manter um **Diário de Bordo** detalhado. A estrutura de registros recomendada é:

```markdown
# Registro de Diário de Bordo — Data: DD/MM/AAAA

- **Integrante Responsável**: [Nome]
- **Objetivo da Sessão**: [Ex: Teste do protótipo físico do Jogo 2 com 4 alunos da Turma 3B]
- **Observações Comportamentais**:
  - Alunos entenderam as regras do manual em X minutos.
  - Houve dúvida no conceito de nó na rodada Y (resolvida através de explicação do colega Z).
- **Dados Coletados**:
  - Tempo médio de partida: 14 minutos.
  - Taxa de vitória do grupo contra o baralho: 75%.
  - Média Pré-Teste: 35% | Média Pós-Teste: 82%.
- **Melhorias Identificadas para o Próximo Protótipo**:
  - Ajustar a proporção de cartas de Chave Aberta no baralho para tornar o final mais tenso.
```

---

## 🏁 6. CRONOGRAMA DE EXECUÇÃO ATÉ A FEBRACE

| Etapa | Atividade | Prazo | Responsável |
| :--- | :--- | :--- | :--- |
| **Etapa 1** | Diagramação e Impressão do Baralho de 54 Cartas do Jogo 2 | Semana 1 | David |
| **Etapa 2** | Testes Piloto Internos com a Equipe de 3 Integrantes | Semana 2 | Toda a Equipe |
| **Etapa 3** | Aplicação do Experimento nas Turmas de 3º Ano (Coleta de Dados) | Semanas 3-4 | Toda a Equipe |
| **Etapa 4** | Análise Estatística (Cálculo do $g$ de Hake e gráficos UEQ) | Semana 5 | Toda a Equipe |
| **Etapa 5** | Redação do Relatório Final / Artigo Científico FEBRACE | Semana 6 | Toda a Equipe |
| **Etapa 6** | Montagem do Pôster e Submissão na Plataforma "Minha FEBRACE" | Semana 7 | Toda a Equipe |
