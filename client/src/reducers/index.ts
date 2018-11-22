import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { authRequestReducer } from "./authRequestReducer";
import { deletedPlacesReducer } from "./deletedPlacesReducer";
import { deletedUsersReducer } from "./deletedUsersReducer";
import { ownPlaceListReducer } from "./ownPlaceListReducer";
import { placeCreateRequestReducer } from "./placeCreateRequestReducer";
import { placeEntityReducer } from "./placeEntityReducer";
import { placeListReducer } from "./placeListReducer";
import { placeListRequestReducer } from "./placeListRequestReducer";
import { placeRequestReducer } from "./placeRequestReducer";
import { placeUpdateRequestReducer } from "./placeUpdateRequestReducer";
import { reviewEntityReducer } from "./reviewEntityReducer";
import { reviewListReducer } from "./reviewListReducer";
import { reviewListRequestReducer } from "./reviewListRequestReducer";
import { userCreateRequestReducer } from "./userCreateRequestReducer";
import { userEntityReducer } from "./userEntityReducer";
import { userListReducer } from "./userListReducer";
import { userListRequestReducer } from "./userListRequestReducer";
import { userUpdateRequestReducer } from "./userUpdateRequestReducer";

/**
 * Export combined reducers
 */
export const rootReducer = combineReducers({
  auth: authReducer,
  authRequest: authRequestReducer,
  userEntity: userEntityReducer,
  userList: userListReducer,
  userListRequest: userListRequestReducer,
  userCreateRequest: userCreateRequestReducer,
  userUpdateRequest: userUpdateRequestReducer,
  deletedUsers: deletedUsersReducer,
  placeRequest: placeRequestReducer,
  placeEntity: placeEntityReducer,
  placeList: placeListReducer,
  ownPlaceList: ownPlaceListReducer,
  placeListRequest: placeListRequestReducer,
  placeCreateRequest: placeCreateRequestReducer,
  placeUpdateRequest: placeUpdateRequestReducer,
  deletedPlaces: deletedPlacesReducer,
  reviewEntity: reviewEntityReducer,
  reviewList: reviewListReducer,
  reviewListRequest: reviewListRequestReducer
});

/**
 * Infer state type from root reducer
 */
export type State = StateType<typeof rootReducer>;
