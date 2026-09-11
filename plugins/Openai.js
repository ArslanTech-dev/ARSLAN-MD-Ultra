// plugins/openai.js
// OpenAI API Commands – GPT-4, DALL-E, Whisper, Codex
// Roman Urdu – Vertical Format
// Powered by ARSLAN TECH'S

const axios = require('axios');
const { fancyLog } = require('../utils/logger');

// ─── CONFIGURATION ──────────────────────────────
// Get your API key from: https://platform.openai.com/api-keys
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';
const OPENAI_BASE = 'https://api.openai.com/v1';

// ─── Helper: Check API Key ──────────────────────
function isApiKeySet() {
    return OPENAI_API_KEY && OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY' && OPENAI_API_KEY.startsWith('sk-');
}

// ─── Helper: Sleep ──────────────────────────────
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// ─── Helper: Progress Bar ──────────────────────
function progressBar(percent, length = 10) {
    const filled = Math.round((percent / 100) * length);
    const empty = length - filled;
    return '▓'.repeat(filled) + '░'.repeat(empty);
}

// ─── Emojis ──────────────────────────────────────
const emojis = ['🤖', '🧠', '✨', '💡', '🎯', '🚀', '💫', '⚡', '🌟', '🔥'];

module.exports = {

    // ─── .ai / .gpt ────────────────────────────────
    ai: async (ctx) => {
        const prompt = ctx.args.join(' ');
        if (!prompt) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Usage: .ai <question>\nExample: .ai What is AI?'
            }, { quoted: ctx.msg });
        }

        if (!isApiKeySet()) {
            return ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ ⚠️ *API KEY MISSING* ⚠️ ⬡─╮\n` +
                      `│\n` +
                      `│  🔑 OpenAI API key set nahi hai.\n` +
                      `│  📝 .env ya environment variables mein\n` +
                      `│     OPENAI_API_KEY set karein.\n` +
                      `│  🔗 https://platform.openai.com/api-keys\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: ctx.msg });
        }

        await ctx.react('🤖');

        try {
            const response = await axios.post(
                `${OPENAI_BASE}/chat/completions`,
                {
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: 'You are ARSLAN MD ULTRA, a helpful AI assistant. Respond in Roman Urdu if the user speaks Roman Urdu, otherwise respond in the same language.' },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const answer = response.data.choices[0].message.content;
            const tokens = response.data.usage.total_tokens;

            await ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ 🤖 *AI RESPONSE* 🤖 ⬡─╮\n` +
                      `│\n` +
                      `│  ❓ Question: ${prompt.slice(0, 100)}${prompt.length > 100 ? '...' : ''}\n` +
                      `│\n` +
                      `│  💬 Answer:\n` +
                      `│  ${answer}\n` +
                      `│\n` +
                      `│  📊 Tokens used: ${tokens}\n` +
                      `│  ${emojis[Math.floor(Math.random() * emojis.length)]}  ${emojis[Math.floor(Math.random() * emojis.length)]}\n` +
                      `│  💖 Powered by ARSLAN TECH'S\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: ctx.msg });

            await ctx.react('✅');
            fancyLog('OPENAI', `GPT response sent (${tokens} tokens)`);
        } catch (err) {
            fancyLog('ERROR', `OpenAI API failed: ${err.message}`);
            await ctx.react('❌');
            const errMsg = err.response?.data?.error?.message || err.message;
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ OpenAI Error: ${errMsg}`
            }, { quoted: ctx.msg });
        }
    },

    // ─── .gpt4 (Alias) ─────────────────────────────
    gpt4: async (ctx) => {
        await module.exports.ai(ctx);
    },

    // ─── .ask (Alias) ──────────────────────────────
    ask: async (ctx) => {
        await module.exports.ai(ctx);
    },

    // ─── .img / .dalle (Image Generation) ─────────
    img: async (ctx) => {
        const prompt = ctx.args.join(' ');
        if (!prompt) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Usage: .img <description>\nExample: .img a beautiful sunset over mountains'
            }, { quoted: ctx.msg });
        }

        if (!isApiKeySet()) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ OpenAI API key set nahi hai.'
            }, { quoted: ctx.msg });
        }

        await ctx.react('🎨');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🎨 *DALL-E IMAGE* 🎨 ⬡─╮\n` +
                  `│\n` +
                  `│  📝 Prompt: ${prompt}\n` +
                  `│  [${progressBar(30)}] 30% Processing...\n` +
                  `│  ⏳ Please wait (10-20 sec)\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        try {
            const response = await axios.post(
                `${OPENAI_BASE}/images/generations`,
                {
                    model: 'dall-e-3',
                    prompt: prompt,
                    n: 1,
                    size: '1024x1024',
                    quality: 'standard'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const imageUrl = response.data.data[0].url;
            const revisedPrompt = response.data.data[0].revised_prompt || prompt;

            await ctx.sock.sendMessage(ctx.from, {
                image: { url: imageUrl },
                caption: `╭─⬡ 🎨 *DALL-E IMAGE* 🎨 ⬡─╮\n` +
                         `│\n` +
                         `│  📝 Prompt: ${prompt}\n` +
                         `│  ✨ Revised: ${revisedPrompt.slice(0, 100)}${revisedPrompt.length > 100 ? '...' : ''}\n` +
                         `│  🤖 Model: DALL-E 3\n` +
                         `│  📐 Size: 1024x1024\n` +
                         `│\n` +
                         `│  💖 Powered by ARSLAN TECH'S\n` +
                         `│\n` +
                         `╰─────────────────────────╯`
            }, { quoted: ctx.msg });

            await ctx.react('✅');
            fancyLog('OPENAI', 'DALL-E image generated');
        } catch (err) {
            fancyLog('ERROR', `DALL-E failed: ${err.message}`);
            await ctx.react('❌');
            const errMsg = err.response?.data?.error?.message || err.message;
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ DALL-E Error: ${errMsg}`
            }, { quoted: ctx.msg });
        }
    },

    // ─── .dalle (Alias) ────────────────────────────
    dalle: async (ctx) => {
        await module.exports.img(ctx);
    },

    // ─── .codeai (Code Generation) ────────────────
    codeai: async (ctx) => {
        const prompt = ctx.args.join(' ');
        if (!prompt) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Usage: .codeai <description>\nExample: .codeai Write a Python function to reverse a string'
            }, { quoted: ctx.msg });
        }

        if (!isApiKeySet()) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ OpenAI API key set nahi hai.'
            }, { quoted: ctx.msg });
        }

        await ctx.react('💻');
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💻 *CODE GENERATOR* 💻 ⬡─╮\n` +
                  `│\n` +
                  `│  📝 Task: ${prompt}\n` +
                  `│  ⏳ Generating code...\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        try {
            const response = await axios.post(
                `${OPENAI_BASE}/chat/completions`,
                {
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: 'You are an expert programmer. Provide clean, working code with brief explanations. Always specify the language.' },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 1500,
                    temperature: 0.3
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const code = response.data.choices[0].message.content;

            await ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ 💻 *CODE GENERATED* 💻 ⬡─╮\n` +
                      `│\n` +
                      `│  📝 Task: ${prompt.slice(0, 80)}\n` +
                      `│  ─────────────────────\n` +
                      `│  ${code}\n` +
                      `│  ─────────────────────\n` +
                      `│  💡 Generated by GPT-4\n` +
                      `│  💖 Powered by ARSLAN TECH'S\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: ctx.msg });

            await ctx.react('✅');
            fancyLog('OPENAI', 'Code generated');
        } catch (err) {
            fancyLog('ERROR', `Code AI failed: ${err.message}`);
            await ctx.react('❌');
            const errMsg = err.response?.data?.error?.message || err.message;
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ Code AI Error: ${errMsg}`
            }, { quoted: ctx.msg });
        }
    },

    // ─── .translateai (AI Translation) ────────────
    translateai: async (ctx) => {
        const args = ctx.args;
        if (args.length < 2) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Usage: .translateai <language> <text>\nExample: .translateai urdu Hello, how are you?'
            }, { quoted: ctx.msg });
        }

        if (!isApiKeySet()) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ OpenAI API key set nahi hai.'
            }, { quoted: ctx.msg });
        }

        const targetLang = args[0];
        const text = args.slice(1).join(' ');

        await ctx.react('🌐');

        try {
            const response = await axios.post(
                `${OPENAI_BASE}/chat/completions`,
                {
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: `You are a professional translator. Translate the given text to ${targetLang}. Only provide the translation, no explanations.` },
                        { role: 'user', content: text }
                    ],
                    max_tokens: 500,
                    temperature: 0.2
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const translation = response.data.choices[0].message.content;

            await ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ 🌐 *AI TRANSLATION* 🌐 ⬡─╮\n` +
                      `│\n` +
                      `│  📝 Original: ${text}\n` +
                      `│  🎯 Target: ${targetLang}\n` +
                      `│  ─────────────────────\n` +
                      `│  ✨ Translation: ${translation}\n` +
                      `│  ─────────────────────\n` +
                      `│  💖 Powered by ARSLAN TECH'S\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: ctx.msg });

            await ctx.react('✅');
            fancyLog('OPENAI', `Translated to ${targetLang}`);
        } catch (err) {
            fancyLog('ERROR', `Translate AI failed: ${err.message}`);
            await ctx.react('❌');
            const errMsg = err.response?.data?.error?.message || err.message;
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ Translate Error: ${errMsg}`
            }, { quoted: ctx.msg });
        }
    },

    // ─── .summarize (Text Summarization) ──────────
    summarize: async (ctx) => {
        const text = ctx.args.join(' ');
        if (!text) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Usage: .summarize <long text>\nExample: .summarize <paste long text>'
            }, { quoted: ctx.msg });
        }

        if (!isApiKeySet()) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ OpenAI API key set nahi hai.'
            }, { quoted: ctx.msg });
        }

        await ctx.react('📝');

        try {
            const response = await axios.post(
                `${OPENAI_BASE}/chat/completions`,
                {
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: 'You are a summarizer. Provide a concise summary in bullet points.' },
                        { role: 'user', content: `Summarize this: ${text}` }
                    ],
                    max_tokens: 400,
                    temperature: 0.5
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const summary = response.data.choices[0].message.content;

            await ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ 📝 *SUMMARY* 📝 ⬡─╮\n` +
                      `│\n` +
                      `│  📖 Original: ${text.slice(0, 80)}...\n` +
                      `│  ─────────────────────\n` +
                      `│  ✨ Summary:\n` +
                      `│  ${summary}\n` +
                      `│  ─────────────────────\n` +
                      `│  💖 Powered by ARSLAN TECH'S\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: ctx.msg });

            await ctx.react('✅');
            fancyLog('OPENAI', 'Summary generated');
        } catch (err) {
            fancyLog('ERROR', `Summarize failed: ${err.message}`);
            await ctx.react('❌');
            const errMsg = err.response?.data?.error?.message || err.message;
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ Summarize Error: ${errMsg}`
            }, { quoted: ctx.msg });
        }
    },

    // ─── .storyai (Story Generation) ──────────────
    storyai: async (ctx) => {
        const topic = ctx.args.join(' ');
        if (!topic) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ Usage: .storyai <topic>\nExample: .storyai a brave lion in the jungle'
            }, { quoted: ctx.msg });
        }

        if (!isApiKeySet()) {
            return ctx.sock.sendMessage(ctx.from, {
                text: '❌ OpenAI API key set nahi hai.'
            }, { quoted: ctx.msg });
        }

        await ctx.react('📖');

        try {
            const response = await axios.post(
                `${OPENAI_BASE}/chat/completions`,
                {
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: 'You are a creative storyteller. Write short, engaging stories (200-300 words).' },
                        { role: 'user', content: `Write a short story about: ${topic}` }
                    ],
                    max_tokens: 600,
                    temperature: 0.9
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const story = response.data.choices[0].message.content;

            await ctx.sock.sendMessage(ctx.from, {
                text: `╭─⬡ 📖 *AI STORY* 📖 ⬡─╮\n` +
                      `│\n` +
                      `│  📝 Topic: ${topic}\n` +
                      `│  ─────────────────────\n` +
                      `│  ${story}\n` +
                      `│  ─────────────────────\n` +
                      `│  💖 Powered by ARSLAN TECH'S\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: ctx.msg });

            await ctx.react('✅');
            fancyLog('OPENAI', 'Story generated');
        } catch (err) {
            fancyLog('ERROR', `Story AI failed: ${err.message}`);
            await ctx.react('❌');
            const errMsg = err.response?.data?.error?.message || err.message;
            await ctx.sock.sendMessage(ctx.from, {
                text: `❌ Story Error: ${errMsg}`
            }, { quoted: ctx.msg });
        }
    },

    // ─── .openaistatus (Check API Status) ──────────
    openaistatus: async (ctx) => {
        await ctx.react('🤖');
        const keySet = isApiKeySet();
        await ctx.sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🤖 *OPENAI STATUS* 🤖 ⬡─╮\n` +
                  `│\n` +
                  `│  🔑 API Key: ${keySet ? '✅ Set' : '❌ Not Set'}\n` +
                  `│  🤖 Model: gpt-4o-mini\n` +
                  `│  🎨 Image: dall-e-3\n` +
                  `│  💻 Code: gpt-4o-mini\n` +
                  `│\n` +
                  `│  📋 Available Commands:\n` +
                  `│  ${ctx.prefix || '.'}ai <question>\n` +
                  `│  ${ctx.prefix || '.'}gpt4 <question>\n` +
                  `│  ${ctx.prefix || '.'}img <prompt>\n` +
                  `│  ${ctx.prefix || '.'}codeai <task>\n` +
                  `│  ${ctx.prefix || '.'}translateai <lang> <text>\n` +
                  `│  ${ctx.prefix || '.'}summarize <text>\n` +
                  `│  ${ctx.prefix || '.'}storyai <topic>\n` +
                  `│\n` +
                  `│  💖 Powered by ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: ctx.msg });
        fancyLog('OPENAI', 'Status shown');
    }
};