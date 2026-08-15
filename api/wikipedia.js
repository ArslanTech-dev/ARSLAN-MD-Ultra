// api/wikipedia.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

async function searchWiki(query) {
    try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        const response = await axios.get(url);
        const data = response.data;
        if (data.type === 'disambiguation') return null;
        return {
            title: data.title,
            extract: data.extract?.slice(0, 800) + '...' || 'No extract.',
            url: data.content_urls?.mobile?.page || data.content_urls?.desktop?.page,
            image: data.thumbnail?.source || null,
        };
    } catch (err) {
        fancyLog('ERROR', `Wikipedia API error: ${err.message}`);
        return null;
    }
}

module.exports = { searchWiki };