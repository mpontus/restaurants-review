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
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ConfirmModal } from "../components/ConfirmModal";
import { IconMenu } from "../components/IconMenu";
import { useModal } from "../components/ModalRoot";
import { UserFormModal } from "../components/UserFormModal";
import { User } from "../models/User";
import { State } from "../reducers";
import { makeGetUserById } from "../selectors/userListSelectors";

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
 * Connected Props
 */
interface StateProps {
  /**
   * User
   */
  user?: User;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps {}

/**
 * State selector
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    user: makeGetUserById()
  });

/**
 * Component enhancer
 */
const enhance = connect(makeMapStateToProps);

/**
 * User List Item Container
 *
 * Displays a single user inside a list.
 */
export const BaseUserListItemContainer = ({ user }: Props) => {
  if (user === undefined) {
    return null;
  }

  const [showConfirmModal, hideConfirmModal] = useModal(() => (
    <ConfirmModal
      title="Delete user?"
      confirmLabel="Delete user"
      onConfirm={hideConfirmModal}
      onCancel={hideConfirmModal}
    >
      Do you really want to delete <strong>{user.name}</strong>?
    </ConfirmModal>
  ));

  const [showEditModal, hideEditModal] = useModal(() => {
    const initialValues = {
      name: user.name,
      email: user.email,
      password: "",
      isUser: user.roles.includes("user"),
      isOwner: user.roles.includes("owner"),
      isAdmin: user.roles.includes("admin")
    };

    return (
      <UserFormModal
        title="Update User"
        subtitle={
          <>
            Change <strong>{user.name}</strong> account details
          </>
        }
        initialValues={initialValues}
        submitLabel="Save User"
        onSubmit={
          // tslint:disable-next-line
          console.log
        }
        onCancel={hideEditModal}
      />
    );
  });

  return (
    <ListItem key={user.id}>
      <ListItemText primary={user.name} secondary={user.email} />
      <ListItemSecondaryAction>
        <IconMenu icon={<MoreVertIcon />}>
          <MenuItem onClick={showEditModal}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary="Edit" />
          </MenuItem>
          <MenuItem onClick={showConfirmModal}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset={true} primary="Delete" />
          </MenuItem>
        </IconMenu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

/**
 * Export enhanced component
 */
export const UserListItemContainer = enhance(BaseUserListItemContainer);
