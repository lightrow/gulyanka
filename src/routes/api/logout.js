var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  console.log("------------------------");
  console.log("logging out...");
  req.session.destroy();
  req.session = undefined;
  res.status(200).json({ status: 200, message: "OK" });
});

module.exports = router;
