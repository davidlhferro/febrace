/**
 * PORTAL VOLTZ & CENTRAL FEBRACE — Controlador Mestre 2D (Grade Canônica Bandido)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Instanciação dos Motores
    const engine = new VoltzEngine();
    const warRoom = new VoltzWarRoom();
    const diarioManager = new VoltzDiarioManager();
    const bancaCoach = new VoltzBancaCoach();

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

            if (targetId === 'tab-warroom') renderWarRoom();
            if (targetId === 'tab-diario') renderDiario();
            if (targetId === 'tab-banca') renderBanca();
        });
    });

    // -------------------------------------------------------------
    // MÓDULO 1: ARENA MULTIPLAYER COM GRADE 2D
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
    // RENDERIZAÇÃO DA GRADE 2D & MÃO DO JOGADOR
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

        // Renderiza a Grade 2D
        renderGridCanvas(state);

        // Renderiza a Mão do Jogador Atual
        renderPlayerHand(state);
    }

    function renderGridCanvas(state) {
        if (!gridCanvas) return;
        gridCanvas.innerHTML = '';

        const grid = state.board.grid;
        const placedKeys = Object.keys(grid);

        // Calcula limites da grade
        let minX = 0, maxX = 0, minY = 0, maxY = 0;
        placedKeys.forEach(k => {
            const [x, y] = k.split(',').map(Number);
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        });

        // Expande 1 casa ao redor para os slots vazios (+)
        const startX = minX - 1;
        const endX = maxX + 1;
        const startY = maxY + 1; // Y cresce para cima
        const endY = minY - 1;

        const cols = endX - startX + 1;
        const rows = startY - endY + 1;

        gridCanvas.style.gridTemplateColumns = `repeat(${cols}, 84px)`;
        gridCanvas.style.gridTemplateRows = `repeat(${rows}, 114px)`;

        // Pega a carta selecionada na mão
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

                    const ports = node.card.currentPorts || node.card.basePorts;
                    tile.innerHTML = `
                        ${ports.top ? '<div class="track-north"></div>' : ''}
                        ${ports.south ? '<div class="track-south"></div>' : ''}
                        ${ports.east ? '<div class="track-east"></div>' : ''}
                        ${ports.west ? '<div class="track-west"></div>' : ''}
                        <div style="font-size:8px; font-weight:800; color:var(--copper-bright); z-index:3; text-align:center;">${node.card.badge || ''}</div>
                        <div style="font-size:22px; text-align:center; z-index:3;">${getCardIcon(node.card)}</div>
                        <div style="font-size:7.5px; font-weight:700; text-align:center; white-space:nowrap; overflow:hidden; z-index:3; color:#f8fafc;">${node.card.name}</div>
                    `;

                    gridCanvas.appendChild(tile);
                } else {
                    // Posição Vazia: Verifica se é um Slot Válido para a carta selecionada
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

                    // Espaço Vazio Normal
                    const empty = document.createElement('div');
                    empty.style.width = '84px';
                    empty.style.height = '114px';
                    empty.style.opacity = '0.1';
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

            tile.innerHTML = `
                <div style="font-size:9px; font-weight:800; color:var(--copper-bright);">${card.badge}</div>
                <div style="font-size:26px; text-align:center; transform:rotate(${isSelected ? currentSelectedRotation : 0}deg); transition:transform 0.15s ease;">${getCardIcon(card)}</div>
                <div style="font-size:9px; font-weight:700; color:#f8fafc; text-align:center;">${card.name}</div>
                ${isSelected ? `
                    <button class="btn-primary btn-rotate-hand" style="padding:2px 6px; font-size:10px; width:100%; margin-top:2px;">
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

    function getCardIcon(card) {
        if (card.type === 'generator') return '⚡';
        if (card.type === 'resistor') return '🟢';
        if (card.type === 'equipment') {
            if (card.id === 'load_led') return '💡';
            if (card.id === 'load_servidor') return '🖥️';
            if (card.id === 'load_sirene') return '🚨';
            if (card.id === 'load_motor') return '💧';
            if (card.id === 'load_tomografo') return '🏥';
            return '💡';
        }
        if (card.type === 'gnd') return '⏚';
        if (card.type === 'fuse') return '🛡️';
        if (card.type === 'node_y') return '🔀';
        if (card.type === 'topology') return '➕';
        return '⚡';
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
    // MÓDULO 2: PAINEL DA FEBRACE (CRONÔMETRO & CARDS EXPLICATIVOS)
    // -------------------------------------------------------------
    function renderWarRoom() {
        const scoreEl = document.getElementById('warroom-score');
        const barFill = document.getElementById('warroom-bar-fill');
        const checklistContainer = document.getElementById('checklist-container');
        const taskTableBody = document.getElementById('task-table-body');

        if (scoreEl) {
            const score = warRoom.getReadinessScore();
            scoreEl.textContent = `${score}%`;
            if (barFill) barFill.style.width = `${score}%`;
        }

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
            const tasks = typeof FEBRACE_TEAM_TASKS_DEFAULT !== 'undefined' ? FEBRACE_TEAM_TASKS_DEFAULT : [];
            taskTableBody.innerHTML = tasks.map(t => `
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
    // MÓDULO 3: DIÁRIO DE BORDO COLETIVO
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

    // -------------------------------------------------------------
    // MÓDULO 4: TRADUTOR DA BANCA USP
    // -------------------------------------------------------------
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
