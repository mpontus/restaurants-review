import { Button, List } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadUsers } from "../actions/userListActions";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { Loading } from "../components/Loading";
import { useModal } from "../components/ModalRoot";
import { LoadUsersDto } from "../models/LoadUsersDto";
import { Page } from "../models/Page";
import { RequestStatus } from "../models/RequestStatus";
import { User } from "../models/User";
import { State } from "../reducers";
import { makeGetCurrentUser } from "../selectors/authSelectors";
import {
  makeGetUserListPage,
  makeGetUserListRequestStatus
} from "../selectors/userListSelectors";
import { UserFormModalContainer } from "./UserFormModalContainer";

/**
 * External props
 */
interface OwnProps {
  /**
   * Current page
   */
  currentPage: number;

  /**
   * Item renderer
   */
  renderItem: (id: string) => React.ReactNode;

  /**
   * Next page callback
   */
  onNext: () => void;

  /**
   * Previous page callback
   */
  onPrev: () => void;
}

/**
 * Connected Props
 */
interface StateProps {
  /**
   * Currently logged in user
   *
   * Needed in order to refresh the list on authentication change.
   */
  user?: User;

  /**
   * Page entity containing user ids
   */
  page?: Page<string>;

  /**
   * Request status for the current page
   */
  requestStatus: RequestStatus<LoadUsersDto>;
}

/**
 * Action Props
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
 * Connect to the store
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    user: makeGetCurrentUser(),
    page: makeGetUserListPage(),
    requestStatus: makeGetUserListRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onLoadUsers: loadUsers.request }
);

/**
 * User List Container
 *
 * Displays a list of users.
 */
const BaseUserListContainer = ({
  user,
  currentPage,
  page,
  requestStatus,
  onLoadUsers,
  renderItem,
  onPrev,
  onNext
}: Props) => {
  useEffect(
    () => {
      onLoadUsers({ page: currentPage });
    },
    // Refresh on authentication status change
    [currentPage, user]
  );

  const [showCreateModal, hideCreateModal] = useModal(() => (
    <UserFormModalContainer onCancel={hideCreateModal} />
  ));

  if (page === undefined) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <List>{page.items.map(renderItem)}</List>
      <Button disabled={!page.prevPageExists} onClick={onPrev}>
        Prev
      </Button>
      <Button disabled={!page.nextPageExists} onClick={onNext}>
        Next
      </Button>
      <FloatingActionButton
        icon={<AddIcon />}
        aria-label="Add"
        onClick={showCreateModal}
      />
    </React.Fragment>
  );
};

/**
 * Export enhanced component
 */
export const UserListContainer = enhance(BaseUserListContainer);
