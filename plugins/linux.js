// plugins/linux.js
// Linux Advance Animation Commands
// Matrix, Hacker, Neon, Glitch, Terminal Animations
// Roman Urdu – Vertical Format
// Powered by ARSLAN TECH'S

const { fancyLog } = require('../utils/logger');

// ─── Helper: Sleep ──────────────────────────────
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Helper: Random ─────────────────────────────
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Matrix Characters ──────────────────────────
const matrixChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '█', '▓', '▒', '░'];

// ─── Hacker Words ────────────────────────────────
const hackerWords = [
    'INITIALIZING', 'LOADING', 'EXECUTING', 'DECRYPTING', 'SCANNING',
    'BYPASSING', 'ACCESSING', 'DOWNLOADING', 'EXTRACTING', 'COMPILING',
    'DEPLOYING', 'HACKING', 'CRACKING', 'PENETRATING', 'CONNECTING'
];

// ─── Colors (ANSI) ──────────────────────────────
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    purple: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
};

module.exports = {

    // ─── .matrix ────────────────────────────────────
    matrix: async (ctx) => {
        await ctx.react('💻');
        const from = ctx.from;
        const lines = 10;
        const cols = 20;

        let matrix = '';
        for (let i = 0; i < lines; i++) {
            let line = '';
            for (let j = 0; j < cols; j++) {
                const char = random(matrixChars);
                const color = Math.random() > 0.7 ? '🟢' : '🟩';
                line += color + ' ';
            }
            matrix += '│  ' + line + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 💻 *MATRIX RAIN* 💻 ⬡─╮\n' +
                      '│\n' +
                      matrix +
                      '│\n' +
                      '│  🟢 The Matrix Has You...\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LINUX', 'Matrix animation sent');
    },

    // ─── .hacker ────────────────────────────────────
    hacker: async (ctx) => {
        await ctx.react('🔥');
        const from = ctx.from;

        // Step 1: Initializing
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔥 *HACKER MODE* 🔥 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚡ INITIALIZING...\n' +
                      '│  [' + '▓'.repeat(0) + '░'.repeat(10) + '] 0%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);

        // Step 2: Scanning
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔥 *HACKER MODE* 🔥 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚡ SCANNING TARGET...\n' +
                      '│  [' + '▓'.repeat(3) + '░'.repeat(7) + '] 30%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);

        // Step 3: Bypassing
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔥 *HACKER MODE* 🔥 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚡ BYPASSING FIREWALL...\n' +
                      '│  [' + '▓'.repeat(6) + '░'.repeat(4) + '] 60%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);

        // Step 4: Accessing
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔥 *HACKER MODE* 🔥 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚡ ACCESSING DATABASE...\n' +
                      '│  [' + '▓'.repeat(9) + '░'.repeat(1) + '] 90%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);

        // Step 5: Complete
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔥 *HACKER MODE* 🔥 ⬡─╮\n' +
                      '│\n' +
                      '│  ✅ ACCESS GRANTED!\n' +
                      '│  🎯 Target: ' + random(['NSA', 'CIA', 'FBI', 'MI6', 'RAW', 'ISI', 'KGB']) + '\n' +
                      '│  📁 Data: ' + random(['Top Secret', 'Confidential', 'Classified', 'Eyes Only']) + '\n' +
                      '│  🔒 Status: COMPROMISED\n' +
                      '│\n' +
                      '│  ⚠️ This is a simulation!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💀');
        fancyLog('LINUX', 'Hacker simulation sent');
    },

    // ─── .neon ──────────────────────────────────────
    neon: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN TECH\'S';
        await ctx.react('💡');
        const from = ctx.from;

        const neonColors = ['🔴', '🟢', '🔵', '🟡', '🟣', '🟠', '💖', '⚪'];
        const color = random(neonColors);
        const glow = random(['✨', '🌟', '💫', '⭐', '🔥']);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 💡 *NEON TEXT* 💡 ⬡─╮\n' +
                      '│\n' +
                      '│  ' + color + ' *' + text + '* ' + color + '\n' +
                      '│\n' +
                      '│  ' + glow + ' Glowing Effect Active ' + glow + '\n' +
                      '│  🎨 ' + random(['Cyberpunk', 'Synthwave', 'Vaporwave', 'Retro Neon']) + ' Style\n' +
                      '│\n' +
                      '│  💡 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✨');
        fancyLog('LINUX', 'Neon text sent: ' + text);
    },

    // ─── .glitch ─────────────────────────────────────
    glitch: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN MD';
        await ctx.react('📺');
        const from = ctx.from;

        let glitchText = '';
        for (let i = 0; i < text.length; i++) {
            if (Math.random() > 0.7) {
                const char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                glitchText += char;
            } else {
                glitchText += text[i];
            }
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📺 *GLITCH EFFECT* 📺 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚡ [GLITCH] ⚡\n' +
                      '│  ─────────────────────\n' +
                      '│  🔲 *' + glitchText + '*\n' +
                      '│  🔲 *' + text + '*\n' +
                      '│  ─────────────────────\n' +
                      '│  🎛️ Glitch Level: ' + Math.floor(Math.random() * 100) + '%\n' +
                      '│  💥 ' + random(['System Error', 'Corruption Detected', 'Signal Interference']) + '\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('⚡');
        fancyLog('LINUX', 'Glitch text sent: ' + text);
    },

    // ─── .terminal ──────────────────────────────────
    terminal: async (ctx) => {
        await ctx.react('⌨️');
        const from = ctx.from;

        const commands = [
            'root@arslan:~$ ls -la',
            'root@arslan:~$ sudo apt update',
            'root@arslan:~$ sudo apt upgrade -y',
            'root@arslan:~$ neofetch',
            'root@arslan:~$ htop',
            'root@arslan:~$ python3 script.py',
            'root@arslan:~$ node index.js',
            'root@arslan:~$ docker run arslan-md',
            'root@arslan:~$ git clone https://github.com/ArslanTech-dev/ARSLAN-MD',
            'root@arslan:~$ npm install',
            'root@arslan:~$ pm2 start index.js',
            'root@arslan:~$ whoami',
            'root@arslan:~$ uname -a',
            'root@arslan:~$ df -h',
            'root@arslan:~$ exit'
        ];

        let terminal = '';
        for (let i = 0; i < 8; i++) {
            const cmd = random(commands);
            terminal += '│  $ ' + cmd + '\n';
            if (Math.random() > 0.5) {
                terminal += '│  ✓ Output: ' + random(['Success', 'Done', 'Complete', 'Running', 'Active']) + '\n';
            }
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ⌨️ *TERMINAL* ⌨️ ⬡─╮\n' +
                      '│\n' +
                      terminal +
                      '│\n' +
                      '│  💻 Terminal Simulator\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LINUX', 'Terminal simulation sent');
    },

    // ─── .neural ────────────────────────────────────
    neural: async (ctx) => {
        await ctx.react('🧠');
        const from = ctx.from;

        let neural = '';
        for (let i = 0; i < 6; i++) {
            let line = '';
            for (let j = 0; j < 20; j++) {
                const neuron = Math.random() > 0.5 ? '🧠' : '⚡';
                line += neuron + ' ';
            }
            neural += '│  ' + line + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🧠 *NEURAL NETWORK* 🧠 ⬡─╮\n' +
                      '│\n' +
                      neural +
                      '│\n' +
                      '│  ⚡ Neural Activity: ' + Math.floor(Math.random() * 100) + '%\n' +
                      '│  🧠 ' + random(['Learning', 'Training', 'Processing', 'Analyzing']) + '...\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('⚡');
        fancyLog('LINUX', 'Neural network animation sent');
    },

    // ─── .scan ──────────────────────────────────────
    scan: async (ctx) => {
        await ctx.react('🔍');
        const from = ctx.from;
        const target = ctx.args.join(' ') || 'localhost';

        let scan = '';
        for (let i = 0; i < 10; i++) {
            const port = Math.floor(Math.random() * 65535) + 1;
            const status = Math.random() > 0.7 ? '🔓 OPEN' : '🔒 CLOSED';
            scan += '│  Port ' + port + ': ' + status + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔍 *PORT SCAN* 🔍 ⬡─╮\n' +
                      '│\n' +
                      '│  🎯 Target: ' + target + '\n' +
                      '│  ⏳ Scanning...\n' +
                      '│  ─────────────────────\n' +
                      scan +
                      '│  ─────────────────────\n' +
                      '│  🚀 Scan Complete\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LINUX', 'Port scan sent for ' + target);
    },

    // ─── .firewall ──────────────────────────────────
    firewall: async (ctx) => {
        await ctx.react('🛡️');
        const from = ctx.from;

        const logs = [
            '🛡️ Firewall Active',
            '⚠️ Intrusion Detected!',
            '✅ Blocked: 192.168.1.100',
            '⚠️ Brute Force Attack Blocked',
            '✅ All Systems Nominal',
            '⚠️ Suspicious Activity Logged',
            '✅ Firewall Updated',
            '🛡️ Protection Level: ' + Math.floor(Math.random() * 100) + '%'
        ];

        let firewall = '';
        for (let i = 0; i < 6; i++) {
            const log = random(logs);
            firewall += '│  ' + log + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🛡️ *FIREWALL LOG* 🛡️ ⬡─╮\n' +
                      '│\n' +
                      firewall +
                      '│\n' +
                      '│  🛡️ Security Status: ' + random(['Active', 'Protecting', 'Monitoring']) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LINUX', 'Firewall log sent');
    },

    // ─── .datastream ────────────────────────────────
    datastream: async (ctx) => {
        await ctx.react('📊');
        const from = ctx.from;

        let data = '';
        for (let i = 0; i < 8; i++) {
            let line = '';
            for (let j = 0; j < 15; j++) {
                line += Math.floor(Math.random() * 10) + ' ';
            }
            data += '│  ' + line + '  ' + random(['OK', 'PASS', 'SYNC', 'DATA', 'TX', 'RX']) + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📊 *DATA STREAM* 📊 ⬡─╮\n' +
                      '│\n' +
                      data +
                      '│\n' +
                      '│  📈 Data Flow: ' + Math.floor(Math.random() * 1000) + ' Mbps\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LINUX', 'Data stream sent');
    },

    // ─── .pingmatrix ────────────────────────────────
    pingmatrix: async (ctx) => {
        await ctx.react('📡');
        const from = ctx.from;
        const target = ctx.args.join(' ') || 'server.arslan.com';

        let pings = '';
        for (let i = 0; i < 8; i++) {
            const ms = Math.floor(Math.random() * 100) + 10;
            const status = ms < 50 ? '✅' : ms < 80 ? '⚠️' : '❌';
            pings += '│  ' + status + ' Reply from ' + target + ' time=' + ms + 'ms TTL=' + (Math.floor(Math.random() * 200) + 50) + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📡 *PING MATRIX* 📡 ⬡─╮\n' +
                      '│\n' +
                      '│  🎯 Pinging ' + target + '...\n' +
                      '│  ─────────────────────\n' +
                      pings +
                      '│  ─────────────────────\n' +
                      '│  📊 Packet Loss: ' + Math.floor(Math.random() * 5) + '%\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('LINUX', 'Ping matrix sent for ' + target);
    },

    // ─── .hackerart ──────────────────────────────────
    hackerart: async (ctx) => {
        await ctx.react('🎨');
        const from = ctx.from;

        const arts = [
            '   █████╗ ██████╗ ███████╗██╗      █████╗ ███╗   ██╗',
            '  ██╔══██╗██╔══██╗██╔════╝██║     ██╔══██╗████╗  ██║',
            '  ███████║██████╔╝███████╗██║     ███████║██╔██╗ ██║',
            '  ██╔══██║██╔══██╗╚════██║██║     ██╔══██║██║╚██╗██║',
            '  ██║  ██║██║  ██║███████║███████╗██║  ██║██║ ╚████║',
            '  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝',
            '                    ARSLAN TECH\'S'
        ];

        let art = '';
        for (const line of arts) {
            art += '│  ' + line + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🎨 *HACKER ASCII ART* 🎨 ⬡─╮\n' +
                      '│\n' +
                      art +
                      '│\n' +
                      '│  💻 Hacker Vibes\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🎨');
        fancyLog('LINUX', 'Hacker art sent');
    }
};