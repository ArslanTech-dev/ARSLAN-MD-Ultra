// plugins/beautiful-girls.js
// Commands for beautiful girls from all over the world
// .beautiful (random), .pakistan, .india, .russia, .turkey, .brazil, .japan, .korea, .italy, .france, .usa, .uk, .ukraine, .iran, .lebanon, .egypt, .nigeria, .canada, .australia, .spain, .greece, .netherlands

const axios = require('axios');
const { fancyLog } = require('../utils/logger');

// ─── Unsplash API ──────────────────────────────
const UNSPLASH_KEY = 'eS_6oT7X9R9GbPogdaISk2_rC4nM1wK7vhZsnk0RKWI'; // ← Your API Key
const UNSPLASH_URL = 'https://api.unsplash.com/photos/random';

// ─── All Countries ─────────────────────────────
const countries = {
    pakistan: { name: '🇵🇰 Pakistan', query: 'pakistani girl' },
    india: { name: '🇮🇳 India', query: 'indian girl' },
    russia: { name: '🇷🇺 Russia', query: 'russian girl' },
    turkey: { name: '🇹🇷 Turkey', query: 'turkish girl' },
    brazil: { name: '🇧🇷 Brazil', query: 'brazilian girl' },
    japan: { name: '🇯🇵 Japan', query: 'japanese girl' },
    korea: { name: '🇰🇷 South Korea', query: 'korean girl' },
    italy: { name: '🇮🇹 Italy', query: 'italian girl' },
    france: { name: '🇫🇷 France', query: 'french girl' },
    usa: { name: '🇺🇸 USA', query: 'american girl' },
    uk: { name: '🇬🇧 UK', query: 'british girl' },
    ukraine: { name: '🇺🇦 Ukraine', query: 'ukrainian girl' },
    iran: { name: '🇮🇷 Iran', query: 'iranian girl' },
    lebanon: { name: '🇱🇧 Lebanon', query: 'lebanese girl' },
    egypt: { name: '🇪🇬 Egypt', query: 'egyptian girl' },
    nigeria: { name: '🇳🇬 Nigeria', query: 'nigerian girl' },
    canada: { name: '🇨🇦 Canada', query: 'canadian girl' },
    australia: { name: '🇦🇺 Australia', query: 'australian girl' },
    spain: { name: '🇪🇸 Spain', query: 'spanish girl' },
    greece: { name: '🇬🇷 Greece', query: 'greek girl' },
    netherlands: { name: '🇳🇱 Netherlands', query: 'dutch girl' },
};

// ─── Fallback Images ───────────────────────────
const fallbackImages = [
    'https://i.pinimg.com/564x/3b/8a/d2/3b8ad2c7b1d4e8f9a0c6e5d4f3a2b1c0.jpg',
    'https://i.pinimg.com/564x/5c/6d/7e/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f.jpg',
    'https://i.pinimg.com/564x/7e/8f/9a/7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b.jpg',
];

// ─── Quotes ──────────────────────────────────────
const quotes = [
    "😍 SubhanAllah! Kya khoobsurat hai!",
    "💕 Beauty at its finest!",
    "🌟 Allah ki khoobsurat makhlooq!",
    "🔥 Kya baat hai!",
    "😊 MashaAllah!",
    "💖 Beautiful like a rose!",
    "🌹 No filter needed!",
    "✨ Dil garden garden!",
    "😍 Just wow!",
    "💫 SubhanAllah!",
    "🌺 Gorgeous!",
    "💋 Stunning!",
    "🌸 Beautiful soul!",
];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ─── Helper: Send image ────────────────────────
async function sendImage(ctx, countryKey) {
    const from = ctx.from;
    const country = countries[countryKey];
    if (!country) return;

    await ctx.react('😍');
    const query = country.query;
    const countryName = country.name;

    try {
        const response = await axios.get(UNSPLASH_URL, {
            params: {
                query: query,
                count: 1,
                orientation: 'portrait',
                featured: true
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_KEY}`
            }
        });

        const data = response.data;
        const imgUrl = data[0]?.urls?.regular || data?.urls?.regular || random(fallbackImages);
        const photographer = data[0]?.user?.name || data?.user?.name || 'Unknown';
        const quote = random(quotes);

        await ctx.sock.sendMessage(from, {
            image: { url: imgUrl },
            caption: `╭─⬡ 😍 *BEAUTY FROM ${countryName}* 😍 ⬡─╮\n│\n│  ${quote}\n│\n│  📍 ${countryName}\n│  📸 Photo by ${photographer}\n│  🔗 Powered by Unsplash\n│\n│  💖 Just for fun!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        await ctx.react('✅');
        fancyLog('BEAUTIFUL', `Girl pic sent from ${countryName}`);

    } catch (err) {
        fancyLog('ERROR', `Beautiful API error: ${err.message}`);

        const imgUrl = random(fallbackImages);
        const quote = random(quotes);

        await ctx.sock.sendMessage(from, {
            image: { url: imgUrl },
            caption: `╭─⬡ 😍 *BEAUTY FROM ${countryName}* 😍 ⬡─╮\n│\n│  ${quote}\n│\n│  📍 ${countryName}\n│  📸 Fallback Image\n│  💖 Just for fun!\n│\n╰─────────────────────────╯`
        }, { quoted: ctx.msg });

        await ctx.react('✅');
        fancyLog('BEAUTIFUL', `Fallback girl pic sent from ${countryName}`);
    }
}

// ─── Exports ────────────────────────────────────
module.exports = {
    // ─── .beautiful (Random) ─────────────────────
    beautiful: async (ctx) => {
        const keys = Object.keys(countries);
        const randomKey = random(keys);
        await sendImage(ctx, randomKey);
    },

    // ─── All Country Commands ────────────────────
    pakistan: async (ctx) => { await sendImage(ctx, 'pakistan'); },
    india: async (ctx) => { await sendImage(ctx, 'india'); },
    russia: async (ctx) => { await sendImage(ctx, 'russia'); },
    turkey: async (ctx) => { await sendImage(ctx, 'turkey'); },
    brazil: async (ctx) => { await sendImage(ctx, 'brazil'); },
    japan: async (ctx) => { await sendImage(ctx, 'japan'); },
    korea: async (ctx) => { await sendImage(ctx, 'korea'); },
    italy: async (ctx) => { await sendImage(ctx, 'italy'); },
    france: async (ctx) => { await sendImage(ctx, 'france'); },
    usa: async (ctx) => { await sendImage(ctx, 'usa'); },
    uk: async (ctx) => { await sendImage(ctx, 'uk'); },
    ukraine: async (ctx) => { await sendImage(ctx, 'ukraine'); },
    iran: async (ctx) => { await sendImage(ctx, 'iran'); },
    lebanon: async (ctx) => { await sendImage(ctx, 'lebanon'); },
    egypt: async (ctx) => { await sendImage(ctx, 'egypt'); },
    nigeria: async (ctx) => { await sendImage(ctx, 'nigeria'); },
    canada: async (ctx) => { await sendImage(ctx, 'canada'); },
    australia: async (ctx) => { await sendImage(ctx, 'australia'); },
    spain: async (ctx) => { await sendImage(ctx, 'spain'); },
    greece: async (ctx) => { await sendImage(ctx, 'greece'); },
    netherlands: async (ctx) => { await sendImage(ctx, 'netherlands'); },
};