/**
 * Safe romance commands
 *
 * These commands are text-only. They do not fetch or send explicit media,
 * and messages involving Saba stay respectful and consent-aware.
 */

const { fancyLog } = require('../utils/logger');

async function reply(ctx, emoji, text, logMessage) {
    await ctx.react(emoji);
    await ctx.sock.sendMessage(ctx.from, { text }, { quoted: ctx.msg });
    await ctx.react('✅');
    fancyLog('ROMANCE', logMessage);
}

module.exports = {
    // .boobs – explicit body-content requests are kept in safe mode
    boobs: async (ctx) => {
        await reply(
            ctx,
            '🛡️',
            '🛡️ *SAFE MODE*\n\nExplicit body-content media share nahi hota. Respect aur privacy ka khayal rakhein.',
            'Safe response sent for boobs command'
        );
    },

    // .sabakiss – affectionate, non-explicit response
    sabakiss: async (ctx) => {
        await reply(
            ctx,
            '💋',
            '💋 Saba ke liye ek respectful virtual kiss — hamesha consent aur boundaries ka khayal rakhein.',
            'Respectful Saba kiss sent'
        );
    },

    // .love – clean love message
    love: async (ctx) => {
        const target = ctx.args.join(' ') || 'doston';
        const messages = [
            `❤️ ${target}, pyar izzat, trust aur consent se khoobsurat banta hai.`,
            `💕 ${target}, tumhari khushi aur sukoon sab se important hai.`,
            `💖 ${target}, kindness aur respect hi true love ki pehchan hain.`,
            `🌹 ${target}, dil se care karo aur boundaries ka hamesha khayal rakho.`
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];

        await reply(
            ctx,
            '❤️',
            `╭─⬡ ❤️ *LOVE* ❤️ ⬡─╮\n│\n│  ${message}\n│\n╰─────────────────────────╯`,
            `Love message sent to ${target}`
        );
    },

    // .sababoobs – no sexualized or private content about a named person
    sababoobs: async (ctx) => {
        await reply(
            ctx,
            '🛡️',
            '🛡️ Saba ke baare mein sirf respectful compliments share kiye ja sakte hain — private ya sexual content nahi.',
            'Safe response sent for Saba body-content command'
        );
    },

    // .anal – explicit sexual content is disabled
    anal: async (ctx) => {
        await reply(
            ctx,
            '🛡️',
            '🛡️ Explicit sexual content is disabled. Clean, respectful aur consent-based messages hi allowed hain.',
            'Safe response sent for explicit command'
        );
    }
};