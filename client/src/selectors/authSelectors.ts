import { User } from "../models/User";
import { State } from "../reducers";

/**
 * Return access token
 */
export const makeGetAuthToken = () => (state: State): string | undefined =>
  state.auth.accessToken;

/**
 * Return whether user is authenticated
 */
export const makeIsUserAuthenticated = () => (state: State): boolean =>
  state.auth.accessToken !== undefined;

/**
 * Return currently logged in user
 */
export const makeGetCurrentUser = () => (state: State): User | undefined =>
  state.auth.user;

/**
 * Return login request status
 */
export const makeGetLoginRequestStatus = () => (state: State) =>
  state.authRequest.login;

/**
 * Return signup request status
 */
export const makeGetSignupRequestStatus = () => (state: State) =>
  state.authRequest.signup;
