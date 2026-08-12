// commands/ai.js
// All AI commands

module.exports = {
    gpt: async (ctx) => {
        const query = ctx.args.join(' ');
        if (!query) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .gpt <question>' });
        await ctx.react('🧠');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *CHATGPT AI* ⬡─╮
│
│ 🤖 Model: GPT-4 Turbo
│ ❓ ${query}
│ ⏳ Thinking...
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
        // Call ChatGPT API here
    },

    gemini: async (ctx) => {
        const query = ctx.args.join(' ');
        if (!query) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .gemini <question>' });
        await ctx.react('💎');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *GEMINI AI* ⬡─╮
│
│ 💎 Model: Gemini 1.5 Pro
│ ❓ ${query}
│ ⏳ Processing...
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    // ... add claudeai, deepseek, codeai, bot
};