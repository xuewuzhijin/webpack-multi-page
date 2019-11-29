import { Configuration } from "webpack";

module.exports = {
	module: {
		rules: [ {
			test: /\.pug$/,
			oneOf: [
				// 这条规则应用到 Vue 组件内的 `<template lang="pug">`
        {
          exclude: /\.vue$/,
          use: ["raw-loader", "pug-plain-loader"]
        },
				// 这条规则应用到 JavaScript 内的 pug 导入
				{
					use: [ "raw-loader", "pug-plain-loader" ]
				}
			]
		} ]
	}
} as Configuration
