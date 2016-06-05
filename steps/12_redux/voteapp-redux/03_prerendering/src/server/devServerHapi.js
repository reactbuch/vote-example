/**
 * Import dependencies
 */
const path = require('path');
const Webpack = require('webpack');
const WebpackPlugin = require('hapi-webpack-plugin');
const config = require('../../webpack.config.hot');

export function setup(server, publicPath) {
  console.log("PublicPath: " + publicPath);

  server.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom && request.response.output.statusCode === 404) {
      // use index.html as fallback in case of 404 errors (esp to enable React Router with BrowserHistory)
      // (something like Webpack Devserver's --history-api-fallback option)
      return reply.file(path.join(publicPath, '/index.html'));
    }

    return reply.continue();
  });
  const compiler = new Webpack(config);

  const assets = {
    noInfo:     true,
    publicPath: config.output.publicPath
  };

  const hot = {};

  /**
   * Register plugin and start server
   */
  server.register({
      register: WebpackPlugin,
      options:  {compiler, assets, hot}
    },
    error => {
      if (error) {
        console.error(error);
      }
    });
}

