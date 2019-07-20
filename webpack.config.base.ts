import webpack from "webpack";
import path from "path";

const createConfig = (
  mode: "development" | "production",
  mainPlugin: webpack.Plugin[] = [],
  rendererPlugin: webpack.Plugin[] = []
): webpack.Configuration[] => {
  return [
    {
      target: "electron-main",
      entry: "./src/main",
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
      entry: "./src/renderer/index.ts",
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
export default createConfig;
