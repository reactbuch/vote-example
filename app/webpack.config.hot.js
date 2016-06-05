const webpack = require('webpack');
const common = require('./webpack.config.dev');

// copy module config from dev config but add 'react-hmre' preset
// to babel-loader config
const moduleCfg = Object.assign({}, common.module, {
  loaders: common.module.loaders.map(loader => {
    if (loader.loader !== 'babel') {
      return loader;
    }

    return Object.assign({}, loader, {
      query: {
        "presets": ["react-hmre"]
      }
    });
  })
});

module.exports = Object.assign({}, common, {
  entry:   [
             'eventsource-polyfill', // necessary for hot reloading with IE
             'webpack-hot-middleware/client'
           ].concat(common.entry),
  module:  moduleCfg,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});
