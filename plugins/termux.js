/**
 * ================================================
 * plugins/termux.js
 * Termux style advanced commands with animations
 * Roman Urdu – Vertical Format
 * ================================================
 */

const os = require('os');
const { fancyLog } = require('../utils/logger');
const { exec } = require('child_process');

// ─── Helpers ──────────────────────────────────
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

function getCPUInfo() {
    const cpus = os.cpus();
    if (cpus.length === 0) return { model: 'Unknown', cores: 0, speed: 'N/A' };
    return {
        model: cpus[0].model,
        cores: cpus.length,
        speed: (cpus[0].speed / 1000).toFixed(2) + ' GHz'
    };
}

function getMemInfo() {
    const total = os.totalmem() / 1024 / 1024 / 1024;
    const free = os.freemem() / 1024 / 1024 / 1024;
    const used = total - free;
    return {
        total: total.toFixed(2),
        used: used.toFixed(2),
        free: free.toFixed(2)
    };
}

function getCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let cal = `📅 ${months[month]} ${year}\n`;
    cal += 'Su Mo Tu We Th Fr Sa\n';
    let day = 1;
    let row = '';
    for (let i = 0; i < firstDay; i++) row += '   ';
    for (let i = firstDay; day <= daysInMonth; i++) {
        if (i % 7 === 0 && i > firstDay) {
            cal += row + '\n';
            row = '';
        }
        row += (day < 10 ? ' ' : '') + day + ' ';
        day++;
    }
    cal += row;
    return cal;
}

// ─── Animation Helper ────────────────────────
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendProgress(ctx, stage, percent) {
    const bar = '▓'.repeat(Math.round(percent / 10)) + '░'.repeat(10 - Math.round(percent / 10));
    await ctx.sock.sendMessage(
        ctx.from,
        { text: `⏳ *${stage}*\n[${bar}] ${percent}%` },
        { quoted: ctx.msg }
    );
    await sleep(600);
}

// ─── ASCII Logo ──────────────────────────────
const neofetchLogo = `
    ╔═══════════════════════════════════════╗
    ║    ╔═╗╔═╗╔═╗╔═╗╔═╗╔╗─╔═╗╔═╗╔═╗    ║
    ║    ╚═╗║╬║║╔╝║╬║║╔╗║║║║╦╝║╬║║╔╝    ║
    ║    ╚═╝╚═╝╚╝─╚═╝╚╝╚╝╚╝╚╩╗╚═╝╚╝─    ║
    ║                     ╚═╝             ║
    ╚═══════════════════════════════════════╝
`;

module.exports = {

    /**
     * .termux – Animated help menu
     */
    termux: async (ctx) => {
        await ctx.react('💻');
        const p = global.PREFIX || '.';
        await ctx.sock.sendMessage(ctx.from, { text: '💻 *TERMUX HELP LOADING...*' }, { quoted: ctx.msg });
        await sleep(800);
        await ctx.sock.sendMessage(ctx.from, { text: `📦 [▓▓▓▓░░░░] 40% Loading commands...` }, { quoted: ctx.msg });
        await sleep(800);
        await ctx.sock.sendMessage(ctx.from, { text: `📦 [▓▓▓▓▓▓░░] 80% Preparing terminal...` }, { quoted: ctx.msg });
        await sleep(800);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 💻 *TERMUX COMMANDS* 💻 ⬡─╮\n` +
                      `│\n` +
                      `│  ${p}neofetch  - System info (Animated)\n` +
                      `│  ${p}whoami    - Current user\n` +
                      `│  ${p}ip        - Local IP\n` +
                      `│  ${p}cal       - Calendar\n` +
                      `│  ${p}cpuinfo   - CPU details (Animated)\n` +
                      `│  ${p}meminfo   - Memory usage (Animated)\n` +
                      `│  ${p}df        - Disk usage (Animated)\n` +
                      `│  ${p}ps        - Process list (Animated)\n` +
                      `│  ${p}top       - Top processes (Animated)\n` +
                      `│  ${p}shell <cmd> - Execute shell (owner)\n` +
                      `│\n` +
                      `│  💡 *Terminal vibe by ARSLAN MD*\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', 'Animated help shown');
    },

    /**
     * .neofetch – Animated system info
     */
    neofetch: async (ctx) => {
        await ctx.react('🐧');
        await sendProgress(ctx, 'Scanning System...', 20);
        await sendProgress(ctx, 'Fetching CPU info...', 50);
        await sendProgress(ctx, 'Gathering Memory...', 80);
        await sendProgress(ctx, 'Compiling Data...', 100);

        const cpu = getCPUInfo();
        const mem = getMemInfo();
        const uptime = os.uptime();
        const hours = Math.floor(uptime / 3600);
        const mins = Math.floor((uptime % 3600) / 60);
        const ip = getLocalIP();
        const hostname = os.hostname();

        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `${neofetchLogo}\n` +
                      `╭─⬡ 🐧 *NEOFETCH* 🐧 ⬡─╮\n` +
                      `│\n` +
                      `│  🖥️ Host     : ${hostname}\n` +
                      `│  👤 User     : ${os.userInfo().username}\n` +
                      `│  🐧 Platform : ${os.platform()} (${os.arch()})\n` +
                      `│  💻 CPU      : ${cpu.model}\n` +
                      `│  🔢 Cores    : ${cpu.cores} @ ${cpu.speed}\n` +
                      `│  🧠 Memory   : ${mem.used}GB / ${mem.total}GB\n` +
                      `│  🌐 IP       : ${ip}\n` +
                      `│  ⏱️ Uptime   : ${hours}h ${mins}m\n` +
                      `│  📅 Date     : ${new Date().toLocaleDateString()}\n` +
                      `│\n` +
                      `│  ⚡ Powered by ARSLAN TECH'S\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', 'Animated neofetch shown');
    },

    /**
     * .whoami – Instant (no animation needed)
     */
    whoami: async (ctx) => {
        await ctx.react('👤');
        const user = os.userInfo().username;
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 👤 *WHOAMI* ⬡─╮\n` +
                      `│\n` +
                      `│  👤 ${user}\n` +
                      `│  🖥️ Host: ${os.hostname()}\n` +
                      `│\n` +
                      `╰─────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', `Whoami: ${user}`);
    },

    /**
     * .ip – Instant
     */
    ip: async (ctx) => {
        await ctx.react('🌐');
        const ip = getLocalIP();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🌐 *LOCAL IP* ⬡─╮\n` +
                      `│\n` +
                      `│  🌐 ${ip}\n` +
                      `│\n` +
                      `╰─────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', `IP: ${ip}`);
    },

    /**
     * .cal – Instant
     */
    cal: async (ctx) => {
        await ctx.react('📅');
        const cal = getCalendar();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 📅 *CALENDAR* ⬡─╮\n` +
                      `│\n` +
                      `│  ${cal.replace(/\n/g, '\n│  ')}\n` +
                      `│\n` +
                      `╰─────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', 'Calendar shown');
    },

    /**
     * .cpuinfo – Animated CPU details
     */
    cpuinfo: async (ctx) => {
        await ctx.react('💻');
        await sendProgress(ctx, 'Probing CPU cores...', 30);
        await sendProgress(ctx, 'Checking frequency...', 70);
        await sendProgress(ctx, 'Loading stats...', 100);

        const cpu = getCPUInfo();
        const load = os.loadavg();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 💻 *CPU INFO* ⬡─╮\n` +
                      `│\n` +
                      `│  🧠 Model : ${cpu.model}\n` +
                      `│  🔢 Cores : ${cpu.cores}\n` +
                      `│  ⚡ Speed : ${cpu.speed}\n` +
                      `│  📊 Load  : ${load[0].toFixed(2)}, ${load[1].toFixed(2)}, ${load[2].toFixed(2)}\n` +
                      `│\n` +
                      `╰─────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', 'Animated CPU info shown');
    },

    /**
     * .meminfo – Animated memory bar
     */
    meminfo: async (ctx) => {
        await ctx.react('🧠');
        await sendProgress(ctx, 'Analyzing RAM...', 25);
        await sendProgress(ctx, 'Calculating usage...', 60);
        await sendProgress(ctx, 'Generating report...', 100);

        const mem = getMemInfo();
        const totalGB = mem.total;
        const usedGB = mem.used;
        const freeGB = mem.free;
        const usedPercent = ((usedGB / totalGB) * 100).toFixed(1);
        const bar = '█'.repeat(Math.round(usedPercent / 10)) + '░'.repeat(10 - Math.round(usedPercent / 10));

        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🧠 *MEMORY INFO* ⬡─╮\n` +
                      `│\n` +
                      `│  📊 Used : ${usedGB}GB / ${totalGB}GB (${usedPercent}%)\n` +
                      `│  [${bar}] ${usedPercent}%\n` +
                      `│  🟢 Free : ${freeGB}GB\n` +
                      `│\n` +
                      `╰─────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', 'Animated memory info shown');
    },

    /**
     * .df – Animated disk usage
     */
    df: async (ctx) => {
        await ctx.react('💾');
        await sendProgress(ctx, 'Scanning partitions...', 20);
        await sendProgress(ctx, 'Calculating usage...', 60);
        await sendProgress(ctx, 'Ready...', 100);

        const total = 256;
        const used = Math.floor(Math.random() * 150) + 50;
        const free = total - used;
        const percent = ((used / total) * 100).toFixed(1);
        const bar = '█'.repeat(Math.round(percent / 10)) + '░'.repeat(10 - Math.round(percent / 10));

        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 💾 *DISK USAGE* ⬡─╮\n` +
                      `│\n` +
                      `│  📊 Used : ${used}GB / ${total}GB (${percent}%)\n` +
                      `│  [${bar}] ${percent}%\n` +
                      `│  🟢 Free : ${free}GB\n` +
                      `│\n` +
                      `│  💡 Simulation\n` +
                      `│\n` +
                      `╰─────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('TERMUX', 'Animated disk usage shown');
    },

    /**
     * .ps – Animated process list
     */
    ps: async (ctx) => {
        await ctx.react('📋');
        await sendProgress(ctx, 'Fetching PID table...', 30);
        await sendProgress(ctx, 'Mapping processes...', 70);
        await sendProgress(ctx, 'Complete...', 100);

        const processes = [
            { pid: 1, name: 'systemd', cpu: 0.1, mem: 0.2 },
            { pid: 2, name: 'kthreadd', cpu: 0.0, mem: 0.0 },
            { pid: 3, name: 'rcu_gp', cpu: 0.2, mem: 0.1 },
            { pid: 4, name: 'rcu_par_gp', cpu: 0.1, mem: 0.1 },
            { pid: 5, name: 'netns', cpu: 0.3, mem: 0.1 },
            { pid: 10, name: 'node', cpu: 5.2, mem: 8.4 },
            { pid: 25, name: 'chrome', cpu: 12.5, mem: 15.2 },
            { pid: 30, name: 'whatsapp', cpu: 8.1, mem: 10.3 }
        ];
        let list = `╭─⬡ 📋 *PROCESS LIST* ⬡─╮\n│\n│  PID  NAME        CPU%  MEM%\n│  ──────────────────────────\n`;
        processes.forEach(p => {
            list += `│  ${p.pid.toString().padStart(4)} ${p.name.padEnd(12)} ${p.cpu.toFixed(1).padStart(5)}  ${p.mem.toFixed(1).padStart(5)}\n`;
        });
        list += `│\n│  💡 Simulated data\n│\n╰─────────────────────────╯`;

        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('TERMUX', 'Animated process list shown');
    },

    /**
     * .top – Animated top output
     */
    top: async (ctx) => {
        await ctx.react('📊');
        await sendProgress(ctx, 'Refreshing processes...', 20);
        await sendProgress(ctx, 'Calculating CPU load...', 50);
        await sendProgress(ctx, 'Sorting by usage...', 80);
        await sendProgress(ctx, 'Ready...', 100);

        const load = os.loadavg();
        const mem = getMemInfo();
        const uptime = os.uptime();
        const hours = Math.floor(uptime / 3600);
        const mins = Math.floor((uptime % 3600) / 60);

        const processes = [
            { pid: 10, name: 'node', cpu: 5.2, mem: 8.4 },
            { pid: 25, name: 'chrome', cpu: 12.5, mem: 15.2 },
            { pid: 30, name: 'whatsapp', cpu: 8.1, mem: 10.3 },
            { pid: 40, name: 'python', cpu: 2.3, mem: 3.1 }
        ];

        let list = `╭─⬡ 📊 *TOP PROCESSES* ⬡─╮\n│\n│  📈 Load: ${load[0].toFixed(2)}, ${load[1].toFixed(2)}, ${load[2].toFixed(2)}\n`;
        list += `│  🧠 Mem: ${mem.used}GB / ${mem.total}GB\n`;
        list += `│  ⏱️ Uptime: ${hours}h ${mins}m\n`;
        list += `│\n│  PID  NAME        CPU%  MEM%\n│  ──────────────────────────\n`;
        processes.forEach(p => {
            list += `│  ${p.pid.toString().padStart(4)} ${p.name.padEnd(12)} ${p.cpu.toFixed(1).padStart(5)}  ${p.mem.toFixed(1).padStart(5)}\n`;
        });
        list += `│\n│  💡 Simulated top output\n│\n╰─────────────────────────╯`;

        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('TERMUX', 'Animated top output shown');
    },

    /**
     * .shell – Animated shell execution (owner only)
     */
    shell: async (ctx) => {
        if (!ctx.isOwner) {
            return ctx.sock.sendMessage(
                ctx.from,
                { text: '❌ Yeh command sirf owner ke liye hai.' },
                { quoted: ctx.msg }
            );
        }
        const cmd = ctx.args.join(' ');
        if (!cmd) {
            return ctx.sock.sendMessage(
                ctx.from,
                { text: '❌ Usage: .shell <command>' },
                { quoted: ctx.msg }
            );
        }
        await ctx.react('⚡');
        await sendProgress(ctx, 'Executing command...', 30);
        await sendProgress(ctx, 'Processing output...', 70);
        await sendProgress(ctx, 'Complete...', 100);

        exec(cmd, (error, stdout, stderr) => {
            const output = error ? stderr : stdout;
            const truncated = output.length > 1500 ? output.slice(0, 1500) + '\n... (truncated)' : output || '✅ Command executed (no output)';
            ctx.sock.sendMessage(
                ctx.from,
                {
                    text: `╭─⬡ ⚡ *SHELL OUTPUT* ⬡─╮\n` +
                          `│\n` +
                          `│  💻 $ ${cmd}\n` +
                          `│  ─────────────────────\n` +
                          `│  ${truncated.replace(/\n/g, '\n│  ')}\n` +
                          `│\n` +
                          `╰─────────────────────────╯`
                },
                { quoted: ctx.msg }
            );
            fancyLog('TERMUX', `Shell: ${cmd}`);
        });
    }
};