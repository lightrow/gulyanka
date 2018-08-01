var oauth = require("oauth");

var _mongourl = "mongodb://guest:1234@ds125288.mlab.com:25288/mlabdb";
var _twitterConsumerKey = "mqMuivEEFDyBNekQBk56PMMSa";
var _twitterConsumerSecret = "b7Q6sPdVHJDB4TTehG1dOyyDAdm2TV1JUscXc9XHOe5T7w4blV";
var _placekey = 'AIzaSyDMjbGUjGDQvv0OrSsywknkFGXd7Yfyxrg';
var _geokey = 'AIzaSyBmE_Hutx3XU261LRizJjgV7Vs493z5gZI'
var _db = "mlabdb";
var _collection = "gulyanka-db";

var _consumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  _twitterConsumerKey,
  _twitterConsumerSecret,
  "1.0A",
  "http://localhost:3000/auth",
  "HMAC-SHA1"
);

module.exports = {
  twitterConsumerKey: _twitterConsumerKey,
  twitterConsumerSecret: _twitterConsumerSecret,
  consumer: _consumer,
  placekey: _placekey,
  geokey: _geokey,
  mongourl: _mongourl,
  db: _db,
  collection: _collection
};
