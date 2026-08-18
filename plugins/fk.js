// plugins/fuck.js
// Fuck Plugin – For Fun, Anger, and Playful Romance
// Roman Urdu – Vertical Format
// Powered by ARSLAN TECH'S

const { fancyLog } = require('../utils/logger');

// ─── Fuck Quotes ──────────────────────────────
const fuckQuotes = [
    "😡 Fuck! Aaj ka din hi kharab hai.",
    "🤬 Fuck! Yeh kya ho raha hai?",
    "😤 Fuck! Mujhe kisi ki nahi sunni.",
    "💢 Fuck! Sab bekar hai.",
    "🔥 Fuck! Aag lagani hai sab ko.",
    "😠 Fuck! Mere bas ki baat nahi.",
    "🤯 Fuck! Dimagh kharab ho raha hai.",
    "😩 Fuck! Bas ab aur nahi.",
    "💀 Fuck! Kya chutiyapa hai yeh?",
    "😡 Fuck! Koi mera nahi.",
    "🤬 Fuck! Har jagah mushkil hai.",
    "😤 Fuck! Main bhi insaan hun.",
    "💢 Fuck! Koi samajh nahi raha.",
    "🔥 Fuck! Aaj maza aa gaya."
];

// ─── Fuck Replies ─────────────────────────────
const fuckReplies = [
    "😡 Tu kya chahta hai?",
    "🤬 Bhaad mein ja!",
    "😤 Meri taraf mat dekh.",
    "💢 Tu mera kya lega?",
    "🔥 Tera baap kaun hai?",
    "😠 Main teri nahi sunta.",
    "🤯 Tu pagal hai kya?",
    "😩 Mujhe chod de.",
    "💀 Tera kya jata hai?",
    "😡 Tu kya samajhta hai apne aap ko?",
    "🤬 Bhaak!",
    "😤 Mujhe tang mat kar.",
    "💢 Teri aukat kya hai?",
    "🔥 Main nahi darta tujh se."
];

// ─── Fuck You Baby Messages (Playful) ────────
const fuckYouBabyMessages = [
    "💋 Fuck you baby! 💋\n❤️ Magar pyar se, dil se!",
    "😈 Fuck you baby! 😈\n💕 You're my favourite!",
    "🔥 Fuck you baby! 🔥\n💖 Tu meri jaan hai!",
    "💘 Fuck you baby! 💘\n🌹 Love you to the moon!",
    "😏 Fuck you baby! 😏\n💋 Kiss you later!",
    "💕 Fuck you baby! 💕\n❤️ You're the best!",
    "😍 Fuck you baby! 😍\n💞 Forever mine!",
    "💗 Fuck you baby! 💗\n🌙 I'm yours!",
    "💖 Fuck you baby! 💖\n💑 You and me forever!",
    "❤️ Fuck you baby! ❤️\n😘 Come here!"
];

// ─── Fuck Emojis ──────────────────────────────
const fuckEmojis = ['😡', '🤬', '😤', '💢', '🔥', '😠', '🤯', '😩', '💀', '👊', '💪', '🖕'];

// ─── Helper: Random ────────────────────────────
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {

    // ─── .fuck ─────────────────────────────────────
    fuck: async (ctx) => {
        const target = ctx.args.join(' ') || 'duniya';
        await ctx.react('😡');

        const quote = random(fuckQuotes);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 😡 *FUCK VIBES* 😡 ⬡─╮\n' +
                      '│\n' +
                      '│  🔥 ' + quote + '\n' +
                      '│  💢 Target: ' + target + '\n' +
                      '│\n' +
                      '│  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '\n' +
                      '│\n' +
                      '│  ⚠️ Just for fun!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💢');
        fancyLog('FUCK', 'Fuck vibe sent');
    },

    // ─── .fuckyou ──────────────────────────────────
    fuckyou: async (ctx) => {
        const target = ctx.args.join(' ') || 'kisi ko';
        await ctx.react('🤬');

        const reply = random(fuckReplies);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 🤬 *FUCK YOU* 🤬 ⬡─╮\n' +
                      '│\n' +
                      '│  💢 To: ' + target + '\n' +
                      '│  🔥 Reply: ' + reply + '\n' +
                      '│\n' +
                      '│  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '\n' +
                      '│\n' +
                      '│  ⚠️ Just for fun! No offence.\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🖕');
        fancyLog('FUCK', 'Fuck you sent to ' + target);
    },

    // ─── .fuckyoubaby (NEW – Playful & Romantic) ─
    fuckyoubaby: async (ctx) => {
        const target = ctx.args.join(' ') || 'baby';
        await ctx.react('💋');

        const msg = random(fuckYouBabyMessages);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 💋 *FUCK YOU BABY* 💋 ⬡─╮\n' +
                      '│\n' +
                      '│  💕 To: ' + target + '\n' +
                      '│  🔥 ' + msg + '\n' +
                      '│\n' +
                      '│  ❤️ ' + random(['❤️', '💖', '💕', '💘', '💗', '💝']) + '  ' +
                           random(['❤️', '💖', '💕', '💘', '💗', '💝']) + '  ' +
                           random(['❤️', '💖', '💕', '💘', '💗', '💝']) + '\n' +
                      '│\n' +
                      '│  ⚠️ Just playful fun!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('😘');
        fancyLog('FUCK', 'Fuck you baby sent to ' + target);
    },

    // ─── .fuckmeter ────────────────────────────────
    fuckmeter: async (ctx) => {
        const target = ctx.args.join(' ') || 'Aap';
        await ctx.react('🔥');

        const percent = Math.floor(Math.random() * 101);
        const bar = '💢'.repeat(Math.round(percent / 10)) + '🖤'.repeat(10 - Math.round(percent / 10));

        let msg = '';
        if (percent >= 80) msg = '😡 Bohot gussa hai!';
        else if (percent >= 50) msg = '😤 Thora gussa hai.';
        else if (percent >= 20) msg = '😒 Gussa nahi hai.';
        else msg = '😊 Bilkul shant hai.';

        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 🔥 *FUCK METER* 🔥 ⬡─╮\n' +
                      '│\n' +
                      '│  👤 ' + target + '\n' +
                      '│  [ ' + bar + ' ] ' + percent + '%\n' +
                      '│\n' +
                      '│  💬 ' + msg + '\n' +
                      '│\n' +
                      '│  ⚠️ Just for fun!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💢');
        fancyLog('FUCK', 'Fuck meter for ' + target);
    },

    // ─── .fuckoff ───────────────────────────────────
    fuckoff: async (ctx) => {
        const target = ctx.args.join(' ') || 'tum';
        await ctx.react('👋');

        const offMessages = [
            '😡 ' + target + '! Bhaad mein jao!',
            '🤬 ' + target + '! Mujhe tang mat karo!',
            '😤 ' + target + '! Apna kaam dekho!',
            '💢 ' + target + '! Kya chahiye tujhe?',
            '🔥 ' + target + '! Aaj nahi pareshan karo!',
            '😠 ' + target + '! Chup ho jao!',
            '🤯 ' + target + '! Pagal ho gaye ho?',
            '😩 ' + target + '! Bas karo!'
        ];

        const msg = random(offMessages);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 👋 *FUCK OFF* 👋 ⬡─╮\n' +
                      '│\n' +
                      '│  💢 ' + msg + '\n' +
                      '│\n' +
                      '│  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '\n' +
                      '│\n' +
                      '│  ⚠️ Just for fun!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('😤');
        fancyLog('FUCK', 'Fuck off sent to ' + target);
    },

    // ─── .fuckall ───────────────────────────────────
    fuckall: async (ctx) => {
        await ctx.react('💀');

        const allMessages = [
            '💀 Sab ko bhool jao!',
            '😡 Sab bekaar hain!',
            '🤬 Har kisi ko jaane do!',
            '😤 Duniya hi bekaar hai!',
            '💢 Sab ko bhaad mein jao!',
            '🔥 Aaj sab ko ignore karo!',
            '😠 Apna kaam karo, sab ko bhool jao!'
        ];

        const msg = random(allMessages);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 💀 *FUCK ALL* 💀 ⬡─╮\n' +
                      '│\n' +
                      '│  🔥 ' + msg + '\n' +
                      '│\n' +
                      '│  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '  ' + random(fuckEmojis) + '\n' +
                      '│\n' +
                      '│  ⚠️ Just for fun!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💢');
        fancyLog('FUCK', 'Fuck all sent');
    }
};