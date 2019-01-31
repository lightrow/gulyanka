var express = require("express");
var router = express.Router();
var utils = require("../../utils");
var mongo = require("mongodb").MongoClient;
var assert = require("assert");

router.get("/", function(req, res, next) {
  if (
    req.session.auth != "user" ||
    req.session.oauth == undefined ||
    req.session.oauth.data == undefined
  ) {
    console.log("SESSION: " + req.sessionID);
    console.log("oauth: " +  req.session.oauth.data )
    return res.status(403).json({ status: 403, message: "BAD_AUTH" });
  }
  console.log("**-----------------------------------------------------**");
  console.log(
    "Sumbitting WillGo for user: " + req.session.oauth.data.screen_name
  );
  console.log("place ID : " + req.query.q);
  console.log("**-----------------------------------------------------**");

  mongo.connect(
    utils.mongourl,
    (err, db) => {
      if (err) throw err;
      var dbo = db.db(utils.db);
      dbo
        .collection(utils.collection)
        .findOneAndUpdate(
          { place_id: req.query.q },
          { $push: { goers: req.session.oauth.data.id } },
          { upsert: true },
          (err, doc) => {
            assert.equal(err, null);
            db.close();
            console.log("sent :^)");
          }
        );
    }
  );

  res.status(200).send(JSON.stringify({ message: "ok" }));
});

module.exports = router;
