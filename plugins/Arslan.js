// plugins/owner-personal.js
// Personal commands for the Owner (ARSLAN)
const os = require('os');
const { fancyLog } = require('../utils/logger');

// ─── In-memory tasks (To-Do List) ──────────
global._tasks = global._tasks || {};

// ─── Owner's Bio (UPDATED WITH REAL DATA) ──
const ownerBio = {
    name: 'Arslan',
    fullName: 'Muhammad Arslan',
    age: '17',
    city: 'Bahawalpur',
    district: 'Bahawalpur',
    study: 'ICS (Intermediate in Computer Science)',
    college: 'Punjab College Bahawalpur',
    profession: 'Student & Developer',
    passion: 'Coding, AI, Machine Learning, WhatsApp Bots',
    dream: 'Machine Learning & AI Engineer',
    relationship: '❤️ Saba (My Love)',
    motto: 'Dream big, work hard, achieve the impossible 🚀',
    quote: 'ML/AI Engineer banunga, aur duniya ko badal dunga 💪'
};

// ─── Random owner facts (UPDATED) ───────────
const ownerFacts = [
    "🔥 Arslan is a 17-year-old self-made developer from Bahawalpur",
    "📚 He is studying ICS at Punjab College Bahawalpur",
    "💻 He built ARSLAN MD from scratch at the age of 16",
    "❤️ His love for Saba is infinite and pure",
    "💡 His dream is to become an ML/AI Engineer",
    "🚀 He aims to become the best AI Engineer in Pakistan",
    "🎯 His goal: Make the world a better place with AI",
    "🌙 He works late nights to perfect his code and skills",
    "💪 He believes in hard work, consistency, and never giving up",
    "🤖 He loves AI, ML, and automation",
    "👑 He is called the 'King of Bots' by his friends",
    "📖 He is currently learning Python, JavaScript, and AI/ML",
    "🏆 He wants to win international coding competitions",
    "💕 Saba is his motivation and strength",
    "🌟 He believes in making his parents proud"
];

// ─── Random achievements ────────────────────
const achievements = [
    "🏆 Built ARSLAN MD ULTRA at 16",
    "💻 Mastered JavaScript, Python, and Node.js",
    "🤖 Started learning AI/ML early",
    "📚 Studying ICS at Punjab College",
    "❤️ Found true love in Saba",
    "🚀 Built 10+ WhatsApp bots",
    "💡 Created automation tools for students",
    "🌟 Became a role model for young developers"
];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

module.exports = {

    /**
     * .myinfo – Owner's full information
     * Only for owner
     */
    myinfo: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Yeh command sirf owner ke liye hai.' }, { quoted: ctx.msg });
        await ctx.react('👤');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 👤 *OWNER INFO* ⬡─╮\n│\n│  👑 Name: ${ownerBio.fullName}\n│  📛 Nick: ${ownerBio.name}\n│  📅 Age: ${ownerBio.age} years\n│  📍 City: ${ownerBio.city}\n│  🏛️ District: ${ownerBio.district}\n│  📚 Study: ${ownerBio.study}\n│  🏫 College: ${ownerBio.college}\n│  💻 Profession: ${ownerBio.profession}\n│  ❤️ Love: ${ownerBio.relationship}\n│  🔥 Passion: ${ownerBio.passion}\n│  💭 Dream: ${ownerBio.dream}\n│  💬 Motto: ${ownerBio.motto}\n│  ✨ Quote: ${ownerBio.quote}\n│\n│  ⚡ Powered by ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Owner info shown');
    },

    /**
     * .mybio – Set or show owner's bio
     */
    mybio: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        const bio = ctx.args.join(' ');
        if (!bio) {
            // Show current bio
            const current = global._mybio || ownerBio.motto;
            await ctx.react('📝');
            return ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ 📝 *MY BIO* ⬡─╮\n│\n│  ${current}\n│\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
            }, { quoted: ctx.msg });
        }
        global._mybio = bio;
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✅ Bio updated to: "${bio}"`
        }, { quoted: ctx.msg });
        fancyLog('PERSONAL', `Bio updated: ${bio}`);
    },

    /**
     * .myfact – Random fact about owner
     */
    myfact: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('💡');
        const fact = random(ownerFacts);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💡 *FACT ABOUT ARSLAN* 💡 ⬡─╮\n│\n│  ${fact}\n│\n│  👑 King of Bots\n│  💕 Saba ❤️ Arslan\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Fact shown');
    },

    /**
     * .myachievement – Random achievement
     */
    myachievement: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🏆');
        const achievement = random(achievements);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🏆 *MY ACHIEVEMENT* 🏆 ⬡─╮\n│\n│  ${achievement}\n│\n│  💪 Arslan – The Future ML/AI Engineer\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Achievement shown');
    },

    /**
     * .mystudy – Study information
     */
    mystudy: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('📚');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 📚 *MY STUDY* ⬡─╮\n│\n│  📖 Program: ${ownerBio.study}\n│  🏫 College: ${ownerBio.college}\n│  📍 City: ${ownerBio.city}\n│  🎯 Goal: ${ownerBio.dream}\n│\n│  💪 Arslan – Future ML/AI Engineer\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Study info shown');
    },

    /**
     * .mytime – Owner's local time
     */
    mytime: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🕐');
        const now = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🕐 *MY TIME* ⬡─╮\n│\n│  📅 ${now}\n│  🌍 Timezone: Asia/Karachi\n│  📍 Location: Bahawalpur, Pakistan\n│\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Time shown');
    },

    /**
     * .mytasks – To-Do List for owner
     */
    mytasks: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('📋');
        const tasks = global._tasks[ctx.from] || [];
        if (tasks.length === 0) {
            return ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ 📋 *MY TASKS* ⬡─╮\n│\n│  ✅ No tasks yet!\n│  📝 Add: .addtask "Task description"\n│\n╰─────────────────────────╯`
            }, { quoted: ctx.msg });
        }
        let list = `╭─⬡ 📋 *MY TASKS* ⬡─╮\n│\n`;
        tasks.forEach((task, i) => {
            list += `│  ${i+1}. ${task}\n`;
        });
        list += `│\n│  🗑️ .deltask <number>\n│  📝 .addtask "Task"\n│  🗑️ .cleartasks\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Tasks shown');
    },

    /**
     * .addtask "Task" – Add a task to To-Do List
     */
    addtask: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        const task = ctx.args.join(' ');
        if (!task) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .addtask "Buy groceries"' }, { quoted: ctx.msg });
        global._tasks[ctx.from] = global._tasks[ctx.from] || [];
        global._tasks[ctx.from].push(task);
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✅ Task added: "${task}"\n📋 Total: ${global._tasks[ctx.from].length} tasks`
        }, { quoted: ctx.msg });
        fancyLog('PERSONAL', `Task added: ${task}`);
    },

    /**
     * .deltask <number> – Delete a task
     */
    deltask: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        const num = parseInt(ctx.args[0]);
        if (isNaN(num) || num < 1) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .deltask 1' }, { quoted: ctx.msg });
        const tasks = global._tasks[ctx.from] || [];
        if (num > tasks.length) return ctx.sock.sendMessage(ctx.from, { text: '❌ Invalid task number.' }, { quoted: ctx.msg });
        const removed = tasks.splice(num - 1, 1);
        await ctx.react('🗑️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🗑️ Task removed: "${removed[0]}"\n📋 Remaining: ${tasks.length} tasks`
        }, { quoted: ctx.msg });
        fancyLog('PERSONAL', `Task deleted: ${removed[0]}`);
    },

    /**
     * .cleartasks – Clear all tasks
     */
    cleartasks: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        global._tasks[ctx.from] = [];
        await ctx.react('🗑️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🗑️ All tasks cleared!`
        }, { quoted: ctx.msg });
        fancyLog('PERSONAL', 'All tasks cleared');
    },

    /**
     * .mystatus – Owner's status (online/offline)
     */
    mystatus: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🟢');
        const status = global._ownerStatus || 'I\'m always online for you 😊';
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🟢 *MY STATUS* ⬡─╮\n│\n│  💬 ${status}\n│  👑 ARSLAN TECH'S\n│  💕 Saba ❤️ Arslan\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Status shown');
    },

    /**
     * .setstatus "text" – Set owner's status
     */
    setstatus: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        const status = ctx.args.join(' ');
        if (!status) return ctx.sock.sendMessage(ctx.from, { text: '❌ Usage: .setstatus "Busy coding"' }, { quoted: ctx.msg });
        global._ownerStatus = status;
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, {
            text: `✅ Status updated to: "${status}"`
        }, { quoted: ctx.msg });
        fancyLog('PERSONAL', `Status updated: ${status}`);
    },

    /**
     * .myip – Owner's local IP
     */
    myip: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🌐');
        const interfaces = os.networkInterfaces();
        let ip = 'N/A';
        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    ip = iface.address;
                    break;
                }
            }
        }
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🌐 *MY IP* ⬡─╮\n│\n│  📍 Local IP: ${ip}\n│  🖥️ Host: ${os.hostname()}\n│  📍 Location: Bahawalpur, Pakistan\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'IP shown');
    },

    /**
     * .mydream – Show owner's dream
     */
    mydream: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🌟');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🌟 *MY DREAM* 🌟 ⬡─╮\n│\n│  💭 ${ownerBio.dream}\n│  💪 ${ownerBio.quote}\n│\n│  🚀 Arslan – Future ML/AI Engineer\n│  ❤️ Saba supports me!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'Dream shown');
    },

    /**
     * .mylove – Show love for Saba
     */
    mylove: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('❤️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ❤️ *MY LOVE* ❤️ ⬡─╮\n│\n│  💕 ${ownerBio.relationship}\n│  🌹 She is my motivation\n│  💖 My reason to work hard\n│  🌟 Together we can conquer the world\n│\n│  👑 Arslan ❤️ Saba\n│  💞 Forever and Always\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('💕');
        fancyLog('PERSONAL', 'Love shown');
    },

    /**
     * .mycity – Show city information
     */
    mycity: async (ctx) => {
        if (!ctx.isOwner) return ctx.sock.sendMessage(ctx.from, { text: '❌ Sirf owner.' }, { quoted: ctx.msg });
        await ctx.react('🏙️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🏙️ *MY CITY* ⬡─╮\n│\n│  📍 City: ${ownerBio.city}\n│  🏛️ District: ${ownerBio.district}\n│  🌍 Province: Punjab, Pakistan\n│  📚 Study: ${ownerBio.study}\n│  🏫 College: ${ownerBio.college}\n│\n│  👑 ARSLAN TECH'S\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('PERSONAL', 'City info shown');
    }
};