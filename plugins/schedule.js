// plugins/schedule.js
const { fancyLog } = require('../utils/logger');

const schedules = [];

module.exports = {
    schedule: async (ctx) => {
        const args = ctx.args;
        if (args.length < 3) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .schedule 14:30 Hello' }, { quoted: ctx.msg });
        const time = args[0];
        const msg = args.slice(1).join(' ');
        const [hours, mins] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(mins)) return ctx.sock.sendMessage(ctx.from, { text: '❌ Invalid time. Use HH:MM format.' }, { quoted: ctx.msg });
        const now = new Date();
        const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, mins);
        if (target < now) target.setDate(target.getDate() + 1);
        schedules.push({ from: ctx.from, msg, time: target.getTime() });
        await ctx.react('⏰');
        await ctx.sock.sendMessage(ctx.from, { text: `⏰ Message scheduled for ${time}.` }, { quoted: ctx.msg });
        fancyLog('SCHEDULE', `Scheduled message for ${ctx.from}`);
    }
};