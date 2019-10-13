const request = require('request');

const geocode = (address , country , callback)=>{
    // if(country)
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?country="+country+"&access_token=pk.eyJ1IjoicGl5dXNoZGFuZWoiLCJhIjoiY2sxaGJxbGR6MGR4NTNtcGNhZnk5cjZ4aSJ9.4BOP7hfuuVLBIop3bncYYQ"
    // else 
    // var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicGl5dXNoZGFuZWoiLCJhIjoiY2sxaGJxbGR6MGR4NTNtcGNhZnk5cjZ4aSJ9.4BOP7hfuuVLBIop3bncYYQ"
   
    // console.log("formed url : " , url);
    request({url , json : true}, (error , response)=>{
        // console.log("response : " +JSON.stringify(response.body));
        if(error){
            console.log("response : " +JSON.stringify(error));
            callback('Unable to connect, Error in geocode.js')
        }
        else if(response.body.message){
            callback("Not a proper call");
        }
        
        else if(response.body.features.length === 0 ){
            callback("No Result , try another search")
        }
        else{
            callback(undefined , {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                place : response.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;