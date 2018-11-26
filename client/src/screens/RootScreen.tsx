import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Layout } from "../components/Layout";
import { AuthGuard } from "../containers/AuthGuard";
import { HeaderContainer } from "../containers/HeaderContainer";
import { MobileNavigationContainer } from "../containers/MobileNavigationContainer";
import { NotificationContainerLoader } from "../loaders/NotificationContainerLoader";
import { isAdmin, isOwner } from "../models/User";
import * as routes from "../routes";
import { FrontpageScreenLoader } from "../loaders/FrontpageScreenLoader";
import { OwnPlacesScreenLoader } from "../loaders/OwnPlacesScreenLoader";
import { PendingReviewsScreenLoader } from "../loaders/PendingReviewsScreenLoader";
import { PlaceDetailsScreenLoader } from "../loaders/PlaceDetailsScreenLoader";
import { UserListScreenLoader } from "../loaders/UserListScreenLoader";

const redirectHome = <Redirect to={routes.HOME} />;

export const RootScreen = () => (
  <div>
    <HeaderContainer />
    <Layout>
      <Switch>
        <Route
          exact={true}
          path={routes.HOME}
          component={FrontpageScreenLoader}
        />
        <Route
          path={routes.PLACE_DETAILS}
          component={PlaceDetailsScreenLoader}
        />
        <Route path={routes.PLACES_OWN}>
          {() => (
            <AuthGuard rule={isOwner} placeholder={redirectHome}>
              <OwnPlacesScreenLoader />
            </AuthGuard>
          )}
        </Route>
        <Route path={routes.REVIEWS_PENDING}>
          {() => (
            <AuthGuard rule={isOwner} placeholder={redirectHome}>
              <PendingReviewsScreenLoader />
            </AuthGuard>
          )}
        </Route>
        <Route path={routes.USERS}>
          {() => (
            <AuthGuard rule={isAdmin} placeholder={redirectHome}>
              <UserListScreenLoader />
            </AuthGuard>
          )}
        </Route>
        {redirectHome}
      </Switch>
    </Layout>
    <MobileNavigationContainer />
    <NotificationContainerLoader />
  </div>
);
