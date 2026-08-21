// ===============================================
// ARSLAN MD ULTRA v4.0 – MODULAR & PLUGIN‑READY
// CREATOR: ARSLAN TECH'S
// ===============================================

const express = require('express');
const cors = require('cors');
const { Boom } = require('@hapi/boom');
const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const chalk = require('chalk');
const config = require('./config');
const { handleMessage } = require('./handlers/message');
const { requestPairingCode } = require('./pair');
const { fancyLog } = require('./utils/logger');

// ===== GLOBALS =====
global.PREFIX = config.PREFIX;
global.BOT_NAME = config.BOT_NAME;
global.BOT_LOGO = config.BOT_LOGO;
global.OWNER = config.OWNER;
global.OWNER_NAME = config.OWNER_NAME;
global.VERSION = config.VERSION;

// ===== EXPRESS APP =====
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ===== HEALTH CHECK (Pxxl کے لیے) =====
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// ===== ROOT (پیرنگ پیج) =====
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// ===== PAIRING VIA WEB =====
let sock; // بوٹ سوکٹ کو یہاں اسٹور کریں گے
app.post('/pair', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ error: 'Phone number required' });
        }
        if (!sock) {
            return res.status(503).json({ error: 'Bot is not connected yet' });
        }
        const code = await sock.requestPairingCode(phone);
        res.json({ success: true, code });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== START BOT =====
let reconnecting = false;

async function startBot() {
    if (reconnecting) return;
    reconnecting = true;

    fancyLog('INFO', `Starting ${global.BOT_NAME}...`);

    const { state, saveCreds } = await useMultiFileAuthState('session');
    sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: ['Ubuntu', 'Chrome', '20.0.04'],
        syncFullHistory: false,
        markOnlineOnConnect: false,
        connectTimeoutMs: 60000,
        getMessage: async () => ({ conversation: '' }),
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        // ---------- PAIRING CODE (using pair.js) ----------
        if (qr) {
            await requestPairingCode(sock, config.PAIRING_NUMBER);
        }

        if (connection === 'close') {
            reconnecting = false;
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            fancyLog('ERROR', `Connection closed. Reason: ${reason}`);
            if (reason === DisconnectReason.loggedOut) {
                fancyLog('ERROR', 'Logged out. Delete session folder and restart.');
            } else {
                fancyLog('INFO', 'Reconnecting in 5 seconds...');
                setTimeout(startBot, 5000);
            }
        } else if (connection === 'open') {
            reconnecting = false;
            fancyLog('SUCCESS', `${global.BOT_NAME} Connected!`);

            // ---------- WELCOME MESSAGE TO OWNER (WITH LOGO) ----------
            const ownerJid = config.OWNER[0];
            if (ownerJid) {
                try {
                    // تصویر کے ساتھ خوش آمدید پیغام
                    await sock.sendMessage(ownerJid, {
                        image: { url: global.BOT_LOGO },
                        caption: `╭─⬡ *${global.BOT_NAME} ONLINE* ⬡─╮
│
│ ✅ Bot started successfully!
│ 🧠 Version: ${global.VERSION}
│ 👑 Owner: ${global.OWNER_NAME}
│ 🔗 Now listening for commands...
│
╰───────────────────╯
> *Powered by ARSLAN TECH'S*`,
                    });
                    fancyLog('SUCCESS', 'Welcome message with logo sent to owner.');
                } catch (err) {
                    fancyLog('ERROR', 'Could not send welcome message.');
                }
            }
        }
    });

    // ---------- MESSAGE HANDLER ----------
    sock.ev.on('messages.upsert', async (m) => {
        try {
            const msg = m.messages[0];
            if (!msg.message || msg.key.fromMe) return;
            await handleMessage(sock, msg);
        } catch (err) {
            fancyLog('ERROR', `Message handler error: ${err.message}`);
        }
    });

    // ---------- ANTI-CALL ----------
    if (config.ANTI_CALL) {
        sock.ev.on('CB:call', async (json) => {
            const callId = json.content[0].attrs['call-id'];
            const callerId = json.content[0].attrs['from'];
            await sock.rejectCall(callId, callerId);
            fancyLog('ANTICALL', `Rejected call from ${callerId}`);
            if (config.AUTO_BLOCK_CALL) {
                await sock.updateBlockStatus(callerId, 'block');
                fancyLog('BLOCK', `Blocked caller ${callerId}`);
            }
        });
    }

    return sock;
}

// ===== START SERVER FIRST =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Web server running on port ${PORT}`);
    fancyLog('INFO', `Web server ready at port ${PORT}`);
});

// ===== START BOT AFTER SERVER =====
startBot().catch((err) => {
    fancyLog('ERROR', `Start failed: ${err.message}`);
});