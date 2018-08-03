import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router';

import Base from './containers/Base/Base';
import Board from './containers/Board/Board';

export const urls = {
  index: '/',
};

export const routes = (
  <Switch>
    <Route path={urls.index} component={Base}>
      <IndexRoute component={Board} />
    </Route>
  </Switch>
);
