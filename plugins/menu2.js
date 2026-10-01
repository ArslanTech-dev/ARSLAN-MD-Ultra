// plugins/menu2.js
// Menu 2 – Advanced Commands (All New Plugins)
// New Fancy Style | Roman Urdu | Powered by ARSLAN TECH'S

const { fancyLog } = require('../utils/logger');
const { formatUptime, getPKTime, getPKDate } = require('../utils/helpers');

// ─── Section Builder ─────────────────────────────
function section(icon, title, commands, prefix = '.') {
    let text = `┏━━━ ${icon} ${title} ━━━┓\n`;
    commands.forEach(cmd => {
        text += `┃ ➤ ${prefix}${cmd}\n`;
    });
    text += `┗━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
    return text;
}

// ─── Full Menu 2 ─────────────────────────────────
function getMenu2() {
    const p = global.PREFIX || '.';
    const botName = global.BOT_NAME || 'ARSLAN MD ULTRA';
    const version = global.VERSION || '4.0.0';
    const ownerName = global.OWNER_NAME || "ARSLAN TECH'S";
    const botLogo = global.BOT_LOGO || 'https://files.catbox.moe/0w1hu5.jpg';
    const uptime = typeof formatUptime === 'function' ? formatUptime(process.uptime()) : 'N/A';

    let menu = '';

    // ─── HEADER ──────────────────────────────────
    menu += `╔═══════════════════════════════════════╗\n`;
    menu += `║  📜 *MENU 2 – ADVANCED CMDS* 📜\n`;
    menu += `║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    menu += `║  🤖 Bot     : ${botName}\n`;
    menu += `║  🧠 Version : ${version}\n`;
    menu += `║  👑 Owner   : ${ownerName}\n`;
    menu += `║  ⏱ Uptime  : ${uptime}\n`;
    menu += `║  🔣 Prefix  : ${p}\n`;
    menu += `║  📅 ${new Date().toLocaleDateString('en-PK')}\n`;
    menu += `╚═══════════════════════════════════════╝\n\n`;

    // ─── AI SECTION ──────────────────────────────
    menu += section('🧠', 'ARSLAN AI (Digital Twin)', [
        'arslanai <sawal>',
        'arslan',
        'bot',
        'whoisarslan',
        'arslanquote',
        'saba',
        'arslanstats',
        'arslanmenu'
    ], p);

    menu += section('🤖', 'OPENAI CHATBOT', [
        'ai <sawal>',
        'ask',
        'chat',
        'autochat on/off',
        'clearchat',
        'aistats',
        'aimenu'
    ], p);

    // ─── LIFE OS ─────────────────────────────────
    menu += section('🌟', 'LIFE OS (Personal)', [
        'lifeos',
        'myintro',
        'mystruggle',
        'mydream',
        'mylove',
        'lovemsg',
        'mood <emoji>',
        'memory <text>',
        'goal <text>',
        'goaldone <num>',
        'gratitude <text>',
        'journal <text>',
        'insight',
        'motiv',
        'lifereset'
    ], p);

    // ─── HEALING ─────────────────────────────────
    menu += section('💚', 'HEALING & COMFORT', [
        'comfort',
        'himmat',
        'affirm',
        'dilki',
        'kyakarun',
        'sukoon',
        'healingmenu'
    ], p);

    // ─── ISLAMIC ─────────────────────────────────
    menu += section('🕌', 'ISLAMIC CONTENT', [
        'quran',
        'dua',
        'hadith',
        'asma',
        'islamicquote',
        'prayertimes',
        'surahinfo',
        'islamicmenu'
    ], p);

    // ─── MACHINE LEARNING ────────────────────────
    menu += section('🧬', 'MACHINE LEARNING', [
        'sentiment <text>',
        'predict <name>',
        'mlinfo',
        'classify <text>'
    ], p);

    // ─── UNSPLASH IMAGES ─────────────────────────
    menu += section('📸', 'UNSPLASH IMAGES', [
        'unsplash <query>',
        'wallpaper <query>',
        'pfp <query>',
        'moodpic <mood>',
        'randompic',
        'nature',
        'city',
        'space',
        'ocean',
        'mountains',
        'sunset',
        'forest',
        'flowers',
        'rain',
        'snow',
        'desert',
        'waterfall',
        'unsplashmenu'
    ], p);

    // ─── ANDROID ─────────────────────────────────
    menu += section('🤖', 'ANDROID ULTRA', [
        'android',
        'adb <cmd>',
        'devoptions',
        'root',
        'battery',
        'memory',
        'storage',
        'appinfo',
        'androidmenu'
    ], p);

    // ─── BACKEND ─────────────────────────────────
    menu += section('⚙️', 'BACKEND INFO', [
        'backend',
        'backend2',
        'ping3',
        'ping4',
        'alive2'
    ], p);

    // ─── BURST ───────────────────────────────────
    menu += section('💥', 'BURST MESSAGE', [
        'burst <count> <msg>',
        'brust',
        'burststop'
    ], p);

    // ─── SIDHU ───────────────────────────────────
    menu += section('🎵', 'SIDHU MOOSE WALA', [
        'sidhu',
        'sidhusong',
        'sidhufact',
        'sidhutop5',
        'sidhustatus',
        'sidhutribute',
        'sidhuquote',
        'moosewala'
    ], p);

    // ─── ADVANCED SYSTEM ─────────────────────────
    menu += section('🚀', 'ADVANCED SYSTEM', [
        'menu',
        'menu2',
        'help',
        'ping',
        'ping2',
        'alive',
        'owner',
        'repo',
        'sc'
    ], p);

    // ─── FOOTER ──────────────────────────────────
    menu += `╔═══════════════════════════════════════╗\n`;
    menu += `║  📸 Logo: ${botLogo.slice(0, 30)}...\n`;
    menu += `║  💚 Powered by ARSLAN TECH'S\n`;
    menu += `║  🔗 github.com/ArslanTech-dev\n`;
    menu += `║  📅 © 2026 All Rights Reserved\n`;
    menu += `╚═══════════════════════════════════════╝\n`;

    return menu;
}

module.exports = {
    // ─── .menu2 ──────────────────────────────────
    menu2: async (ctx) => {
        await ctx.react('📜');
        await ctx.sock.sendMessage(ctx.from, {
            image: { url: global.BOT_LOGO },
            caption: getMenu2()
        }, { quoted: ctx.msg });
        fancyLog('MENU2', 'Advanced menu shown');
    },

    // ─── .advmenu (Alias) ────────────────────────
    advmenu: async (ctx) => {
        await module.exports.menu2(ctx);
    },

    // ─── .commands2 (Alias) ──────────────────────
    commands2: async (ctx) => {
        await module.exports.menu2(ctx);
    }
};