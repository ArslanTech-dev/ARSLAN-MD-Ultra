// plugins/customcmd.js
const { runQuery, getQuery } = require('../utils/database');
const { fancyLog } = require('../utils/logger');

module.exports = {
    addcmd: async (ctx) => {
        const args = ctx.args;
        if (args.length < 2) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .addcmd trigger response' }, { quoted: ctx.msg });
        const trigger = args[0].toLowerCase();
        const response = args.slice(1).join(' ');
        await runQuery('INSERT INTO custom_commands (jid, trigger, response) VALUES (?, ?, ?)', [ctx.from, trigger, response]);
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, { text: `✅ Command "${trigger}" added!` }, { quoted: ctx.msg });
        fancyLog('CUSTOM', `Custom command added: ${trigger}`);
    },
    delcmd: async (ctx) => {
        const trigger = ctx.args[0]?.toLowerCase();
        if (!trigger) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .delcmd trigger' }, { quoted: ctx.msg });
        await runQuery('DELETE FROM custom_commands WHERE jid = ? AND trigger = ?', [ctx.from, trigger]);
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, { text: `✅ Command "${trigger}" removed!` }, { quoted: ctx.msg });
        fancyLog('CUSTOM', `Custom command removed: ${trigger}`);
    },
    listcmd: async (ctx) => {
        const cmds = await allQuery('SELECT trigger FROM custom_commands WHERE jid = ?', [ctx.from]);
        if (!cmds.length) return ctx.sock.sendMessage(ctx.from, { text: '❌ No custom commands found.' }, { quoted: ctx.msg });
        let list = '📋 *Custom Commands*\n\n';
        cmds.forEach(c => list += `- ${c.trigger}\n`);
        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
    }
};