// api/translate.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const BASE_URL = 'https://api.mymemory.translated.net/get';

async function translate(text, targetLang = 'ur', sourceLang = 'en') {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
        const response = await axios.get(url);
        return response.data.responseData.translatedText || null;
    } catch (err) {
        fancyLog('ERROR', `Translate API error: ${err.message}`);
        return null;
    }
}

module.exports = { translate };