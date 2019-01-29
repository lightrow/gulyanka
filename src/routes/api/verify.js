var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");
var path = require("path");
var sse = require("../../utils").sse;

router.get("/", (req, res, next) => {
  console.log("**-----------------------------------------------------**");
  console.log("VERIFIYING FOR : " + req.sessionID);
  console.log("accToken Session: " + req.session.oauth.accToken);
  console.log("accTokenSecret Session: " + req.session.oauth.accTokenSecret);
  console.log("**-----------------------------------------------------**");
  console.log("verifying...");
  utils.consumer.get(
    "https://api.twitter.com/1.1/account/verify_credentials.json",
    req.session.oauth.accToken,
    req.session.oauth.accTokenSecret,
    (error, data, response) => {
      if (error) {
        console.log("ERROR: " + inspect(error));
        res.status(403).json({ status: 403, error: error });
      } else {
        console.log("----------");
        console.log("Success");
        var parsedData = JSON.parse(data);
        req.session.oauth.data = parsedData;
        req.session.auth = "user";
        console.log("----------");
        console.log(
          `Getting friends for ${req.session.oauth.data.screen_name}...`
        );
        utils.consumer.get(
          "https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=" +
            req.session.oauth.data.screen_name,
          req.session.oauth.accToken,
          req.session.oauth.accTokenSecret,
          (error, data, response) => {
            if (error) {
              console.log("ERROR: " + inspect(error));
              res.status(403).json({ status: 403, error: error });
            } else {
              console.log("----------");
              console.log("Success");
              var parsedFriends = JSON.parse(data);
              req.session.oauth.friends = parsedFriends;
              sse.send({
                status: 200,
                data: req.session.oauth.data,
                friends: req.session.oauth.friends
              });
              req.session.save();
              return res.redirect("/redirect_close.html")
            }
          }
        );
      }
    }
  );
});

module.exports = router;
