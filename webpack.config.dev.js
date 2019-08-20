const webpack = require("webpack");
const path = require("path");
const createConfig = require("./webpack.config.base");
const { exec } = require('child_process')

const port = process.env.port || 8080;
module.exports = createConfig("development").map(config => ({
  ...config,
  devtool: "eval-source-map",
  devServer: {
    port,
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    after: () => {
      exec('yarn electron', (err, stdout, stderr) => {
        if(err) {
          console.error(err)
        }
        console.log(`[electron] ${stdout}`)
        console.error(`[electron] ${stderr}`)
      })
    }
  }
}));
