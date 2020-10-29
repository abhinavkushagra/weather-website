const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=65b4366118986cb6d2845c6229a57605&query=${encodeURIComponent(latitude)}, ${encodeURIComponent(longitude)}&unit=c`
    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback ({Error: "Unable to connect to the map services"})
        }
        else if(!!body.error) {
            callback ({Error: body.error.info})
        }
        else {
            const data = body
            const temperature = data.current.temperature
            const absoluteTemperature = data.current.feelslike
            callback (undefined, {
                icon: data.current.weather_icons[0],
                forecast: `${data.current.weather_descriptions[0]}: It's currently ${temperature}° out. It feels like ${absoluteTemperature}° out.`
            })
        }
    })
}

module.exports = forecast
