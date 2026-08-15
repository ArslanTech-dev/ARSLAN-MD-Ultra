// api/github.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const BASE_URL = 'https://api.github.com';

async function getUser(username) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${username}`);
        const data = response.data;
        return {
            username: data.login,
            name: data.name,
            bio: data.bio,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            avatar: data.avatar_url,
            url: data.html_url,
        };
    } catch (err) {
        fancyLog('ERROR', `GitHub API error: ${err.message}`);
        return null;
    }
}

async function getRepo(username, repo) {
    try {
        const response = await axios.get(`${BASE_URL}/repos/${username}/${repo}`);
        const data = response.data;
        return {
            name: data.name,
            description: data.description,
            stars: data.stargazers_count,
            forks: data.forks_count,
            language: data.language,
            url: data.html_url,
        };
    } catch (err) {
        fancyLog('ERROR', `GitHub repo API error: ${err.message}`);
        return null;
    }
}

module.exports = { getUser, getRepo };