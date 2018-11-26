import React from "react";
import Loadable from "react-loadable";
import { PlaceDetailsScreen } from "../screens/PlaceDetailsScreen";
import { Inject } from "../components/InjectionProvider";

/**
 * Loader for PlaceDetailsScreen
 */
export const PlaceDetailsScreenLoader = Loadable({
  loader: () =>
    Promise.all([
      import("../screens/PlaceDetailsScreen"),
      import("../epics/placeListEpic"),
      import("../epics/placeDetailsEpic"),
      import("../epics/reviewListEpic"),
      Promise.all([
        import("../reducers/placeEntityReducer"),
        import("../reducers/placeListReducer"),
        import("../reducers/placeListRequestReducer"),
        import("../reducers/placeUpdateRequestReducer"),
        import("../reducers/deletedPlacesReducer")
      ]),
      Promise.all([
        import("../reducers/reviewEntityReducer"),
        import("../reducers/reviewListReducer"),
        import("../reducers/reviewListRequestReducer"),
        import("../reducers/reviewCreateRequestReducer"),
        import("../reducers/reviewUpdateRequestReducer"),
        import("../reducers/deletedReviewsReducer")
      ])
    ]),
  render: (
    [
      { PlaceDetailsScreen },
      { placeListEpic },
      { placeDetailsEpic },
      { reviewListEpic },
      [
        { placeEntityReducer },
        { placeListReducer },
        { placeListRequestReducer },
        { placeUpdateRequestReducer },
        { deletedPlacesReducer }
      ],
      [
        { reviewEntityReducer },
        { reviewListReducer },
        { reviewListRequestReducer },
        { reviewCreateRequestReducer },
        { reviewUpdateRequestReducer },
        { deletedReviewsReducer }
      ]
    ],
    props
  ) => (
    <Inject
      epics={[placeListEpic, placeDetailsEpic, reviewListEpic]}
      reducers={{
        placeEntity: placeEntityReducer,
        placeList: placeListReducer,
        placeListRequest: placeListRequestReducer,
        placeUpdateRequest: placeUpdateRequestReducer,
        deletedPlacesRequest: deletedPlacesReducer,
        reviewEntity: reviewEntityReducer,
        reviewList: reviewListReducer,
        reviewListRequest: reviewListRequestReducer,
        reviewCreateRequest: reviewCreateRequestReducer,
        reviewUpdateRequest: reviewUpdateRequestReducer,
        deletedReviews: deletedReviewsReducer
      }}
    >
      <PlaceDetailsScreen {...props} />
    </Inject>
  ),

  loading: () => null
}) as typeof PlaceDetailsScreen;
