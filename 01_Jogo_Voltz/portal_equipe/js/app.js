/**
 * PORTAL VOLTZ & CENTRAL FEBRACE — Controlador Mestre (Grade 2D, SVG Autêntico e Hub Científico)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Instanciação dos Motores
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

    // Elementos da UI
    const navTabs = document.querySelectorAll('.nav-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // 2. Gerenciador de Abas SPA
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add('active');

            if (targetId === 'tab-pesquisa') renderPesquisa();
            if (targetId === 'tab-warroom') renderWarRoom();
            if (targetId === 'tab-diario') renderDiario();
            if (targetId === 'tab-banca') renderBanca();
        });
    });

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

    // Pan (Arrastar a mesa)
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
            const name = playerNameInput.value.trim() || 'David';
            btnCreateRoom.disabled = true;
            p2pManager.createRoom(name, (code, pId) => {
                myPlayerId = pId;
                if (roomCodeDisplay) roomCodeDisplay.textContent = code;
                if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--neon-green)">● SALA [${code}]</span>`;
                if (btnStartMultiplayer) btnStartMultiplayer.style.display = 'block';
                renderGameState(engine.gameState);
            });
        });
    }

    if (btnStartMultiplayer) {
        btnStartMultiplayer.addEventListener('click', () => {
            if (p2pManager.isHost) {
                engine.startGame();
                p2pManager.broadcastState();
                renderGameState(engine.gameState);
                appendLog('🚀 Partida iniciada na grade 2D com ' + engine.gameState.players.length + ' jogadores!');
            }
        });
    }

    if (btnJoinRoom) {
        btnJoinRoom.addEventListener('click', () => {
            const code = roomCodeInput.value.trim();
            const name = playerNameInput.value.trim() || 'Amigo ' + Math.floor(Math.random() * 100);
            if (!code) return alert('Por favor, digite o código de 4 letras da sala.');
            btnJoinRoom.disabled = true;
            p2pManager.joinRoom(code, name, (c, pId) => {
                myPlayerId = pId;
                if (roomCodeDisplay) roomCodeDisplay.textContent = c;
                if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--neon-blue)">● CONECTADO [${c}]</span>`;
            });
        });
    }

    if (btnSolo3P) {
        btnSolo3P.addEventListener('click', () => {
            myPlayerId = 'p1';
            engine.resetGame();
            engine.addPlayer('p1', 'David', true);
            engine.addPlayer('p2', 'João', false);
            engine.addPlayer('p3', 'Parceiro 3', false);
            engine.startGame();
            if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--neon-green)">● TESTE 3P (LOCAL)</span>`;
            renderGameState(engine.gameState);
            appendLog('👥 Modo 3 Jogadores (David, João, Parceiro 3) iniciado na grade 2D.');
        });
    }

    if (btnRefreshHand) {
        btnRefreshHand.addEventListener('click', () => {
            if (!myPlayerId) return;
            p2pManager.sendAction('REFRESH_HAND', { playerId: myPlayerId });
        });
    }

    // -------------------------------------------------------------
    // RENDERIZAÇÃO DA GRADE 2D COM SVGs REAIS
    // -------------------------------------------------------------
    function renderGameState(state) {
        if (!state) return;

        if (deckCountEl) deckCountEl.textContent = state.deck.length;
        if (livesDisplay) livesDisplay.textContent = `${state.networkLives || 3} / 3`;

        // Lista de Jogadores
        if (playersListDisplay) {
            if (state.players.length === 0) {
                playersListDisplay.innerHTML = '<em>Ninguém conectado ainda.</em>';
            } else {
                playersListDisplay.innerHTML = state.players.map((p, i) => `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:3px 0;">
                        <span><strong>${i + 1}. ${p.name}</strong> ${p.isHost ? '👑 (Host)' : ''} ${p.id === myPlayerId ? '<span style="color:var(--neon-green)">(Você)</span>' : ''}</span>
                        <span style="color:var(--neon-green); font-size:11px;">● ${p.hand.length} cartas</span>
                    </div>
                `).join('');
            }
        }

        // Indicador de Turno
        if (turnIndicator && state.players.length > 0) {
            const curr = state.players[state.currentTurnPlayerIndex];
            const isMyTurn = curr && curr.id === myPlayerId;
            turnIndicator.innerHTML = `Vez de: <strong style="color:${isMyTurn ? 'var(--neon-green)' : 'var(--neon-blue)'}; font-size:14px;">${curr.name}</strong> ${isMyTurn ? '<span style="background:var(--neon-green); color:#000; padding:2px 6px; border-radius:4px; font-weight:800; margin-left:6px;">👉 SUA VEZ! SELECIONE UMA CARTA E CLIQUE NO [+]</span>' : '<span style="color:var(--text-muted); font-size:12px; margin-left:6px;">(Aguardando jogada do amigo...)</span>'}`;
        }

        renderGridCanvas(state);
        renderPlayerHand(state);
    }

    function renderGridCanvas(state) {
        if (!gridCanvas) return;
        gridCanvas.innerHTML = '';

        const grid = state.board.grid;
        const placedKeys = Object.keys(grid);

        let minX = 0, maxX = 0, minY = 0, maxY = 0;
        placedKeys.forEach(k => {
            const [x, y] = k.split(',').map(Number);
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        });

        const startX = minX - 1;
        const endX = maxX + 1;
        const startY = maxY + 1;
        const endY = minY - 1;

        const cols = endX - startX + 1;
        const rows = startY - endY + 1;

        gridCanvas.style.gridTemplateColumns = `repeat(${cols}, 84px)`;
        gridCanvas.style.gridTemplateRows = `repeat(${rows}, 114px)`;

        const myPlayer = state.players.find(p => p.id === myPlayerId) || state.players[state.currentTurnPlayerIndex];
        let selectedCard = null;
        if (myPlayer && selectedCardUid) {
            selectedCard = myPlayer.hand.find(c => c.uid === selectedCardUid);
        }

        for (let y = startY; y >= endY; y--) {
            for (let x = startX; x <= endX; x++) {
                const key = `${x},${y}`;
                const node = grid[key];

                if (node) {
                    // Carta Já Colocada na Mesa
                    const tile = document.createElement('div');
                    let statusClass = node.status || 'active';
                    if (node.card.id === 'gen_12v') statusClass = 'generator';

                    tile.className = `grid-card-tile ${statusClass}`;
                    tile.style.transform = `rotate(${node.card.rotation || 0}deg)`;
                    tile.innerHTML = typeof renderCardSvg === 'function' ? renderCardSvg(node.card) : `<div style="font-size:10px; color:#fff;">${node.card.name}</div>`;

                    gridCanvas.appendChild(tile);
                } else {
                    // Posição Vazia
                    if (selectedCard) {
                        const validation = engine.isValidPlacement(selectedCard, x, y, currentSelectedRotation);
                        if (validation.valid) {
                            const slot = document.createElement('div');
                            slot.className = 'grid-slot-valid';
                            slot.innerHTML = `<span>+</span><div style="font-size:8px; font-weight:700;">(${x},${y})</div>`;

                            slot.addEventListener('click', () => {
                                p2pManager.sendAction('PLAY_CARD', {
                                    playerId: myPlayer.id,
                                    cardUid: selectedCard.uid,
                                    x,
                                    y,
                                    rotation: currentSelectedRotation
                                });
                                selectedCardUid = null;
                                currentSelectedRotation = 0;
                                updateVisualAssistant(null);
                            });

                            gridCanvas.appendChild(slot);
                            continue;
                        }
                    }

                    const empty = document.createElement('div');
                    empty.style.width = '84px';
                    empty.style.height = '114px';
                    empty.style.opacity = '0.05';
                    gridCanvas.appendChild(empty);
                }
            }
        }
    }

    function renderPlayerHand(state) {
        if (!playerHandEl) return;
        playerHandEl.innerHTML = '';

        const myPlayer = state.players.find(p => p.id === myPlayerId) || state.players[state.currentTurnPlayerIndex];
        if (!myPlayer) return;

        myPlayer.hand.forEach(card => {
            const isSelected = card.uid === selectedCardUid;
            const tile = document.createElement('div');
            tile.className = `hand-card-tile ${isSelected ? 'selected' : ''}`;

            const svgHtml = typeof renderCardSvg === 'function' ? renderCardSvg(card) : '';

            tile.innerHTML = `
                <div style="width:100%; height:82px; overflow:hidden; border-radius:4px; transform:rotate(${isSelected ? currentSelectedRotation : 0}deg); transition:transform 0.15s ease;">
                    ${svgHtml}
                </div>
                <div style="font-size:9px; font-weight:800; color:var(--copper-bright); margin-top:2px; text-align:center;">${card.badge}</div>
                ${isSelected ? `
                    <button class="btn-primary btn-rotate-hand" style="padding:2px 4px; font-size:9.5px; width:100%; margin-top:2px;">
                        🔄 Girar (${currentSelectedRotation}°)
                    </button>
                ` : ''}
            `;

            tile.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-rotate-hand') || e.target.closest('.btn-rotate-hand')) {
                    currentSelectedRotation = (currentSelectedRotation + 90) % 360;
                    updateVisualAssistant(card);
                    renderGameState(engine.gameState);
                    return;
                }

                if (selectedCardUid === card.uid) {
                    selectedCardUid = null;
                    currentSelectedRotation = 0;
                    updateVisualAssistant(null);
                } else {
                    selectedCardUid = card.uid;
                    currentSelectedRotation = 0;
                    updateVisualAssistant(card);
                }
                renderGameState(engine.gameState);
            });

            playerHandEl.appendChild(tile);
        });
    }

    function updateVisualAssistant(card) {
        if (!assistantText) return;
        if (!card) {
            assistantText.textContent = 'Selecione uma carta da sua mão para ver a rotação e os slots (+) disponíveis na mesa.';
            if (assistantPill) assistantPill.style.display = 'none';
            return;
        }

        if (assistantPill) assistantPill.style.display = 'block';

        if (card.type === 'resistor') {
            assistantText.innerHTML = `🟢 <strong>${card.name} (${currentSelectedRotation}°)</strong>: Adiciona <strong>+${card.r}Ω</strong> na linha. Conecte nos slots verdes (+) para reduzir a voltagem!`;
            if (assistantPill) assistantPill.textContent = `+${card.r}Ω // Girado: ${currentSelectedRotation}°`;
        } else if (card.type === 'equipment') {
            assistantText.innerHTML = `💡 <strong>${card.name}</strong>: Precisa de exatamente <strong>${card.vNom}V</strong>. Feche o circuito depois de colocar +${card.targetAddR}Ω de resistores!`;
            if (assistantPill) assistantPill.textContent = `Meta: ${card.vNom}V (+${card.targetAddR}Ω)`;
        } else if (card.type === 'gnd') {
            assistantText.innerHTML = `⏚ <strong>${card.name}</strong>: Fecha o circuito no 0.0V e <strong>aciona o teste da Lei de Ohm na hora</strong>!`;
            if (assistantPill) assistantPill.textContent = `ATERRAMENTO 0V`;
        } else if (card.type === 'fuse') {
            assistantText.innerHTML = `🛡️ <strong>${card.name}</strong>: Se a voltagem for maior que a necessária, o fusível queima para proteger o equipamento!`;
            if (assistantPill) assistantPill.textContent = `FUSÍVEL 1A`;
        } else if (card.type === 'node_y') {
            assistantText.innerHTML = `🔀 <strong>${card.name}</strong>: Divide o circuito em <strong>2 caminhos novos de 12V</strong> (Efeito Hidra do Bandido)!`;
            if (assistantPill) assistantPill.textContent = `BIFURCAÇÃO T`;
        } else {
            assistantText.textContent = `Componente [${card.name}]. Clique no slot (+) verde para posicionar!`;
        }
    }

    // -------------------------------------------------------------
    // MÓDULO 2: HUB DE PLANEJAMENTO DA PESQUISA CIENTÍFICA & BRAÇO 1
    // -------------------------------------------------------------
    function renderPesquisa() {
        const container = document.getElementById('pesquisa-container');
        if (!container) return;

        const proposals = researchManager.proposals;
        const maxVotes = Math.max(...proposals.map(p => p.votes));
        const steps = researchManager.steps || [];
        const rationale = researchManager.rationale || { cards: [] };
        const portfolio = researchManager.portfolio || [];

        container.innerHTML = `
            <!-- HEADER DA PESQUISA -->
            <div class="guide-card" style="border-left: 4px solid var(--neon-green); margin-bottom: 20px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                    <div>
                        <h2 style="font-size:18px; font-weight:900; color:#fff;">🔬 Central da Pesquisa & Decisão do Braço 1</h2>
                        <div style="font-size:12.5px; color:var(--text-muted); margin-top:3px;">
                            Amostra: <strong>N = 75 Estudantes (3º Ano Ensino Médio)</strong> | Local: <strong>Escola Pública Estadual</strong>
                        </div>
                    </div>
                    <span class="guide-badge-pill" style="background:rgba(34,197,94,0.15); color:var(--neon-green); border-color:var(--neon-green);">Delineamento Blindado USP</span>
                </div>
                <div style="font-size:13px; color:#cbd5e1; line-height:1.5; margin-top:10px; background:#050a14; padding:10px 12px; border-radius:6px; border:1px solid #1e293b;">
                    <strong>🎯 Nossa Hipótese Central:</strong> O jogo <strong>VOLTZ</strong> alcança ganho de aprendizagem de Hake superior (g ≥ 0.65) e taxa de sucesso em bancada (>80%), destravando especialmente quem tinha nota baixa no pré-teste.
                </div>
            </div>

            <!-- PORTFÓLIO DE 4 ESTUDOS EXPERIMENTAIS (DIMENSIONAMENTO & PODER ESTATÍSTICO) -->
            <div class="guide-card" style="border-top: 3px solid var(--neon-purple); margin-bottom: 24px;">
                <div style="margin-bottom: 14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                        <div>
                            <h3 style="font-size:16px; font-weight:900; color:var(--neon-purple); display:flex; align-items:center; gap:8px;">
                                <span>📊</span> Portfólio dos 4 Estudos Experimentais (Amostra Escassa N=75)
                            </h3>
                            <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                                Delineamento quase-experimental paralelo + sub-estudos aninhados de bancada, cognição e retenção tardia:
                            </p>
                        </div>
                        <span class="guide-badge-pill" style="background:rgba(192,132,252,0.15); color:var(--neon-purple); border-color:var(--neon-purple);">Poder Estatístico 1-β ≥ 86.9%</span>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
                    ${portfolio.map(st => `
                        <div style="background:#050a14; border:1px solid #1e293b; border-left:3px solid ${st.color}; padding:12px; border-radius:6px;">
                            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                                <div style="font-size:13px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
                                    <span>${st.icon}</span> ${st.title}
                                </div>
                                <span class="guide-badge-pill" style="color:${st.color}; border-color:${st.color}; font-size:10px;">${st.badge}</span>
                            </div>
                            <div style="font-size:11px; color:var(--neon-amber); margin-bottom:6px; font-weight:700;">
                                ⚡ Poder Estatístico: <span>${st.power}</span> | Métrica: <span>${st.metric}</span>
                            </div>
                            <div style="font-size:11.5px; color:#cbd5e1; margin-bottom:6px; line-height:1.4;">
                                <strong>❓ Pergunta:</strong> ${st.question}
                            </div>
                            <div style="font-size:11px; background:rgba(0,0,0,0.4); padding:6px 8px; border-radius:4px; margin-bottom:6px; color:#94a3b8;">
                                <strong>🛠️ Procedimento:</strong> ${st.procedure}
                            </div>
                            <div style="font-size:11.5px; color:var(--neon-green); background:rgba(34,197,94,0.08); padding:6px 8px; border-radius:4px;">
                                <strong>🎯 Hipótese H1:</strong> ${st.hypothesis}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- MÓDULO 1: GUIA PASSO A PASSO DA PESQUISA NA ESCOLA -->
            <div class="guide-card" style="border-top: 3px solid var(--neon-blue); margin-bottom: 24px;">
                <div style="margin-bottom: 14px;">
                    <h3 style="font-size:16px; font-weight:900; color:var(--neon-blue); display:flex; align-items:center; gap:8px;">
                        <span>🏫</span> Como Será a Nossa Pesquisa na Escola (Passo a Passo)
                    </h3>
                    <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                        Tudo o que faremos no dia da aplicação com a turma de 75 alunos, minuto a minuto:
                    </p>
                </div>

                <!-- OS 5 PASSOS DA APLICAÇÃO -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:16px;">
                    ${steps.map(s => `
                        <div style="background:#050a14; border:1px solid #1e293b; border-left:3px solid ${s.color}; padding:12px; border-radius:6px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                <div style="font-size:13px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
                                    <span>${s.icon}</span> ${s.title}
                                </div>
                                <span class="guide-badge-pill" style="color:${s.color}; border-color:${s.color}; font-size:10px;">${s.badge}</span>
                            </div>
                            <div style="font-size:12px; color:#cbd5e1; margin-bottom:6px; line-height:1.45;">
                                ${s.whatWeDo}
                            </div>
                            <div style="font-size:11.5px; color:var(--neon-green); margin-bottom:4px; background:rgba(34,197,94,0.08); padding:4px 8px; border-radius:4px;">
                                <strong>🎯 Por que fazemos:</strong> ${s.whyItMatters}
                            </div>
                            <div style="font-size:11px; color:#94a3b8; font-style:italic;">
                                💡 <strong>Dica Prática:</strong> ${s.practicalTip}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- POR QUE CRIAMOS 3 JOGOS -->
                <div style="background:#0a101d; border:1px solid #2d4160; padding:14px; border-radius:8px;">
                    <h4 style="font-size:14px; font-weight:800; color:var(--copper-bright); margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                        <span>🎲</span> ${rationale.title}
                    </h4>
                    <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">${rationale.subtitle}</p>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:10px;">
                        ${rationale.cards.map(c => `
                            <div style="background:#050a14; padding:10px; border-radius:6px; border:1px solid #1e293b;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                    <strong style="font-size:12.5px; color:#fff; display:flex; align-items:center; gap:4px;">
                                        <span>${c.icon}</span> ${c.title}
                                    </strong>
                                    <span class="guide-badge-pill" style="font-size:9.5px;">${c.tag}</span>
                                </div>
                                <p style="font-size:11.5px; color:#cbd5e1; line-height:1.4;">${c.text}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- SEÇÃO A: CENTRAL DE DECISÃO DO BRAÇO 1 (PROPOSTAS & VOTAÇÃO) -->
            <div style="margin-bottom: 24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                    <div>
                        <h3 style="font-size:16px; font-weight:900; color:#fff;">🗳️ Votação da Equipe: Qual Jogo Produzir para o Braço 1?</h3>
                        <p style="font-size:12px; color:var(--text-muted);">O Braço 2 já é o VOLTZ. Escolha a proposta que gera o melhor contraste científico na sala de aula:</p>
                    </div>
                    <span style="font-size:11px; background:#1e293b; color:var(--copper-bright); padding:4px 10px; border-radius:12px; font-weight:700; border:1px solid var(--copper-dark);">
                        Votação da Equipe Ativa
                    </span>
                </div>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:16px;">
                    ${proposals.map(prop => {
                        const isLeading = prop.votes === maxVotes && prop.votes > 0;
                        return `
                            <div class="guide-card" style="border-top: 3px solid ${prop.color}; position:relative;">
                                ${isLeading ? `
                                    <div style="position:absolute; top:-10px; right:12px; background:${prop.color}; color:#000; font-size:10px; font-weight:900; padding:2px 8px; border-radius:8px; text-transform:uppercase;">
                                        ⭐ Mais Votada
                                    </div>
                                ` : ''}
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                                    <h4 style="font-size:14.5px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
                                        <span>${prop.icon}</span> ${prop.name}
                                    </h4>
                                    <span class="guide-badge-pill" style="color:${prop.color}; border-color:${prop.color}; font-size:10px;">${prop.badge}</span>
                                </div>
                                <p style="font-size:12px; color:#cbd5e1; margin-bottom:10px; line-height:1.45;">${prop.summary}</p>
                                
                                <div style="font-size:11.5px; background:rgba(0,0,0,0.4); padding:8px; border-radius:6px; margin-bottom:8px;">
                                    <strong style="color:${prop.color};">🎮 Como se joga:</strong> ${prop.comoJoga}
                                </div>
                                <div style="font-size:11.5px; background:rgba(0,0,0,0.4); padding:8px; border-radius:6px; margin-bottom:8px;">
                                    <strong style="color:var(--neon-green);">⚔️ Contraste com VOLTZ:</strong> ${prop.contrasteVoltz}
                                </div>
                                <div style="font-size:11.5px; background:rgba(0,0,0,0.4); padding:8px; border-radius:6px; margin-bottom:12px;">
                                    <strong style="color:var(--neon-blue);">🎯 Na Banca da USP:</strong> ${prop.opiniaoBanca}
                                </div>

                                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #1e293b; padding-top:10px;">
                                    <span style="font-size:12px; color:#94a3b8; font-weight:700;">
                                        Votos: <strong style="color:#fff; font-size:14px;">${prop.votes}</strong>
                                    </span>
                                    <button class="btn btn-sm btn-vote" data-id="${prop.id}" style="background:${prop.color}; color:#000; font-weight:800; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:11.5px;">
                                        🗳️ Votar Nesta Proposta
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- SEÇÃO B: CALCULADORA INTERATIVA DE GANHO DE HAKE & ESTRATIFICAÇÃO -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-bottom:24px;">
                <!-- CALCULADORA DE HAKE -->
                <div class="guide-card" style="border-left: 3px solid var(--neon-amber);">
                    <div style="font-size:15px; font-weight:800; color:#fff; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <span>🧮</span> Calculadora Interativa de Ganho de Hake (g)
                    </div>
                    <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">
                        Simule a nota de um aluno antes e depois da aula para ver o índice que mede o aprendizado real:
                    </p>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:12px;">
                        <div>
                            <label style="font-size:11px; color:#cbd5e1; font-weight:700; display:block; margin-bottom:4px;">Nota Pré-Teste (%):</label>
                            <input type="number" id="hake-input-pre" value="20" min="0" max="99" style="width:100%; background:#050a14; border:1px solid #334155; color:#fff; padding:6px 8px; border-radius:4px; font-size:13px;">
                        </div>
                        <div>
                            <label style="font-size:11px; color:#cbd5e1; font-weight:700; display:block; margin-bottom:4px;">Nota Pós-Teste (%):</label>
                            <input type="number" id="hake-input-pos" value="80" min="1" max="100" style="width:100%; background:#050a14; border:1px solid #334155; color:#fff; padding:6px 8px; border-radius:4px; font-size:13px;">
                        </div>
                    </div>
                    <div id="hake-calc-result" style="background:#050a14; border:1px solid var(--neon-amber); padding:10px; border-radius:6px; text-align:center;">
                        <div style="font-size:11px; color:#94a3b8;">Ganho Normalizado de Hake:</div>
                        <div id="hake-calc-val" style="font-size:20px; font-weight:900; color:var(--neon-amber); margin:2px 0;">g = 0.750</div>
                        <div id="hake-calc-badge" style="font-size:11px; font-weight:700; color:var(--neon-green);">🌟 Alto Ganho (g ≥ 0.70)</div>
                    </div>
                </div>

                <!-- ESTRATIFICAÇÃO POR NÍVEL DE PROFICIÊNCIA -->
                <div class="guide-card" style="border-left: 3px solid var(--neon-blue);">
                    <div style="font-size:15px; font-weight:800; color:#fff; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                        <span>📊</span> Divisão da Turma em 3 Níveis (Estratificação)
                    </div>
                    <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">
                        Para a pesquisa ser justa, cada um dos 3 grupos recebe alunos de todos os níveis:
                    </p>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <div style="font-size:11.5px; background:rgba(239,68,68,0.1); border-left:3px solid #ef4444; padding:6px 8px; border-radius:4px;">
                            <strong style="color:#ef4444;">🔴 Nível Inicial (&lt; 40%):</strong> Alunos que acham que a corrente "gasta" no 1º resistor.
                        </div>
                        <div style="font-size:11.5px; background:rgba(245,158,11,0.1); border-left:3px solid #f59e0b; padding:6px 8px; border-radius:4px;">
                            <strong style="color:#f59e0b;">🟡 Nível Médio (40% - 70%):</strong> Sabem aplicar V = R·I mas erram divisores e curto-circuito.
                        </div>
                        <div style="font-size:11.5px; background:rgba(34,197,94,0.1); border-left:3px solid #22c55e; padding:6px 8px; border-radius:4px;">
                            <strong style="color:#22c55e;">🟢 Nível Avançado (&gt; 70%):</strong> Compreendem conservação de carga e circuitos mistos.
                        </div>
                    </div>
                    <div style="font-size:11px; color:#94a3b8; margin-top:8px;">
                        💡 <em>Por que a banca adora:</em> Prova que o VOLTZ salva especialmente os alunos do Nível Inicial!
                    </div>
                </div>
            </div>

            <!-- SEÇÃO C: VISUALIZADOR INTERATIVO DO BANCO DIRECT (PRÉ VS PÓS) -->
            <div class="guide-card" style="border-top: 3px solid var(--neon-purple); margin-bottom: 20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                    <div>
                        <h3 style="font-size:16px; font-weight:900; color:#fff;">📝 Visualizador do Teste Padronizado (DIRECT)</h3>
                        <p style="font-size:12px; color:var(--text-muted);">Veja as perguntas rápidas que aplicamos antes e depois de jogar:</p>
                    </div>
                    <div style="display:flex; gap:6px;">
                        <button id="btn-tab-pre" class="btn btn-sm" style="background:var(--neon-blue); color:#000; font-weight:800; padding:4px 10px; border-radius:4px; font-size:11px;">Pré-Teste (T0)</button>
                        <button id="btn-tab-pos" class="btn btn-sm" style="background:#1e293b; color:#cbd5e1; font-weight:700; padding:4px 10px; border-radius:4px; font-size:11px;">Pós-Teste Isomórfico (T1)</button>
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

        // Lógica da Calculadora de Hake
        const inPre = document.getElementById('hake-input-pre');
        const inPos = document.getElementById('hake-input-pos');
        const calcVal = document.getElementById('hake-calc-val');
        const calcBadge = document.getElementById('hake-calc-badge');

        function updateHakeCalc() {
            if (!inPre || !inPos || !calcVal || !calcBadge) return;
            const pre = Math.max(0, Math.min(99, parseFloat(inPre.value) || 0));
            const pos = Math.max(0, Math.min(100, parseFloat(inPos.value) || 0));
            if (pos <= pre) {
                calcVal.textContent = 'g = 0.000';
                calcBadge.textContent = '⚠️ Sem Ganho (Nota pós menor ou igual ao pré)';
                calcBadge.style.color = '#ef4444';
                return;
            }
            const g = (pos - pre) / (100 - pre);
            calcVal.textContent = `g = ${g.toFixed(3)}`;
            if (g >= 0.70) {
                calcBadge.textContent = '🌟 Alto Ganho (g ≥ 0.70) — Padrão Ouro!';
                calcBadge.style.color = 'var(--neon-green)';
            } else if (g >= 0.30) {
                calcBadge.textContent = '⚡ Médio Ganho (0.30 ≤ g < 0.70)';
                calcBadge.style.color = 'var(--neon-amber)';
            } else {
                calcBadge.textContent = '⚠️ Baixo Ganho (g < 0.30) — Nível Tradicional';
                calcBadge.style.color = '#ef4444';
            }
        }

        if (inPre && inPos) {
            inPre.addEventListener('input', updateHakeCalc);
            inPos.addEventListener('input', updateHakeCalc);
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
                <div style="background:#050a14; border:1px solid #1e293b; padding:10px 12px; border-radius:6px;">
                    <div style="font-size:12.5px; font-weight:800; color:#fff; margin-bottom:4px;">${item.title}</div>
                    <div style="font-size:12px; color:#cbd5e1; margin-bottom:6px;">${item.question}</div>
                    <div style="font-size:11.5px; color:var(--neon-green); margin-bottom:3px;">
                        <strong>✅ Resposta Correta:</strong> ${item.correctAnswer}
                    </div>
                    <div style="font-size:11px; color:#94a3b8;">
                        <strong>❌ Pegadinha / Erro Comum:</strong> ${item.distractor}
                    </div>
                </div>
            `).join('');
        }

        if (btnTabPre && btnTabPos) {
            btnTabPre.addEventListener('click', () => {
                activeDirectTab = 'pre';
                btnTabPre.style.background = 'var(--neon-blue)';
                btnTabPre.style.color = '#000';
                btnTabPos.style.background = '#1e293b';
                btnTabPos.style.color = '#cbd5e1';
                renderDirectItems();
            });
            btnTabPos.addEventListener('click', () => {
                activeDirectTab = 'pos';
                btnTabPos.style.background = 'var(--neon-purple)';
                btnTabPos.style.color = '#fff';
                btnTabPre.style.background = '#1e293b';
                btnTabPre.style.color = '#cbd5e1';
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

        // Renderiza a Matriz de Prioridades em 3 Níveis (Nível 1, 2 e 3)
        if (matrixContainer) {
            matrixContainer.innerHTML = warRoom.matrix.map(level => `
                <div class="guide-card" style="border-top: 3px solid ${level.color}; margin-bottom: 14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <h3 style="font-size:14.5px; font-weight:800; color:#fff;">${level.title}</h3>
                        <span class="guide-badge-pill" style="color:${level.color}; border-color:${level.color}; font-size:10px;">${level.badge}</span>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:8px;">
                        ${level.tasks.map(t => `
                            <div style="background:#050a14; border:1px solid #1e293b; padding:10px 12px; border-radius:6px; display:flex; align-items:flex-start; gap:10px;">
                                <input type="checkbox" data-task="${t.id}" ${t.status ? 'checked' : ''} style="width:18px; height:18px; margin-top:2px; accent-color:${level.color}; cursor:pointer;">
                                <div style="flex:1;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
                                        <strong style="font-size:13px; color:${t.status ? '#94a3b8' : '#fff'}; text-decoration:${t.status ? 'line-through' : 'none'};">
                                            ${t.title}
                                        </strong>
                                        <span style="font-size:11px; color:var(--copper-bright); font-weight:700;">Responsável: ${t.responsible}</span>
                                    </div>
                                    <div style="font-size:11.5px; color:#94a3b8; margin-top:3px; line-height:1.4;">
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
                <div class="guide-card" style="border-left: 3px solid ${j.color}; padding:12px 14px; margin-bottom:10px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <div style="font-size:13.5px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
                            <span>${j.icon}</span> <strong>${j.stage}:</strong> ${j.title}
                        </div>
                        <span class="guide-badge-pill" style="color:${j.color}; border-color:${j.color}; font-size:10px;">${j.badge}</span>
                    </div>
                    <ul style="font-size:12px; color:#cbd5e1; line-height:1.5; padding-left:18px;">
                        ${j.items.map(it => `<li>${it}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }

        // Renderiza o Roteiro do Pitch Oral de 5 Minutos
        const pitchContainer = document.getElementById('pitch-script-container');
        if (pitchContainer && warRoom.pitch) {
            pitchContainer.innerHTML = warRoom.pitch.map(p => `
                <div style="background:#050a14; border-left:3px solid var(--copper-bright); padding:10px 12px; border-radius:4px; margin-bottom:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                        <strong style="color:var(--copper-bright); font-size:12.5px;">⏱️ ${p.minuto} — ${p.foco}</strong>
                    </div>
                    <div style="font-size:12px; color:#cbd5e1; line-height:1.45; font-style:italic;">
                        "${p.fala}"
                    </div>
                </div>
            `).join('');
        }
    }

    // Cronômetro Regressivo até a Data Limite da FEBRACE (02/10/2026)
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
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                    <div>
                        <div style="font-weight:800; font-size:15px; color:var(--copper-bright);">${e.title}</div>
                        <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📅 ${e.date} | Tipo: <strong>${e.type}</strong> | Feito por: <strong>${e.author}</strong></div>
                    </div>
                    <button class="btn-secondary" style="color:var(--neon-red); border-color:rgba(239,68,68,0.3); font-size:11px;" data-del="${e.id}">Excluir</button>
                </div>
                <div style="font-size:12.5px; line-height:1.5; color:#cbd5e1; margin-top:6px;">${e.description}</div>
                ${e.findings ? `<div style="font-size:12px; color:var(--neon-blue); margin-top:6px; background:#050a14; padding:6px 10px; border-radius:4px;"><strong>💡 O que aprendemos:</strong> ${e.findings}</div>` : ''}
                ${e.actionItems ? `<div style="font-size:12px; color:var(--neon-green); margin-top:4px; background:#050a14; padding:6px 10px; border-radius:4px;"><strong>🎯 Próximo passo:</strong> ${e.actionItems}</div>` : ''}
            `;

            const btnDel = div.querySelector('button[data-del]');
            if (btnDel) {
                btnDel.addEventListener('click', () => {
                    if (confirm('Deseja excluir esta anotação do Diário de Bordo?')) {
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
            alert('Anotação salva com sucesso no Diário de Bordo!');
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

    // RENDERIZAÇÃO DOS MÓDULOS DA BANCA (MÓDULOS 3 E 4)
    function renderBanca() {
        // Módulo 3: O Que a Banca Quer Ver nos Relatórios
        const reqsContainer = document.getElementById('banca-requirements-container');
        if (reqsContainer && bancaCoach.reportReqs) {
            reqsContainer.innerHTML = bancaCoach.reportReqs.map(r => `
                <div style="background:#050a14; border-left:3px solid ${r.color}; padding:10px 12px; border-radius:6px; margin-bottom:10px;">
                    <div style="font-weight:800; font-size:13px; color:#fff; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
                        <span>${r.icon}</span> ${r.category}
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        ${r.items.map(it => `
                            <div style="font-size:11.5px; background:rgba(0,0,0,0.3); padding:6px 8px; border-radius:4px; line-height:1.4;">
                                <strong style="color:${r.color};">${it.topic}:</strong>
                                <span style="color:#cbd5e1;"> ${it.detail}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        // Módulo 4: Simulador de Objeções da Banca & Guia de Defesa
        const objContainer = document.getElementById('banca-objections-container');
        if (objContainer && bancaCoach.objections) {
            objContainer.innerHTML = bancaCoach.objections.map(obj => `
                <details style="background:#050a14; border:1px solid #1e293b; border-radius:6px; margin-bottom:8px; padding:8px 12px;">
                    <summary style="font-size:12.5px; font-weight:800; color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:space-between;">
                        <span>${obj.icon} ${obj.pergunta}</span>
                        <span class="guide-badge-pill" style="font-size:9.5px; color:var(--neon-amber); border-color:var(--neon-amber);">${obj.conceitoChave}</span>
                    </summary>
                    <div style="margin-top:10px; padding-top:8px; border-top:1px solid #1e293b; font-size:12px; line-height:1.45;">
                        <div style="font-size:11px; color:#94a3b8; margin-bottom:4px;">
                            <strong>🧐 Por que o jurado pergunta isso:</strong> ${obj.porQuePerguntam}
                        </div>
                        <div style="background:rgba(34,197,94,0.08); border-left:3px solid var(--neon-green); padding:8px 10px; border-radius:4px; color:#f1f5f9; margin-top:6px;">
                            <strong style="color:var(--neon-green); font-size:11.5px;">💬 Nossa Resposta Científica Ensaiada:</strong><br>
                            "${obj.respostaPerfeita}"
                        </div>
                    </div>
                </details>
            `).join('');
        }

        // Tradutor de Juradês
        const bancaContainer = document.getElementById('banca-translator-container');
        if (bancaContainer && bancaCoach.glossary) {
            bancaContainer.innerHTML = '';
            bancaCoach.glossary.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'translator-card';
                card.innerHTML = `
                    <div class="translator-jurado">
                        <span>🎓 O Jurado Pergunta:</span>
                        <em>"${item.juradoDiz}"</em>
                    </div>
                    <div class="translator-real">
                        <div style="font-size:11px; font-weight:800; color:var(--copper-bright); margin-bottom:2px;">🗣️ O que ele realmente quer saber:</div>
                        <div style="font-weight:600; color:#fff; margin-bottom:8px;">${item.traducao}</div>
                        <div style="font-size:11px; font-weight:800; color:var(--neon-green); margin-bottom:2px;">💡 Resposta na ponta da língua:</div>
                        <div style="color:#cbd5e1;">${item.respostaNaPontaDaLingua}</div>
                    </div>
                `;
                bancaContainer.appendChild(card);
            });
        }
    }
});
