import {
  Person as PersonIcon,
  RateReview as RateReviewIcon,
  StoreMallDirectory as StoreMallDirectoryIcon
} from "@material-ui/icons";
import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Header } from "../components/Header";
import { MobileNavigation } from "../components/MobileNavigation";
import { MobileNavigationLink } from "../components/MobileNavigationLink";
import * as routes from "../routes";
import { FrontpageScreen } from "./FrontpageScreen";
import { OwnPlacesScreen } from "./OwnPlacesScreen";
import { PendingReviewsScreen } from "./PendingReviewsScreen";
import { PlaceDetailsScreen } from "./PlaceDetailsScreen";
import { UserListScreen } from "./UserListScreen";

export const RootScreen = () => (
  <div>
    <Header />
    <Switch>
      <Route exact={true} path={routes.HOME} component={FrontpageScreen} />
      <Route path={routes.PLACE_DETAILS} component={PlaceDetailsScreen} />
      <Route path={routes.PLACES_OWN} component={OwnPlacesScreen} />
      <Route path={routes.REVIEWS_PENDING} component={PendingReviewsScreen} />
      <Route path={routes.USERS} component={UserListScreen} />
      <Redirect to={routes.HOME} />
    </Switch>
    <MobileNavigation>
      <MobileNavigationLink
        to={routes.PLACES_OWN}
        label="Restaurants"
        icon={<StoreMallDirectoryIcon />}
      />
      <MobileNavigationLink
        to={routes.REVIEWS_PENDING}
        label="Reviews"
        icon={<RateReviewIcon />}
      />
      <MobileNavigationLink
        to={routes.USERS}
        label="Users"
        icon={<PersonIcon />}
      />
    </MobileNavigation>
  </div>
);
