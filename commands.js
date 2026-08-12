// commands/system.js
// System commands: menu, help, ping, alive, uptime, etc.

const { fancyLog } = require('../utils/logger');

function getUptime() {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    return days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m`;
}

function getTotalCommands() {
    return '181+';
}

function getMenu() {
    const p = global.PREFIX;
    return `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║          ✦ ${global.BOT_NAME} ✦          ║
║            Version ${global.VERSION}            ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  👑 Owner       : ${global.OWNER_NAME}                       ║
║  ⚡ Speed       : Ultra Fast                                ║
║  📦 Commands    : ${getTotalCommands()}                     ║
║  ⏱ Uptime      : ${getUptime()}                            ║
║  🔣 Prefix      : ${p}                                     ║
║  🌐 Mode        : Public                                   ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  📌 FLEX COMMANDS                                            ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}flexmoney                                               ║
║  ${p}flexcar                                                 ║
║  ${p}king                                                    ║
║  ${p}flexbot                                                 ║
║  ${p}flexsaba                                                ║
║                                                              ║
║  👑 OWNER SPECIAL                                            ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}me                                                      ║
║  ${p}attitude                                                ║
║  ${p}myquote                                                 ║
║  ${p}mystatus                                                ║
║  ${p}sabalove                                                ║
║                                                              ║
║  📥 DOWNLOADER                                               ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}tiktok                                                  ║
║  ${p}tiktok2                                                 ║
║  ${p}tiktok3                                                 ║
║  ${p}igdl                                                    ║
║  ${p}igdl2                                                   ║
║  ${p}igdl3                                                   ║
║  ${p}fb                                                      ║
║  ${p}ytpost                                                  ║
║  ${p}mediafire                                               ║
║  ${p}megadl                                                  ║
║  ${p}gitclone                                                ║
║  ${p}pinterest                                               ║
║  ${p}ttmp3                                                   ║
║  ${p}igmp3                                                   ║
║  ${p}video                                                   ║
║  ${p}capcut                                                  ║
║  ${p}drama                                                   ║
║  ${p}tsticker                                                ║
║  ${p}tts                                                     ║
║                                                              ║
║  😂 VIRAL MEME                                               ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}obhai                                                   ║
║  ${p}paisa                                                   ║
║  ${p}pawri                                                   ║
║  ${p}awara                                                   ║
║  ${p}tatya                                                   ║
║  ${p}rasode                                                  ║
║  ${p}bakchodi                                                ║
║  ${p}roast                                                   ║
║  ${p}sadak                                                   ║
║  ${p}rishtedar                                               ║
║  ${p}tiktok                                                  ║
║  ${p}cringe                                                  ║
║  ${p}react                                                   ║
║                                                              ║
║  🤖 AI                                                       ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}gpt                                                     ║
║  ${p}chatgpt                                                 ║
║  ${p}gemini                                                  ║
║  ${p}claudeai                                                ║
║  ${p}deepseek                                                ║
║  ${p}codeai                                                  ║
║  ${p}bot                                                     ║
║                                                              ║
║  👥 GROUP                                                    ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}tagall                                                  ║
║  ${p}kick                                                    ║
║  ${p}promote                                                 ║
║  ${p}p                                                       ║
║  ${p}demote                                                  ║
║  ${p}hidetag                                                 ║
║  ${p}tagadmins                                               ║
║  ${p}ginfo                                                   ║
║  ${p}add                                                     ║
║  ${p}invite                                                  ║
║  ${p}link                                                    ║
║  ${p}join                                                    ║
║  ${p}leave                                                   ║
║  ${p}out                                                     ║
║  ${p}mute                                                    ║
║  ${p}unmute                                                  ║
║  ${p}end                                                     ║
║  ${p}revoke                                                  ║
║  ${p}poll                                                    ║
║  ${p}newgc                                                   ║
║  ${p}delete                                                  ║
║  ${p}acceptall                                               ║
║  ${p}rejectall                                               ║
║  ${p}requests                                                ║
║  ${p}accept                                                  ║
║  ${p}reject                                                  ║
║  ${p}updategdesc                                             ║
║  ${p}updategname                                             ║
║  ${p}groupstatus                                             ║
║  ${p}antibot                                                 ║
║  ${p}dismissall                                              ║
║  ${p}gcpp                                                    ║
║                                                              ║
║  ⚙️ SETTINGS                                                 ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}welcome                                                 ║
║  ${p}goodbye                                                 ║
║  ${p}setwelcome                                              ║
║  ${p}setgoodbye                                              ║
║  ${p}antiedit                                                ║
║  ${p}autoread                                                ║
║  ${p}antilink                                                ║
║  ${p}antidelete                                              ║
║  ${p}recording                                               ║
║  ${p}statusview                                              ║
║  ${p}autoreact                                               ║
║  ${p}anticall                                                ║
║  ${p}anticallmsg                                             ║
║  ${p}autotyping                                              ║
║  ${p}online                                                  ║
║  ${p}mode                                                    ║
║  ${p}prefix                                                  ║
║  ${p}botname                                                 ║
║  ${p}ownername                                               ║
║  ${p}ownernumber                                             ║
║  ${p}description                                             ║
║  ${p}botdp                                                   ║
║  ${p}stickername                                             ║
║  ${p}settings                                                ║
║  ${p}editpath                                                ║
║  ${p}reactemojis                                             ║
║  ${p}owneremojis                                             ║
║                                                              ║
║  🔧 SYSTEM                                                   ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}vv                                                      ║
║  ${p}vv2                                                     ║
║  ${p}vv3                                                     ║
║  ${p}chreact                                                 ║
║  ${p}block                                                   ║
║  ${p}unblock                                                 ║
║  ${p}pair                                                    ║
║  ${p}status                                                  ║
║  ${p}fullpp                                                  ║
║  ${p}forward                                                 ║
║  ${p}count                                                   ║
║  ${p}countx                                                  ║
║                                                              ║
║  🛠️ UTILITY                                                  ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}uptime                                                  ║
║  ${p}praytime                                                ║
║  ${p}timenow                                                 ║
║  ${p}date                                                    ║
║  ${p}calculate                                               ║
║  ${p}person                                                  ║
║  ${p}readmore                                                ║
║  ${p}msg                                                     ║
║  ${p}report                                                  ║
║  ${p}time                                                    ║
║  ${p}img                                                     ║
║  ${p}img2                                                    ║
║  ${p}gpass                                                   ║
║  ${p}iqc                                                     ║
║  ${p}trt                                                     ║
║  ${p}tiktokstalk                                             ║
║  ${p}yts                                                     ║
║  ${p}ytstalk                                                 ║
║  ${p}tiny                                                    ║
║  ${p}wink                                                    ║
║  ${p}laugh                                                   ║
║  ${p}smile                                                   ║
║  ${p}statuslike                                              ║
║  ${p}ban                                                     ║
║  ${p}unban                                                   ║
║  ${p}banlist                                                 ║
║                                                              ║
║  📌 MAIN                                                     ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}menu                                                    ║
║  ${p}help                                                    ║
║  ${p}ping                                                    ║
║  ${p}ping2                                                   ║
║  ${p}alive                                                   ║
║  ${p}owner                                                   ║
║  ${p}repo                                                    ║
║  ${p}sc                                                      ║
║  ${p}githubstalk                                             ║
║  ${p}bomber                                                  ║
║  ${p}fetch                                                   ║
║                                                              ║
║  🛡️ SECURITY                                                 ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}antidelete                                              ║
║  ${p}anticall                                                ║
║                                                              ║
║  ✨ UNIQUE                                                   ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}roast @mention                                          ║
║  ${p}aiimg prompt                                            ║
║  ${p}fakechat Name Message                                   ║
║  ${p}tempmail                                                ║
║  ${p}quote                                                   ║
║                                                              ║
║  💻 HACKER/DEV                                               ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}ipinfo ip                                               ║
║  ${p}scan target                                             ║
║  ${p}encode text                                             ║
║  ${p}hash text                                               ║
║  ${p}sysinfo                                                 ║
║  ${p}sqlprank target                                         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
║                                                              ║
║  © 2026 ARSLAN TECH'S – All Rights Reserved                 ║
║  🔗 https://github.com/arslan-md                            ║
╚══════════════════════════════════════════════════════════════╝
`;
}

module.exports = {
    menu: async (ctx) => {
        await ctx.react('📚');
        await ctx.sock.sendMessage(ctx.from, {
            image: { url: global.BOT_LOGO },
            caption: getMenu(),
        }, { quoted: ctx.msg });
    },

    help: async (ctx) => {
        await ctx.react('📚');
        await ctx.sock.sendMessage(ctx.from, {
            image: { url: global.BOT_LOGO },
            caption: getMenu(),
        }, { quoted: ctx.msg });
    },

    // ─── OTHER SYSTEM COMMANDS ───
    ping: async (ctx) => {
        await ctx.react('⚡');
        const start = Date.now();
        await ctx.sock.sendMessage(ctx.from, { text: 'Ping...' });
        const end = Date.now();
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *PING* ⬡─╮
│
│ ⚡ Response: ${end - start}ms
│ 🟢 Status: Ultra Fast
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    alive: async (ctx) => {
        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, {
            image: { url: global.BOT_LOGO },
            caption: `╭─⬡ *BOT ALIVE* ⬡─╮
│
│ ✅ Status: Online
│ 🤖 Name: ${global.BOT_NAME}
│ ⏱ Uptime: ${getUptime()}
│ 👑 Owner: ${global.OWNER_NAME}
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    uptime: async (ctx) => {
        await ctx.react('⏱️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *UPTIME* ⬡─╮
│
│ ⏱️ Bot has been running for: ${getUptime()}
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    praytime: async (ctx) => {
        await ctx.react('🕌');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *NAMAZ TIME* ⬡─╮
│
│ Fajr: 4:30 AM
│ Dhuhr: 12:30 PM
│ Asr: 5:00 PM
│ Maghrib: 6:45 PM
│ Isha: 8:00 PM
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    timenow: async (ctx) => {
        await ctx.react('🕐');
        const now = new Date().toLocaleTimeString('en-PK');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *CURRENT TIME* ⬡─╮
│
│ 🕐 ${now}
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    date: async (ctx) => {
        await ctx.react('📅');
        const date = new Date().toLocaleDateString('en-PK');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *TODAY'S DATE* ⬡─╮
│
│ 📅 ${date}
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    sysinfo: async (ctx) => {
        await ctx.react('⚡');
        const os = require('os');
        const uptime = Math.floor(process.uptime() / 60);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ *SYSTEM INFO* ⬡─╮
│
│ 🤖 Bot: ${global.BOT_NAME}
│ 💻 Platform: ${os.platform()}
│ ⏱ Uptime: ${uptime} min
│ 💾 Free RAM: ${freeMem} GB
│ 🟢 Status: Online
│
╰───────────────────╯`
        }, { quoted: ctx.msg });
    },

    // ... add more system commands (calculate, person, etc.) as needed
};