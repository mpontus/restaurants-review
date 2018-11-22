import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { logout } from "../actions/authActions";
import { User } from "../models/User";
import { State } from "../reducers";
import {
  makeGetCurrentUser,
  makeIsUserAuthenticated
} from "../selectors/authSelectors";

/**
 * Connected props
 */
interface StateProps {
  /**
   * Whether use is currently authenticated
   */
  isAuthenticated: boolean;

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
 * Render props
 */
interface RenderProps extends StateProps, DispatchProps {}

/**
 * External Props
 */
interface OwnProps {
  /**
   * Render prop
   */
  children: (props: RenderProps) => React.ReactNode;
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
    isAuthenticated: makeIsUserAuthenticated(),
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
 * Provides currently logged in user user in render prop.
 */
export const CurrentUserProvider = enhance((({
  isAuthenticated,
  user,
  onLogout,
  children
}) => children({ isAuthenticated, user, onLogout })) as React.SFC<Props>);
