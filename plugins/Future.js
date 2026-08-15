// plugins/future.js
// ARSLAN's Complete Life Journey – Simplified Edition
// Only: Struggle, Dreams, Love (Saba), Achievements, Future
// No family members – Clean & Fancy

const { fancyLog } = require('../utils/logger');

// ─── Life Data ──────────────────────────────
const lifeData = {
    name: 'Muhammad Arslan',
    nick: 'Arslan',
    age: 17,
    city: 'Bahawalpur',
    district: 'Bahawalpur',
    province: 'Punjab, Pakistan',
    study: 'ICS (Intermediate in Computer Science)',
    college: 'Punjab College Bahawalpur',
    dream: 'Machine Learning & AI Engineer',
    love: 'Saba ❤️',
    wife: 'Saba (Insha\'Allah)',
    kids: '2 bache (Insha\'Allah)',
    goal: 'Duniya ka best AI Engineer aur developer',
    struggle: {
        matric: '738/1200',
        story: 'Matric mein marks low aaye (738/1200), bhot bura laga par hausla nahi haara. Ab ICS kar raha hon aur ML/AI Engineer banunga. Mera kehna hai ke marks decide nahi karte, mehnat karti hai.',
        emotional: 'Mujhe bhot log kehte the ke kuch nahi kar sakta, par main ne ARSLAN MD bana ke sab ko jawab diya 💪'
    },
    achievements: [
        '🏆 ARSLAN MD ULTRA bot – 250+ commands',
        '💻 Self-taught JavaScript, Node.js, Python',
        '🤖 Started learning AI/ML from age 16',
        '📚 ICS admission in Punjab College',
        '❤️ Found true love (Saba)',
        '💪 Overcame low marks and self-doubt',
        '🌟 Built a community of bot users',
        '🔥 Completed 10+ mini projects'
    ],
    timeline: [
        { age: 0, event: 'Born in Bahawalpur' },
        { age: 5, event: 'Started school' },
        { age: 10, event: 'First time coding (Scratch)' },
        { age: 14, event: 'Started learning JavaScript' },
        { age: 15, event: 'Built first WhatsApp bot' },
        { age: 16, event: 'Matric result 738/1200, but didn\'t give up' },
        { age: 16, event: 'Learned Python, AI basics' },
        { age: 17, event: 'Built ARSLAN MD ULTRA, met Saba ❤️' },
        { age: 18, event: 'Goal: Start AI/ML degree (Insha\'Allah)' },
        { age: 20, event: 'Plan: Become ML/AI Engineer' },
        { age: 22, event: 'Plan: Marriage with Saba ❤️' },
        { age: 25, event: 'Plan: Have 2 kids' },
        { age: 30, event: 'Goal: Top AI Engineer in Pakistan' }
    ],
    futureGoals: [
        '🌟 ML/AI Engineer banna',
        '💍 Saba se shadi karna (Insha\'Allah)',
        '🏠 Apna ghar banana',
        '🚗 Apni car khareedna (Tesla Insha\'Allah)',
        '🌍 Duniya ko AI se badalna',
        '💪 Parents ko proud karna',
        '❤️ Saba ke saath puri zindagi guzaarna',
        '👨‍👩‍👧‍👦 2 bache (Insha\'Allah)',
        '📚 PhD in AI (Insha\'Allah)',
        '🏆 International AI competition winner'
    ],
    quotes: [
        '💪 Matric mein 738/1200 aaye, par ab ARSLAN MD ULTRA bana diya',
        '🔥 Low marks ne mujhe aur strong banaya',
        '🌟 Struggle se hi success milti hai',
        '❤️ Saba meri motivation hai',
        '🚀 ML/AI Engineer banunga, Insha\'Allah',
        '💍 Saba se shadi meri pehli priority hai',
        '👑 Main king banane wala hun',
        '💻 Coding is my passion, AI is my future',
        '💪 Struggle se success tak ka safar'
    ],
    wifeDetails: {
        name: 'Saba',
        love: '❤️ Infinite',
        marriage: '2027-2028 (Insha\'Allah)',
        kids: '2 bache (Insha\'Allah)',
        dream: 'Saba ke saath puri zindagi, travel karna, duniya dekhna'
    }
};

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── Helper: Progress bar ────────────────────
function progressBar(value, max) {
    const percent = Math.round((value / max) * 100);
    const filled = Math.round(percent / 10);
    const empty = 10 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty) + ` ${percent}%`;
}

module.exports = {

    // ─── .mylife ───────────────────────────────
    mylife: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🌟');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🌟 *MY LIFE AT A GLANCE* 🌟 ⬡─╮\n│\n│  👤 Name: ${lifeData.name}\n│  📛 Nick: ${lifeData.nick}\n│  📅 Age: ${lifeData.age}\n│  📍 City: ${lifeData.city}, ${lifeData.province}\n│  🏛️ District: ${lifeData.district}\n│  📚 Study: ${lifeData.study}\n│  🏫 College: ${lifeData.college}\n│  💭 Dream: ${lifeData.dream}\n│  ❤️ Love: ${lifeData.love}\n│  💍 Wife: ${lifeData.wife}\n│  👶 Kids: ${lifeData.kids}\n│  🎯 Goal: ${lifeData.goal}\n│\n│  📚 Matric: ${lifeData.struggle.matric}\n│  💪 Struggle: ${lifeData.struggle.story}\n│\n│  💕 Saba ❤️ Arslan\n│  🔥 From 738/1200 to AI Engineer\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FUTURE', 'Life shown');
    },

    // ─── .myjourney ──────────────────────────────
    myjourney: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🚀');
        let timelineText = `╭─⬡ 🚀 *MY JOURNEY TIMELINE* 🚀 ⬡─╮\n│\n`;
        lifeData.timeline.forEach(item => {
            timelineText += `│  🕐 Age ${item.age}: ${item.event}\n`;
        });
        timelineText += `│\n│  🔥 From a boy with 738 marks\n│  💻 To a developer with 250+ commands\n│  🚀 Insha'Allah, AI Engineer next\n│\n│  💕 Saba ❤️ Arslan\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: timelineText }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FUTURE', 'Timeline shown');
    },

    // ─── .myfuture ──────────────────────────────
    myfuture: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🔮');
        let list = `╭─⬡ 🔮 *MY FUTURE GOALS* 🔮 ⬡─╮\n│\n`;
        lifeData.futureGoals.forEach((goal, i) => {
            list += `│  ${i+1}. ${goal}\n`;
        });
        list += `│\n│  💪 Insha'Allah sab hoga\n│  ❤️ Saba ke saath\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FUTURE', 'Future goals shown');
    },

    // ─── .mywife ─────────────────────────────────
    mywife: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('💍');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💍 *MY WIFE (Insha'Allah)* 💍 ⬡─╮\n│\n│  👰 Name: ${lifeData.wifeDetails.name}\n│  ❤️ Love: ${lifeData.wifeDetails.love}\n│  💍 Marriage: ${lifeData.wifeDetails.marriage}\n│  👶 Kids: ${lifeData.wifeDetails.kids}\n│  💭 Dream: ${lifeData.wifeDetails.dream}\n│\n│  💕 Saba ❤️ Arslan\n│  🌹 Together forever\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('❤️');
        fancyLog('FUTURE', 'Wife shown');
    },

    // ─── .myachievements ─────────────────────────
    myachievements: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🏆');
        let list = `╭─⬡ 🏆 *MY ACHIEVEMENTS* 🏆 ⬡─╮\n│\n`;
        lifeData.achievements.forEach((achievement, i) => {
            list += `│  ${i+1}. ${achievement}\n`;
        });
        list += `│\n│  💪 And many more to come!\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FUTURE', 'Achievements shown');
    },

    // ─── .myquote ─────────────────────────────────
    myquote: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('💬');
        const quote = random(lifeData.quotes);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💬 *ARSLAN'S QUOTE* 💬 ⬡─╮\n│\n│  "${quote}"\n│\n│  👑 ARSLAN TECH'S\n│  💕 Saba ❤️ Arslan\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FUTURE', 'Quote shown');
    },

    // ─── .myvision ──────────────────────────────
    myvision: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('👁️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 👁️ *MY VISION* 👁️ ⬡─╮\n│\n│  🎯 ${lifeData.goal}\n│  💪 ${lifeData.dream}\n│  ❤️ Saba ke saath\n│  🌍 Duniya ko AI se badalna\n│  💍 Shadi: ${lifeData.wifeDetails.marriage}\n│  👶 Kids: ${lifeData.wifeDetails.kids}\n│\n│  🔥 Matric 738/1200 tha\n│  💻 Aaj ARSLAN MD ULTRA hai\n│  🚀 Kal ML/AI Engineer banunga\n│\n│  💕 Saba ❤️ Arslan\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FUTURE', 'Vision shown');
    },

    // ─── .mylovestory ──────────────────────────────
    mylovestory: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('💕');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💕 *MY LOVE STORY* 💕 ⬡─╮\n│\n│  ❤️ Her Name: Saba\n│  💖 How I met: (A Beautiful Moment)\n│  💕 Our bond: Infinite\n│  💍 Future: Insha'Allah, she'll be my wife\n│  👶 Kids: 2 (Insha'Allah)\n│\n│  🌹 Saba is my everything\n│  💪 She motivates me daily\n│  🔥 Together we are strong\n│\n│  💕 Saba ❤️ Arslan\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('❤️');
        fancyLog('FUTURE', 'Love story shown');
    },

    // ─── .mystruggle ──────────────────────────────
    mystruggle: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('💪');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💪 *MY STRUGGLE STORY* 💪 ⬡─╮\n│\n│  📚 Matric: ${lifeData.struggle.matric}\n│  📝 Story: ${lifeData.struggle.story}\n│  💬 Emotional: ${lifeData.struggle.emotional}\n│\n│  🔥 I never gave up!\n│  💻 I built ARSLAN MD ULTRA\n│  🤖 Learning AI/ML\n│  ❤️ Saba supports me\n│\n│  💪 Struggle = Success\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('🔥');
        fancyLog('FUTURE', 'Struggle shown');
    },

    // ─── .mystatusbar ──────────────────────────────
    mystatusbar: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('📊');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 📊 *MY LIFE PROGRESS* 📊 ⬡─╮\n│\n│  📚 Education: ${progressBar(738, 1200)} (Matric)\n│  💻 Coding Skills: ${progressBar(8, 10)} (Self-taught)\n│  🤖 AI Learning: ${progressBar(6, 10)} (Learning in progress)\n│  ❤️ Love: ${progressBar(10, 10)} (Infinite ❤️)\n│  💪 Struggle: ${progressBar(9, 10)} (Almost there)\n│  🎯 Goal: ${progressBar(7, 10)} (On track)\n│\n│  🔥 From 738/1200 to AI Engineer\n│  💪 Keep pushing!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('FUTURE', 'Status bars shown');
    }
};