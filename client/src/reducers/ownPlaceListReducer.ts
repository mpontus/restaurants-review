import { Reducer } from "redux";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlaces } from "../actions/placeListActions";
import { Page } from "../models/Page";
import { allPredicates } from "./utils/allPredicates";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createPageReducer } from "./utils/createPageReducer";

/**
 * States contains pages of ids.
 */
type State = Partial<{
  [page: string]: Page<string>;
}>;

/**
 * Own Place List Reducer
 *
 * Reducer for user's own place list pagination.
 */
export const ownPlaceListReducer: Reducer<
  State,
  Action
> = createNamespaceReducer(
  allPredicates(isActionOf(loadPlaces.success), action =>
    Boolean(action.payload.criteria.own)
  ),
  action => `${action.payload.criteria.page || 0}`,
  createPageReducer(action => action.payload.page)
);
