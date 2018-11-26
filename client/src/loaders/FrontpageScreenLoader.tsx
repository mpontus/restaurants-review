import React from "react";
import Loadable from "react-loadable";
import { Inject } from "../components/InjectionProvider";

/**
 * Loader for FrontpageScreen
 */
export const FrontpageScreenLoader = Loadable({
  loader: () =>
    Promise.all([
      import("../screens/FrontpageScreen"),
      import("../epics/placeListEpic"),
      import("../reducers/placeEntityReducer"),
      import("../reducers/placeListReducer"),
      import("../reducers/placeListRequestReducer"),
      import("../reducers/placeUpdateRequestReducer"),
      import("../reducers/deletedPlacesReducer"),
      import("../reducers/reviewEntityReducer")
    ]),
  render: (
    [
      { FrontpageScreen },
      { placeListEpic },
      { placeEntityReducer },
      { placeListReducer },
      { placeListRequestReducer },
      { placeUpdateRequestReducer },
      { deletedPlacesReducer },
      { reviewEntityReducer }
    ],
    props
  ) => {
    return (
      <Inject
        epics={[placeListEpic]}
        reducers={{
          placeEntity: placeEntityReducer,
          placeList: placeListReducer,
          placeListRequest: placeListRequestReducer,
          placeUpdateRequest: placeUpdateRequestReducer,
          deletedPlaces: deletedPlacesReducer,
          reviewEntity: reviewEntityReducer
        }}
      >
        <FrontpageScreen {...props} />
      </Inject>
    );
  },

  loading: () => null
});
