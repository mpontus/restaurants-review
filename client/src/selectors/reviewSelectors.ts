import { RequestStatus } from "../models/RequestStatus";
import { Review } from "../models/Review";
import { State } from "../reducers";

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
export const makeGetReviewById = () => (
  state: State,
  ownProps: ItemProps
): Review | undefined =>
  ownProps.id ? state.reviewEntity[ownProps.id] : undefined;

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
