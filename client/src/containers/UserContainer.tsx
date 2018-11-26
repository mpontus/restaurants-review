import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";
import React, { useCallback } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { deleteUser } from "../actions/userListActions";
import { ConfirmModal } from "../components/ConfirmModal";
import { IconMenu } from "../components/IconMenu";
import { useModal } from "../hooks/useModal";
import { RequestStatus } from "../models/RequestStatus";
import { User } from "../models/User";
import { State } from "../reducers";
import {
  makeGetUserById,
  makeGetUserUpdateRequestStatus
} from "../selectors/userSelectors";
import { UserFormModalContainer } from "./UserFormModalContainer";

/**
 * External Props
 */
interface OwnProps {
  /**
   * User ID
   */
  id: string;
}

/**
 * Connected props
 */
interface StateProps {
  /**
   * User
   */
  user?: User;

  /**
   * Update request status
   */
  requestStatus: RequestStatus<any>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * User delete callback
   */
  onDelete: (props: { user: User }) => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selector
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    user: makeGetUserById(),
    requestStatus: makeGetUserUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  {
    onDelete: deleteUser.request
  }
);

/**
 * User List Item Container
 *
 * Displays a single user inside a list.
 */
export const BaseUserListItemContainer = ({
  id,
  user,
  requestStatus,
  onDelete
}: Props) => {
  if (user === undefined) {
    return null;
  }

  const handleDelete = useCallback(() => onDelete({ user }), [user, onDelete]);
  const [showConfirmModal, hideConfirmModal] = useModal(() => (
    <ConfirmModal
      title="Delete user?"
      confirmLabel="Delete user"
      onConfirm={handleDelete}
      onCancel={hideConfirmModal}
    >
      Do you really want to delete {user.name}?
    </ConfirmModal>
  ));

  const [showEditModal, hideEditModal] = useModal(() => (
    <UserFormModalContainer id={user.id} onCancel={hideEditModal} />
  ));

  return (
    <ListItem
      key={user.id}
      ContainerProps={{ "aria-labelledby": `user-item-${user.id}` }}
    >
      <ListItemText
        primary={<span id={`user-item-${user.id}`}>{user.name}</span>}
        secondary={user.email}
      />
      {(user.canEdit || user.canDelete) && (
        <ListItemSecondaryAction>
          <IconMenu icon={<MoreVertIcon />} aria-label="More Actions">
            {user.canEdit && (
              <MenuItem onClick={showEditModal}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText inset={true} primary="Edit" />
              </MenuItem>
            )}
            {user.canDelete && (
              <MenuItem onClick={showConfirmModal}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText inset={true} primary="Delete" />
              </MenuItem>
            )}
          </IconMenu>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

/**
 * Export enhanced component
 */
export const UserContainer = enhance(BaseUserListItemContainer);
