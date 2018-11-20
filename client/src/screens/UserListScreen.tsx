import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem
} from "@material-ui/core";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";
import React from "react";
import { ConfirmModal } from "../components/ConfirmModal";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { IconMenu } from "../components/IconMenu";
import { useModal } from "../components/ModalRoot";
import { UserFormModal } from "../components/UserFormModal";

// prettier-ignore
export const users = [
  ['41a5bad8-9cb4-5881-b296-2eb316df862c', 'Betty Stokes', 'taneg@nosmo.tw', ['user', 'owner', 'admin']],
  ['38103bba-3208-5171-b3e7-d88c8cad95de', 'Hannah Burke', 'huhur@cverkob.cy', ['user', 'admin']],
  ['ec96adce-52f1-5090-ab6e-c362f97336fd', 'Luis Weber', 'iloracwur@jom.ag', ['user', 'admin']],
  ['9d636843-0d39-58f3-be26-e500aa3c5134', 'Vincent Valdez', 'sotputu@ezev.hm', ['user', 'owner']],
  ['649a1a68-e236-5bd4-af1d-5312127650f3', 'Timothy Willis', 'ewsod@diato.pa', ['user', 'owner']],
  ['ff4c62f5-c4f9-5984-a34b-f26d5229480b', 'Paul Jensen', 'bavva@kihusmo.nf', ['user']],
  ['454da2fe-bada-5f2e-81a8-64dd43469f27', 'Ethel Bennett', 'potsa@lo.sv', ['user']],
  ['92f3bdce-8f07-5645-96b9-b63feffe241e', 'Max Burgess', 'nehkih@wamfuga.sx', ['user']],
  ['92d3c50e-bfaa-5dd2-a076-14b8111e2914', 'Dennis Watts', 'betano@jur.gt', ['user']],
  ['7859b162-1226-5b8e-82af-2f22a95fc264', 'Billy Gonzalez', 'ficfem@ti.ng', ['user']],
  ['7a0b3665-4ad8-5ace-b3d3-02258764cbd6', 'Emily Herrera', 'ban@muhe.kw', ['user']],
].map(([id, name, email, roles]) => ({ id: id as string, name: name as string, email: email as string, roles: roles as string[] }));

export const UserListItem = ({ user, onDelete }: any) => {
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

  const initialValues = {
    name: user.name,
    email: user.email,
    password: "",
    isUser: user.roles.includes("user"),
    isOwner: user.roles.includes("owner"),
    isAdmin: user.roles.includes("admin")
  };

  const [showEditModal, hideEditModal] = useModal(() => (
    <UserFormModal
      title="Update User"
      subtitle={
        <>
          Change <strong>{user.name}</strong> account details
        </>
      }
      initialValues={initialValues}
      submitLabel="Save User"
      onSubmit={hideConfirmModal}
      onCancel={hideEditModal}
    />
  ));

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

export const UserListScreen = () => {
  const [showCreateModal, hideCreateModal] = useModal(() => (
    <UserFormModal
      title="Create New User"
      subtitle={<>Enter new user details.</>}
      submitLabel="Save User"
      onSubmit={hideCreateModal}
      onCancel={hideCreateModal}
    />
  ));

  return (
    <React.Fragment>
      <List>
        {users.map(user => (
          <UserListItem key={user.id} user={user} />
        ))}
      </List>
      <FloatingActionButton
        icon={<AddIcon />}
        aria-label="Add"
        onClick={showCreateModal}
      />
    </React.Fragment>
  );
};
