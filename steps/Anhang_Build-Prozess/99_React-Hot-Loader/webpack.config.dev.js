const webpack = require('webpack');
const common = require('./webpack.config.common');

const devConfig = Object.assign({}, common, {
  entry:   [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/main.js' // Vote App
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});

module.exports = devConfig;
