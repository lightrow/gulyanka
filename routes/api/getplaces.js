var express = require('express');
var router = express.Router();
var request = require('request');
var placekey = 'AIzaSyDMjbGUjGDQvv0OrSsywknkFGXd7Yfyxrg';
var geokey = 'AIzaSyBmE_Hutx3XU261LRizJjgV7Vs493z5gZI'

router.get('/', function (req, res, next) {

  var address = "Moscow";
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + geokey;

  request(url, function (err, response, body) {
    var longtitude = JSON.parse(body).results[0].geometry.location.lng;
    var latitude = JSON.parse(body).results[0].geometry.location.lat;
    var location = latitude + ',' + longtitude
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location +
      '&radius=500&type=bar&key=' + placekey;
    request(url, function (err, response, body) {
      
      res.end(body);
    });
  });

});

module.exports = router;
