import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { createUser, updateUser } from "../actions/userListActions";
import { UserFormModal } from "../components/UserFormModal";
import { useSubsequent } from "../hooks/useSubsequentValue";
import { RequestStatus } from "../models/RequestStatus";
import { SaveUserDto } from "../models/SaveUserDto";
import { isAdmin, isOwner, isUser, User } from "../models/User";
import { State } from "../reducers";
import {
  makeGetUserById,
  makeGetUserUpdateRequestStatus
} from "../selectors/userSelectors";

/**
 * External Props
 */
interface OwnProps {
  /**
   * User id
   */
  id?: string;

  /**
   * Modal close callback
   */
  onCancel: () => void;
}

/**
 * Connected props
 */
interface StateProps {
  /**
   * Resolved user entity
   */
  user?: User;

  /**
   * Request status for user creation or update
   */
  requestStatus: RequestStatus<SaveUserDto>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * User creation callback
   */
  onCreate: (data: SaveUserDto) => void;

  /**
   * User update callback
   */
  onUpdate: (params: { user: User; data: SaveUserDto }) => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selectors
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    user: makeGetUserById(),
    requestStatus: makeGetUserUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect<StateProps, DispatchProps, OwnProps, State>(
  makeMapStateToProps,
  {
    onCreate: createUser.request,
    onUpdate: updateUser.request
  }
);

/**
 * User Form Modal Container
 *
 * Displays modal window for user creation and modification.
 */
const BaseUserFormModalContainer = ({
  user,
  requestStatus: currentRequestStatus,
  onUpdate,
  onCreate,
  onCancel
}: Props) => {
  // Skip initial request status which may have been left by previous modal
  const requestStatus = useSubsequent(currentRequestStatus, {
    loading: false,
    success: false
  });

  // Self-close the modal after successful reply
  useEffect(
    () => {
      if (requestStatus.success) {
        onCancel();
      }
    },
    [requestStatus.success]
  );

  const initialValues = user
    ? {
        name: user.name,
        email: user.email || "",
        password: "",
        isOwner: isOwner(user),
        isAdmin: isAdmin(user)
      }
    : undefined;

  return (
    <UserFormModal
      autoFocus={user === undefined}
      title={user ? "Update User" : "Create User"}
      subtitle={
        user ? (
          <>Change {user.name} account details</>
        ) : (
          <>Enter new user details.</>
        )
      }
      submitLabel="Save User"
      initialValues={initialValues}
      loading={requestStatus.loading}
      error={requestStatus.error}
      onSubmit={data => (user ? onUpdate({ user, data }) : onCreate(data))}
      onCancel={onCancel}
    />
  );
};

/**
 * Export enhanced component
 */
export const UserFormModalContainer = enhance(BaseUserFormModalContainer);
