import { createSelector, ParametricSelector } from "reselect";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { SavePlaceDto } from "../models/SavePlaceDto";
import { State } from "../reducers";
import { NormalizedPlace } from "../reducers/placeEntityReducer";

/**
 * Place List Item Parameters
 */
interface ItemProps {
  id?: string;
}

/**
 * Create memoized place denormalization selector
 *
 * Using memoized selector for denormalization allows us to save
 * object identity when normalized place and embedded reviews remain
 * the same.
 */
const makePlaceDenormalizer = (): ParametricSelector<
  State,
  NormalizedPlace,
  Place
> =>
  createSelector(
    // Pass normalized place to result selector
    (state: State, place: NormalizedPlace) => place,

    // Find referenced best review
    (state: State, place: NormalizedPlace) =>
      place.bestReview ? state.reviewEntity[place.bestReview] : undefined,

    // Find referenced worst review
    (state: State, place: NormalizedPlace) =>
      place.worstReview ? state.reviewEntity[place.worstReview] : undefined,

    // Find referenced own review
    (state: State, place: NormalizedPlace) =>
      place.ownReview ? state.reviewEntity[place.ownReview] : undefined,

    // Embed reviews into place
    (place, bestReview, worstReview, ownReview): Place => ({
      ...place,
      bestReview,
      worstReview,
      ownReview
    })
  );

/**
 * Return single place by id
 *
 * Uses nested selector to return the same object when place and
 * embedded reviews remain unchanged.
 */
export const makeGetPlaceById = () => {
  // Create instance of memoized denormalization selector
  const placeDenormalizer = makePlaceDenormalizer();

  return createSelector(
    // Pass state to result selector
    (state: State) => state,

    // Find normalized place
    (state: State, ownProps: ItemProps) =>
      ownProps.id ? state.placeEntity[ownProps.id] : undefined,

    // Denormalize place if found
    (state, place) => place && placeDenormalizer(state, place)
  );
};

/**
 * Get request status for place listing
 */
export const makeGetPlaceUpdateRequestStatus = () => {
  const defaultRequestStatus = { loading: false, success: false };

  return (state: State, ownProps: ItemProps): RequestStatus<SavePlaceDto> => {
    if (!ownProps.id) {
      return state.placeCreateRequest;
    }

    return state.placeUpdateRequest[ownProps.id] || defaultRequestStatus;
  };
};
