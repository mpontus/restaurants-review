import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "../components/Button";
import { useModal } from "../components/ModalRoot";
import { UserFormModalContainer } from "../containers/UserFormModalContainer";
import { UserListContainer } from "../containers/UserListContainer";
import { UserListItemContainer } from "../containers/UserListItemContainer";

/**
 * Frontpage Screen
 *
 * Displays a list of users registered on the website;
 */
export const UserListScreen = () => {
  const [currentPage, setPage] = useState(0);
  const [showCreateModal, hideCreateModal] = useModal(() => (
    <UserFormModalContainer onCancel={hideCreateModal} />
  ));

  return (
    <React.Fragment>
      <Typography gutterBottom={true} variant="h5">
        User Management
      </Typography>
      <Typography gutterBottom={true} variant="subtitle1" color="textSecondary">
        Here you can manage your website users: create users, assign privileges,
        modify, and delete users.
      </Typography>
      <Button variant="outlined" color="primary" onClick={showCreateModal}>
        Create User
      </Button>
      <UserListContainer
        currentPage={currentPage}
        onPrev={() => setPage(page => page - 1)}
        onNext={() => setPage(page => page + 1)}
        renderItem={id => <UserListItemContainer key={id} id={id} />}
      />
    </React.Fragment>
  );
};
