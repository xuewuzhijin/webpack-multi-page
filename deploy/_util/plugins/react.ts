import { Configuration } from "webpack";
// @ts-ignore
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

module.exports = {
  resolve: {
    extensions: [ ".tsx",  ".jsx" ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ["views/**/*.{ts,tsx}"]
    })
  ]
  
} as Configuration
