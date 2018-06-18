
"use strict";
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render('index',{weather: null , error:null});
});

app.post('/' , function(req,res){
let city = req.body.city;
let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=00c16143bcdb8028e9bb9d80ec725b97'
 

request(url, function (err, response, body) {
    if(err){
        console.log(err);
      res.render('index',{weather: null , error :'Error, Please try again !'});
    } else {
        let weather = JSON.parse(body);
        console.log(city);
        console.log(weather.main);
        if(weather.main == undefined){
            res.render('index',{weather:null, error:'Error, Please try again Vaderrr'});
        }else 
        {
            let weatherText =weather.main.temp;
            res.render('index',{weather:weatherText , error :null });
        }
    }
  });
})
app.listen(2313 , function(){
    console.log('Example app listening on port 2313');
});