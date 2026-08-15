// api/urban.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

async function define(term) {
    try {
        const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`;
        const response = await axios.get(url);
        const entry = response.data.list[0];
        if (!entry) return null;
        return {
            definition: entry.definition.slice(0, 500) + '...',
            example: entry.example?.slice(0, 300) || 'No example.',
            thumbs_up: entry.thumbs_up,
            thumbs_down: entry.thumbs_down,
        };
    } catch (err) {
        fancyLog('ERROR', `Urban API error: ${err.message}`);
        return null;
    }
}

module.exports = { define };