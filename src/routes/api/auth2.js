var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");

router.get("/", (req, res, next) => {
  if (req.session.auth != undefined) {
    console.log("------------------------");
    console.log("Already authorized (bearer)");
    console.log("<<" + req.session.oauth2.access_token);
    console.log("sessionID: " + req.sessionID);
    res.status(200).json({ message: "OK" });
  } else {
    console.log("------------------------");
    console.log("------------------------");
    console.log("req.session.auth: " + req.session.auth);
    utils.consumer2.getOAuthAccessToken(
      "",
      { grant_type: "client_credentials" },
      (error, access_token, results) => {
        if (error) {
          console.log(inspect(error));
          res.status(500).json({ message: "ERROR", error: error });
        } else {
          req.session.oauth2 = {};
          req.session.oauth2.access_token = access_token;
          //req.session.oauth2.refresh_token = refresh_token;
          req.session.auth = "bearer";
          console.log("------------------------");
          console.log("Authorized (bearer)");
          console.log("<<" + req.session.oauth2.access_token);
          console.log("sessionID: " + req.sessionID);
          res.status(200).json({ message: "OK" });
        }
      }
    );
  }
});

module.exports = router;
