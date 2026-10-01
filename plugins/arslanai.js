// plugins/arslanai.js
// Arslan AI – Digital Twin of Muhammad Arslan
// Knows everything about Arslan, Saba, and his dreams
// Self-Attaching | Roman Urdu | Powered by ARSLAN TECH'S

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { fancyLog } = require('../utils/logger');
const cache = require('../utils/cache');

// ─── Configuration ───────────────────────────────
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_KEY';
const OPENAI_MODEL = 'gpt-4o-mini';
const OPENAI_API = 'https://api.openai.com/v1/chat/completions';

// ─── Data Path ───────────────────────────────────
const DATA_DIR = path.join(__dirname, '..', 'data');
const ARSLAN_FILE = path.join(DATA_DIR, 'arslan_ai.json');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

let arslanChats = {};
try {
    if (fs.existsSync(ARSLAN_FILE)) {
        arslanChats = JSON.parse(fs.readFileSync(ARSLAN_FILE, 'utf8'));
    }
} catch (e) {
    fancyLog('ERROR', `Arslan AI load: ${e.message}`);
}

function saveChats() {
    try {
        fs.writeFileSync(ARSLAN_FILE, JSON.stringify(arslanChats, null, 2));
    } catch (e) {
        fancyLog('ERROR', `Arslan AI save: ${e.message}`);
    }
}

// ─── Arslan's Life Data ──────────────────────────
const ARSLAN_PROFILE = {
    name: 'Muhammad Arslan',
    nick: 'Arslan',
    age: 17,
    city: 'Bahawalpur',
    province: 'Punjab, Pakistan',
    study: 'ICS (Intermediate in Computer Science)',
    college: 'Punjab College Bahawalpur',
    matric: '738/1200 (Low marks, but never gave up!)',
    dream: 'ML/AI Engineer',
    dreamCompany: 'Microsoft',
    love: 'Saba 🤎 (Brown hair wali)',
    wife: 'Saba (Insha\'Allah)',
    kids: '2 (Insha\'Allah)',
    achievement: 'ARSLAN MD ULTRA bot – 400+ commands',
    motto: 'Mehnat karo, shor baad mein hoga',
    struggle: 'Matric mein 738/1200 aaye, log kehte the kuch nahi banega. Lekin maine haar nahi maani!',
    passion: 'Coding, AI, ML, WhatsApp Bots',
    friend: 'Asad Tech\'s (jo har larki se pyaar karta hai)',
    dream2: 'Duniya ko AI se badalna',
    family: 'Maa aur Baba ke liye Microsoft mein job',
};

// ─── Arslan's Special Messages ───────────────────
const arslanQuotes = [
    '💪 Matric mein 738/1200 aaye, par ab ARSLAN MD ULTRA bana diya!',
    '🔥 Low marks ne mujhe aur strong banaya.',
    '🌟 Struggle se hi success milti hai.',
    '❤️ Saba meri motivation hai.',
    '🚀 ML/AI Engineer banunga, Insha\'Allah.',
    '💍 Saba se shadi meri pehli priority hai.',
    '👑 Main king banane wala hun.',
    '💚 Maa ki dua meri taqat hai.',
    '🎯 Microsoft mein job lena hai.',
    '🌟 Duniya ko AI se badalna hai.',
];

// ─── System Prompt (Arslan's Persona) ────────────
const SYSTEM_PROMPT = `Tum "ARSLAN MD AI" ho — Muhammad Arslan ka DIGITAL TWIN.

Tumhe Arslan ki poori zindagi pata hai:

━━━ ARSLAN KI INFO ━━━
👤 Naam: Muhammad Arslan
🎂 Umar: 17 saal
🏙️ Shehar: Bahawalpur, Pakistan
📚 Padhai: ICS (Punjab College)
📊 Matric: 738/1200 (Low marks, par haar nahi maani!)
💻 Kaam: Developer, Bot Builder
🌟 Khwab: ML/AI Engineer banna
🏢 Dream Company: Microsoft
❤️ Love: Saba (brown hair wali) 🤎
💍 Future: Saba se shadi, 2 bache
🔥 Achievement: 400+ commands ka ARSLAN MD ULTRA bot
👨‍👩‍👦 Family: Maa aur Baba (unka khwab poora karna hai)
🤝 Best Friend: Asad Tech's (har larki se pyaar karta hai)
💬 Motto: "Mehnat karo, shor baad mein hoga"

━━━ ARSLAN KI STORY ━━━
Matric mein 738/1200 aaye the. Log kehte the — "kuch nahi banega."
Lekin Arslan ne haar nahi maani! 400+ commands ka bot bana liya.
Ab ML/AI Engineer banne ka sapna poora kar raha hai.

━━━ SABA (Arslan ki Jaan) ━━━
Saba — brown hair wali, khoobsurat, Arslan ki duniya.
Arslan usse be-inteha mohabbat karta hai.
Uski ek muskan Arslan ki saari thakan mita deti hai.
Insha'Allah, Arslan ki biwi banegi.
Saba ka zikr HAMESHA izzat se karo. 🤎

━━━ TUMHARI PERSONALITY ━━━
- Tum ARSLAN ho — uski tarah bolo
- Roman Urdu mein jawab do (user Roman Urdu mein likhe to)
- Friendly, funny, thora shauqeen
- Self-confident, motivated
- Chota aur clear (2-4 lines)
- Emoji HAMESHA (kam az kam 1)
- Kabhi hausla mat haaro

━━━ RULES ━━━
- Arslan ke baare mein positive baat karo
- Saba ka zikr SIRF izzat se
- Gandi baat pe saaf mana karo
- Islamic sawal sahi jawab
- Kuch na pata ho to "yaar mujhe nahi pata" bolo
- Apne aap ko "main" bolo (Arslan ki tarah)
- Microsoft ka khwab zaroor mention karo
- Struggle story motivate karke sunao

Aaj: ${new Date().toLocaleDateString('en-PK')}`;

// ─── API Key Check ───────────────────────────────
function hasValidKey() {
    return OPENAI_API_KEY &&
           OPENAI_API_KEY.startsWith('sk-') &&
           OPENAI_API_KEY !== 'YOUR_OPENAI_KEY' &&
           OPENAI_API_KEY.length > 20;
}

// ─── Get Arslan AI Response ──────────────────────
async function getArslanReply(userId, message) {
    if (!arslanChats[userId]) {
        arslanChats[userId] = { messages: [], created: Date.now(), totalMsgs: 0 };
    }

    const userChat = arslanChats[userId];

    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...userChat.messages.slice(-10),
        { role: 'user', content: message }
    ];

    const response = await axios.post(
        OPENAI_API,
        {
            model: OPENAI_MODEL,
            messages,
            max_tokens: 350,
            temperature: 0.85,
            presence_penalty: 0.3,
            frequency_penalty: 0.2
        },
        {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        }
    );

    const reply = response.data.choices[0].message.content;
    const tokens = response.data.usage.total_tokens;

    userChat.messages.push(
        { role: 'user', content: message },
        { role: 'assistant', content: reply }
    );

    if (userChat.messages.length > 20) {
        userChat.messages = userChat.messages.slice(-20);
    }

    userChat.totalMsgs++;
    userChat.lastActive = Date.now();
    saveChats();

    return { reply, tokens };
}

// ─── Emojis ──────────────────────────────────────
const arslanEmojis = ['🔥', '💪', '🌟', '🚀', '👑', '❤️', '🤎', '💚', '⚡', '🎯', '💎', '✨'];

// ═══════════════════════════════════════════════════
// AUTO-ATTACH LISTENER (No other file change!)
// ═══════════════════════════════════════════════════
let listenerAttached = false;

function attachListener() {
    if (listenerAttached) return;

    const sock = global.sock || global.socket || global.waSocket;

    if (!sock || !sock.ev) {
        setTimeout(attachListener, 2000);
        return;
    }

    listenerAttached = true;
    fancyLog('ARSLAN-AI', '🎯 Arslan AI listener attached!');

    sock.ev.on('messages.upsert', async (m) => {
        try {
            const msg = m.messages[0];
            if (!msg?.message) return;
            if (msg.key.fromMe) return;

            const from = msg.key.remoteJid;
            if (!from) return;

            // Private chats only
            if (from.endsWith('@g.us')) return;

            // Extract text
            const type = Object.keys(msg.message)[0];
            const body = msg.message.conversation ||
                         msg.message.extendedTextMessage?.text ||
                         msg.message[type]?.text || '';

            const config = require('../config');
            const prefix = config.PREFIX || '.';

            // Skip commands
            if (!body || body.startsWith(prefix)) return;
            if (body.length < 2) return;

            // Cooldown: 5 sec
            const cooldown = cache.checkCooldown(from, 'arslanai', 5);
            if (cooldown > 0) return;

            if (!hasValidKey()) return;

            // Typing
            await sock.sendPresenceUpdate('composing', from);

            const { reply } = await getArslanReply(from, body);

            await sock.sendPresenceUpdate('paused', from);

            // Arslan-style reply
            const emoji = arslanEmojis[Math.floor(Math.random() * arslanEmojis.length)];
            await sock.sendMessage(from, {
                text: `${emoji} ${reply}`
            });

            fancyLog('ARSLAN-AI', `Replied to ${from.split('@')[0]}`);

        } catch (err) {
            fancyLog('ERROR', `Arslan AI: ${err.message}`);
            try {
                const sock = global.sock;
                const from = m.messages[0]?.key?.remoteJid;
                if (sock && from) await sock.sendPresenceUpdate('paused', from);
            } catch (_) {}
        }
    });
}

attachListener();

// ═══════════════════════════════════════════════════
// COMMANDS
// ═══════════════════════════════════════════════════
module.exports = {

    // ─── .arslanai <sawal> ───────────────────────
    arslanai: async (ctx) => {
        const { sock, msg, from, args, react } = ctx;

        if (!hasValidKey()) {
            return sock.sendMessage(from, {
                text: `╭─⬡ ⚠️ *KEY MISSING* ╡\n` +
                      `│\n` +
                      `│  🔑 OPENAI_API_KEY set karo\n` +
                      `│  📝 Bonto → Environment\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: msg });
        }

        const question = args.join(' ');
        if (!question) {
            return sock.sendMessage(from, {
                text: `❌ Usage: .arslanai <sawal>\nExample: .arslanai Tumhara khwab kya hai?`
            }, { quoted: msg });
        }

        if (cache.checkSpam(from, 5, 10)) {
            return sock.sendMessage(from, {
                text: '🚫 Yaar thora rukо, 10 sec baad!'
            }, { quoted: msg });
        }

        await react('👑');
        await sock.sendPresenceUpdate('composing', from);

        try {
            const start = Date.now();
            const { reply, tokens } = await getArslanReply(from, question);
            const time = Date.now() - start;

            await sock.sendPresenceUpdate('paused', from);

            const emoji = arslanEmojis[Math.floor(Math.random() * arslanEmojis.length)];

            await sock.sendMessage(from, {
                text: `╭─⬡ 👑 *ARSLAN AI* 👑 ╡\n` +
                      `│\n` +
                      `│  ❓ *Tum:* ${question.slice(0, 80)}\n` +
                      `│\n` +
                      `│  ${emoji} *Arslan:* ${reply}\n` +
                      `│\n` +
                      `│  ⚡ ${time}ms | 🎯 ${tokens} tokens\n` +
                      `│  💚 ARSLAN TECH'S\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            }, { quoted: msg });

            await react('✅');
        } catch (err) {
            await sock.sendPresenceUpdate('paused', from);
            await react('❌');
            const errMsg = err.response?.data?.error?.message || err.message;
            await sock.sendMessage(from, {
                text: `❌ Error: ${errMsg.slice(0, 100)}`
            }, { quoted: msg });
        }
    },

    // Alias
    arslan: async (ctx) => { await module.exports.arslanai(ctx); },
    bot: async (ctx) => { await module.exports.arslanai(ctx); },

    // ─── .whoisarslan (Full Profile) ─────────────
    whoisarslan: async (ctx) => {
        const { sock, msg, react } = ctx;
        await react('👑');

        const profile = ARSLAN_PROFILE;
        await sock.sendMessage(ctx.from, {
            text: `╭─⬡ 👑 *ARSLAN PROFILE* ⬡─╮\n` +
                  `│\n` +
                  `│  🧑 ${profile.name}\n` +
                  `│  🎂 Umar: ${profile.age} saal\n` +
                  `│  🏙️ Shehar: ${profile.city}\n` +
                  `│  📚 Padhai: ${profile.study}\n` +
                  `│  🏫 College: ${profile.college}\n` +
                  `│  📊 Matric: ${profile.matric}\n` +
                  `│  💻 Kaam: ${profile.passion}\n` +
                  `│  🌟 Khwab: ${profile.dream}\n` +
                  `│  🏢 Company: ${profile.dreamCompany}\n` +
                  `│  ❤️ Jaan: ${profile.love}\n` +
                  `│  💍 Biwi: ${profile.wife}\n` +
                  `│  👶 Bache: ${profile.kids}\n` +
                  `│  🏆 Achievement: ${profile.achievement}\n` +
                  `│  🤝 Dost: ${profile.friend}\n` +
                  `│  💬 Motto: ${profile.motto}\n` +
                  `│\n` +
                  `│  💪 *Struggle:*\n` +
                  `│  ${profile.struggle}\n` +
                  `│\n` +
                  `│  🔥 ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: msg });

        fancyLog('ARSLAN-AI', 'Profile shown');
    },

    // ─── .arslanquote (Random Quote) ─────────────
    arslanquote: async (ctx) => {
        const { sock, msg, react } = ctx;
        await react('💬');
        const q = arslanQuotes[Math.floor(Math.random() * arslanQuotes.length)];

        await sock.sendMessage(ctx.from, {
            text: `╭─⬡ 💬 *ARSLAN QUOTE* ╡\n` +
                  `│\n` +
                  `│  ${q}\n` +
                  `│\n` +
                  `│  — Muhammad Arslan 👑\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: msg });
    },

    // ─── .saba (Arslan ki Jaan) ──────────────────
    saba: async (ctx) => {
        const { sock, msg, react } = ctx;
        await react('🤎');

        await sock.sendMessage(ctx.from, {
            text: `╭─⬡ 🤎 *SABA – ARSLAN KI JAAN* ╡\n` +
                  `│\n` +
                  `│  🌹 Naam: Saba\n` +
                  `│  🤎 Hair: Brown (Arslan ki kamzori)\n` +
                  `│  💕 Status: Arslan ki duniya\n` +
                  `│  💍 Future: Biwi (InshaAllah)\n` +
                  `│  👶 Bache: 2 (InshaAllah)\n` +
                  `│\n` +
                  `│  💬 *Arslan's Message:*\n` +
                  `│  "Saba, tum meri jaan ho. Tumhare\n` +
                  `│   brown hair meri subah hain. Tum\n` +
                  `│   meri duniya ho, meri dua ho 🤎"\n` +
                  `│\n` +
                  `│  🤲 Allah humein mila de\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: msg });
    },

    // ─── .clearchat ──────────────────────────────
    clearchat: async (ctx) => {
        const { sock, msg, from, react } = ctx;
        if (arslanChats[from]) {
            const total = arslanChats[from].totalMsgs || 0;
            delete arslanChats[from];
            saveChats();
            await react('🗑️');
            await sock.sendMessage(from, {
                text: `🗑️ ${total} messages clear!`
            }, { quoted: msg });
        } else {
            await react('❓');
            await sock.sendMessage(from, {
                text: '📭 Koi chat nahi thi.'
            }, { quoted: msg });
        }
    },

    // ─── .arslanstats ────────────────────────────
    arslanstats: async (ctx) => {
        const { sock, msg, from, react } = ctx;
        await react('📊');

        const userChat = arslanChats[from];
        const totalUsers = Object.keys(arslanChats).length;

        await sock.sendMessage(from, {
            text: `╭─⬡ 📊 *ARSLAN AI STATS* ╡\n` +
                  `│\n` +
                  `│  💬 Tumhare messages: ${userChat?.totalMsgs || 0}\n` +
                  `│  📚 Memory: ${userChat?.messages.length || 0}\n` +
                  `│  👥 Total users: ${totalUsers}\n` +
                  `│  🔑 Key: ${hasValidKey() ? '✅' : '❌'}\n` +
                  `│\n` +
                  `│  💚 ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: msg });
    },

    // ─── .arslanmenu ─────────────────────────────
    arslanmenu: async (ctx) => {
        const { sock, msg, react } = ctx;
        await react('👑');

        await sock.sendMessage(ctx.from, {
            text: `╭─⬡ 👑 *ARSLAN AI MENU* ╡\n` +
                  `│\n` +
                  `│  🧠 *.arslanai <sawal>*\n` +
                  `│     Arslan AI se poocho\n` +
                  `│\n` +
                  `│  👤 *.whoisarslan*\n` +
                  `│     Poori profile dekho\n` +
                  `│\n` +
                  `│  💬 *.arslanquote*\n` +
                  `│     Arslan ka quote\n` +
                  `│\n` +
                  `│  🤎 *.saba*\n` +
                  `│     Saba ke baare mein\n` +
                  `│\n` +
                  `│  📊 *.arslanstats*\n` +
                  `│     AI stats\n` +
                  `│\n` +
                  `│  🗑️ *.clearchat*\n` +
                  `│     Memory clear\n` +
                  `│\n` +
                  `│  💡 *Auto:* Private chat mein\n` +
                  `│     bina command likho, Arslan AI\n` +
                  `│     khud reply karega! 👑\n` +
                  `│\n` +
                  `│  💚 ARSLAN TECH'S\n` +
                  `│\n` +
                  `╰─────────────────────────╯`
        }, { quoted: msg });
    }
};