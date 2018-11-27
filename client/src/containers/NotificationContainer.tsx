// @flow
import { Snackbar } from "@material-ui/core";
import * as React from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { dismissNotification } from "../actions/notificationActions";
import { SnackbarContent } from "../components/SnackbarContent";
import { Notification } from "../models/Notification";
import { State } from "../reducers";
import { makeGetNotification } from "../selectors/notificationSelectors";

/**
 * Connected state
 */
interface StateProps {
  /**
   * Top notification
   */
  notification?: Notification;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Dismiss top notification
   */
  onDismiss: () => void;
}

/**
 * Combined Props
 */
interface Props extends StateProps, DispatchProps {}

/**
 * Component state
 */
interface ComponentState {
  /**
   * Gives us unique incremental notification key which is needed for
   * snackbar animations.
   */
  counter: number;

  /**
   * Currently shown notification
   */
  notification?: Notification;

  /**
   * Whether the shown notification is currently exiting
   */
  exiting: boolean;
}

/**
 * State selector
 */
const makeMapStateToProps = (): Selector<State, StateProps, {}> =>
  createStructuredSelector({
    notification: makeGetNotification()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  { onDismiss: dismissNotification }
);

/**
 * Notification Container
 *
 * Displays top notification retrieved from the state, when its
 * dismissed, shows next notification.
 */
class NotificationContainer extends React.Component<Props, ComponentState> {
  /**
   * Component state
   */
  public state: ComponentState = {
    counter: 0,
    notification: this.props.notification,
    exiting: false
  };

  /**
   * Update pending notification
   */
  public componentWillReceiveProps(nextProps: Props) {
    if (this.state.notification === undefined) {
      this.setState(state => ({
        counter: state.counter + 1,
        notification: nextProps.notification
      }));
    } else if (this.state.notification !== nextProps.notification) {
      this.setState({ exiting: true });
    }
  }

  /**
   * Handle exit animation finish
   */
  public handleExit = () => {
    this.setState(state => ({
      counter: state.counter + 1,
      notification: this.props.notification,
      exiting: false
    }));
  };

  /**
   * Handle notification dismissal.
   *
   * Invoked either explicitly or by timeout.
   */
  public handleDismiss = () => {
    this.props.onDismiss();
  };

  /**
   * Render component
   */
  public render() {
    const { counter, notification, exiting } = this.state;

    if (!notification) {
      return null;
    }

    return (
      <Snackbar
        key={`notification-${counter}`}
        open={!exiting}
        autoHideDuration={notification.duration}
        onClick={this.handleDismiss}
        onClose={this.handleDismiss}
        onExited={this.handleExit}
      >
        <SnackbarContent
          variant={notification.type}
          message={notification.message}
          onClose={this.handleDismiss}
        />
      </Snackbar>
    );
  }
}

export default enhance(NotificationContainer);
