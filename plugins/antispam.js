// plugins/antispam.js
const { fancyLog } = require('../utils/logger');

const spamTracker = new Map();
const COOLDOWN = 5000; // 5 seconds
const MAX_MESSAGES = 3; // 3 messages per cooldown

module.exports = {
    antispam: async (ctx) => {
        const from = ctx.from;
        const now = Date.now();
        if (!spamTracker.has(from)) {
            spamTracker.set(from, { count: 1, time: now });
            return;
        }
        const data = spamTracker.get(from);
        if (now - data.time < COOLDOWN) {
            data.count++;
            if (data.count > MAX_MESSAGES) {
                await ctx.react('🚫');
                await ctx.sock.sendMessage(from, { text: '🚫 *Spam Detected!* Please slow down.' }, { quoted: ctx.msg });
                fancyLog('ANTISPAM', `Spam detected from ${from}`);
                return;
            }
        } else {
            data.count = 1;
            data.time = now;
        }
        spamTracker.set(from, data);
    }
};