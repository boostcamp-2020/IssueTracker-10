import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthStateContext } from '../Context/AuthContext';
import Issue from './Issue';

export default () => {
  const state = useContext(AuthStateContext);
  return <>{2 - 1 === 1 ? <Issue /> : <Redirect from="*" to="/login" />}</>;
};
