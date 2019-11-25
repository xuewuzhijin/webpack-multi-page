import path from "path"
import webpack, { Configuration } from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CompressionPlugin from "compression-webpack-plugin"
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunks: [ name ]
    }))
})

module.exports = {
  mode: "production",

  output: {
    filename: "js/[id].js",
  },

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
    new MiniCssExtractPlugin({
      filename: "css/[name]-[hash:4].css"
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      cache: true,
      test: /\.css|js|png|svg|jpg|jpeg|gif$/,
      // filename: info => `${info.path}.gz`,
      // filename(info) { return `${info.path}.gz${info.query}` },
      filename: "[path].gz",
      exclude: /node_modules/,
      // 资源大于 5120(5KB) byte 时才进行 gz 压缩
      threshold: 5120
    })
  ].concat(plugins),

  optimization: {
    // runtimeChunk: {
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },
    splitChunks: {
      name: true,
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
