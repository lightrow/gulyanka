var express = require("express");
var router = express.Router();
var request = require("request");

var utils = require("../../utils");

var maxwidth = "1200";

router.get("/", function(req, res, next) {
  var placeid = req.query.placeid;
  var photoref = req.query.photoref;

  var urlPlace =
    "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
    placeid +
    "&key=" +
    utils.geokey;

  request(urlPlace, (error, response, body) => {
    body = JSON.parse(body);
    var resObj = {
      details: body,
      status: body.status
    };
    res.end(JSON.stringify(resObj));
  });
});

module.exports = router;
