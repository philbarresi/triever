const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/triever.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "triever.min.js",
    libraryTarget: "umd",
    library: "Trie"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
};
