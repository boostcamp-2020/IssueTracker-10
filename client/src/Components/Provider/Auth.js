import React, { useReducer } from 'react';
import {
  AuthStateContext,
  AuthDispatchContext,
  initialAuthState,
  authReducer,
} from '../../Context/AuthContext';

export default ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
