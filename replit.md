# ARSLAN-MD-ULTRA

## Run

This project is a Node.js WhatsApp bot with a browser-based pairing page. Start
it with:

```bash
node server.js
```

The bot requires Node.js 20 or newer. On first start, copy the pairing code
from the pairing page into WhatsApp under **Linked devices**. The page is
served on port 5000. The linked session is stored in the local `session/`
directory. The pairing helper uses the current Baileys auth flow with
readiness retries and diagnostics for passkey/WebAuthn challenges.

If WhatsApp reports that the saved session is invalid, remove the local
session directory and restart the bot to generate a fresh pairing code:

```bash
rm -rf session
npm start
```

Public pairing is enabled by default, so any valid WhatsApp number can request
a code from the website. The bot supports one active WhatsApp connection at a
time and limits repeated requests. To restore owner-only pairing, set
`PUBLIC_PAIRING=false` and provide `PAIRING_NUMBER` as a private environment
variable.

## Deploy on Pxxl.app

Deploy the repository as a **Web Service** from GitHub with these settings:

- Runtime: Node.js 20
- Package manager: npm
- Install command: `npm ci`
- Build command: none
- Start command: `npm start`
- Port: `5000` (or the platform-provided `PORT`)
- Bind address: `0.0.0.0`

Add `PAIRING_NUMBER` as a project environment variable or secret in Pxxl
before deploying. Pxxl injects `PORT` at runtime, and `server.js` uses it
automatically. Do not deploy this project as a static app because the
WhatsApp connection and pairing endpoint require a running server.