// plugins/settings.js
// Commands: welcome, goodbye, setwelcome, setgoodbye, antiedit, autoread,
// antilink, antidelete, recording, statusview, autoreact, anticall,
// anticallmsg, autotyping, online, mode, prefix, botname, ownername,
// ownernumber, description, botdp, stickername, settings, editpath,
// reactemojis, owneremojis

const fs = require('fs');
const config = require('../config');

// Helper to update config (simple version – you can use a config store)
function updateConfig(key, value) {
    // In production, save to a JSON file or database
    global._settings = global._settings || {};
    global._settings[key] = value;
    return true;
}

module.exports = {
    welcome: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.welcome || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('welcome', newStatus);
        await ctx.react('👋');
        await ctx.sock.sendMessage(ctx.from, {
            text: `👋 *WELCOME*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    goodbye: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.goodbye || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('goodbye', newStatus);
        await ctx.react('👋');
        await ctx.sock.sendMessage(ctx.from, {
            text: `👋 *GOODBYE*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    setwelcome: async (ctx) => {
        const text = ctx.args.join(' ') || 'Welcome @user to the group!';
        updateConfig('welcomeMsg', text);
        await ctx.react('✍️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✍️ *WELCOME MSG SET*\n\n${text}`
        }, { quoted: ctx.msg });
    },

    setgoodbye: async (ctx) => {
        const text = ctx.args.join(' ') || 'Goodbye @user, see you later!';
        updateConfig('goodbyeMsg', text);
        await ctx.react('✍️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✍️ *GOODBYE MSG SET*\n\n${text}`
        }, { quoted: ctx.msg });
    },

    antiedit: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.antiEdit || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('antiEdit', newStatus);
        await ctx.react('📝');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📝 *ANTI EDIT*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    autoread: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.autoRead || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('autoRead', newStatus);
        await ctx.react('👁️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `👁️ *AUTO READ*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    antilink: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.antiLink || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('antiLink', newStatus);
        await ctx.react('🔗');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🔗 *ANTI LINK*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    antidelete: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.antiDelete || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('antiDelete', newStatus);
        await ctx.react('🗑️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🗑️ *ANTI DELETE*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    recording: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.recording || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('recording', newStatus);
        await ctx.react('🎙️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🎙️ *RECORDING*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    statusview: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.statusView || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('statusView', newStatus);
        await ctx.react('📺');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📺 *STATUS VIEW*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    autoreact: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.autoReact || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('autoReact', newStatus);
        await ctx.react('😊');
        await ctx.sock.sendMessage(ctx.from, {
            text: `😊 *AUTO REACT*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    anticall: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = config.ANTI_CALL || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        // Update config (you may need to save to file)
        config.ANTI_CALL = newStatus;
        await ctx.react('📵');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📵 *ANTI CALL*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    anticallmsg: async (ctx) => {
        const text = ctx.args.join(' ') || 'Sorry, I don\'t accept calls. Please DM me.';
        config.CALL_MSG = text;
        await ctx.react('💬');
        await ctx.sock.sendMessage(ctx.from, {
            text: `💬 *ANTI CALL MSG SET*\n\n${text}`
        }, { quoted: ctx.msg });
    },

    autotyping: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.autoTyping || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('autoTyping', newStatus);
        await ctx.react('⌨️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `⌨️ *AUTO TYPING*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    online: async (ctx) => {
        const status = ctx.args[0] || 'toggle';
        const current = global._settings?.online || false;
        const newStatus = status === 'on' ? true : status === 'off' ? false : !current;
        updateConfig('online', newStatus);
        await ctx.react('🟢');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🟢 *ONLINE STATUS*\n\nStatus: ${newStatus ? 'ON ✅' : 'OFF ❌'}`
        }, { quoted: ctx.msg });
    },

    mode: async (ctx) => {
        const mode = ctx.args[0] || 'public';
        const valid = ['public', 'private'];
        if (!valid.includes(mode)) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Use: .mode public/private'
            }, { quoted: ctx.msg });
        }
        updateConfig('mode', mode);
        await ctx.react('⚙️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `⚙️ *BOT MODE*\n\nMode set to: ${mode.toUpperCase()}`
        }, { quoted: ctx.msg });
    },

    prefix: async (ctx) => {
        const newPrefix = ctx.args[0] || '.';
        global.PREFIX = newPrefix;
        await ctx.react('#️⃣');
        await ctx.sock.sendMessage(ctx.from, {
            text: `#️⃣ *PREFIX CHANGED*\n\nNew prefix: ${newPrefix}`
        }, { quoted: ctx.msg });
    },

    botname: async (ctx) => {
        const name = ctx.args.join(' ') || 'ARSLAN BOT';
        global.BOT_NAME = name;
        await ctx.react('🤖');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🤖 *BOT NAME*\n\nName: ${name}`
        }, { quoted: ctx.msg });
    },

    ownername: async (ctx) => {
        const name = ctx.args.join(' ') || 'ARSLAN';
        global.OWNER_NAME = name;
        await ctx.react('👑');
        await ctx.sock.sendMessage(ctx.from, {
            text: `👑 *OWNER NAME*\n\nName: ${name}`
        }, { quoted: ctx.msg });
    },

    ownernumber: async (ctx) => {
        const num = ctx.args[0] || '923xxxxxxxxx';
        // Update owner array
        global.OWNER = [`${num}@s.whatsapp.net`];
        await ctx.react('📞');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📞 *OWNER NUMBER*\n\nNumber: ${num}`
        }, { quoted: ctx.msg });
    },

    description: async (ctx) => {
        const desc = ctx.args.join(' ') || 'ARSLAN TECH\'S BOT';
        updateConfig('description', desc);
        await ctx.react('📄');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📄 *DESCRIPTION*\n\n${desc}`
        }, { quoted: ctx.msg });
    },

    botdp: async (ctx) => {
        // Reply to an image to set bot DP
        const quoted = ctx.msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted || !quoted.imageMessage) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Reply to an image with .botdp'
            }, { quoted: ctx.msg });
        }
        // Download image and set as profile pic
        // For now, just a stub
        await ctx.react('🖼️');
        await ctx.sock.sendMessage(ctx.from, {
            text: '🖼️ *BOT DP*\n\nImage received. (Set DP logic not implemented in this stub)'
        }, { quoted: ctx.msg });
    },

    stickername: async (ctx) => {
        const name = ctx.args.join(' ') || 'ARSLAN TECH\'S';
        updateConfig('stickerAuthor', name);
        await ctx.react('🎨');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🎨 *STICKER NAME*\n\nAuthor: ${name}`
        }, { quoted: ctx.msg });
    },

    settings: async (ctx) => {
        await ctx.react('⚙️');
        const settings = global._settings || {};
        const text = `⚙️ *BOT SETTINGS*\n\n` +
                     `Welcome: ${settings.welcome ? '✅' : '❌'}\n` +
                     `Goodbye: ${settings.goodbye ? '✅' : '❌'}\n` +
                     `AntiEdit: ${settings.antiEdit ? '✅' : '❌'}\n` +
                     `AntiDelete: ${settings.antiDelete ? '✅' : '❌'}\n` +
                     `AutoRead: ${settings.autoRead ? '✅' : '❌'}\n` +
                     `AntiLink: ${settings.antiLink ? '✅' : '❌'}\n` +
                     `AutoReact: ${settings.autoReact ? '✅' : '❌'}\n` +
                     `AutoTyping: ${settings.autoTyping ? '✅' : '❌'}\n` +
                     `Mode: ${settings.mode || 'public'}\n` +
                     `Prefix: ${global.PREFIX}\n` +
                     `Bot Name: ${global.BOT_NAME}\n` +
                     `Owner: ${global.OWNER_NAME}`;
        await ctx.sock.sendMessage(ctx.from, { text }, { quoted: ctx.msg });
    },

    editpath: async (ctx) => {
        // Placeholder
        await ctx.react('📁');
        await ctx.sock.sendMessage(ctx.from, {
            text: '📁 *EDIT PATH*\n\nFeature coming soon.'
        }, { quoted: ctx.msg });
    },

    reactemojis: async (ctx) => {
        const emojis = ctx.args.join(' ') || '😊 ❤️ 🔥';
        updateConfig('reactEmojis', emojis);
        await ctx.react('😊');
        await ctx.sock.sendMessage(ctx.from, {
            text: `😊 *REACT EMOJIS*\n\nSet: ${emojis}`
        }, { quoted: ctx.msg });
    },

    owneremojis: async (ctx) => {
        const emojis = ctx.args.join(' ') || '👑 🔥 💰';
        updateConfig('ownerEmojis', emojis);
        await ctx.react('👑');
        await ctx.sock.sendMessage(ctx.from, {
            text: `👑 *OWNER EMOJIS*\n\nSet: ${emojis}`
        }, { quoted: ctx.msg });
    },
};