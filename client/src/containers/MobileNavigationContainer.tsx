import {
  Person as PersonIcon,
  RateReview as RateReviewIcon,
  StoreMallDirectory as StoreMallDirectoryIcon
} from "@material-ui/icons";
import React from "react";
import { connect, Selector } from "react-redux";
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
  user: User | undefined;
}

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
export const MobileNavigationContainer = enhance(({ user }: StateProps) => {
  if (user === undefined) {
    return null;
  }

  return (
    <MobileNavigation>
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
});
