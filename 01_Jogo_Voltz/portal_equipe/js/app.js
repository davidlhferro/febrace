/**
 * PORTAL VOLTZ & CENTRAL FEBRACE — Controlador Mestre da Aplicação (SPA)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Instanciação dos Motores
    const engine = new VoltzEngine();
    const warRoom = new VoltzWarRoom();
    const diarioManager = new VoltzDiarioManager();
    const bancaCoach = new VoltzBancaCoach();

    let p2pManager = null;
    let selectedCardUid = null;
    let myPlayerId = null;

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
    // MÓDULO 1: ARENA MULTIPLAYER P2P
    // -------------------------------------------------------------
    const p2pStatusEl = document.getElementById('p2p-status');
    const roomCodeDisplay = document.getElementById('room-code-display');
    const logBox = document.getElementById('log-box');
    const playerHandEl = document.getElementById('player-hand');
    const sectorsContainer = document.getElementById('sectors-container');
    const turnIndicator = document.getElementById('turn-indicator');
    const deckCountEl = document.getElementById('deck-count');

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
    const btnSoloStart = document.getElementById('btn-solo-start');
    const btnRefreshHand = document.getElementById('btn-refresh-hand');
    const playerNameInput = document.getElementById('player-name-input');
    const roomCodeInput = document.getElementById('room-code-input');

    if (btnCreateRoom) {
        btnCreateRoom.addEventListener('click', () => {
            const name = playerNameInput.value.trim() || 'Engenheiro Chefe';
            btnCreateRoom.disabled = true;
            p2pManager.createRoom(name, (code, pId) => {
                myPlayerId = pId;
                if (roomCodeDisplay) roomCodeDisplay.textContent = code;
                if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--neon-green)">● SALA ATIVA [${code}]</span>`;
                engine.startGame();
                p2pManager.broadcastState();
                renderGameState(engine.gameState);
            });
        });
    }

    if (btnJoinRoom) {
        btnJoinRoom.addEventListener('click', () => {
            const code = roomCodeInput.value.trim();
            const name = playerNameInput.value.trim() || 'Estudante Convidado';
            if (!code) return alert('Por favor, digite o código de 4 letras da sala.');
            btnJoinRoom.disabled = true;
            p2pManager.joinRoom(code, name, (c, pId) => {
                myPlayerId = pId;
                if (roomCodeDisplay) roomCodeDisplay.textContent = c;
                if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--neon-blue)">● CONECTADO [${c}]</span>`;
            });
        });
    }

    if (btnSoloStart) {
        btnSoloStart.addEventListener('click', () => {
            myPlayerId = 'p_solo';
            engine.resetGame();
            engine.addPlayer(myPlayerId, playerNameInput.value.trim() || 'Engenheiro Solo', true);
            engine.startGame();
            renderGameState(engine.gameState);
            appendLog('⚡ Modo Sandbox/Solo iniciado com sucesso.');
        });
    }

    if (btnRefreshHand) {
        btnRefreshHand.addEventListener('click', () => {
            if (!myPlayerId) return;
            p2pManager.sendAction('REFRESH_HAND', { playerId: myPlayerId });
        });
    }

    // Renderização do Tabuleiro e Mão
    function renderGameState(state) {
        if (!state) return;

        if (deckCountEl) deckCountEl.textContent = state.deck.length;

        // Indicador de Turno
        if (turnIndicator && state.players.length > 0) {
            const curr = state.players[state.currentTurnPlayerIndex];
            const isMyTurn = curr && curr.id === myPlayerId;
            turnIndicator.innerHTML = `Vez de: <strong style="color:${isMyTurn ? 'var(--neon-green)' : 'var(--neon-blue)'}">${curr.name}</strong> ${isMyTurn ? '(SUA VEZ!)' : ''}`;
        }

        // Renderiza os 4 Setores Cardeais
        if (sectorsContainer) {
            sectorsContainer.innerHTML = '';
            for (const [sKey, sector] of Object.entries(state.board.sectors)) {
                const sDiv = document.createElement('div');
                sDiv.className = `sector-card ${sector.status}`;
                sDiv.setAttribute('data-sector', sKey);

                let statusBadge = '<span style="color:var(--text-muted)">⚪ Blackout</span>';
                if (sector.status === 'energized') statusBadge = '<span style="color:var(--neon-green)">🟢 ENERGIZADO</span>';
                if (sector.status === 'overvoltage') statusBadge = '<span style="color:var(--neon-red)">💥 QUEIMADO</span>';

                sDiv.innerHTML = `
                    <div class="sector-header">
                        <div class="sector-title">${sector.name}</div>
                        <div class="sector-meter">${sector.vCalculated || 0}V / ${sector.vNom}V</div>
                    </div>
                    <div style="font-size:11px; margin-bottom:8px; color:var(--text-muted); display:flex; justify-content:space-between;">
                        <span>Status: ${statusBadge}</span>
                        <span>Meta Adicional: +${sector.targetAddR}Ω</span>
                    </div>
                    <div class="cards-lane" id="lane-${sKey}">
                        ${sector.cards.map(c => renderCardMini(c, false)).join('')}
                    </div>
                `;

                // Clique no setor para instalar a carta selecionada da mão
                sDiv.addEventListener('click', () => {
                    if (!selectedCardUid || !myPlayerId) return;
                    p2pManager.sendAction('PLAY_CARD', {
                        playerId: myPlayerId,
                        cardUid: selectedCardUid,
                        sectorId: sKey
                    });
                    selectedCardUid = null;
                });

                sectorsContainer.appendChild(sDiv);
            }
        }

        // Renderiza a Mão do Jogador Atual
        if (playerHandEl) {
            playerHandEl.innerHTML = '';
            const myPlayer = state.players.find(p => p.id === myPlayerId) || state.players[0];
            if (myPlayer) {
                myPlayer.hand.forEach(card => {
                    const cardNode = document.createElement('div');
                    cardNode.className = `card-tile ${card.uid === selectedCardUid ? 'selected' : ''}`;
                    cardNode.innerHTML = renderCardMini(card, true);

                    cardNode.addEventListener('click', () => {
                        if (selectedCardUid === card.uid) {
                            selectedCardUid = null;
                        } else {
                            selectedCardUid = card.uid;
                        }
                        renderGameState(engine.gameState);
                    });

                    playerHandEl.appendChild(cardNode);
                });
            }
        }
    }

    function renderCardMini(card, isHand) {
        let badgeColor = card.badgeColor || '#059669';
        let badgeText = card.badge || card.name;
        let icon = '⚡';

        if (card.type === 'resistor') icon = '🟢';
        else if (card.type === 'equipment') icon = '💡';
        else if (card.type === 'gnd') icon = '⏚';
        else if (card.type === 'fuse') icon = '🛡️';
        else if (card.type === 'node_y') icon = '🔀';
        else if (card.type === 'switch') icon = '🔌';

        if (isHand) {
            return `
                <div class="card-badge-top" style="background:${badgeColor}">${badgeText}</div>
                <div class="card-center-icon">${icon}</div>
                <div class="card-title-bottom" title="${card.name}">${card.name}</div>
            `;
        } else {
            return `
                <div class="card-tile" style="width:65px; height:90px; border-color:${badgeColor}; pointer-events:none;">
                    <div class="card-badge-top" style="background:${badgeColor}; font-size:8px;">${badgeText}</div>
                    <div class="card-center-icon" style="font-size:18px;">${icon}</div>
                    <div class="card-title-bottom" style="font-size:8px;">${card.name}</div>
                </div>
            `;
        }
    }

    // -------------------------------------------------------------
    // MÓDULO 2: WAR ROOM FEBRACE (DIAGNÓSTICO & CHECKLIST)
    // -------------------------------------------------------------
    function renderWarRoom() {
        const scoreEl = document.getElementById('warroom-score');
        const barFill = document.getElementById('warroom-bar-fill');
        const checklistContainer = document.getElementById('checklist-container');

        if (!scoreEl || !checklistContainer) return;

        const score = warRoom.getReadinessScore();
        scoreEl.textContent = `${score}%`;
        if (barFill) barFill.style.width = `${score}%`;

        checklistContainer.innerHTML = '';
        warRoom.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'checklist-item';
            div.innerHTML = `
                <input type="checkbox" ${item.status ? 'checked' : ''} style="width:18px; height:18px; accent-color:var(--neon-green); cursor:pointer;">
                <div style="flex:1;">
                    <div style="font-weight:700; font-size:14px; color:${item.status ? 'var(--neon-green)' : '#fff'};">${item.title}</div>
                    <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">${item.desc}</div>
                </div>
                <div style="font-family:'Fira Code', monospace; font-size:11px; font-weight:700; color:var(--copper-glow);">${item.weight}% Peso</div>
            `;

            const chk = div.querySelector('input');
            chk.addEventListener('change', () => {
                const newScore = warRoom.toggleItem(item.id);
                scoreEl.textContent = `${newScore}%`;
                if (barFill) barFill.style.width = `${newScore}%`;
                renderWarRoom();
            });

            checklistContainer.appendChild(div);
        });
    }

    // -------------------------------------------------------------
    // MÓDULO 3: DIÁRIO DE BORDO COLETIVO
    // -------------------------------------------------------------
    function renderDiario() {
        const diarioList = document.getElementById('diario-entries-list');
        if (!diarioList) return;

        diarioList.innerHTML = '';
        diarioManager.entries.forEach(e => {
            const div = document.createElement('div');
            div.className = 'warroom-card';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <div>
                        <div style="font-weight:800; font-size:16px; color:var(--copper-glow);">${e.title}</div>
                        <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📅 ${e.date} | Categoria: <strong>${e.type}</strong> | Autor: <strong>${e.author}</strong></div>
                    </div>
                    <button class="btn-secondary" style="color:var(--neon-red); border-color:rgba(239,68,68,0.3); font-size:11px;" data-del="${e.id}">Excluir</button>
                </div>
                <div style="font-size:13px; line-height:1.6; color:#cbd5e1; margin-top:8px;">${e.description}</div>
                ${e.findings ? `<div style="font-size:12px; color:var(--neon-blue); margin-top:6px;"><strong>💡 Descobertas:</strong> ${e.findings}</div>` : ''}
                ${e.actionItems ? `<div style="font-size:12px; color:var(--neon-green); margin-top:4px;"><strong>🎯 Ações:</strong> ${e.actionItems}</div>` : ''}
            `;

            const btnDel = div.querySelector('button[data-del]');
            if (btnDel) {
                btnDel.addEventListener('click', () => {
                    if (confirm('Deseja excluir esta entrada do Diário de Bordo?')) {
                        diarioManager.deleteEntry(e.id);
                        renderDiario();
                    }
                });
            }

            diarioList.appendChild(div);
        });
    }

    // Formulário do Diário
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

            if (!title || !desc) return alert('Preencha pelo menos o título e a descrição da ata.');

            diarioManager.addEntry({
                title, type, author, description: desc, findings, actionItems: actions
            });

            formDiario.reset();
            renderDiario();
            alert('Ata registrada com sucesso no Diário de Bordo!');
        });
    }

    // Exportações do Diário
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
    // MÓDULO 4: TREINADOR DE BANCA USP & FEBRACE
    // -------------------------------------------------------------
    function renderBanca() {
        const bancaContainer = document.getElementById('banca-qa-container');
        if (!bancaContainer) return;

        bancaContainer.innerHTML = '';
        bancaCoach.questions.forEach((q, idx) => {
            const div = document.createElement('div');
            div.className = 'qa-card';
            div.innerHTML = `
                <div style="font-size:11px; font-weight:700; color:var(--copper-glow); text-transform:uppercase; margin-bottom:4px;">${q.category}</div>
                <div class="qa-question">${q.question}</div>
                <div class="qa-answer">${q.answer.replace(/\n/g, '<br><br>')}</div>
            `;

            div.addEventListener('click', () => {
                div.classList.toggle('open');
            });

            bancaContainer.appendChild(div);
        });
    }
});
