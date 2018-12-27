var express = require("express");
var router = express.Router();
var request = require("request");
var path = require('path');

router.get("/", function (req, res, next) {
  console.log("ber");
  request.post(
    {
      url: "https://api.twitter.com/oauth/access_token",
      oauth: {
        verifier: req.query.oauth_verifier,
        token: req.query.oauth_token
      }
    },
    (error, response, body) => {
      if (error) return res.send(500, { message: error.message });
      if (response.statusCode !== 200) {
        return res.send(response.statusCode, { message: "Error" });
      }
      res.sendFile(path.resolve(__dirname + '../../../public/redirect.html'));
    }
  );
});

module.exports = router;
