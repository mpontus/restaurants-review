import React from "react";
import { Header } from "../components/Header";
import { useModal } from "../hooks/useModal";
import { AuthModalContainer } from "./AuthModalContainer";
import { CurrentUserProvider } from "./CurrentUserProvider";

/**
 * Header Container
 *
 * Displays application header connected to the store.
 */
export const HeaderContainer = () => {
  const [showAuthModal, hideAuthModal] = useModal(() => (
    <AuthModalContainer onCancel={hideAuthModal} />
  ));

  return (
    <CurrentUserProvider>
      {({ isAuthenticated, user, onLogout }) => (
        <Header
          canLogin={!isAuthenticated}
          canLogout={isAuthenticated}
          onLogin={showAuthModal}
          onLogout={onLogout}
        />
      )}
    </CurrentUserProvider>
  );
};
