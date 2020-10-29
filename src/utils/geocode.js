const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJoaW5hdmt1c2hhZ3JhIiwiYSI6ImNrZzRuanQ5MzAyd2MycnIwMThrNXY3dXIifQ.HMWWvT3-yPfxKuPp8CtWcw&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback ({Error: "Unable to connect to the map services"})
        }
        else if (body.message || body.features.length === 0) {
            callback ({Error : body.message ? body.message : 'Unable to find location. Try another search!'})
        }
        else {
            const data = body
            callback (undefined,{
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                place: data.features[0].place_name
            })
        }
    })
}

module.exports = geocode
