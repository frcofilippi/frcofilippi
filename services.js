const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://api.weatherapi.com/' 
});

module.exports = instance;
