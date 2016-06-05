import React from 'react';
import { renderToString } from 'react-dom/server';

import HelloMessage from '../common/HelloMessage';

function renderFullPage(html) {
  return `
<html>
  <body>
    <div id="mount">${html}</div>
  </body>
  <script type="text/javascript"
          src="/dist/app.js">
  </script>
</html>`;
}

export default function(request, reply) {
  const greeting = 'World';
  const html =
    renderToString(<HelloMessage greeting={greeting}/>);
  reply(renderFullPage(html));
};

