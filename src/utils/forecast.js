const request = require('request')

const forecast = function(lat , long, callback){
    let url = "https://api.darksky.net/forecast/6453675e1107ad2c65f4f23c1ced7495/"+lat+"," + long+"?exclude=minutely,hourly,daily,alerts,flags&units=si";

    request({url , json : true} , (error , {body})=>{
        if(error)
            callback("Unable to Connect, error in forecast.js")
        else if(body.error)
            callback("Incorrect Request");

        else{
            callback(undefined , body)
        }
    })
}

module.exports = forecast;

