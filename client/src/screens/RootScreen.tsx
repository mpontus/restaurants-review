import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Responsive } from "../components/Responsive";
import { SingleColumnLayout } from "../components/SingleColumnLayout";
import { AuthGuard } from "../containers/AuthGuard";
import { MobileNavigationContainer } from "../containers/MobileNavigationContainer";
import { NavbarContainer } from "../containers/NavbarContainer";
import NotificationContainer from "../containers/NotificationContainer";
import { isAdmin, isOwner } from "../models/User";
import * as routes from "../routes";
import { FrontpageScreen } from "./FrontpageScreen";
import { OwnPlacesScreen } from "./OwnPlacesScreen";
import { PendingReviewsScreen } from "./PendingReviewsScreen";
import { PlaceDetailsScreen } from "./PlaceDetailsScreen";
import { UserListScreen } from "./UserListScreen";

/**
 * Root screen of the app
 *
 * Defines global layout and top-level navigation.
 */
export const RootScreen = () => {
  const redirectHome = <Redirect to={routes.HOME} />;

  return (
    <React.Fragment>
      <NavbarContainer />
      <SingleColumnLayout>
        <Switch>
          <Route exact={true} path={routes.HOME} component={FrontpageScreen} />
          <Route path={routes.PLACE_DETAILS} component={PlaceDetailsScreen} />
          <Route path={routes.PLACES_OWN}>
            {props => (
              <AuthGuard rule={isOwner} placeholder={redirectHome}>
                <OwnPlacesScreen {...props} />
              </AuthGuard>
            )}
          </Route>
          <Route path={routes.REVIEWS_PENDING}>
            {props => (
              <AuthGuard rule={isOwner} placeholder={redirectHome}>
                <PendingReviewsScreen {...props} />
              </AuthGuard>
            )}
          </Route>
          <Route path={routes.USERS}>
            {props => (
              <AuthGuard rule={isAdmin} placeholder={redirectHome}>
                <UserListScreen {...props} />
              </AuthGuard>
            )}
          </Route>
          {redirectHome}
        </Switch>
      </SingleColumnLayout>
      <Responsive hideOnDesktop={true}>
        <MobileNavigationContainer />
      </Responsive>
      <NotificationContainer />
    </React.Fragment>
  );
};
