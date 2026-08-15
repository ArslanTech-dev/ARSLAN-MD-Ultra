// api/meme.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const BASE_URL = 'https://api.imgflip.com';

async function generateMeme(templateId, text0, text1) {
    try {
        const url = `https://api.memegen.link/images/${templateId}/${encodeURIComponent(text0)}/${encodeURIComponent(text1)}.jpg`;
        return url;
    } catch (err) {
        fancyLog('ERROR', `Meme API error: ${err.message}`);
        return null;
    }
}

async function getTemplates(limit = 10) {
    try {
        const response = await axios.get(`${BASE_URL}/get_memes`);
        return response.data.data.memes.slice(0, limit);
    } catch (err) {
        fancyLog('ERROR', `Meme templates API error: ${err.message}`);
        return null;
    }
}

module.exports = { generateMeme, getTemplates };