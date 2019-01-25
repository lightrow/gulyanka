var express = require("express");
var router = express.Router();
var request = require("request");
var mongo = require("mongodb").MongoClient;
var assert = require("assert");
var utils = require("../../utils");

router.get("/", function(req, res) {
  var photoref = req.query.photoref;
  var placeref = req.query.placeref;
  var maxwidth = 1500;

  mongo.connect(
    utils.mongourl,
    { useNewUrlParser: true },
    (err, db) => {
      assert.equal(err, null);
      var dbo = db.db(utils.db);
      dbo
        .collection("gulyanka-imgs")
        .findOne({ placeref: placeref }, (err, findings) => {
          assert.equal(err, null);
          if (findings != undefined) {
            res.end(JSON.stringify(findings.href));
            db.close();
          } else {
            var urlPhoto =
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
              maxwidth +
              "&photoreference=" +
              photoref +
              "&key=" +
              utils.geokey;

            request(urlPhoto, (error, response, body) => {
              let photoHref = response.request.uri.href;
              if (
                photoHref.includes("https://maps.googleapis.com/maps/api/place")
              ) {
                console.log("photo: OVER_QUOTA")
                res.end("muh shekels");
              } else {
                console.log("photo: OK")
                res.end(JSON.stringify(photoHref));
                dbo
                  .collection("gulyanka-imgs")
                  .findOneAndUpdate(
                    { placeref: placeref },
                    { $set: { href: photoHref } },
                    { upsert: true },
                    (err, doc) => {
                      assert.equal(err, null);
                      db.close();
                    }
                  );
              }
            });
          }
        });
    }
  );
});

module.exports = router;


