// https://coligo.io/create-url-shortener-with-node-express-mongo/

// entender como funciona el counter de mongo.
// agregar check si ya existe una url, volver a colocar el mismo. 
// quitar el go.


var express = require("express");
var router = express.Router();
var path = require("path");
var base58 = require ("../modules/base58.js"); // LOAD BASE58 LOGICS
var Url = require ("../model/url.js");         // LOAD URL SCHEMA
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); //bodyparser puts everything from FORMS in the body property of the req.


//MIDDLEWARE for ROUTING
router.use(express.json());            // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// DEFINING ROUTES

// HOMEPAGE
router.get("/", function (req, res) {      
      res.sendFile(path.join(__dirname, '..', '/views/index.html'));  
});



// ENCODE URL
router.get("/new/:site*", function(req, res){
        
    var mySite =  req.params['site'] + req.params[0]; //req.params.site sería el ideal, pero este otro permite get the http. 
  
    // CREATE INSTANCE of Url model. 
    var date = new Date();
    var newLongUrl = new Url({long_url:mySite, created_at: date});
        
    // Check if it already exists.
  /*
    Url.findOne({long_url:mySite},function(err,item){
    if (err) {console.log(err)};
    if(item.length){
    console.log(item);
    res.send(item);
          
    } else {
      console.log("lalala");
      res.send("lalalaaaaa");
    }});
    */
      
  
    // SAVE INSTANCE IN DB
    newLongUrl.save().then(function(result){
                   
              //encode the id of long Url.
              var encoding = base58.encode(result._id);                                        
              var fullShortUrl = req.protocol + '://' + req.get('host') + "/go/" + encoding;  // + req.originalUrl + encoding
                   
              // create the output
              var output = {"original_url": mySite, "short_url": fullShortUrl};
              res.send(output);
                   
              // handle err, se maneja al final x ser una promise.
              }, function(err){                       
                 console.log(err);
                 res.send("No la pudimos guardar");
                 });
    
});


// DECODE URL.
router.get("/go/:shortSite*", function(req, res){
        var short = req.params.shortSite; //['shortSite'] + req.params[0]; 
        var decoding = base58.decode(short);               //convert the short url into the ID number
        Url.find({"_id":decoding}, function(err, data){     //find the id and the objetc
        if (err){console.log("id no encontrado")}   
        var longUrl = data[0].long_url;                     //select the long_url value
        res.redirect(longUrl);                              //redirect.
});
});  
    
  



// GET ALL THE DATA
router.get("/all", function(req, res){
          Url.find({}, function(err, data){
          res.send(data);
          });
});



module.exports = router;
