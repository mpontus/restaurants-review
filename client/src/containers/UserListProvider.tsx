import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadUsers } from "../actions/userListActions";
import { LoadUsersDto } from "../models/LoadUsersDto";
import { Page } from "../models/Page";
import { State } from "../reducers";
import { makeGetUserListPage } from "../selectors/userListSelectors";

/**
 * Render props
 */
interface RenderProps {
  /**
   * List of user ids for current page
   */
  ids: string[];

  /**
   * Whether next page exists
   */
  hasNextPage: boolean;

  /**
   * Whether previous page exists
   */
  hasPrevPage: boolean;
}

/**
 * External props
 */
interface OwnProps {
  /**
   * Current page
   */
  currentPage: number;

  /**
   * Placeholder to show while list is loading
   */
  loadingPlaceholder?: React.ReactElement<any> | null;

  /**
   * Placeholder to show when list is empty
   */
  emptyPlaceholder?: React.ReactElement<any> | null;

  /**
   * Render props children
   */
  children: (props: RenderProps) => React.ReactElement<any> | null;
}

/**
 * Connected State Props
 */
interface StateProps {
  /**
   * Page entity containing user ids
   */
  page?: Page<string>;
}

/**
 * Connected dispatch props
 */
interface DispatchProps {
  /**
   * Request users to be loaded
   */
  onLoadUsers: (criteria: LoadUsersDto) => void;
}

/**
 * Combined component props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State mapping
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    page: makeGetUserListPage()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onLoadUsers: loadUsers.request }
);

/**
 * User List Provider
 *
 * Provides list of users using render props.
 */
const BaseUserListProvider = ({
  currentPage,
  page,
  onLoadUsers,
  children,
  loadingPlaceholder = null,
  emptyPlaceholder = null
}: Props) => {
  useEffect(() => onLoadUsers({ page: currentPage }), [currentPage]);

  if (page === undefined) {
    return loadingPlaceholder;
  }

  if (page.items.length === 0 && currentPage === 0) {
    return emptyPlaceholder;
  }

  return children({
    ids: page.items,
    hasPrevPage: page.prevPageExists,
    hasNextPage: page.nextPageExists
  });
};

/**
 * Export enhanced component
 */
export const UserListProvider = enhance(BaseUserListProvider);
