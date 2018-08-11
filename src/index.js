require('babel-polyfill');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import configureStore from './store/configureStore';

import './assets/temp.styl';
import Board from './containers/Board/Board';
import Login from './containers/login/login';
import Registration from './containers/registration/registration';

const store = configureStore();
const history = createBrowserHistory();
if (history.location.pathname === '/share//') {
  const url = String(history.location.search);
  const token = url.match('%22(.*)%22');
  localStorage.setItem('token', JSON.stringify(token[1]));
}
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
