const express = require("express");
const bodyparser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apikey = "576b5ee3820e3500ebf93fb55cb66e94";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){

            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

            
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature of " + query + " is " + temp + " degree celcius</h1>");
            res.write("<img src = " + imageurl + ">");
            res.send();
        });    
    });

});

app.listen(3000,function(){
    console.log("server is started");
});