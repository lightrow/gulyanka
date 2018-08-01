var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");

router.get("/", function(req, res, next) {
  console.log("**-----------------------------------------------------**");
  console.log("VERIFIYING FOR : " + req.sessionID);
  console.log("accToken Session: " + req.session.accToken);
  console.log("accTokenSecret Session: " + req.session.accTokenSecret);
  console.log("**-----------------------------------------------------**");
  console.log("verifying...");
  utils.consumer.get(
    "https://api.twitter.com/1.1/account/verify_credentials.json",
    req.session.accToken,
    req.session.accTokenSecret,
    (error, data, response) => {
      if (error) {
        console.log("ERROR: " + inspect(error));
        res.status(403).json({ status: 403, error: error });
      } else {
        console.log("----------");
        console.log("Success");
        var parsedData = JSON.parse(data);
        req.session.data = parsedData;
        req.session.logged = true;
        console.log("----------");
        console.log(`Getting friends for ${req.session.data.screen_name}...`);
        utils.consumer.get(
          "https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=" +
            req.session.data.screen_name,
          req.session.accToken,
          req.session.accTokenSecret,
          (error, data, response) => {
            if (error) {
              console.log("ERROR: " + inspect(error));
              res.status(403).json({ status: 403, error: error });
            } else {
              console.log("----------");
              console.log("Success");
              var parsedFriends = JSON.parse(data);
              req.session.friends = parsedFriends;
              res
                .status(200)
                .json({ status: 200, data: req.session.data, friends: req.session.friends });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
