// plugins/automod.js
const { runQuery, getQuery } = require('../utils/database');
const { fancyLog } = require('../utils/logger');

const BAD_WORDS = ['badword1', 'badword2', 'spam']; // Add your words

module.exports = {
    automod: async (ctx) => {
        const body = ctx.msg.message?.conversation || ctx.msg.message?.extendedTextMessage?.text || '';
        for (const word of BAD_WORDS) {
            if (body.toLowerCase().includes(word)) {
                await ctx.react('🚫');
                await ctx.sock.sendMessage(ctx.from, { text: '🚫 *Inappropriate language detected!*' }, { quoted: ctx.msg });
                fancyLog('AUTOMOD', `Bad word detected from ${ctx.from}`);
                // Optionally delete the message
                break;
            }
        }
    }
};