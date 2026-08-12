// commands/owner.js
// Owner-only commands

module.exports = {
    block: async (ctx) => {
        if (!ctx.isOwner) return;
        const target = ctx.mentionedJid[0] || ctx.quotedSender;
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: 'Tag a user.' });
        await ctx.sock.updateBlockStatus(target, 'block');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🚫 Blocked @${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: ctx.msg });
    },

    unblock: async (ctx) => {
        if (!ctx.isOwner) return;
        const target = ctx.mentionedJid[0] || ctx.quotedSender;
        if (!target) return ctx.sock.sendMessage(ctx.from, { text: 'Tag a user.' });
        await ctx.sock.updateBlockStatus(target, 'unblock');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✅ Unblocked @${target.split('@')[0]}`,
            mentions: [target]
        }, { quoted: ctx.msg });
    },

    pair: async (ctx) => {
        if (!ctx.isOwner) return;
        await ctx.react('🔑');
        // This is just a placeholder – pairing is done on startup
        await ctx.sock.sendMessage(ctx.from, {
            text: `🔑 *PAIRING*\n\nPairing is done automatically on startup.\nSet PAIRING_NUMBER in config.js.`
        }, { quoted: ctx.msg });
    },

    // ... add any other owner-specific commands (eval, exec, etc.)
};