import { Reducer } from "redux";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlaces } from "../actions/placeListActions";
import { Page } from "../models/Page";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createPageReducer } from "./utils/createPageReducer";

/**
 * State contains pages of place ids namespaced by rating and page
 */
type State = Partial<{
  [ratingFilter: string]: Partial<{
    [page: string]: Page<string>;
  }>;
}>;

/**
 * Place List Reducer
 *
 * Reducer for frontpage place pagination.
 */
export const placeListReducer: Reducer<State, Action> = createNamespaceReducer(
  isActionOf(loadPlaces.success),
  action => `${action.payload.criteria.rating || 0}`,
  createNamespaceReducer(
    isActionOf(loadPlaces.success),
    action => `${action.payload.criteria.page || 0}`,
    createPageReducer(action => action.payload.page)
  )
);
