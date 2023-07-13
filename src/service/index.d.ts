// Defines the possible types of authentication actions.
export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_TOKEN = "SET_TOKEN",
}

declare interface AuthService {
  state: AuthState;
  getLoginURL: (backendURL?: string) => string;
  getLogoutURL: (backendURL?: string) => string;
  getAuthorizationHeader: () => string;
  setUserInfo: (token: string) => void;
  hasRole: (role: string) => boolean;
  refreshAccessToken: (backendURL?: string) => Promise<void>;
}

export declare interface AuthState {
  accessToken: string;
  userInfo?: Record<string, any>;
}
export declare interface AuthAction {
  type: AuthActionType;
  payload?: { accessToken?: string; userInfo?: Record<string, any> };
}

// CONSTANTS
declare const initialState: AuthState;

// FUNCTIONS
export declare function useKeycloak(): AuthService;
declare function reducer(state: AuthState, action: AuthAction): AuthState;
