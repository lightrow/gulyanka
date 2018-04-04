var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs')

var placekey = "AIzaSyDMjbGUjGDQvv0OrSsywknkFGXd7Yfyxrg"


router.get('/', function (req, res, next) {
  var photoref = req.query.photoref;
  var urlPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
    maxwidth +
    "&photoreference=" +
    photoref +
    "&key=" +
    placekey;
  request(url, (error, response, body) => {
    res.end(JSON.stringify(response.request.uri.href))
  })
});

module.exports = router;
