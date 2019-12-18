/** node 环境下用来解决路径问题 */
import path from "path";
/** 引用 webpack，会用到 webpack 的一些内置插件，后面一个是 类型接口 */
import webpack, { Configuration } from "webpack";
/** 用来启用多线程打包 */
import Happypack from "happypack";
/** 用来合并 webpack 配置文件 */
import WebpackMerge from "webpack-merge";
/** 工具库，引入相关配置文件和入口处理函数 */
import { Entrys, UsePlugins } from "./deploy/_util";

/** 配置多入口 */
let entrys: webpack.Entry = {};
Entrys( item => entrys[item] = item );

const webpackConfig: Configuration = {
  entry: entrys,

  output: {
    filename: "js/[id].js",
    path: path.resolve( __dirname, "dist" ),
    chunkFilename: "js/lib/[id].js"
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        /** 使用多线程打包，ID 指向 ts */
        loader: "happypack/loader?id=ts",
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:4].[ext]",
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
              name: "[name]-[hash:4].[ext]",
              // 限制图片大小，超过 5kb 引用图片，否则转 base64
              limit: 5120,
              outputPath: "assets/images"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          interpolate: true
        }
      },
      {
        test: /\.ejs$/,
        loader: "ejs-loader"
      }
    ]
  },
  
  resolve: {

    /** 省略引入文件的后缀名 */
    extensions: [ ".ts", ".js", ".html", "*" ],

    /** 定义项目全局模块别名： 该目录要对应 tsconfig 配置文件，也可以不配置，但编译项目会报错，同时也是为了编辑器能够认识 */
    alias: {
      "@": path.resolve( __dirname, "./" ),
      "@views": path.resolve( __dirname, "views" ),
      "@public": path.resolve( __dirname, "public" ),
      "@utils": path.resolve( __dirname, "public/utils" ),
      "@config": path.resolve( __dirname, "public/config" ),
      "@styles": path.resolve( __dirname, "public/styles" ),
      "@assets": path.resolve( __dirname, "public/assets" ),
      "@template": path.resolve( __dirname, "public/template" ),
    }
    
  },

  // 不参与打包的模块
  externals: {
    // 如果项目中用到了 vue，那么打包后不会把 vue 这个模块打包到项目中
    // 如果你用到了它，可以在用到的 html 模板中引用 Vue 的 CDN 来加载
    "vue": "vue"
  },

  plugins: [
    // 编译的时候展示进度，效果等同于 --progress
    new webpack.ProgressPlugin(),
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

  // 开启缓存
  cache: true,

  // webpack 编译后的统计报告，关掉一些不重要的信息，只需看想要看到的信息
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

// 执行 webpack 的时候会收到的参数
interface WebpackModuleMode {
  production: boolean;
  development: boolean;
}

module.exports = ( mode: WebpackModuleMode ) => {
  // 返回合并后的 webpack 配置文件
  return WebpackMerge(
    UsePlugins,
    webpackConfig,
    mode.production ? require("./webpack.config.prod") : require("./webpack.config.dev")
  )
}
