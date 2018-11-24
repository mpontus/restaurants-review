import { createSelector } from "reselect";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { SavePlaceDto } from "../models/SavePlaceDto";
import { State } from "../reducers";
import { NormalizedPlace } from "../reducers/placeEntityReducer";
import { safeGet } from "./utils/safeGet";

/**
 * Place List Item Parameters
 */
interface ItemProps {
  id?: string;
}

/**
 * Default request status
 */
const defaultRequestStatus = { loading: false, success: false };

/**
 * Return single place by id
 */
export const makeGetPlaceById = () =>
  createSelector(
    (state: State) => state,
    (state: State, ownProps: ItemProps) =>
      safeGet(state.placeEntity, ownProps.id),
    // Denormalize place
    createSelector(
      (state: State, place?: NormalizedPlace) => place,
      (state: State, place?: NormalizedPlace) =>
        safeGet(state.reviewEntity, safeGet(place, "bestReview")),
      (state: State, place?: NormalizedPlace) =>
        safeGet(state.reviewEntity, safeGet(place, "worstReview")),
      (state: State, place?: NormalizedPlace) =>
        safeGet(state.reviewEntity, safeGet(place, "ownReview")),
      (place, bestReview, worstReview, ownReview): Place | undefined => {
        // Denormalize reviews by removing place reference
        return (
          place &&
          Object.assign({}, place, {
            bestReview:
              bestReview && Object.assign({}, bestReview, { place: undefined }),
            worstReview:
              worstReview &&
              Object.assign({}, worstReview, { place: undefined }),
            ownReview:
              ownReview && Object.assign({}, ownReview, { place: undefined })
          })
        );
      }
    )
  );

/**
 * Get request status for place listing
 */
export const makeGetPlaceUpdateRequestStatus = () => (
  state: State,
  ownProps: ItemProps
): RequestStatus<SavePlaceDto> => {
  if (!ownProps.id) {
    return state.placeCreateRequest;
  }

  return state.placeUpdateRequest[ownProps.id] || defaultRequestStatus;
};
