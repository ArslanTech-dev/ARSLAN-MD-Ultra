// api/reddit.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

async function getRedditPost(subreddit = 'memes', limit = 10) {
    try {
        const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`;
        const response = await axios.get(url, { headers: { 'User-Agent': 'ARSLAN-MD/1.0' } });
        const posts = response.data.data.children.map(child => child.data);
        const images = posts.filter(p => p.post_hint === 'image');
        if (!images.length) return null;
        const post = images[Math.floor(Math.random() * images.length)];
        return {
            title: post.title,
            url: post.url,
            ups: post.ups,
            comments: post.num_comments,
            subreddit: post.subreddit,
        };
    } catch (err) {
        fancyLog('ERROR', `Reddit API error: ${err.message}`);
        return null;
    }
}

module.exports = { getRedditPost };