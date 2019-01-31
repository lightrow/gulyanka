var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");

router.get("/", (req, res, next) => {
  if (req.session.auth == "bearer" || req.session.auth == "user") {
    next();
  } else {
    console.log("------------------------");
    console.log("AUTHORIZING APP...");
    utils.consumer2.getOAuthAccessToken(
      "",
      { grant_type: "client_credentials" },
      (error, bearer_token, results) => {
        if (error) {
          console.log(inspect(error));
          res.status(500).json({ message: "ERROR", error: error });
        } else {
          req.session.oauth2 = {};
          req.session.oauth2.bearer_token = bearer_token;
          req.session.auth = "bearer"
          //req.session.oauth2.refresh_token = refresh_token;
          console.log("------------------------");
          console.log("Authorized (bearer)");
          console.log("<<" + req.session.oauth2.bearer_token);
          console.log("sessionID: " + req.sessionID);
          next();
          //res.status(200).json({ message: "OK" });
        }
      }
    );
  }
});

module.exports = router;
