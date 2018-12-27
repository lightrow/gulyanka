var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");

router.get("/", function(req, res, next) {
  console.log("------------------------");
  console.log("getting access tokens...");

  utils.consumer.getOAuthAccessToken(
    //req.query.oauth_request_token,
    //req.query.oauth_request_token_secret,
    req.session.reqToken,
    req.session.reqTokenSecret,
    req.query.oauth_verifier,
    (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (error) {
        res.send("Error getting OAuth access token: " + inspect(error));
        console.log(inspect(error));
      } else {
        req.session.accToken = oauthAccessToken;
        req.session.accTokenSecret = oauthAccessTokenSecret;
        req.session.verifier = req.query.oauth_verifier;
        console.log("------------------------");
        console.log("accToken: " + oauthAccessToken);
        console.log("accTokenSecret: " + oauthAccessTokenSecret);
        res.status(200).end();
      }
    }
  );
  /*
  request.post(
    {
      url: "https://api.twitter.com/oauth/access_token",
      oauth_token: req.query.oauth_token,
      oauth_verifier: req.query.oauth_verifier
    },
    (error, response, body) => {
      console.log("responsinggsdgssgdsgs");
      if (error) return res.status(500).send({ message: error.message });
      if (response.statusCode !== 200) {
        console.log(body);
        return res.status(response.statusCode).send({ message: "Error" });
      }
      console.log(body);
      res.end(response);
    }
  );*/
});

module.exports = router;
