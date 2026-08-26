/**
 * VOLTZ: CIRCUIT BREAK — Camada de Rede Multiplayer (WebRTC / PeerJS)
 * Sincronização em tempo real serverless com código de sala de 4 dígitos.
 */

class VoltzMultiplayer {
    constructor(callbacks) {
        this.callbacks = callbacks || {};
        this.peer = null;
        this.connections = []; // Lista de conexões ativas (Host mantém)
        this.hostConn = null;   // Conexão com o Host (Clientes mantêm)
        this.myPeerId = null;
        this.isHost = false;
        this.roomId = null;
        this.playerName = 'Engenheiro';
        this.myPlayerId = 'p_' + Math.random().toString(36).substr(2, 6);
    }

    // CRIA UMA NOVA SALA (HOST)
    createRoom(playerName, customRoomCode) {
        this.playerName = playerName || 'Host';
        this.isHost = true;
        
        // Gera código amigável tipo VOLT-8421
        const roomCode = customRoomCode || 'VOLT-' + Math.floor(1000 + Math.random() * 9000);
        this.roomId = roomCode;

        const peerId = `voltz_${roomCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        this.initPeer(peerId, true);
    }

    // ENTRA EM UMA SALA EXISTENTE (CLIENTE)
    joinRoom(playerName, roomCode) {
        this.playerName = playerName || 'Jogador';
        this.isHost = false;
        this.roomId = roomCode.trim().toUpperCase();

        const hostPeerId = `voltz_${this.roomId.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        const myTempPeerId = `voltz_c_${Math.random().toString(36).substr(2, 8)}`;

        this.initPeer(myTempPeerId, false, () => {
            this.connectToHost(hostPeerId);
        });
    }

    initPeer(peerId, asHost, onOpenCallback) {
        try {
            // Conecta ao broker público do PeerJS (WebRTC)
            this.peer = new Peer(peerId, {
                debug: 1,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' }
                    ]
                }
            });

            this.peer.on('open', (id) => {
                this.myPeerId = id;
                console.log('[Multiplayer] Conectado ao PeerJS com ID:', id);
                if (this.callbacks.onPeerReady) this.callbacks.onPeerReady(this.roomId, this.isHost);
                if (onOpenCallback) onOpenCallback();
            });

            this.peer.on('connection', (conn) => {
                if (this.isHost) {
                    this.handleIncomingClient(conn);
                }
            });

            this.peer.on('error', (err) => {
                console.error('[Multiplayer Error]:', err);
                if (this.callbacks.onError) this.callbacks.onError(err);
            });

        } catch (e) {
            console.error('[Peer Init Failed]:', e);
            if (this.callbacks.onError) this.callbacks.onError(e);
        }
    }

    // HOST: Recebe novo jogador
    handleIncomingClient(conn) {
        conn.on('open', () => {
            this.connections.push(conn);
            console.log('[Host] Cliente conectado:', conn.peer);

            conn.on('data', (data) => {
                this.handleDataFromClient(conn, data);
            });

            conn.on('close', () => {
                this.connections = this.connections.filter(c => c !== conn);
                if (this.callbacks.onClientDisconnected) this.callbacks.onClientDisconnected(conn.peer);
            });
        });
    }

    // CLIENTE: Conecta ao Host
    connectToHost(hostPeerId) {
        console.log('[Cliente] Conectando ao host:', hostPeerId);
        const conn = this.peer.connect(hostPeerId, {
            reliable: true
        });

        conn.on('open', () => {
            this.hostConn = conn;
            console.log('[Cliente] Conectado com sucesso ao Host!');

            // Envia handshake inicial de entrada
            this.sendToHost({
                type: 'JOIN_REQUEST',
                playerId: this.myPlayerId,
                playerName: this.playerName
            });

            conn.on('data', (data) => {
                this.handleDataFromHost(data);
            });

            conn.on('close', () => {
                console.warn('[Cliente] Conexão com o host perdida.');
                if (this.callbacks.onHostDisconnected) this.callbacks.onHostDisconnected();
            });
        });

        conn.on('error', (err) => {
            console.error('[Cliente Conn Error]:', err);
            if (this.callbacks.onError) this.callbacks.onError(err);
        });
    }

    // HOST: Processa mensagens recebidas dos clientes
    handleDataFromClient(conn, msg) {
        console.log('[Host Recebeu]:', msg.type, msg);
        if (this.callbacks.onHostReceiveAction) {
            this.callbacks.onHostReceiveAction(msg, conn);
        }
    }

    // CLIENTE: Processa mensagens recebidas do Host
    handleDataFromHost(msg) {
        console.log('[Cliente Recebeu]:', msg.type);
        if (msg.type === 'SYNC_STATE') {
            if (this.callbacks.onStateSync) {
                this.callbacks.onStateSync(msg.gameState);
            }
        } else if (msg.type === 'GND_MODAL') {
            if (this.callbacks.onGNDModal) {
                this.callbacks.onGNDModal(msg.diagnostic);
            }
        }
    }

    // HOST: Faz Broadcast do estado atualizado para todos os clientes
    broadcastState(gameState) {
        if (!this.isHost) return;
        const payload = {
            type: 'SYNC_STATE',
            gameState
        };
        for (const conn of this.connections) {
            if (conn.open) {
                conn.send(payload);
            }
        }
    }

    // HOST: Envia o modal de diagnóstico do GND para todos
    broadcastGNDModal(diagnostic) {
        if (!this.isHost) return;
        const payload = {
            type: 'GND_MODAL',
            diagnostic
        };
        for (const conn of this.connections) {
            if (conn.open) {
                conn.send(payload);
            }
        }
    }

    // CLIENTE: Envia ação para o Host executar
    sendToHost(actionPayload) {
        if (this.hostConn && this.hostConn.open) {
            this.hostConn.send(actionPayload);
        } else {
            console.warn('[Multiplayer] Conexão com o host não está aberta.');
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VoltzMultiplayer };
}
