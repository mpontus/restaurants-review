import { Epic } from "redux-observable";
import { from } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlaces } from "../actions/placeListActions";
import { getPlaces } from "../api/method/getPlaces";
import { Dependencies } from "../configureStore";
import { State } from "../reducers";
import { handleApiError } from "./utils/handleApiError";

/**
 * Place list epic
 *
 * Handlers retrieval of frontpage restaurants
 */
export const placeListEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(loadPlaces.request)),
    switchMap(action => {
      const criteria = action.payload;
      const limit = config.pageLimit;
      const offset = criteria.page * limit;

      return from(
        getPlaces(api, {
          take: limit,
          skip: offset,
          rating: criteria.rating || undefined
        })
      ).pipe(
        map(page =>
          loadPlaces.success({
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
          loadPlaces.failure({
            criteria,
            error
          })
        )
      );
    })
  );
};
