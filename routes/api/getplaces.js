var express = require('express');
var router = express.Router();
var request = require('request');
var utf8 = require('utf8');

var placekey = 'AIzaSyDMjbGUjGDQvv0OrSsywknkFGXd7Yfyxrg';
var geokey = 'AIzaSyBmE_Hutx3XU261LRizJjgV7Vs493z5gZI'

router.get('/', function (req, res, next) {

  if (req.query.city != "") {
    var address = utf8.encode(req.query.city);
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + geokey;
    request(url, (error, response, body) => {
      if (response.statusCode === 200 && JSON.parse(body).status === 'OK') {
        console.log(response.statusCode)
        var longtitude = JSON.parse(body).results[0].geometry.location.lng;
        var latitude = JSON.parse(body).results[0].geometry.location.lat;
        var location = latitude + ',' + longtitude
        url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + location +
          '&radius=500&type=bar&key=' + placekey;
        request(url, function (err, response, body2) {
          res.end(body2);
        });
      } else {
        //res.end(JSON.stringify("BAD"))
        res.end(body);
      }
    })
  } else {
    res.end(JSON.stringify({ status: "NO_INPUT" }))
  }
});

module.exports = router;
