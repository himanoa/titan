const webpack = require("webpack");
const path = require("path");
const createConfig = require("./webpack.config.base");

module.exports = createConfig("development").map(config => ({
  ...config,
  ...{
    devtool: "eval-source-map"
  }
}));
