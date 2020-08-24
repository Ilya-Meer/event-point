import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import RegisterPage from '../containers/RegisterPage';
import EventPage from '../containers/EventPage';
import SchedulePage from '../containers/SchedulePage';
import { PublicRoute, ProtectedRoute } from './RouteTypes';
import useUserState from '../utils/useUserState';

const AppRouter = () => {
  const { logged_in, user } = useUserState();

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(props) => (
          <HomePage user={user} isLoggedIn={logged_in} {...props} />
        )}
      />
      <ProtectedRoute
        exact
        path='/events'
        isLoggedIn={logged_in}
        user={user}
        component={EventPage}
      />
      <ProtectedRoute
        exact
        path='/schedule'
        isLoggedIn={logged_in}
        user={user}
        component={SchedulePage}
      />
      <PublicRoute
        exact
        path='/login'
        isLoggedIn={logged_in}
        component={LoginPage}
      />
      <PublicRoute
        exact
        path='/register'
        isLoggedIn={logged_in}
        component={RegisterPage}
      />
    </Switch>
  );
};

export default AppRouter;
