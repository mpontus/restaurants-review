import { Reducer } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import * as actions from "../actions/authActions";
import { User } from "../models/User";

/**
 * State shape
 */
interface State {
  /**
   * Access Token to make authenticated requests
   */
  accessToken?: string;

  /**
   * Refresh token to refresh the session when access token expires
   */
  refreshToken?: string;

  /**
   * Information about the logged in user.
   */
  user?: User;
}

/**
 * Initial state
 */
const initialState: State = {};

/**
 * Authentication Reducer
 *
 * Stores user authentication state, persists across page reloads.
 */
export const authReducer = persistReducer(
  { key: "auth", storage },
  (state = {}, action) => {
    switch (action.type) {
      case getType(actions.login.success):
      case getType(actions.signup.success):
        return {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          user: action.payload.user
        };

      case getType(actions.logout):
        return initialState;

      default:
        return state;
    }
  }
) as Reducer<State, Action>;
