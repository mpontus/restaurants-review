import { Add as AddIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { FloatingActionButton } from "../components/FloatingActionButton";
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
      <UserListContainer
        currentPage={currentPage}
        onPrev={() => setPage(page => page - 1)}
        onNext={() => setPage(page => page + 1)}
        renderItem={id => <UserListItemContainer key={id} id={id} />}
      />
      <FloatingActionButton
        icon={<AddIcon />}
        aria-label="Add"
        onClick={showCreateModal}
      />
    </React.Fragment>
  );
};
