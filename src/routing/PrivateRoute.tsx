import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../store/userSlice';

const PrivateRoute = ({ component: Component, ...rest }): JSX.Element => {
  const { isAuthenticated, isFetching } = useSelector(getUser);

  return (
    <Route
      {...rest}
      render={
        (props) =>
          !isAuthenticated && !isFetching ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};

export default PrivateRoute;
