var express = require('express');
var router = express.Router();
var request = require('request');

var placekey = "AIzaSyDMjbGUjGDQvv0OrSsywknkFGXd7Yfyxrg"
var maxwidth = "1900";

router.get('/', function (req, res, next) {
  var placeid = req.query.placeid;
  var photoref = req.query.photoref;

  var urlPlace = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
    placeid +
    "&key=" +
    placekey;
  
  var urlPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
    maxwidth +
    "&photoreference=" +
    photoref +
    "&key=" +
    placekey;
  
  var photoHref;
  
  request(urlPhoto, (error1, response1, body1) => {
    photoHref = JSON.stringify(response1.request.uri.href);
    request(urlPlace, (error2, response2, body2) => {
      body2 = JSON.parse(body2).result;
      body2.photo = photoHref;
      res.end(JSON.stringify(body2));
    })
  })

});

module.exports = router;
