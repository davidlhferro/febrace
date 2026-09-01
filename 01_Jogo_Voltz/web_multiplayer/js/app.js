/**
 * PORTAL VOLTZ & CENTRAL FEBRACE — Controlador Mestre (Bancada 2D, SVG Autêntico e Hub Científico)
 * Arquitetura Unslop com Delegação Global de Eventos, Zero Emojis e Design Suíço de Precisão.
 */

// Delegação Global de Eventos para Navegação entre Abas (Imune a falhas de carregamento tardio)
document.addEventListener('click', function(e) {
    const tabBtn = e.target.closest('.nav-tab-btn');
    if (!tabBtn) return;
    
    const targetId = tabBtn.getAttribute('data-tab');
    if (!targetId) return;

    document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    
    tabBtn.classList.add('active');
    const pane = document.getElementById(targetId);
    if (pane) pane.classList.add('active');

    // Executa renderização sob demanda com proteção
    if (window.VoltzPortal) {
        if (targetId === 'tab-pesquisa' && window.VoltzPortal.renderPesquisa) {
            window.VoltzPortal.renderPesquisa();
        }
        if (targetId === 'tab-warroom' && window.VoltzPortal.renderWarRoom) {
            window.VoltzPortal.renderWarRoom();
        }
        if (targetId === 'tab-diario-banca') {
            if (window.VoltzPortal.renderDiario) window.VoltzPortal.renderDiario();
            if (window.VoltzPortal.renderBanca) window.VoltzPortal.renderBanca();
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    try {
        // 1. Instanciação dos Motores Principais
        const engine = new VoltzEngine();
        const warRoom = new VoltzWarRoom();
        const diarioManager = new VoltzDiarioManager();
        const bancaCoach = new VoltzBancaCoach();
        const researchManager = new VoltzResearchManager();

        let p2pManager = null;
        let selectedCardUid = null;
        let currentSelectedRotation = 0; // 0, 90, 180, 270
        let myPlayerId = null;

        // Zoom e Pan da Grade 2D
        let gridZoom = 1.0;
        let panX = 0;
        let panY = 0;
        let isPanning = false;
        let startPanX = 0;
        let startPanY = 0;

        // -------------------------------------------------------------
        // MÓDULO 1: ARENA MULTIPLAYER COM GRADE 2D & SVG REAL
        // -------------------------------------------------------------
        const p2pStatusEl = document.getElementById('p2p-status');
        const roomCodeDisplay = document.getElementById('room-code-display');
        const logBox = document.getElementById('log-box');
        const playerHandEl = document.getElementById('player-hand');
        const gridViewport = document.getElementById('grid-viewport');
        const gridCanvas = document.getElementById('grid-canvas');
        const turnIndicator = document.getElementById('turn-indicator');
        const deckCountEl = document.getElementById('deck-count');
        const assistantText = document.getElementById('assistant-status-text');
        const assistantPill = document.getElementById('assistant-calc-pill');
        const livesDisplay = document.getElementById('network-lives-display');

        function appendLog(msg) {
            if (!logBox) return;
            const div = document.createElement('div');
            div.className = 'log-entry';
            const time = new Date().toLocaleTimeString('pt-BR');
            div.innerHTML = `<span class="time">[${time}]</span> ${msg}`;
            logBox.appendChild(div);
            logBox.scrollTop = logBox.scrollHeight;
        }

        p2pManager = new VoltzP2PManager(
            engine,
            (updatedState) => renderGameState(updatedState),
            (msg) => appendLog(msg)
        );

        // Botões de Lobby
        const btnCreateRoom = document.getElementById('btn-create-room');
        const btnJoinRoom = document.getElementById('btn-join-room');
        const btnStartMultiplayer = document.getElementById('btn-start-multiplayer-game');
        const btnSolo3P = document.getElementById('btn-solo-3p');
        const btnRefreshHand = document.getElementById('btn-refresh-hand');
        const playerNameInput = document.getElementById('player-name-input');
        const roomCodeInput = document.getElementById('room-code-input');
        const playersListDisplay = document.getElementById('players-list-display');

        // Controles de Zoom da Grade
        const btnZoomIn = document.getElementById('btn-zoom-in');
        const btnZoomOut = document.getElementById('btn-zoom-out');
        const btnZoomReset = document.getElementById('btn-zoom-reset');

        if (btnZoomIn) {
            btnZoomIn.addEventListener('click', () => {
                gridZoom = Math.min(gridZoom + 0.15, 2.0);
                updateGridTransform();
            });
        }

        if (btnZoomOut) {
            btnZoomOut.addEventListener('click', () => {
                gridZoom = Math.max(gridZoom - 0.15, 0.5);
                updateGridTransform();
            });
        }

        if (btnZoomReset) {
            btnZoomReset.addEventListener('click', () => {
                gridZoom = 1.0;
                panX = 0;
                panY = 0;
                updateGridTransform();
            });
        }

        function updateGridTransform() {
            if (!gridCanvas) return;
            gridCanvas.style.transform = `translate(calc(-50% + ${panX}px), calc(-50% + ${panY}px)) scale(${gridZoom})`;
        }

        // Pan (Arrastar a bancada)
        if (gridViewport) {
            gridViewport.addEventListener('mousedown', (e) => {
                if (e.target.closest('.grid-card-tile') || e.target.closest('.grid-slot-valid')) return;
                isPanning = true;
                startPanX = e.clientX - panX;
                startPanY = e.clientY - panY;
            });

            window.addEventListener('mousemove', (e) => {
                if (!isPanning) return;
                panX = e.clientX - startPanX;
                panY = e.clientY - startPanY;
                updateGridTransform();
            });

            window.addEventListener('mouseup', () => {
                isPanning = false;
            });
        }

        if (btnCreateRoom) {
            btnCreateRoom.addEventListener('click', () => {
                const name = playerNameInput ? (playerNameInput.value.trim() || 'David') : 'David';
                btnCreateRoom.disabled = true;
                p2pManager.createRoom(name, (code, pId) => {
                    myPlayerId = pId;
                    if (roomCodeDisplay) roomCodeDisplay.textContent = code;
                    if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--signal-green)">● SALA [${code}]</span>`;
                    appendLog(`Sala criada com sucesso. Código de conexão: ${code}`);
                    if (btnStartMultiplayer) btnStartMultiplayer.style.display = 'block';
                });
            });
        }

        if (btnJoinRoom) {
            btnJoinRoom.addEventListener('click', () => {
                const name = playerNameInput ? (playerNameInput.value.trim() || 'Operador') : 'Operador';
                const code = roomCodeInput ? roomCodeInput.value.trim().toUpperCase() : '';
                if (!code || code.length !== 4) {
                    alert('Digite o código de 4 letras da sala.');
                    return;
                }
                btnJoinRoom.disabled = true;
                p2pManager.joinRoom(code, name, (pId) => {
                    myPlayerId = pId;
                    if (roomCodeDisplay) roomCodeDisplay.textContent = code;
                    if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--signal-green)">● CONECTADO [${code}]</span>`;
                    appendLog(`Conectado à sala ${code}. Aguarde o anfitrião iniciar.`);
                });
            });
        }

        if (btnStartMultiplayer) {
            btnStartMultiplayer.addEventListener('click', () => {
                p2pManager.startMultiplayerGame();
                btnStartMultiplayer.style.display = 'none';
            });
        }

        if (btnSolo3P) {
            btnSolo3P.addEventListener('click', () => {
                engine.initSoloPassAndPlay(['David (P1)', 'João (P2)', 'Parceiro 3 (P3)']);
                myPlayerId = 'p1';
                if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--signal-blue)">● BANCADA LOCAL (3P)</span>`;
                appendLog('Partida local iniciada para 3 operadores na mesma bancada.');
                renderGameState(engine.getState());
            });
        }

        if (btnRefreshHand) {
            btnRefreshHand.addEventListener('click', () => {
                const state = engine.getState();
                if (!state.gameStarted) {
                    alert('Inicie uma partida primeiro.');
                    return;
                }
                const curP = state.players[state.turnIndex];
                if (p2pManager.isMultiplayer() && curP.id !== myPlayerId) {
                    alert('Aguarde a sua vez de jogar.');
                    return;
                }

                if (confirm('Deseja descartar as 3 cartas atuais para o fundo do monte e comprar 3 novas? Isso passará o seu turno.')) {
                    if (p2pManager.isMultiplayer()) {
                        p2pManager.sendAction({ type: 'REFRESH_HAND' });
                    } else {
                        engine.refreshHand(curP.id);
                        renderGameState(engine.getState());
                    }
                }
            });
        }

        // Renderização Central do Tabuleiro e Mão
        function renderGameState(state) {
            if (deckCountEl) deckCountEl.textContent = state.deckCount !== undefined ? state.deckCount : state.deck.length;
            if (livesDisplay) livesDisplay.textContent = `${state.networkLives} / 3`;

            if (playersListDisplay && state.players) {
                playersListDisplay.innerHTML = state.players.map((p, i) => {
                    const isTurn = i === state.turnIndex;
                    return `<div style="color:${isTurn ? 'var(--copper-bright)' : 'var(--text-secondary)'}; font-weight:${isTurn ? '700' : 'normal'};">
                        ${isTurn ? '▶ ' : '• '} ${p.name} (${p.hand ? p.hand.length : 0} cartas)
                    </div>`;
                }).join('');
            }

            if (turnIndicator && state.gameStarted) {
                const curP = state.players[state.turnIndex];
                const isMyTurn = curP && curP.id === myPlayerId;
                turnIndicator.innerHTML = `Vez de: <strong style="color:${isMyTurn ? 'var(--signal-green)' : 'var(--copper-bright)'};">${curP.name}</strong> ${isMyTurn ? ' (Sua vez!)' : ''}`;
            }

            // Renderizar Tabuleiro
            renderBoardGrid(state);

            // Renderizar Mão
            renderPlayerHand(state);
        }

        function renderBoardGrid(state) {
            if (!gridCanvas) return;
            gridCanvas.innerHTML = '';

            const CARD_W = 140;
            const CARD_H = 98;
            const GAP = 0;

            const board = state.board || {};

            // Renderizar Cartas Posicionadas
            Object.keys(board).forEach(coordKey => {
                const node = board[coordKey];
                const [gx, gy] = coordKey.split(',').map(Number);

                const cardEl = document.createElement('div');
                cardEl.className = 'board-card-node';
                cardEl.style.left = `${gx * (CARD_W + GAP)}px`;
                cardEl.style.top = `${gy * (CARD_H + GAP)}px`;

                const svgMarkup = renderVoltzCardVisualSVG(node.card, node.rotation || 0, {
                    width: CARD_W,
                    height: CARD_H,
                    isPlaced: true,
                    isEnergized: node.isEnergized || false,
                    isLoopConnected: node.isLoopConnected || false,
                    isGndConnected: node.isGndConnected || false
                });

                cardEl.innerHTML = svgMarkup;
                gridCanvas.appendChild(cardEl);
            });

            // Renderizar Slots Válidos (+)
            const curP = state.players ? state.players[state.turnIndex] : null;
            const isMyTurn = !p2pManager.isMultiplayer() || (curP && curP.id === myPlayerId);

            if (state.gameStarted && !state.gameOver && isMyTurn && selectedCardUid) {
                const cardObj = findSelectedCard(state, selectedCardUid);
                if (cardObj) {
                    const validSlots = engine.getValidSlotsForCard(cardObj, currentSelectedRotation);

                    validSlots.forEach(slot => {
                        const slotEl = document.createElement('div');
                        slotEl.className = 'board-slot-target';
                        slotEl.style.left = `${slot.x * (CARD_W + GAP)}px`;
                        slotEl.style.top = `${slot.y * (CARD_H + GAP)}px`;
                        slotEl.textContent = '+';
                        slotEl.title = `Conectar em (${slot.x}, ${slot.y})`;

                        slotEl.addEventListener('click', () => {
                            handlePlaceCard(slot.x, slot.y, selectedCardUid, currentSelectedRotation);
                        });

                        gridCanvas.appendChild(slotEl);
                    });

                    if (assistantText) {
                        assistantText.textContent = `${validSlots.length} slots compatíveis na malha. Clique em um slot verde (+) para conectar.`;
                    }
                }
            }
        }

        function findSelectedCard(state, cardUid) {
            const curP = state.players ? state.players[state.turnIndex] : null;
            if (!curP || !curP.hand) return null;
            return curP.hand.find(c => c.uid === cardUid);
        }

        function renderPlayerHand(state) {
            if (!playerHandEl) return;
            playerHandEl.innerHTML = '';

            const curP = state.players ? state.players[state.turnIndex] : null;
            if (!state.gameStarted) {
                playerHandEl.innerHTML = '<div style="color:var(--text-muted); font-size:12px;">Inicie uma partida no painel lateral para carregar a mão de cartas.</div>';
                return;
            }

            const handToDisplay = (p2pManager.isMultiplayer())
                ? (state.players.find(p => p.id === myPlayerId)?.hand || [])
                : (curP ? curP.hand : []);

            if (handToDisplay.length === 0) {
                playerHandEl.innerHTML = '<div style="color:var(--text-muted); font-size:12px;">Nenhuma carta restante na mão.</div>';
                return;
            }

            handToDisplay.forEach(card => {
                const wrapper = document.createElement('div');
                wrapper.className = `hand-card-wrapper ${card.uid === selectedCardUid ? 'selected' : ''}`;

                const rotToUse = (card.uid === selectedCardUid) ? currentSelectedRotation : (card.rotation || 0);

                const svgMarkup = renderVoltzCardVisualSVG(card, rotToUse, {
                    width: 130,
                    height: 90,
                    isPlaced: false
                });

                const cardSvgContainer = document.createElement('div');
                cardSvgContainer.innerHTML = svgMarkup;
                cardSvgContainer.style.cursor = 'pointer';

                cardSvgContainer.addEventListener('click', () => {
                    if (selectedCardUid === card.uid) {
                        currentSelectedRotation = (currentSelectedRotation + 90) % 360;
                    } else {
                        selectedCardUid = card.uid;
                        currentSelectedRotation = card.rotation || 0;
                    }
                    renderGameState(engine.getState());
                });

                wrapper.appendChild(cardSvgContainer);

                // Botão Girar
                const btnRotate = document.createElement('button');
                btnRotate.className = 'btn-secondary';
                btnRotate.style.fontSize = '10.5px';
                btnRotate.style.padding = '3px 8px';
                btnRotate.style.width = '100%';
                btnRotate.textContent = `Girar (${rotToUse}°)`;

                btnRotate.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectedCardUid = card.uid;
                    currentSelectedRotation = (rotToUse + 90) % 360;
                    renderGameState(engine.getState());
                });

                wrapper.appendChild(btnRotate);
                playerHandEl.appendChild(wrapper);
            });
        }

        function handlePlaceCard(x, y, cardUid, rotation) {
            if (p2pManager.isMultiplayer()) {
                p2pManager.sendAction({
                    type: 'PLAY_CARD',
                    x, y, cardUid, rotation
                });
            } else {
                const success = engine.playCard(x, y, cardUid, rotation);
                if (success) {
                    selectedCardUid = null;
                    currentSelectedRotation = 0;
                    renderGameState(engine.getState());
                } else {
                    alert('Jogada inválida: as trilhas não coincidem com os nós vizinhos.');
                }
            }
        }

        // -------------------------------------------------------------
        // MÓDULO 2: CENTRAL DA PESQUISA TEÓRICA & VESTIBULARES
        // -------------------------------------------------------------
        function renderPesquisa() {
            const container = document.getElementById('pesquisa-container');
            if (!container) return;

            const proposals = researchManager.proposals;
            const maxVotes = Math.max(...proposals.map(p => p.votes));
            const steps = researchManager.steps || [];
            const rationale = researchManager.rationale || { cards: [] };
            const portfolio = researchManager.portfolio || [];
            const hakeTheory = researchManager.hakeTheory || { tiers: [] };

            container.innerHTML = `
                <!-- HEADER DA PESQUISA -->
                <div class="guide-card" style="border-left: 3px solid var(--signal-green); margin-bottom: 20px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                        <div>
                            <h2 style="font-size:16px; font-weight:800; color:var(--text-primary);">Hub de Pesquisa Científica & Metodologia PER</h2>
                            <div style="font-size:12px; color:var(--text-muted); margin-top:3px;">
                                Foco: <strong>Questões Conceituais de Circuitos (ENEM, FUVEST e UNICAMP)</strong> | Amostra: <strong>N = 75 Estudantes de Escola Pública</strong>
                            </div>
                        </div>
                        <span class="guide-badge-pill" style="color:var(--signal-green); border-color:var(--signal-green);">PADRÃO OURO PER</span>
                    </div>
                    <div style="font-size:12.5px; color:var(--text-secondary); line-height:1.5; margin-top:10px; background:var(--bg-inset); padding:10px 12px; border-radius:4px; border:1px solid var(--border-subtle);">
                        <strong>Hipótese Principal (H1):</strong> O modelo topológico 2D do <strong>VOLTZ</strong> produz ganho de aprendizagem de Hake médio de <strong>g ≥ 0,65</strong> em questões conceituais de vestibulares, superando expressivamente o ensino tradicional expositivo (g < 0,30).
                    </div>
                </div>

                <!-- SEÇÃO FUNDAMENTAÇÃO DO GANHO DE HAKE -->
                <div class="guide-card" style="border-top: 2px solid var(--copper-bright); margin-bottom: 20px;">
                    <div style="margin-bottom: 12px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--copper-bright);">
                                    ${hakeTheory.title || 'Fundamentação do Ganho de Hake (1998)'}
                                </h3>
                                <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                                    Métrica quantitativa de referência internacional em Physics Education Research:
                                </p>
                            </div>
                            <span class="guide-badge-pill" style="color:var(--copper-bright); border-color:var(--copper-bright);">FÓRMULA CANÔNICA</span>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:14px;">
                        <div style="background:var(--bg-inset); border:1px solid var(--border-subtle); padding:12px; border-radius:4px;">
                            <strong style="color:var(--signal-blue); font-size:12px; display:block; margin-bottom:4px;">Definição Operacional:</strong>
                            <p style="font-size:12px; color:var(--text-secondary); line-height:1.45; margin-bottom:6px;">
                                <em>"${hakeTheory.coreConcept}"</em>
                            </p>
                            <div style="background:rgba(0,0,0,0.4); padding:6px 10px; border-radius:3px; font-family:'JetBrains Mono', monospace; color:var(--copper-bright); font-size:12px; text-align:center; margin:6px 0;">
                                ${hakeTheory.formula}
                            </div>
                            <p style="font-size:11.5px; color:var(--text-muted); line-height:1.4;">
                                ${hakeTheory.example}
                            </p>
                        </div>

                        <div style="background:var(--bg-inset); border:1px solid var(--border-subtle); padding:12px; border-radius:4px; display:flex; flex-direction:column; justify-content:space-between;">
                            <strong style="color:var(--signal-green); font-size:12px; display:block; margin-bottom:6px;">As 3 Faixas Oficiais da Literatura PER:</strong>
                            <div style="display:flex; flex-direction:column; gap:6px;">
                                ${(hakeTheory.tiers || []).map(t => `
                                    <div style="font-size:11.5px; border-left:3px solid ${t.color}; padding:4px 8px; background:rgba(0,0,0,0.3); border-radius:3px;">
                                        <strong style="color:${t.color};">${t.range} — ${t.label}:</strong>
                                        <span style="color:var(--text-secondary); display:block; font-size:11px; margin-top:2px;">${t.desc}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- SIMULADOR INTERATIVO DE HAKE -->
                    <div style="background:var(--bg-panel); border:1px solid var(--border-medium); padding:14px; border-radius:4px;">
                        <div style="font-size:13px; font-weight:800; color:var(--text-primary); margin-bottom:6px;">
                            Simulador Interativo: Ajuste as Notas e Calcule o Ganho de Hake (g)
                        </div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:12px;">
                            <div>
                                <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                                    <label style="font-size:11px; color:var(--text-secondary); font-weight:700;">Nota Pré-Teste (%):</label>
                                    <span id="hake-val-pre-display" style="font-size:12px; font-weight:800; color:var(--signal-blue); font-family:'JetBrains Mono', monospace;">20%</span>
                                </div>
                                <input type="range" id="hake-range-pre" min="0" max="95" value="20" style="width:100%; accent-color:var(--signal-blue); cursor:pointer;">
                            </div>
                            <div>
                                <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                                    <label style="font-size:11px; color:var(--text-secondary); font-weight:700;">Nota Pós-Teste (%):</label>
                                    <span id="hake-val-pos-display" style="font-size:12px; font-weight:800; color:var(--signal-green); font-family:'JetBrains Mono', monospace;">80%</span>
                                </div>
                                <input type="range" id="hake-range-pos" min="5" max="100" value="80" style="width:100%; accent-color:var(--signal-green); cursor:pointer;">
                            </div>
                        </div>

                        <div id="hake-calc-result" style="background:var(--bg-inset); border:1px solid var(--border-subtle); padding:10px 14px; border-radius:4px; text-align:center;">
                            <div style="font-size:11px; color:var(--text-muted);">Ganho Normalizado de Aprendizagem:</div>
                            <div id="hake-calc-val" style="font-size:22px; font-weight:800; color:var(--copper-bright); font-family:'JetBrains Mono', monospace; margin:2px 0;">g = 0.750</div>
                            <div id="hake-calc-badge" style="font-size:11.5px; font-weight:700; color:var(--signal-green);">Alto Ganho (g ≥ 0.70) — Padrão de Excelência Máxima</div>
                            <div style="margin-top:8px; background:var(--bg-panel); border-radius:3px; height:8px; overflow:hidden;">
                                <div id="hake-calc-bar" style="height:100%; width:75%; background:var(--signal-green); transition:width 0.2s ease;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- OS 4 ESTUDOS TEÓRICOS DE VESTIBULAR -->
                <div class="guide-card" style="border-top: 2px solid var(--signal-purple); margin-bottom: 20px;">
                    <div style="margin-bottom: 14px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                            <div>
                                <h3 style="font-size:15px; font-weight:800; color:var(--signal-purple);">
                                    O Portfólio dos 4 Estudos Conceituais (Foco em Vestibulares)
                                </h3>
                                <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                                    Protocolo experimental para validação de eficácia no ENEM, FUVEST e UNICAMP:
                                </p>
                            </div>
                            <span class="guide-badge-pill" style="color:var(--signal-purple); border-color:var(--signal-purple);">PORTFÓLIO COMPLETO</span>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
                        ${portfolio.map(st => `
                            <div style="background:var(--bg-inset); border:1px solid var(--border-subtle); border-left:3px solid ${st.color}; padding:12px; border-radius:4px;">
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                                    <div style="font-size:13px; font-weight:800; color:var(--text-primary);">
                                        ${st.title}
                                    </div>
                                    <span class="guide-badge-pill" style="color:${st.color}; border-color:${st.color}; font-size:9.5px;">${st.badge}</span>
                                </div>
                                <div style="font-size:11px; color:var(--copper-bright); margin-bottom:6px; font-weight:700;">
                                    Poder Estatístico: <span>${st.power}</span> | Métrica: <span>${st.metric}</span>
                                </div>
                                <div style="font-size:11.5px; color:var(--text-secondary); margin-bottom:6px; line-height:1.4;">
                                    <strong>Pergunta de Pesquisa:</strong> ${st.question}
                                </div>
                                <div style="font-size:11px; background:rgba(0,0,0,0.3); padding:6px 8px; border-radius:3px; margin-bottom:6px; color:var(--text-muted);">
                                    <strong>Procedimento:</strong> ${st.procedure}
                                </div>
                                <div style="font-size:11.5px; color:var(--signal-green); background:rgba(34,197,94,0.06); padding:6px 8px; border-radius:3px;">
                                    <strong>Hipótese Principal (H1):</strong> ${st.hypothesis}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- OS 5 PASSOS DA APLICAÇÃO NA ESCOLA -->
                <div class="guide-card" style="border-top: 2px solid var(--signal-blue); margin-bottom: 20px;">
                    <div style="margin-bottom: 12px;">
                        <h3 style="font-size:15px; font-weight:800; color:var(--signal-blue);">
                            Protocolo de Aplicação Experimental na Escola Pública (5 Passos)
                        </h3>
                        <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                            Cronograma de execução padronizado para turma de 75 estudantes:
                        </p>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:16px;">
                        ${steps.map(s => `
                            <div style="background:var(--bg-inset); border:1px solid var(--border-subtle); border-left:3px solid ${s.color}; padding:12px; border-radius:4px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                    <div style="font-size:12.5px; font-weight:800; color:var(--text-primary);">
                                        ${s.title}
                                    </div>
                                    <span class="guide-badge-pill" style="color:${s.color}; border-color:${s.color}; font-size:9.5px;">${s.badge}</span>
                                </div>
                                <div style="font-size:12px; color:var(--text-secondary); margin-bottom:6px; line-height:1.45;">
                                    ${s.whatWeDo}
                                </div>
                                <div style="font-size:11.5px; color:var(--signal-green); margin-bottom:4px; background:rgba(34,197,94,0.06); padding:4px 8px; border-radius:3px;">
                                    <strong>Finalidade Metodológica:</strong> ${s.whyItMatters}
                                </div>
                                <div style="font-size:11px; color:var(--text-muted);">
                                    <strong>Procedimento de Controle:</strong> ${s.practicalTip}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- POR QUE CRIAMOS 3 JOGOS -->
                    <div style="background:var(--bg-panel); border:1px solid var(--border-medium); padding:14px; border-radius:4px;">
                        <h4 style="font-size:13.5px; font-weight:800; color:var(--copper-bright); margin-bottom:4px;">
                            ${rationale.title}
                        </h4>
                        <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">${rationale.subtitle}</p>
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:10px;">
                            ${rationale.cards.map(c => `
                                <div style="background:var(--bg-inset); padding:10px; border-radius:4px; border:1px solid var(--border-subtle);">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                        <strong style="font-size:12px; color:var(--text-primary);">
                                            ${c.title}
                                        </strong>
                                        <span class="guide-badge-pill" style="font-size:9px;">${c.tag}</span>
                                    </div>
                                    <p style="font-size:11.5px; color:var(--text-secondary); line-height:1.4;">${c.text}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- SEÇÃO: VOTAÇÃO DO BRAÇO 1 -->
                <div style="margin-bottom: 20px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <div>
                            <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Painel de Decisão: Propostas para o Braço 1</h3>
                            <p style="font-size:12px; color:var(--text-muted);">O Braço 2 é o VOLTZ. Selecione a proposta comparativa para compor o estudo experimental:</p>
                        </div>
                        <span class="guide-badge-pill" style="color:var(--copper-bright); border-color:var(--copper-base);">VOTAÇÃO ATIVA</span>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:14px;">
                        ${proposals.map(prop => {
                            const isLeading = prop.votes === maxVotes && prop.votes > 0;
                            return `
                                <div class="guide-card" style="border-top: 3px solid ${prop.color}; position:relative;">
                                    ${isLeading ? `
                                        <div style="position:absolute; top:-10px; right:12px; background:${prop.color}; color:#000; font-size:9.5px; font-weight:800; padding:2px 8px; border-radius:3px; text-transform:uppercase;">
                                            MAIS VOTADA
                                        </div>
                                    ` : ''}
                                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                                        <h4 style="font-size:13.5px; font-weight:800; color:var(--text-primary);">
                                            ${prop.name}
                                        </h4>
                                        <span class="guide-badge-pill" style="color:${prop.color}; border-color:${prop.color}; font-size:9.5px;">${prop.badge}</span>
                                    </div>
                                    <p style="font-size:12px; color:var(--text-secondary); margin-bottom:10px; line-height:1.45;">${prop.summary}</p>
                                    
                                    <div style="font-size:11.5px; background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; margin-bottom:8px;">
                                        <strong style="color:${prop.color};">Mecânica Operacional:</strong> ${prop.comoJoga}
                                    </div>
                                    <div style="font-size:11.5px; background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; margin-bottom:8px;">
                                        <strong style="color:var(--signal-green);">Contraste Metodológico:</strong> ${prop.contrasteVoltz}
                                    </div>
                                    <div style="font-size:11.5px; background:rgba(0,0,0,0.3); padding:8px; border-radius:4px; margin-bottom:12px;">
                                        <strong style="color:var(--signal-blue);">Fundamentação perante a Banca:</strong> ${prop.opiniaoBanca}
                                    </div>

                                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:10px;">
                                        <span style="font-size:12px; color:var(--text-muted); font-weight:700;">
                                            Votos Registrados: <strong style="color:var(--text-primary); font-size:13px;">${prop.votes}</strong>
                                        </span>
                                        <button class="btn btn-sm btn-vote" data-id="${prop.id}" style="background:${prop.color}; color:#000; font-weight:800; border:none; padding:6px 12px; border-radius:3px; cursor:pointer; font-size:11px;">
                                            Registrar Voto
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- SEÇÃO: VISUALIZADOR DE ITENS DIRECT (PRÉ VS PÓS) -->
                <div class="guide-card" style="border-top: 2px solid var(--signal-purple); margin-bottom: 20px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                        <div>
                            <h3 style="font-size:15px; font-weight:800; color:var(--text-primary);">Banco de Itens Conceituais de Vestibular (DIRECT)</h3>
                            <p style="font-size:12px; color:var(--text-muted);">Itens diagnósticos aplicados antes e após a intervenção:</p>
                        </div>
                        <div style="display:flex; gap:6px;">
                            <button id="btn-tab-pre" class="btn btn-sm" style="background:var(--signal-blue); color:#000; font-weight:800; padding:4px 10px; border-radius:3px; font-size:11px;">Pré-Teste (T0)</button>
                            <button id="btn-tab-pos" class="btn btn-sm" style="background:var(--bg-panel); color:var(--text-secondary); font-weight:700; padding:4px 10px; border-radius:3px; font-size:11px;">Pós-Teste Isomórfico (T1)</button>
                        </div>
                    </div>

                    <div id="direct-items-container" style="display:flex; flex-direction:column; gap:8px;"></div>
                </div>
            `;

            // Ativação dos botões de votação
            container.querySelectorAll('.btn-vote').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const propId = e.currentTarget.getAttribute('data-id');
                    researchManager.voteProposal(propId);
                    renderPesquisa();
                });
            });

            // Lógica do Simulador Interativo de Hake com Sliders e Barra Dinâmica
            const rangePre = document.getElementById('hake-range-pre');
            const rangePos = document.getElementById('hake-range-pos');
            const preDisplay = document.getElementById('hake-val-pre-display');
            const posDisplay = document.getElementById('hake-val-pos-display');
            const calcVal = document.getElementById('hake-calc-val');
            const calcBadge = document.getElementById('hake-calc-badge');
            const calcBar = document.getElementById('hake-calc-bar');

            function updateHakeCalc() {
                if (!rangePre || !rangePos || !calcVal || !calcBadge) return;
                const pre = parseInt(rangePre.value, 10);
                let pos = parseInt(rangePos.value, 10);

                if (preDisplay) preDisplay.textContent = `${pre}%`;
                if (posDisplay) posDisplay.textContent = `${pos}%`;

                if (pos <= pre) {
                    calcVal.textContent = 'g = 0.000';
                    calcBadge.textContent = 'Sem Ganho (Nota pós menor ou igual ao pré)';
                    calcBadge.style.color = '#ef4444';
                    if (calcBar) {
                        calcBar.style.width = '0%';
                        calcBar.style.background = '#ef4444';
                    }
                    return;
                }

                const g = (pos - pre) / (100 - pre);
                calcVal.textContent = `g = ${g.toFixed(3)}`;
                const barWidth = Math.min(100, Math.max(0, Math.round(g * 100)));
                if (calcBar) calcBar.style.width = `${barWidth}%`;

                if (g >= 0.70) {
                    calcBadge.textContent = 'Alto Ganho (g ≥ 0.70) — Nível de Excelência Máxima';
                    calcBadge.style.color = 'var(--signal-green)';
                    if (calcBar) calcBar.style.background = 'var(--signal-green)';
                } else if (g >= 0.30) {
                    calcBadge.textContent = 'Ganho Médio (0.30 ≤ g ≤ 0.70) — Padrão de Sucesso PER';
                    calcBadge.style.color = 'var(--copper-bright)';
                    if (calcBar) calcBar.style.background = 'var(--copper-bright)';
                } else {
                    calcBadge.textContent = 'Baixo Ganho (g < 0.30) — Típico de Aula Tradicional';
                    calcBadge.style.color = '#ef4444';
                    if (calcBar) calcBar.style.background = '#ef4444';
                }
            }

            if (rangePre && rangePos) {
                rangePre.addEventListener('input', updateHakeCalc);
                rangePos.addEventListener('input', updateHakeCalc);
                updateHakeCalc();
            }

            // Visualizador de Itens DIRECT
            const btnTabPre = document.getElementById('btn-tab-pre');
            const btnTabPos = document.getElementById('btn-tab-pos');
            const itemsContainer = document.getElementById('direct-items-container');

            let activeDirectTab = 'pre';
            function renderDirectItems() {
                if (!itemsContainer) return;
                const items = activeDirectTab === 'pre' ? researchManager.preItems : researchManager.postItems;
                itemsContainer.innerHTML = items.map(item => `
                    <div style="background:var(--bg-inset); border:1px solid var(--border-subtle); padding:10px 12px; border-radius:4px;">
                        <div style="font-size:12.5px; font-weight:700; color:var(--text-primary); margin-bottom:4px;">${item.title}</div>
                        <div style="font-size:12px; color:var(--text-secondary); margin-bottom:6px;">${item.question}</div>
                        <div style="font-size:11.5px; color:var(--signal-green); margin-bottom:3px;">
                            <strong>Gabarito Correto:</strong> ${item.correctAnswer}
                        </div>
                        <div style="font-size:11px; color:var(--text-muted);">
                            <strong>Distrator / Concepção Alternativa Alvo:</strong> ${item.distractor}
                        </div>
                    </div>
                `).join('');
            }

            if (btnTabPre && btnTabPos) {
                btnTabPre.addEventListener('click', () => {
                    activeDirectTab = 'pre';
                    btnTabPre.style.background = 'var(--signal-blue)';
                    btnTabPre.style.color = '#000';
                    btnTabPos.style.background = 'var(--bg-panel)';
                    btnTabPos.style.color = 'var(--text-secondary)';
                    renderDirectItems();
                });
                btnTabPos.addEventListener('click', () => {
                    activeDirectTab = 'pos';
                    btnTabPos.style.background = 'var(--signal-purple)';
                    btnTabPos.style.color = '#fff';
                    btnTabPre.style.background = 'var(--bg-panel)';
                    btnTabPre.style.color = 'var(--text-secondary)';
                    renderDirectItems();
                });
            }
            renderDirectItems();
        }

        // -------------------------------------------------------------
        // MÓDULO 3: GUIA DA JORNADA FEBRACE & MATRIZ DE PRIORIDADES
        // -------------------------------------------------------------
        function renderWarRoom() {
            const scoreEl = document.getElementById('warroom-score');
            const barFill = document.getElementById('warroom-bar-fill');
            const journeyContainer = document.getElementById('journey-stages-container');
            const matrixContainer = document.getElementById('priority-matrix-container');

            if (scoreEl) {
                const score = warRoom.getReadinessScore();
                scoreEl.textContent = `${score}%`;
                if (barFill) barFill.style.width = `${score}%`;
            }

            // Renderiza a Matriz de Prioridades em 3 Níveis
            if (matrixContainer) {
                matrixContainer.innerHTML = warRoom.matrix.map(level => `
                    <div class="guide-card" style="border-top: 2px solid ${level.color}; margin-bottom: 12px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                            <h3 style="font-size:13.5px; font-weight:800; color:var(--text-primary);">${level.title}</h3>
                            <span class="guide-badge-pill" style="color:${level.color}; border-color:${level.color}; font-size:9.5px;">${level.badge}</span>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:6px;">
                            ${level.tasks.map(t => `
                                <div class="task-item-row ${t.status ? 'completed' : ''}">
                                    <input type="checkbox" class="task-checkbox" data-task="${t.id}" ${t.status ? 'checked' : ''} style="accent-color:${level.color};">
                                    <div style="flex:1;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
                                            <strong style="font-size:12.5px; color:${t.status ? 'var(--text-muted)' : 'var(--text-primary)'}; text-decoration:${t.status ? 'line-through' : 'none'};">
                                                ${t.title}
                                            </strong>
                                            <span style="font-size:10.5px; color:var(--copper-bright); font-weight:700;">Responsável: ${t.responsible}</span>
                                        </div>
                                        <div style="font-size:11.5px; color:var(--text-secondary); margin-top:2px; line-height:1.4;">
                                            ${t.desc}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');

                // Event listener nos checkboxes da Matriz de Prioridades
                matrixContainer.querySelectorAll('input[data-task]').forEach(chk => {
                    chk.addEventListener('change', (e) => {
                        const taskId = e.target.getAttribute('data-task');
                        warRoom.toggleTask(taskId);
                        renderWarRoom();
                    });
                });
            }

            // Renderiza as 4 Etapas da Jornada FEBRACE
            if (journeyContainer) {
                journeyContainer.innerHTML = warRoom.journey.map(j => `
                    <div class="guide-card" style="border-left: 3px solid ${j.color}; padding:10px 12px; margin-bottom:8px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                            <div style="font-size:12.5px; font-weight:700; color:var(--text-primary);">
                                <strong>${j.stage}:</strong> ${j.title}
                            </div>
                            <span class="guide-badge-pill" style="color:${j.color}; border-color:${j.color}; font-size:9.5px;">${j.badge}</span>
                        </div>
                        <ul style="font-size:11.5px; color:var(--text-secondary); line-height:1.5; padding-left:16px;">
                            ${j.items.map(it => `<li>${it}</li>`).join('')}
                        </ul>
                    </div>
                `).join('');
            }

            // Renderiza o Roteiro do Pitch Oral de 5 Minutos
            const pitchContainer = document.getElementById('pitch-script-container');
            if (pitchContainer && warRoom.pitch) {
                pitchContainer.innerHTML = warRoom.pitch.map(p => `
                    <div style="background:var(--bg-inset); border-left:2px solid var(--copper-bright); padding:8px 10px; border-radius:3px; margin-bottom:6px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
                            <strong style="color:var(--copper-bright); font-size:12px;">${p.minuto} — ${p.foco}</strong>
                        </div>
                        <div style="font-size:11.5px; color:var(--text-secondary); line-height:1.45; font-style:italic;">
                            "${p.fala}"
                        </div>
                    </div>
                `).join('');
            }
        }

        // Cronômetro Regressivo até 02/10/2026
        function startCountdown() {
            const targetDate = new Date('2026-10-02T23:59:59').getTime();
            const daysEl = document.getElementById('cd-days');
            const hoursEl = document.getElementById('cd-hours');
            const minutesEl = document.getElementById('cd-minutes');
            const secondsEl = document.getElementById('cd-seconds');

            function update() {
                const now = new Date().getTime();
                const distance = targetDate - now;

                if (distance < 0) {
                    if (daysEl) daysEl.textContent = '00';
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
                if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
                if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
                if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
            }

            update();
            setInterval(update, 1000);
        }
        startCountdown();

        // -------------------------------------------------------------
        // MÓDULO 4: DIÁRIO DE BORDO & TREINAMENTO PARA A BANCA USP
        // -------------------------------------------------------------
        function renderDiario() {
            const diarioList = document.getElementById('diario-entries-list');
            if (!diarioList) return;

            diarioList.innerHTML = '';
            diarioManager.entries.forEach(e => {
                const div = document.createElement('div');
                div.className = 'guide-card';
                div.style.marginBottom = '8px';
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
                        <div>
                            <div style="font-weight:700; font-size:13.5px; color:var(--copper-bright);">${e.title}</div>
                            <div style="font-size:11px; color:var(--text-muted); margin-top:1px;">Data: ${e.date} | Tipo: <strong>${e.type}</strong> | Autor: <strong>${e.author}</strong></div>
                        </div>
                        <button class="btn-secondary" style="color:var(--signal-red); border-color:rgba(239,68,68,0.3); font-size:10.5px; padding:3px 8px;" data-del="${e.id}">Excluir</button>
                    </div>
                    <div style="font-size:12px; line-height:1.45; color:var(--text-secondary); margin-top:4px;">${e.description}</div>
                    ${e.findings ? `<div style="font-size:11.5px; color:var(--signal-blue); margin-top:4px; background:var(--bg-inset); padding:4px 8px; border-radius:3px;"><strong>Observação:</strong> ${e.findings}</div>` : ''}
                    ${e.actionItems ? `<div style="font-size:11.5px; color:var(--signal-green); margin-top:4px; background:var(--bg-inset); padding:4px 8px; border-radius:3px;"><strong>Encaminhamento:</strong> ${e.actionItems}</div>` : ''}
                `;

                const btnDel = div.querySelector('button[data-del]');
                if (btnDel) {
                    btnDel.addEventListener('click', () => {
                        if (confirm('Deseja excluir este registro do Diário de Bordo?')) {
                            diarioManager.deleteEntry(e.id);
                            renderDiario();
                        }
                    });
                }

                diarioList.appendChild(div);
            });
        }

        const formDiario = document.getElementById('form-diario-entry');
        if (formDiario) {
            formDiario.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('diario-title').value.trim();
                const type = document.getElementById('diario-type').value;
                const author = document.getElementById('diario-author').value.trim();
                const desc = document.getElementById('diario-desc').value.trim();
                const findings = document.getElementById('diario-findings').value.trim();
                const actions = document.getElementById('diario-actions').value.trim();

                if (!title || !desc) return alert('Preencha o título e a descrição da sessão.');

                diarioManager.addEntry({
                    title, type, author, description: desc, findings, actionItems: actions
                });

                formDiario.reset();
                renderDiario();
                alert('Registro gravado com sucesso no Diário de Bordo.');
            });
        }

        const btnExportMd = document.getElementById('btn-export-md');
        const btnExportPdf = document.getElementById('btn-export-pdf');

        if (btnExportMd) {
            btnExportMd.addEventListener('click', () => {
                const md = diarioManager.exportMarkdown();
                const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `VOLTZ_Diario_de_Bordo_${new Date().toISOString().split('T')[0]}.md`;
                a.click();
                URL.revokeObjectURL(url);
            });
        }

        if (btnExportPdf) {
            btnExportPdf.addEventListener('click', () => {
                const html = diarioManager.exportPrintableHTML();
                const win = window.open('', '_blank');
                win.document.write(html);
                win.document.close();
                win.focus();
                setTimeout(() => win.print(), 500);
            });
        }

        // RENDERIZAÇÃO DOS MÓDULOS DA BANCA USP
        function renderBanca() {
            const reqsContainer = document.getElementById('banca-requirements-container');
            if (reqsContainer && bancaCoach.reportReqs) {
                reqsContainer.innerHTML = bancaCoach.reportReqs.map(r => `
                    <div style="background:var(--bg-inset); border-left:3px solid ${r.color}; padding:8px 10px; border-radius:4px; margin-bottom:8px;">
                        <div style="font-weight:700; font-size:12px; color:var(--text-primary); margin-bottom:4px;">
                            ${r.category}
                        </div>
                        <div style="display:flex; flex-direction:column; gap:4px;">
                            ${r.items.map(it => `
                                <div style="font-size:11px; background:rgba(0,0,0,0.3); padding:4px 6px; border-radius:3px; line-height:1.4;">
                                    <strong style="color:${r.color};">${it.topic}:</strong>
                                    <span style="color:var(--text-secondary);"> ${it.detail}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');
            }

            const objContainer = document.getElementById('banca-objections-container');
            if (objContainer && bancaCoach.objections) {
                objContainer.innerHTML = bancaCoach.objections.map(obj => `
                    <details class="objection-card">
                        <summary class="objection-summary">
                            <span>${obj.pergunta}</span>
                            <span class="guide-badge-pill" style="font-size:9px; color:var(--copper-bright); border-color:var(--copper-base);">${obj.conceitoChave}</span>
                        </summary>
                        <div class="objection-content">
                            <div style="font-size:11px; color:var(--text-muted); margin-bottom:4px;">
                                <strong>Finalidade da Arguição:</strong> ${obj.porQuePerguntam}
                            </div>
                            <div style="background:rgba(34,197,94,0.06); border-left:2px solid var(--signal-green); padding:6px 8px; border-radius:3px; color:var(--text-primary); margin-top:4px;">
                                <strong style="color:var(--signal-green); font-size:11px;">Resposta Fundamentada:</strong><br>
                                "${obj.respostaPerfeita}"
                            </div>
                        </div>
                    </details>
                `).join('');
            }

            const bancaContainer = document.getElementById('banca-translator-container');
            if (bancaContainer && bancaCoach.glossary) {
                bancaContainer.innerHTML = '';
                bancaCoach.glossary.forEach((item) => {
                    const card = document.createElement('div');
                    card.style.background = 'var(--bg-inset)';
                    card.style.border = '1px solid var(--border-subtle)';
                    card.style.borderRadius = '4px';
                    card.style.padding = '8px 10px';
                    card.style.marginBottom = '6px';
                    card.innerHTML = `
                        <div style="font-size:11px; color:var(--text-muted); margin-bottom:2px;">
                            <strong>Arguição Técnica:</strong> <em>"${item.juradoDiz}"</em>
                        </div>
                        <div style="font-size:11.5px; font-weight:700; color:var(--text-primary); margin-bottom:4px;">
                            ${item.traducao}
                        </div>
                        <div style="font-size:11px; color:var(--signal-green);">
                            <strong>Fundamentação:</strong> <span style="color:var(--text-secondary);">${item.respostaNaPontaDaLingua}</span>
                        </div>
                    `;
                    bancaContainer.appendChild(card);
                });
            }
        }

        // Exporta objeto global de controle
        window.VoltzPortal = {
            engine,
            warRoom,
            diarioManager,
            bancaCoach,
            researchManager,
            p2pManager,
            renderPesquisa,
            renderWarRoom,
            renderDiario,
            renderBanca
        };

        // Renderizações Iniciais
        renderPesquisa();
        renderWarRoom();
        renderDiario();
        renderBanca();

    } catch (err) {
        console.error('[VOLTZ] Erro na inicialização do portal:', err);
    }
});
