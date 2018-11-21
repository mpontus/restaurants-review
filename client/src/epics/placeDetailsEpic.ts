import { Epic } from "redux-observable";
import { from } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlace } from "../actions/placeDetailsActions";
import { getPlace } from "../api/method/getPlace";
import { Dependencies } from "../configureStore";
import { State } from "../reducers";
import { handleApiError } from "./utils/handleApiError";

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
    switchMap(action =>
      from(getPlace(api, { id: action.payload.id })).pipe(
        map(place =>
          loadPlace.success({
            id: action.payload.id,
            place
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
