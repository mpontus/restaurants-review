import { combineEpics, Epic } from "redux-observable";
import { from, merge } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  skip,
  switchMap,
  tap
} from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import * as actions from "../actions/placeListActions";
import { createPlace } from "../api/method/createPlace";
import { deletePlace } from "../api/method/deletePlace";
import { getOwnPlaces } from "../api/method/getOwnPlaces";
import { getPlaces } from "../api/method/getPlaces";
import { updatePlace } from "../api/method/updatePlace";
import { State } from "../reducers";
import * as routes from "../routes";
import { makeGetCurrentUser } from "../selectors/authSelectors";
import { Dependencies } from "../store";
import { handleApiError } from "./utils/handleApiError";
import { replayLastWhen } from "./utils/replayLastWhen";

/**
 * Place list epic
 *
 * Handlers retrieval of frontpage restaurants
 */
export const loadPlaceListEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.loadPlaces.request)),
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
              actions.createPlace.success,
              actions.updatePlace.success,
              actions.deletePlace.success
            ])
          )
        )
      )
    ),
    switchMap(action => {
      const criteria = action.payload;
      const limit = config.pageLimit;
      const offset = criteria.page * limit;

      return from(
        "own" in criteria
          ? getOwnPlaces(api, {
              take: limit,
              skip: offset
            })
          : getPlaces(api, {
              take: limit,
              skip: offset,
              rating: criteria.rating || undefined
            })
      ).pipe(
        map(page =>
          actions.loadPlaces.success({
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
          actions.loadPlaces.failure({
            criteria,
            error
          })
        )
      );
    })
  );
};

/**
 * Create place epic
 *
 * Handles creation of new places.
 */
export const createPlaceEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.createPlace.request)),
    switchMap(action =>
      from(createPlace(api, action.payload)).pipe(
        map(actions.createPlace.success),
        handleApiError(actions.createPlace.failure)
      )
    )
  );
};

/**
 * Update place epic
 *
 * Handles updates to place record.
 */
export const updatePlaceEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config }
) => {
  return action$.pipe(
    filter(isActionOf(actions.updatePlace.request)),
    switchMap(action =>
      from(
        updatePlace(api, {
          id: action.payload.place.id,
          ...action.payload.data
        })
      ).pipe(
        map(place => actions.updatePlace.success({ place })),
        handleApiError(error =>
          actions.updatePlace.failure({
            place: action.payload.place,
            error
          })
        )
      )
    )
  );
};

/**
 * Delete place epic
 *
 * Handles place deletion.
 */
export const deletePlaceEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api, config, history }
) => {
  return action$.pipe(
    filter(isActionOf(actions.deletePlace.request)),
    switchMap(action =>
      from(
        deletePlace(api, {
          id: action.payload.place.id
        })
      ).pipe(
        mapTo(actions.deletePlace.success(action.payload)),
        tap(() => {
          if (action.payload.fromDetails) {
            // Redirect user back to the front page when place is deleted
            history.replace(routes.HOME);
          }
        }),
        handleApiError(error =>
          actions.deletePlace.failure({
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
export const placeListEpic = combineEpics(
  loadPlaceListEpic,
  createPlaceEpic,
  updatePlaceEpic,
  deletePlaceEpic
);
