const axios = require ('axios') ;

module.exports = handelWeather ;

function handelWeather (city) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;

    return axios.get(url)
    .then(results => {
        const weatherArry = results.data.data.map(day => new Day (day));
        return weatherArry
    })
}

class  Day {
    constructor (day) {
        this.data =day.valid_data
        this.descriiption = day.weather.descriiption
    }
} 
