

const express = require('express') 
const app = express()
const weatherData = require('./wether.json');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const cors = require('cors');

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/weather', (req, res) => {

    const lat = req.query.lat;
    const lon = req.query.lon;
    // console.log(lat);
    // console.log(lon);
    if (lat && lon) {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

        axios.get(weatherBitUrl).then(response => {
            const responseData = response.data.data.map(obj => new Weather(obj));
            res.json(responseData)
        }).catch(error => {
            res.send(error.message)
        });
    } else {
        res.send('please check the lat & lon')
    }


});


class Weather {
    constructor(weatherData) {
        this.description = weatherData.weather.description;
        this.date = weatherData.valid_date;

    }
}

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});