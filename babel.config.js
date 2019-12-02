const Config = require("./deploy/config.js"),
      babel = {
	"presets": [
    // 编译环境设置，自动注入 polyfill
    [ "@babel/preset-env", { useBuiltIns: "usage", modules: false, corejs: { version: 3, proposal: true } } ],
    [ "@babel/preset-typescript" ]
	],
	"plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-transform-arrow-functions", { "spec": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    ["@babel/plugin-transform-typescript", { allowNamespaces: true }]
	]
};

if ( Config.plugin.react ) {
  // 如果开启 react，使用 .jsx/.tsx 编译设置
  babel.presets.push("@babel/preset-react")
  // 强制解决 jsx 问题
  babel.presets[1][2] = { allExtensions: true, isTsx: true }
  // 并且使用 react 的热更新插件( webpack 自带的热更新会导致模块更新后数据丢失 )
  babel.presets.push("react-hot-loader/babel")
}


module.exports = babel;
