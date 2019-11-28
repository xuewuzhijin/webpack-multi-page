import path from "path"
import webpack, { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import Glob from "glob"

// 配置多入口插件
const plugins: webpack.Plugin[] = [];
Glob.sync("./views/**/!(~|-|_)*/index.[jt]s").forEach( item => {
  const splits = item.split("/"),
        name = /.*\.[jt]s$/.test(splits[3]) ? splits[2] : item.replace(new RegExp(`(./views/${splits[2]}/)|(\.ts)`, "g"), "");
  plugins.push(new HtmlWebpackPlugin({
      filename: name + ".html",
      template: item.replace(/(\.[jt]s)/, ".html"),
      // 默认把 js 注入到 body 标签结束处
      inject: true,
      minify: {
        // 移除注释
        removeComments: true,
        // 移除空格空隙
        collapseWhitespace: true,
        // 删除多余的属性
        removeRedundantAttributes: true, 
        // 使用短的文档类型
        useShortDoctype: true,
        // 是否删除空属性
        removeEmptyAttributes: true,
        // 删除script的类型属性
        removeScriptTypeAttributes: true,
        // 删除style的类型属性
        removeStyleLinkTypeAttributes: true,
        // 保留自闭合标签末尾的斜杠
        keepClosingSlash: true,
        // 压缩内联js （使用uglify-js进行的压缩）
        minifyJS: true,
        // 压缩内联css
        minifyCSS: true,
        // 缩小各种属性中的url
        minifyURLs: true
      },
      // 根据不同的块，注入与之相关（html）的依赖模块
      chunks: [ item ]
  }))
})

module.exports = {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, "css-loader", "postcss-loader" ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "postcss-loader",
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
    // 抽离 css 为一个 单独的文件
    new MiniCssExtractPlugin({
      filename: "css/[id].css"
    }),
    // gzip 压缩
    new CompressionPlugin({
      algorithm: "gzip",
      cache: true,
      test: /\.css|js|png|svg|jpg|jpeg|gif$/,
      filename: "[path].gz",
      exclude: /node_modules/,
      // 资源大于 5120(5KB) byte 时才进行 gz 压缩
      threshold: 5120
    })
  ].concat(plugins),

  optimization: {
    splitChunks: {
      chunks: "all",
      // 压缩前最小大小
      minSize: 10000,
      // 压缩前最大大小
      maxSize: 0,
      // 最小引用次数
      minChunks: 1,
      // 最大异步请求数
      maxAsyncRequests: 6,
      // 最大初始化请求数
      maxInitialRequests: 10,
      // 公共块的名称分隔符
      automaticNameDelimiter: '~',
      cacheGroups: {
        styles: {
          minChunks: 2,
          test: /\.(styl(us)?)|css$/,
          priority: 2
        },
        commons: {
          test: /views/,
          priority: -5,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /node_modules/,
          priority: -10,
          reuseExistingChunk: true,
        }
      }
    }
  }
} as Configuration
