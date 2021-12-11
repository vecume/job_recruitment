import React, { createContext, useReducer } from 'react';

export enum AuthActions {
  SIGN_IN,
  SING_OUT,
}

export interface IAuthState {
  user?: any | null;
  token?: string | '' | null;
}

export interface IAction {
  type: AuthActions;
  payload?: IAuthState | null;
}

const INITIAL_STATE: IAuthState = {
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  token: localStorage.getItem('token') || '',
};

function reducer(state: IAuthState, action: IAction): IAuthState {
  switch (action.type) {
    case AuthActions.SIGN_IN:
      localStorage.setItem('token', action.payload?.token || '');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      action.payload?.user
        && localStorage.setItem(
          'user',
          JSON.stringify(action.payload?.user) || ''
        );
      return {
        ...state,
        ...action.payload,
      };
    case AuthActions.SING_OUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
}

function useAuthReducer() {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return {
    authState,
    authDispatch,
  };
}

export const AuthContext = createContext(
  {} as ReturnType<typeof useAuthReducer>
);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const { authState, authDispatch } = useAuthReducer();
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
