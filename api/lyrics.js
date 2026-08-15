// api/lyrics.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const BASE_URL = 'https://api.lyrics.ovh/v1';

async function getLyrics(artist, title) {
    try {
        const url = `${BASE_URL}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
        const response = await axios.get(url);
        return response.data.lyrics || null;
    } catch (err) {
        fancyLog('ERROR', `Lyrics API error: ${err.message}`);
        return null;
    }
}

module.exports = { getLyrics };