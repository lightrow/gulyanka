const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const history = require("connect-history-api-fallback");
const MongoStore = require("connect-mongo")(session);
const utils = require("./utils");
/*
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const webpackHot = require("webpack-hot-middleware");
const compiler = webpack(webpackConfig);
*/

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", true);
app.use(
  session({
    secret: "keyboard cat",
    cookie: { secure: false, expires: new Date(253402300000000) },
    store: new MongoStore({ url: utils.mongourl }),
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

app.use("/api/getplaces", require("./routes/api/getplaces"));
app.use("/api/getphoto", require("./routes/api/getphoto"));
app.use("/api/getdetails", require("./routes/api/getdetails"));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/access", require("./routes/api/access"));
app.use("/api/verify", require("./routes/api/verify"));
app.use("/api/callback", require("./routes/api/callback"));
app.use("/api/willgo", require("./routes/api/willgo"));
app.use("/api/getgoers", require("./routes/api/getgoers"));

app.use(history());

app.use(express.static("public"));


/*
app.use(
  webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: "/"
  })
);
app.use(webpackHot(compiler));
*/

const port_number = process.env.PORT || 3000;
app.listen(port_number, () => {
  console.log("Listening on port: " + port_number);
});
