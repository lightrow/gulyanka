var express = require("express");
var router = express.Router();
var request = require("request");
var utils = require("../../utils");
var session = require("express-session");
var inspect = require("util-inspect");

router.get("/", function(req, res, next) {
  console.log("------------------------");
  console.log("logging out...");
  req.session = undefined;
  res.status(200).send({ status: 200, message: "Logged out" });
});

module.exports = router;
