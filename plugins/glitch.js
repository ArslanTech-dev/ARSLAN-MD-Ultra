// plugins/glitch.js
// Ultra Advance Glitch Commands – Mind-Blowing Effects
// WhatsApp ko hila dain gay!
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

// ─── Helper: Random Character ───────────────────
function randomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~';
    return chars[Math.floor(Math.random() * chars.length)];
}

// ─── Helper: Glitch Text Generator ─────────────
function glitchText(text, intensity = 0.3) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        if (Math.random() < intensity) {
            result += randomChar();
        } else {
            result += text[i];
        }
    }
    return result;
}

// ─── Helper: Zalgo Text (creepy) ───────────────
function zalgoText(text) {
    const zalgo = ['̴', '̵', '̶', '̷', '̸', '̨', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', '̽', '̾', '̿', '͂', '̓', '̈́', 'ͅ'];
    let result = '';
    for (const ch of text) {
        result += ch;
        for (let i = 0; i < 3; i++) {
            if (Math.random() > 0.5) {
                result += random(zalgo);
            }
        }
    }
    return result;
}

// ─── Helper: Reverse Text ──────────────────────
function reverseText(text) {
    return text.split('').reverse().join('');
}

// ─── Helper: Random Case ────────────────────────
function randomCase(text) {
    let result = '';
    for (const ch of text) {
        if (Math.random() > 0.5) {
            result += ch.toUpperCase();
        } else {
            result += ch.toLowerCase();
        }
    }
    return result;
}

// ─── Glitch Emojis ──────────────────────────────
const glitchEmojis = ['💢', '⚡', '🔥', '💀', '🌀', '🌪️', '📺', '🔮', '🕹️', '💻', '📡', '🎛️', '💥', '🌈', '🌌', '🖥️'];

module.exports = {

    // ─── .glitch ────────────────────────────────────
    glitch: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN MD ULTRA';
        await ctx.react('⚡');
        const from = ctx.from;

        // Step 1: Scanning
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ⚡ *GLITCH INITIALIZED* ⚡ ⬡─╮\n' +
                      '│\n' +
                      '│  🔍 Scanning...\n' +
                      '│  [' + '▓'.repeat(0) + '░'.repeat(10) + '] 0%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(500);

        // Step 2: Generating
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ⚡ *GLITCH INITIALIZED* ⚡ ⬡─╮\n' +
                      '│\n' +
                      '│  🔍 Generating glitch...\n' +
                      '│  [' + '▓'.repeat(5) + '░'.repeat(5) + '] 50%\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(500);

        // Step 3: Complete
        const glitched = glitchText(text, 0.5);
        const zalgo = zalgoText(text);
        const reversed = reverseText(text);
        const randomCased = randomCase(text);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ⚡ *GLITCH COMPLETE* ⚡ ⬡─╮\n' +
                      '│\n' +
                      '│  🔮 Original: ' + text + '\n' +
                      '│  💢 Glitched: ' + glitched + '\n' +
                      '│  🌪️ Zalgo: ' + zalgo + '\n' +
                      '│  🔄 Reversed: ' + reversed + '\n' +
                      '│  🔀 Random Case: ' + randomCased + '\n' +
                      '│\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│\n' +
                      '│  💡 Made by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch effect sent');
    },

    // ─── .glitchwave ────────────────────────────────
    glitchwave: async (ctx) => {
        await ctx.react('🌊');
        const from = ctx.from;
        const text = ctx.args.join(' ') || 'ARSLAN';

        let wave = '';
        for (let i = 0; i < 8; i++) {
            const glitched = glitchText(text, i * 0.12);
            wave += '│  ' + glitched + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🌊 *GLITCH WAVE* 🌊 ⬡─╮\n' +
                      '│\n' +
                      wave +
                      '│\n' +
                      '│  🌪️ Glitch wave complete!\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch wave sent');
    },

    // ─── .glitchart ──────────────────────────────────
    glitchart: async (ctx) => {
        await ctx.react('🎨');
        const from = ctx.from;

        const art = [
            ' █████╗ ██████╗ ███████╗██╗      █████╗ ███╗   ██╗',
            '██╔══██╗██╔══██╗██╔════╝██║     ██╔══██╗████╗  ██║',
            '███████║██████╔╝███████╗██║     ███████║██╔██╗ ██║',
            '██╔══██║██╔══██╗╚════██║██║     ██╔══██║██║╚██╗██║',
            '██║  ██║██║  ██║███████║███████╗██║  ██║██║ ╚████║',
            '╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝'
        ];

        let glitchedArt = '';
        for (const line of art) {
            glitchedArt += '│  ' + glitchText(line, 0.25) + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🎨 *GLITCH ART* 🎨 ⬡─╮\n' +
                      '│\n' +
                      glitchedArt +
                      '│\n' +
                      '│  🎛️ Glitch Level: ' + Math.floor(Math.random() * 100) + '%\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch art sent');
    },

    // ─── .glitchscreen ──────────────────────────────
    glitchscreen: async (ctx) => {
        await ctx.react('📺');
        const from = ctx.from;

        // Step 1: Screen flicker
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📺 *GLITCH SCREEN* 📺 ⬡─╮\n' +
                      '│\n' +
                      '│  📺 Flickering...\n' +
                      '│  🟥🟩🟦🟪🟧🟫🟥🟩🟦🟪🟧🟫\n' +
                      '│  🟫🟧🟪🟦🟩🟥🟫🟧🟪🟦🟩🟥\n' +
                      '│  🟥🟩🟦🟪🟧🟫🟥🟩🟦🟪🟧🟫\n' +
                      '│  🟫🟧🟪🟦🟩🟥🟫🟧🟪🟦🟩🟥\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(500);

        // Step 2: Glitch lines
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📺 *GLITCH SCREEN* 📺 ⬡─╮\n' +
                      '│\n' +
                      '│  📺 Glitch lines...\n' +
                      '│  ████░░░░████░░░░████\n' +
                      '│  ░░░░████░░░░████░░░░\n' +
                      '│  ████░░░░████░░░░████\n' +
                      '│  ░░░░████░░░░████░░░░\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await sleep(500);

        // Step 3: Final glitch
        const randomText = glitchText('ARSLAN MD ULTRA', 0.7);
        const zalgo = zalgoText('SYSTEM HACKED');

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 📺 *GLITCH SCREEN COMPLETE* 📺 ⬡─╮\n' +
                      '│\n' +
                      '│  💢 ' + randomText + '\n' +
                      '│  🌪️ ' + zalgo + '\n' +
                      '│  ⚡ System compromised!\n' +
                      '│\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch screen sent');
    },

    // ─── .glitchmatrix ──────────────────────────────
    glitchmatrix: async (ctx) => {
        await ctx.react('💻');
        const from = ctx.from;

        const matrixChars = ['0', '1', '█', '▓', '▒', '░', ' '];
        let matrix = '';
        for (let i = 0; i < 12; i++) {
            let line = '';
            for (let j = 0; j < 18; j++) {
                const char = random(matrixChars);
                const color = Math.random() > 0.7 ? '🟢' : '🟩';
                line += color + ' ';
            }
            matrix += '│  ' + line + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 💻 *GLITCH MATRIX* 💻 ⬡─╮\n' +
                      '│\n' +
                      matrix +
                      '│\n' +
                      '│  🟢 The Matrix has glitched!\n' +
                      '│  💢 ' + glitchText('Follow the white rabbit', 0.3) + '\n' +
                      '│\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch matrix sent');
    },

    // ─── .glitchv2 ───────────────────────────────────
    glitchv2: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN MD';
        await ctx.react('🌀');
        const from = ctx.from;

        let glitched = glitchText(text, 0.8);
        let zalgo = zalgoText(text);
        let reversed = reverseText(text);
        let randomCased = randomCase(text);
        let mixed = glitchText(text + ' ' + reversed + ' ' + randomCased, 0.4);

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🌀 *ULTRA GLITCH V2* 🌀 ⬡─╮\n' +
                      '│\n' +
                      '│  🔮 Original: ' + text + '\n' +
                      '│  💢 Glitched: ' + glitched + '\n' +
                      '│  🌪️ Zalgo: ' + zalgo + '\n' +
                      '│  🔄 Reversed: ' + reversed + '\n' +
                      '│  🔀 Random Case: ' + randomCased + '\n' +
                      '│  🔥 Mixed: ' + mixed + '\n' +
                      '│\n' +
                      '│  🎛️ Glitch Level: ' + Math.floor(Math.random() * 100) + '%\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Ultra glitch v2 sent');
    },

    // ─── .glitchflicker ─────────────────────────────
    glitchflicker: async (ctx) => {
        await ctx.react('⚡');
        const from = ctx.from;

        const frames = [
            '╭─⬡ ⚡ *FLICKER* ⚡ ⬡─╮\n' +
            '│\n' +
            '│  ████░░░░████░░░░████\n' +
            '│  ░░░░████░░░░████░░░░\n' +
            '│  ████░░░░████░░░░████\n' +
            '│  ░░░░████░░░░████░░░░\n' +
            '│\n' +
            '╰─────────────────────────╯',

            '╭─⬡ ⚡ *FLICKER* ⚡ ⬡─╮\n' +
            '│\n' +
            '│  ░░░░████░░░░████░░░░\n' +
            '│  ████░░░░████░░░░████\n' +
            '│  ░░░░████░░░░████░░░░\n' +
            '│  ████░░░░████░░░░████\n' +
            '│\n' +
            '╰─────────────────────────╯',

            '╭─⬡ ⚡ *FLICKER* ⚡ ⬡─╮\n' +
            '│\n' +
            '│  ████████████████████\n' +
            '│  ░░░░░░░░░░░░░░░░░░░░\n' +
            '│  ████████████████████\n' +
            '│  ░░░░░░░░░░░░░░░░░░░░\n' +
            '│\n' +
            '╰─────────────────────────╯'
        ];

        for (let i = 0; i < 5; i++) {
            await ctx.sock.sendMessage(from, { text: frames[i % frames.length] }, { quoted: ctx.msg });
            await sleep(250);
        }

        // Final
        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ ⚡ *FLICKER COMPLETE* ⚡ ⬡─╮\n' +
                      '│\n' +
                      '│  ✅ System restabilized.\n' +
                      '│  💢 Glitch ended.\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch flicker sent');
    },

    // ─── .glitchmix ──────────────────────────────────
    glitchmix: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN TECH';
        await ctx.react('🎛️');
        const from = ctx.from;

        const effects = [
            '🔄 Reversed: ' + reverseText(text),
            '💢 Glitched: ' + glitchText(text, 0.6),
            '🌪️ Zalgo: ' + zalgoText(text),
            '🔀 Mixed: ' + glitchText(text + ' ' + reverseText(text), 0.3),
            '🌀 Random: ' + glitchText(text, 1.0),
            '🔤 Random Case: ' + randomCase(text),
            '🔥 All Combined: ' + glitchText(zalgoText(reverseText(text)), 0.5)
        ];

        let msg = '╭─⬡ 🎛️ *GLITCH MIX* 🎛️ ⬡─╮\n│\n';
        for (const effect of effects) {
            msg += '│  ' + effect + '\n';
        }
        msg += '│\n│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
               '│  💖 Powered by ARSLAN TECH\'S\n│\n╰─────────────────────────╯';

        await ctx.sock.sendMessage(from, { text: msg }, { quoted: ctx.msg });
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch mix sent');
    },

    // ─── .glitchrain ──────────────────────────────────
    glitchrain: async (ctx) => {
        await ctx.react('🌧️');
        const from = ctx.from;

        const chars = ['0', '1', '█', '▓', '▒', '░', 'A', 'B', 'C', 'D', 'E', 'F'];
        let rain = '';
        for (let i = 0; i < 10; i++) {
            let line = '';
            for (let j = 0; j < 14; j++) {
                const char = random(chars);
                const color = Math.random() > 0.8 ? '💚' : '🟩';
                line += color + ' ';
            }
            rain += '│  ' + line + '\n';
        }

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 🌧️ *GLITCH RAIN* 🌧️ ⬡─╮\n' +
                      '│\n' +
                      rain +
                      '│\n' +
                      '│  💢 Glitch rain falling...\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch rain sent');
    },

    // ─── .glitchtext ──────────────────────────────────
    glitchtext: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN';
        await ctx.react('💬');
        const from = ctx.from;

        let result = '';
        for (let i = 0; i < 3; i++) {
            const intensity = 0.2 + (i * 0.3);
            result += '│  ' + glitchText(text, intensity) + '  (intensity: ' + (intensity * 100).toFixed(0) + '%)\n';
        }
        result += '│  ' + zalgoText(text) + '  (zalgo)\n';

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 💬 *GLITCH TEXT* 💬 ⬡─╮\n' +
                      '│\n' +
                      result +
                      '│\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch text sent');
    },

    // ─── .glitchbomb ──────────────────────────────────
    glitchbomb: async (ctx) => {
        await ctx.react('💥');
        const from = ctx.from;
        const text = ctx.args.join(' ') || 'BOOM!';

        await ctx.sock.sendMessage(
            from,
            {
                text: '╭─⬡ 💥 *GLITCH BOMB* 💥 ⬡─╮\n' +
                      '│\n' +
                      '│  💢 ' + glitchText(text, 1.0) + '\n' +
                      '│  🌪️ ' + zalgoText(text) + '\n' +
                      '│  🔄 ' + reverseText(text) + '\n' +
                      '│  🔀 ' + randomCase(text) + '\n' +
                      '│  🔥 ' + glitchText(zalgoText(reverseText(text)), 0.6) + '\n' +
                      '│\n' +
                      '│  💥 Glitch bomb exploded!\n' +
                      '│  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '  ' + random(glitchEmojis) + '\n' +
                      '│  💖 Powered by ARSLAN TECH\'S\n' +
                      '│\n' +
                      '╰─────────────────────────╯'
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('GLITCH', 'Glitch bomb sent');
    }
};