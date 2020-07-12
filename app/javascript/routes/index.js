import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import EventPage from '../containers/EventPage';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/events' component={EventPage} />
    </Switch>
  );
};

export default AppRouter;
