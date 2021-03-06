const path = require("path");
const webpack = require("webpack");
const loaders = require("./loaders");
const plugins = require("./plugins");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // Além do formato "objeto", podemos usar o entry como um array de entries.
  // Por algum motivo, o HMR não estava funcionando sem especificar esses dois entries de dev server no início. Além disso, quando utilizamos array, cada item deve ser (ou gerar) uma string, não pode ser objeto ou função
  entry: [
    "webpack-dev-server/client?http://localhost:9000",
    "webpack/hot/dev-server",
    path.resolve("./", "src/index.js"),
    path.resolve("./", "src/js/polyfill.js"),
  ],
  // entry: {
  //   // Podemos ter diversos arquivos de entrada e cada um gera um bundle.
  //   // Se não informarmos nenhum nome, o webpack gera um "main" por padrão
  //   // Nesse caso, eu tirei o app, pois com React geralmente importamo tudo no index
  //   index: path.resolve("./", "src/index.js"),
  //   // app: "./src/js/app.js",
  //   polyfill: path.resolve("./", "src/js/polyfill.js"),
  // },
  output: {
    path: path.resolve("../", "dist"),
    filename: "js/[name].bundle.js",
    // deixar a variável name entre colchetes, faz com que o webpack pegue o
    // nome de cada arquivo de entrada dinamicamente
  },
  mode: devMode ? "development" : "production",
  module: {
    rules: [
      loaders.JSLoader,
      loaders.CSSLoader,
      loaders.sassLoader,
      loaders.htmlLoader,
      loaders.imageLoader,
      loaders.ESLintLoader,
    ],
  },
  plugins: [
    // plugins.devServer,
    plugins.StyleLintPlugin,
    plugins.HtmlWebpackPlugin,
    plugins.CleanWebpackPlugin,
    plugins.MiniCssExtractPlugin,
    // plugins.MediaQuerySplittingPlugin
    devMode && new webpack.HotModuleReplacementPlugin(),
    // devMode && plugins.ReactRefreshWebpackPlugin,
  ],
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  // externals: {
  //   // É importante usar esse objeto externals, caso contrário o React inteiro,
  //   // a biblioteca em si, é compilada no bundle, deixando o arquivo final
  //   // extremamente pesado
  //   // Use external version of React
  //   React: "react",
  //   ReactDOM: "react-dom",
  // },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
  devServer: {
    contentBase: path.resolve("./", "src"),
    // eu mudei a content base de "../dist" pra src, para as mudanças no html tbm serem elegíveis para o hot reload
    index: "index.html",
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // inline: true,
    watchContentBase: true,
    // ativo a prop watchContentBase pra assistir mudanças na content base e ativar o hot reload
    noInfo: true,
    historyApiFallback: true,
    // historyApiFallback, quando habilitada, essa prop permite exibir a página principal ao invés de um possível erro 404
    progress: true,
    stats: "minimal",
    proxy: {
      // vou usar o proxy com o json-server
      "api/": "http://localhost:9000/",
    },
  },
};
