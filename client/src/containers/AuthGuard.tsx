import React from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { User } from "../models/User";
import { State } from "../reducers";
import { makeGetCurrentUser } from "../selectors/authSelectors";

/**
 * External props
 */
interface OwnProps {
  /**
   * Assertion to make against the logged-in user
   */
  rule?: (user: User) => boolean;

  /**
   * React elements to render in case of failed permission check
   */
  placeholder?: React.ReactNode;

  /**
   * React elements to render in case of sufficient permissions
   */
  children?: React.ReactNode;
}

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
 * Combined props
 */
interface Props extends OwnProps, StateProps {}

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
const enhance = connect(makeMapStateToProps);

/**
 * Auth Guard
 *
 * Renders children depending on the assertion made against logged-in user.
 */
export const AuthGuard = enhance(
  ({ user, rule = () => true, placeholder = null, children = null }: Props) =>
    (user !== undefined && rule(user)
      ? children
      : placeholder) as React.ReactElement<any> | null
);
