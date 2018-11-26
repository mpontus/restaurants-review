import React from "react";
import Loadable from "react-loadable";
import { NotificationContainer } from "../containers/NotificationContainer";
import { Inject } from "../components/InjectionProvider";

/**
 * Loader for NotificationContainer
 */
export const NotificationContainerLoader = Loadable({
  loader: () =>
    Promise.all([
      import("../screens/PendingReviewsScreen"),
      import("../reducers/notificationReducer")
    ]),
  render: ([{ PendingReviewsScreen }, { notificationReducer }], props) => (
    <Inject
      reducers={{
        notifications: notificationReducer
      }}
    >
      <NotificationContainer />
    </Inject>
  ),

  loading: () => null
});
