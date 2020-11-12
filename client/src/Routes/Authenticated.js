import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { parseCookies } from '@Util/parse';
import { AuthStateContext, AuthDispatchContext } from '../Context/AuthContext';

export default ({ component: Component, page, ...rest }) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  if (!authState.token) {
    const { auth } = parseCookies(document.cookie);
    if (auth) authDispatch({ type: 'LOGIN', token: auth });
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.token ? (
          <CheckLogin Component={Component} page={page} {...rest} />
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

const CheckLogin = ({ Component, page, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        page !== 'login' ? (
          <Component location={location} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
