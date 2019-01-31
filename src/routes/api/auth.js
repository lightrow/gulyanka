var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");

router.get("/", function(req, res, next) {
  console.log("------------------------");
  console.log("getting request tokens...");
  utils.consumer.getOAuthRequestToken(
    (error, oauthToken, oauthTokenSecret, results) => {
      if (error) {
        console.log(inspect(error));
        res.status(500).json({ message: "ERROR", error: error });
      } else {
        req.session.oauth = {};
        req.session.oauth.reqToken = oauthToken;
        req.session.oauth.reqTokenSecret = oauthTokenSecret;
        req.session.save(() => {
          console.log("------------------------");
          console.log("<<" + req.session.oauth.reqToken);
          console.log("<<" + req.session.oauth.reqTokenSecret);
          console.log("sessionID: " + req.sessionID);
          let url = `https://api.twitter.com/oauth/authenticate?oauth_token=${
            req.session.oauth.reqToken
          }`;
          console.log(url);
          res.redirect(url);
        });
      }
    }
  );
});

module.exports = router;
