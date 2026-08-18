// plugins/sexy.js
// Sexy, Hot, and Steamy Vibe Commands
// Roman Urdu – Vertical Format

const { fancyLog } = require('../utils/logger');

// ─── Sexy Quotes ──────────────────────────────
const sexyQuotes = [
    "🔥 Tumhari aankhon mein aag hai...",
    "💋 Tumhari muskuran, meri zindagi ki raunaq hai.",
    "🌙 Tumhari yaad mein raat jalti hai...",
    "💕 Tum ho to har lamha sexy hai.",
    "💖 Tumhari awaz, meri kamzori hai.",
    "❤️ Tumhari shakal, meri aadat hai.",
    "💘 Tum se na milna, maut jaisa hai.",
    "💗 Tumhari khushbu, meri duniya hai.",
    "💝 Tumhara naam, meri rooh mein hai.",
    "💟 Tum se door hona, zindagi se door hona hai.",
    "❣️ Tum ho to duniya bhool jata hun.",
    "💕 Tum se mil kar laga ke pyar asli hai.",
    "💖 Tumhari ankhein, meri roshni hain.",
    "❤️ Tum se baat karna, meri subah hai.",
    "💘 Tumhari yaad mein din guzar jate hain."
];

// ─── Hot Replies ──────────────────────────────
const hotReplies = [
    "🔥 Tum bohot hot ho... sab kuch jalane wale ho.",
    "💋 Tumhari muskuran dekh kar dil garden garden ho jata hai.",
    "😈 Tum to mujhe pagal kar doge.",
    "💕 Tum ho to sab kuch sexy lagta hai.",
    "💖 Tumhari baatein, meri zindagi mein rang bharti hain.",
    "❤️ Tum se mil kar laga ke duniya badal gayi.",
    "💘 Tumhari khamoshi bhi mujhe pagal karti hai.",
    "💗 Tum se door hona, mujh se door hona hai.",
    "💝 Tum ho meri roshni, meri manzil.",
    "💟 Tum se pyar karna meri adat ban gayi hai.",
    "❣️ Tumhari awaz sun kar sukoon milta hai.",
    "💕 Tumhari yaad mein raat guzar jati hai.",
    "💖 Tum se mil kar laga ke zindagi complete hai.",
    "❤️ Tum se baat karna, meri zindagi ka best moment hai."
];

// ─── Sexy Compliments ─────────────────────────
const sexyCompliments = [
    "😈 Tum bahut hot ho!",
    "💋 Tumhari muskuran jannat jaisi hai.",
    "🔥 Tumhari ankhein sitaron se bhi khoobsurat hain.",
    "💕 Tumhari awaz sukoon deti hai.",
    "💖 Tumhara andaaz alag hai.",
    "❤️ Tum ho to sab kuch perfect hai.",
    "💘 Tumhari baatein mujhe khush karti hain.",
    "💗 Tumhari khushbu mujhe pagal karti hai.",
    "💝 Tumhara chehra kitna pyara hai.",
    "💟 Tum se mil kar laga ke zindagi complete hai.",
    "❣️ Tum nahi ho to kuch nahi.",
    "💕 Tumhare liye main kuch bhi kar sakta hun.",
    "💖 Tum meri duniya ho.",
    "❤️ Tumhare saath har lamha special hai."
];

// ─── Dirty Pickup Lines (Mazedar) ────────────
const dirtyPickups = [
    "😈 Kya tum Netflix ho? Kyun ke main tumhe raat bhar dekh sakta hun.",
    "💋 Kya tum bed ho? Kyun ke main tum pe sona chahta hun.",
    "🔥 Kya tum shower ho? Kyun ke main tumhare neechay khara hona chahta hun.",
    "💕 Kya tum pillow ho? Kyun ke main tum se lipatna chahta hun.",
    "💖 Kya tum blanket ho? Kyun ke main tum mein chhupna chahta hun.",
    "❤️ Kya tum candle ho? Kyun ke tum meri raat roshan karti ho.",
    "💘 Kya tum wine ho? Kyun ke tum peene mein achi lagti ho.",
    "💗 Kya tum chocolate ho? Kyun ke tum dekh kar hi muh mein pani aa jata hai.",
    "💝 Kya tum music ho? Kyun ke tum sun kar acha lagta hai.",
    "💟 Kya tum dream ho? Kyun ke tum se jaagna mushkil hai.",
    "❣️ Kya tum magic ho? Kyun ke tum se har pal special hai.",
    "💕 Kya tum fire ho? Kyun ke tum dekh kar hi jal jata hun.",
    "💖 Kya tum ice cream ho? Kyun ke tum dekh kar hi thanda ho jata hun."
];

// ─── Romantic Hot Messages ─────────────────────
const romanticHot = [
    "🌙 Tumhari yaad mein raat guzar jati hai...",
    "🔥 Tum se mil kar laga ke aag lagi hai.",
    "💋 Tumhari muskuran, meri zindagi ki raunaq hai.",
    "💕 Tum ho to har lamha khaas hai.",
    "💖 Tumhari awaz, meri kamzori hai.",
    "❤️ Tumhari shakal, meri aadat hai.",
    "💘 Tum se na milna, maut jaisa hai.",
    "💗 Tumhari khushbu, meri duniya hai.",
    "💝 Tumhara naam, meri rooh mein hai.",
    "💟 Tum se door hona, zindagi se door hona hai.",
    "❣️ Tum ho to duniya bhool jata hun.",
    "💕 Tum se mil kar laga ke pyar asli hai."
];

// ─── Sexy Emojis ──────────────────────────────
const sexyEmojis = ['😈', '💋', '🔥', '💕', '💖', '❤️', '💘', '💗', '💝', '💟', '❣️', '😏', '😉', '😍', '🌙'];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = {

    // ─── .sexy ─────────────────────────────────────
    sexy: async (ctx) => {
        await ctx.react('😈');
        const quote = random(sexyQuotes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😈 *SEXY VIBE* 😈 ⬡─╮\n│\n│  ${quote}\n│\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  🔥 For the special one\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💋');
        fancyLog('SEXY', 'Sexy vibe sent');
    },

    // ─── .hot ──────────────────────────────────────
    hot: async (ctx) => {
        await ctx.react('🔥');
        const reply = random(hotReplies);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🔥 *HOT REPLY* 🔥 ⬡─╮\n│\n│  ${reply}\n│\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  💕 For that special someone\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('😈');
        fancyLog('SEXY', 'Hot reply sent');
    },

    // ─── .hotcompliment ────────────────────────────
    hotcompliment: async (ctx) => {
        await ctx.react('😍');
        const comp = random(sexyCompliments);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💖 *HOT COMPLIMENT* 💖 ⬡─╮\n│\n│  ${comp}\n│\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  🌹 Share with someone hot!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💕');
        fancyLog('SEXY', 'Hot compliment sent');
    },

    // ─── .dirtypickup ──────────────────────────────
    dirtypickup: async (ctx) => {
        await ctx.react('😈');
        const pickup = random(dirtyPickups);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😈 *DIRTY PICKUP* 😈 ⬡─╮\n│\n│  ${pickup}\n│\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  💀 Use carefully!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💋');
        fancyLog('SEXY', 'Dirty pickup sent');
    },

    // ─── .romanticsexy ─────────────────────────────
    romanticsexy: async (ctx) => {
        await ctx.react('🌙');
        const msg = random(romanticHot);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🌙 *ROMANTIC SEXY* 🌙 ⬡─╮\n│\n│  ${msg}\n│\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  💕 Love is beautiful\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💘');
        fancyLog('SEXY', 'Romantic sexy sent');
    },

    // ─── .hotmeter ──────────────────────────────────
    hotmeter: async (ctx) => {
        await ctx.react('🔥');
        const name = ctx.args.join(' ') || 'someone';
        const percent = Math.floor(Math.random() * 31) + 70; // 70-100%
        const bar = '🔥'.repeat(Math.round(percent / 10)) + '❄️'.repeat(10 - Math.round(percent / 10));
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🔥 *HOT METER* 🔥 ⬡─╮\n│\n│  💋 ${name}\n│  [${bar}] ${percent}%\n│\n│  🔥 You're hot!\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('😈');
        fancyLog('SEXY', `Hot meter for ${name}`);
    },

    // ─── .sexymessage ──────────────────────────────
    sexymessage: async (ctx) => {
        await ctx.react('💋');
        const name = ctx.args.join(' ') || 'my love';
        const messages = [
            `💋 ${name}, tum mere liye sab se sexy ho.`,
            `🔥 ${name}, tumhari muskuran se dil garden garden ho jata hai.`,
            `😈 ${name}, tum to mujhe pagal kar doge.`,
            `💕 ${name}, tum ho to sab kuch sexy lagta hai.`,
            `💖 ${name}, tumhari baatein mujhe pagal karti hain.`,
            `❤️ ${name}, tum se mil kar laga ke duniya badal gayi.`,
            `💘 ${name}, tumhari khamoshi bhi mujhe pagal karti hai.`,
            `💗 ${name}, tum se door hona, mujh se door hona hai.`,
            `💝 ${name}, tum ho meri roshni, meri manzil.`,
            `💟 ${name}, tum se pyar karna meri adat ban gayi hai.`
        ];
        const msg = random(messages);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💋 *SEXY MESSAGE* 💋 ⬡─╮\n│\n│  ${msg}\n│\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  💕 For you ❤️\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('🔥');
        fancyLog('SEXY', 'Sexy message sent');
    },

    // ─── .steamy ────────────────────────────────────
    steamy: async (ctx) => {
        await ctx.react('💦');
        const steamyMessages = [
            "💦 Tumhari yaad mein raat guzar jati hai...",
            "🔥 Tum se mil kar laga ke aag lagi hai.",
            "💋 Tumhari muskuran, meri zindagi ki raunaq hai.",
            "😈 Tum ho to har lamha sexy hai.",
            "💕 Tumhari awaz, meri kamzori hai.",
            "💖 Tumhari shakal, meri aadat hai.",
            "❤️ Tum se na milna, maut jaisa hai.",
            "💘 Tumhari khushbu, meri duniya hai.",
            "💗 Tumhara naam, meri rooh mein hai.",
            "💝 Tum se door hona, zindagi se door hona hai.",
            "💟 Tum ho to duniya bhool jata hun.",
            "❣️ Tum se mil kar laga ke pyar asli hai."
        ];
        const msg = random(steamyMessages);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💦 *STEAMY VIBE* 💦 ⬡─╮\n│\n│  ${msg}\n│\n│  ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  🔥 Steaming hot!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💋');
        fancyLog('SEXY', 'Steamy vibe sent');
    },

    // ─── .kiss ──────────────────────────────────────
    kiss: async (ctx) => {
        await ctx.react('💋');
        const name = ctx.args.join(' ') || 'you';
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💋 *KISS* 💋 ⬡─╮\n│\n│  💋 Sending a kiss to ${name}!\n│\n│  💕 ${random(sexyEmojis)}  ${random(sexyEmojis)}  ${random(sexyEmojis)}\n│\n│  😘 Muah!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💕');
        fancyLog('SEXY', `Kiss sent to ${name}`);
    }
};