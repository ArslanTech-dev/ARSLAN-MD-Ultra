// plugins/leveling.js
const { getQuery, runQuery } = require('../utils/database');
const { fancyLog } = require('../utils/logger');

module.exports = {
    level: async (ctx) => {
        const from = ctx.from;
        let user = await getQuery('SELECT * FROM levels WHERE jid = ?', [from]);
        if (!user) {
            await runQuery('INSERT INTO levels (jid, xp, level) VALUES (?, ?, ?)', [from, 0, 1]);
            user = { xp: 0, level: 1 };
        }
        const xpToLevel = user.level * 100;
        if (user.xp >= xpToLevel) {
            const newLevel = user.level + 1;
            await runQuery('UPDATE levels SET level = ?, xp = 0 WHERE jid = ?', [newLevel, from]);
            await ctx.sock.sendMessage(from, { text: `🎉 *Level Up!* You are now level ${newLevel}!` }, { quoted: ctx.msg });
            fancyLog('LEVEL', `${from} leveled up to ${newLevel}`);
        }
    },
    rank: async (ctx) => {
        const from = ctx.from;
        const user = await getQuery('SELECT * FROM levels WHERE jid = ?', [from]);
        if (!user) return ctx.sock.sendMessage(from, { text: '❌ No data found.' }, { quoted: ctx.msg });
        const users = await allQuery('SELECT * FROM levels ORDER BY xp DESC LIMIT 10');
        let rank = users.findIndex(u => u.jid === from) + 1;
        if (rank === 0) rank = 'N/A';
        await ctx.sock.sendMessage(from, {
            text: `📊 *Ranking*\nLevel: ${user.level}\nXP: ${user.xp}\nRank: #${rank}`
        }, { quoted: ctx.msg });
    }
};