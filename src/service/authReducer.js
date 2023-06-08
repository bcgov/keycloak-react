import { AuthActionType } from './index.d.ts';
const { LOGIN, LOGOUT, SET_TOKEN } = AuthActionType;

// Initial authentication state.
export const initialState = {
  accessToken: '',
  userInfo: undefined,
};

/**
 * Handles authentication actions and returns the updated authentication state.
 * @param {AuthState} state - The current authentication state.
 * @param {AuthAction} action - The authentication action to be handled.
 * @returns {AuthState} - The updated authentication state.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return initialState;
    case SET_TOKEN:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};
