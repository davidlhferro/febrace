const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve os arquivos estáticos da pasta web_multiplayer
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('================================================================');
    console.log(`⚡ VOLTZ: CIRCUIT BREAK — SERVIDOR MULTIPLAYER WEB ATIVO!`);
    console.log(`🌐 Acesse localmente em: http://localhost:${PORT}`);
    console.log(`👥 Para jogar com amigos na mesma rede Wi-Fi, use o seu IP Local`);
    console.log('================================================================');
});
