const request = require('request');
const geoCode = (address,callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9oYW5rYWxlMzMiLCJhIjoiY2t3Z2Uxc3o3MG5sZTJ2bWplM3FzcmhodiJ9.jR1Ay_5SHQ4Ol0vvAyKlZQ&limit=1`;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to Connect location Services..!',undefined)
        }else if(response.body.features.length ===0){
            callback('Unable to find location. Try Another search..!', undefined)
        }else{
            let latitude = response.body.features[0].center[1];
            let longitude = response.body.features[0].center[0];
            let placeName = response.body.features[0].place_name;
            callback(undefined,{
                latitude:latitude,
                longitude:longitude,
                location:placeName
            })
        }
    })
}

module.exports = {
    geoCode:geoCode
}