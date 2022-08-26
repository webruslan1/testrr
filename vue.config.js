const path = require('path');

module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api/': {
        secure: false,
        changeOrigin: true,
        debug: true,
        target: 'http://localhost:3000',
      },
      '/wss/': {
        secure: true,
        changeOrigin: true,
        debug: true,
        target: 'http://localhost:3000',
      },
    },
  },

  // productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules'],
        },
      },
    },
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));
  },
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/scss/global.scss')],
    });
}
