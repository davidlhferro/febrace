/**
 * PORTAL VOLTZ & CENTRAL FEBRACE — Controlador Mestre (Amigável & Sem Jargões)
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
    // MÓDULO 1: ARENA MULTIPLAYER (JOGAR COM AMIGOS)
    // -------------------------------------------------------------
    const p2pStatusEl = document.getElementById('p2p-status');
    const roomCodeDisplay = document.getElementById('room-code-display');
    const logBox = document.getElementById('log-box');
    const playerHandEl = document.getElementById('player-hand');
    const sectorsContainer = document.getElementById('sectors-container');
    const turnIndicator = document.getElementById('turn-indicator');
    const deckCountEl = document.getElementById('deck-count');
    const assistantText = document.getElementById('assistant-status-text');
    const assistantPill = document.getElementById('assistant-calc-pill');

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
                appendLog('🚀 Partida iniciada com ' + engine.gameState.players.length + ' jogadores!');
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
            engine.addPlayer('p3', 'Amigo 3', false);
            engine.startGame();
            if (p2pStatusEl) p2pStatusEl.innerHTML = `<span style="color:var(--neon-green)">● TESTE 3P (LOCAL)</span>`;
            renderGameState(engine.gameState);
            appendLog('👥 Modo de Teste 3 Jogadores (David, João, Amigo 3) iniciado.');
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

        // Atualiza Lista de Jogadores no Lobby
        if (playersListDisplay) {
            if (state.players.length === 0) {
                playersListDisplay.innerHTML = '<em>Ninguém conectado ainda.</em>';
            } else {
                playersListDisplay.innerHTML = state.players.map((p, i) => `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:3px 0;">
                        <span><strong>${i + 1}. ${p.name}</strong> ${p.isHost ? '👑 (Criador)' : ''} ${p.id === myPlayerId ? '<span style="color:var(--neon-green)">(Você)</span>' : ''}</span>
                        <span style="color:var(--neon-green); font-size:11px;">● Pronto (${p.hand.length} cartas)</span>
                    </div>
                `).join('');
            }
        }

        // Indicador de Turno Amigável
        if (turnIndicator && state.players.length > 0) {
            const curr = state.players[state.currentTurnPlayerIndex];
            const isMyTurn = curr && curr.id === myPlayerId;
            turnIndicator.innerHTML = `Vez de: <strong style="color:${isMyTurn ? 'var(--neon-green)' : 'var(--neon-blue)'}; font-size:14px;">${curr.name}</strong> ${isMyTurn ? '<span style="background:var(--neon-green); color:#000; padding:2px 6px; border-radius:4px; font-weight:800; margin-left:6px;">👉 SUA VEZ! ESCOLHA UMA CARTA E CLIQUE NO SETOR</span>' : '<span style="color:var(--text-muted); font-size:12px; margin-left:6px;">(Aguardando o amigo jogar...)</span>'}`;
        }

        // Renderiza os 4 Setores Cardeais da Metrópole
        if (sectorsContainer) {
            sectorsContainer.innerHTML = '';
            for (const [sKey, sector] of Object.entries(state.board.sectors)) {
                const sDiv = document.createElement('div');
                sDiv.className = `sector-card ${sector.status}`;
                sDiv.setAttribute('data-sector', sKey);

                let statusBadge = '<span style="color:var(--text-muted)">⚪ Desligado</span>';
                if (sector.status === 'energized') statusBadge = '<span style="color:var(--neon-green); font-weight:800;">🟢 SALVO (NOMINAL)</span>';
                if (sector.status === 'overvoltage') statusBadge = '<span style="color:var(--neon-red); font-weight:800;">💥 QUEIMOU!</span>';

                // Cálculo visual amigável do ramo
                const resistorsSum = sector.cards.filter(c => c.type === 'resistor').reduce((sum, r) => sum + (r.r || 0), 0);
                const hasLoad = sector.cards.find(c => c.type === 'equipment');

                sDiv.innerHTML = `
                    <div class="sector-header">
                        <div class="sector-title">${sector.name}</div>
                        <div class="sector-meter">${sector.vCalculated || 0}V / Meta: ${sector.vNom}V</div>
                    </div>
                    <div style="font-size:11.5px; margin-bottom:8px; color:var(--text-muted); display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">
                        <span>Status: ${statusBadge}</span>
                        <span>Resistores na linha: <strong>+${resistorsSum}Ω</strong> (Meta: +${sector.targetAddR}Ω)</span>
                    </div>
                    <div class="cards-lane" id="lane-${sKey}">
                        ${sector.cards.length === 0 ? '<div style="font-size:11px; color:#475569; padding:8px;">Nenhum componente instalado ainda.</div>' : sector.cards.map(c => renderCardMini(c, false)).join('')}
                    </div>
                `;

                // Clique no setor para instalar a carta selecionada
                sDiv.addEventListener('click', () => {
                    if (!selectedCardUid || !myPlayerId) return;
                    p2pManager.sendAction('PLAY_CARD', {
                        playerId: myPlayerId,
                        cardUid: selectedCardUid,
                        sectorId: sKey
                    });
                    selectedCardUid = null;
                    updateVisualAssistant(null);
                });

                sectorsContainer.appendChild(sDiv);
            }
        }

        // Renderiza a Mão do Jogador
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
                            updateVisualAssistant(null);
                        } else {
                            selectedCardUid = card.uid;
                            updateVisualAssistant(card);
                        }
                        renderGameState(engine.gameState);
                    });

                    playerHandEl.appendChild(cardNode);
                });
            }
        }
    }

    // 2. ATUALIZAÇÃO DO ASSISTENTE VISUAL EM TEMPO REAL
    function updateVisualAssistant(card) {
        if (!assistantText) return;
        if (!card) {
            assistantText.textContent = 'Selecione uma carta da sua mão para ver a dica de ligação.';
            if (assistantPill) assistantPill.style.display = 'none';
            return;
        }

        if (assistantPill) assistantPill.style.display = 'block';

        if (card.type === 'resistor') {
            assistantText.innerHTML = `🟢 <strong>${card.name}</strong>: Adiciona <strong>+${card.r}Ω</strong> no caminho. Use para reduzir a voltagem que chega no aparelho!`;
            if (assistantPill) assistantPill.textContent = `+${card.r}Ω de Resistência`;
        } else if (card.type === 'equipment') {
            assistantText.innerHTML = `💡 <strong>${card.name}</strong>: Precisa de exatamente <strong>${card.vNom}V</strong> para funcionar com segurança sem queimar.`;
            if (assistantPill) assistantPill.textContent = `Meta: ${card.vNom}V`;
        } else if (card.type === 'gnd') {
            assistantText.innerHTML = `⏚ <strong>${card.name}</strong>: Fecha o circuito no chão (0V) e <strong>faz o teste final na hora</strong> para ver se o setor acende!`;
            if (assistantPill) assistantPill.textContent = `TESTE FINAL (0V)`;
        } else if (card.type === 'fuse') {
            assistantText.innerHTML = `🛡️ <strong>${card.name}</strong>: Proteção contra acidentes! Se a voltagem passar do limite, o fusível queima no lugar do aparelho.`;
            if (assistantPill) assistantPill.textContent = `PROTEÇÃO 1A`;
        } else if (card.type === 'node_y') {
            assistantText.innerHTML = `🔀 <strong>${card.name}</strong>: Divide o circuito em <strong>2 caminhos novos de 12V</strong> (Efeito Bandido)!`;
            if (assistantPill) assistantPill.textContent = `DIVIDE EM 2 RAMOS`;
        } else {
            assistantText.textContent = `Componente selecionado: [${card.name}]. Clique no setor para instalar!`;
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
                <div class="card-tile" style="width:68px; height:95px; border-color:${badgeColor}; pointer-events:none;">
                    <div class="card-badge-top" style="background:${badgeColor}; font-size:8px;">${badgeText}</div>
                    <div class="card-center-icon" style="font-size:18px;">${icon}</div>
                    <div class="card-title-bottom" style="font-size:8px;">${card.name}</div>
                </div>
            `;
        }
    }

    // -------------------------------------------------------------
    // MÓDULO 2: GUIA DA FEBRACE (CARDS EXPLICATIVOS SEM JARGÕES)
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
                scoreEl.textContent = `${newScore}%`;
                if (barFill) barFill.style.width = `${newScore}%`;
                renderWarRoom();
            });

            checklistContainer.appendChild(card);
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
            div.className = 'guide-card';
            div.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                    <div>
                        <div style="font-weight:800; font-size:15px; color:var(--copper-bright);">${e.title}</div>
                        <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">📅 ${e.date} | Tipo: <strong>${e.type}</strong> | Feito por: <strong>${e.author}</strong></div>
                    </div>
                    <button class="btn-secondary" style="color:var(--neon-red); border-color:rgba(239,68,68,0.3); font-size:11px;" data-del="${e.id}">Excluir</button>
                </div>
                <div style="font-size:13px; line-height:1.5; color:#cbd5e1; margin-top:6px;">${e.description}</div>
                ${e.findings ? `<div style="font-size:12px; color:var(--neon-blue); margin-top:6px; background:#090e18; padding:6px 10px; border-radius:4px;"><strong>💡 O que aprendemos:</strong> ${e.findings}</div>` : ''}
                ${e.actionItems ? `<div style="font-size:12px; color:var(--neon-green); margin-top:4px; background:#090e18; padding:6px 10px; border-radius:4px;"><strong>🎯 Próximo passo:</strong> ${e.actionItems}</div>` : ''}
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

            if (!title || !desc) return alert('Preencha pelo menos o título e a descrição da partida.');

            diarioManager.addEntry({
                title, type, author, description: desc, findings, actionItems: actions
            });

            formDiario.reset();
            renderDiario();
            alert('Anotação salva com sucesso no Diário de Bordo!');
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
    // MÓDULO 4: TRADUTOR DA BANCA USP (GLOSSÁRIO DESCOMPLICADO)
    // -------------------------------------------------------------
    function renderBanca() {
        const bancaContainer = document.getElementById('banca-translator-container');
        if (!bancaContainer) return;

        bancaContainer.innerHTML = '';
        bancaCoach.glossary.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'translator-card';
            card.innerHTML = `
                <div class="translator-jurado">
                    <span>🎓 O Jurado Pergunta:</span>
                    <em>"${item.juradoDiz}"</em>
                </div>
                <div class="translator-real">
                    <div style="font-size:11.5px; font-weight:800; color:var(--copper-bright); margin-bottom:2px;">🗣️ O que ele realmente quer saber:</div>
                    <div style="font-weight:600; color:#fff; margin-bottom:8px;">${item.traducao}</div>
                    <div style="font-size:11.5px; font-weight:800; color:var(--neon-green); margin-bottom:2px;">💡 Resposta na ponta da língua:</div>
                    <div style="color:#cbd5e1;">${item.respostaNaPontaDaLingua}</div>
                </div>
            `;
            bancaContainer.appendChild(card);
        });
    }
});
