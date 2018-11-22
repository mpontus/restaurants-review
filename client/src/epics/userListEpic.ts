import { combineEpics, Epic } from "redux-observable";
import { from } from "rxjs";
import { filter, map, mapTo, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import * as actions from "../actions/userListActions";
import { createUser } from "../api/method/createUser";
import { deleteUser } from "../api/method/deleteUser";
import { getUsers } from "../api/method/getUsers";
import { updateUser } from "../api/method/updateUser";
import { Dependencies } from "../configureStore";
import { State } from "../reducers";
import { handleApiError } from "./utils/handleApiError";
import { replayLastWhen } from "./utils/replayLastWhen";

/**
 * Load user list epic
 *
 * Handlers retrieval of frontpage restaurants
 */
export const loadUserListEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.loadUsers.request)),
    // Refetch the last page whenever place list is modified
    replayLastWhen(
      action$.pipe(
        filter(
          isActionOf([
            actions.createUser.success,
            actions.updateUser.success,
            actions.deleteUser.success
          ])
        )
      )
    ),
    switchMap(action => {
      const criteria = action.payload;
      const limit = config.pageLimit;
      const offset = criteria.page * limit;

      return from(
        getUsers(api, {
          take: limit,
          skip: offset
        })
      ).pipe(
        map(page =>
          actions.loadUsers.success({
            criteria,
            page: {
              nextPageExists: offset + page.items.length < page.total,
              prevPageExists: offset > 0,
              total: page.total,
              offset,
              items: page.items
            }
          })
        ),
        handleApiError(error =>
          actions.loadUsers.failure({
            criteria,
            error
          })
        )
      );
    })
  );
};

/**
 * Create user epic
 *
 * Handles creation of new users.
 */
export const createUserEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.createUser.request)),
    switchMap(action =>
      from(createUser(api, action.payload)).pipe(
        map(actions.createUser.success),
        handleApiError(actions.createUser.failure)
      )
    )
  );
};

/**
 * Update user epic
 *
 * Handles updates to user record.
 */
export const updateUserEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.updateUser.request)),
    switchMap(action =>
      from(
        updateUser(api, {
          id: action.payload.user.id,
          ...action.payload.data
        })
      ).pipe(
        map(user => actions.updateUser.success({ user })),
        handleApiError(error =>
          actions.updateUser.failure({
            user: action.payload.user,
            error
          })
        )
      )
    )
  );
};

/**
 * Delete user epic
 *
 * Handles user deletion.
 */
export const deleteUserEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.deleteUser.request)),
    switchMap(action =>
      from(
        deleteUser(api, {
          id: action.payload.user.id
        })
      ).pipe(
        mapTo(actions.deleteUser.success(action.payload)),
        handleApiError(error =>
          actions.deleteUser.failure({
            ...action.payload,
            error
          })
        )
      )
    )
  );
};

/**
 * Export all epics combined
 */
export const userListEpic = combineEpics(
  loadUserListEpic,
  createUserEpic,
  updateUserEpic,
  deleteUserEpic
);
