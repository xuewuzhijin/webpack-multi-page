import path from "path"
import webpack, { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
/* 返回所需的入口文件 */
import Entrys from "./deploy/_util";

// 配置多入口插件
const plugins: webpack.Plugin[] = [];
Entrys( (path, name, templatePath) => {
  plugins.push(new HtmlWebpackPlugin({
      filename: name,
      template: templatePath,
      inject: true,
      chunks: [ path ]
    }))
})

module.exports = {
  mode: "development",

  // 开启 JS 地图映射，因为编译后的 JS 与源码不同，导致难以分析错误
  // 使用此种方式好处就是编译的快，但缺陷就是，与源码的行位置会有所不同，但差异不会太大，建议这种
  devtool: "eval-source-map",

  devServer: {
    hot: true,
    // 开启压缩
    compress: true,
    // 默认打开 dist 下的目录，此 dist 非彼 dist，而是 内存中的 dist 目录
    contentBase: path.join(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: { modules: true }
          },
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
    // 热更新的时候，查看更新了哪个模块，会出现在浏览器的控制台
    new webpack.NamedModulesPlugin(),
    // 热更新必须的插件
    new webpack.HotModuleReplacementPlugin(),
  ].concat(plugins),

  // 开启监听
  watch: true,

  watchOptions: {
    // 防止一秒按 N 次保存导致编译中断，可以看作是节流，一秒内无论按了多少次保存，只编译一次
    aggregateTimeout: 1000,
    ignored: /node_modules/
  },
  
} as WebpackConfig

interface WebpackConfig extends Configuration {
  devServer: any
}
