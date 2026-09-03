/**
 * ================================================
 * plugins/love.js
 * Saba aur Janu ke liye special love commands
 * Roman Urdu – Vertical Format
 * ================================================
 */

const { fancyLog } = require('../utils/logger');

// ─── Random love quotes ──────────────────────────
const loveQuotes = [
    "Tum meri duniya ho, Saba ❤️",
    "Janu, tum se pyar karna meri adat hai 💕",
    "Saba, tum ho jis ke liye main har din jiyun 🌹",
    "Janu, tumhari muskan meri subah hai 😊",
    "Saba, tum mere dil ki dhadkan ho 💓",
    "Janu, tum se mohabbat meri pehchan hai ✨",
    "Saba, tum meri manzil ho 🌟",
    "Janu, tum bin jeena mushkil hai 💔"
];

// ─── Random romantic messages ────────────────────
const romanticMessages = [
    "❤️ Saba, tum duniya ki sab se khoobsurat ho.",
    "💕 Janu, tumhara saath meri zindagi hai.",
    "🌹 Saba, tumhare liye har din valentine hai.",
    "💖 Janu, tum meri rooh ka sukoon ho.",
    "💗 Saba, tum ho jis ke liye mein rab se dua karun.",
    "💘 Janu, tum meri har khushi ka sabab ho.",
    "💝 Saba, tumhare naam se meri duniya roshan hai.",
    "💟 Janu, tum se pyar karna meri taqdeer hai."
];

module.exports = {

    /**
     * .saba – Saba ka profile
     */
    saba: async (ctx) => {
        const subcommand = (ctx.args[0] || '').toLowerCase();
        if (subcommand === 'kiss') {
            await ctx.react('💋');
            await ctx.sock.sendMessage(
                ctx.from,
                {
                    text: '💋 Saba ke liye ek respectful virtual kiss — hamesha consent aur boundaries ka khayal rakhein.'
                },
                { quoted: ctx.msg }
            );
            await ctx.react('✅');
            fancyLog('LOVE', 'Respectful Saba kiss sent');
            return;
        }

        if (subcommand === 'boobs') {
            await ctx.react('🛡️');
            await ctx.sock.sendMessage(
                ctx.from,
                {
                    text: '🛡️ Saba ke baare mein sirf respectful compliments share kiye ja sakte hain — private ya sexual content nahi.'
                },
                { quoted: ctx.msg }
            );
            await ctx.react('✅');
            fancyLog('LOVE', 'Safe response sent for Saba body-content command');
            return;
        }

        await ctx.react('👸');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *👸 SABA* ⬡─╮\n` +
                      `│\n` +
                      `│ 🌹 Naam: Saba\n` +
                      `│ 💕 Status: Meri Janu\n` +
                      `│ 🌸 Khubsurti: La Jawab\n` +
                      `│ 💖 Meri Duniya: Saba hi hai\n` +
                      `│\n` +
                      `╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LOVE', 'Saba profile shown');
    },

    /**
     * .sabalove – Saba ke liye pyar bhara paigham
     */
    sabalove: async (ctx) => {
        await ctx.react('❤️');
        const msg = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *💕 SABA LOVE* ⬡─╮\n` +
                      `│\n` +
                      `│ ${msg}\n` +
                      `│\n` +
                      `│ - ${global.OWNER_NAME || 'ARSLAN'}\n` +
                      `│\n` +
                      `╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💖');
        fancyLog('LOVE', 'Saba love message sent');
    },

    /**
     * .janu – Janu ka profile
     */
    janu: async (ctx) => {
        await ctx.react('💑');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *💑 JANU* ⬡─╮\n` +
                      `│\n` +
                      `│ 🌹 Naam: Janu\n` +
                      `│ 💕 Meri Jaan: Saba\n` +
                      `│ 💘 Pyar: Beshumaar\n` +
                      `│ 🌟 Zindagi: Saba ke saath\n` +
                      `│\n` +
                      `╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LOVE', 'Janu profile shown');
    },

    /**
     * .janulove – Janu ke liye pyar bhara paigham
     */
    janulove: async (ctx) => {
        await ctx.react('💕');
        const msg = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *💖 JANU LOVE* ⬡─╮\n` +
                      `│\n` +
                      `│ ${msg}\n` +
                      `│\n` +
                      `│ - ${global.OWNER_NAME || 'ARSLAN'}\n` +
                      `│\n` +
                      `╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💗');
        fancyLog('LOVE', 'Janu love message sent');
    },

    /**
     * .couple – Saba aur Janu ka couple quote
     */
    couple: async (ctx) => {
        await ctx.react('💞');
        const quotes = [
            "💞 Saba aur Janu – ek jaan, ek jahan",
            "💕 Saba + Janu = True Love",
            "💖 Janu aur Saba – dono ek doosre ke liye bane",
            "💗 Saba – Janu ki duniya, Janu – Saba ka aasman",
            "🌹 Saba aur Janu – pyar ki misaal"
        ];
        const msg = quotes[Math.floor(Math.random() * quotes.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *💞 SABA × JANU* ⬡─╮\n` +
                      `│\n` +
                      `│ ${msg}\n` +
                      `│\n` +
                      `╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LOVE', 'Couple quote sent');
    },

    /**
     * .romance – Random romantic message
     */
    romance: async (ctx) => {
        await ctx.react('💘');
        const allMessages = [...loveQuotes, ...romanticMessages];
        const msg = allMessages[Math.floor(Math.random() * allMessages.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *💘 ROMANCE* ⬡─╮\n` +
                      `│\n` +
                      `│ ${msg}\n` +
                      `│\n` +
                      `╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💖');
        fancyLog('LOVE', 'Romance message sent');
    }
};