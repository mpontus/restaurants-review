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
   * Unique notification key for snackbar animation
   */
  counter: number;

  /**
   * Currently shown notification
   */
  notification?: Notification;

  /**
   * Whether the shown notification is currently being hidden
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
 * Displays last notification from the state as a snackbar. Holds on
 * to notification for the duration of snackbar exit transition.
 */
class NotificationContainer extends React.Component<Props, ComponentState> {
  /**
   * Update state in response to the change of the top notification
   *
   * When notification is dismissed, top notification will change instantly to
   * the next pending notification, or to undefined if there are no pending
   * notifications, and we need to hold on to the previous notificaiton for the
   * duration of exit transition.
   *
   * If no notification was shown previously shown, than we can simply transfer
   * notification from props to the state.
   */
  public static getDerivedStateFromProps(props: Props, state: ComponentState) {
    // Update notification immediately when no notification is currently shown.
    if (state.notification === undefined) {
      return {
        counter: state.counter + 1,
        notification: props.notification
      };
    }

    // Begin exit transition on current notification
    if (state.notification !== props.notification) {
      return {
        exiting: true
      };
    }

    return null;
  }

  /**
   * Component state
   */
  public state: ComponentState = {
    counter: 0,
    notification: this.props.notification,
    exiting: false
  };

  /**
   * Handle exit animation finish
   *
   * Takes pending notification from props and puts it into state.
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
   * Invoked either by click or timeout.
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
