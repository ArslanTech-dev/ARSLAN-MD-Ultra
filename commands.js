/**
 * ================================================
 * commands/system.js
 * Main Menu – All Commands (Vertical, Roman Urdu)
 * ================================================
 */

const os = require('os');
const { fancyLog } = require('../utils/logger');

// ─── Helper Functions ──────────────────────────
function getUptime() {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    return days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m`;
}

function getTotalCommands() {
    return '340+';
}

function getTextLogo() {
    return `
    ╔═══════════════════════════════════════╗
    ║    ╔═╗╔═╗╔═╗╔═╗╔═╗╔╗─╔═╗╔═╗╔═╗    ║
    ║    ╚═╗║╬║║╔╝║╬║║╔╗║║║║╦╝║╬║║╔╝    ║
    ║    ╚═╝╚═╝╚╝─╚═╝╚╝╚╝╚╝╚╩╗╚═╝╚╝─    ║
    ║                     ╚═╝             ║
    ╚═══════════════════════════════════════╝
    `;
}

function getMenu() {
    const p = global.PREFIX || '.';
    const logo = getTextLogo();
    return `
${logo}
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║          ✦ ${global.BOT_NAME} ✦          ║
║            Version ${global.VERSION}            ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  👑 Owner       : ${global.OWNER_NAME}                      ║
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
║  📨 AUTO-REPLY                                               ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}autoreply                                               ║
║  ${p}autoreply on                                            ║
║  ${p}autoreply off                                           ║
║  ${p}setreply                                                ║
║  ${p}resetreply                                              ║
║                                                              ║
║  🧠 PSYCHIC & BRAIN                                          ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}brainscan                                               ║
║  ${p}iqtest                                                  ║
║  ${p}mindreader                                              ║
║  ${p}soulmate                                                ║
║  ${p}future                                                  ║
║  ${p}aura                                                    ║
║  ${p}destiny                                                 ║
║  ${p}psychic                                                 ║
║  ${p}personality                                             ║
║  ${p}fortuneteller                                           ║
║                                                              ║
║  💻 HACKER VIBE                                              ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}whois                                                   ║
║  ${p}dns                                                     ║
║  ${p}phone                                                   ║
║  ${p}subdomain                                               ║
║  ${p}hashcrack                                               ║
║  ${p}malware                                                 ║
║  ${p}ddos                                                    ║
║  ${p}sqlmap                                                  ║
║  ${p}keylogger                                               ║
║  ${p}ransom                                                  ║
║  ${p}hack                                                    ║
║                                                              ║
║  💕 FLIRTY & LOVE                                            ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}pickup                                                  ║
║  ${p}flirt                                                   ║
║  ${p}compliment                                              ║
║  ${p}crush                                                   ║
║  ${p}heartbeats                                              ║
║  ${p}loveyou                                                 ║
║  ${p}lovemeter                                               ║
║  ${p}flirtypickup                                            ║
║  ${p}romantic                                                ║
║  ${p}saba                                                    ║
║  ${p}sabalove                                                ║
║  ${p}janu                                                    ║
║  ${p}janulove                                                ║
║  ${p}couple                                                  ║
║  ${p}romance                                                 ║
║                                                              ║
║  💋 SEXY & HOT (sx)                                          ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}sexy                                                    ║
║  ${p}hot                                                     ║
║  ${p}hotcompliment                                           ║
║  ${p}dirtypickup                                             ║
║  ${p}romanticsexy                                            ║
║  ${p}hotmeter                                                ║
║  ${p}sexymessage                                             ║
║  ${p}steamy                                                  ║
║  ${p}kiss                                                    ║
║                                                              ║
║  💕 COUPLE (Arslan × Saba)                                   ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}couple                                                  ║
║  ${p}couplequote                                             ║
║  ${p}couplelove                                              ║
║  ${p}couplevibe                                              ║
║  ${p}lovestatus                                              ║
║  ${p}lovemeter                                               ║
║  ${p}couplegoal                                              ║
║  ${p}heartbeat                                               ║
║                                                              ║
║  👤 OWNER PERSONAL                                           ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}myinfo                                                  ║
║  ${p}mybio                                                   ║
║  ${p}myfact                                                  ║
║  ${p}mytime                                                  ║
║  ${p}mytasks                                                 ║
║  ${p}addtask                                                 ║
║  ${p}deltask                                                 ║
║  ${p}cleartasks                                              ║
║  ${p}mystatus                                                ║
║  ${p}setstatus                                               ║
║  ${p}myip                                                    ║
║                                                              ║
║  🤝 FRIENDSHIP (Asad Tech's)                                 ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}asad                                                    ║
║  ${p}asadattitude                                            ║
║  ${p}asadfact                                                ║
║  ${p}asadvsme                                                ║
║  ${p}brocode                                                 ║
║  ${p}asadquote                                               ║
║  ${p}asadroast                                               ║
║  ${p}friendzone                                              ║
║  ${p}bromance                                                ║
║                                                              ║
║  🔮 FUTURE (Arslan's Life)                                   ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}mylife                                                  ║
║  ${p}myjourney                                               ║
║  ${p}myfuture                                                ║
║  ${p}mywife                                                  ║
║  ${p}myachievements                                          ║
║  ${p}myquote                                                 ║
║  ${p}myvision                                                ║
║  ${p}mylovestory                                             ║
║  ${p}mystruggle                                              ║
║  ${p}mystatusbar                                             ║
║                                                              ║
║  🧑‍💻 ARSLAN TECH'S PERSONAL                                  ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}arslan                                                  ║
║  ${p}arslanfact                                              ║
║  ${p}arslandream                                             ║
║  ${p}arslanlove                                              ║
║  ${p}arslanquote                                             ║
║  ${p}arslanstudy                                             ║
║  ${p}arslangoal                                              ║
║  ${p}arslanvibes                                             ║
║                                                              ║
║  ✨ AESTHETIC                                                ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}aesthetic                                               ║
║  ${p}mood                                                    ║
║  ${p}aestheticcolor                                          ║
║  ${p}aestheticquote                                          ║
║  ${p}aestheticwall                                           ║
║  ${p}aestheticplaylist                                       ║
║  ${p}aestheticmood                                           ║
║                                                              ║
║  🎬 ANIMATION                                                ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}gif                                                     ║
║  ${p}randomgif                                               ║
║  ${p}neon                                                    ║
║  ${p}glitch                                                  ║
║  ${p}matrix                                                  ║
║  ${p}typing                                                  ║
║  ${p}loading                                                 ║
║                                                              ║
║  💻 LINUX ADVANCE                                            ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}matrix                                                  ║
║  ${p}hacker                                                  ║
║  ${p}neon                                                    ║
║  ${p}glitch                                                  ║
║  ${p}terminal                                                ║
║  ${p}neural                                                  ║
║  ${p}scan                                                    ║
║  ${p}firewall                                                ║
║  ${p}datastream                                              ║
║  ${p}pingmatrix                                              ║
║  ${p}hackerart                                               ║
║                                                              ║
║  🪟 WINDOWS ADVANCE                                          ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}winstartup                                              ║
║  ${p}bsod                                                    ║
║  ${p}cmd                                                     ║
║  ${p}winsettings                                             ║
║  ${p}winexplorer                                             ║
║  ${p}winupdate                                               ║
║  ${p}winerror                                                ║
║  ${p}winregistry                                             ║
║  ${p}winlogo                                                 ║
║  ${p}wintaskmanager                                          ║
║                                                              ║
║  💢 FK (Fun)                                                 ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}fk                                                      ║
║  ${p}fkyou                                                   ║
║  ${p}fkubaby                                                 ║
║  ${p}fkmeter                                                 ║
║  ${p}fkoff                                                   ║
║  ${p}fkall                                                   ║
║                                                              ║
║  🧠 MOOD & LOVE                                              ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}moodoff                                                 ║
║  ${p}cheerup                                                 ║
║  ${p}motivate                                                ║
║  ${p}loveboost                                               ║
║  ${p}hug                                                     ║
║  ${p}moodmeter                                               ║
║  ${p}miracle                                                 ║
║                                                              ║
║  🎵 SIDHU MOOSE WALA                                         ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}sidhu                                                   ║
║  ${p}sidhusong                                               ║
║  ${p}sidhufact                                               ║
║  ${p}sidhutop5                                               ║
║  ${p}sidhustatus                                             ║
║  ${p}sidhutribute                                            ║
║  ${p}sidhuquote                                              ║
║  ${p}moosewala                                               ║
║                                                              ║
║  💻 TERMUX STYLE                                             ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}termux                                                  ║
║  ${p}neofetch                                                ║
║  ${p}whoami                                                  ║
║  ${p}ip                                                      ║
║  ${p}cal                                                     ║
║  ${p}cpuinfo                                                 ║
║  ${p}meminfo                                                 ║
║  ${p}df                                                      ║
║  ${p}ps                                                      ║
║  ${p}top                                                     ║
║  ${p}shell                                                   ║
║                                                              ║
║  🖼️ PROFILE (DP)                                            ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}getdp                                                   ║
║  ${p}getgdp                                                  ║
║                                                              ║
║  ⚠️ WARN SYSTEM                                              ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}warn                                                    ║
║  ${p}unwarn                                                  ║
║  ${p}warnings                                                ║
║  ${p}clearwarns                                              ║
║                                                              ║
║  💰 ECONOMY                                                  ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}balance                                                 ║
║  ${p}daily                                                   ║
║  ${p}transfer                                                ║
║  ${p}leaderboard                                             ║
║  ${p}gamble                                                  ║
║                                                              ║
║  📱 VIRTUAL NUMBERS                                          ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}vnumber                                                 ║
║  ${p}vsms                                                    ║
║                                                              ║
║  📶 SIM DATA                                                 ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}simdata                                                 ║
║  ${p}sim                                                     ║
║                                                              ║
║  📞 PHONE INFO                                               ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}myphone                                                 ║
║  ${p}myid                                                    ║
║                                                              ║
║  🎵 SONG & VIDEO DOWNLOAD                                    ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}song                                                    ║
║  ${p}dl                                                      ║
║                                                              ║
║  📸 INSTAGRAM DOWNLOAD                                       ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}insta                                                   ║
║  ${p}ig                                                      ║
║                                                              ║
║  🧩 MORE PLUGINS                                            ║
║  ──────────────────────────────────────────────────────────   ║
║  ${p}sticker                                                 ║
║  ${p}weather                                                 ║
║  ${p}crypto                                                  ║
║  ${p}lyrics                                                  ║
║  ${p}translate                                               ║
║  ${p}joke                                                    ║
║  ${p}fact                                                    ║
║  ${p}anime                                                   ║
║  ${p}movie                                                   ║
║  ${p}quote                                                   ║
║  ${p}reddit                                                  ║
║  ${p}meme                                                    ║
║  ${p}aiimage                                                 ║
║  ${p}wiki                                                    ║
║  ${p}urban                                                   ║
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
║  ${p}roast                                                   ║
║  ${p}aiimg                                                   ║
║  ${p}fakechat                                                ║
║  ${p}tempmail                                                ║
║  ${p}bg                                                      ║
║  ${p}attitude                                                ║
║  ${p}attitudestatus                                          ║
║  ${p}attitudereply                                           ║
║  ${p}swag                                                    ║
║  ${p}myattitude                                              ║
║  ${p}attitudevs                                              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
║                                                              ║
║  📸 *Bot Logo*: ${global.BOT_LOGO}                          ║
║                                                              ║
║  © 2026 ARSLAN TECH'S – All Rights Reserved                 ║
║  🔗 https://github.com/arslan-md                            ║
╚══════════════════════════════════════════════════════════════╝
`;
}

// ─── Exported Commands ──────────────────────────────
module.exports = {

    menu: async (ctx) => {
        await ctx.react('📚');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                image: { url: global.BOT_LOGO },
                caption: getMenu()
            },
            { quoted: ctx.msg }
        );
    },

    help: async (ctx) => {
        await ctx.react('📚');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                image: { url: global.BOT_LOGO },
                caption: getMenu()
            },
            { quoted: ctx.msg }
        );
    },

    // ─── System Commands ──────────────────────────────

    ping: async (ctx) => {
        await ctx.react('⚡');
        const start = Date.now();
        await ctx.sock.sendMessage(ctx.from, { text: 'Ping...' });
        const end = Date.now();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *PING* ⬡─╮\n│\n│ ⚡ Response: ${end - start}ms\n│ 🟢 Status: Ultra Fast\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    alive: async (ctx) => {
        await ctx.react('✅');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                image: { url: global.BOT_LOGO },
                caption: `╭─⬡ *BOT ALIVE* ⬡─╮\n│\n│ ✅ Status: Online\n│ 🤖 Name: ${global.BOT_NAME}\n│ ⏱ Uptime: ${getUptime()}\n│ 👑 Owner: ${global.OWNER_NAME}\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    uptime: async (ctx) => {
        await ctx.react('⏱️');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *UPTIME* ⬡─╮\n│\n│ ⏱️ Bot has been running for: ${getUptime()}\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    praytime: async (ctx) => {
        await ctx.react('🕌');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *NAMAZ TIME* ⬡─╮\n│\n│ Fajr: 4:30 AM\n│ Dhuhr: 12:30 PM\n│ Asr: 5:00 PM\n│ Maghrib: 6:45 PM\n│ Isha: 8:00 PM\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    timenow: async (ctx) => {
        await ctx.react('🕐');
        const now = new Date().toLocaleTimeString('en-PK');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *CURRENT TIME* ⬡─╮\n│\n│ 🕐 ${now}\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    date: async (ctx) => {
        await ctx.react('📅');
        const date = new Date().toLocaleDateString('en-PK');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *TODAY'S DATE* ⬡─╮\n│\n│ 📅 ${date}\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    sysinfo: async (ctx) => {
        await ctx.react('⚡');
        const uptime = Math.floor(process.uptime() / 60);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *SYSTEM INFO* ⬡─╮\n│\n│ 🤖 Bot: ${global.BOT_NAME}\n│ 💻 Platform: ${os.platform()}\n│ ⏱ Uptime: ${uptime} min\n│ 💾 Free RAM: ${freeMem} GB\n│ 🟢 Status: Online\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    // ─── Owner Commands ────────────────────────────────

    owner: async (ctx) => {
        await ctx.react('👑');
        const ownerNum = global.OWNER[0]?.split('@')[0] || 'N/A';
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *OWNER INFO* ⬡─╮\n│\n│ 👑 Name: ${global.OWNER_NAME}\n│ 📱 Number: ${ownerNum}\n│ 🔗 Chat: wa.me/${ownerNum}\n│ 🤖 Bot: ${global.BOT_NAME}\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    repo: async (ctx) => {
        await ctx.react('📦');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *REPOSITORY* ⬡─╮\n│\n│ 📦 GitHub: github.com/arslan-md\n│ 🔄 Version: ${global.VERSION}\n│ ⭐ Stars: Growing\n│\n│ 🔗 https://github.com/arslan-md\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    sc: async (ctx) => {
        await ctx.react('📦');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *SOURCE CODE* ⬡─╮\n│\n│ 📦 Repo: github.com/arslan-md\n│ 🔗 https://github.com/arslan-md/ARSLAN-MD\n│ 📝 License: MIT\n│ 👑 Owner: ARSLAN\n│\n│ *Fork karke apna banao!*\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    },

    githubstalk: async (ctx) => {
        const username = ctx.args[0] || 'arslan-md';
        await ctx.react('🐙');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ *GITHUB STALK* ⬡─╮\n│\n│ 🐙 User: ${username}\n│ 🔗 Profile: https://github.com/${username}\n│ 📊 Repos: Fetching... (API required)\n│\n│ *Use with actual username*\n│\n╰───────────────────╯`
            },
            { quoted: ctx.msg }
        );
    }
};