var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");

router.get("/", function (req, res, next) {
  console.log("------------------------");
  console.log("getting request tokens...");
  utils.consumer.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
    if (error) {
      console.log(inspect(error))
      res.status(500).send("Error getting OAuth request token");
    } else {
      req.session.reqToken = oauthToken;
      req.session.reqTokenSecret = oauthTokenSecret;
      console.log("------------------------");
      console.log("<<" + req.session.reqToken);
      console.log("<<" + req.session.reqTokenSecret);
      console.log("sessionID: " + req.sessionID);

      res.end(JSON.stringify({ reqToken: oauthToken, reqTokenSecret: oauthTokenSecret }));
    }
  });
});

module.exports = router;
