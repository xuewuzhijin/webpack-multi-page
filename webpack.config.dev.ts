import path from "path"
import webpack, { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import Glob from "glob"

// 配置多入口插件
const plugins: webpack.Plugin[] = [];
const reg = /.*\/(.+)\/(.+)\.(\w+)$/;
Glob.sync("./views/**/index.ts").forEach( item => {
  const matchs = item.match(reg) as string[],
        name = matchs[1];
  plugins.push(
    new HtmlWebpackPlugin({
      filename: name + ".html",
      template: item.replace(/(\.ts)/, ".html"),
      inject: true,
      chunks: [ name ]
    }))
})

module.exports = {
  mode: "development",

  devtool: "eval-source-map",

  devServer: {
    hot: true,
    compress: true,
    contentBase: path.join(__dirname, "dist")
  },

  output: {
    filename: "js/[name].js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "stylus-loader",
            options: {
              import: path.resolve( __dirname, "public/styles/env.styl" )
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(plugins),

  watch: true,

  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/
  },
  
} as WebpackConfig

interface WebpackConfig extends Configuration {
  devServer: any
}
