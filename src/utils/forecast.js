const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const urlWeather = `http://api.weatherstack.com/current?access_key=cdfefe544538fddcb4f921a446aa979c&query=${latitude},${longitude}`;
    request({ url: urlWeather, json: true }, (error, response) => {
        if (error) {
            callback('Unable to Connect weather Services..!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try Another search..!', undefined)
        } else {
            let currentTemp = response.body.current.temperature;
            let feelsLikeTemp = response.body.current.feelslike;
            callback(undefined, ` ${response.body.current.weather_descriptions[0]}. It is Currently ${currentTemp} degrees out. It feels like ${feelsLikeTemp} degrees out.`)
        }
    })
}


module.exports = {
    forecast: forecast
}