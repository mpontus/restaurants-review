import { createSelector } from "reselect";
import { RequestStatus } from "../models/RequestStatus";
import { Review } from "../models/Review";
import { State } from "../reducers";
import { NormalizedReview } from "../reducers/reviewEntityReducer";
import { safeGet } from "./utils/safeGet";

/**
 * Review List Item Parameters
 */
interface ItemProps {
  id?: string;
}

/**
 * Default request status
 */
const defaultRequestStatus = { loading: false, success: false };

/**
 * Return single review by id
 */
export const makeGetReviewById = () =>
  createSelector(
    (state: State) => state,
    (state: State, ownProps: ItemProps) =>
      safeGet(state.reviewEntity, ownProps.id),
    // Denormalize review
    createSelector(
      (state: State, review?: NormalizedReview) => review,
      (state: State, review?: NormalizedReview) =>
        safeGet(state.placeEntity, safeGet(review, "place")),
      (review, place): Review | undefined =>
        // Denormalize place by removing its reviews
        review &&
        Object.assign({}, review, {
          place:
            place &&
            Object.assign({}, place, {
              bestReview: undefined,
              worstReview: undefined,
              ownReview: undefined
            })
        })
    )
  );

/**
 * Get request status for review listing
 */
export const makeGetReviewUpdateRequestStatus = () => (
  state: State,
  ownProps: ItemProps
): RequestStatus<any> => {
  if (!ownProps.id) {
    return state.reviewCreateRequest;
  }

  return state.reviewUpdateRequest[ownProps.id] || defaultRequestStatus;
};
