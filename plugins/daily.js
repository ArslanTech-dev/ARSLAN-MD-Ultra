// plugins/daily.js
const { getQuery, runQuery } = require('../utils/database');
const { fancyLog } = require('../utils/logger');

module.exports = {
    daily: async (ctx) => {
        const from = ctx.from;
        let user = await getQuery('SELECT * FROM economy WHERE jid = ?', [from]);
        if (!user) {
            await runQuery('INSERT INTO economy (jid, coins, last_daily) VALUES (?, ?, ?)', [from, 0, 0]);
            user = { coins: 0, last_daily: 0 };
        }
        const now = Date.now();
        const cooldown = 24 * 60 * 60 * 1000;
        if (user.last_daily && (now - user.last_daily) < cooldown) {
            const remaining = cooldown - (now - user.last_daily);
            const hours = Math.floor(remaining / 3600000);
            const mins = Math.floor((remaining % 3600000) / 60000);
            return ctx.sock.sendMessage(from, { text: `⏳ Already claimed! Try again in ${hours}h ${mins}m.` }, { quoted: ctx.msg });
        }
        const bonus = Math.floor(Math.random() * 100) + 50;
        await runQuery('UPDATE economy SET coins = coins + ?, last_daily = ? WHERE jid = ?', [bonus, now, from]);
        await ctx.react('🎁');
        await ctx.sock.sendMessage(from, { text: `🎁 Daily bonus: +${bonus} coins!` }, { quoted: ctx.msg });
        fancyLog('DAILY', `Daily bonus for ${from}: +${bonus}`);
    }
};