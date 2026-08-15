// api/quote.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

async function getQuote() {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        return {
            content: response.data.content,
            author: response.data.author,
        };
    } catch (err) {
        fancyLog('ERROR', `Quote API error: ${err.message}`);
        return null;
    }
}

module.exports = { getQuote };