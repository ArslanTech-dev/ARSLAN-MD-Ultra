// api/weather.js
const axios = require('axios');
const { fancyLog } = require('../utils/logger');

const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // اپنی کلید ڈالیں
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        return {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            wind: data.wind.speed,
            icon: data.weather[0].icon,
        };
    } catch (err) {
        fancyLog('ERROR', `Weather API error: ${err.message}`);
        return null;
    }
}

module.exports = { getWeather };