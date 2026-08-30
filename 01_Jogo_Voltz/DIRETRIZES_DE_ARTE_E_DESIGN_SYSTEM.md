# ⚡ VOLTZ: CIRCUIT BREAK — DIRETRIZES DE ARTE & DESIGN SYSTEM EDITORIAL

Este documento consolida as conclusões dos relatórios de pesquisa visual sobre jogos como *Bandido*, *Android: Netrunner*, *Radlands*, *Sprawlopolis*, *Circuit Maze* e *Spintronics*, estabelecendo o padrão obrigatório para toda a produção visual do **VOLTZ: Circuit Break**.

---

## 🏛️ 1. O Que Diferencia uma Carta Comercial de um "Vetor Estilo Paint"

| Dimensão | O Erro "Estilo Paint / HTML Básico" | O Padrão Comercial (*Netrunner / Radlands / Roxley*) |
| :--- | :--- | :--- |
| **Fundo & Substrato** | Fundo branco liso e sem vida; caixas de texto com fundo branco cobrindo o centro da carta. | **Substrato texturizado contínuo (Full-Bleed)**: Textura tátil de placa de fibra de vidro FR-4 escura (`#0b101b`) com micro-grid de serigrafia e pátina. |
| **Trilhas e Fios** | Linhas retas puras de cor alaranjada sólida com quinas de 90° secas. | **Barramento metálico com shaders PBR**: Gradientes de 5 paradas (`#fef08a` $\to$ `#f59e0b` $\to$ `#d97706` $\to$ `#451a03`), chanfros a 45°, gotas de reforço (*teardrops*) e terminais de contato dourados (*Gold Fingers PCIe*). |
| **Componentes** | Figuras geométricas fechadas com contorno preto simples de 1px. | **Ilustrações volumétricas 3D**: Cilindros cerâmicos com anéis de cor IEC reais, lentes de LED com emissão de luz volumétrica (*bloom*), aletas de dissipação de calor e filamentos incandescentes em cápsulas de quartzo. |
| **Conexão na Mesa** | A carta parece um cartão de visita isolado que não se conecta organicamente com as cartas vizinhas. | **Engenharia de Caminhos (*Regra Bandido*)**: Trilha perpendicular a 90° nos últimos 2mm da borda, unindo-se perfeitamente com a carta ao lado e transformando a mesa em uma gigantesca placa-mãe. |
| **Ergonomia (Hand UX)** | Informações jogadas no centro; ao abrir as cartas em leque na mão, nada pode ser lido. | **Índices de Poker Espelhados**: Símbolo e valor técnico (`⚡12V`, `1Ω`, `4V🖥️`, `⏚`) nos cantos superior-esquerdo e inferior-direito. |

---

## 📐 2. Anatomia das 6 Camadas de uma Carta Canônica do VOLTZ

```
[ CAMADA 6: ÍNDICES DE POKER & UI ]      -> Mini-índices de canto espelhados + Badge de Vnom
[ CAMADA 5: EMISSÃO DE LUZ (DIEGESIS) ]  -> Cones de luz de LED, faíscas, halos de néon
[ CAMADA 4: COMPONENTES ELETRÔNICOS 3D ] -> Chips, resistores cerâmicos, tubos de vácuo, motores
[ CAMADA 3: SERIGRAFIA TÉCNICA (Branca) ]-> Códigos de componente (R1, C4, GND, +12V, TP1)
[ CAMADA 2: BARRAMENTOS DE COBRE & OURO]-> Fitas condutoras com chanfro 3D, vias e Gold Fingers
[ CAMADA 1: SUBSTRATO FR-4 (Dark PCB) ]  -> Placa escura com micro-trama e acabamento tátil
```

---

## 🛡️ 3. Regra de Ouro do Verso Anti-Cheat

* **Simetria de 180° Inviolável**: O verso possui um labirinto de circuitos dourados e medalhão central que é **rigorosamente indistinguível** se a carta for girada de cabeça para baixo.
* **Alta Densidade Visual**: Fundo azul-marinho profundo (`#090d16`) impedindo qualquer transparência ou dedução de silhuetas contra a luz.

---

## 🚀 4. Como Usar esta Skill nas Próximas Produções

Ao solicitar novos baralhos, expansões (ex: Corrente Alternada, Portas Lógicas), ilustrações ou atualizações na versão digital:
* O agente invocará a skill `voltz-art-direction` para aplicar automaticamente as texturas FR-4, os gradientes metálicos de cobre, as conexões de Gold Finger de 10mm e os índices de Poker.
