import React from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { logout } from "../actions/authActions";
import { User } from "../models/User";
import { State } from "../reducers";
import { makeGetCurrentUser } from "../selectors/authSelectors";

/**
 * Props passed to render function
 */
interface RenderProps {
  /**
   * Logged-in user details
   */
  user?: User;

  /**
   * Logout callback
   */
  onLogout: () => void;
}

/**
 * External props
 */
interface OwnProps {
  /**
   * Render function
   */
  children: (props: RenderProps) => React.ReactNode;
}

/**
 * Connected props
 */
interface StateProps {
  /**
   * Current user details
   */
  user?: User;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Logout callback
   */
  onLogout: () => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selectors
 */
const makeMapStateToProps = (): Selector<State, StateProps, {}> =>
  createStructuredSelector({
    user: makeGetCurrentUser()
  });

/**
 * Connect component to redux store
 */
const enhance = connect(
  makeMapStateToProps,
  { onLogout: logout }
);

/**
 * Current User Provider
 *
 * Provides currently logged-in user details as render props.
 */
export const CurrentUserProvider = enhance((({ user, onLogout, children }) =>
  children({ user, onLogout })) as React.SFC<Props>);
