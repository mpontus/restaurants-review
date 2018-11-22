import { Epic } from "redux-observable";
import { from } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadUsers } from "../actions/userListActions";
import { getUsers } from "../api/method/getUsers";
import { Dependencies } from "../configureStore";
import { State } from "../reducers";
import { handleApiError } from "./utils/handleApiError";

/**
 * User list epic
 *
 * Handlers retrieval of frontpage restaurants
 */
export const userListEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(loadUsers.request)),
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
          loadUsers.success({
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
          loadUsers.failure({
            criteria,
            error
          })
        )
      );
    })
  );
};
