import { isActionOf } from "typesafe-actions";
import { loadReviews } from "../actions/reviewListActions";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";

/**
 * Stores status of review list requests
 */
export const reviewListRequestReducer = createRequestStatusReducer(
  isActionOf(loadReviews.request),
  isActionOf(loadReviews.success),
  isActionOf(loadReviews.failure),
  action => action.payload.error
);
