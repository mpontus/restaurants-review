import React from "react";
import Loadable from "react-loadable";
import { PendingReviewsScreen } from "../screens/PendingReviewsScreen";
import { Inject } from "../components/InjectionProvider";

/**
 * Loader for PendingReviewsScreen
 */
export const PendingReviewsScreenLoader = Loadable({
  loader: () =>
    Promise.all([
      import("../screens/PendingReviewsScreen"),
      import("../epics/reviewListEpic"),
      import("../reducers/reviewEntityReducer"),
      import("../reducers/pendingReviewListReducer"),
      import("../reducers/reviewListRequestReducer"),
      import("../reducers/reviewUpdateRequestReducer"),
      import("../reducers/deletedReviewsReducer")
    ]),
  render: (
    [
      { PendingReviewsScreen },
      { reviewListEpic },
      { reviewEntityReducer },
      { pendingReviewListReducer },
      { reviewListRequestReducer },
      { reviewUpdateRequestReducer },
      { deletedReviewsReducer }
    ],
    props
  ) => (
    <Inject
      epics={[reviewListEpic]}
      reducers={{
        reviewEntity: reviewEntityReducer,
        pendingReviewList: pendingReviewListReducer,
        reviewListRequest: reviewListRequestReducer,
        reviewUpdateRequest: reviewUpdateRequestReducer,
        deletedReviews: deletedReviewsReducer
      }}
    >
      <PendingReviewsScreen {...props} />
    </Inject>
  ),

  loading: () => null
});
