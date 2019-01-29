var express = require("express");
var router = express.Router();
var request = require("request");


router.get("/", function(req, res, next) {
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
        return res.status(400).json({ message: "ERROR" });
      }
      let accToken = body.match(/(?<=\boauth_token=)(?:(?!&).)*/g)
      let accTokenSecret = body.match(/(?<=\boauth_token_secret=)(?:(?!&).)*/g)
      let screenName = body.match(/(?<=\bscreen_name=)(?:(?!&).)*/g)
      let userId = body.match(/(?<=\buser_id=)(?:(?!&).)*/g)
      req.session.oauth.accToken = accToken
      req.session.oauth.accTokenSecret = accTokenSecret
      console.log("ACCESS_GRANTED");
      return res.redirect("/api/verify");
    }
  );
});

module.exports = router;
