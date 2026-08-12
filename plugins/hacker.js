// plugins/hacker.js
const crypto = require('crypto');
const os = require('os');

module.exports = {
    ipinfo: async (ctx) => {
        const ip = ctx.args[0] || '127.0.0.1';
        await ctx.react('🌐');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🌐 *IP INFO*\n\nIP: ${ip}\nCountry: Unknown\nCity: Unknown\nISP: Unknown\n(Simulation)`
        }, { quoted: ctx.msg });
    },

    scan: async (ctx) => {
        const target = ctx.args[0] || 'localhost';
        await ctx.react('🔍');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🔍 *PORT SCAN*\n\nTarget: ${target}\nOpen Ports: 80, 443, 22\n(Simulation)`
        }, { quoted: ctx.msg });
    },

    encode: async (ctx) => {
        const text = ctx.args.join(' ') || 'Hello World';
        const encoded = Buffer.from(text).toString('base64');
        await ctx.react('🔐');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🔐 *BASE64 ENCODE*\n\nInput: ${text}\nOutput: ${encoded}`
        }, { quoted: ctx.msg });
    },

    hash: async (ctx) => {
        const text = ctx.args.join(' ') || 'password';
        const md5 = crypto.createHash('md5').update(text).digest('hex');
        await ctx.react('#️⃣');
        await ctx.sock.sendMessage(ctx.from, {
            text: `#️⃣ *MD5 HASH*\n\nInput: ${text}\nMD5: ${md5}`
        }, { quoted: ctx.msg });
    },

    sysinfo: async (ctx) => {
        const uptime = Math.floor(process.uptime() / 60);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        await ctx.react('⚡');
        await ctx.sock.sendMessage(ctx.from, {
            text: `⚡ *SYSTEM INFO*\n\nBot: ${global.BOT_NAME}\nPlatform: ${os.platform()}\nUptime: ${uptime} min\nFree RAM: ${freeMem} GB\nStatus: Online`
        }, { quoted: ctx.msg });
    },

    sqlprank: async (ctx) => {
        const target = ctx.args[0] || 'database';
        await ctx.react('💉');
        await ctx.sock.sendMessage(ctx.from, {
            text: `💉 *SQL PRANK*\n\nTarget: ${target}\n[██████████] 100%\nData extracted: users, admin, passwords\n(Simulation)`
        }, { quoted: ctx.msg });
    },
};