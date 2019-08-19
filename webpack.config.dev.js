const webpack = require("webpack");
const path = require("path");
const createConfig = require("./webpack.config.base");

const port = process.env.port || 8080;
module.exports = createConfig("development").map(config => ({
  ...config,
  devtool: "eval-source-map",
  devServer: {
    port,
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/"
  }
}));
