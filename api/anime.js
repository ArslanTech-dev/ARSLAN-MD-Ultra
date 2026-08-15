// api/anime.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const BASE_URL = 'https://api.jikan.moe/v4/anime';

async function searchAnime(query) {
    try {
        const response = await axios.get(`${BASE_URL}?q=${encodeURIComponent(query)}&limit=1`);
        const data = response.data.data[0];
        if (!data) return null;
        return {
            title: data.title,
            year: data.year || 'N/A',
            score: data.score || 'N/A',
            synopsis: data.synopsis?.slice(0, 300) || 'No synopsis.',
            url: data.url,
            image: data.images?.jpg?.image_url || null,
        };
    } catch (err) {
        fancyLog('ERROR', `Anime API error: ${err.message}`);
        return null;
    }
}

module.exports = { searchAnime };