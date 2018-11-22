import React, { useState } from "react";
import { UserListContainer } from "../containers/UserListContainer";
import { UserListItemContainer } from "../containers/UserListItemContainer";

/**
 * Frontpage Screen
 *
 * Displays a list of users registered on the website;
 */
export const UserListScreen = () => {
  const [currentPage, setPage] = useState(0);

  return (
    <UserListContainer
      currentPage={currentPage}
      onPrev={() => setPage(page => page - 1)}
      onNext={() => setPage(page => page + 1)}
      renderItem={id => <UserListItemContainer key={id} id={id} />}
    />
  );
};
