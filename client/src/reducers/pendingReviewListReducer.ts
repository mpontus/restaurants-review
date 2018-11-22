import { Reducer } from "redux";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadReviews } from "../actions/reviewListActions";
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
 * Own Review List Reducer
 *
 * Reducer for user's own review list pagination.
 */
export const pendingReviewListReducer: Reducer<
  State,
  Action
> = createNamespaceReducer(
  allPredicates(isActionOf(loadReviews.success), action =>
    Boolean(action.payload.criteria.pending)
  ),
  action => `${action.payload.criteria.page || 0}`,
  createPageReducer(action => action.payload.page)
);
