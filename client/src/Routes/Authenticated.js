import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { parseCookies } from '@Util/cookie';
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
      render={({ location, ...props }) =>
        authState.token ? (
          <CheckLogin Component={Component} page={page} {...props} location={location} />
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

const CheckLogin = ({ Component, page, location, ...rest }) => {
  return (
    <>
      {page !== 'login' ? (
        <Component location={location} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      )}
    </>
  );
};
