import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}): JSX.Element => (
  <Route
    {...rest}
    render={
      (props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      // eslint-disable-next-line react/jsx-curly-newline
    }
  />
);

export default PrivateRoute;
