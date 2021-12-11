import React, { createContext, useReducer } from 'react';

import { ipcRenderer } from 'electron';

export enum AuthActions {
  SIGN_IN,
  SING_OUT,
}

export interface IAuthState {
  ok: boolean;
  role: "employee" | "employer" | null | undefined;
}

export interface IAction {
  type: AuthActions;
  payload?: IAuthState | null;
}

const INITIAL_STATE: IAuthState = {
  ok: false,
  role: null
};

function reducer(state: IAuthState, action: IAction): IAuthState {
  switch (action.type) {
    case AuthActions.SIGN_IN:
      return {
        ok: !!action.payload?.ok,
        role: action.payload?.role
      };
    case AuthActions.SING_OUT:
      ipcRenderer.sendSync("send", {
        method: "logout"
      });
      return {
        ok: false,
        role: null
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
