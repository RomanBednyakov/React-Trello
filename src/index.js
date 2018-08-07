/* eslint-disable global-require */
require('babel-polyfill');
/* eslint-enable global-require */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
// import { Router, browserHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import { syncHistoryWithStore } from 'react-router-redux';

// import { routes } from './routes';

import configureStore from './store/configureStore';

import './assets/temp.styl';
import Board from './containers/Board/Board';
import Login from './containers/login/login';
import Registration from './containers/registration/registration';

const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);
const history = createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/home" component={Board} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Redirect to="/home" exact />
      </Switch>
    </Router>
  </Provider>, document.getElementById('app')
);
