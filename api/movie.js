// api/movie.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const API_KEY = 'YOUR_OMDB_API_KEY'; // omdbapi.com سے حاصل کریں
const BASE_URL = 'http://www.omdbapi.com/';

async function searchMovie(title) {
    try {
        const url = `${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;
        const response = await axios.get(url);
        if (response.data.Response === 'False') return null;
        const data = response.data;
        return {
            title: data.Title,
            year: data.Year,
            rated: data.Rated,
            genre: data.Genre,
            plot: data.Plot?.slice(0, 300) || 'No plot.',
            imdbRating: data.imdbRating,
            poster: data.Poster,
        };
    } catch (err) {
        fancyLog('ERROR', `Movie API error: ${err.message}`);
        return null;
    }
}

module.exports = { searchMovie };