// plugins/couple.js
// Special commands for Me & Saba ❤️
const { fancyLog } = require('../utils/logger');

// ─── Love Messages ──────────────────────────
const loveMessages = [
    "❤️ Saba, tum meri duniya ho.",
    "💕 Janu, tumhara saath meri zindagi hai.",
    "🌹 Saba, tumhare liye har din valentine hai.",
    "💖 Janu, tum meri rooh ka sukoon ho.",
    "💗 Saba, tum ho jis ke liye mein rab se dua karun.",
    "💘 Janu, tum meri har khushi ka sabab ho.",
    "💝 Saba, tumhare naam se meri duniya roshan hai.",
    "💟 Janu, tum se pyar karna meri taqdeer hai.",
    "💞 Saba + Janu = True Love ❤️",
    "🌙 Saba, tum meri chandni raat ho.",
    "☀️ Janu, tum meri subah ki pehli kirn ho.",
    "🌸 Saba, tum mere dil ka phool ho.",
    "🌊 Janu, tum meri zindagi ki lehar ho.",
    "✨ Saba, tum meri roshni ho.",
    "🌟 Janu, tum mera sitara ho."
];

// ─── Romantic Quotes ────────────────────────
const romanticQuotes = [
    "💕 Jab se tum mili ho, zindagi badal gayi hai.",
    "🌹 Saba, tum mere khwabon ki malika ho.",
    "💖 Janu, tum bin zindagi adhoori hai.",
    "💗 Tum ho to sab hai, Saba ❤️",
    "🌙 Janu, tumhari hansi meri dua hai.",
    "🌸 Saba, tumhari khushi meri khushi hai.",
    "💞 Hum dono ek doosre ke liye bane hain.",
    "🌟 Saba, tum meri manzil ho.",
    "💫 Janu, tum mera wajood ho.",
    "❤️ Saba, tum meri pehli aur aakhri mohabbat ho."
];

// ─── Couple Goals ────────────────────────────
const coupleGoals = [
    "💕 Saba ke saath puri duniya ghoomni hai.",
    "🌹 Saba ko rozana ek rose dena hai.",
    "💖 Janu ke saath har din special banana hai.",
    "💗 Saba ke liye ek ghar banana hai.",
    "🌙 Janu ke saath chandni raat guzarni hai.",
    "🌸 Saba ko har din hasana hai.",
    "💞 Saba aur Janu – ek jaan, ek jahan.",
    "🌟 Saba ke saath zindagi ka safar karna hai."
];

// ─── Random Emojis ────────────────────────────
const loveEmojis = ['❤️', '💕', '💖', '💗', '💘', '💝', '💟', '❣️', '♥️'];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = {

    /**
     * .couple – Couple status
     */
    couple: async (ctx) => {
        await ctx.react('💞');
        const msg = random(coupleGoals);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💞 *COUPLE STATUS* 💞 ⬡─╮\n│\n│  👫 ARSLAN ❤️ SABA\n│  💕 Status: ${random(['In Love', 'Soulmates', 'Forever', 'True Love', 'Perfect Match'])}\n│  💖 Since: 2024\n│  🌹 Goal: ${msg}\n│\n│  ${random(loveEmojis)}  ${random(loveEmojis)}  ${random(loveEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('COUPLE', 'Couple status shown');
    },

    /**
     * .couplequote – Romantic quote
     */
    couplequote: async (ctx) => {
        await ctx.react('💖');
        const quote = random(romanticQuotes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💖 *ROMANTIC QUOTE* 💖 ⬡─╮\n│\n│  "${quote}"\n│\n│  🌹 ARSLAN & SABA\n│  ${random(loveEmojis)} Forever ${random(loveEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💕');
        fancyLog('COUPLE', 'Couple quote sent');
    },

    /**
     * .couplelove – Random love message
     */
    couplelove: async (ctx) => {
        await ctx.react('❤️');
        const msg = random(loveMessages);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ❤️ *LOVE MESSAGE* ❤️ ⬡─╮\n│\n│  ${msg}\n│\n│  ${random(loveEmojis)}  ${random(loveEmojis)}  ${random(loveEmojis)}\n│\n│  🌹 SABA ❤️ ARSLAN\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💝');
        fancyLog('COUPLE', 'Love message sent');
    },

    /**
     * .couplevibe – Couple aesthetic vibe
     */
    couplevibe: async (ctx) => {
        await ctx.react('✨');
        const vibes = [
            "💫 Saba aur Janu ka pyar – jaise chand aur sitare",
            "🌙 ARSLAN ❤️ SABA – ek dhoondha to mil gaye",
            "💞 Hum dono alag nahi, ek hain",
            "🌸 Saba ki hansi, Janu ki khushi",
            "🌊 Janu ki batein, Saba ka sukoon",
            "🌟 Dono ne ek doosre ko pa liya",
            "💕 Saba & Janu – koi nahi in jaisa"
        ];
        const vibe = random(vibes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ✨ *COUPLE VIBE* ✨ ⬡─╮\n│\n│  ${vibe}\n│\n│  🌙 • ☁️ • 🌸 • 🌊 • 💫\n│\n│  ARSLAN ❤️ SABA\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💫');
        fancyLog('COUPLE', 'Couple vibe sent');
    },

    /**
     * .lovestatus – Set or show love status
     */
    lovestatus: async (ctx) => {
        const status = ctx.args.join(' ') || 'Happily in Love ❤️';
        global._lovestatus = status;
        await ctx.react('💕');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💕 *LOVE STATUS* 💕 ⬡─╮\n│\n│  👫 ARSLAN ❤️ SABA\n│  📝 Status: ${status}\n│  💖 Forever and Always\n│\n│  ${random(loveEmojis)}  ${random(loveEmojis)}  ${random(loveEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('COUPLE', `Love status set to: ${status}`);
    },

    /**
     * .lovemeter – Love percentage meter
     */
    lovemeter: async (ctx) => {
        await ctx.react('💖');
        const percent = Math.floor(Math.random() * 20) + 80; // 80-100%
        const meter = '💖'.repeat(Math.round(percent / 10)) + '🖤'.repeat(10 - Math.round(percent / 10));
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💖 *LOVE METER* 💖 ⬡─╮\n│\n│  💕 ARSLAN ❤️ SABA\n│  [${meter}] ${percent}%\n│\n│  💞 100% Match\n│  🌹 Perfect Couple\n│\n│  ${random(loveEmojis)}  ${random(loveEmojis)}  ${random(loveEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💗');
        fancyLog('COUPLE', 'Love meter shown');
    },

    /**
     * .couplegoal – Random couple goal
     */
    couplegoal: async (ctx) => {
        await ctx.react('🌟');
        const goal = random(coupleGoals);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🌟 *COUPLE GOAL* 🌟 ⬡─╮\n│\n│  🎯 ${goal}\n│\n│  💕 ARSLAN & SABA\n│  🌹 Together Forever\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('COUPLE', 'Couple goal sent');
    },

    /**
     * .heartbeat – Heartbeat simulation
     */
    heartbeat: async (ctx) => {
        await ctx.react('💓');
        const beats = ['💓', '💗', '💖', '💕', '💘', '💝', '💟'];
        let msg = '╭─⬡ 💓 *HEARTBEAT* 💓 ⬡─╮\n│\n│  ';
        for (let i = 0; i < 10; i++) {
            msg += random(beats) + ' ';
        }
        msg += `\n│\n│  💕 ARSLAN ❤️ SABA\n│  💖 Forever Beating\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: msg }, { quoted: ctx.msg });
        await ctx.react('💞');
        fancyLog('COUPLE', 'Heartbeat shown');
    }
};