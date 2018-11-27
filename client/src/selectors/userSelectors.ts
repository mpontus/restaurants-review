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
 * Return single user by id
 */
export const makeGetUserById = () => (
  state: State,
  ownProps: ItemProps
): User | undefined =>
  ownProps.id ? state.userEntity[ownProps.id] : undefined;

/**
 * Get request status for user updates
 */
export const makeGetUserUpdateRequestStatus = () => {
  const defaultRequestStatus = { loading: false, success: false };

  return (state: State, ownProps: ItemProps): RequestStatus<SaveUserDto> => {
    if (!ownProps.id) {
      return state.userCreateRequest;
    }

    return state.userUpdateRequest[ownProps.id] || defaultRequestStatus;
  };
};
