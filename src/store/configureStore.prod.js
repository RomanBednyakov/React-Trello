import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import rootReducer from '../reducers';

const reduxRouterMiddleware = routerMiddleware(createBrowserHistory());
const middleware = [
  reduxRouterMiddleware,
  thunk,
].filter(Boolean);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
  ));

  return store;
}

export default configureStore;
