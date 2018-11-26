import React, { useState } from "react";
import { Action } from "../components/Action";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { useModal } from "../components/ModalRoot";
import { Pagination } from "../components/Pagination";
import { Subheading } from "../components/Subheading";
import { UserFormModalContainer } from "../containers/UserFormModalContainer";
import { UserContainer } from "../containers/UserContainer";
import { UserListProvider } from "../containers/UserListProvider";

/**
 * User List Screen
 *
 * Displays a list of website users
 */
export const UserListScreen = () => {
  const [currentPage, setPage] = useState(0);
  const [showCreateModal, hideCreateModal] = useModal(() => (
    <UserFormModalContainer onCancel={hideCreateModal} />
  ));

  return (
    <React.Fragment>
      <Heading> User Management</Heading>
      <Subheading>
        Here you can manage your website users: create users, assign privileges,
        modify, and delete users.
      </Subheading>
      <Action onClick={showCreateModal}>Create User</Action>
      <UserListProvider
        currentPage={currentPage}
        loadingPlaceholder={<Loading />}
      >
        {({ ids, hasNextPage, hasPrevPage }) => (
          <Pagination
            items={ids}
            renderItem={id => <UserContainer key={id} id={id} />}
            hasNext={hasNextPage}
            hasPrev={hasNextPage}
            onNext={() => setPage(currentPage + 1)}
            onPrev={() => setPage(currentPage + 1)}
          />
        )}
      </UserListProvider>
    </React.Fragment>
  );
};
