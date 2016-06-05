// https://github.com/rackt/react-router/blob/master/docs/advanced/NavigatingOutsideOfComponents.md

import createHistory from 'history/lib/createBrowserHistory';

const history = typeof window !== 'undefined' ? createHistory() : undefined;

export default history;
