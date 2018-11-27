import React from "react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { NavbarLink } from "../components/NavbarLink";
import { Responsive } from "../components/Responsive";
import { useModal } from "../hooks/useModal";
import { isAdmin, isOwner } from "../models/User";
import * as routes from "../routes";
import { AuthModalContainer } from "./AuthModalContainer";
import { CurrentUserProvider } from "./CurrentUserProvider";

/**
 * Navbar Container
 *
 * Displays application navbar connected to the store.
 */
export const NavbarContainer = () => {
  const [showAuthModal, hideAuthModal] = useModal(() => (
    <AuthModalContainer onCancel={hideAuthModal} />
  ));

  return (
    <CurrentUserProvider>
      {({ user, onLogout }) => (
        <Navbar
          action={
            <Button color="inherit" onClick={user ? onLogout : showAuthModal}>
              {user ? "Logout" : "Login"}
            </Button>
          }
        >
          <Responsive hideOnMobile={true}>
            {user && (
              <React.Fragment>
                {isOwner(user) ? (
                  <NavbarLink to={routes.PLACES_OWN}>Restaurants</NavbarLink>
                ) : null}
                {isOwner(user) ? (
                  <NavbarLink to={routes.REVIEWS_PENDING}>Reviews</NavbarLink>
                ) : null}
                {isAdmin(user) ? (
                  <NavbarLink to={routes.USERS}>Users</NavbarLink>
                ) : null}
              </React.Fragment>
            )}
          </Responsive>
        </Navbar>
      )}
    </CurrentUserProvider>
  );
};
