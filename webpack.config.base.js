const webpack = require("webpack");
const path = require("path");
const { dependencies } = require("./package.json");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const extensions = [".ts", ".tsx", ".json", ".js", ".jsx"];
const createConfig = (mode, mainPlugin, rendererPlugin = []) => {
  return [
    {
      externals: [...Object.keys(dependencies || {})],
      resolve: {
        extensions
      },
      target: "electron-main",
      entry: { main: path.join(__dirname, "src", "main", "index.ts") },
      plugins: mainPlugin,
      output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js",
        libraryTarget: "commonjs2"
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
      externals: ["electron"],
      target: "electron-renderer",
      entry: "./src/renderer/index.tsx",
      plugins: [new MonacoWebpackPlugin(), ...rendererPlugin],
      resolve: { extensions },
      output: {
        path: path.join(__dirname, "dist"),
        filename: "renderer.js"
      },
      module: {
        rules: [
          {
            test: /.tsx$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          }
        ]
      }
    }
  ];
};
module.exports = createConfig;
