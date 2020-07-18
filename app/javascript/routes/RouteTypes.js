import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const BasicRoute = ({
  component: Component,
  isProtected,
  isLoggedIn,
  ...rest
}) => {
  const shouldBeRedirected =
    (!isLoggedIn && isProtected) || (isLoggedIn && !isProtected);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (shouldBeRedirected) {
          return <Redirect to='/' />;
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

const PublicRoute = (props) => <BasicRoute isProtected={false} {...props} />;

const ProtectedRoute = (props) => <BasicRoute isProtected {...props} />;

export { PublicRoute, ProtectedRoute };
