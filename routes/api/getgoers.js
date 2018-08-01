var express = require("express");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var utils = require("../../utils");
var assert = require("assert");

router.get("/", function(req, res) {
  mongo.connect(utils.mongourl, (err, moncon) => {
    assert.equal(err, null);
    var collection = moncon.db(utils.db).collection(utils.collection);
    collection.findOne({ place_id: req.query.q }, (err, findings) => {
      assert.equal(err, null);
      console.log(findings.goers);

      var goersString = findings.goers.toString();
      console.log(goersString);
      var reqUrl = `https://api.twitter.com/1.1/users/lookup.json?user_id=${
        goersString
      }`
      console.log(reqUrl);
      utils.consumer.get(
        reqUrl,
        req.session.accToken,
        req.session.accTokenSecret,
        (error, data) => {
          assert.equal(error, null);
          console.log(JSON.parse(data));
          res.status(200).json(JSON.parse(data));
          moncon.close();
        }
      );
    });
  });
});

module.exports = router;
