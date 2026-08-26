// plugins/errors.js
// Software Errors, Bugs, Crashes, and Debugging Commands
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

// ─── Random Error Messages ──────────────────────
const errorMessages = [
    "❌ SyntaxError: Unexpected token '}' in line 42",
    "❌ TypeError: Cannot read property 'name' of undefined",
    "❌ ReferenceError: 'x' is not defined",
    "❌ RangeError: Array index out of bounds",
    "❌ TypeError: null is not an object",
    "❌ Error: ENOENT: no such file or directory",
    "❌ Error: ECONNREFUSED: Connection refused",
    "❌ Error: ETIMEDOUT: Request timed out",
    "❌ Error: 404 – Not Found",
    "❌ Error: 500 – Internal Server Error",
    "❌ Error: 503 – Service Unavailable",
    "❌ Error: 403 – Forbidden",
    "❌ Error: 401 – Unauthorized",
    "❌ Segmentation fault (core dumped)",
    "❌ Bus error: 10",
    "❌ Illegal instruction",
    "❌ Stack overflow",
    "❌ Out of memory: Heap limit exceeded",
    "❌ Uncaught exception: Cannot divide by zero",
    "❌ SyntaxError: Unexpected end of input"
];

// ─── Fake Stack Traces ──────────────────────────
const stackTraces = [
    "📚 at Object.<anonymous> (/app/index.js:42:15)\n📚 at Module._compile (node:internal/modules/cjs/loader:1105:14)\n📚 at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)",
    "📚 at processTicksAndRejections (node:internal/process/task_queues:96:5)\n📚 at async startBot (/app/index.js:156:3)\n📚 at async main (/app/app.js:12:5)",
    "📚 at Array.forEach (<anonymous>)\n📚 at EventEmitter.emit (node:events:517:28)\n📚 at Connection.onMessage (/app/node_modules/baileys/lib/Socket/index.js:245:18)"
];

// ─── Crash Messages ─────────────────────────────
const crashMessages = [
    "💥 System crashed: Kernel panic – not syncing",
    "💥 Blue Screen of Death (BSOD): CRITICAL_PROCESS_DIED",
    "💥 Fatal error: Unable to recover from previous errors",
    "💥 Crash dump: memory.dmp (size: 256 MB)",
    "💥 Application terminated unexpectedly",
    "💥 Node.js process exited with code 1",
    "💥 Unhandled promise rejection: Rejected with reason 'Something went wrong'",
    "💥 Detected memory leak – garbage collector overwhelmed",
    "💥 Out of memory: killed process (OOM Killer)",
    "💥 Segmentation fault – invalid memory access"
];

// ─── Debug Messages ─────────────────────────────
const debugMessages = [
    "🐞 Debugging: Setting breakpoint at line 42",
    "🐞 Stepping over function call...",
    "🐞 Watch expression: 'x' is undefined",
    "🐞 Call stack: (depth = 5)",
    "🐞 Heap snapshot captured – analyzing...",
    "🐞 CPU profiling started...",
    "🐞 Memory usage: 256 MB / 512 MB (50%)",
    "🐞 Performance issue detected: slow query",
    "🐞 Log: Request received from 127.0.0.1",
    "🐞 Log: Response sent with status 200",
    "🐞 Log: Error occurred – retrying... (attempt 3)"
];

// ─── Error Emojis ──────────────────────────────
const errorEmojis = ['❌', '⚠️', '💥', '🐞', '🔧', '🛠️', '💻', '📟', '🖥️'];

// ─── Main Commands ──────────────────────────────
module.exports = {

    // ─── .error ─────────────────────────────────────
    error: async (ctx) => {
        await ctx.react('❌');
        const errMsg = random(errorMessages);
        const stack = random(stackTraces);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ ❌ *RANDOM ERROR* ❌ ⬡─╮\n' +
                      '│\n' +
                      '│  🚫 ' + errMsg + '\n' +
                      '│\n' +
                      '│  📚 Stack trace:\n' +
                      '│  ' + stack.replace(/\n/g, '\n│  ') + '\n' +
                      '│\n' +
                      '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('ERROR', 'Random error sent');
    },

    // ─── .crash ─────────────────────────────────────
    crash: async (ctx) => {
        await ctx.react('💥');
        const crashMsg = random(crashMessages);
        // Simulate a crash with progress
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 💥 *CRASH SIMULATION* 💥 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚠️ Critical error detected...\n' +
                      '│  [▓░░░░░░░░░] 10% \n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 💥 *CRASH SIMULATION* 💥 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚠️ Dumping memory...\n' +
                      '│  [▓▓▓▓▓░░░░░] 50% \n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(600);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 💥 *CRASH SIMULATION* 💥 ⬡─╮\n' +
                      '│\n' +
                      '│  💥 ' + crashMsg + '\n' +
                      '│  🔄 System restarting...\n' +
                      '│  [▓▓▓▓▓▓▓▓▓▓] 100% \n' +
                      '│\n' +
                      '│  ⚠️ Just a simulation!\n' +
                      '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('ERROR', 'Crash simulation sent');
    },

    // ─── .debug ─────────────────────────────────────
    debug: async (ctx) => {
        await ctx.react('🐞');
        const debugMsg = random(debugMessages);
        const errMsg = random(errorMessages);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 🐞 *DEBUG SESSION* 🐞 ⬡─╮\n' +
                      '│\n' +
                      '│  🔍 ' + debugMsg + '\n' +
                      '│  🐛 Found bug: ' + errMsg + '\n' +
                      '│  🔧 Suggested fix: Check line ' + (Math.floor(Math.random() * 100) + 1) + '\n' +
                      '│  ⏳ Analyzing...\n' +
                      '│\n' +
                      '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('ERROR', 'Debug session sent');
    },

    // ─── .bugreport ─────────────────────────────────
    bugreport: async (ctx) => {
        await ctx.react('📝');
        const errMsg = random(errorMessages);
        const stack = random(stackTraces);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 📝 *BUG REPORT* 📝 ⬡─╮\n' +
                      '│\n' +
                      '│  🐛 Issue: ' + errMsg + '\n' +
                      '│  📍 Location: ' + (['index.js', 'app.js', 'server.js', 'bot.js'][Math.floor(Math.random() * 4)]) + '\n' +
                      '│  📅 Date: ' + new Date().toLocaleString() + '\n' +
                      '│  🖥️ Environment: Node.js v' + process.version + '\n' +
                      '│  📚 Stack trace:\n' +
                      '│  ' + stack.replace(/\n/g, '\n│  ') + '\n' +
                      '│\n' +
                      '│  🔧 Priority: ' + (['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]) + '\n' +
                      '│  🚀 Status: ' + (['Open', 'In Progress', 'Closed'][Math.floor(Math.random() * 3)]) + '\n' +
                      '│\n' +
                      '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('ERROR', 'Bug report sent');
    },

    // ─── .fatal ─────────────────────────────────────
    fatal: async (ctx) => {
        await ctx.react('💀');
        const errMsg = random(errorMessages);
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 💀 *FATAL ERROR* 💀 ⬡─╮\n' +
                      '│\n' +
                      '│  ⚠️ Fatal exception caught!\n' +
                      '│  🚫 ' + errMsg + '\n' +
                      '│  💀 Process will now exit.\n' +
                      '│  🔄 Return code: ' + Math.floor(Math.random() * 255) + '\n' +
                      '│\n' +
                      '│  💡 This is a simulation – no actual crash!\n' +
                      '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('ERROR', 'Fatal error sent');
    },

    // ─── .exception ─────────────────────────────────
    exception: async (ctx) => {
        const target = ctx.args.join(' ') || 'something';
        await ctx.react('⚠️');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ ⚠️ *UNCAUGHT EXCEPTION* ⚠️ ⬡─╮\n' +
                      '│\n' +
                      '│  🐛 In ' + target + ':\n' +
                      '│  ❌ ' + random(errorMessages) + '\n' +
                      '│  📚 ' + random(stackTraces).split('\n')[0] + '\n' +
                      '│  🔄 Thrown at line ' + (Math.floor(Math.random() * 100) + 1) + '\n' +
                      '│\n' +
                      '│  💡 Handle your exceptions!\n' +
                      '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('ERROR', 'Exception sent');
    },

    // ─── .memorydump ────────────────────────────────
    memorydump: async (ctx) => {
        await ctx.react('🧠');
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: '╭─⬡ 🧠 *MEMORY DUMP* 🧠 ⬡─╮\n' +
                      '│\n' +
                      '│  📊 Used: ' + (Math.floor(Math.random() * 512) + 128) + ' MB / 1024 MB\n' +
                      '│  📈 Heap size: ' + (Math.floor(Math.random() * 256) + 64) + ' MB\n' +
                      '│  🔄 GC activity: ' + (Math.random() > 0.5 ? 'Normal' : 'High') + '\n' +
                      '│  🧩 Leak potential: ' + (Math.random() > 0.7 ? '⚠️ Detected' : '✅ None') + '\n' +
                      '│\n' +
                      '│  🐞 Stack trace:\n' +
                      '│  ' + random(stackTraces).replace(/\n/g, '\n│  ') + '\n' +
                      '│\n' +
                      '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('ERROR', 'Memory dump sent');
    },

    // ─── .buglist ────────────────────────────────────
    buglist: async (ctx) => {
        await ctx.react('📋');
        const bugs = [
            "🐛 1. TypeError in module 'fs' – fix: add null check",
            "🐛 2. Memory leak in event loop – fix: remove listeners",
            "🐛 3. Syntax error in config file – fix: add missing comma",
            "🐛 4. Security vulnerability – fix: update dependency",
            "🐛 5. Performance issue – fix: optimize query",
            "🐛 6. UI glitch – fix: adjust CSS",
            "🐛 7. Database connection timeout – fix: increase pool size",
            "🐛 8. API rate limit hit – fix: implement caching"
        ];
        let list = '╭─⬡ 📋 *KNOWN BUGS* 📋 ⬡─╮\n│\n';
        for (const bug of bugs) {
            list += '│  ' + bug + '\n';
        }
        list += '│\n│  🔧 Assignee: ' + (['Arslan', 'Saba', 'Asad'][Math.floor(Math.random() * 3)]) + '\n' +
                '│  🚀 Priority: ' + (['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]) + '\n' +
                '│\n' +
                '│  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '  ' + random(errorEmojis) + '\n' +
                '│  💖 Powered by ARSLAN TECH\'S\n' +
                '│\n' +
                '╰─────────────────────────╯';
        await ctx.sock.sendMessage(ctx.from, { text: list }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('ERROR', 'Bug list sent');
    }
};