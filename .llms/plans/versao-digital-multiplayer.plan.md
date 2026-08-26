# Plan: Versão Digital Funcional Multiplayer do VOLTZ: Circuit Break

- **ID / Slug**: `versao-digital-multiplayer`
- **Status**: `draft`
- **Created**: 2026-08-26
- **Target Component / Scope**: `01_Jogo_Voltz/web_multiplayer/`

## 1. Goal & Context
- **Goal**: Criar uma versão digital web multiplayer funcional (2 a 4 jogadores) do jogo VOLTZ: Circuit Break para permitir testes e partidas em tempo real com a equipe no navegador, preservando 100% das regras e da física do jogo físico.
- **Why it matters**: Agiliza os playtests com a equipe e avaliadores, permitindo testes remotos sem necessidade de impressão prévia.
- **Non-Goals**: Não alterar nenhuma regra, balanceamento, contagem de cartas ou valores de tensão/resistência do jogo físico.

## 2. Architectural Approach & MVP Choice
- **Recommended Approach**: Aplicação web SPA (HTML5/CSS3/JavaScript moderno) com suporte a WebRTC P2P (PeerJS) para conexão direta entre navegadores via Código de Sala (zero backend / serverless) e servidor Node.js/Socket.io opcional para LAN.
- **MVP Version**: Lobby com código de sala, mesa compartilhada com os 4 setores radiando do Gerador 12V, mão privada do jogador, cálculo automático de divisores de tensão no GND e log de ações em tempo real.

## 3. Atomic Implementation Tasks

- [ ] **Step 1: Catálogo Canônico de Dados das 54 Cartas**
  - **Files**: `01_Jogo_Voltz/web_multiplayer/js/voltz_cards_data.js`
  - **Action**: Definir as 54 cartas, parâmetros de $V_{nom}$, Ohms, blocos e tipos de conector.
  - **Verification**: Validar se a contagem total de cartas é exatamente 54.

- [ ] **Step 2: Motor de Regras e Eletrodinâmica**
  - **Files**: `01_Jogo_Voltz/web_multiplayer/js/voltz_engine.js`
  - **Action**: Implementar embaralhamento, turnos, descarte ativo, montagem de ramos e cálculo da Lei de Ohm / divisor de tensão no Cabo Terra GND.
  - **Verification**: Executar testes unitários cobrindo Sucesso, Sobretensão, Subtensão e Fusível.

- [ ] **Step 3: Renderizador Visual de Cartas e Mesa**
  - **Files**: `01_Jogo_Voltz/web_multiplayer/js/voltz_render.js`, `01_Jogo_Voltz/web_multiplayer/css/voltz_web.css`
  - **Action**: Renderizar as cartas com trilhas de cobre de 10mm em SVG vetorial e a mesa com os 4 setores e slots de conexão.
  - **Verification**: Inspecionar visualmente o encaixe das trilhas na tela.

- [ ] **Step 4: Camada de Rede Multiplayer e Lobby**
  - **Files**: `01_Jogo_Voltz/web_multiplayer/js/voltz_multiplayer.js`, `01_Jogo_Voltz/web_multiplayer/index.html`
  - **Action**: Implementar criação de sala com código (ex: `VOLT-2026`), entrada de 2 a 4 jogadores e broadcast de jogadas em tempo real via WebRTC Data Channels.
  - **Verification**: Conectar 2 clientes e sincronizar jogadas entre eles.

- [ ] **Step 5: Servidor Node.js Opcional e Documentação de Uso**
  - **Files**: `01_Jogo_Voltz/web_multiplayer/server.js`, `01_Jogo_Voltz/web_multiplayer/package.json`, `01_Jogo_Voltz/web_multiplayer/README_MULTIPLAYER.md`
  - **Action**: Criar mini-servidor local e instruções passo a passo para jogar online com a equipe.
  - **Verification**: Iniciar servidor e testar acesso via localhost.

## 4. Acceptance Criteria & Definition of Done (DoD)
- [ ] O baralho contém exatamente 54 cartas idênticas ao manual físico.
- [ ] 2 a 4 jogadores conseguem entrar na mesma sala e ver a mesa sincronizada em tempo real.
- [ ] O cálculo de tensão no aterramento do GND reflete com precisão as Leis de Ohm.
- [ ] Interface responsiva para desktop e mobile.

## 5. Risks & Mitigation
- **Risk**: NAT/Firewall bloquear conexões WebRTC P2P em algumas redes restritas.
- **Mitigation**: Utilizar servidores STUN públicos gratuitos do Google + fornecer a opção de relay WebSocket local via `server.js`.
