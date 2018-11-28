import React from "react";
import { RouteComponentProps } from "react-router";
import { Button } from "../components/Button";
import { DocumentTitle } from "../components/DocumentTitle";
import { Heading } from "../components/Heading";
import { Loading } from "../components/Loading";
import { PageActions } from "../components/PageActions";
import { Pagination } from "../components/Pagination";
import { Subheading } from "../components/Subheading";
import { UserContainer } from "../containers/UserContainer";
import { UserFormModalContainer } from "../containers/UserFormModalContainer";
import { UserListProvider } from "../containers/UserListProvider";
import { useModal } from "../hooks/useModal";
import { usePagination } from "../hooks/usePagination";

/**
 * User List Screen
 *
 * Displays a list of website users
 */
export const UserListScreen = ({ history }: RouteComponentProps) => {
  const [currentPage, onPrevPage, onNextPage] = usePagination(history);
  const [showCreateModal, hideCreateModal] = useModal(() => (
    <UserFormModalContainer onCancel={hideCreateModal} />
  ));

  return (
    <DocumentTitle title="User Management">
      <Heading>User Management</Heading>
      <Subheading>
        Here you can manage your website users: create users, assign privileges,
        modify, and delete users.
      </Subheading>
      <PageActions>
        <Button color="primary" onClick={showCreateModal}>
          Create User
        </Button>
      </PageActions>
      <UserListProvider
        currentPage={currentPage}
        loadingPlaceholder={<Loading />}
        emptyPlaceholder={
          <Subheading>There are no users on this website</Subheading>
        }
      >
        {({ ids, hasNextPage, hasPrevPage }) => (
          <Pagination
            items={ids}
            renderItem={id => <UserContainer key={id} id={id} />}
            hasNext={hasNextPage}
            hasPrev={hasPrevPage}
            onNext={onNextPage}
            onPrev={onPrevPage}
          />
        )}
      </UserListProvider>
    </DocumentTitle>
  );
};
