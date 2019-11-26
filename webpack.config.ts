import path from "path"
import webpack, { Configuration } from "webpack"
import Happypack from "happypack"
import { VueLoaderPlugin } from "vue-loader"
import WebpackMerge from "webpack-merge"
import Glob from "glob"

/** 配置多入口 */
let entrys: webpack.Entry = {};
const reg = /^\.\/(.+)\/(.+)\/(.+)\.(\w+)$/;

Glob.sync("./views/**/index.ts").forEach( item => {
  entrys[(item.match(reg) as string[])[2]] = item
})

const webpackConfig: Configuration = {
  entry: entrys,

  output: {
    path: path.resolve( __dirname, "dist" ),
    chunkFilename: "js/lib/[id].js"
  },

  module: {
    rules: [
      {
        test: /.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/
      },
      {
        test: /.[jt]s$/,
        loader: "happypack/loader?id=ts",
        exclude: /node_modules/,
        include: /views/
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "assets/fonts"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5120,
              outputPath: "assets/images"
            }
          }
        ]
      }
    ]
  },
  
  resolve: {

    /** 省略引入文件的后缀名 */
    extensions: [ ".js", ".ts", ".vue", ".html", "*" ],

    /** 定义项目全局模块别名： 该目录要对应 tsconfig 配置文件，也可以不配置，但编译项目会报错，同时也是为了编辑器能够认识 */
    alias: {
      "@views": path.resolve( __dirname, "views" ),
      "@public": path.resolve( __dirname, "public" ),
      "@utils": path.resolve( __dirname, "public/utils" ),
      "@config": path.resolve( __dirname, "public/config" ),
      "@styles": path.resolve( __dirname, "public/styles" ),
      "@assets": path.resolve( __dirname, "public/assets" ),
    }
    
  },

  // 不参与打包的模块
  externals: {
    "vue": "vue"
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    // 给 JS/TS 启用多线程打包
    new Happypack({
      id: "ts",
      threads: 6,
      loaders: [
        {
          loader: "babel-loader",
          cache: true,
          options: {
            cacheDirectory: true
          }
        }
      ]
    })
  ],

  cache: true,

  stats: {
    warningsFilter: /Entrypoint/,
    children: false,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: false,
    depth: false,
    cachedAssets: false
  },

  
}

interface WebpackModuleMode {
  production: boolean;
  development: boolean;
  gZip: boolean;
}

module.exports = ( mode: WebpackModuleMode ) => {
  return WebpackMerge(
    webpackConfig,
    mode.production ? require("./webpack.config.prod") : require("./webpack.config.dev")
  )
}
