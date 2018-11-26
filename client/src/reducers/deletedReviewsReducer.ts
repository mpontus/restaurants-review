import { isActionOf } from "typesafe-actions";
import { deleteReview } from "../actions/reviewListActions";
import { createDeletedEntityReducer } from "./utils/createDeletedEntityReducer";

/**
 * Keeps track of deleted reviews
 */
export const deletedReviewsReducer = createDeletedEntityReducer(
  isActionOf(deleteReview.success),
  action => action.payload.review.id
);
