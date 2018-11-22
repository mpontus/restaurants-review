import { Reducer } from "redux";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadReviews } from "../actions/reviewListActions";
import { Page } from "../models/Page";
import { allPredicates } from "./utils/allPredicates";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createPageReducer } from "./utils/createPageReducer";

/**
 * State contains pages of review ids
 */
type State = Partial<{
  [placeId: string]: Partial<{
    [page: string]: Page<string>;
  }>;
}>;

/**
 * Review List Reducer
 *
 * Reducer for detailed place view review pagination.
 */
export const reviewListReducer: Reducer<State, Action> = createNamespaceReducer(
  allPredicates(
    isActionOf(loadReviews.success),
    action => !action.payload.criteria.pending
  ),
  action => action.payload.criteria.place.id,
  createNamespaceReducer(
    isActionOf(loadReviews.success),
    action => `${action.payload.criteria.page || 0}`,
    createPageReducer(action => action.payload.page)
  )
);
