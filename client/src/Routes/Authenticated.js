import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { parseCookies } from '@Util/cookie';
import Login from '@Components/Login';
import { AuthStateContext, AuthDispatchContext } from '../Context/AuthContext';

export default ({ component: Component, ...rest }) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  if (!authState.token) {
    const { auth } = parseCookies(document.cookie);
    if (auth) authDispatch({ type: 'LOGIN', token: auth });
  }
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        authState.token ? (
          <Component {...props} location={location} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const CheckLogin = ({ component: Component, ...rest }) => {
  const authState = useContext(AuthStateContext);
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        authState.token ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : (
          <Login {...props} location={location} />
        )
      }
    />
  );
};
