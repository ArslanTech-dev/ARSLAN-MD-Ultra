// api/joke.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

async function getJoke() {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
        return response.data.joke || null;
    } catch (err) {
        fancyLog('ERROR', `Joke API error: ${err.message}`);
        return null;
    }
}

module.exports = { getJoke };