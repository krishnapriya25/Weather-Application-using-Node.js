const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/364724203f2cadddcfeba9b7eb718901/' + latitude + ',' + longitude + '?units=si&lang=en'

   request({url, json: true}, (error, {body}) => {
    if(error){
        callback('Uanble to connect to weather service!',undefined)
    }
    else if(body.error){
        callback('Unable to find location!Try with different values',undefined)
    }
    else {
        console.log(body.daily.data[0])
        callback(undefined, body.daily.data[0].summary + " It is currently "+ body.currently.temperature + " degrees out. The temperature high today is " + body.daily.data[0].temperatureHigh + " with low as " + body.daily.data[0].temperatureLow + " , current UvIndex is  " + body.daily.data[0].uvIndex + ". There is " + body.currently.precipProbability + "% chances of rain")
    }
   })
}


module.exports = forecast