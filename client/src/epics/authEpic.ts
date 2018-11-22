import { combineEpics, Epic } from "redux-observable";
import { from } from "rxjs";
import {
  filter,
  ignoreElements,
  map,
  switchMap,
  tap
} from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../actions";
import * as actions from "../actions/authActions";
import { login } from "../api/method/login";
import { signup } from "../api/method/signup";
import { Dependencies } from "../configureStore";
import { State } from "../reducers";
import { makeGetAuthToken } from "../selectors/authSelectors";
import { handleApiError } from "./utils/handleApiError";

/**
 * Handle API authentication
 *
 * Sets authentication token on API gateway after login.
 */
export const setTokenEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  state$.pipe(
    map(makeGetAuthToken()),
    filter(Boolean),
    tap(api.setAuthToken.bind(api)),
    ignoreElements()
  );

/**
 * Handle login
 *
 * Dispatches login details to the API.
 */
export const loginEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(actions.login.request))),
    switchMap(action =>
      from(login(api, action.payload)).pipe(
        map(actions.login.success),
        handleApiError(actions.login.failure)
      )
    )
  );

/**
 * Handle signup
 *
 * Dispatches signup details to the API
 */
export const signupEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(actions.signup.request))),
    switchMap(action =>
      from(signup(api, action.payload)).pipe(
        map(actions.signup.success),
        handleApiError(actions.signup.failure)
      )
    )
  );

export const authEpic = combineEpics(setTokenEpic, loginEpic, signupEpic);
