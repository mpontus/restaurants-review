import { createSelector } from "reselect";
import { LoadUsersDto } from "../models/LoadUsersDto";
import { Page } from "../models/Page";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import { filterDeletedEntities } from "./utils/filterDeletedEntities";

/**
 * User List Parameters
 */
interface ListProps {
  currentPage: number;
}

/**
 * Get request status for user listing
 */
export const makeGetUserListRequestStatus = () => (
  state: State
): RequestStatus<LoadUsersDto> => state.userListRequest;

/**
 * Get ids of the users on current page
 */
export const makeGetUserListPage = () =>
  filterDeletedEntities(
    (state: State) => state.deletedUsers,
    createSelector(
      (state: State, ownProps: ListProps) => ownProps.currentPage,
      (state: State) => state.userList,
      (page, userList): Page<string> | undefined => userList[page]
    )
  );
