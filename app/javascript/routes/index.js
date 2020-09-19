import React, { Fragment, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { FlashContext } from '../contexts/FlashContext';
import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import RegisterPage from '../containers/RegisterPage';
import EventPage from '../containers/EventPage';
import SchedulePage from '../containers/SchedulePage';
import Header from '../components/Header';
import FlashMessage from '../components/FlashMessage';
import { PublicRoute, ProtectedRoute } from './RouteTypes';
import useUserState from '../utils/useUserState';

const AppRouter = () => {
  const { logged_in, user } = useUserState();
  const { message } = useContext(FlashContext);

  return (
    <Fragment>
      <Header isLoggedIn={logged_in} />
      {message.text && (
        <FlashMessage text={message.text} variant={message.variant} />
      )}
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
    </Fragment>
  );
};

export default AppRouter;
