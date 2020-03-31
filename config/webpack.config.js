const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: "./src/js/index.js",
    app: "./src/js/app.js",
    polyfill: "./src/js/polyfill.js"
  },
  module: {
    rules: [
      loaders.JSLoader,
      loaders.CSSLoader,
      loaders.sassLoader,
      loaders.htmlLoader,
      loaders.imageLoader,
      loaders.ESLintLoader
    ]
  },
  output: {
    path: path.resolve("./", "dist"),
    filename: "js/[name].bundle.js"
  },
  plugins: [
    plugins.StyleLintPlugin,
    plugins.HtmlWebpackPlugin,
    plugins.MiniCssExtractPlugin,
    plugins.MediaQuerySplittingPlugin
  ],
};
