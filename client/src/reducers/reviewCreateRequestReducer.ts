import { isActionOf } from "typesafe-actions";
import { createReview } from "../actions/reviewListActions";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";

/**
 * Manages request state for review updates.
 */
export const reviewCreateRequestReducer = createRequestStatusReducer(
  isActionOf(createReview.request),
  isActionOf(createReview.success),
  isActionOf(createReview.failure),
  action => action.payload.error
);
