/**
 * ================================================
 * plugins/kali.js
 * Kali Linux style penetration testing simulations
 * Roman Urdu – Animated – Vertical Format
 * ================================================
 */

const { fancyLog } = require('../utils/logger');

// ─── Helper: Sleep ──────────────────────────
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Helper: Progress bar ───────────────────
async function sendProgress(ctx, stage, percent, extra = '') {
    const bar = '▓'.repeat(Math.round(percent / 10)) + '░'.repeat(10 - Math.round(percent / 10));
    await ctx.sock.sendMessage(
        ctx.from,
        { text: `⏳ *${stage}*\n[${bar}] ${percent}% ${extra}` },
        { quoted: ctx.msg }
    );
    await sleep(700);
}

// ─── Kali ASCII Logo ──────────────────────
const kaliLogo = `
    ╔═══════════════════════════════════════╗
    ║    ╔═╗╔═╗╔═╗╔═╗╔═╗╔╗─╔═╗╔═╗╔═╗    ║
    ║    ╚═╗║╬║║╔╝║╬║║╔╗║║║║╦╝║╬║║╔╝    ║
    ║    ╚═╝╚═╝╚╝─╚═╝╚╝╚╝╚╝╚╩╗╚═╝╚╝─    ║
    ║                     ╚═╝             ║
    ╚═══════════════════════════════════════╝
`;

module.exports = {

    /**
     * .kali – Show Kali tool menu with animation
     */
    kali: async (ctx) => {
        await ctx.react('🐉');
        const p = global.PREFIX || '.';
        await ctx.sock.sendMessage(ctx.from, { text: '🐉 *KALI LINUX TOOLS LOADING...*' }, { quoted: ctx.msg });
        await sleep(600);
        await ctx.sock.sendMessage(ctx.from, { text: `📦 [▓▓▓▓░░░░] 40% Initializing tools...` }, { quoted: ctx.msg });
        await sleep(600);
        await ctx.sock.sendMessage(ctx.from, { text: `📦 [▓▓▓▓▓▓░░] 80% Loading framework...` }, { quoted: ctx.msg });
        await sleep(600);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `${kaliLogo}\n` +
                      `╭─⬡ 🐉 *KALI LINUX TOOLS* 🐉 ⬡─╮\n` +
                      `│\n` +
                      `│  🔍 ${p}nmap <target>     - Port scan\n` +
                      `│  💉 ${p}sqlmap <target>   - SQL injection\n` +
                      `│  📡 ${p}aircrack <bssid>  - WiFi crack\n` +
                      `│  🔓 ${p}hydra <target>    - Brute force\n` +
                      `│  💥 ${p}metasploit <ip>   - Exploit\n` +
                      `│  🌐 ${p}netdiscover       - Network scan\n` +
                      `│  🔑 ${p}john <hash>       - Password crack\n` +
                      `│  🕵️ ${p}burp <url>        - Intercept\n` +
                      `│  📶 ${p}wireless          - Wireless attack\n` +
                      `│\n` +
                      `│  💡 *Simulated tools – for fun only!*\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('KALI', 'Kali menu shown');
    },

    /**
     * .nmap – Animated port scan simulation
     */
    nmap: async (ctx) => {
        const target = ctx.args[0] || '192.168.1.1';
        await ctx.react('🔍');
        await sendProgress(ctx, `Scanning ${target}...`, 10);
        await sendProgress(ctx, 'Identifying open ports...', 30);
        await sendProgress(ctx, 'Checking services...', 60);
        await sendProgress(ctx, 'Generating report...', 90);
        await sleep(500);

        const openPorts = [22, 80, 443, 3306, 8080];
        const services = ['SSH', 'HTTP', 'HTTPS', 'MySQL', 'HTTP-Alt'];
        let result = `╭─⬡ 🔍 *NMAP SCAN RESULTS* ⬡─╮\n│\n│  🎯 Target : ${target}\n│  📊 Status : Completed\n│  🔓 Open Ports:\n`;
        openPorts.forEach((port, i) => {
            result += `│     ${port}  ${services[i]}\n`;
        });
        result += `│\n│  💡 Simulation – no real scanning\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('KALI', `Nmap scan on ${target}`);
    },

    /**
     * .sqlmap – Animated SQL injection simulation
     */
    sqlmap: async (ctx) => {
        const target = ctx.args[0] || 'example.com/login';
        await ctx.react('💉');
        await sendProgress(ctx, `Targeting ${target}...`, 20);
        await sendProgress(ctx, 'Bypassing WAF...', 40);
        await sendProgress(ctx, 'Injecting payloads...', 70);
        await sendProgress(ctx, 'Dumping database...', 100);

        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 💉 *SQLMAP SIMULATION* ⬡─╮\n` +
                      `│\n` +
                      `│  🎯 Target : ${target}\n` +
                      `│  🔓 Vulnerable parameters : id, user\n` +
                      `│  📁 Databases found : users, admin\n` +
                      `│  🔑 Credentials : admin:admin123\n` +
                      `│  💡 Simulated – no real injection\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('KALI', `Sqlmap on ${target}`);
    },

    /**
     * .aircrack – WiFi crack simulation
     */
    aircrack: async (ctx) => {
        const bssid = ctx.args[0] || '00:11:22:33:44:55';
        await ctx.react('📡');
        await sendProgress(ctx, `Capturing handshake from ${bssid}...`, 30);
        await sendProgress(ctx, 'Decrypting WPA2...', 60);
        await sendProgress(ctx, 'Cracking with aircrack-ng...', 90);
        await sleep(500);

        const passwords = ['password123', 'admin123', 'qwerty', 'letmein'];
        const found = passwords[Math.floor(Math.random() * passwords.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 📡 *AIRCRACK SIMULATION* ⬡─╮\n` +
                      `│\n` +
                      `│  📡 BSSID  : ${bssid}\n` +
                      `│  🔓 Key    : ${found}\n` +
                      `│  ⏱️ Time   : ${Math.floor(Math.random() * 120) + 30}s\n` +
                      `│  💡 Simulated – for fun only\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('KALI', `Aircrack on ${bssid}`);
    },

    /**
     * .hydra – Brute force simulation
     */
    hydra: async (ctx) => {
        const target = ctx.args[0] || '192.168.1.1';
        await ctx.react('🔓');
        await sendProgress(ctx, `Brute forcing ${target}...`, 20);
        await sendProgress(ctx, 'Testing common passwords...', 50);
        await sendProgress(ctx, 'Found credentials...', 80);
        await sendProgress(ctx, 'Complete...', 100);

        const credentials = ['admin:admin', 'root:toor', 'user:password', 'test:test'];
        const found = credentials[Math.floor(Math.random() * credentials.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🔓 *HYDRA SIMULATION* ⬡─╮\n` +
                      `│\n` +
                      `│  🎯 Target : ${target}\n` +
                      `│  🔑 Found : ${found}\n` +
                      `│  ⏱️ Time  : ${Math.floor(Math.random() * 180) + 60}s\n` +
                      `│  💡 Simulated – no real attack\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('KALI', `Hydra on ${target}`);
    },

    /**
     * .metasploit – Exploit simulation
     */
    metasploit: async (ctx) => {
        const ip = ctx.args[0] || '192.168.1.10';
        await ctx.react('💥');
        await sendProgress(ctx, `Scanning ${ip} for exploits...`, 20);
        await sendProgress(ctx, 'Loading exploit module...', 50);
        await sendProgress(ctx, 'Executing payload...', 80);
        await sendProgress(ctx, 'Session opened...', 100);

        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 💥 *METASPLOIT SIMULATION* ⬡─╮\n` +
                      `│\n` +
                      `│  🎯 Target : ${ip}\n` +
                      `│  💥 Exploit : ms17_010_eternalblue\n` +
                      `│  🔓 Payload : windows/x64/meterpreter\n` +
                      `│  ✅ Session : opened (simulated)\n` +
                      `│  💡 Simulated – no real exploit\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('KALI', `Metasploit on ${ip}`);
    },

    /**
     * .netdiscover – Network scan simulation
     */
    netdiscover: async (ctx) => {
        await ctx.react('🌐');
        await sendProgress(ctx, 'Scanning local network...', 30);
        await sendProgress(ctx, 'Discovering hosts...', 60);
        await sendProgress(ctx, 'Mapping IPs...', 90);
        await sleep(500);

        const hosts = [
            { ip: '192.168.1.1', mac: '00:11:22:33:44:55', vendor: 'Router' },
            { ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:FF', vendor: 'PC' },
            { ip: '192.168.1.20', mac: '11:22:33:44:55:66', vendor: 'Phone' },
            { ip: '192.168.1.30', mac: '99:88:77:66:55:44', vendor: 'Printer' }
        ];
        let result = `╭─⬡ 🌐 *NETDISCOVER RESULTS* ⬡─╮\n│\n│  📶 IP            MAC               Vendor\n│  ──────────────────────────────────────\n`;
        hosts.forEach(h => {
            result += `│  ${h.ip.padEnd(14)} ${h.mac.padEnd(18)} ${h.vendor}\n`;
        });
        result += `│\n│  💡 Simulated data\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('KALI', 'Netdiscover run');
    },

    /**
     * .john – Password crack simulation
     */
    john: async (ctx) => {
        const hash = ctx.args[0] || '5f4dcc3b5aa765d61d8327deb882cf99';
        await ctx.react('🔑');
        await sendProgress(ctx, `Cracking hash ${hash.slice(0, 10)}...`, 30);
        await sendProgress(ctx, 'Using wordlist...', 60);
        await sendProgress(ctx, 'Found password...', 90);
        await sleep(500);

        const passwords = ['password', '123456', 'admin', 'qwerty', 'letmein'];
        const found = passwords[Math.floor(Math.random() * passwords.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🔑 *JOHN THE RIPPER* ⬡─╮\n` +
                      `│\n` +
                      `│  🔐 Hash : ${hash}\n` +
                      `│  🔓 Password : ${found}\n` +
                      `│  ⏱️ Time : ${Math.floor(Math.random() * 60) + 10}s\n` +
                      `│  💡 Simulated – not real cracking\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('KALI', `John on ${hash.slice(0, 10)}`);
    },

    /**
     * .burp – Intercept simulation
     */
    burp: async (ctx) => {
        const url = ctx.args[0] || 'http://example.com';
        await ctx.react('🕵️');
        await sendProgress(ctx, `Intercepting ${url}...`, 20);
        await sendProgress(ctx, 'Capturing requests...', 50);
        await sendProgress(ctx, 'Analyzing headers...', 80);
        await sleep(500);

        const headers = [
            'GET / HTTP/1.1',
            'Host: example.com',
            'User-Agent: Mozilla/5.0',
            'Accept: text/html',
            'Cookie: session=abc123'
        ];
        let result = `╭─⬡ 🕵️ *BURP SUITE SIMULATION* ⬡─╮\n│\n│  🎯 Target : ${url}\n│  📦 Intercepted Headers:\n`;
        headers.forEach(h => {
            result += `│    ${h}\n`;
        });
        result += `│\n│  💡 Simulated – no actual interception\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('KALI', `Burp on ${url}`);
    },

    /**
     * .wireless – Wireless attack simulation
     */
    wireless: async (ctx) => {
        await ctx.react('📶');
        await sendProgress(ctx, 'Scanning wireless networks...', 20);
        await sendProgress(ctx, 'Identifying WPA2 networks...', 50);
        await sendProgress(ctx, 'Launching deauth attack...', 80);
        await sleep(500);

        const networks = [
            { ssid: 'WiFi-2G', bssid: '00:11:22:33:44:55', channel: 6, encryption: 'WPA2' },
            { ssid: 'WiFi-5G', bssid: 'AA:BB:CC:DD:EE:FF', channel: 36, encryption: 'WPA2' },
            { ssid: 'GuestNet', bssid: '11:22:33:44:55:66', channel: 1, encryption: 'WPA' }
        ];
        let result = `╭─⬡ 📶 *WIRELESS ATTACK SIM* ⬡─╮\n│\n│  📡 Available Networks:\n`;
        networks.forEach(n => {
            result += `│    ${n.ssid.padEnd(12)} ${n.bssid} CH${n.channel} ${n.encryption}\n`;
        });
        result += `│\n│  💥 Deauth attack sent to all targets (simulated)\n│  💡 For fun only – no real attack\n│\n╰─────────────────────────╯`;
        await ctx.sock.sendMessage(ctx.from, { text: result }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('KALI', 'Wireless attack simulated');
    }
};