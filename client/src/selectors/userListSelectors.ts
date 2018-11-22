import { Selector } from "react-redux";
import { createSelector } from "reselect";
import { LoadUsersDto } from "../models/LoadUsersDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";

/**
 * User Listing Parameters
 */
interface ListProps {
  place?: Place;
  pending?: boolean;
  currentPage: number;
}

/**
 * Get request status for user listing
 */
export const makeGetUserListRequestStatus = (): Selector<
  State,
  RequestStatus<LoadUsersDto>,
  {}
> => state => state.userListRequest;

/**
 * Get ids of the users on current page
 */
export const makeGetUserListPage = () =>
  createSelector(
    (state: State, ownProps: ListProps) => ownProps.currentPage,
    (state: State) => state.userList,
    (page, userList): Page<string> | undefined => userList[page]
  );

/**
 * Return single user by id
 */
export const makeGetUserById = () => (state: State, ownProps: { id: string }) =>
  state.userEntity[ownProps.id];
