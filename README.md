<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=260&section=header&text=ARSLAN-MD-ULTRA&fontSize=58&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Next-Gen%20WhatsApp%20Multi-Device%20Automation%20Bot&descAlignY=58&descAlign=50&descSize=19" width="100%" alt="ARSLAN-MD-ULTRA"/>

<img src="https://readme-typing-svg.demolab.com/?lines=%F0%9F%9A%80+Welcome+to+ARSLAN-MD-ULTRA;%E2%9A%A1+Fast+%7C+%F0%9F%A7%A9+Modular+%7C+%F0%9F%9B%A1%EF%B8%8F+Reliable;%F0%9F%92%AC+WhatsApp+Automation%2C+Reimagined;%F0%9F%94%A5+Crafted+by+ARSLAN+TECH%27S&font=Fira+Code&center=true&width=780&height=55&color=6C63FF&vCenter=true&size=24&pause=1000&background=0D111700" alt="Animated project introduction"/>

<br/>

<img src="./assets/IMG-20260805-WA0005.jpg" width="100%" alt="ARSLAN MD ULTRA Banner"/>

<br/><br/>

<img src="https://skillicons.dev/icons?i=nodejs,js,npm,git,github,vscode&theme=dark" alt="Technology stack"/>

<br/><br/>

![Made with Love](https://img.shields.io/badge/Made%20With-%E2%9D%A4%EF%B8%8F-6C63FF?style=for-the-badge&labelColor=0D1117)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=0D1117)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Multi--Device-25D366?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=0D1117)
![License](https://img.shields.io/badge/License-MIT-6C63FF?style=for-the-badge&labelColor=0D1117)
![Public Pairing](https://img.shields.io/badge/Pairing-Public-00C853?style=for-the-badge&labelColor=0D1117)

![Stars](https://img.shields.io/github/stars/ArslanTech-dev/ARSLAN-MD-Ultra?style=for-the-badge&color=6C63FF&labelColor=0D1117&logo=github)
![Forks](https://img.shields.io/github/forks/ArslanTech-dev/ARSLAN-MD-Ultra?style=for-the-badge&color=6C63FF&labelColor=0D1117&logo=github)
![Last Commit](https://img.shields.io/github/last-commit/ArslanTech-dev/ARSLAN-MD-Ultra?style=for-the-badge&color=6C63FF&labelColor=0D1117&logo=github)

<br/>

<img src="https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg" width="600" alt="GitHub contribution animation"/>

</div>

---

## 🌌 About The Project

**ARSLAN-MD-ULTRA** is a fast, modular WhatsApp Multi-Device automation bot built with Node.js and Baileys. It combines a plugin-based command system, resilient session recovery, a browser pairing console, and deployment-ready server configuration.

<div align="center">
<img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="440" alt="Animated coding graphic"/>
</div>

```yaml
Project:      ARSLAN-MD-ULTRA
Category:     WhatsApp Automation Bot
Language:     JavaScript (Node.js)
Architecture: Modular Plugin-Based System
Runtime:      Node.js 20+
Deployment:   VM | VPS | Persistent Web Service
Pairing:      Public pairing console
```

---

## 💻 Code in Action

<div align="center">
<img src="https://readme-typing-svg.demolab.com/?lines=%24+npm+start;%3E+Initializing+Baileys+socket...;%3E+Loading+plugins+%5B%23%23%23%23%23%23%23%23%23%23%5D+100%25;%3E+Connection+established+%E2%9C%93;%3E+ARSLAN-MD-ULTRA+is+online+%F0%9F%9F%A2&font=Fira+Code&center=true&width=780&height=50&color=00FF9D&vCenter=true&size=20&pause=800&background=0D1117" alt="Terminal boot animation"/>
</div>

```javascript
// index.js — Baileys connection lifecycle
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { loadPlugins } = require('./handlers');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', handleConnection);

  await loadPlugins(sock);
  console.log('✅ ARSLAN-MD-ULTRA is online');
}

startBot();
```

<div align="center">
<img src="https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif" width="440" alt="Animated code graphic"/>
</div>

---

## ✨ Features

<div align="center">

| 🎯 Module | 📋 Description |
|---|---|
| 📱 **Multi-Device Core** | Baileys-powered WhatsApp multi-device connection |
| 🌐 **Public Pairing Website** | Any valid WhatsApp number can request a pairing code |
| 🧩 **Plugin System** | Add commands inside the `plugins/` directory |
| 🔑 **Pairing Code Login** | Link a WhatsApp account without repeated QR scans |
| ⚙️ **Command Engine** | Centralized routing through the bot handlers |
| 📡 **Live Status** | Browser console, `/status`, and `/health` endpoints |
| ♻️ **Session Recovery** | Invalid sessions are cleared for fresh pairing |
| 🔁 **Pairing Retry Logic** | Socket readiness delay, retry/backoff, and auth diagnostics |
| 🧠 **Centralized Config** | Public or owner-only pairing controlled by environment variables |
| 🆓 **Open Source** | MIT licensed and ready to customize |

</div>

<div align="center">
<img src="https://media.giphy.com/media/SWoSkN6DxTszqIKEqv/giphy.gif" width="440" alt="Animated feature graphic"/>
</div>

---

## 🔓 Public Pairing

Public pairing is enabled by default. Each deployment supports **one active WhatsApp connection at a time**.

1. Start the bot with `npm start`.
2. Open the hosted pairing website.
3. Enter any WhatsApp number with its country code.
4. Copy the generated pairing code.
5. In WhatsApp, open **Linked devices → Link with phone number**.
6. Enter the code and keep the hosting process running.

The account that completes the public pairing becomes the current bot owner. A second account must wait until the current session disconnects or the active pairing request expires.

To restore owner-only pairing:

```env
PUBLIC_PAIRING=false
PAIRING_NUMBER=923xxxxxxxxx
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- Git
- A WhatsApp account
- A persistent host for the `session/` directory

### Installation

<div align="center">
<img src="https://readme-typing-svg.demolab.com/?lines=%24+git+clone+github.com%2FArslanTech-dev%2FARSLAN-MD-Ultra.git;%24+cd+ARSLAN-MD-Ultra;%24+npm+ci;%24+npm+start;%E2%9C%85+Setup+complete&font=Fira+Code&center=true&width=780&height=45&color=00FF9D&vCenter=true&size=17&pause=900&background=0D1117" alt="Installation terminal animation"/>
</div>

```bash
git clone https://github.com/ArslanTech-dev/ARSLAN-MD-Ultra.git
cd ARSLAN-MD-Ultra
npm ci
npm start
```

The pairing website is served by `server.js`. The host should expose the configured `PORT` and bind the application publicly.

<div align="center">
<img src="https://media.giphy.com/media/Rkoat5KMaZC7bh9DDZ/giphy.gif" width="440" alt="Animated setup graphic"/>
</div>

---

## ☁️ Deployment

This bot needs a long-running Node.js process, outbound WebSocket access, and persistent storage for `session/`. Use a VM, VPS, or persistent web service—not static hosting or serverless functions.

Recommended settings:

```yaml
Runtime:        Node.js 20+
Install:        npm ci
Start:          node server.js
Port:           5000 or the host-provided PORT
Storage:        Persist session/ between restarts
Pairing:        PUBLIC_PAIRING=true
```

For a VPS with PM2:

```bash
npm install -g pm2
pm2 start server.js --name arslan-md-ultra
pm2 save
pm2 startup
```

Health checks:

```text
GET /health
GET /status
```

<div align="center">
<img src="https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif" width="480" alt="Animated deployment graphic"/>
</div>

---

## 🧯 Session Recovery

If WhatsApp reports an invalid or expired session, reset the local credentials and restart:

```bash
rm -rf session
npm start
```

Never commit the `session/` directory. It contains private WhatsApp authentication credentials and is ignored by Git.

---

## 🗂️ Project Structure

```text
ARSLAN-MD-Ultra/
├── public/              # Browser pairing console
├── plugins/             # Modular commands and features
├── config.js            # Bot and pairing configuration
├── handlers.js          # Plugin loading and message dispatch
├── index.js             # Baileys startup and connection lifecycle
├── pair.js              # Pairing number validation and retry logic
├── server.js            # Pairing website and health endpoints
├── utils/               # Shared utilities and logging
├── package.json         # Runtime dependencies and scripts
└── .replit              # Replit VM and workflow configuration
```

---

## 🧩 Adding Custom Plugins

<div align="center">
<img src="https://readme-typing-svg.demolab.com/?lines=%24+touch+plugins%2Fmyplugin.js;%24+npm+start;%E2%9C%85+New+command+loaded+successfully&font=Fira+Code&center=true&width=700&height=40&color=00FF9D&vCenter=true&size=16&pause=900&background=0D1117" alt="Plugin terminal animation"/>
</div>

1. Create a `.js` file inside `plugins/`.
2. Follow the structure used by the existing plugins.
3. Restart the bot.

```bash
touch plugins/myplugin.js
npm start
```

<div align="center">
<img src="https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif" width="420" alt="Animated plugin graphic"/>
</div>

---

## 🧬 Roadmap

- [x] Modular plugin architecture
- [x] Pairing-code authentication
- [x] Public browser pairing
- [x] Session recovery and health endpoints
- [x] Persistent VM deployment configuration
- [ ] Web-based bot control dashboard
- [ ] Usage analytics panel
- [ ] Multi-language command support
- [ ] Role-based command permissions

---

## 📸 Gallery

<div align="center">

<img src="./assets/IMG-20260915-WA3151.jpg" width="45%" style="border-radius:10px" alt="Gallery image 1"/>
<img src="./assets/IMG-20260915-WA7105.jpg" width="45%" style="border-radius:10px" alt="Gallery image 2"/>

<br/><br/>

<img src="./assets/IMG-20260915-WA7636.jpg" width="45%" style="border-radius:10px" alt="Gallery image 3"/>
<img src="./assets/deno.jpg" width="45%" style="border-radius:10px" alt="Gallery image 4"/>

</div>

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Push the branch.
5. Open a pull request.

---

## ⚠️ Disclaimer

This project is **not affiliated with, endorsed by, or connected to WhatsApp Inc. or Meta**. Use responsibly and at your own risk. Automating WhatsApp may violate its Terms of Service.

---

## 📜 License

This project is licensed under the **MIT License**. You may use, modify, and distribute it with proper credit.

---

## 👤 About the Developer

<div align="center">

<img src="https://github.com/ArslanTech-dev.png" width="150" style="border-radius:50%; border:4px solid #6C63FF"/>

<img src="https://readme-typing-svg.demolab.com/?lines=Hi+%F0%9F%91%8B%2C+I'm+Arslan;AI+Assistant+Programmer+%F0%9F%A4%96;AI+Developer+%F0%9F%A7%A0;Bots+Developer+%E2%9A%99%EF%B8%8F&font=Fira+Code&center=true&width=600&height=45&color=6C63FF&vCenter=true&size=20&pause=1000&background=0D111700" alt="Developer typing bio"/>

</div>

```yaml
Name:       Arslan
Age:        17
Country:    🇵🇰 Pakistan
City:       Bahawalpur
Education:  ICS — Punjab College, Hasilpur
Roles:      AI Assistant Programmer | AI Developer | Bots Developer
Goal:       AI/ML Engineer @ Microsoft / Google
Brand:      ARSLAN TECH'S
```

<div align="center">

📧 **Email:** arslanchkpt@gmail.com
📱 **Contact:** +92 308 4991001
🔗 **GitHub:** [@ArslanTech-dev](https://github.com/ArslanTech-dev)

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:arslanchkpt@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/923084991001)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ArslanTech-dev)

</div>

---

<div align="center">

## ⭐ Support The Project

If ARSLAN-MD-ULTRA helped you, consider starring the repository.

<img src="https://readme-typing-svg.demolab.com/?lines=Thanks+for+visiting+the+project+%F0%9F%92%9C;Star+%E2%AD%90+if+you+like+it%21;Let's+build+something+amazing+together+%F0%9F%9A%80&font=Fira+Code&center=true&width=620&height=42&color=6C63FF&vCenter=true&size=19&pause=1000&background=0D111700" alt="Animated closing message"/>

### 🔥 Powered by **ARSLAN TECH'S** 🔥

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=150&section=footer" width="100%" alt="Animated footer"/>

</div>
