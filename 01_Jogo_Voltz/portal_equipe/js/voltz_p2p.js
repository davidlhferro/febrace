/**
 * PORTAL VOLTZ — Módulo de Rede P2P WebRTC (PeerJS)
 * Permite criar e entrar em salas multijogador instantâneas via código de 4 letras sem servidor dedicado.
 */

class VoltzP2PManager {
    constructor(engine, onStateUpdate, onLogMessage) {
        this.engine = engine;
        this.onStateUpdate = onStateUpdate;
        this.onLogMessage = onLogMessage;
        this.peer = null;
        this.connections = []; // Lista de conexões ativas (se for Host)
        this.hostConn = null;  // Conexão com o Host (se for Guest)
        this.isHost = false;
        this.myPlayerId = null;
        this.myPlayerName = null;
        this.roomCode = null;
    }

    generateRoomCode() {
        const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return code;
    }

    // Cria uma nova sala como HOST
    createRoom(playerName, onReady) {
        this.isHost = true;
        this.myPlayerName = playerName || 'Engenheiro Chefe';
        this.myPlayerId = 'p_host_' + Math.random().toString(36).substring(2, 7);
        this.roomCode = this.generateRoomCode();
        const peerId = `voltz-room-${this.roomCode.toLowerCase()}`;

        try {
            this.peer = new Peer(peerId, {
                debug: 1
            });
        } catch (e) {
            console.warn('PeerJS fallback para ID dinâmico');
            this.peer = new Peer();
        }

        this.peer.on('open', (id) => {
            this.engine.resetGame();
            this.engine.gameState.roomCode = this.roomCode;
            this.engine.addPlayer(this.myPlayerId, this.myPlayerName, true);
            this.onLogMessage(`📡 Sala criada com sucesso! Código da Bancada: [${this.roomCode}]`);
            if (onReady) onReady(this.roomCode, this.myPlayerId);
            this.broadcastState();
        });

        this.peer.on('connection', (conn) => {
            this.connections.push(conn);
            conn.on('data', (data) => this.handleHostMessage(conn, data));
            conn.on('close', () => {
                this.connections = this.connections.filter(c => c !== conn);
                if (conn.metadata && conn.metadata.playerId) {
                    this.engine.removePlayer(conn.metadata.playerId);
                    this.broadcastState();
                }
            });
        });

        this.peer.on('error', (err) => {
            console.error('P2P Error:', err);
            this.onLogMessage(`⚠️ Alerta de Conexão: ${err.type}`);
        });
    }

    // Entra em uma sala existente como GUEST
    joinRoom(roomCode, playerName, onJoined) {
        this.isHost = false;
        this.myPlayerName = playerName || 'Estudante Convidado';
        this.myPlayerId = 'p_guest_' + Math.random().toString(36).substring(2, 7);
        this.roomCode = roomCode.toUpperCase().trim();
        const targetPeerId = `voltz-room-${this.roomCode.toLowerCase()}`;

        this.peer = new Peer();

        this.peer.on('open', () => {
            this.hostConn = this.peer.connect(targetPeerId, {
                metadata: {
                    playerId: this.myPlayerId,
                    playerName: this.myPlayerName
                }
            });

            this.hostConn.on('open', () => {
                this.onLogMessage(`🔗 Conectado com sucesso à sala [${this.roomCode}]!`);
                this.hostConn.send({
                    type: 'JOIN_REQUEST',
                    playerId: this.myPlayerId,
                    playerName: this.myPlayerName
                });
                if (onJoined) onJoined(this.roomCode, this.myPlayerId);
            });

            this.hostConn.on('data', (data) => this.handleGuestMessage(data));

            this.hostConn.on('close', () => {
                this.onLogMessage('❌ Conexão com a bancada do Host encerrada.');
            });
        });

        this.peer.on('error', (err) => {
            console.error('P2P Error:', err);
            this.onLogMessage(`❌ Erro ao conectar na sala [${this.roomCode}]. Verifique o código.`);
        });
    }

    // Dispara ações para o Host ou executa localmente
    sendAction(actionType, payload) {
        if (this.isHost) {
            try {
                if (actionType === 'PLAY_CARD') {
                    this.engine.playCard(payload.playerId, payload.cardUid, payload.sectorId);
                } else if (actionType === 'REFRESH_HAND') {
                    this.engine.refreshHand(payload.playerId);
                } else if (actionType === 'START_GAME') {
                    this.engine.startGame();
                } else if (actionType === 'RESTART_GAME') {
                    this.engine.startGame();
                }
                this.broadcastState();
            } catch (err) {
                this.onLogMessage(`⚠️ [Erro na Jogada]: ${err.message}`);
            }
        } else if (this.hostConn && this.hostConn.open) {
            this.hostConn.send({
                type: 'ACTION_REQUEST',
                actionType,
                payload
            });
        }
    }

    // Processa mensagens recebidas pelo HOST
    handleHostMessage(conn, data) {
        if (data.type === 'JOIN_REQUEST') {
            conn.metadata = { playerId: data.playerId, playerName: data.playerName };
            try {
                this.engine.addPlayer(data.playerId, data.playerName, false);
                this.broadcastState();
            } catch (err) {
                conn.send({ type: 'ERROR', message: err.message });
            }
        } else if (data.type === 'ACTION_REQUEST') {
            this.sendAction(data.actionType, data.payload);
        } else if (data.type === 'CHAT') {
            this.broadcastMessage({ type: 'CHAT', sender: data.sender, text: data.text });
        }
    }

    // Processa mensagens recebidas pelo GUEST
    handleGuestMessage(data) {
        if (data.type === 'SYNC_STATE') {
            this.engine.gameState = data.gameState;
            if (this.onStateUpdate) this.onStateUpdate(this.engine.gameState);
        } else if (data.type === 'CHAT') {
            this.onLogMessage(`💬 [${data.sender}]: ${data.text}`);
        } else if (data.type === 'ERROR') {
            this.onLogMessage(`❌ ${data.message}`);
        }
    }

    // HOST transmite o estado atualizado para todos os jogadores
    broadcastState() {
        if (!this.isHost) return;
        const msg = {
            type: 'SYNC_STATE',
            gameState: this.engine.gameState
        };
        for (const conn of this.connections) {
            if (conn.open) conn.send(msg);
        }
        if (this.onStateUpdate) this.onStateUpdate(this.engine.gameState);
    }

    broadcastMessage(msg) {
        for (const conn of this.connections) {
            if (conn.open) conn.send(msg);
        }
        if (msg.type === 'CHAT') {
            this.onLogMessage(`💬 [${msg.sender}]: ${msg.text}`);
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzP2PManager };
}
