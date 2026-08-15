// plugins/reminder.js
const { fancyLog } = require('../utils/logger');

const reminders = [];

module.exports = {
    remind: async (ctx) => {
        const args = ctx.args;
        if (args.length < 2) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .remind 10m Buy milk' }, { quoted: ctx.msg });
        const timeStr = args[0];
        const msg = args.slice(1).join(' ');
        const match = timeStr.match(/(\d+)(m|h|s)/);
        if (!match) return ctx.sock.sendMessage(ctx.from, { text: '❌ Invalid time format. Use 10m, 1h, 30s.' }, { quoted: ctx.msg });
        const value = parseInt(match[1]);
        const unit = match[2];
        const ms = unit === 'm' ? value * 60000 : unit === 'h' ? value * 3600000 : value * 1000;
        reminders.push({ from: ctx.from, msg, time: Date.now() + ms });
        await ctx.react('⏰');
        await ctx.sock.sendMessage(ctx.from, { text: `⏰ Reminder set for ${timeStr}: "${msg}"` }, { quoted: ctx.msg });
        fancyLog('REMINDER', `Reminder set for ${ctx.from}`);
    }
};

// Global check (to be added to index.js)
setInterval(() => {
    const now = Date.now();
    const toSend = reminders.filter(r => r.time <= now);
    reminders = reminders.filter(r => r.time > now);
    for (const r of toSend) {
        // Send reminder (needs sock)
        // This will be handled in index.js
    }
}, 10000);