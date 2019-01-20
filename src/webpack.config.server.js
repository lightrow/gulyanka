const webpack = require("webpack");
const path = require("path");
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: "production",
  target: "node",
  optimization: {
    minimize: true,
  },
  entry: ["./server.prod.js"],
  output: {
    path: path.join(__dirname, "../"),
    filename: "server.js"
  },
  externals: [nodeExternals({
    whitelist: ['webpack/hot/dev-server','react-hot-loader']
  })], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({ ...process.env })

  ]
};
