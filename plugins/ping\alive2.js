// plugins/ping2.js
// Ultra Advanced Ping3, Ping4 & Alive2
// Roman Urdu – Vertical Format
// Powered by ARSLAN TECH'S

const os = require('os');
const { fancyLog } = require('../utils/logger');

// ─── Helper: Progress Bar ──────────────────────
function progressBar(percent, length = 20) {
    const filled = Math.round((percent / 100) * length);
    const empty = length - filled;
    return '▓'.repeat(filled) + '░'.repeat(empty);
}

// ─── Helper: Get Uptime ─────────────────────────
function getUptime() {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = Math.floor(uptime % 60);
    if (days > 0) return `${days}d ${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
    return `${mins}m ${secs}s`;
}

// ─── Helper: Bytes to MB/GB ────────────────────
function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

// ─── Helper: Sleep ──────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Helper: Random ─────────────────────────────
function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── Emojis ──────────────────────────────────────
const pingEmojis = ['⚡', '🚀', '💨', '🔥', '⚔️', '💥', '🌀', '✨'];
const aliveEmojis = ['✅', '💚', '🌟', '👑', '💫', '🎯', '🏆', '⚡'];

module.exports = {

    // ─── .ping3 (Ultra Advanced) ───────────────────
    ping3: async (ctx) => {
        await ctx.react('🚀');
        const from = ctx.from;

        // Step 1: Start
        const startMsg = await ctx.sock.sendMessage(from, {
            text: `╭─⬡ 🚀 *PING3 ULTRA* 🚀 ⬡─╮\n` +
                  `│\n` +
                  `│  🔍 Initializing ping test...\n` +
                  `│  [${progressBar(0)}] 0%\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        // Step 2: Progress animations
        for (let i = 20; i <= 80; i += 20) {
            await sleep(400);
            await ctx.sock.sendMessage(from, {
                text: `╭─⬡ 🚀 *PING3 ULTRA* 🚀 ⬡─╮\n` +
                      `│\n` +
                      `│  📡 Sending packets...\n` +
                      `│  [${progressBar(i)}] ${i}%\n` +
                      `│\n` +
                      `╰─────────────────────────╯`,
                edit: startMsg.key
            });
        }

        await sleep(500);

        // Step 3: Actual ping test
        const startTime = Date.now();
        await ctx.sock.sendMessage(from, { text: 'Testing...' });
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Step 4: Calculate stats
        const memoryUsed = process.memoryUsage();
        const heapUsed = formatBytes(memoryUsed.heapUsed);
        const heapTotal = formatBytes(memoryUsed.heapTotal);
        const rss = formatBytes(memoryUsed.rss);
        const cpuUsage = process.cpuUsage();
        const cpuPercent = ((cpuUsage.user + cpuUsage.system) / 1000000 / process.uptime() * 100).toFixed(2);
        const platform = `${os.platform()}-${os.arch()}`;
        const nodeVer = process.version;

        // Ping quality
        let quality = '🟢 Excellent';
        if (responseTime > 500) quality = '🔴 Poor';
        else if (responseTime > 200) quality = '🟡 Good';
        else if (responseTime > 100) quality = '🟢 Fast';

        // Step 5: Final result
        await ctx.sock.sendMessage(from, {
            text: `╭─⬡ 🚀 *PING3 ULTRA RESULT* 🚀 ⬡─╮\n` +
                  `│\n` +
                  `│  ⚡ *Response Time* : ${responseTime}ms\n` +
                  `│  📊 *Quality*       : ${quality}\n` +
                  `│  🌐 *Network*       : WhatsApp WebSocket\n` +
                  `│  📡 *Protocol*      : Multi-Device\n` +
                  `│\n` +
                  `│  ──────── *SYSTEM* ────────\n` +
                  `│  🖥️ *Platform*      : ${platform}\n` +
                  `│  ⚙️ *Node.js*       : ${nodeVer}\n` +
                  `│  🧠 *Heap Used*     : ${heapUsed}\n` +
                  `│  💾 *Heap Total*    : ${heapTotal}\n` +
                  `│  📦 *RSS Memory*    : ${rss}\n` +
                  `│  🔥 *CPU Usage*     : ${cpuPercent}%\n` +
                  `│  ⏱️ *Uptime*        : ${getUptime()}\n` +
                  `│  🆔 *PID*           : ${process.pid}\n` +
                  `│\n` +
                  `│  ${random(pingEmojis)}  ${random(pingEmojis)}  ${random(pingEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        await ctx.react('✅');
        fancyLog('PING3', `Response: ${responseTime}ms`);
    },

    // ─── .ping4 (Ultra Advanced Pro) ───────────────
    ping4: async (ctx) => {
        await ctx.react('⚡');
        const from = ctx.from;

        // Step 1: Multi-stage animation
        const stages = [
            { pct: 15, text: '🔍 Detecting server location...' },
            { pct: 35, text: '📡 Establishing connection...' },
            { pct: 55, text: '⚡ Sending test packets...' },
            { pct: 75, text: '📊 Analyzing response...' },
            { pct: 90, text: '🔬 Calculating statistics...' }
        ];

        const startMsg = await ctx.sock.sendMessage(from, {
            text: `╭─⬡ ⚡ *PING4 ULTRA PRO* ⚡ ⬡─╮\n` +
                  `│\n` +
                  `│  🚀 Advanced ping test\n` +
                  `│  [${progressBar(0)}] 0%\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        for (const stage of stages) {
            await sleep(500);
            await ctx.sock.sendMessage(from, {
                text: `╭─⬡ ⚡ *PING4 ULTRA PRO* ⚡ ⬡─╮\n` +
                      `│\n` +
                      `│  ${stage.text}\n` +
                      `│  [${progressBar(stage.pct)}] ${stage.pct}%\n` +
                      `│\n` +
                      `╰─────────────────────────╯`,
                edit: startMsg.key
            });
        }

        // Actual ping tests (3 rounds)
        const round1 = Date.now();
        await ctx.sock.sendMessage(from, { text: '🏓 Round 1...' });
        const r1 = Date.now() - round1;

        await sleep(200);
        const round2 = Date.now();
        await ctx.sock.sendMessage(from, { text: '🏓 Round 2...' });
        const r2 = Date.now() - round2;

        await sleep(200);
        const round3 = Date.now();
        await ctx.sock.sendMessage(from, { text: '🏓 Round 3...' });
        const r3 = Date.now() - round3;

        // Statistics
        const avg = Math.round((r1 + r2 + r3) / 3);
        const min = Math.min(r1, r2, r3);
        const max = Math.max(r1, r2, r3);
        const jitter = Math.round(max - min);

        // System info
        const totalMem = formatBytes(os.totalmem());
        const freeMem = formatBytes(os.freemem());
        const usedMem = formatBytes(os.totalmem() - os.freemem());
        const memPercent = (((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(1);
        const cpus = os.cpus();
        const cpuModel = cpus[0]?.model || 'Unknown';
        const cpuCores = cpus.length;
        const loadAvg = os.loadavg();
        const hostname = os.hostname();
        const uptime = process.uptime();

        // Network quality rating
        let rating = '⭐⭐⭐⭐⭐ Excellent';
        if (avg > 500) rating = '⭐⭐ Poor';
        else if (avg > 300) rating = '⭐⭐⭐ Average';
        else if (avg > 150) rating = '⭐⭐⭐⭐ Good';

        // Send final report
        await ctx.sock.sendMessage(from, {
            text: `╭─⬡ ⚡ *PING4 ULTRA PRO REPORT* ⚡ ⬡─╮\n` +
                  `│\n` +
                  `│  📊 *── PING STATS ──*\n` +
                  `│  🏓 Round 1     : ${r1}ms\n` +
                  `│  🏓 Round 2     : ${r2}ms\n` +
                  `│  🏓 Round 3     : ${r3}ms\n` +
                  `│  📈 Average     : ${avg}ms\n` +
                  `│  ⬇️ Minimum     : ${min}ms\n` +
                  `│  ⬆️ Maximum     : ${max}ms\n` +
                  `│  📉 Jitter      : ${jitter}ms\n` +
                  `│  ⭐ Rating      : ${rating}\n` +
                  `│\n` +
                  `│  🖥️ *── SYSTEM INFO ──*\n` +
                  `│  💻 Hostname    : ${hostname}\n` +
                  `│  ⚙️ Platform    : ${os.platform()}\n` +
                  `│  🏗️ Architecture: ${os.arch()}\n` +
                  `│  🔢 CPU Cores   : ${cpuCores}\n` +
                  `│  🧠 CPU Model   : ${cpuModel.slice(0, 30)}...\n` +
                  `│  📊 Load Avg    : ${loadAvg[0].toFixed(2)}, ${loadAvg[1].toFixed(2)}, ${loadAvg[2].toFixed(2)}\n` +
                  `│  💾 Total RAM   : ${totalMem}\n` +
                  `│  💚 Free RAM    : ${freeMem}\n` +
                  `│  🔴 Used RAM    : ${usedMem} (${memPercent}%)\n` +
                  `│  ⏱️ Bot Uptime  : ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m\n` +
                  `│  🆔 Process ID  : ${process.pid}\n` +
                  `│  📦 Node.js     : ${process.version}\n` +
                  `│\n` +
                  `│  ${random(pingEmojis)}  ${random(pingEmojis)}  ${random(pingEmojis)}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        await ctx.react('✅');
        fancyLog('PING4', `Avg: ${avg}ms (${r1}, ${r2}, ${r3})`);
    },

    // ─── .alive2 (Ultra Advanced Alive) ────────────
    alive2: async (ctx) => {
        await ctx.react('💚');
        const from = ctx.from;

        // Animated loading
        const loadMsg = await ctx.sock.sendMessage(from, {
            text: `╭─⬡ 💚 *ALIVE2 ULTRA* 💚 ⬡─╮\n` +
                  `│\n` +
                  `│  🔍 Checking bot status...\n` +
                  `│  [${progressBar(0)}] 0%\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        for (let i = 25; i <= 100; i += 25) {
            await sleep(350);
            await ctx.sock.sendMessage(from, {
                text: `╭─⬡ 💚 *ALIVE2 ULTRA* 💚 ⬡─╮\n` +
                      `│\n` +
                      `│  ${i < 100 ? '⚡ Verifying systems...' : '✅ All systems operational!'}\n` +
                      `│  [${progressBar(i)}] ${i}%\n` +
                      `│\n` +
                      `╰─────────────────────────╯`,
                edit: loadMsg.key
            });
        }

        // Gather stats
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const mins = Math.floor((uptime % 3600) / 60);
        const secs = Math.floor(uptime % 60);

        const mem = process.memoryUsage();
        const memUsed = formatBytes(mem.heapUsed);
        const memTotal = formatBytes(mem.heapTotal);

        const totalRAM = formatBytes(os.totalmem());
        const freeRAM = formatBytes(os.freemem());
        const usedRAM = formatBytes(os.totalmem() - os.freemem());

        const cpus = os.cpus();
        const cpuCores = cpus.length;
        const loadAvg = os.loadavg();

        const botName = global.BOT_NAME || 'ARSLAN MD ULTRA';
        const version = global.VERSION || '4.0.0';
        const ownerName = global.OWNER_NAME || 'ARSLAN TECH\'S';
        const prefix = global.PREFIX || '.';

        // Get plugin count
        const fs = require('fs');
        const path = require('path');
        let pluginCount = 0;
        try {
            const pluginsDir = path.join(__dirname, '..', 'plugins');
            pluginCount = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js')).length;
        } catch (e) {}

        // Send detailed report
        await ctx.sock.sendMessage(from, {
            image: { url: global.BOT_LOGO },
            caption: `╭─⬡ 💚 *ALIVE2 ULTRA REPORT* 💚 ⬡─╮\n` +
                     `│\n` +
                     `│  ✅ *Status*        : 🟢 Online & Active\n` +
                     `│  🤖 *Bot Name*      : ${botName}\n` +
                     `│  🧠 *Version*       : ${version}\n` +
                     `│  👑 *Owner*         : ${ownerName}\n` +
                     `│  🔣 *Prefix*        : ${prefix}\n` +
                     `│  🧩 *Plugins Loaded*: ${pluginCount}\n` +
                     `│\n` +
                     `│  ⏱️ *── UPTIME ──*\n` +
                     `│  📅 Days   : ${days}\n` +
                     `│  🕐 Hours  : ${hours}\n` +
                     `│  ⏰ Minutes: ${mins}\n` +
                     `│  ⏱️ Seconds: ${secs}\n` +
                     `│\n` +
                     `│  💻 *── SYSTEM ──*\n` +
                     `│  🖥️ Platform: ${os.platform()}\n` +
                     `│  🏗️ Arch    : ${os.arch()}\n` +
                     `│  🔢 CPU     : ${cpuCores} cores\n` +
                     `│  📊 Load    : ${loadAvg[0].toFixed(2)}\n` +
                     `│  🆔 PID     : ${process.pid}\n` +
                     `│  📦 Node.js : ${process.version}\n` +
                     `│\n` +
                     `│  🧠 *── MEMORY ──*\n` +
                     `│  📦 Heap Used : ${memUsed}\n` +
                     `│  📊 Heap Total: ${memTotal}\n` +
                     `│  💾 System RAM: ${usedRAM} / ${totalRAM}\n` +
                     `│  🟢 Free RAM  : ${freeRAM}\n` +
                     `│\n` +
                     `│  ${random(aliveEmojis)}  ${random(aliveEmojis)}  ${random(aliveEmojis)}  ${random(aliveEmojis)}\n` +
                     `│\n` +
                     `│  🔥 *Bot is running perfectly!*\n` +
                     `│  💖 Powered by ARSLAN TECH'S\n` +
                     `│\n` +
                     `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        await ctx.react('✅');
        fancyLog('ALIVE2', `Bot alive - Uptime: ${days}d ${hours}h ${mins}m`);
    }
};