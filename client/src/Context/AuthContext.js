import { createContext } from 'react';
import { deleteCookies } from '@Util/cookie';

export const initialAuthState = {
  token:
    localStorage.getItem('token') && localStorage.getItem('token') !== 'null'
      ? localStorage.getItem('token')
      : '',
  isLoggedIn: false,
  user: {
    id: null,
    username: '',
    avatar: null,
  },
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
      deleteCookies('auth', state.token);
      localStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isLoggedIn: false,
      };
    }
    case 'SET_USERINFO': {
      const user = action.data;
      return {
        ...state,
        user,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();
