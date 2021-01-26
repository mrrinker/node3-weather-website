const request = require('request')

const forecast = (latitude, longitude, callback) => 
{
  const url = `http://api.weatherstack.com/current?access_key=455b2224613a8e51cbbfa5fd5c1dc453&query=${latitude},${longitude}`

  request({url, json:true}, (error, {body}) => 
  {
    if (error) 
    {
        callback('Unable to connect to weather service', undefined)
    }
    else if (body.error)
    {
        callback(`Unable to determine weather for ${url}`, undefined)
    }
    else
    {
        callback(undefined, 
            {
                weather:body.current.weather_descriptions[0],
                temperature:body.current.temperature,
                precipitation:body.current.precip
            }
        )
    }
  })
}

module.exports = forecast