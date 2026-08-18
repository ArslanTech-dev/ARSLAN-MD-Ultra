// plugins/flirty.js
// Flirty, Romantic, and Pickup Line Commands
// Roman Urdu – Vertical Format

const { fancyLog } = require('../utils/logger');

// ─── Pickup Lines ──────────────────────────────
const pickupLines = [
    "💕 Kya tum Google ho? Kyun ke tum wahi hai jo main dhoondh raha tha.",
    "💖 Kya tum calculator ho? Kyun ke tum meri problems solve karti ho.",
    "❤️ Kya tum chocolate ho? Kyun ke tum dekh kar hi muh mein pani aa jata hai.",
    "💘 Kya tum WiFi ho? Kyun ke tum se connection strong hai.",
    "💗 Kya tum coffee ho? Kyun ke tum baghair zindagi adhoori hai.",
    "💝 Kya tum star ho? Kyun ke tum raat mein bhi chamakti ho.",
    "💟 Kya tum guitar ho? Kyun ke tum mere dil ki dhun ho.",
    "❣️ Kya tum phone ho? Kyun ke main tum se baat karte rehta hun.",
    "💕 Kya tum notebook ho? Kyun ke main tum pe apni zindagi likhna chahta hun.",
    "💖 Kya tum camera ho? Kyun ke tum dekh kar hi muskurahat aa jati hai.",
    "❤️ Kya tum rain ho? Kyun ke tum se refresh ho jata hun.",
    "💘 Kya tum sunset ho? Kyun ke tum dekh kar sukoon milta hai.",
    "💗 Kya tum song ho? Kyun ke tum sun kar acha lagta hai.",
    "💝 Kya tum dream ho? Kyun ke tum se jaagna mushkil hai.",
    "💟 Kya tum magic ho? Kyun ke tum se har pal special hai."
];

// ─── Flirty Replies ─────────────────────────────
const flirtyReplies = [
    "😏 Tum toh bohot smart ho... mujhe pasand aa rahe ho.",
    "😉 Tumhari muskuran dekh kar dil garden garden ho jata hai.",
    "😘 Tum ho to sab hai, warna kuch bhi nahi.",
    "💕 Tum se baat karna, subah ki pehli coffee jaisa hai.",
    "💖 Tumhara naam sun kar hi dil dhadak jata hai.",
    "❤️ Tum ho to har din special lagta hai.",
    "💘 Tumhari yaad mein din raat guzar jate hain.",
    "💗 Tum se milna meri zindagi ka best moment tha.",
    "💝 Tumhari awaz sun kar sukoon milta hai.",
    "💟 Tum saath ho to duniya bhool jata hun.",
    "❣️ Tumhari batein, meri zindagi mein rang bharti hain.",
    "💕 Tum se pyar karna meri adat ban gayi hai.",
    "💖 Tumhari khamoshi bhi mujhe sukoon deti hai.",
    "❤️ Tum se door hona, zindagi se door hona hai.",
    "💘 Tum ho meri roshni, meri manzil."
];

// ─── Compliments ────────────────────────────────
const compliments = [
    "😍 Tum bahut khoobsurat ho!",
    "💕 Tumhari muskuran jannat jaisi hai.",
    "💖 Tumhari ankhein sitaron se bhi khoobsurat hain.",
    "❤️ Tumhari awaz sukoon deti hai.",
    "💘 Tumhara andaaz alag hai.",
    "💗 Tum ho to sab kuch perfect hai.",
    "💝 Tumhari baatein mujhe khush karti hain.",
    "💟 Tumhari khushbu mujhe pagal karti hai.",
    "❣️ Tumhara chehra kitna pyara hai.",
    "💕 Tum se mil kar laga ke zindagi complete hai.",
    "💖 Tum nahi ho to kuch nahi.",
    "❤️ Tumhare liye main kuch bhi kar sakta hun.",
    "💘 Tum meri duniya ho.",
    "💗 Tumhare saath har lamha special hai."
];

// ─── Flirty Emojis ──────────────────────────────
const flirtyEmojis = ['😘', '💕', '💖', '❤️', '💘', '💗', '💝', '💟', '❣️', '😏', '😉', '😍'];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = {

    // ─── .pickup ────────────────────────────────────
    pickup: async (ctx) => {
        await ctx.react('😏');
        const line = random(pickupLines);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💕 *PICKUP LINE* 💕 ⬡─╮\n│\n│  ${line}\n│\n│  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}\n│\n│  ✨ Try this on your crush!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FLIRTY', 'Pickup line sent');
    },

    // ─── .flirt ─────────────────────────────────────
    flirt: async (ctx) => {
        await ctx.react('😉');
        const reply = random(flirtyReplies);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😏 *FLIRTY REPLY* 😏 ⬡─╮\n│\n│  ${reply}\n│\n│  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}\n│\n│  🔥 For someone special\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('😘');
        fancyLog('FLIRTY', 'Flirty reply sent');
    },

    // ─── .compliment ────────────────────────────────
    compliment: async (ctx) => {
        await ctx.react('😍');
        const comp = random(compliments);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💖 *COMPLIMENT* 💖 ⬡─╮\n│\n│  ${comp}\n│\n│  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}\n│\n│  🌹 Share with someone you like!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💕');
        fancyLog('FLIRTY', 'Compliment sent');
    },

    // ─── .crush ─────────────────────────────────────
    crush: async (ctx) => {
        const name = ctx.args.join(' ') || 'someone special';
        await ctx.react('💘');
        const emojis = ['💕', '💖', '❤️', '💘', '💗', '💝'];
        const messages = [
            `💖 ${name} meri zindagi mein aaye to sab badal gaya.`,
            `💕 ${name} se mil kar laga ke pyar asli hai.`,
            `❤️ ${name} mere khwabon mein rehti hai.`,
            `💘 ${name} se pyar karna meri taqdeer hai.`,
            `💗 ${name} ke bina zindagi adhoori hai.`,
            `💝 ${name} ho to har din special hai.`
        ];
        const msg = random(messages);
        const emoji = random(emojis);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💘 *CRUSH VIBES* 💘 ⬡─╮\n│\n│  ${msg}\n│\n│  ${emoji}  ${emoji}  ${emoji}\n│\n│  💭 ${name} ❤️\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💖');
        fancyLog('FLIRTY', `Crush vibe for ${name}`);
    },

    // ─── .heartbeats ────────────────────────────────
    heartbeats: async (ctx) => {
        await ctx.react('💓');
        const beats = ['💓', '💗', '💖', '💕', '💘', '💝', '💟'];
        let msg = '╭─⬡ 💓 *HEARTBEATS* 💓 ⬡─╮\n│\n│  ';
        for (let i = 0; i < 12; i++) {
            msg += random(beats) + ' ';
        }
        msg += `\n│\n│  💕 For you ❤️\n│  💖 Beating only for you\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: msg }, { quoted: ctx.msg });
        await ctx.react('💞');
        fancyLog('FLIRTY', 'Heartbeats sent');
    },

    // ─── .loveyou ────────────────────────────────────
    loveyou: async (ctx) => {
        await ctx.react('❤️');
        const name = ctx.args.join(' ') || 'my love';
        const messages = [
            `❤️ ${name}, I love you!`,
            `💕 ${name}, tum mere liye khaas ho.`,
            `💖 ${name}, tumhari yaad mein har pal.`,
            `💗 ${name}, tum se pyar karna meri zindagi hai.`,
            `💘 ${name}, tum ho to sab hai.`,
            `💝 ${name}, I love you more than anything.`,
            `💟 ${name}, tum meri duniya ho.`,
            `❣️ ${name}, my love for you is infinite.`
        ];
        const msg = random(messages);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ❤️ *LOVE YOU* ❤️ ⬡─╮\n│\n│  ${msg}\n│\n│  💕 Forever & Always 💕\n│\n│  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💘');
        fancyLog('FLIRTY', 'Love message sent');
    },

    // ─── .lovemeter ──────────────────────────────────
    lovemeter: async (ctx) => {
        await ctx.react('💖');
        const name = ctx.args.join(' ') || 'someone';
        const percent = Math.floor(Math.random() * 31) + 70; // 70-100%
        const bar = '❤️'.repeat(Math.round(percent / 10)) + '🖤'.repeat(10 - Math.round(percent / 10));
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💖 *LOVE METER* 💖 ⬡─╮\n│\n│  💕 ${name}\n│  [${bar}] ${percent}%\n│\n│  💖 Love is in the air!\n│  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💗');
        fancyLog('FLIRTY', `Love meter for ${name}`);
    },

    // ─── .flirtypickup ───────────────────────────────
    flirtypickup: async (ctx) => {
        await ctx.react('😏');
        const pickups = [
            "💕 Kya tum Google ho? Kyun ke tum wahi hai jo main dhoondh raha tha.",
            "💖 Kya tum calculator ho? Kyun ke tum meri problems solve karti ho.",
            "❤️ Kya tum chocolate ho? Kyun ke tum dekh kar hi muh mein pani aa jata hai.",
            "💘 Kya tum WiFi ho? Kyun ke tum se connection strong hai.",
            "💗 Kya tum coffee ho? Kyun ke tum baghair zindagi adhoori hai.",
            "💝 Kya tum star ho? Kyun ke tum raat mein bhi chamakti ho.",
            "💟 Kya tum guitar ho? Kyun ke tum mere dil ki dhun ho.",
            "❣️ Kya tum phone ho? Kyun ke main tum se baat karte rehta hun.",
            "💕 Kya tum notebook ho? Kyun ke main tum pe apni zindagi likhna chahta hun.",
            "💖 Kya tum camera ho? Kyun ke tum dekh kar hi muskurahat aa jati hai."
        ];
        const pickup = random(pickups);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 😏 *FLIRTY PICKUP* 😏 ⬡─╮\n│\n│  ${pickup}\n│\n│  💕 Try this on your crush!\n│  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}  ${random(flirtyEmojis)}\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('😉');
        fancyLog('FLIRTY', 'Flirty pickup sent');
    },

    // ─── .romantic ────────────────────────────────────
    romantic: async (ctx) => {
        await ctx.react('🌹');
        const romantics = [
            "🌹 Tumhari yaad mein raat guzar jati hai.",
            "💕 Tum se pyar karna meri adat ban gayi hai.",
            "💖 Tum ho to har din special hai.",
            "❤️ Tumhari muskuran meri subah hai.",
            "💘 Tumhari awaz sukoon deti hai.",
            "💗 Tum se door hona mushkil hai.",
            "💝 Tum mere khwabon ki malika ho.",
            "💟 Tum se milkar zindagi complete hui.",
            "❣️ Tum ho to sab hai.",
            "💕 Tumhari yaad mein din dhal jate hain."
        ];
        const msg = random(romantics);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🌹 *ROMANTIC VIBE* 🌹 ⬡─╮\n│\n│  ${msg}\n│\n│  🌙 • ☁️ • 🌸 • 🌊 • 💫\n│\n│  💕 Love is beautiful\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💕');
        fancyLog('FLIRTY', 'Romantic vibe sent');
    }
};