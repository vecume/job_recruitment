import React, { createContext, useReducer } from 'react';

export interface IGlobalState {
  data: any
}

export interface IAction {
  payload: any
}

const INITIAL_STATE: IGlobalState = {
  data: {}
};

function reducer(state: IGlobalState, action: IAction): IGlobalState {
  return {
    data: {
      ...state.data,
      ...action.payload
    }
  };
}

function useGlobalReducer() {
  const [globalState, globalDispatch] = useReducer(reducer, INITIAL_STATE);
  return {
    globalState,
    globalDispatch,
  };
}

export const GlobalContext = createContext(
  {} as ReturnType<typeof useGlobalReducer>
);

export const GlobalProvider: React.FunctionComponent = ({ children }) => {
  const { globalState, globalDispatch } = useGlobalReducer();
  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
