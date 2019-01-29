/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var evalAllowed = false;
try {
  eval('evalAllowed = true');
} catch (e) {
  // eval not allowed due to CSP
}

// RHL needs setPrototypeOf to operate Component inheritance, and eval to patch methods
var platformSupported = !!Object.setPrototypeOf && evalAllowed;

if (true) {
  if (false) {}
  module.exports = __webpack_require__(13);
} else {}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var oauth = __webpack_require__(20);

var SSE = __webpack_require__(21);

var _mongourl = "mongodb://guest:1234@ds125288.mlab.com:25288/mlabdb";
var _twitterConsumerKey = "mqMuivEEFDyBNekQBk56PMMSa";
var _twitterConsumerSecret = "b7Q6sPdVHJDB4TTehG1dOyyDAdm2TV1JUscXc9XHOe5T7w4blV";
var _placekey = "AIzaSyC8K66Hs3IKMTnrdhTH3OvKkgOnC11oEIU";
var _geokey = "AIzaSyC8K66Hs3IKMTnrdhTH3OvKkgOnC11oEIU";
var _db = "mlabdb";
var _collection = "gulyanka-db";

var _sse = new SSE(["nothing here"]);

var _consumer = new oauth.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "https://gulyanka.herokuapp.com/api/callback", "HMAC-SHA1");

var _consumer2 = new oauth.OAuth2(_twitterConsumerKey, _twitterConsumerSecret, "https://api.twitter.com/", null, "oauth2/token", null);

module.exports = {
  twitterConsumerKey: _twitterConsumerKey,
  twitterConsumerSecret: _twitterConsumerSecret,
  consumer: _consumer,
  consumer2: _consumer2,
  placekey: _placekey,
  geokey: _geokey,
  mongourl: _mongourl,
  sse: _sse,
  db: _db,
  collection: _collection
};
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_mongourl, "_mongourl", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_twitterConsumerKey, "_twitterConsumerKey", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_twitterConsumerSecret, "_twitterConsumerSecret", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_placekey, "_placekey", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_geokey, "_geokey", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_db, "_db", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_collection, "_collection", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_sse, "_sse", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_consumer, "_consumer", "/mnt/c/Work/gulyanka/src/utils.js");
  reactHotLoader.register(_consumer2, "_consumer2", "/mnt/c/Work/gulyanka/src/utils.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("util-inspect");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

var utils = __webpack_require__(3);

var session = __webpack_require__(5);

var inspect = __webpack_require__(6);

router.get("/", function (req, res, next) {
  console.log(req.session.id);

  if (req.session.auth == "bearer" || req.session.auth == "user") {
    next();
  } else {
    console.log("------------------------");
    console.log("AUTHORIZING APP...");
    utils.consumer2.getOAuthAccessToken("", {
      grant_type: "client_credentials"
    }, function (error, bearer_token, results) {
      if (error) {
        console.log(inspect(error));
        res.status(500).json({
          message: "ERROR",
          error: error
        });
      } else {
        req.session.oauth2 = {};
        req.session.oauth2.bearer_token = bearer_token;
        req.session.auth = "bearer"; //req.session.oauth2.refresh_token = refresh_token;

        console.log("------------------------");
        console.log("Authorized (bearer)");
        console.log("<<" + req.session.oauth2.bearer_token);
        console.log("sessionID: " + req.sessionID);
        next(); //res.status(200).json({ message: "OK" });
      }
    });
  }
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/auth2.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var path = __webpack_require__(9);

var logger = __webpack_require__(15);

var cookieParser = __webpack_require__(16);

var bodyParser = __webpack_require__(17);

var session = __webpack_require__(5);

var history = __webpack_require__(18);

var MongoStore = __webpack_require__(19)(session);

var utils = __webpack_require__(3);
/*
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const webpackHot = require("webpack-hot-middleware");
const compiler = webpack(webpackConfig);
*/


var app = express(); // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: "keyboard cat",
  cookie: {
    secure: false,
    expires: new Date(253402300000000)
  },
  store: new MongoStore({
    url: utils.mongourl
  }),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(express.static("public"));
app.use("*", __webpack_require__(10));
app.use("/api/getplaces", __webpack_require__(22));
app.use("/api/getphoto", __webpack_require__(24));
app.use("/api/getdetails", __webpack_require__(25));
app.use("/api/auth", __webpack_require__(26));
app.use("/api/auth2", __webpack_require__(10));
app.use("/api/access", __webpack_require__(27));
app.use("/api/verify", __webpack_require__(28));
app.use("/api/callback", __webpack_require__(29));
app.use("/api/willgo", __webpack_require__(30));
app.use("/api/getgoers", __webpack_require__(31));
app.get("/api/authsse", utils.sse.init);
app.use(history());
/*
app.use(
  webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: "/"
  })
);
app.use(webpackHot(compiler));
*/

var port_number = process.env.PORT || 3000;
app.listen(port_number, function () {
  console.log("Listening on port: " + port_number);
});
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MongoStore, "MongoStore", "/mnt/c/Work/gulyanka/src/server.prod.js");
  reactHotLoader.register(app, "app", "/mnt/c/Work/gulyanka/src/server.prod.js");
  reactHotLoader.register(port_number, "port_number", "/mnt/c/Work/gulyanka/src/server.prod.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var React=_interopDefault(__webpack_require__(14)),classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},AppContainer=function(e){function t(){return classCallCheck(this,t),possibleConstructorReturn(this,e.apply(this,arguments))}return inherits(t,e),t.prototype.render=function(){return React.Children.only(this.props.children)},t}(React.Component),hot_prod=function(){return function(e){return e}},areComponentsEqual=function(e,t){return e===t},setConfig=function(){},cold=function(e){return e},configureComponent=function(){};exports.AppContainer=AppContainer,exports.hot=hot_prod,exports.areComponentsEqual=areComponentsEqual,exports.setConfig=setConfig,exports.cold=cold,exports.configureComponent=configureComponent;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("connect-history-api-fallback");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("oauth");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("express-sse");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

var utf8 = __webpack_require__(23);

var mongo = __webpack_require__(7).MongoClient;

var utils = __webpack_require__(3);

router.get("/", function (req, res, next) {
  if (req.query.city != "") {
    var address = utf8.encode(req.query.city);
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + utils.geokey;
    request(url, function (error, response, body) {
      if (response.statusCode === 200 && JSON.parse(body).status === "OK") {
        console.log("geocode: OK");
        var longtitude = JSON.parse(body).results[0].geometry.location.lng;
        var latitude = JSON.parse(body).results[0].geometry.location.lat;
        var location = latitude + "," + longtitude;
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=500&type=bar&key=" + utils.placekey;
        request(url, function (err, response, body2) {
          if (err) {
            console.log("places: ERROR");
            console.log(err);
            throw err;
          }

          console.log("places: OK");
          res.end(body2);
        });
      } else {
        //res.end(JSON.stringify("BAD"))
        console.log("geocode: ERROR");
        console.log(JSON.parse(body).status);
        res.end(body);
      }
    });
  } else {
    res.end(JSON.stringify({
      status: "NO_INPUT"
    }));
  }
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/getplaces.js");
  reactHotLoader.register(mongo, "mongo", "/mnt/c/Work/gulyanka/src/routes/api/getplaces.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("utf8");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

var mongo = __webpack_require__(7).MongoClient;

var assert = __webpack_require__(8);

var utils = __webpack_require__(3);

router.get("/", function (req, res) {
  var photoref = req.query.photoref;
  var placeref = req.query.placeref;
  var maxwidth = 1500;
  mongo.connect(utils.mongourl, {
    useNewUrlParser: true
  }, function (err, db) {
    assert.equal(err, null);
    var dbo = db.db(utils.db);
    dbo.collection("gulyanka-imgs").findOne({
      placeref: placeref
    }, function (err, findings) {
      assert.equal(err, null);

      if (findings != undefined) {
        res.end(JSON.stringify(findings.href));
        db.close();
      } else {
        var urlPhoto = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + maxwidth + "&photoreference=" + photoref + "&key=" + utils.geokey;
        request(urlPhoto, function (error, response, body) {
          var photoHref = response.request.uri.href;

          if (photoHref.includes("https://maps.googleapis.com/maps/api/place")) {
            console.log("photo: OVER_QUOTA");
            res.end("muh shekels");
          } else {
            console.log("photo: OK");
            res.end(JSON.stringify(photoHref));
            dbo.collection("gulyanka-imgs").findOneAndUpdate({
              placeref: placeref
            }, {
              $set: {
                href: photoHref
              }
            }, {
              upsert: true
            }, function (err, doc) {
              assert.equal(err, null);
              db.close();
            });
          }
        });
      }
    });
  });
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/getphoto.js");
  reactHotLoader.register(mongo, "mongo", "/mnt/c/Work/gulyanka/src/routes/api/getphoto.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

var utils = __webpack_require__(3);

var maxwidth = "1200";
router.get("/", function (req, res, next) {
  var placeid = req.query.placeid;
  var photoref = req.query.photoref;
  var urlPlace = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeid + "&key=" + utils.geokey;
  request(urlPlace, function (error, response, body) {
    body = JSON.parse(body);
    var resObj = {
      details: body,
      status: body.status
    };
    res.end(JSON.stringify(resObj));
  });
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/getdetails.js");
  reactHotLoader.register(maxwidth, "maxwidth", "/mnt/c/Work/gulyanka/src/routes/api/getdetails.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

var utils = __webpack_require__(3);

var session = __webpack_require__(5);

var inspect = __webpack_require__(6);

router.get("/", function (req, res, next) {
  console.log("------------------------");
  console.log("getting request tokens...");
  utils.consumer.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      console.log(inspect(error));
      res.status(500).json({
        message: "ERROR",
        error: error
      });
    } else {
      req.session.oauth = {};
      req.session.oauth.reqToken = oauthToken;
      req.session.oauth.reqTokenSecret = oauthTokenSecret;
      console.log("------------------------");
      console.log("<<" + req.session.oauth.reqToken);
      console.log("<<" + req.session.oauth.reqTokenSecret);
      console.log("sessionID: " + req.sessionID);
      var url = "https://api.twitter.com/oauth/authenticate?oauth_token=".concat(req.session.oauth.reqToken);
      console.log(url);
      res.redirect(url);
    }
  });
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/auth.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

var utils = __webpack_require__(3);

var session = __webpack_require__(5);

var inspect = __webpack_require__(6);

router.get("/", function (req, res, next) {
  console.log("------------------------");
  console.log("getting access tokens...");
  utils.consumer.getOAuthAccessToken( //req.query.oauth_request_token,
  //req.query.oauth_request_token_secret,
  req.session.reqToken, req.session.reqTokenSecret, req.query.oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token: " + inspect(error));
      console.log(inspect(error));
    } else {
      req.session.accToken = oauthAccessToken;
      req.session.accTokenSecret = oauthAccessTokenSecret;
      req.session.verifier = req.query.oauth_verifier;
      console.log("------------------------");
      console.log("accToken: " + oauthAccessToken);
      console.log("accTokenSecret: " + oauthAccessTokenSecret);
      res.status(200).end();
    }
  });
  /*
  request.post(
    {
      url: "https://api.twitter.com/oauth/access_token",
      oauth_token: req.query.oauth_token,
      oauth_verifier: req.query.oauth_verifier
    },
    (error, response, body) => {
      console.log("responsinggsdgssgdsgs");
      if (error) return res.status(500).send({ message: error.message });
      if (response.statusCode !== 200) {
        console.log(body);
        return res.status(response.statusCode).send({ message: "Error" });
      }
      console.log(body);
      res.end(response);
    }
  );*/
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/access.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

var utils = __webpack_require__(3);

var session = __webpack_require__(5);

var inspect = __webpack_require__(6);

var path = __webpack_require__(9);

var sse = __webpack_require__(3).sse;

router.get("/", function (req, res, next) {
  console.log("**-----------------------------------------------------**");
  console.log("VERIFIYING FOR : " + req.sessionID);
  console.log("accToken Session: " + req.session.oauth.accToken);
  console.log("accTokenSecret Session: " + req.session.oauth.accTokenSecret);
  console.log("**-----------------------------------------------------**");
  console.log("verifying...");
  utils.consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauth.accToken, req.session.oauth.accTokenSecret, function (error, data, response) {
    if (error) {
      console.log("ERROR: " + inspect(error));
      res.status(403).json({
        status: 403,
        error: error
      });
    } else {
      console.log("----------");
      console.log("Success");
      var parsedData = JSON.parse(data);
      req.session.oauth.data = parsedData;
      req.session.auth = "user";
      console.log("----------");
      console.log("Getting friends for ".concat(req.session.oauth.data.screen_name, "..."));
      utils.consumer.get("https://api.twitter.com/1.1/friends/list.json?cursor=-1&screen_name=" + req.session.oauth.data.screen_name, req.session.oauth.accToken, req.session.oauth.accTokenSecret, function (error, data, response) {
        if (error) {
          console.log("ERROR: " + inspect(error));
          res.status(403).json({
            status: 403,
            error: error
          });
        } else {
          console.log("----------");
          console.log("Success");
          var parsedFriends = JSON.parse(data);
          req.session.oauth.friends = parsedFriends;
          sse.send({
            status: 200,
            data: req.session.oauth.data,
            friends: req.session.oauth.friends
          });
          req.session.save();
          return res.redirect("/redirect_close.html");
        }
      });
    }
  });
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/verify.js");
  reactHotLoader.register(sse, "sse", "/mnt/c/Work/gulyanka/src/routes/api/verify.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var request = __webpack_require__(4);

router.get("/", function (req, res, next) {
  request.post({
    url: "https://api.twitter.com/oauth/access_token",
    oauth: {
      verifier: req.query.oauth_verifier,
      token: req.query.oauth_token
    }
  }, function (error, response, body) {
    if (error) return res.send(500, {
      message: error.message
    });

    if (response.statusCode !== 200) {
      return res.status(400).json({
        message: "ERROR"
      });
    }

    var accToken = body.match(/(?<=\boauth_token=)(?:(?!&).)*/g);
    var accTokenSecret = body.match(/(?<=\boauth_token_secret=)(?:(?!&).)*/g);
    var screenName = body.match(/(?<=\bscreen_name=)(?:(?!&).)*/g);
    var userId = body.match(/(?<=\buser_id=)(?:(?!&).)*/g);
    req.session.oauth.accToken = accToken;
    req.session.oauth.accTokenSecret = accTokenSecret;
    console.log("ACCESS_GRANTED");
    return res.redirect("/api/verify");
  });
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/callback.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var utils = __webpack_require__(3);

var mongo = __webpack_require__(7).MongoClient;

var assert = __webpack_require__(8);

router.get("/", function (req, res, next) {
  if (req.session.auth != "user") {
    res.redirect("/api/auth");
  }

  console.log("**-----------------------------------------------------**");
  console.log("Sumbitting WillGo for user: " + req.session.oauth.data.screen_name);
  console.log("place ID : " + req.query.q);
  console.log("**-----------------------------------------------------**");
  mongo.connect(utils.mongourl, function (err, db) {
    if (err) throw err;
    var dbo = db.db(utils.db);
    dbo.collection(utils.collection).findOneAndUpdate({
      place_id: req.query.q
    }, {
      $push: {
        goers: req.session.oauth.data.id
      }
    }, {
      upsert: true
    }, function (err, doc) {
      assert.equal(err, null);
      console.log(doc);
      db.close();
      console.log("sent :^)");
    });
  });
  res.status(200).send(JSON.stringify({
    message: "ok"
  }));
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/willgo.js");
  reactHotLoader.register(mongo, "mongo", "/mnt/c/Work/gulyanka/src/routes/api/willgo.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(0).enterModule;

  enterModule && enterModule(module);
})();

var express = __webpack_require__(2);

var router = express.Router();

var mongo = __webpack_require__(7).MongoClient;

var utils = __webpack_require__(3);

var assert = __webpack_require__(8);

var request = __webpack_require__(4);

router.get("/", function (req, res, next) {
  if (req.session.auth != "user" && req.session.auth != "bearer") {
    res.status(403).json({
      message: "NOT_AUTHORIZED"
    });
  } else {
    mongo.connect(utils.mongourl, {
      useNewUrlParser: true
    }, function (err, moncon) {
      assert.equal(err, null);
      var collection = moncon.db(utils.db).collection(utils.collection);
      collection.findOne({
        place_id: req.query.q
      }, function (err, findings) {
        assert.equal(err, null); //if this place exists in database...

        if (findings != null) {
          var goersString = findings.goers.toString();
          var reqUrl = "https://api.twitter.com/1.1/users/lookup.json?user_id=".concat(goersString);

          if (req.session.auth == "user") {
            utils.consumer.get(reqUrl, req.session.oauth.accToken, req.session.oauth.accTokenSecret, function (error, data) {
              assert.equal(error, null); //...send its data to client

              res.status(200).json({
                status: 200,
                message: "OK",
                goers: JSON.parse(data)
              });
              moncon.close();
            });
          } else {
            //oauth npm module is broken for twitter oauth2
            var options = {
              url: reqUrl,
              headers: {
                Authorization: "Bearer " + req.session.oauth2.bearer_token
              }
            };
            request(options, function (error, response, body) {
              var goers = JSON.parse(body);
              res.status(200).json({
                status: 200,
                message: "OK",
                goers: goers
              });
            });
          }
        } else {
          // else send "nothing" response
          res.status(200).json({
            status: "404",
            message: "No such place in database"
          });
          moncon.close();
        }
      });
    });
  }
});
module.exports = router;
;

(function () {
  var reactHotLoader = __webpack_require__(0).default;

  var leaveModule = __webpack_require__(0).leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(router, "router", "/mnt/c/Work/gulyanka/src/routes/api/getgoers.js");
  reactHotLoader.register(mongo, "mongo", "/mnt/c/Work/gulyanka/src/routes/api/getgoers.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ })
/******/ ]);