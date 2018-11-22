import { combineReducers } from "redux";
import { isActionOf } from "typesafe-actions";
import { login, signup } from "../actions/authActions";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";

/**
 * Stores request status for authentication requests
 */
export const authRequestReducer = combineReducers({
  login: createRequestStatusReducer(
    isActionOf(login.request),
    isActionOf(login.success),
    isActionOf(login.failure),
    action => action.payload
  ),
  signup: createRequestStatusReducer(
    isActionOf(signup.request),
    isActionOf(signup.success),
    isActionOf(signup.failure),
    action => action.payload
  )
});
