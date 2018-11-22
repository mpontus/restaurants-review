import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { SavePlaceDto } from "../models/SavePlaceDto";
import { State } from "../reducers";

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
export const makeGetPlaceById = () => (
  state: State,
  ownProps: ItemProps
): Place | undefined =>
  ownProps.id ? state.placeEntity[ownProps.id] : undefined;

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
