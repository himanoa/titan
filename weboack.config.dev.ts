import webpack from "webpack";
import createConfig from "./webpack.config.base";

const baseConfig = createConfig("development").map(config => ({
  ...config,
  ...{
    debug: true,
    sourceMap: "eval-source-map"
  }
}));

export default baseConfig;
