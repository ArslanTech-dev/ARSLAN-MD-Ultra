// commands/fun.js
// All fun, flex, meme, and owner-special commands

module.exports = {
    // FLEX
    flexmoney: async (ctx) => {
        await ctx.react('💰');
        const lines = [
            'Bank balance: 7 Figures 💰',
            'Paisa kam hai? Nahi bro, time kam hai ⏰💵',
            'Credit card black hai, dil bhi black hai 🖤',
            'Mehnat apni, shaan apni, paisa bhi apna 💸'
        ];
        const line = lines[Math.floor(Math.random() * lines.length)];
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *MONEY FLEX* ⬡─╮\n│\n│ 💸 ${line}\n│\n╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    flexcar: async (ctx) => {
        await ctx.react('🏎️');
        const cars = [
            'Garage me Land Cruiser khari hai 🚙',
            'Speed meri, road tumhari 🏎️💨',
            'Petrol mehenga hai, isliye attitude sasta nahi rakhta 😎',
            '4x4 nahi, 24x7 chalti hai 🔥'
        ];
        const line = cars[Math.floor(Math.random() * cars.length)];
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *CAR FLEX* ⬡─╮\n│\n│ 🏎️ ${line}\n│\n╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    flexsaba: async (ctx) => {
        await ctx.react('💍');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *MY QUEEN* ⬡─╮
│
│ 👑 Naam: Saba
│ 💌 Status: Dil ki malika
│ 🌹 Note: Jo izzat karega, izzat payega
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    king: async (ctx) => {
        await ctx.react('👑');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *KING MODE* ⬡─╮
│
│ 👑 Name: ${global.OWNER_NAME}
│ ⚡ Attitude: Unlimited
│ 🔥 Rule: Jo jalta hai jalne do
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    flexbot: async (ctx) => {
        await ctx.react('🤖');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *TECH FLEX* ⬡─╮
│
│ 🤖 Bot: ${global.BOT_NAME}
│ 👨‍💻 Owner: ${global.OWNER_NAME}
│ ⚡ Speed: Light se tez
│ 🧠 Brain: ChatGPT + Arslan
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    // OWNER SPECIAL
    me: async (ctx) => {
        await ctx.react('👑');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *OWNER PROFILE* ⬡─╮
│
│ 👑 Name: ${global.OWNER_NAME}
│ 💻 Work: Dev + Hacker Mind
│ ❤️ Love: Saba
│ 🔥 Motto: King banane wala hun
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    attitude: async (ctx) => {
        await ctx.react('😎');
        const lines = [
            'Main Arslan hun... Rule nahi banata, rule todta hun 👑',
            'Log jalte hain, aur main chalta hun 🔥',
            'King nahi hun... King banane wala hun 😈',
            'Saba meri hai, baaki sab copy hai 💌'
        ];
        const line = lines[Math.floor(Math.random() * lines.length)];
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *ATTITUDE* ⬡─╮\n│\n│ ${line}\n│\n╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    myquote: async (ctx) => {
        await ctx.react('💬');
        const quotes = [
            'Mehnat karo, shor baad me hoga',
            'Waqt aur main dono tez hain',
            'Pyar 1 se, dosti sab se',
            'Naam chota hai, kaam bade hain'
        ];
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *ARSLAN QUOTE* ⬡─╮\n│\n│ "${q}"\n│\n│ - ${global.OWNER_NAME}\n│\n╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    mystatus: async (ctx) => {
        await ctx.react('📊');
        let uptime = process.uptime();
        let hours = Math.floor(uptime / 3600);
        let minutes = Math.floor((uptime % 3600) / 60);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *BOT STATUS* ⬡─╮
│
│ 🟢 Bot: Online
│ ⏱️ Uptime: ${hours}h ${minutes}m
│ 👑 Owner: ${global.OWNER_NAME}
│ ⚡ Powered by: ARSLAN TECH'S
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    sabalove: async (ctx) => {
        await ctx.react('💌');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *MESSAGE FOR SABA* ⬡─╮
│
│ Saba suno...
│ Tu meri priority hai
│ Tu meri khamoshi ki wajah hai
│ Aur tu meri sabse badi taqat hai 💍
│
│ - ${global.OWNER_NAME}
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    // VIRAL MEME COMMANDS (add all .obhai, .paisa, .pawri, .awara, .tatya, .rasode, .bakchodi, .roast, .sadak, .rishtedar, .tiktok, .cringe, .react)
    // I'll show a few; you can copy all from your original index.js

    obhai: async (ctx) => {
        await ctx.react('😂');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *VIRAL MEME* ⬡─╮
│
│ O BHAI... MARO MUJHE MARO 😭
│ YE MAZAK HO RAHA HAI KYA
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    paisa: async (ctx) => {
        await ctx.react('💰');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *VIRAL MEME* ⬡─╮
│
│ PAISA HI PAISA HOGA 💰
│ JEB ME PAISA NAHI,
│ PAR BAAT PAISO KI KARENGE 😎
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    // ... add all other meme commands similarly
};