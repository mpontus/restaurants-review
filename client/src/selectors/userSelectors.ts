import { RequestStatus } from "../models/RequestStatus";
import { SaveUserDto } from "../models/SaveUserDto";
import { User } from "../models/User";
import { State } from "../reducers";

/**
 * User List Item Parameters
 */
interface ItemProps {
  id?: string;
}

/**
 * Default request status
 */
const defaultRequestStatus = { loading: false, success: false };

/**
 * Return single user by id
 */
export const makeGetUserById = () => (
  state: State,
  ownProps: ItemProps
): User | undefined =>
  ownProps.id ? state.userEntity[ownProps.id] : undefined;

/**
 * Get request status for user listing
 */
export const makeGetUserUpdateRequestStatus = () => (
  state: State,
  ownProps: ItemProps
): RequestStatus<SaveUserDto> => {
  if (!ownProps.id) {
    return state.userCreateRequest;
  }

  return state.userUpdateRequest[ownProps.id] || defaultRequestStatus;
};
