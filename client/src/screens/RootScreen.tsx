import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Layout } from "../components/Layout";
import { Responsive } from "../components/Responsive";
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

const redirectHome = <Redirect to={routes.HOME} />;

export const RootScreen = () => (
  <div>
    <NavbarContainer />
    <Layout>
      <Switch>
        <Route exact={true} path={routes.HOME} component={FrontpageScreen} />
        <Route path={routes.PLACE_DETAILS} component={PlaceDetailsScreen} />
        <Route path={routes.PLACES_OWN}>
          {() => (
            <AuthGuard rule={isOwner} placeholder={redirectHome}>
              <OwnPlacesScreen />
            </AuthGuard>
          )}
        </Route>
        <Route path={routes.REVIEWS_PENDING}>
          {() => (
            <AuthGuard rule={isOwner} placeholder={redirectHome}>
              <PendingReviewsScreen />
            </AuthGuard>
          )}
        </Route>
        <Route path={routes.USERS}>
          {() => (
            <AuthGuard rule={isAdmin} placeholder={redirectHome}>
              <UserListScreen />
            </AuthGuard>
          )}
        </Route>
        {redirectHome}
      </Switch>
    </Layout>
    <Responsive hideOnDesktop={true}>
      <MobileNavigationContainer />
    </Responsive>
    <NotificationContainer />
  </div>
);
