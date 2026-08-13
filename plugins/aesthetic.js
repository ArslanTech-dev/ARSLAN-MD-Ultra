/**
 * ================================================
 * plugins/aesthetic.js
 * Aesthetic, mood, aur relaxation commands
 * Roman Urdu – Vertical Format
 * ================================================
 */

const { fancyLog } = require('../utils/logger');

// ─── Aesthetic quotes ────────────────────────────
const aestheticQuotes = [
    "✨ Chandni raat, khayal tumhara",
    "🌙 Sitaron mein chhupi hai ek kahani",
    "🌸 Phoolon ki mehak, jaise teri hansi",
    "🌊 Samandar ki lehren, jaise teri baatein",
    "☁️ Badal mein chhupa hai ek khwab",
    "🌅 Subah ki pehli kirne, teri yaad",
    "🌌 Aasman mein bikre sitare, teri ankhon mein",
    "🍃 Hawa ka jhonka, tera ehsaas",
    "💫 Kainat mein kho jaana, tere saath",
    "🌿 Khushi ki ek chhoti si kahani"
];

// ─── Aesthetic moods ─────────────────────────────
const aestheticMoods = [
    {
        mood: "🌙 Chandni Raat",
        vibe: "Purani yaadein aur khayalon ki duniya",
        emoji: "🌙✨"
    },
    {
        mood: "🌸 Bahar ka Mausam",
        vibe: "Khushbu, rang, aur naye sapne",
        emoji: "🌸🌿"
    },
    {
        mood: "🌊 Samandar Kinara",
        vibe: "Lehron ki awaz aur sukoon",
        emoji: "🌊🌅"
    },
    {
        mood: "☕ Coffee ka Cup",
        vibe: "Thandi hawa aur garm chai ki chuski",
        emoji: "☕🍂"
    },
    {
        mood: "🌄 Pahadi Manzar",
        vibe: "Khamoshi aur bulandiyan",
        emoji: "🏔️🌿"
    },
    {
        mood: "🌌 Raat ka Aasman",
        vibe: "Sitare, khwab aur beinteha",
        emoji: "🌌✨"
    }
];

// ─── Aesthetic colors (soft) ──────────────────────
const aestheticColors = [
    { name: "🌹 Gulabi", hex: "#FFB6C1" },
    { name: "🌊 Neeli", hex: "#87CEEB" },
    { name: "🍃 Hara", hex: "#98FB98" },
    { name: "🌙 Peeli", hex: "#FFFACD" },
    { name: "💜 Jaamni", hex: "#D8BFD8" },
    { name: "🍑 Aru", hex: "#FFDAB9" }
];

// ─── Random aesthetic quote ──────────────────────
function getRandomQuote() {
    return aestheticQuotes[Math.floor(Math.random() * aestheticQuotes.length)];
}

function getRandomMood() {
    return aestheticMoods[Math.floor(Math.random() * aestheticMoods.length)];
}

function getRandomColor() {
    return aestheticColors[Math.floor(Math.random() * aestheticColors.length)];
}

module.exports = {

    /**
     * .aesthetic – Random aesthetic vibe
     */
    aesthetic: async (ctx) => {
        await ctx.react('✨');
        const quote = getRandomQuote();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ ✨ *AESTHETIC VIBE* ✨ ⬡─╮\n` +
                      `│\n` +
                      `│  ${quote}\n` +
                      `│\n` +
                      `│  🌙 • ☁️ • 🌸 • 🌊 • 🌿\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('AESTHETIC', 'Aesthetic vibe sent');
    },

    /**
     * .mood – Daily aesthetic mood
     */
    mood: async (ctx) => {
        await ctx.react('🌿');
        const mood = getRandomMood();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🌿 *TODAY'S AESTHETIC MOOD* 🌿 ⬡─╮\n` +
                      `│\n` +
                      `│  ${mood.emoji}  *${mood.mood}*\n` +
                      `│  📝 ${mood.vibe}\n` +
                      `│\n` +
                      `│  🕊️ • 🌸 • 🌙 • ☕ • 🌊\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💫');
        fancyLog('AESTHETIC', 'Mood sent');
    },

    /**
     * .aestheticcolor – Soft aesthetic color
     */
    aestheticcolor: async (ctx) => {
        await ctx.react('🎨');
        const color = getRandomColor();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🎨 *AESTHETIC COLOR* 🎨 ⬡─╮\n` +
                      `│\n` +
                      `│  ${color.name}\n` +
                      `│  🎨 Hex: ${color.hex}\n` +
                      `│\n` +
                      `│  💫 • 🌸 • 🍃 • 🌙 • 💜\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('AESTHETIC', 'Color sent');
    },

    /**
     * .aestheticquote – Random aesthetic quote
     */
    aestheticquote: async (ctx) => {
        await ctx.react('📝');
        const quote = getRandomQuote();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 📝 *AESTHETIC QUOTE* 📝 ⬡─╮\n` +
                      `│\n` +
                      `│  ✨ "${quote}"\n` +
                      `│\n` +
                      `│  🌙 • ☁️ • 🌸 • 🌊 • 🌿\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🌟');
        fancyLog('AESTHETIC', 'Quote sent');
    },

    /**
     * .aestheticwall – Aesthetic wallpaper suggestion
     */
    aestheticwall: async (ctx) => {
        await ctx.react('🖼️');
        const walls = [
            "🌅 Sunset over the ocean",
            "🌌 Starry night sky",
            "🌸 Cherry blossom tree",
            "🌿 Green forest path",
            "🌊 Waves crashing on rocks",
            "🌙 Moonlit lake",
            "☁️ Soft clouds at dawn",
            "🍂 Autumn leaves falling"
        ];
        const wall = walls[Math.floor(Math.random() * walls.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🖼️ *AESTHETIC WALLPAPER* 🖼️ ⬡─╮\n` +
                      `│\n` +
                      `│  🎨 ${wall}\n` +
                      `│  📸 Search on Unsplash\n` +
                      `│\n` +
                      `│  🌙 • ☁️ • 🌸 • 🌊 • 🌿\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('✅');
        fancyLog('AESTHETIC', 'Wallpaper suggestion sent');
    },

    /**
     * .aestheticplaylist – Aesthetic music suggestion
     */
    aestheticplaylist: async (ctx) => {
        await ctx.react('🎵');
        const songs = [
            "🎧 Lofi – Chill study beats",
            "🎶 Jazz – Smooth and calm",
            "🎵 Classical – Relaxing piano",
            "🎼 Ambient – Nature sounds",
            "🎤 Indie – Soft vocals",
            "🎹 Instrumental – Peaceful melodies"
        ];
        const song = songs[Math.floor(Math.random() * songs.length)];
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🎵 *AESTHETIC PLAYLIST* 🎵 ⬡─╮\n` +
                      `│\n` +
                      `│  🎧 ${song}\n` +
                      `│  💫 Perfect for relaxing\n` +
                      `│\n` +
                      `│  🌙 • ☁️ • 🌸 • 🌊 • 🌿\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('🎶');
        fancyLog('AESTHETIC', 'Playlist suggestion sent');
    },

    /**
     * .aestheticmood – Combined mood + quote
     */
    aestheticmood: async (ctx) => {
        await ctx.react('🌙');
        const mood = getRandomMood();
        const quote = getRandomQuote();
        await ctx.sock.sendMessage(
            ctx.from,
            {
                text: `╭─⬡ 🌙 *AESTHETIC MOOD + QUOTE* 🌙 ⬡─╮\n` +
                      `│\n` +
                      `│  ${mood.emoji}  *${mood.mood}*\n` +
                      `│  📝 ${mood.vibe}\n` +
                      `│\n` +
                      `│  ✨ "${quote}"\n` +
                      `│\n` +
                      `│  🕊️ • 🌸 • 🌙 • ☕ • 🌊\n` +
                      `│\n` +
                      `╰─────────────────────────╯`
            },
            { quoted: ctx.msg }
        );
        await ctx.react('💫');
        fancyLog('AESTHETIC', 'Mood + quote sent');
    }
};