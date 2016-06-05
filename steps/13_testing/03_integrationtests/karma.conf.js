const path = require('path');
const webpack = require('webpack');

const BASE_DIR = './';
console.log("=======================================================");
console.log(path.join(__dirname, 'node_modules'));
console.log("================================================================");
module.exports = function(config) {
  config.set({
    browsers:   ['PhantomJS'],
    //    https://github.com/ariya/phantomjs/issues/10522
    frameworks: ['mocha'],
    reporters:  ['mocha'],

    files: [
      `${BASE_DIR}/integration_test/test_index.js`
    ],

    preprocessors: {
      [`${BASE_DIR}/integration_test/test_index.js`]: ['webpack', 'sourcemap']
    },

    webpack: {
      devtool:       'inline-source-map',
      // resolve and resolveLoader https://github.com/webpack/webpack/issues/784#issuecomment-158066166
      // for modules
      resolve:       {
        fallback: [path.join(__dirname, 'node_modules')]
      },
      // same issue, for loaders like babel
      resolveLoader: {
        fallback: [path.join(__dirname, 'node_modules')]
      },
      module:        {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
        ]
      },
      plugins:       [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackServer: {
      noInfo: true
    }
  });

};
