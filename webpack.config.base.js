const webpack = require("webpack");
const path = require("path");

const createConfig = (mode, mainPlugin, rendererPlugin = []) => {
  return [
    {
      target: "electron-main",
      entry: { main: path.join(__dirname, "src", "main", "index.ts") },
      plugins: mainPlugin,
      output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js"
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          }
        ]
      }
    },
    {
      target: "electron-renderer",
      entry: "./src/renderer/index.tsx",
      plugins: rendererPlugin,
      output: {
        path: path.join(__dirname, "dist"),
        filename: "renderer.js"
      },
      module: {
        rules: [
          {
            test: "/.tsx?$/",
            exclude: /node_modules/,
            loader: "babel-loader"
          }
        ]
      }
    }
  ];
};
module.exports = createConfig;
