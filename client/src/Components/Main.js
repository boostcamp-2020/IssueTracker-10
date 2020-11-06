import React, { useContext } from 'react';
import { AuthStateContext, AuthDispatchContext } from '../Context/AuthContext';
import Issue from './Issue';
import { parseCookies } from '../utils/parse';

export default (props) => {
  const state = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);
  if (!state.token) {
    const { auth } = parseCookies(document.cookie);
    if (!auth) props.history.push('/login');
    dispatch({ type: 'LOGIN', token: auth });
  }
  return <Issue />;
};
