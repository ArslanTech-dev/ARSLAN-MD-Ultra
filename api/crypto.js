// api/crypto.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const BASE_URL = 'https://api.coingecko.com/api/v3/simple/price';

async function getCryptoPrice(coin, currency = 'usd') {
    try {
        const url = `${BASE_URL}?ids=${coin.toLowerCase()}&vs_currencies=${currency}&include_24hr_change=true`;
        const response = await axios.get(url);
        const data = response.data[coin.toLowerCase()];
        if (!data) return null;
        return {
            price: data[currency],
            change: data[`${currency}_24h_change`]?.toFixed(2) || 'N/A',
        };
    } catch (err) {
        fancyLog('ERROR', `Crypto API error: ${err.message}`);
        return null;
    }
}

async function getTopCoins(limit = 10) {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`;
        const response = await axios.get(url);
        return response.data.map(coin => ({
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change: coin.price_change_percentage_24h?.toFixed(2) || 'N/A',
        }));
    } catch (err) {
        fancyLog('ERROR', `Top coins API error: ${err.message}`);
        return null;
    }
}

module.exports = { getCryptoPrice, getTopCoins };