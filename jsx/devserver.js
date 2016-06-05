const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = {
  devtool: 'source-map',

  entry:  [
    './src/main.js'
  ],
  output: {
    path:       path.join(__dirname, 'public/dist'),
    filename:   'jsx-example.js',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};

new WebpackDevServer(webpack(config), {
  publicPath:         config.output.publicPath,
  contentBase:        path.join(__dirname, 'public'),
  hot:                false,
  historyApiFallback: true
}).listen(8080, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at localhost:8080');
});
