var express = require("express");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var utils = require("../../utils");
var assert = require("assert");
var request = require("request");

router.get("/", function(req, res, next) {
  if (req.session.auth != "user" && req.session.auth != "bearer") {
    res.status(403).json({ message: "NOT_AUTHORIZED" });
  } else {
    mongo.connect(
      utils.mongourl,
      { useNewUrlParser: true },
      (err, moncon) => {
        assert.equal(err, null);
        var collection = moncon.db(utils.db).collection(utils.collection);
        collection.findOne({ place_id: req.query.q }, (err, findings) => {
          assert.equal(err, null);
          //if this place exists in database...
          if (findings != null) {
            var goersString = findings.goers.toString();
            var reqUrl = `https://api.twitter.com/1.1/users/lookup.json?user_id=${goersString}`;
            if (req.session.auth == "user") {
              utils.consumer.get(
                reqUrl,
                req.session.accToken,
                req.session.accTokenSecret,
                (error, data) => {
                  assert.equal(error, null);
                  //...send its data to client
                  res.status(200).json(JSON.parse(data));
                  moncon.close();
                }
              );
            } else {
              //oauth npm module is broken for twitter oauth2
              var options = {
                url: reqUrl,
                headers: {
                  Authorization: "Bearer " + req.session.oauth2.access_token
                }
              };
              request(options, (error, response, body) => {
                var goers = JSON.parse(body);
                res
                  .status(200)
                  .json({ status: 200, message: "OK", goers: goers });
              });
            }
          } else {
            // else send "nothing" response
            res.status(204).json({
              status: "NOT_FOUND",
              message: "No such place in database"
            });
            moncon.close();
          }
        });
      }
    );
  }
});

module.exports = router;
