import { createContext } from 'react';

export const initialAuthState = {
  token:
    localStorage.getItem('token') && localStorage.getItem('token') !== 'null'
      ? localStorage.getItem('token')
      : '',
  isLoggedIn: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { token } = action;
      localStorage.setItem('token', token);
      return {
        ...state,
        token,
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
