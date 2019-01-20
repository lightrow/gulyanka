var express = require("express");
var router = express.Router();
var request = require("request");

router.get("/", function(req, res, next) {
  if (req.session.auth == undefined) {
    res.status(403).json({ message: "NOT_AUTHORIZED" });
  } else {
    var placeid = req.query.placeid;
    var photoref = req.query.photoref;

    var url = `https://api.twitter.com/1.1/friends/list.json?user_id=${
      req.session.userinfo.user_id
    }`;
  }
});

module.exports = router;
