const axios = require('axios');

module.exports = handelWeather;
let inMemo = {};

function handelWeather(req, res) {
    let { searchQuery, lat, lon } = (req.query);
    let weatherKey = process.env.WEATHER_BIT_KEY;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}`;

    console.log(weatherUrl);
    console.log(inMemo[searchQuery]);
    if (!inMemo[searchQuery] == undefined) {
        res.send(inMemo[searchQuery]);
    } else {
        axios.get(weatherUrl)
            .then(result => {
                const weatherArr = result.data.data.map(weatherItem => {
                    return new Day(weatherItem)

                })
                inMemo[searchQuery] = weatherArr;
                res.send(weatherArr);

            }).catch(error =>{
                res.status(200).send(`error in getting data ${error}`);
            })
    }
}

class Day {
    constructor(weatherItem) {
        this.data = weatherItem.datetime
        this.description = weatherItem.weather.description
        this.name = weatherItem.city_name;

    }
}
