import React from 'react';
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { User } from "../models/User";
import { State } from "../reducers";
import {
  makeGetCurrentUser
} from "../selectors/authSelectors";

/**
 * External props
 */
interface OwnProps {
  /**
   * Additional authorization rule
   */
  rule?: (user: User) => boolean;

  /**
   * React elements to render in case of failed authorization
   */
  placeholder?: React.ReactNode;

  /**
   * React elements to render in case of successful authorization
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
 * Current User Provider
 *
 * Provides currently logged in user user in render prop.
 */
export const AuthGuard = enhance(
  ({ user, rule = () => true, placeholder = null, children = null }: Props) =>
    (user !== undefined && rule(user)
      ? children
      : placeholder) as React.ReactElement<any> | null
);
