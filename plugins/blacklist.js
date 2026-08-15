// plugins/blacklist.js
const { runQuery, getQuery } = require('../utils/database');
const { fancyLog } = require('../utils/logger');

module.exports = {
    blockuser: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Owner only.' }, { quoted: ctx.msg });
        const target = ctx.mentionedJid[0] || ctx.args[0];
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: '❌ Mention a user.' }, { quoted: ctx.msg });
        await runQuery('INSERT INTO blacklist (jid, type) VALUES (?, ?)', [target, 'user']);
        await ctx.react('🚫');
        await ctx.sock.sendMessage(ctx.from, { text: `🚫 User ${target} blacklisted.` }, { quoted: ctx.msg });
        fancyLog('BLACKLIST', `User ${target} blacklisted`);
    },
    unblockuser: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Owner only.' }, { quoted: ctx.msg });
        const target = ctx.mentionedJid[0] || ctx.args[0];
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: '❌ Mention a user.' }, { quoted: ctx.msg });
        await runQuery('DELETE FROM blacklist WHERE jid = ?', [target]);
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, { text: `✅ User ${target} unblacklisted.` }, { quoted: ctx.msg });
        fancyLog('BLACKLIST', `User ${target} unblacklisted`);
    }
};