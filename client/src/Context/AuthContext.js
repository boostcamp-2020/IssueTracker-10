import React, { createContext, useReducer } from 'react';

export const initialAuthState = {
  token: '',
  isLoggedIn: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: '',
        isLoggedIn: false,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();
