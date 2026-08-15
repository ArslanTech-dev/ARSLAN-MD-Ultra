// api/fact.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

async function getFact() {
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
        return response.data.text || null;
    } catch (err) {
        fancyLog('ERROR', `Fact API error: ${err.message}`);
        return null;
    }
}

module.exports = { getFact };