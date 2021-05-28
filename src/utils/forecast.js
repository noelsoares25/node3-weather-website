const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e294e5e3c9c180f77daba4e6501458f7&query='+latitude+','+longitude+'&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions+". It is currently "+body.current.temperature+" out there and it feels like "+body.current.feelslike+" degrees and the humidity is "+body.current.pressure+"%")
        }    
        })
}

module.exports = forecast