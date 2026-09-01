# 🚀 Guia de Deploy Rápido — Portal VOLTZ & Central FEBRACE

O **Portal VOLTZ & Central de Comando FEBRACE** foi construído como uma aplicação SPA (*Single Page Application*) estática de altíssima performance, sem necessidade de servidores Node.js backend para a comunicação multiplayer (utilizando WebRTC P2P direto entre navegadores via PeerJS).

---

## 🌐 Opção 1: Deploy Gratuito no GitHub Pages (1 Minuto)

1. Faça o commit e push da pasta `portal_equipe/` para o seu repositório:
   ```bash
   git add .
   git commit -m "feat: portal voltz & central febrace web app"
   git push origin master
   ```
2. No GitHub, acesse as configurações do seu repositório:
   * **Settings** $\to$ **Pages**.
   * Em **Source**, selecione a branch `master` e a pasta `/ (root)` ou use a action de GitHub Pages apontando para a pasta `01_Jogo_Voltz/portal_equipe/`.
3. O link público estará ativo instantaneamente (ex: `https://davidlhferro.github.io/febrace/01_Jogo_Voltz/portal_equipe/`).

---

## ⚡ Opção 2: Deploy Gratuito no Vercel (1 Clique)

1. Instale o CLI da Vercel (opcional) ou conecte sua conta no [vercel.com](https://vercel.com).
2. Para deploy via terminal:
   ```bash
   cd C:\codigos\FEBRACE\01_Jogo_Voltz\portal_equipe
   npx vercel
   ```
3. Pressione `Enter` para as opções padrão. Seu portal estará no ar em um domínio global com HTTPS gratuito (ex: `https://voltz-portal.vercel.app`).

---

## 🧪 Testes Locais

Para rodar localmente no seu computador:
1. Basta abrir o arquivo `index.html` em qualquer navegador (Chrome, Edge, Firefox, Safari).
2. Para rodar um servidor HTTP local de desenvolvimento:
   ```bash
   npx serve 01_Jogo_Voltz/portal_equipe
   ```
3. Acesse `http://localhost:3000`.
