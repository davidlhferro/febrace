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
    // MÓDULO 2: HUB DE PLANEJAMENTO DA PESQUISA CIENTÍFICA
    // -------------------------------------------------------------
    function renderPesquisa() {
        const container = document.getElementById('pesquisa-container');
        if (!container) return;

        const p = researchManager.data;
        container.innerHTML = `
            <div class="guide-card" style="border-left: 4px solid var(--neon-green); margin-bottom: 16px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                    <div>
                        <h2 style="font-size:18px; font-weight:900; color:#fff;">🔬 ${p.overview.title}</h2>
                        <div style="font-size:12.5px; color:var(--text-muted); margin-top:3px;">
                            Amostra: <strong>${p.overview.sample}</strong> | Local: <strong>${p.overview.school}</strong> | Duração: <strong>${p.overview.duration}</strong>
                        </div>
                    </div>
                    <span class="guide-badge-pill" style="background:rgba(34,197,94,0.15); color:var(--neon-green); border-color:var(--neon-green);">Metodologia Blindada</span>
                </div>
                <div style="font-size:13px; color:#cbd5e1; line-height:1.5; margin-top:10px; background:#050a14; padding:10px 12px; border-radius:6px; border:1px solid #1e293b;">
                    <strong>🎯 Hipótese da Pesquisa:</strong> ${p.overview.hypothesis}
                </div>
            </div>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px;">
                ${p.pillars.map(pillar => `
                    <div class="guide-card" style="border-top: 3px solid ${pillar.color};">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                            <h3 style="font-size:15px; font-weight:800; color:#fff; display:flex; align-items:center; gap:6px;">
                                <span>${pillar.icon}</span> ${pillar.title}
                            </h3>
                            <span class="guide-badge-pill" style="color:${pillar.color}; border-color:${pillar.color};">${pillar.badge}</span>
                        </div>
                        <div style="font-size:12.5px; color:#cbd5e1; margin-bottom:10px; line-height:1.45;">
                            ${pillar.summary}
                        </div>

                        ${pillar.formula ? `
                            <div style="background:#050a14; border:1px solid ${pillar.color}; padding:8px 12px; border-radius:6px; font-family:'Fira Code', monospace; font-size:13px; font-weight:800; color:${pillar.color}; text-align:center; margin-bottom:10px;">
                                ${pillar.formula}
                            </div>
                        ` : ''}

                        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px;">
                            ${pillar.details.map(d => `
                                <div style="font-size:12px; background:rgba(0,0,0,0.35); padding:6px 8px; border-radius:4px; line-height:1.4;">
                                    <strong style="color:${pillar.color};">${d.label}</strong> ${d.text}
                                </div>
                            `).join('')}
                        </div>

                        <div class="guide-section-block" style="border-left-color:${pillar.color}; margin-top:8px;">
                            <div class="guide-section-label" style="color:${pillar.color};">🎯 Por que a banca da USP valoriza isso?</div>
                            <div class="guide-section-text">${pillar.whyJudgesLove}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // -------------------------------------------------------------
    // MÓDULO 3: GUIA DA JORNADA FEBRACE (AS 4 ETAPAS & CHECKLIST)
    // -------------------------------------------------------------
    function renderWarRoom() {
        const scoreEl = document.getElementById('warroom-score');
        const barFill = document.getElementById('warroom-bar-fill');
        const journeyContainer = document.getElementById('journey-stages-container');
        const checklistContainer = document.getElementById('checklist-container');
        const taskTableBody = document.getElementById('task-table-body');

        if (scoreEl) {
            const score = warRoom.getReadinessScore();
            scoreEl.textContent = `${score}%`;
            if (barFill) barFill.style.width = `${score}%`;
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

        // Renderiza os 5 Cards de Documentos Obrigatórios
        if (checklistContainer) {
            checklistContainer.innerHTML = '';
            warRoom.items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'guide-card';
                card.innerHTML = `
                    <div class="guide-card-header">
                        <div class="guide-card-title">
                            <input type="checkbox" ${item.status ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--neon-green); cursor:pointer;">
                            <span>${item.title}</span>
                        </div>
                        <span class="guide-badge-pill">${item.tag}</span>
                    </div>

                    <div class="guide-section-block">
                        <div class="guide-section-label">❓ O que é isso?</div>
                        <div class="guide-section-text">${item.queE}</div>
                    </div>

                    <div class="guide-section-block" style="border-left-color:var(--neon-blue);">
                        <div class="guide-section-label" style="color:var(--neon-blue);">🎯 Por que a banca da USP pede isso?</div>
                        <div class="guide-section-text">${item.porQuePede}</div>
                    </div>

                    <div class="guide-section-block" style="border-left-color:var(--neon-green);">
                        <div class="guide-section-label" style="color:var(--neon-green);">🛠️ Como a gente faz o nosso na prática?</div>
                        <div class="guide-section-text">${item.comoFazer}</div>
                    </div>
                `;

                const chk = card.querySelector('input');
                chk.addEventListener('change', () => {
                    const newScore = warRoom.toggleItem(item.id);
                    if (scoreEl) scoreEl.textContent = `${newScore}%`;
                    if (barFill) barFill.style.width = `${newScore}%`;
                    renderWarRoom();
                });

                checklistContainer.appendChild(card);
            });
        }

        if (taskTableBody) {
            taskTableBody.innerHTML = warRoom.tasks.map(t => `
                <tr>
                    <td><strong>${t.task}</strong></td>
                    <td><span style="color:var(--copper-bright); font-weight:700;">${t.responsible}</span></td>
                    <td>${t.status}</td>
                </tr>
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
    // MÓDULO 4: DIÁRIO DE BORDO & TRADUTOR DA BANCA USP
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

    function renderBanca() {
        const bancaContainer = document.getElementById('banca-translator-container');
        if (!bancaContainer) return;

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
});
