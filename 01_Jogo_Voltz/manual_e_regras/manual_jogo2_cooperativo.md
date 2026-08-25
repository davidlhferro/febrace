# 📖 Manual de Instruções Oficial — VOLTZ: CIRCUIT BREAK (Versão Refinada LLM Council)
**Jogo de Cartas Cooperativo com Linguagem Acessível e Divisores de Tensão**
*Desenvolvido para o Projeto de Pesquisa FEBRACE*

---

## ⚡ 1. O CONCEITO DO JOGO (EM 30 SEGUNDOS!)
Você e sua equipe são **Engenheiros de Contingência**. Um Gerador liberou uma **Bateria de 12 Blocos de Energia ($12\text{V}$)** por 4 setores da cidade.

Sua missão é colocar **Resistores** e **Equipamentos** nos fios e finalizar cada caminho com a carta de **Cabo Terra (GND - 0V)**. Para o equipamento acender sem queimar, a contagem de bloquinhos `[ ■ ]` da linha precisa fornecer a voltagem exata que o equipamento exige!

---

## 📋 2. GUIA RÁPIDO DE MESA (PLAYER AID / CHEAT SHEET)

*(Este guia fica no centro da mesa durante a partida para consulta rápida dos alunos).*

```markdown
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ⚡ TABELA DE CONVERSÃO DE BLOCOS DE MESA ⚡                      │
├──────────────────────┬────────────────┬───────────────────────────┬────────────────────┤
│ EQUIPAMENTO          │ VOLTAGEM (Vnom)│ RESISTÊNCIA BASE DA CARTA │ META DO RAMO (🎯)  │
├──────────────────────┼────────────────┼───────────────────────────┼────────────────────┤
│ 🚨 Sirene de Alerta  │ 6 Volts        │ [ ■ ] (1 Bloco)           │ 🎯 2 BLOCOS TOTAIS │
│ 🖥️ Servidor Central  │ 4 Volts        │ [ ■ ] (1 Bloco)           │ 🎯 3 BLOCOS TOTAIS │
│ 💡 LED Piloto        │ 3 Volts        │ [ ■ ] (1 Bloco)           │ 🎯 4 BLOCOS TOTAIS │
│ ⚙️ Motor de Bomba    │ 6 Volts        │ [ ■ ■ ] (2 Blocos)        │ 🎯 4 BLOCOS TOTAIS │
│ 🏥 Tomógrafo da UTI  │ 12 Volts       │ [ ■ ■ ■ ■ ] (4 Blocos)    │ 🎯 4 BLOCOS TOTAIS │
└──────────────────────┴────────────────┴───────────────────────────┴────────────────────┘
```

---

## 🔄 3. FLUXO DO TURNO DO JOGADOR
No seu turno, você executa 4 passos simples:
1. **COMPRAR**: Compra 2 cartas do baralho de suprimentos para sua mão.
2. **DEBATER**: Mostre suas cartas para a equipe e decidam qual setor precisa de ajuda.
3. **CONSTRUIR OU DESCARTAR (2 Ações)**:
   * *Ação de Construção*: Baixe até 2 cartas na mesa (Resistores, Nós Y ou Equipamentos).
   * *Ação de Descarte Ativo*: Se sua mão estiver travada, você pode usar 1 Ação para descartar até 2 cartas e renovar sua mão!
4. **ATERRAR (Cabo Terra GND - Consome 1 Ação)**: Se o caminho estiver pronto, coloque o **Cabo Terra (GND - 0V)** no final para disparar o teste!

---

## ⏚ 4. DIAGNÓSTICO DO CABO TERRA (GND)
Ao colocar a carta de Cabo Terra (GND) no final do ramo (gastando 1 Ação), a equipe conta todos os bloquinhos `[ ■ ]` em linha daquele cabo:

* 🟢 **Total de Blocos == Meta da Tabela (🎯)** $\implies$ **SUCESSO! O equipamento acende e o setor é salvo! 🛑**
* 💥 **Total de Blocos < Meta da Tabela (🎯)** $\implies$ **SOBRETENSÃO! Passou muita energia e o equipamento queima!**
* ⚪ **Total de Blocos > Meta da Tabela (🎯)** $\implies$ **SUBTENSÃO! Pouca energia. O equipamento não liga (o Terra volta para a mão, mas a Ação do turno foi gasta).**

---

## 🎮 5. MODO TUTORIAL: "APRENDA JOGANDO EM 2 MINUTOS"
*(Faça esta rodada rápida de treino antes de começar a partida oficial!)*

### 🟢 FASE 1: O Primeiro Sucesso (45 segundos)
* **Monte na mesa**: Gerador $12\text{V} \to$ Resistor 3Ω `[ ■ ■ ■ ]` $\to$ LED Piloto `[ ■ ]` $\to$ Cabo Terra (GND).
* **Contagem**: $3 + 1 = 4$ Blocos no total. Na Tabela de Mesa, o LED exige **🎯 4 Blocos**!
* **Resultado**: $4 == 4 \implies$ 🟢 **O LED ACENDEU! Vocês salvaram o primeiro setor!**

### 💥 FASE 2: O Erro Controlado (45 segundos)
* **Monte na mesa**: Gerador $12\text{V} \to$ Resistor 1Ω `[ ■ ]` $\to$ Servidor `[ ■ ]` $\to$ Cabo Terra (GND).
* **Contagem**: $1 + 1 = 2$ Blocos no total. A Tabela exige **🎯 3 Blocos** para o Servidor!
* **Resultado**: $2 < 3 \implies$ 💥 **SOBRETENSÃO! Passou voltagem demais e o Servidor queimou!**

---

## 🏆 6. VITÓRIA DO TIME
A equipe vence a partida assim que conectar o Cabo Terra (GND) e energizar com sucesso os **4 setores da cidade**!
