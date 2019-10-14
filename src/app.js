const express = require('express');
const path = require('path')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;
// Setting paths
const dirpath = path.join(__dirname , "../public");
const viewsPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname , "../templates/partials");

//Set express and hbs values
app.set('view engine' , 'hbs');
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(dirpath));


app.get('' ,(req , res)=>{
    res.render('index' , {
        title : "Weather App" , 
        name : "Piyush Danej"
    });
})

app.get('/about' , (req, res)=>{
    res.render('about' , {
        title : "About Page" , 
        name : "Piyush Danej"
    });
});


app.get('/help' , (req , res)=>{
    res.render('help' , {
        title:"Help Page" , 
        message : "Call me",
        name : "Piyush Danej"

    })
})

app.get('/weather' , (req, res)=>{
    if(!req.query.city){
        return res.send("Please provide a City")
    }
    if(!req.query.country){
        return res.send("Please provide a Country")
    }

    geocode(req.query.city , req.query.country , (err , {latitude ,longitude ,place }= {} ) =>{
        if(err){
            res.send({ "error" : 
                        "Unable to Connect , Geocode.js error"})
        }
        else{
            forecast(latitude , longitude , (error , {currently})=>{
                if(error){
                   return res.send("error : " , error)
                }
                else{
                    // res.send("City : " + place + '\nSmmary : ',
                    //          currently.summary + "\nTemperature : " +
                    //           currently.temperature + " degrees")
                    res.send({
                        City : place, 
                        Summary : currently.summary , 
                        Temperature : currently.temperature+" degrees",
                        windSpeed : currently.windSpeed
                    })
                }

            })
        }
    })
})

app.get('/help/*' , (req , res)=>{
    res.render('genericError' ,{
        errorMessage : "Help article not found"
    })
})


app.get('/products' , (req, res)=>{

    if(!req.query.search){
        return res.send("Please provide a search term")
    }
    console.log(req.query);
    res.send({
        products : []
    })
})

// app.get('/address' , (req,res)=>{
//     if(!req.query.address){
//         return res.send("Please provide an address")
//     }

//     res.send({
//         address : req.query.address
//     })
// })

//====== Always last==========
app.get('*' , (req , res)=>{
    res.render('genericError' , {
        errorMessage :"Page not found" 
    })
})

//========================
app.listen(port , ()=>{
    console.log("Server up")
});
