import { Configuration } from "webpack";

module.exports = {
  module: {
    rules: [
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader',
      },
    ]
  }
} as Configuration