# ⚡ VOLTZ: CIRCUIT BREAK — GUIA DO MULTIPLAYER DIGITAL WEB

Este pacote contém a versão digital web multiplayer do **VOLTZ: Circuit Break**, permitindo que você e sua equipe (2 a 4 jogadores) joguem e testem partidas em tempo real pelo navegador (no computador ou celular), sem precisar imprimir nada e com **100% de fidelidade às regras físicas do jogo**.

---

## 🚀 Como Jogar com a Equipe em 30 Segundos (Opções)

### ⭐ Opção 1: Direto pelo Navegador (Zero Instalação via Python ou Servidor Local)

1. No terminal do projeto, inicie um servidor web local simples:
   ```bash
   python -m http.server 8000 --directory 01_Jogo_Voltz/web_multiplayer
   ```
2. Abra no seu navegador: `http://localhost:8000` (ou o seu IP local na rede Wi-Fi, ex: `http://192.168.1.15:8000`).
3. O primeiro jogador digita seu nome e clica em **"⚡ Criar Nova Sala"**.
4. O sistema gera um código de sala amigável (ex: `VOLT-8421`).
5. Os outros 3 colegas de equipe entram na mesma página, digitam seus nomes, colam o código `VOLT-8421` e clicam em **"🔗 Entrar na Sala"**.
6. O líder da sala clica em **"🚀 Iniciar Partida Agora"** e o jogo começa com sincronização WebRTC P2P instantânea!

---

### 🌐 Opção 2: Jogar pela Internet com a Equipe Remota (Sem Estar na Mesma Rede)

Você pode publicar esta pasta em qualquer serviço gratuito de hospedagem estática em 1 clique:
* **Vercel / Netlify**: Basta arrastar a pasta `01_Jogo_Voltz/web_multiplayer` ou conectar o repositório GitHub.
* **GitHub Pages**: Aponte o GitHub Pages para esta pasta.
* **Localtunnel / Ngrok** (Túnel instantâneo do seu PC):
  ```bash
  npx localtunnel --port 8000
  ```
  *(Compartilhe a URL gerada pelo localtunnel com seus colegas no WhatsApp ou Discord).*

---

## 🎮 Regras Implementadas no Motor Digital

1. **Baralho de 54 Cartas Canônico**: 22 Resistores (1Ω, 2Ω, 3Ω), 13 Equipamentos (LED, Servidor, Sirene, Motor, Tomógrafo), 8 Cabos Terra (GND), 5 Nós Y, 3 Fusíveis e 2 Surtos 24V.
2. **Turno de 2 Ações**:
   * **Construir**: Jogar carta no Setor 1 (Hospital), Setor 2 (Dados), Setor 3 (Água) ou Setor 4 (Residencial).
   * **Descarte Ativo**: Descartar cartas para renovar a mão.
   * **Aterrar (GND)**: Fecha o circuito no potencial 0V e dispara o cálculo automático da Lei de Ohm ($V_{\text{equip}} = 12\text{V} \cdot \frac{R_{\text{equip}}}{R_{\text{total}}}$).
3. **Modal de Diagnóstico GND em Tempo Real**: Todos os jogadores na sala veem a animação com o cálculo exato e o veredito:
   * 🟢 **SUCESSO**: Tensão exata $\implies$ Setor energizado permanentemente!
   * 💥 **SOBRETENSÃO**: Corrente excessiva $\implies$ Queima o equipamento (ou estoura o Fusível protetor).
   * ⚪ **SUBTENSÃO**: Resistência excessiva $\implies$ Equipamento não liga.
4. **Tabela de Mesa Integrada**: Botão no topo para consultar a conversão de blocos e $V_{\text{nom}}$ a qualquer momento.
