module.exports = {
	"presets": [
    "@babel/typescript",
    [ "@babel/preset-env", { useBuiltIns: "usage", modules: false, corejs: { version: 3, proposal: true } } ]
	],
	"plugins": [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    ["@babel/plugin-transform-arrow-functions", { "spec": true }],
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining",
	]
}
