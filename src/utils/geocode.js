const request = require('request')

const geocode = (location, callback) => 
{
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibXJyaW5rZXIiLCJhIjoiY2trNjJtaDZlMDBqdDJ1cHl2NjZueGNoMyJ9.Xgdm3eJ_BDFqudXlrbh2hg&limit=1`

  request({url, json:true}, (error, {body}) => 
  {
    if (error) 
    {
        callback('Unable to connect to geolocation service', undefined)
    }
    else if (0 === body.features.length)
    {
        callback('Undetermined location was specifed', undefined)
    }
    else
    {
        callback(undefined, 
            {
                latitude:body.features[0].center[1], 
                longitude:body.features[0].center[0],  
                detailedLocation: body.features[0].place_name
            })
    }
  })
}

module.exports = geocode