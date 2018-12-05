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
import React from "react";
import { useModal } from "react-modal-hook";
import { connect, Selector } from "react-redux";
import { TransitionProps } from "react-transition-group/Transition";
import { createStructuredSelector } from "reselect";
import { deleteUser } from "../actions/userListActions";
import { ConfirmModal } from "../components/ConfirmModal";
import { IconMenu } from "../components/IconMenu";
import { UserBadge } from "../components/UserBadge";
import { RequestStatus } from "../models/RequestStatus";
import { isAdmin, isOwner, User } from "../models/User";
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
 * User Container
 *
 * Displays details of a single user.
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

  const [showConfirmModal, hideConfirmModal] = useModal(
    ({ in: open = false, onExited }: TransitionProps) => (
      <ConfirmModal
        open={open}
        title="Delete user?"
        confirmLabel="Delete user"
        onConfirm={() => onDelete({ user })}
        onCancel={hideConfirmModal}
        onExited={onExited}
      >
        Do you really want to delete {user.name}?
      </ConfirmModal>
    )
  );

  const [showEditModal, hideEditModal] = useModal(
    ({ in: open = false, onExited }: TransitionProps) => (
      <UserFormModalContainer
        open={open}
        id={user.id}
        onCancel={hideEditModal}
        onExited={onExited}
      />
    )
  );

  return (
    <ListItem
      button={true}
      onClick={showEditModal}
      ContainerProps={{ "aria-labelledby": `user-item-${user.id}` }}
    >
      <ListItemText
        primary={
          <React.Fragment>
            <span id={`user-item-${user.id}`}>{user.name}</span>
            {isOwner(user) && <UserBadge variant="owner">Owner</UserBadge>}
            {isAdmin(user) && <UserBadge variant="admin">Admin</UserBadge>}
          </React.Fragment>
        }
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
