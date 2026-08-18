// plugins/arslan.js
// ARSLAN TECH'S Personal Profile Plugin
// All data about Arslan – Study, Dream, Love, and more
// Roman Urdu – Vertical Format

const { fancyLog } = require('../utils/logger');

// ─── Arslan's Personal Data ────────────────────
const arslanData = {
    name: 'Arslan',
    fullName: 'Muhammad Arslan',
    nick: 'ARSLAN TECH\'S',
    age: 17,
    country: 'Pakistan',
    district: 'Bahawalpur',
    city: 'Bahawalpur',
    study: 'ICS (Intermediate in Computer Science)',
    college: 'Punjab College Bahawalpur',
    dream: 'ML/AI Engineer',
    dreamCompany: 'Microsoft jaisi companies',
    love: 'Pretty girls with brown hair 💕',
    goal: 'Duniya ka best AI Engineer banna',
    passion: 'Coding, AI, Machine Learning, WhatsApp Bots',
    motto: 'Mehnat karo, shor baad mein hoga 💪',
    quote: 'Microsoft mein job karna hai, aur duniya ko AI se badalna hai 🚀'
};

// ─── Arslan Facts ──────────────────────────────
const arslanFacts = [
    "🔥 Arslan 17 saal ka hai aur ICS kar raha hai.",
    "📚 Arslan Punjab College Bahawalpur mein parhta hai.",
    "💻 Arslan ne ARSLAN MD ULTRA bot banaya hai.",
    "🤖 Arslan ka dream ML/AI Engineer banna hai.",
    "💼 Arslan Microsoft jaisi companies mein job karna chahta hai.",
    "❤️ Arslan ko pretty girls with brown hair pasand hain.",
    "📍 Arslan Bahawalpur, Pakistan se hai.",
    "💪 Arslan ka motto: Mehnat karo, shor baad mein hoga.",
    "🚀 Arslan duniya ko AI se badalna chahta hai.",
    "👑 Arslan ko 'King of Bots' bhi kehte hain.",
    "📖 Arslan coding seekh raha hai aur AI/ML mein interest hai.",
    "🎯 Arslan ka goal: Duniya ka best AI Engineer banna.",
    "💕 Arslan ko pretty girls pasand hain, especially brown hair wali.",
    "🌟 Arslan apne parents ko proud karna chahta hai."
];

// ─── Arslan Dreams ──────────────────────────────
const arslanDreams = [
    "🚀 ML/AI Engineer banna",
    "💼 Microsoft mein job karna",
    "🌍 Duniya ko AI se badalna",
    "💪 Apne parents ko proud karna",
    "💕 Ek pretty girl with brown hair se milna",
    "🏠 Apna ghar banana",
    "🚗 Apni car khareedna",
    "📚 AI mein PhD karna",
    "🏆 International AI competition winner banna",
    "👑 Best AI Engineer in Pakistan banna"
];

// ─── Arslan Love Messages ──────────────────────
const arslanLoveMessages = [
    "💕 Pretty girls with brown hair... bas yahi chahiye.",
    "❤️ Brown hair, pretty smile – that's my type.",
    "💖 Mujhe pretty girls pasand hain, especially brown hair wali.",
    "💗 Aankhen brown, baal brown, dil bhi brown 💕",
    "💘 Pretty girls with brown hair – my weakness.",
    "💝 Brown hair beauty – that's what I like.",
    "💟 Pretty girl with brown hair – meri dream girl.",
    "❣️ Brown hair, beautiful eyes – perfect combo."
];

// ─── Arslan Quotes ──────────────────────────────
const arslanQuotes = [
    "💪 Mehnat karo, shor baad mein hoga.",
    "🚀 Microsoft mein job karna hai, aur duniya ko AI se badalna hai.",
    "🤖 ML/AI Engineer banunga, Insha'Allah.",
    "👑 Main king banane wala hun.",
    "💻 Coding is my passion, AI is my future.",
    "📚 ICS kar raha hun, lekin dream AI Engineer ka hai.",
    "💕 Pretty girls with brown hair – meri zindagi mein rang.",
    "🌟 Bahawalpur se hun, lekin duniya badalni hai.",
    "💪 17 saal ka hun, lekin dreams bade hain.",
    "🔥 Mehnat karte raho, success milegi."
];

// ─── Emojis ──────────────────────────────────────
const arslanEmojis = ['🔥', '💪', '🚀', '👑', '💻', '🤖', '📚', '💕', '🌟', '💯'];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = {

    // ─── .arslan ────────────────────────────────────
    arslan: async (ctx) => {
        await ctx.react('👑');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 👑 *ARSLAN TECH'S PROFILE* 👑 ⬡─╮\n│\n│  👤 Name: ${arslanData.fullName}\n│  📛 Nick: ${arslanData.nick}\n│  📅 Age: ${arslanData.age}\n│  🌍 Country: ${arslanData.country}\n│  📍 City: ${arslanData.district}, ${arslanData.country}\n│  📚 Study: ${arslanData.study}\n│  🏫 College: ${arslanData.college}\n│  💭 Dream: ${arslanData.dream}\n│  💼 Dream Company: ${arslanData.dreamCompany}\n│  💕 Love: ${arslanData.love}\n│  🎯 Goal: ${arslanData.goal}\n│  💬 Motto: ${arslanData.motto}\n│  ✨ Quote: ${arslanData.quote}\n│\n│  ${random(arslanEmojis)}  ${random(arslanEmojis)}  ${random(arslanEmojis)}\n│\n│  🔥 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ARSLAN', 'Arslan profile shown');
    },

    // ─── .arslanfact ────────────────────────────────
    arslanfact: async (ctx) => {
        await ctx.react('💡');
        const fact = random(arslanFacts);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💡 *FACT ABOUT ARSLAN* 💡 ⬡─╮\n│\n│  ${fact}\n│\n│  ${random(arslanEmojis)}  ${random(arslanEmojis)}  ${random(arslanEmojis)}\n│\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('🔥');
        fancyLog('ARSLAN', 'Arslan fact sent');
    },

    // ─── .arslandream ──────────────────────────────
    arslandream: async (ctx) => {
        await ctx.react('🚀');
        let list = `╭─⬡ 🚀 *ARSLAN'S DREAMS* 🚀 ⬡─╮\n│\n`;
        arslanDreams.forEach((dream, i) => {
            list += `│  ${i+1}. ${dream}\n`;
        });
        list += `│\n│  💪 Insha'Allah sab hoga\n│  🔥 ARSLAN TECH'S\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
        await ctx.react('💯');
        fancyLog('ARSLAN', 'Arslan dreams shown');
    },

    // ─── .arslanlove ────────────────────────────────
    arslanlove: async (ctx) => {
        await ctx.react('💕');
        const msg = random(arslanLoveMessages);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💕 *ARSLAN'S LOVE* 💕 ⬡─╮\n│\n│  ${msg}\n│\n│  ${random(arslanEmojis)}  ${random(arslanEmojis)}  ${random(arslanEmojis)}\n│\n│  💖 Pretty girls with brown hair\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('❤️');
        fancyLog('ARSLAN', 'Arslan love message sent');
    },

    // ─── .arslanquote ──────────────────────────────
    arslanquote: async (ctx) => {
        await ctx.react('💬');
        const quote = random(arslanQuotes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💬 *ARSLAN'S QUOTE* 💬 ⬡─╮\n│\n│  "${quote}"\n│\n│  ${random(arslanEmojis)}  ${random(arslanEmojis)}  ${random(arslanEmojis)}\n│\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('🔥');
        fancyLog('ARSLAN', 'Arslan quote sent');
    },

    // ─── .arslanstudy ───────────────────────────────
    arslanstudy: async (ctx) => {
        await ctx.react('📚');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 📚 *ARSLAN'S STUDY* 📚 ⬡─╮\n│\n│  📖 Program: ${arslanData.study}\n│  🏫 College: ${arslanData.college}\n│  📍 City: ${arslanData.city}, ${arslanData.country}\n│  🎯 Goal: ${arslanData.dream}\n│  💼 Dream Company: ${arslanData.dreamCompany}\n│\n│  💪 Arslan – Future ML/AI Engineer\n│  🔥 Mehnat jari hai\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ARSLAN', 'Arslan study info shown');
    },

    // ─── .arslangoal ────────────────────────────────
    arslangoal: async (ctx) => {
        await ctx.react('🎯');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🎯 *ARSLAN'S GOAL* 🎯 ⬡─╮\n│\n│  🎯 ${arslanData.goal}\n│  💼 ${arslanData.dreamCompany}\n│  🤖 ${arslanData.dream}\n│\n│  💪 Mehnat karo, shor baad mein hoga\n│  🚀 Insha'Allah sab hoga\n│\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💯');
        fancyLog('ARSLAN', 'Arslan goal shown');
    },

    // ─── .arslanvibes ───────────────────────────────
    arslanvibes: async (ctx) => {
        await ctx.react('🌟');
        const vibes = [
            "🔥 Arslan ki vibes: Confident, Smart, and Ambitious",
            "💪 Arslan ka attitude: King level",
            "🚀 Arslan ka dream: AI Engineer",
            "💕 Arslan ki love: Pretty girls with brown hair",
            "📚 Arslan ka study: ICS",
            "👑 Arslan ka nickname: King of Bots",
            "🤖 Arslan ka passion: AI and Coding",
            "💼 Arslan ki dream company: Microsoft",
            "🌟 Arslan ka goal: Duniya ko AI se badalna"
        ];
        const vibe = random(vibes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🌟 *ARSLAN VIBES* 🌟 ⬡─╮\n│\n│  ${vibe}\n│\n│  ${random(arslanEmojis)}  ${random(arslanEmojis)}  ${random(arslanEmojis)}\n│\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💯');
        fancyLog('ARSLAN', 'Arslan vibes sent');
    }
};