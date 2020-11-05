import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthStateContext } from '../Context/AuthContext';

export default () => {
  const state = useContext(AuthStateContext);
  return <>{!state.token && <Redirect from="*" to="/login" />}</>;
};
