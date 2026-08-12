// plugins/unique.js
module.exports = {
    aiimg: async (ctx) => {
        const prompt = ctx.args.join(' ') || 'random';
        await ctx.react('🎨');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🎨 *AI IMAGE*\n\nPrompt: ${prompt}\nGenerating... (stub)`
        }, { quoted: ctx.msg });
    },

    fakechat: async (ctx) => {
        const name = ctx.args[0] || 'Unknown';
        const message = ctx.args.slice(1).join(' ') || 'Hello!';
        await ctx.react('💬');
        await ctx.sock.sendMessage(ctx.from, {
            text: `💬 *FAKE CHAT*\n\nFrom: ${name}\nMessage: ${message}\n\n(Simulated)`
        }, { quoted: ctx.msg });
    },

    tempmail: async (ctx) => {
        const random = Math.random().toString(36).substring(2, 10);
        await ctx.react('📧');
        await ctx.sock.sendMessage(ctx.from, {
            text: `📧 *TEMP EMAIL*\n\n${random}@tempmail.com\nExpires in 10 minutes.`
        }, { quoted: ctx.msg });
    },

    quote: async (ctx) => {
        const quotes = [
            "Success is not final, failure is not fatal.",
            "Khamoshi me badi taqat hoti hai.",
            "Mehnat ka phal meetha hota hai.",
            "Life is what happens when you're busy making plans.",
        ];
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        await ctx.react('✨');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✨ *QUOTE*\n\n"${q}"\n\n- ARSLAN MD`
        }, { quoted: ctx.msg });
    },
};