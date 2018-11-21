import { Epic } from "redux-observable";
import { from } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadReviews } from "../actions/reviewListActions";
import { getPendingReviews } from "../api/method/getPendingReviews";
import { getPlaceReviews } from "../api/method/getPlaceReviews";
import { Dependencies } from "../configureStore";
import { State } from "../reducers";
import { handleApiError } from "./utils/handleApiError";

/**
 * Review list epic
 *
 * Fetches review listings.
 */
export const reviewListEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(loadReviews.request)),
    switchMap(action => {
      const criteria = action.payload;
      const limit = config.pageLimit;
      const offset = criteria.page * limit;

      return from(
        "pending" in criteria
          ? getPendingReviews(api, {
              take: limit,
              skip: offset
            })
          : getPlaceReviews(api, {
              id: criteria.place.id,
              take: limit,
              skip: offset
            })
      ).pipe(
        map(page =>
          loadReviews.success({
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
          loadReviews.failure({
            criteria,
            error
          })
        )
      );
    })
  );
};
