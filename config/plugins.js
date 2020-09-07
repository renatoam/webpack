const path = require("path");
// const webpack = require('webpack');
// const config = require('./webpack.config');
// const DevServer = require('webpack-dev-server');
const _HtmlWebpackPlugin = require("html-webpack-plugin");
const _StyleLintPlugin = require("stylelint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _MediaQuerySplittingPlugin = require("media-query-splitting-plugin");
const _ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// quando importamos o css em um arquivo de entrada, esse plugin extrai
// o css de cada arquivo em um bundle.css com o nome do entry point
// aqui temos dois entry, mas só app importa css, então só gera o app.bundle.css
// se não der nome pro entry point, o padrão é main
const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: "css/[name].[contenthash].css",
  chunkFilename: "[id].[contenthash].css",
});

// Experimentando: esse plugin separa os media queries nos arquivos, para que na resolucao atual
// o dispositivo só carregue o arquivo com o media query que interessa,
// sem trazer código desnecessário
// ainda é teste, vou ver se presta
const MediaQuerySplittingPlugin = new _MediaQuerySplittingPlugin({});

// Vai corrigir e validar nosso css. ESlint de css
const StyleLintPlugin = new _StyleLintPlugin({
  configFile: path.resolve(__dirname, "stylelint.config.js"),
  context: "src/css",
  syntax: "scss",
  failOnError: false,
  // IMPORTANTE: na doc fala que o padrão é '**/*.s?(a|c)ss', mas não funciona, precisei trocar pro padrão abaixo. E tem que especificar, remover a linha tbm não resolve
  files: ["**/*.css", "**/*.scss"],
  quiet: false,
  fix: true,
});

// Ele gera um HTML pra servir os bundles gerados (js e css) e pode usar um html existente como base
const HtmlWebpackPlugin = new _HtmlWebpackPlugin({
  cache: true,
  xhtml: true,
  title: "Estudando Webpack",
  minify: true, // minifica de forma meio safada, porque ele só remove alguns espaços, por isso vou usar o html-loader, que minifica de fato
  template: path.resolve("./", "src/html/index.html"),
});

const _CleanWebpackPlugin = new CleanWebpackPlugin();

const ReactRefreshWebpackPlugin = new _ReactRefreshWebpackPlugin();

// const devServer = DevServer(webpack(config), {})

module.exports = {
  // devServer: devServer,
  StyleLintPlugin: StyleLintPlugin,
  HtmlWebpackPlugin: HtmlWebpackPlugin,
  CleanWebpackPlugin: _CleanWebpackPlugin,
  MiniCssExtractPlugin: MiniCssExtractPlugin,
  MediaQuerySplittingPlugin: MediaQuerySplittingPlugin,
  ReactRefreshWebpackPlugin: ReactRefreshWebpackPlugin,
};
