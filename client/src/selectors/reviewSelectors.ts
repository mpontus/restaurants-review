import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";

/**
 * Review List Item Parameters
 */
interface ItemProps {
  id?: string;
}

/**
 * Return single review by id
 */
export const makeGetReviewById = () => (state: State, ownProps: ItemProps) =>
  ownProps.id ? state.reviewEntity[ownProps.id] : undefined;

/**
 * Get request status for review updates
 */
export const makeGetReviewUpdateRequestStatus = () => {
  const defaultRequestStatus = { loading: false, success: false };

  return (state: State, ownProps: ItemProps): RequestStatus<any> => {
    if (!ownProps.id) {
      return state.reviewCreateRequest;
    }

    return state.reviewUpdateRequest[ownProps.id] || defaultRequestStatus;
  };
};
