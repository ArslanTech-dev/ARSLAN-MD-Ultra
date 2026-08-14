/**
 * ================================================
 * plugins/animation.js
 * Animation, GIFs, Neon, Glitch, Matrix effects
 * Roman Urdu – Vertical Format
 * ================================================
 */

const axios = require('axios');
const { fancyLog } = require('../utils/logger');

// ─── GIPHY API (Public Beta Key – Limited) ────
const GIPHY_API_KEY = 'dc6zaTOxFJmzC'; // Public key, works for basic requests
const GIPHY_URL = 'https://api.giphy.com/v1/gifs';

// ─── Random Neon Colors ────────────────────────
const neonColors = [
    '🔴 Red',
    '🟢 Green',
    '🔵 Blue',
    '🟡 Yellow',
    '🟣 Purple',
    '🟠 Orange',
    '💖 Pink',
    '⚪ White'
];

// ─── Matrix Characters ─────────────────────────
const matrixChars = ['01', '10', '11', '00', '1', '0'];

// ─── Helper: Random item from array ────────────
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {

    /**
     * .gif <query> – Search GIF from GIPHY
     */
    gif: async (ctx) => {
        try {
            const query = ctx.args.join(' ') || 'funny';
            await ctx.react('🎬');
            
            const url = `${GIPHY_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=10&rating=g`;
            const response = await axios.get(url);
            const data = response.data.data;
            
            if (!data || data.length === 0) {
                return ctx.sock.sendMessage(
                    ctx.from,
                    { text: '❌ Koi GIF nahi mili. Doosra word try karein.' },
                    { quoted: ctx.msg }
                );
            }
            
            const gif = data[Math.floor(Math.random() * data.length)];
            const gifUrl = gif.images.original.url;
            
            await ctx.sock.sendMessage(
                ctx.from,
                {
                    video: { url: gifUrl },
                    caption: `🎬 *GIF FOUND*\n🔍 Query: ${query}\n📸 Source: GIPHY`
                },
                { quoted: ctx.msg }
            );
            
            await ctx.react('✅');
            fancyLog('ANIMATION', `GIF sent: ${query}`);
        } catch (err) {
            fancyLog('ERROR', `GIF failed: ${err.message}`);
            await ctx.react('❌');
            await ctx.sock.sendMessage(
                ctx.from,
                { text: `❌ Error: ${err.message}` },
                { quoted: ctx.msg }
            );
        }
    },

    /**
     * .randomgif – Random GIF from GIPHY
     */
    randomgif: async (ctx) => {
        try {
            await ctx.react('🎲');
            
            const url = `${GIPHY_URL}/random?api_key=${GIPHY_API_KEY}&rating=g`;
            const response = await axios.get(url);
            const gif = response.data.data;
            
            if (!gif || !gif.images) {
                return ctx.sock.sendMessage(
                    ctx.from,
                    { text: '❌ Koi GIF nahi mili. Dobara try karein.' },
                    { quoted: ctx.msg }
                );
            }
            
            const gifUrl = gif.images.original.url;
            
            await ctx.sock.sendMessage(
                ctx.from,
                {
                    video: { url: gifUrl },
                    caption: `🎲 *RANDOM GIF*\n📸 Source: GIPHY`
                },
                { quoted: ctx.msg }
            );
            
            await ctx.react('✅');
            fancyLog('ANIMATION', 'Random GIF sent');
        } catch (err) {
            fancyLog('ERROR', `Random GIF failed: ${err.message}`);
            await ctx.react('❌');
            await ctx.sock.sendMessage(
                ctx.from,
                { text: `❌ Error: ${err.message}` },
                { quoted: ctx.msg }
            );
        }
    },

    /**
     * .neon <text> – Neon styled message
     */
    neon: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN MD';
        await ctx.react('💡');
        const color = randomItem(neonColors);
        
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 💡 *NEON TEXT* 💡 ⬡─╮\n` +
                      `│\n` +
                      `│  ✨ ${color} NEON ✨\n` +
                      `│  ═══════════════════════\n` +
                      `│  🟡 *${text}*\n` +
                      `│  ═══════════════════════\n` +
                      `│  💫 Glowing effect active\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✨');
        fancyLog('ANIMATION', `Neon text: ${text}`);
    },

    /**
     * .glitch <text> – Glitch style message
     */
    glitch: async (ctx) => {
        const text = ctx.args.join(' ') || 'ARSLAN MD';
        await ctx.react('📺');
        
        // Glitch effect: random characters inserted
        let glitchText = '';
        for (let i = 0; i < text.length; i++) {
            if (Math.random() > 0.7) {
                const glitchChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                glitchText += glitchChar;
            } else {
                glitchText += text[i];
            }
        }
        
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 📺 *GLITCH TEXT* 📺 ⬡─╮\n` +
                      `│\n` +
                      `│  ⚡ [GLITCH EFFECT] ⚡\n` +
                      `│  ─────────────────────\n` +
                      `│  🔲 *${glitchText}*\n` +
                      `│  🔲 *${text}*\n` +
                      `│  ─────────────────────\n` +
                      `│  🎛️ Glitch level: ${Math.floor(Math.random() * 100)}%\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('⚡');
        fancyLog('ANIMATION', `Glitch text: ${text}`);
    },

    /**
     * .matrix – Matrix digital rain effect
     */
    matrix: async (ctx) => {
        await ctx.react('💻');
        
        let matrixLines = '';
        for (let i = 0; i < 6; i++) {
            let line = '';
            for (let j = 0; j < 12; j++) {
                line += randomItem(matrixChars) + ' ';
            }
            matrixLines += `  ${line}\n`;
        }
        
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 💻 *MATRIX EFFECT* 💻 ⬡─╮\n` +
                      `│\n` +
                      `│  🟢 THE MATRIX HAS YOU...\n` +
                      `│  ─────────────────────\n` +
                      `${matrixLines}` +
                      `│  ─────────────────────\n` +
                      `│  🟢 Follow the white rabbit\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🟢');
        fancyLog('ANIMATION', 'Matrix effect sent');
    },

    /**
     * .typing – Simulate typing effect
     */
    typing: async (ctx) => {
        await ctx.react('⌨️');
        
        // Send typing presence for 5 seconds
        await ctx.sock.sendPresenceUpdate('composing', ctx.from);
        
        // Wait 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Stop typing
        await ctx.sock.sendPresenceUpdate('paused', ctx.from);
        
        // Send the message
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ ⌨️ *TYPING EFFECT* ⌨️ ⬡─╮\n` +
                      `│\n` +
                      `│  🖊️ ARSLAN MD is typing...\n` +
                      `│  ⏱️ Simulated for 3 seconds\n` +
                      `│  ✨ Effect complete!\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        
        await ctx.react('✅');
        fancyLog('ANIMATION', 'Typing effect sent');
    },

    /**
     * .loading – Simulate loading bar animation
     */
    loading: async (ctx) => {
        await ctx.react('⏳');
        
        // Send initial message
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `⏳ *LOADING...*\n\n[░░░░░░░░░░] 0%`
            },
            { quoted: ctx.msg }
        );
        
        // Simulate loading steps
        const steps = [20, 40, 60, 80, 100];
        for (const step of steps) {
            await new Promise(resolve => setTimeout(resolve, 800));
            const bar = '█'.repeat(step / 10) + '░'.repeat(10 - (step / 10));
            await ctx.sock.sendMessage(
                ctx.from,
                {
                    text: `⏳ *LOADING...*\n\n[${bar}] ${step}%`
                },
                { quoted: ctx.msg }
            );
        }
        
        // Final message
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ ✅ *LOADING COMPLETE* ✅ ⬡─╮\n` +
                      `│\n` +
                      `│  🚀 System ready!\n` +
                      `│  ⏱️ Load time: ${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 9)}s\n` +
                      `│  ✨ All systems nominal\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        
        await ctx.react('✅');
        fancyLog('ANIMATION', 'Loading animation sent');
    }
};