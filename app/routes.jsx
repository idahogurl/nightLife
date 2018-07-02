import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexScreen from './screens/Index';

const routes = (
  <Switch>
    <Route path="/" component={IndexScreen} />
  </Switch>
);

export default routes;
