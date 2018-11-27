import { combineEpics, Epic } from "redux-observable";
import { from } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  ignoreElements,
  map,
  skip,
  switchMap,
  tap
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import * as actions from "../actions/authActions";
import { login } from "../api/method/login";
import { signup } from "../api/method/signup";
import { isAdmin, isOwner } from "../models/User";
import { State } from "../reducers";
import * as routes from "../routes";
import {
  makeGetAuthToken,
  makeGetCurrentUser
} from "../selectors/authSelectors";
import { Dependencies } from "../store";
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
    distinctUntilChanged(),
    tap(token => api.setAuthToken(token || null)),
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
    filter(isActionOf(actions.login.request)),
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
    filter(isActionOf(actions.signup.request)),
    switchMap(action =>
      from(signup(api, action.payload)).pipe(
        map(actions.signup.success),
        handleApiError(actions.signup.failure)
      )
    )
  );

/**
 * Redirect user after successful login
 *
 * Has to happen after state is updated, otherwise AuthGuard will
 * redirect the user back to the frontpage.
 */
export const redirectAfterLoginEpic: Epic<
  Action,
  Action,
  State,
  Dependencies
> = (action$, state$, { history }) =>
  // Wait for login action
  action$.pipe(
    filter(isActionOf(actions.login.request)),
    switchMap(() =>
      // Wait for the store to reflect new auth state
      state$.pipe(
        // Skip the initial state
        skip(1),
        map(makeGetCurrentUser()),
        distinctUntilChanged(),
        tap(user => {
          if (user === undefined) {
            return;
          }

          // Redirect admin to user management
          if (isAdmin(user)) {
            history.push(routes.USERS);
            return;
          }

          // Redirect owner to their own places
          if (isOwner(user)) {
            history.push(routes.PLACES_OWN);
            return;
          }
        }),
        ignoreElements()
      )
    )
  );

/**
 * Combine epics
 */
export const authEpic = combineEpics(
  setTokenEpic,
  loginEpic,
  signupEpic,
  redirectAfterLoginEpic
);
