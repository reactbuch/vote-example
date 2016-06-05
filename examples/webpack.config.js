var path = require('path');
var webpack = require('webpack');
var argv = require('yargs').argv;

// common webpack config for the example folders
// folder structure:
// <baseDir>
//  I---------- public/index.html (need to include dist/example-app.js)
//  I---------- src/main.js <-- webpack entry file
//  I-----------src/...js <-- more js files (optional)
//
//  application output: dist/example-app.js

const example = argv.example;
const hotLoader = false; // argv.disableHotLoader ? false : true;

console.log('__dirname : ' + __dirname);
console.log('example   : ' + example);

const mainJs = path.resolve(__dirname, `${example}/main.js`);
const outputPath = path.resolve(__dirname, `${example}/public/dist`);

console.log('mainJs    : ' + mainJs);
console.log('outputPath: ' + outputPath);

const babelLoaders = hotLoader ? ['react-hot', 'babel'] : 'babel';
const entries = hotLoader ? ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', mainJs] : mainJs;
const plugins = hotLoader ? [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
] : null;

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry:   entries,
  output:  {
    path:       outputPath,
    publicPath: 'dist/',
    filename:   'example-app.js'
  },
  module:  {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: babelLoaders}
    ]
  },
  plugins: plugins,
  stats:   {
    colors: true
  },
  devtool: 'source-map'
};
