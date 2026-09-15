# Metodologia de Testes: Comparativo de Retenção Teórica em Eletrodinâmica

Este documento estabelece o protocolo experimental para avaliar o impacto de duas abordagens de simulação educacional (Física vs. Digital Nodal) na resolução de problemas de eletrodinâmica padrão vestibular (ENEM, FUVEST, UNICAMP).

## 1. Definição de Termos Importantes

* **Simulador Nodal (Bancada Web):** Motor de cálculo baseado em Análise Nodal Modificada (MNA) que resolve matrizes de condutância em tempo real para exibir tensão ($V$), corrente ($I$) e potência ($P$) em cada nó do grafo.
* **Heurística Topológica:** Estratégia de resolução baseada apenas na continuidade visual do circuito, sem cálculo de grandezas elétricas.
* **Carga Cognitiva Externa:** Esforço mental gasto na interpretação da interface e manipulação de componentes, reduzindo a capacidade de abstração algébrica.
* **Acoplamento Sensório-Motor:** Resposta imediata do sistema (ex: queima de fusível, alteração do HUD) a uma ação do usuário, completando o ciclo de feedback preditivo.

## 2. Diferenciação dos Modelos (Os 2 Jogos)

O estudo isola duas versões da plataforma VOLTZ como variáveis independentes para entender a relação entre formato e cognição.

* **Modelo A (Jogo Físico / Cartas Impressas):**
  * **Características:** Topologia modular palpável (conexões gap-zero). O foco do usuário recai estritamente sobre a validação de caminhos contínuos (circuito aberto vs. fechado) e o cumprimento de regras lógicas de justaposição.
  * **Limitações Analíticas:** Não fornece feedback instantâneo ou telemetria sobre divisores de tensão, sobrecarga de corrente ou potência. Requer o cálculo manual das grandezas a posteriori.
  * **O que será explorado nos testes:** Avaliar se o manuseio físico reforça a intuição de continuidade e conservação de carga (Lei dos Nós), mitigando erros primários de montagem, mas falhando em corrigir abstrações sobre conservação de energia em malhas complexas.

* **Modelo B (Bancada Web Nodal / Simulador 2D):**
  * **Características:** Plataforma digital determinística e punitiva. O algoritmo MNA calcula a matriz de condutâncias e exibe via HUD a queda de tensão ($\Delta V$) e a corrente ($I$) exatas (em milissegundos) para cada alteração no tabuleiro.
  * **Vantagem Analítica:** Introduz atrito tático imediato (punição no instante de fechamento de um ramo em sobretensão). Exige do jogador o cálculo algébrico prévio da Resistência Equivalente ($R_{eq}$) usando as Leis de Ohm.
  * **O que será explorado nos testes:** Verificar se a resposta visual instantânea (telemetria rigorosa e interrupção por falha térmica) acelera a aquisição da proficiência matemática e das competências de modelagem algébrica exigidas em exames de admissão de alta concorrência.

## 3. Protocolo de Testes

Os testes compararão quantitativamente a eficácia de cada modelo na preparação para questões teóricas de provas padrão.

* **Fase 1: Diagnóstico de Linha de Base (Pré-Teste):**
  * Resolução de 10 questões inéditas de múltipla escolha focadas no cálculo de $R_{eq}$, Leis de Kirchhoff e potência dissipada em circuitos de corrente contínua.
* **Fase 2: Intervenção Experimental Isolada:**
  * **Grupo A:** Executa 5 partidas do Modelo A (Físico), anotando manualmente o diagrama final de suas mesas e validando os cálculos com o mediador.
  * **Grupo B:** Executa 5 partidas do Modelo B (Bancada Web), enfrentando o Bot de Teste MNA, sujeito à visualização da telemetria no HUD e às punições automatizadas por sobretensão/curto.
* **Fase 3: Avaliação Pós-Intervenção (Pós-Teste):**
  * Resolução de um novo caderno de 10 questões, calibrado com a mesma curva de resposta ao item (TRI) da Fase 1, cobrindo os mesmos subtemas da eletrodinâmica.

## 4. Parâmetros Analisados (Variáveis Dependentes)

Para quantificar a correlação causal entre os modelos de jogo e o desempenho acadêmico, o estudo medirá os seguintes dados:

1. **Ganho Percentual Bruto ($\Delta\%$):** O aumento absoluto na taxa de acertos entre o Pré-Teste e o Pós-Teste individual.
2. **Tempo Cronometrado de Resolução ($t_{m}$):** Tempo medido (em minutos/segundos) dedicado à resolução das questões que exigem análise nodal. A métrica aponta se a iteratividade do Modelo B induz o desenvolvimento de heurísticas de cálculo mental mais rápidas.
3. **Frequência de Falso-Paralelo (Incidência de Erro Topológico):** A taxa na qual os alunos interpretam erroneamente circuitos em série que foram desenhados como malhas paralelas no papel. Testaremos a hipótese de que o Modelo A erradica esse erro espacial melhor do que o cálculo abstrato.
4. **Eficiência no Uso da 2ª Lei de Kirchhoff:** Porcentagem de sucesso em subquestões específicas que exigem equacionamento de malhas duplas independentes, onde a intuição visual falha e o rigor algébrico imposto pelo Modelo B se torna mandatório.
