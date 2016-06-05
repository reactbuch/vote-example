import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import HelloMessage from '../common/HelloMessage';

function renderFullPage(html) {
  return `
<html>
<body>
  ${html}
</body>
</html>`;
}

export default function(request, reply) {
  const greeting = 'Hello';
  const html =
    renderToStaticMarkup(<HelloMessage greeting={greeting}/>);
  reply(renderFullPage(html));
};



