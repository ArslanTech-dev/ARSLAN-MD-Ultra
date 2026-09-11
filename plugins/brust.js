// plugins/burst.js
// Burst Message – Behter aur Roman Urdu mein
// Owner only – 100 messages with 2-second interval

const { fancyLog } = require('../utils/logger');

// ─── Helper: Sleep ──────────────────────────────
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Helper: Random Emoji ──────────────────────
const emojis = ['🔥', '💥', '⚡', '✨', '🌟', '💫', '🎯', '🚀', '💪', '👑', '🎉', '🥳', '💯', '🔮', '🌀'];

function randomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// ─── Helper: Progress Bar ──────────────────────
function progressBar(current, total, length = 20) {
    const percent = Math.round((current / total) * 100);
    const filled = Math.round((percent / 100) * length);
    const empty = length - filled;
    return '▓'.repeat(filled) + '░'.repeat(empty);
}

module.exports = {
    // ─── .burst ─────────────────────────────────────
    burst: async (ctx) => {
        // ─── Sirf Owner ────────────────────────────
        if (!ctx.isOwner) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Yeh command sirf owner ke liye hai.'
            }, { quoted: ctx.msg });
        }

        // ─── Arguments Parse Karein ────────────────
        let count = 100;
        let interval = 2000;
        let message = ctx.args.join(' ');

        // Agar pehla argument number hai to count samjho
        const firstArg = ctx.args[0];
        if (firstArg && !isNaN(firstArg) && parseInt(firstArg) > 0) {
            count = parseInt(firstArg);
            message = ctx.args.slice(1).join(' ');
        }

        // Agar count 1000 se zyada hai to limit karo
        if (count > 500) {
            count = 500;
            await ctx.sock.sendMessage(ctx.from, {
                text: '⚠️ Max limit 500 messages hai. 500 pe set kar diya.'
            }, { quoted: ctx.msg });
        }

        if (!message) {
            return ctx.sock.sendMessage(ctx.from, {
                text: `❌ Usage: .burst <count> <message>\nExample: .burst 50 "Assalam o Alaikum!"`
            }, { quoted: ctx.msg });
        }

        // ─── Confirm Message ────────────────────────
        await ctx.react('⚠️');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ⚠️ *BURST MESSAGE STARTING* ⚠️ ⬡─╮\n` +
                  `│\n` +
                  `│  📨 Total: ${count} messages\n` +
                  `│  ⏱️ Interval: ${interval/1000} seconds\n` +
                  `│  📝 Message: ${message.slice(0, 50)}${message.length > 50 ? '...' : ''}\n` +
                  `│  👑 Owner: ${global.OWNER_NAME || 'ARSLAN'}\n` +
                  `│  ⏳ Approx time: ${Math.round((count * interval) / 1000 / 60)} minutes\n` +
                  `│\n` +
                  `│  💡 Yeh sirf fun ke liye hai!\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        // ─── Wait 3 seconds before starting ────────
        await sleep(3000);

        // ─── Progress Bar ───────────────────────────
        const startTime = Date.now();
        let sent = 0;

        // Har 10 messages ke baad progress update bhejein
        for (let i = 1; i <= count; i++) {
            sent = i;
            const bar = progressBar(i, count);
            const percent = Math.round((i / count) * 100);
            const emoji = randomEmoji();

            await ctx.sock.sendMessage(ctx.from, {
                text: `${emoji} [${i}/${count}] ${bar} ${percent}%\n` +
                      `📝 ${message}`
            }, { quoted: ctx.msg });

            // Interval (except last message)
            if (i < count) {
                await sleep(interval);
            }
        }

        // ─── Completion ─────────────────────────────
        const endTime = Date.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(1);

        await ctx.react('✅');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ ✅ *BURST COMPLETE* ✅ ⬡─╮\n` +
                  `│\n` +
                  `│  📨 ${count} messages sent!\n` +
                  `│  ⏱️ Time taken: ${totalTime} seconds\n` +
                  `│  👑 Owner: ${global.OWNER_NAME || 'ARSLAN'}\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│  ${randomEmoji()} ${randomEmoji()} ${randomEmoji()}\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        fancyLog('BURST', `${count} messages sent by owner in ${totalTime}s`);
    },

    // ─── .brust (Alias) ─────────────────────────────
    brust: async (ctx) => {
        await module.exports.burst(ctx);
    },

    // ─── .burststop (Stop/Cancel) ──────────────────
    burststop: async (ctx) => {
        if (!ctx.isOwner) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Sirf owner ke liye.'
            }, { quoted: ctx.msg });
        }

        await ctx.react('🛑');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🛑 *BURST STOPPED* 🛑 ⬡─╮\n` +
                  `│\n` +
                  `│  ⛔ Burst message ko rok diya gaya.\n` +
                  `│  💡 Next time .burst use karein.\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        fancyLog('BURST', 'Burst stopped by owner');
    }
};