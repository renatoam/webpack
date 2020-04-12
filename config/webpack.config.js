const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    // Podemos ter diversos arquivos de entrada e cada um gera um bundle.
    // Se não informarmos nenhum nome, o webpack gera um "main" por padrão
    // Nesse caso, eu tirei o app, pois com React geralmente importamo tudo no index
    index: path.resolve("./", "src/index.js"),
    // app: "./src/js/app.js",
    polyfill: path.resolve("./", "src/js/polyfill.js")
  },
  output: {
    path: path.resolve("../", "dist"),
    filename: "js/[name].bundle.js"
    // deixar a variável name entre colchetes, faz com que o webpack pegue o 
    // nome de cada arquivo de entrada dinâmicamente
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
  plugins: [
    // plugins.devServer,
    plugins.StyleLintPlugin,
    plugins.HtmlWebpackPlugin,
    plugins.CleanWebpackPlugin,
    plugins.MiniCssExtractPlugin,
    // plugins.MediaQuerySplittingPlugin
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  externals: {
    // É importante usar esse objeto externals, caso contrário o React inteiro,
    // a biblioteca em si, é compilada no bundle, deixando o arquivo final 
    // extremamente pesado
    // Use external version of React
    "React": "react",
    "ReactDOM": "react-dom"
  },
  watchOptions: {
    ignored: /node_modules/
  },
  devServer: {
    contentBase: '../dist',
    // index: 'index.html',
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // vou usar o proxy com o json-server
      'api/': 'http://localhost:9000/'
    }
  }
};
