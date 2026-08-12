// handlers/message.js
const config = require('../config');
const { getContentType } = require('@whiskeysockets/baileys');
const { fancyLog } = require('../utils/logger');
const fs = require('fs');
const path = require('path');

// Load core commands
const funCmds = require('../commands/fun');
const groupCmds = require('../commands/group');
const downloadCmds = require('../commands/download');
const aiCmds = require('../commands/ai');
const ownerCmds = require('../commands/owner');
const systemCmds = require('../commands/system');

// ─── PLUGIN LOADER ────────────────────────────
function loadPlugins() {
    const pluginsDir = path.join(__dirname, '..', 'plugins');
    const pluginCommands = {};
    if (fs.existsSync(pluginsDir)) {
        const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'));
        for (const file of files) {
            try {
                const plugin = require(path.join(pluginsDir, file));
                // Assume plugin exports an object with command names as keys
                Object.assign(pluginCommands, plugin);
                fancyLog('INFO', `Loaded plugin: ${file}`);
            } catch (err) {
                fancyLog('ERROR', `Failed to load plugin ${file}: ${err.message}`);
            }
        }
    }
    return pluginCommands;
}

// Merge all commands
const coreCommands = {
    ...funCmds,
    ...groupCmds,
    ...downloadCmds,
    ...aiCmds,
    ...ownerCmds,
    ...systemCmds,
};

const pluginCommands = loadPlugins();
const allCommands = { ...coreCommands, ...pluginCommands };

// ─── MESSAGE HANDLER ───────────────────────────
global.antiDeleteData = new Map();

module.exports = {
    handleMessage: async (sock, msg) => {
        const from = msg.key.remoteJid;
        const type = getContentType(msg.message);
        const body = msg.message.conversation ||
                     msg.message[type]?.text ||
                     msg.message.extendedTextMessage?.text || '';

        if (!body.startsWith(config.PREFIX)) return;

        const args = body.slice(config.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const ctx = {
            sock,
            msg,
            from,
            args,
            command,
            isOwner: config.OWNER.includes(from),
            isGroup: from.endsWith('@g.us'),
            mentionedJid: msg.message.extendedTextMessage?.contextInfo?.mentionedJid || [],
            quotedMsg: msg.message.extendedTextMessage?.contextInfo?.quotedMessage,
            quotedSender: msg.message.extendedTextMessage?.contextInfo?.participant,
            react: async (emoji) => {
                await sock.sendMessage(from, { react: { text: emoji, key: msg.key } });
            },
            antiBan: async () => true,
        };

        fancyLog('COMMAND', `${command} used by ${from}`);

        if (allCommands[command]) {
            try {
                await allCommands[command](ctx);
            } catch (err) {
                fancyLog('ERROR', `Command ${command} failed: ${err.message}`);
                await ctx.react('⚠️');
                await sock.sendMessage(from, { text: `❌ Error: ${err.message}` }, { quoted: msg });
            }
        }
        // Unknown commands are silently ignored.
    }
};