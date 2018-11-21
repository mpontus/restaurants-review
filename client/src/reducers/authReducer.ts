import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import * as actions from "../actions/authActions";
import { User } from "../models/User";

interface State {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

const initalState: State = {};

export const authReducer = persistReducer(
  { key: "auth", storage },
  (state: State = initalState, action: Action) => {
    switch (action.type) {
      case getType(actions.login.success):
      case getType(actions.signup.success):
        return {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          user: action.payload.user
        };

      case getType(actions.logout):
        return initalState;

      default:
        return state;
    }
  }
);
