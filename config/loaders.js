const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

// o babel serve pra transformar nosso código js em ES6 pra um códido
// anterior a ES5. Todos os pacotes do Babel começam com @babel
// @babel/core: contém suas funcionalidades basicas/principais
// @babel/cli: ferramenta que permite usar o babel no terminal
// @babel/plugin-xxx: os plugins são pequenos trechos de js que instruem
// o babel sobre como transformar nosso codigo. Ex.: @babel/plugin-transform-arrow-functions
// @babel/preset-xxx: ao inves de instalar um plugin pra cada tarefa, podemos usar um preset,
// que é um conjunto de plugins predefinidos. Ex.: @babel/preset-env
// @babel/polyfill: inclui o core-js e o regenerator runtime pra emular um ambiente full ES2015+
// o @babel/pollyfill não pode ser salvo como devDep pois precisa rodar antes do codigo fonte
// no arquivos de config, eu especifico os browsers que quero usar polyfill (targets) e
// useBuiltIns: 'usage', que adiciona um import de polyfill em cada arquivo que precisar
// Como o @babel/polyfill está depreciado, temos que especificar o corejs que estamos usando e
// instalar essa versão para ela aparecer no package.json. Ex.: corejs@3
const JSLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        configFile: __dirname + '/babel.config.json',
        // Foi necessário informar, além do arquivo de config do babel, aqui no
        // loader tambem os presets que usamos
        presets: ['@babel/env', '@babel/preset-react']
        // plugins: [devMode && require.resolve("react-refresh/babel")].filter(
        //   Boolean
        // ),
      }
    },
    {
      // o astroturf permite que a gente escreva css puro no js usando uma variável com template literals, que permite usarmos as classes como objetos nos elementos (className), bem util pra trabalhar com JSX
      loader: 'astroturf/loader'
    }
  ]
}

// pra usar o eslint com o webpack, usamos o eslint-loader
// o eslint-loader precisa ser executado antes do babel-loader transpilar o js
// pra isso, ordenamos os loaders de baixo pra cima, pro eslint-loader vir antes
// ou usamos a section enforce: 'pre', que garante que ele é executado antes
const ESLintLoader = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {
      configFile: __dirname + '/.eslintrc.js',
      cache: true,
      fix: true
    }
  }
}

const styleLoader = {
  loader: 'style-loader'
}

const miniExtract = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: __dirname + '/../../public/css/'
  }
}

const defaultCssLoader = devMode ? styleLoader : miniExtract

// Nota 1: com o style loader, eu posso utilizar o HMR com css/scss, já com o mini extract não.

// Nota 2: como o style loader cria tags style (css interno) para cada bundle criado (o que não é o ideal), eu só o utilizo em dev mode. Já em prod, eu uso o miniExtract, que gera arquivos css, que é o ideal, pois vamos usar css com arquivos externos (usando a tag link). Dessa forma, é melhor porque iremos usar o css do jeito certo e teremos opções de cache para ajudar na performance.

// Nota 3: Quem coloca os links (tag link) na página é o html-webpack-plugin
const CSSLoader = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    defaultCssLoader,
    {
      // o css-loader transforma @import e url() em import/require() no js
      // ex.: url('./image.png') vira require('./image.png')
      // ex.: @import 'style.css' vira require('./style.css')
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    // o postcss-loader tem varios recursos, incluindo o autoprefixer e a
    // capacidade de transformar css moderno em css antigo, tipo babel com js
    // ele é um tipo de preset, que comporta vários plugins
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: __dirname + '/postcss.config.js'
        }
      }
    }
  ]
}

const sassLoader = {
  test: /\.s[ac]ss$/i,
  exclude: /node_modules/,
  use: [
    defaultCssLoader,
    {
      loader: 'css-loader',
      options: { importLoaders: 1 }
    },
    {
      loader: 'resolve-url-loader' // esse cara que resolveu, junto com a instrução abaixo, as urls de imagem no scss
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true // essa configuração é obrigatória para o resolve url funcionar (não sei por que)
      }
    }
    // o postcss não funciona bem com o sass, porque ele não entende algumas coisas próprias do sass como importar modulos
    // {
    //   loader: "postcss-loader",
    //   options: {
    //     config: {
    //       path: __dirname + "/postcss.config.js",
    //     },
    //   },
    // },
  ]
}

// eu poderia usar o url-loader para transformar arquivos em base64, mas ele só é util pra imagens muito pequenas, pois aumenta seu tamanho em uns 20%. Ele é muito util pra salvar imagens em banco de dados, passando atraves de uma API, por exemplo
const imageLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: {
    loader: 'file-loader',
    options: {
      outputPath: 'images',
      name: '[path][name].[ext]?[contenthash]'
    }
  }
}

const htmlLoader = {
  test: /\.html$/,
  use: { loader: 'html-loader' }
}

module.exports = {
  JSLoader: JSLoader,
  CSSLoader: CSSLoader,
  sassLoader: sassLoader,
  htmlLoader: htmlLoader,
  imageLoader: imageLoader,
  ESLintLoader: ESLintLoader
}
