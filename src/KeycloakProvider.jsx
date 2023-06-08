import React, { createContext, useReducer } from 'react';

import { initialState, reducer } from './service/authReducer';

// Create an initial context with initialState.
export const AuthContext = createContext(initialState);

/**
 * Provides a keycloak authentication context to its children.
 * @param {ReactNode} children - The children components to be wrapped with the authentication context.
 */
export const KeycloakProvider = (props) => {
  const { children } = props;
  // Initialize the authentication state and dispatch function using the reducer.
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default KeycloakProvider;
