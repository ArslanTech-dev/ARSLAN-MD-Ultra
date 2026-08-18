// plugins/windows.js
// Advance Windows Animation Commands
// Windows Startup, BSOD, CMD, Error, Explorer, Registry, Update, etc.
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

// ─── Windows Emojis ──────────────────────────────
const winEmojis = ['🪟', '💻', '📁', '⚙️', '🔧', '🖥️', '⌨️', '🖱️', '📊', '📈', '🔄', '⏳'];

module.exports = {

    // ─── .winstartup ────────────────────────────────
    winstartup: async (ctx) => {
        await ctx.react('🪟');
        const from = ctx.from;

        // Step 1: BIOS
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🪟 *WINDOWS STARTUP* 🪟 ⬡─╮\n' +
                      '│\n' +
                      '│  🔄 BIOS Initializing...\n' +
                      '│  [▓░░░░░░░░░] 10%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(700);

        // Step 2: POST
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🪟 *WINDOWS STARTUP* 🪟 ⬡─╮\n' +
                      '│\n' +
                      '│  🔄 POST...\n' +
                      '│  [▓▓▓░░░░░░░] 30%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(700);

        // Step 3: Windows Logo
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🪟 *WINDOWS STARTUP* 🪟 ⬡─╮\n' +
                      '│\n' +
                      '│  🪟 Loading Windows...\n' +
                      '│  [▓▓▓▓▓░░░░░] 50%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(700);

        // Step 4: Loading
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🪟 *WINDOWS STARTUP* 🪟 ⬡─╮\n' +
                      '│\n' +
                      '│  🪟 Starting Services...\n' +
                      '│  [▓▓▓▓▓▓▓░░░] 70%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(700);

        // Step 5: Complete
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🪟 *WINDOWS STARTUP* 🪟 ⬡─╮\n' +
                      '│\n' +
                      '│  ✅ Windows Started Successfully!\n' +
                      '│  🪟 Version: Windows 11 Pro\n' +
                      '│  💻 Build: 22621\n' +
                      '│  ⏱️ Startup Time: ' + (Math.floor(Math.random() * 10) + 3) + 's\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('WINDOWS', 'Windows startup animation sent');
    },

    // ─── .bsod ──────────────────────────────────────
    bsod: async (ctx) => {
        await ctx.react('💀');
        const from = ctx.from;

        const errors = [
            'CRITICAL_PROCESS_DIED',
            'SYSTEM_SERVICE_EXCEPTION',
            'MEMORY_MANAGEMENT',
            'KERNEL_DATA_INPAGE_ERROR',
            'IRQL_NOT_LESS_OR_EQUAL',
            'PAGE_FAULT_IN_NONPAGED_AREA',
            'BAD_SYSTEM_CONFIG_INFO',
            'VIDEO_TDR_FAILURE',
            'DRIVER_IRQL_NOT_LESS_OR_EQUAL',
            'INACCESSIBLE_BOOT_DEVICE'
        ];

        const error = random(errors);
        const codes = ['0x' + Math.floor(Math.random() * 10000000).toString(16).toUpperCase(), '0x' + Math.floor(Math.random() * 10000000).toString(16).toUpperCase()];

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 💀 *BLUE SCREEN OF DEATH* 💀 ⬡─╮\n' +
                      '│\n' +
                      '│  💀 Windows has encountered an error.\n' +
                      '│  ─────────────────────────\n' +
                      '│  ❌ Error: ' + error + '\n' +
                      '│  🔢 Code: ' + codes[0] + '\n' +
                      '│  🔢 Parameter: ' + codes[1] + '\n' +
                      '│  📁 Dump: memory.dmp\n' +
                      '│  ─────────────────────────\n' +
                      '│  🔄 Restarting in 10 seconds...\n' +
                      '│  ⏳ [▓▓▓▓▓▓▓▓▓▓] 100%\n' +
                      '│\n' +
                      '│  💡 It\'s just a simulation!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💀');
        fancyLog('WINDOWS', 'BSOD animation sent');
    },

    // ─── .cmd ───────────────────────────────────────
    cmd: async (ctx) => {
        await ctx.react('⌨️');
        const from = ctx.from;

        const cmdCommands = [
            'C:\\Users\\Arslan> dir',
            'C:\\Users\\Arslan> cd Desktop',
            'C:\\Users\\Arslan\\Desktop> mkdir ARSLAN_MD',
            'C:\\Users\\Arslan\\Desktop> cd ARSLAN_MD',
            'C:\\Users\\Arslan\\Desktop\\ARSLAN_MD> node index.js',
            'C:\\Users\\Arslan\\Desktop\\ARSLAN_MD> npm install',
            'C:\\Users\\Arslan\\Desktop\\ARSLAN_MD> npm start',
            'C:\\Users\\Arslan\\Desktop\\ARSLAN_MD> exit'
        ];

        let cmd = '';
        for (let i = 0; i < 6; i++) {
            const command = random(cmdCommands);
            cmd += '│  $ ' + command + '\n';
            if (Math.random() > 0.5) {
                cmd += '│  ✓ ' + random(['Success', 'Done', 'Complete', 'Running', 'Active']) + '\n';
            }
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ⌨️ *COMMAND PROMPT* ⌨️ ⬡─╮\n' +
                      '│\n' +
                      '│  💻 Microsoft Windows [Version 10.0.22621]\n' +
                      '│  (c) Microsoft Corporation. All rights reserved.\n' +
                      '│\n' +
                      cmd +
                      '│\n' +
                      '│  💡 Windows Command Prompt\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('WINDOWS', 'CMD animation sent');
    },

    // ─── .winsettings ──────────────────────────────
    winsettings: async (ctx) => {
        await ctx.react('⚙️');
        const from = ctx.from;

        const settings = [
            'System: Windows 11 Pro',
            'Processor: Intel Core i9-13900K',
            'RAM: 64GB DDR5',
            'Storage: 2TB NVMe SSD',
            'Graphics: NVIDIA RTX 4090',
            'Display: 4K 144Hz',
            'Network: Wi-Fi 6E',
            'Status: Active'
        ];

        let settingsText = '';
        for (const setting of settings) {
            settingsText += '│  ⚙️ ' + setting + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ⚙️ *WINDOWS SETTINGS* ⚙️ ⬡─╮\n' +
                      '│\n' +
                      '│  🪟 Windows Settings\n' +
                      '│  ─────────────────────\n' +
                      settingsText +
                      '│  ─────────────────────\n' +
                      '│  ✅ System is ready\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('WINDOWS', 'Windows settings sent');
    },

    // ─── .winexplorer ──────────────────────────────
    winexplorer: async (ctx) => {
        await ctx.react('📁');
        const from = ctx.from;

        const files = [
            '📁 ARSLAN_MD',
            '📁 Projects',
            '📁 Documents',
            '📁 Downloads',
            '📁 Music',
            '📁 Pictures',
            '📁 Videos',
            '📄 index.js',
            '📄 config.js',
            '📄 package.json',
            '📄 README.md',
            '📄 .gitignore'
        ];

        let explorer = '';
        for (const file of files) {
            explorer += '│  ' + file + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📁 *FILE EXPLORER* 📁 ⬡─╮\n' +
                      '│\n' +
                      '│  🪟 This PC > Desktop > ARSLAN_MD\n' +
                      '│  ─────────────────────\n' +
                      explorer +
                      '│  ─────────────────────\n' +
                      '│  📊 Items: ' + files.length + '\n' +
                      '│  💾 Size: ' + (Math.floor(Math.random() * 100) + 50) + 'MB\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('WINDOWS', 'File explorer sent');
    },

    // ─── .winupdate ─────────────────────────────────
    winupdate: async (ctx) => {
        await ctx.react('🔄');
        const from = ctx.from;

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔄 *WINDOWS UPDATE* 🔄 ⬡─╮\n' +
                      '│\n' +
                      '│  🔄 Checking for updates...\n' +
                      '│  [▓░░░░░░░░░] 0%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(800);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔄 *WINDOWS UPDATE* 🔄 ⬡─╮\n' +
                      '│\n' +
                      '│  📥 Downloading update KB5027303...\n' +
                      '│  [▓▓▓▓▓░░░░░] 50%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(800);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔄 *WINDOWS UPDATE* 🔄 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚙️ Installing updates...\n' +
                      '│  [▓▓▓▓▓▓▓▓▓▓] 100%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(800);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔄 *WINDOWS UPDATE* 🔄 ⬡─╮\n' +
                      '│\n' +
                      '│  ✅ Update complete!\n' +
                      '│  🔄 Restarting system...\n' +
                      '│  ⏳ Please wait...\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('WINDOWS', 'Windows update animation sent');
    },

    // ─── .winerror ──────────────────────────────────
    winerror: async (ctx) => {
        await ctx.react('❌');
        const from = ctx.from;

        const errors = [
            'Error 0x80070005: Access Denied',
            'Error 0x80070422: Service Not Running',
            'Error 0x80070643: Update Failed',
            'Error 0x80070002: File Not Found',
            'Error 0x80070570: Corrupt File',
            'Error 0x80070020: Sharing Violation'
        ];

        const error = random(errors);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ❌ *WINDOWS ERROR* ❌ ⬡─╮\n' +
                      '│\n' +
                      '│  ❌ An error occurred!\n' +
                      '│  ─────────────────────\n' +
                      '│  ⚠️ ' + error + '\n' +
                      '│  📁 Details: ' + random(['File corrupted', 'Permission denied', 'Network timeout', 'Disk full']) + '\n' +
                      '│  🔄 Try restarting the application.\n' +
                      '│  ─────────────────────\n' +
                      '│  💡 Just a simulation!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('❌');
        fancyLog('WINDOWS', 'Windows error sent');
    },

    // ─── .winregistry ───────────────────────────────
    winregistry: async (ctx) => {
        await ctx.react('🔧');
        const from = ctx.from;

        const registry = [
            'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
            'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
            'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager',
            'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer',
            'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies'
        ];

        let reg = '';
        for (const r of registry) {
            reg += '│  🔧 ' + r + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🔧 *REGISTRY EDITOR* 🔧 ⬡─╮\n' +
                      '│\n' +
                      '│  🪟 Windows Registry Editor\n' +
                      '│  ─────────────────────\n' +
                      reg +
                      '│  ─────────────────────\n' +
                      '│  ⚠️ Edit at your own risk!\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('WINDOWS', 'Registry editor sent');
    },

    // ─── .winlogo ───────────────────────────────────
    winlogo: async (ctx) => {
        await ctx.react('🪟');
        const from = ctx.from;

        const logo = [
            '  ██╗  ██╗██╗███╗   ██╗██████╗  ██████╗ ██╗    ██╗███████╗',
            '  ██║  ██║██║████╗  ██║██╔══██╗██╔═══██╗██║    ██║██╔════╝',
            '  ███████║██║██╔██╗ ██║██████╔╝██║   ██║██║ █╗ ██║███████╗',
            '  ██╔══██║██║██║╚██╗██║██╔══██╗██║   ██║██║███╗██║╚════██║',
            '  ██║  ██║██║██║ ╚████║██████╔╝╚██████╔╝╚███╔███╔╝███████║',
            '  ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚══════╝',
            '                    WINDOWS 11 PRO'
        ];

        let win = '';
        for (const line of logo) {
            win += '│  ' + line + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🪟 *WINDOWS LOGO* 🪟 ⬡─╮\n' +
                      '│\n' +
                      win +
                      '│\n' +
                      '│  💻 Microsoft Windows\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🪟');
        fancyLog('WINDOWS', 'Windows logo sent');
    },

    // ─── .wintaskmanager ────────────────────────────
    wintaskmanager: async (ctx) => {
        await ctx.react('📊');
        const from = ctx.from;

        const processes = [
            { name: 'System', cpu: 10, mem: 20 },
            { name: 'Windows Explorer', cpu: 5, mem: 15 },
            { name: 'Microsoft Edge', cpu: 25, mem: 40 },
            { name: 'WhatsApp', cpu: 8, mem: 12 },
            { name: 'ARSLAN MD', cpu: 30, mem: 50 },
            { name: 'Node.js', cpu: 45, mem: 60 }
        ];

        let task = '│  NAME               CPU%  MEM%\n│  ─────────────────────\n';
        for (const p of processes) {
            task += '│  ' + p.name.padEnd(18) + p.cpu.toString().padStart(5) + '  ' + p.mem.toString().padStart(5) + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📊 *TASK MANAGER* 📊 ⬡─╮\n' +
                      '│\n' +
                      task +
                      '│\n' +
                      '│  💻 ' + processes.length + ' processes running\n' +
                      '│  💾 CPU: ' + Math.floor(Math.random() * 50 + 20) + '%\n' +
                      '│  🧠 RAM: ' + Math.floor(Math.random() * 50 + 30) + '%\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('WINDOWS', 'Task manager sent');
    }
};