// api/aiimage.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const HF_TOKEN = 'YOUR_HUGGINGFACE_TOKEN'; // huggingface.co سے
const MODEL = 'runwayml/stable-diffusion-v1-5';

async function generateImage(prompt) {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api-inference.huggingface.co/models/${MODEL}`,
            headers: { Authorization: `Bearer ${HF_TOKEN}` },
            data: { inputs: prompt },
            responseType: 'arraybuffer',
        });
        return Buffer.from(response.data, 'binary');
    } catch (err) {
        fancyLog('ERROR', `AI Image API error: ${err.message}`);
        return null;
    }
}

module.exports = { generateImage };