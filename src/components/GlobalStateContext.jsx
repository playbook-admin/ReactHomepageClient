import React, { createContext, useContext, useReducer } from 'react';

// Define initial state and actions
const initialState = {
  loading: false,
  apiAddress: process.env.REACT_APP_API_ADDRESS || '', // Set API address from .env
};

const SET_LOADING = 'SET_LOADING';
const SET_APIADDRESS = 'SET_APIADDRESS';

// Create the context and reducer
const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const globalReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_APIADDRESS:
      return { ...state, apiAddress: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Global provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

// Custom hooks to use global state and dispatch
export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);

// Custom hooks for specific state and dispatch actions
export const useLoading = () => {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();
  
  return {
    loading: state.loading,
    setLoading: (value) => dispatch({ type: SET_LOADING, payload: value })
  };
};

export const useApiAddress = () => {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();
  
  return {
    apiAddress: state.apiAddress,
    setApiAddress: (address) => dispatch({ type: SET_APIADDRESS, payload: address })
  };
};
