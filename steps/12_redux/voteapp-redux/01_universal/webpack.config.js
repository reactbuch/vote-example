module.exports = {
  entry:   './src/client/main.js',
  output:  {
    path:     __dirname,
    filename: 'public/dist/vote-app.js'
  },
  module:  {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
