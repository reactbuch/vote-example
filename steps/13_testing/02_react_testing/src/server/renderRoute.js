import React from 'react';
import { RoutingContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import routes from '../common/routes';
import configureStore from '../common/store/configureStore';

// important to create a new store per request, otherwise it gets reused with all requests and data keeps on adding
export default function renderRoute(request, reply, store = configureStore()) {
  const location = request.path;
  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      reply.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      reply(error.message).code(500);
    } else if (renderProps == null) {
      reply('Not found').code(404);
    } else {
      preRenderComponents(renderProps.components, renderProps, store).then(() => {
        const html = renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps}/>
          </Provider>
        );
        const initialData = store.getState();
        reply(renderFullPage(html, initialData));
      }).catch((error) => reply(error).code(500));
    }
  });
}

// https://github.com/gaearon/redux-thunk
function preRenderComponents(components, renderProps, store) {
  const preRenderableComponents = components.filter(component => component && component.preRender);
  const preRenderPromises =
    preRenderableComponents.map(component => store.dispatch(component.preRender(renderProps)));
  return Promise.all(preRenderPromises);
}

function renderFullPage(html, initialData) {
  return `<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
      <title>Votes as a Service</title>
      <link rel="stylesheet" href="/tetra.css">
<script>
  window.__INITIAL_STATE__ = ${JSON.stringify(initialData)};
</script>
  </head>

  <body>
    <div id="voteAppMountPoint">${html}</div>
  </body>

  <script type="text/javascript"
          src="/dist/vote-app.js">
  </script>
    <script>
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API
    function onLoad() {
      var now = new Date().getTime();
      var page_load_time = now - performance.timing.navigationStart;
      console.log("User-perceived page loading time: " + page_load_time);
    }
    window.onload = onLoad;
  </script>
</html>`;
}
