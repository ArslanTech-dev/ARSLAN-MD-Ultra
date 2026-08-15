// plugins/games.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

module.exports = {
    tictactoe: async (ctx) => {
        // Simple implementation
        await ctx.react('🎮');
        await ctx.sock.sendMessage(ctx.from, {
            text: `🎮 *Tic Tac Toe*\n\n1 | 2 | 3\n---------\n4 | 5 | 6\n---------\n7 | 8 | 9\n\nUse .ttt <position> to play.`
        }, { quoted: ctx.msg });
    },
    trivia: async (ctx) => {
        try {
            await ctx.react('🧠');
            const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
            const q = response.data.results[0];
            const options = [...q.incorrect_answers, q.correct_answer];
            let text = `🧠 *Trivia*\n\n${q.question}\n\n`;
            options.forEach((opt, i) => text += `${i+1}. ${opt}\n`);
            text += `\nReply with the number.`;
            await ctx.sock.sendMessage(ctx.from, { text }, { quoted: ctx.msg });
        } catch (e) {
            fancyLog('ERROR', `Trivia failed: ${e.message}`);
            await ctx.react('❌');
        }
    }
};