import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

import history from '../history';
import { syncHistory } from 'react-router-redux';

export default function configureStore(initialState) {
  const reduxRouterMiddleware = syncHistory(history);
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, reduxRouterMiddleware)
  );

  return store;
}