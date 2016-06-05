
const path = require('path');
const argv = process.argv;

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const basedir = path.join(__dirname, argv[2]);
const entry = path.join(basedir, 'main.js');
const distpath = path.join(basedir, 'dist');

console.log('======================================================');
console.log(` RUNNING EXAMPLE AT ${basedir}`);
console.log(`             entry: ${entry}`);
console.log(`          distpath: ${distpath}`);
console.log('======================================================');

const config = {
  devtool: 'source-map',

  entry:  [ entry ],
  output: {
    path:       distpath,
    filename:   'example-app.js',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?/,
        loaders: ['babel'],
        include: basedir
      }
    ]
  }
};

new WebpackDevServer(webpack(config), {
  publicPath:         config.output.publicPath,
  contentBase:        basedir,
  hot:                false,
  historyApiFallback: true
}).listen(8080, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at localhost:8080');
});
