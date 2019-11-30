import { Configuration } from "webpack";
import { VueLoaderPlugin } from "vue-loader";

module.exports = {
  resolve: {

    /** 省略引入文件的后缀名 */
    extensions: [ ".vue" ],
    
  },

  module: {
    rules: [
      {
        test: /.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        enforce: "pre",
        oneOf: [
          // 这里匹配 `<style module>`
          {
            resourceQuery: /module/,
            use: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  localIdentName: "[local]_[hash:base64:5]"
                }
              }
            ]
          },
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          {
            use: [
              "vue-style-loader",
              "css-loader"
            ]
          }
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
} as Configuration