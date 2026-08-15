// api/tts.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

async function textToSpeech(text, voice = 'Brian') {
    try {
        const url = `https://api.streamelements.com/kappa/v2/speech?voice=${voice}&text=${encodeURIComponent(text)}`;
        const response = await axios({ url, method: 'get', responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    } catch (err) {
        fancyLog('ERROR', `TTS API error: ${err.message}`);
        return null;
    }
}

module.exports = { textToSpeech };