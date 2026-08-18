// plugins/attitude.js
// Attitude, Swag, and Confidence Commands
// Roman Urdu – Vertical Format

const { fancyLog } = require('../utils/logger');

// ─── Attitude Quotes ──────────────────────────
const attitudeQuotes = [
    "💪 Main woh nahi jo sab ko khush karun, main woh hun jo khud khush rahe.",
    "🔥 Meri attitude meri pehchan hai.",
    "👑 Main king hun, aur kings ko koi rule nahi rokta.",
    "😎 Jo log meri taraf dekhte hain, woh meri copy karte hain.",
    "💀 Main aisa hun, jo chahta hai wo le leta hun.",
    "⚔️ Mere sapne bade hain, aur meri himmat aur bhi.",
    "🌟 Main apni wajah se famous hun, kisi aur ki wajah se nahi.",
    "🔥 Log jalte hain, aur main chalta hun.",
    "💪 Main apni zindagi ka hero hun.",
    "👑 Jo mujhe samjhe, woh mera; jo na samjhe, woh mera nahi.",
    "😎 Mere pass attitude hai, aur uska koi muqabla nahi.",
    "💀 Main woh nahi jo haar maan le, main woh hun jo lade.",
    "🔥 Aag mein jalna meri aadat nahi, aag mein chamakna meri pehchan hai.",
    "🌟 Main apni manzil khud banata hun.",
    "💪 Jo rukta hai, woh ruk jaata hai; main to chalta rehta hun."
];

// ─── Attitude Status ──────────────────────────
const attitudeStatus = [
    "😎 Meri attitude, meri shaan.",
    "👑 Main king hun, mujhe kisi ki parwah nahi.",
    "🔥 Log kopi karte hain, main original hun.",
    "💪 Main apni wajah se famous hun.",
    "🌟 Mere sapne bade hain, aur main unhe poora karunga.",
    "💀 Jo mujhe rokta hai, woh ruk jata hai.",
    "⚔️ Main jang nahi karta, main jeet kar aata hun.",
    "😏 Meri muskuran mein bhi attitude hai.",
    "🔥 Aag mein chamakna meri aadat hai.",
    "👑 Main king banane wala hun.",
    "💪 Main apni zindagi ka maalik hun.",
    "🌟 Main apni manzil khud banata hun.",
    "😎 Meri vibe alag hai, kyun ke main alag hun.",
    "🔥 Jo mujhe dekhta hai, woh meri tareef karta hai."
];

// ─── Attitude Replies ─────────────────────────
const attitudeReplies = [
    "😏 Kaun hai tu? Meri baat karne wala?",
    "🔥 Main woh nahi jo sab ko jawab de, main woh hun jo sab ko chup kar de.",
    "💪 Meri aukat mujhe pata hai, tujhe pata nahi.",
    "👑 Jo mera muqabla kare, woh jale.",
    "😎 Main apni jagah khada hun, tu apni jagah baith.",
    "💀 Mujhe kisi ki parwah nahi, main khud ka king hun.",
    "🔥 Jo mujhe tang kare, woh mera nahi.",
    "💪 Main woh nahi jo ruk jaye, main woh hun jo rukta nahi.",
    "🌟 Meri roshni meri hai, tujhe kya?",
    "😏 Main apna kaam karta hun, apni fikar kar.",
    "👑 Jo mera saath de, woh mera; jo na de, woh mera nahi.",
    "🔥 Log jalte hain, main jalan deta hun.",
    "💪 Main apni zindagi ka hero hun, aur villain bhi.",
    "😎 Meri attitude meri pehchan hai, aur meri pehchan alag hai."
];

// ─── Attitude Emojis ──────────────────────────
const attitudeEmojis = ['😎', '👑', '🔥', '💪', '🌟', '💀', '⚔️', '😏', '💯', '✌️'];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = {

    // ─── .attitude ─────────────────────────────────
    attitude: async (ctx) => {
        await ctx.react('😎');
        const quote = random(attitudeQuotes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😎 *ATTITUDE QUOTE* 😎 ⬡─╮\n│\n│  ${quote}\n│\n│  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}\n│\n│  👑 King of my own life\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('🔥');
        fancyLog('ATTITUDE', 'Attitude quote sent');
    },

    // ─── .attitudestatus ───────────────────────────
    attitudestatus: async (ctx) => {
        await ctx.react('👑');
        const status = random(attitudeStatus);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 👑 *ATTITUDE STATUS* 👑 ⬡─╮\n│\n│  ${status}\n│\n│  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}\n│\n│  💪 My life, my rules\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💪');
        fancyLog('ATTITUDE', 'Attitude status sent');
    },

    // ─── .attitudereply ────────────────────────────
    attitudereply: async (ctx) => {
        await ctx.react('😏');
        const reply = random(attitudeReplies);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😏 *ATTITUDE REPLY* 😏 ⬡─╮\n│\n│  ${reply}\n│\n│  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}\n│\n│  💀 No one can stop me\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💀');
        fancyLog('ATTITUDE', 'Attitude reply sent');
    },

    // ─── .swag ──────────────────────────────────────
    swag: async (ctx) => {
        await ctx.react('😎');
        const swagMessages = [
            "😎 Meri swag alag hai.",
            "🔥 Main jis taraf chalun, rasta ban jata hai.",
            "👑 Main king hun, aur kings ko koi rule nahi rokta.",
            "💪 Meri baat alag hai, kyun ke main alag hun.",
            "🌟 Main apni wajah se chamakta hun.",
            "💀 Jo mujhe roke, woh ruk jata hai.",
            "⚔️ Meri swag meri pehchan hai.",
            "😏 Jo meri copy kare, woh meri nahi ban sakta.",
            "🔥 Main aisa hun, jo chahta hai wo le leta hun.",
            "👑 Main king banane wala hun."
        ];
        const msg = random(swagMessages);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😎 *SWAG* 😎 ⬡─╮\n│\n│  ${msg}\n│\n│  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}\n│\n│  💯 100% Original\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💯');
        fancyLog('ATTITUDE', 'Swag message sent');
    },

    // ─── .myattitude ────────────────────────────────
    myattitude: async (ctx) => {
        await ctx.react('🔥');
        const name = ctx.args.join(' ') || 'Arslan';
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🔥 *MY ATTITUDE* 🔥 ⬡─╮\n│\n│  👑 ${name} ka attitude:\n│  💪 Unlimited\n│  🌟 Confident\n│  😎 Swaggy\n│  💀 Danger\n│  🔥 Lit\n│\n│  🎯 Never back down\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('👑');
        fancyLog('ATTITUDE', `My attitude shown for ${name}`);
    },

    // ─── .attitudevs ────────────────────────────────
    attitudevs: async (ctx) => {
        await ctx.react('⚔️');
        const name1 = ctx.args[0] || 'Arslan';
        const name2 = ctx.args[1] || 'Saba';
        const winner = Math.random() > 0.5 ? name1 : name2;
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ⚔️ *ATTITUDE BATTLE* ⚔️ ⬡─╮\n│\n│  🔥 ${name1} vs ${name2}\n│\n│  👑 Winner: *${winner}*\n│\n│  💪 ${winner} ka attitude sab se strong hai!\n│\n│  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}  ${random(attitudeEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💪');
        fancyLog('ATTITUDE', `Attitude battle: ${winner} won`);
    }
};