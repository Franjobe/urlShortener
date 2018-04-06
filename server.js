// SERVER.js - where your node app starts

// init project
var express = require('express');
var app = express();
var path = require ("path");
var routes =require("./routes/routes.js");
var mongoose = require("mongoose");


// CONFIGURE APP (view engines)



// USE MIDDLEWARE

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use("/",routes);  //use routes file for every url.


// CONNECT DB

mongoose.connect(process.env.MONGODB_URI,{})  //CONECTA LA DB a traés de la URI en .env | useMongoClient:true siempre va!!!
        .then(function(){console.log("DB connected")});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
