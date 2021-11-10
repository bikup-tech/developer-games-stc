/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({
  path, component: Compo, exact, ...rest
}) {
  const access = useSelector(({ authReducer }) => authReducer?.user?.isLogged);
  return (
    <Route
      to={path}
      exact={exact}
      {...rest}
      render={(props) => (access
        ? <Compo {...props} />
        : <Redirect to="/" />)}
    />
  );
}

export default ProtectedRoute;
