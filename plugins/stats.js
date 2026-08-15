// plugins/stats.js
const os = require('os');
const { fancyLog } = require('../utils/logger');

module.exports = {
    stats: async (ctx) => {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const mins = Math.floor((uptime % 3600) / 60);
        const mem = os.totalmem() / 1024 / 1024 / 1024;
        const freeMem = os.freemem() / 1024 / 1024 / 1024;
        await ctx.react('📊');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📊 *Bot Statistics*\n\n⏱️ Uptime: ${hours}h ${mins}m\n🧠 Total RAM: ${mem.toFixed(2)}GB\n🟢 Free RAM: ${freeMem.toFixed(2)}GB\n📦 Commands: ${Object.keys(global.commands || {}).length || 'N/A'}`
        }, { quoted: ctx.msg });
        fancyLog('STATS', 'Stats shown');
    }
};