// plugins/mood.js
// Mood Off Plugin – Cheer Up, Motivation, Love, and Support
// When your mood is off, this plugin will make you feel better!
// Roman Urdu – Vertical Format
// Powered by ARSLAN TECH'S

const { fancyLog } = require('../utils/logger');

// ─── Helper: Sleep ──────────────────────────────
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Helper: Random ─────────────────────────────
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Cheer Up Messages ──────────────────────────
const cheerUpMessages = [
    "😊 *Muskurao!* Zindagi khoobsurat hai!",
    "💪 *Aap bohot strong ho!* Yeh waqt bhi guzar jayega.",
    "❤️ *Main aap ke saath hun!* Koi baat nahi, sab theek ho jayega.",
    "🌟 *Aap special ho!* Yeh duniya aap ke bina adhoori hai.",
    "😍 *Aap ki muskuran sab se khoobsurat hai!*",
    "💕 *Mere liye aap bohot important ho!*",
    "💖 *Aap ki smile duniya badal sakti hai!*",
    "✨ *Aap ek star ho!* Hamesha chamakte raho.",
    "🔥 *Aap bohot strong ho!* Kuch bhi ho, aap fight kar sakte ho.",
    "🤗 *Big virtual hug!* Aap bilkul theek ho jayenge."
];

// ─── Motivation Quotes ──────────────────────────
const motivationQuotes = [
    "💪 *Mehnat karo, shor baad mein hoga!*",
    "🌟 *Failure success ki pehli seedhi hai!*",
    "🔥 *Aag mein chamakna meri aadat hai!*",
    "👑 *Main king banane wala hun!*",
    "🚀 *Rukna nahi, chalte rehna hai!*",
    "💯 *Aap 17 saal ke ho aur already developer ho!*",
    "📚 *ICS kar rahe ho, dream ML/AI Engineer ka hai!*",
    "💻 *ARSLAN MD ULTRA banaya hai!* Kya baat hai!",
    "💪 *Mehnat karo, success milegi!*",
    "🔥 *Log jalte hain, aur main chalta hun!*"
];

// ─── Love Messages (Saba Special) ──────────────
const loveMessages = [
    "💕 *Saba aap se bohot pyar karti hai!*",
    "❤️ *Saba aap ki smile pasand karti hai!*",
    "💖 *Saba aap ke saath hai!*",
    "💘 *Saba aap ke liye dua karti hai!*",
    "💗 *Saba aap ki khushi chahti hai!*",
    "💝 *Saba aap ko miss karti hai!*",
    "💟 *Saba aap ka support hai!*",
    "❣️ *Saba aap se bohot pyar karti hai!*"
];

// ─── Encouragement Replies ──────────────────────
const encouragementReplies = [
    "😊 *Muskurao!* Sab theek ho jayega.",
    "💪 *Aap bohot strong ho!*",
    "❤️ *Main aap ke saath hun!*",
    "🌟 *Aap special ho!*",
    "😍 *Aap ki muskuran sab se khoobsurat hai!*",
    "💕 *Mere liye aap bohot important ho!*",
    "💖 *Aap ki smile duniya badal sakti hai!*",
    "✨ *Aap ek star ho!*",
    "🔥 *Aap bohot strong ho!*",
    "🤗 *Big virtual hug!*"
];

// ─── Mood Off Emojis ────────────────────────────
const moodEmojis = ['😊', '💪', '❤️', '🌟', '😍', '💕', '💖', '✨', '🔥', '🤗', '💯', '👑'];

module.exports = {

    // ─── .moodoff ───────────────────────────────────
    moodoff: async (ctx) => {
        await ctx.react('😔');
        const from = ctx.from;

        // Step 1: Acknowledge
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 😔 *MOOD OFF DETECTED* 😔 ⬡─╮\n' +
                      '│\n' +
                      '│  📊 Scanning your mood...\n' +
                      '│  [▓░░░░░░░░░] 10%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);

        // Step 2: Analyzing
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 😔 *MOOD OFF DETECTED* 😔 ⬡─╮\n' +
                      '│\n' +
                      '│  📊 Analyzing mood...\n' +
                      '│  [▓▓▓▓▓░░░░░] 50%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);

        // Step 3: Processing treatment
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 😔 *MOOD OFF DETECTED* 😔 ⬡─╮\n' +
                      '│\n' +
                      '│  💊 Preparing treatment...\n' +
                      '│  [▓▓▓▓▓▓▓▓░░] 80%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);

        // Step 4: Complete
        const cheer = random(cheerUpMessages);
        const motivation = random(motivationQuotes);
        const love = random(loveMessages);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ✨ *MOOD TREATMENT COMPLETE* ✨ ⬡─╮\n' +
                      '│\n' +
                      '│  😊 ' + cheer + '\n' +
                      '│\n' +
                      '│  💪 ' + motivation + '\n' +
                      '│\n' +
                      '│  ❤️ ' + love + '\n' +
                      '│\n' +
                      '│  ' + random(moodEmojis) + '  ' + random(moodEmojis) + '  ' + random(moodEmojis) + '\n' +
                      '│\n' +
                      '│  💡 Remember: You are special!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('😊');
        fancyLog('MOOD', 'Mood off treatment sent');
    },

    // ─── .cheerup ───────────────────────────────────
    cheerup: async (ctx) => {
        await ctx.react('😊');
        const from = ctx.from;
        const name = ctx.args.join(' ') || 'Aap';

        const cheer = random(cheerUpMessages);
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 😊 *CHEER UP* 😊 ⬡─╮\n' +
                      '│\n' +
                      '│  💕 Dear ' + name + ',\n' +
                      '│\n' +
                      '│  ' + cheer + '\n' +
                      '│\n' +
                      '│  ' + random(moodEmojis) + '  ' + random(moodEmojis) + '  ' + random(moodEmojis) + '\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('❤️');
        fancyLog('MOOD', 'Cheer up sent to ' + name);
    },

    // ─── .motivate ──────────────────────────────────
    motivate: async (ctx) => {
        await ctx.react('💪');
        const from = ctx.from;

        const quote = random(motivationQuotes);
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 💪 *MOTIVATION* 💪 ⬡─╮\n' +
                      '│\n' +
                      '│  🔥 ' + quote + '\n' +
                      '│\n' +
                      '│  💯 ' + random(['Keep going!', 'You got this!', 'Never give up!', 'You are strong!']) + '\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🔥');
        fancyLog('MOOD', 'Motivation sent');
    },

    // ─── .loveboost ─────────────────────────────────
    loveboost: async (ctx) => {
        await ctx.react('❤️');
        const from = ctx.from;
        const name = ctx.args.join(' ') || 'Aap';

        const love = random(loveMessages);
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ❤️ *LOVE BOOST* ❤️ ⬡─╮\n' +
                      '│\n' +
                      '│  💕 Dear ' + name + ',\n' +
                      '│\n' +
                      '│  ' + love + '\n' +
                      '│\n' +
                      '│  ' + random(['❤️', '💖', '💕', '💘', '💗', '💝']) + '  ' +
                           random(['❤️', '💖', '💕', '💘', '💗', '💝']) + '  ' +
                           random(['❤️', '💖', '💕', '💘', '💗', '💝']) + '\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💖');
        fancyLog('MOOD', 'Love boost sent to ' + name);
    },

    // ─── .hug ───────────────────────────────────────
    hug: async (ctx) => {
        await ctx.react('🤗');
        const from = ctx.from;
        const name = ctx.args.join(' ') || 'you';

        const hugMessages = [
            '🤗 Sending you a big virtual hug!',
            '🫂 You are not alone, I am here for you!',
            '🤗 Everything will be okay!',
            '🫂 You are strong and loved!',
            '🤗 Sending love and warmth!',
            '🫂 You deserve all the happiness!'
        ];

        const hug = random(hugMessages);
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🤗 *VIRTUAL HUG* 🤗 ⬡─╮\n' +
                      '│\n' +
                      '│  💕 To: ' + name + '\n' +
                      '│\n' +
                      '│  ' + hug + '\n' +
                      '│\n' +
                      '│  🤗  🤗  🤗\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🫂');
        fancyLog('MOOD', 'Hug sent to ' + name);
    },

    // ─── .moodmeter ─────────────────────────────────
    moodmeter: async (ctx) => {
        await ctx.react('📊');
        const from = ctx.from;
        const name = ctx.args.join(' ') || 'Aap';

        const percent = Math.floor(Math.random() * 41) + 60; // 60-100%
        const bar = '❤️'.repeat(Math.round(percent / 10)) + '🖤'.repeat(10 - Math.round(percent / 10));

        let mood = '';
        if (percent >= 90) mood = '😊 Bohot khush!';
        else if (percent >= 70) mood = '😌 Theek hai.';
        else mood = '😔 Thora sad hai, par theek ho jayega.';

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📊 *MOOD METER* 📊 ⬡─╮\n' +
                      '│\n' +
                      '│  👤 ' + name + '\n' +
                      '│  [ ' + bar + ' ] ' + percent + '%\n' +
                      '│\n' +
                      '│  💬 ' + mood + '\n' +
                      '│\n' +
                      '│  💡 Try .moodoff or .cheerup\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('MOOD', 'Mood meter for ' + name);
    },

    // ─── .miracle ───────────────────────────────────
    miracle: async (ctx) => {
        await ctx.react('✨');
        const from = ctx.from;

        const miracles = [
            "✨ Aaj kuch acha hone wala hai!",
            "🌟 Aap ki life mein kuch magical hone wala hai!",
            "💫 Aap ki dua qabool hone wali hai!",
            "✨ Aaj aap ka lucky day hai!",
            "🌟 Aap ko kuch unexpected acha milega!",
            "💫 Aap ki smile se duniya badal jayegi!",
            "✨ Aaj aap ka din acha hoga!",
            "🌟 Aap ki life mein khushi aayegi!",
            "💫 Aap jo chahte ho, wo milne wala hai!"
        ];

        const miracle = random(miracles);
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ✨ *MIRACLE* ✨ ⬡─╮\n' +
                      '│\n' +
                      '│  🔮 ' + miracle + '\n' +
                      '│\n' +
                      '│  ' + random(['✨', '🌟', '💫', '⭐', '🌈', '🌙']) + '  ' +
                           random(['✨', '🌟', '💫', '⭐', '🌈', '🌙']) + '  ' +
                           random(['✨', '🌟', '💫', '⭐', '🌈', '🌙']) + '\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🌠');
        fancyLog('MOOD', 'Miracle sent');
    }
};