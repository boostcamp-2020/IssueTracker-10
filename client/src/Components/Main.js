import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthStateContext, AuthDispatchContext } from '../Context/AuthContext';
import request from '../Api';
import Home from './Home';

export default (props) => {
  const state = useContext(AuthStateContext);
  return <>{!state.token && <Redirect from="*" to="/login" />}</>;
};
