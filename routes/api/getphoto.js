var express = require("express");
var router = express.Router();
var request = require("request");
var fs = require("fs");
var path = require("path");
var mongo = require("mongodb").MongoClient;
var assert = require("assert");

const photosDB = path.join(__dirname, "imgRefDB.json");

var utils = require("../../utils");

router.get("/", function(req, res, next) {
  var photoref = req.query.photoref;
  var placeref = req.query.placeref
  var maxwidth = 500;

  mongo.connect(
    utils.mongourl,
    (err, db) => {
      assert.equal(err, null);
      var dbo = db.db(utils.db);
      dbo
        .collection("gulyanka-imgs")
        .findOne({ placeref: placeref}, (err, findings) => {
          assert.equal(err, null);
          if (findings != undefined) {
            res.end(JSON.stringify(findings.href));
            db.close();
            console.log("FOUND ONE!!!!!!!!!!");
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
                res.end("muh shekels");
              } else {
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
                      console.log("sent :^)");
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

/* var urlPhoto =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" +
        maxwidth +
        "&photoreference=" +
        photoref +
        "&key=" +
        utils.geokey;

      request(urlPhoto, (error, response, body) => {
        let photoHref = response.request.uri.href;
        newFile[photoref] = photoHref;
        fs.appendFile(photosDB, JSON.stringify(newFile), err => {
          if (err) throw err;
          console.log("CACHED");
          res.end(JSON.stringify(photoHref));
        });
      });
  */
