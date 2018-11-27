import {
  Home as HomeIcon,
  Person as PersonIcon,
  RateReview as RateReviewIcon,
  StoreMallDirectory as StoreMallDirectoryIcon
} from "@material-ui/icons";
import React from "react";
import { connect, Selector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { MobileNavigation } from "../components/MobileNavigation";
import { MobileNavigationLink } from "../components/MobileNavigationLink";
import { isAdmin, isOwner, User } from "../models/User";
import { State } from "../reducers";
import * as routes from "../routes";
import { makeGetCurrentUser } from "../selectors/authSelectors";

/**
 * Connected props
 */
interface StateProps {
  /**
   * Currently logged-in user
   */
  user?: User;
}

/**
 * Combined Props
 */
interface Props extends StateProps, RouteComponentProps {}

/**
 * Connect component to the store
 */
const makeMapStateToProps = (): Selector<State, StateProps, {}> =>
  createStructuredSelector({
    user: makeGetCurrentUser()
  });

/**
 * Component enhancer
 */
const enhance = connect(makeMapStateToProps);

/**
 * Mobile navigation container
 *
 * Provides bottom navigation on mobile devices.
 */
const BaseMobileNavigationContainer = ({ user }: Props) => {
  if (user === undefined || !(isOwner(user) || isAdmin(user))) {
    return null;
  }

  return (
    <MobileNavigation>
      <MobileNavigationLink
        exact={true}
        to={routes.HOME}
        label="Home"
        icon={<HomeIcon />}
      />
      {isOwner(user) ? (
        <MobileNavigationLink
          to={routes.PLACES_OWN}
          label="Restaurants"
          icon={<StoreMallDirectoryIcon />}
        />
      ) : null}
      {isOwner(user) ? (
        <MobileNavigationLink
          to={routes.REVIEWS_PENDING}
          label="Reviews"
          icon={<RateReviewIcon />}
        />
      ) : null}
      {isAdmin(user) ? (
        <MobileNavigationLink
          to={routes.USERS}
          label="Users"
          icon={<PersonIcon />}
        />
      ) : null}
    </MobileNavigation>
  );
};

/**
 * Export enhanced component
 *
 * We need to wrap component in withRouter in order to update
 * navigation on location change.
 */
export const MobileNavigationContainer = withRouter(
  enhance(BaseMobileNavigationContainer)
);
