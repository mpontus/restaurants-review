import React from "react";
import Loadable from "react-loadable";
import { OwnPlacesScreen } from "../screens/OwnPlacesScreen";
import { Inject } from "../components/InjectionProvider";

/**
 * Loader for OwnPlacesScreen
 */
export const OwnPlacesScreenLoader = Loadable({
  loader: () =>
    Promise.all([
      import("../screens/OwnPlacesScreen"),
      import("../epics/placeListEpic"),
      import("../reducers/placeCreateRequestReducer"),
      import("../reducers/placeEntityReducer"),
      import("../reducers/ownPlaceListReducer"),
      import("../reducers/placeListRequestReducer"),
      import("../reducers/placeUpdateRequestReducer"),
      import("../reducers/deletedPlacesReducer"),
      import("../reducers/reviewEntityReducer")
    ]),
  render: (
    [
      { OwnPlacesScreen },
      { placeListEpic },
      { placeCreateRequestReducer },
      { placeEntityReducer },
      { ownPlaceListReducer },
      { placeListRequestReducer },
      { placeUpdateRequestReducer },
      { deletedPlacesReducer },
      { reviewEntityReducer }
    ],
    props
  ) => (
    <Inject
      epics={[placeListEpic]}
      reducers={{
        placeCreateRequest: placeCreateRequestReducer,
        placeEntity: placeEntityReducer,
        ownPlaceList: ownPlaceListReducer,
        placeListRequest: placeListRequestReducer,
        placeUpdateRequest: placeUpdateRequestReducer,
        deletedPlaces: deletedPlacesReducer,
        reviewEntity: reviewEntityReducer
      }}
    >
      <OwnPlacesScreen {...props} />
    </Inject>
  ),

  loading: () => null
});
