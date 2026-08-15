// api/news.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const RSS_URL = 'https://feeds.bbci.co.uk/news/rss.xml';

async function getNews(limit = 5) {
    try {
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
        const response = await axios.get(url);
        const items = response.data.items.slice(0, limit);
        return items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: item.description.replace(/<[^>]*>/g, '').slice(0, 200) + '...',
        }));
    } catch (err) {
        fancyLog('ERROR', `News API error: ${err.message}`);
        return null;
    }
}

module.exports = { getNews };