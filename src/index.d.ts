import { Context, Dispatch, ReactNode } from "react";

import { AuthAction, AuthState } from "./service";

// PROPS
interface KeycloakProviderProps {
  children: ReactNode;
}
interface KeycloakWrapperProps {
  children: ReactNode;
  backendURL?: string;
}

// Interface that extends the AuthState interface and adds a dispatch function.
export interface AuthStateWithDispatch extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// CONSTANTS
export declare const AuthContext: Context<AuthState>;

// FUNCTIONS
export declare function KeycloakProvider(
  props: KeycloakProviderProps
): JSX.Element;
export declare function KeycloakWrapper(
  props: KeycloakWrapperProps
): JSX.Element;

// Exported types from ./service
export { AuthAction, AuthState, AuthActionType, useKeycloak } from "./service";
