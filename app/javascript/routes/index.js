import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import RegisterPage from '../containers/RegisterPage';
import EventPage from '../containers/EventPage';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/events' component={EventPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={RegisterPage} />
    </Switch>
  );
};

export default AppRouter;
