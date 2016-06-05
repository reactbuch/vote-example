const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = {
  devtool: 'source-map',

  entry:   [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/client/main.js' // HelloMessage app
  ],
  output:  {
    path:       path.join(__dirname, 'public/dist'),
    filename:   'app.js',
    publicPath: '/dist'
  },
  module:  {
    loaders: [
      {
        test:    /\.jsx?/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};

new WebpackDevServer(webpack(config), {
  publicPath:         config.output.publicPath,
  contentBase:        path.join(__dirname, 'public'),
  hot:                true,
  historyApiFallback: true
}).listen(8080, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at localhost:8080');
});
