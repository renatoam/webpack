module.exports = {
  plugins: {
    // esse plugin pega o conteudo dos arquivos css que estao sendo importados e joga no arquivo que está importando, assim fica tudo num arquivo só e os demais plugins podem trabalhar melhor
    'postcss-import': {},
    // o postcss-preset-env é semelhante ao do babel, um conjunto de plugins, só que pra css
    // ele permite variaveis, funcoes e até encadeamento, igual no sass, tudo no css; ver na doc o que ele pode fazer
    'postcss-preset-env': {
      // A lista de browsers que serão alvos das transformações pode ser configurada em um   arquivo .browserlistrc, que pode servir pro babel, eslint e stylint tbm
      browsers: 'last 2 versions',
      // por padrão o autoprefixer não habilita polyfills pra grid, por isso setamos na config a opção 'autoplace' adiciona trechos de css que substitui o estilo moderno, mas é limitado. Both columns and rows must be defined. Autoplacement only works inside the explicit grid. The columns and rows need to be defined so that Autoprefixer knows how many nth-child selectors to generate.
      autoprefixer: { grid: 'autoplace' }
    },
    // o cssnano comprime da melhor forma possível o css. Ele normaliza seletores (juntos por virgula), reduz shorthands, cores, remove duplicatas, corrige posicionamento errado de props, entre muitas outras coisas.
    'cssnano': {
      "preset": [
        "default",
        { "discardComments": { "removeAll": true } }
      ]
    },
    // Experimentando: o font-magician cria os font-faces necessários pro projeto; se usarmos fonts direto do google, ele usa 'variants' e 'foundries', se tivermos fontes locais, ele usa 'hosted'
    'postcss-font-magician': {
      variants: {
        'Montserrat': {
          '300': [],
          '400': [],
          '700': []
        }
      },
      foundries: ['google', 'hosted'],
      // Usar hosted somente no caso de ter fontes locais, 
      // senão o font-face pode ficar muito grande, no caso de ter muitos estilos
      // como a Monstserrat, ai junta url remota com a local e fica giga
      // hosted: ['./src/fonts', './dist/fonts']
    },
    // Experimentando: postcss-utilities dispoe de vários mixins e helpers (usando @util) que são feitos com JS, por isso servem pra css puro, sass, less, etc. Ver na doc as possibilidades
    'postcss-utilities': {}
  },
};