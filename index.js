// ===============================================
// ARSLAN MD ULTRA v4.0 – MODULAR & PLUGIN‑READY
// CREATOR: ARSLAN TECH'S
// ===============================================

const { Boom } = require('@hapi/boom');
const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const chalk = require('chalk');
const fs = require('fs');
const config = require('./config');
const { handleMessage } = require('./handlers');
const { requestPairingCode } = require('./pair');
const { fancyLog } = require('./utils/logger');

// ===== GLOBALS =====
global.PREFIX = config.PREFIX;
global.BOT_NAME = config.BOT_NAME;
global.BOT_LOGO = config.BOT_LOGO;
global.OWNER = config.OWNER;
global.OWNER_NAME = config.OWNER_NAME;
global.VERSION = config.VERSION;

// ===== START BOT =====
let sock;
let reconnecting = false;
let connectionState = 'starting';
let pairingCode = null;
let pairingRequestedAt = 0;
let pairingRequestPromise = null;
const startedAt = Date.now();

async function startBot() {
    if (reconnecting) return;
    reconnecting = true;
    connectionState = 'starting';

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
        if (update.qr) {
            connectionState = 'pairing';
            try {
                await createPairingCode(config.PAIRING_NUMBER);
            } catch (err) {
                fancyLog('ERROR', `Pairing failed: ${err.message}`);
            }
        }

        if (connection === 'close') {
            reconnecting = false;
            connectionState = 'disconnected';
            pairingCode = null;
            pairingRequestPromise = null;
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            fancyLog('ERROR', `Connection closed. Reason: ${reason}`);
            if (reason === DisconnectReason.loggedOut) {
                pairingCode = null;
                pairingRequestPromise = null;
                try {
                    fs.rmSync('session', { recursive: true, force: true });
                    fs.mkdirSync('session', { recursive: true });
                    fancyLog('WARN', 'Invalid WhatsApp session cleared. Starting fresh pairing...');
                } catch (err) {
                    fancyLog('ERROR', `Could not reset WhatsApp session: ${err.message}`);
                }
                setTimeout(startBot, 3000);
            } else {
                fancyLog('INFO', 'Reconnecting in 5 seconds...');
                setTimeout(startBot, 5000);
            }
        } else if (connection === 'open') {
            reconnecting = false;
            connectionState = 'connected';
            pairingCode = null;
            fancyLog('SUCCESS', `${global.BOT_NAME} Connected!`);

            // ---------- WELCOME MESSAGE TO OWNER ----------
            const ownerJid = config.OWNER[0];
            if (ownerJid) {
                try {
                    await sock.sendMessage(ownerJid, {
                        text: `╭─⬡ *${global.BOT_NAME} ONLINE* ⬡─╮
│
│ ✅ Bot started successfully!
│ 🧠 Version: ${global.VERSION}
│ 👑 Owner: ${global.OWNER_NAME}
│ 🔗 Now listening for commands...
│
╰───────────────────╯
> *Powered by ARSLAN TECH'S*`,
                    });
                    fancyLog('SUCCESS', 'Welcome message sent to owner.');
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

async function createPairingCode(phoneNumber = config.PAIRING_NUMBER) {
    if (!sock) {
        throw new Error('WhatsApp connection is still starting. Try again in a few seconds.');
    }
    if (connectionState === 'connected') {
        throw new Error('This bot is already connected to WhatsApp.');
    }

    const now = Date.now();
    if (pairingCode && now - pairingRequestedAt < 45000) {
        return pairingCode;
    }

    if (pairingRequestPromise) return pairingRequestPromise;

    pairingRequestedAt = now;
    pairingRequestPromise = (async () => {
        const code = await requestPairingCode(sock, phoneNumber);
        if (!code) throw new Error('WhatsApp did not return a pairing code.');
        pairingCode = code;
        setTimeout(() => {
            if (Date.now() - pairingRequestedAt >= 45000) pairingCode = null;
        }, 45000);
        return pairingCode;
    })().finally(() => {
        pairingRequestPromise = null;
    });

    return pairingRequestPromise;
}

function getBotStatus() {
    const uptimeSeconds = Math.floor((Date.now() - startedAt) / 1000);
    return {
        name: global.BOT_NAME,
        version: global.VERSION,
        state: connectionState,
        connected: connectionState === 'connected' && Boolean(sock?.user),
        pairingAvailable: connectionState !== 'disconnected' && Boolean(sock && !sock.user),
        uptimeSeconds,
        nodeVersion: process.versions.node,
    };
}

if (require.main === module) {
    startBot().catch((err) => {
        fancyLog('ERROR', `Start failed: ${err.message}`);
    });
}

module.exports = { createPairingCode, getBotStatus, startBot };