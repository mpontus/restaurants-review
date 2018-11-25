import { Epic } from "redux-observable";
import { from, merge } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  skip,
  switchMap
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlace } from "../actions/placeDetailsActions";
import {
  createReview,
  deleteReview,
  replyToReview,
  updateReview
} from "../actions/reviewListActions";
import { getPlace } from "../api/method/getPlace";
import { Dependencies } from "../configureStore";
import { Review } from "../models/Review";
import { State } from "../reducers";
import { makeGetCurrentUser } from "../selectors/authSelectors";
import { handleApiError } from "./utils/handleApiError";
import { replayLastWhen } from "./utils/replayLastWhen";

/**
 * Place details epic
 *
 * Fetches a single place
 */
export const placeDetailsEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(loadPlace.request)),
    // Refresh most recently viewed place when its reviews or
    // permissions may have changed.
    replayLastWhen(
      merge(
        state$.pipe(
          map(makeGetCurrentUser()),
          distinctUntilChanged(),
          skip(1)
        ),
        action$.pipe(
          filter(
            isActionOf([
              createReview.success,
              replyToReview.success,
              updateReview.success,
              deleteReview.success
            ])
          )
        )
      )
    ),
    switchMap(action =>
      from(getPlace(api, { id: action.payload.id })).pipe(
        map(place =>
          loadPlace.success({
            id: action.payload.id,
            place: {
              ...place,
              bestReview: place.bestReview
                ? ({ ...place.bestReview, place } as Review)
                : undefined,
              worstReview: place.worstReview
                ? ({ ...place.worstReview, place } as Review)
                : undefined,
              ownReview: place.ownReview
                ? ({ ...place.ownReview, place } as Review)
                : undefined
            }
          })
        ),
        handleApiError(error =>
          loadPlace.failure({
            id: action.payload.id,
            error
          })
        )
      )
    )
  );
};
