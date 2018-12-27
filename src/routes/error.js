var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end(JSON.stringify({'piss off':true}));
});

module.exports = router;
