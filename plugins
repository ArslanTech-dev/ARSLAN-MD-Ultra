// plugins/example.js
// This plugin adds a custom command ".hello"
module.exports = {
    hello: async (ctx) => {
        await ctx.react('👋');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *HELLO PLUGIN* ⬡─╮
│
│ Hello! This is from a plugin.
│ You can add your own commands here.
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    }
};