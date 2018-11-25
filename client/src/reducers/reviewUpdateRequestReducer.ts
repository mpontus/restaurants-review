import { isActionOf } from "typesafe-actions";
import {
  deleteReview,
  replyToReview,
  updateReview
} from "../actions/reviewListActions";
import { RequestError } from "../models/RequestError";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";
import { eitherPredicate } from "./utils/eitherPredicate";

/**
 * Manages request state for review updates.
 */
export const reviewUpdateRequestReducer = createNamespaceReducer(
  eitherPredicate(
    isActionOf(replyToReview.request),
    isActionOf(replyToReview.success),
    isActionOf(replyToReview.failure),
    isActionOf(updateReview.request),
    isActionOf(updateReview.success),
    isActionOf(updateReview.failure),
    isActionOf(deleteReview.request),
    isActionOf(deleteReview.success),
    isActionOf(deleteReview.failure)
  ),
  action => action.payload.review.id,
  createRequestStatusReducer(
    eitherPredicate(
      isActionOf(replyToReview.request),
      isActionOf(updateReview.request),
      isActionOf(deleteReview.request)
    ),
    eitherPredicate(
      isActionOf(replyToReview.success),
      isActionOf(updateReview.success),
      isActionOf(deleteReview.success)
    ),
    eitherPredicate(
      isActionOf(replyToReview.failure),
      isActionOf(updateReview.failure),
      isActionOf(deleteReview.failure)
    ),
    action => action.payload.error as RequestError<any>
  )
);
