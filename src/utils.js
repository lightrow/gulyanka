var oauth = require("oauth");
const SSE = require("express-sse");

var _mongourl = "mongodb://guest:1234@ds125288.mlab.com:25288/mlabdb";
var _twitterConsumerKey = "mqMuivEEFDyBNekQBk56PMMSa";
var _twitterConsumerSecret =
  "b7Q6sPdVHJDB4TTehG1dOyyDAdm2TV1JUscXc9XHOe5T7w4blV";
var _placekey = "AIzaSyC8K66Hs3IKMTnrdhTH3OvKkgOnC11oEIU";
var _geokey = "AIzaSyC8K66Hs3IKMTnrdhTH3OvKkgOnC11oEIU";
var _db = "mlabdb";
var _collection = "gulyanka-db";

var _sse = new SSE(["nothing here"]);

var _consumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  _twitterConsumerKey,
  _twitterConsumerSecret,
  "1.0A",
  "https://localhost:3000/api/callback",
  "HMAC-SHA1"
);

var _consumer2 = new oauth.OAuth2(
  _twitterConsumerKey,
  _twitterConsumerSecret,
  "https://api.twitter.com/",
  null,
  "oauth2/token",
  null
);

module.exports = {
  twitterConsumerKey: _twitterConsumerKey,
  twitterConsumerSecret: _twitterConsumerSecret,
  consumer: _consumer,
  consumer2: _consumer2,
  placekey: _placekey,
  geokey: _geokey,
  mongourl: _mongourl,
  sse: _sse,
  db: _db,
  collection: _collection
};
