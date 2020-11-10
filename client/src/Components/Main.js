import React, { useContext } from 'react';
import { AuthStateContext } from '../Context/AuthContext';
import Issue from './Issue/Issue';
import { parseCookies } from '../utils/parse';

export default (props) => {
  const state = useContext(AuthStateContext);
  if (!state.token) {
    const { auth } = parseCookies(document.cookie);
    if (!auth) props.history.push('/login');
    else return <Issue token={auth} />;
  }
  return <Issue token={state.token} />;
};
