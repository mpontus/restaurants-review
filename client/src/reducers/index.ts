import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { authRequestReducer } from "./authRequestReducer";
import { deletedPlacesReducer } from "./deletedPlacesReducer";
import { deletedReviewsReducer } from "./deletedReviewsReducer";
import { deletedUsersReducer } from "./deletedUsersReducer";
import { notificationReducer } from "./notificationReducer";
import { ownPlaceListReducer } from "./ownPlaceListReducer";
import { pendingReviewListReducer } from "./pendingReviewListReducer";
import { placeCreateRequestReducer } from "./placeCreateRequestReducer";
import { placeEntityReducer } from "./placeEntityReducer";
import { placeListReducer } from "./placeListReducer";
import { placeListRequestReducer } from "./placeListRequestReducer";
import { placeRequestReducer } from "./placeRequestReducer";
import { placeUpdateRequestReducer } from "./placeUpdateRequestReducer";
import { reviewCreateRequestReducer } from "./reviewCreateRequestReducer";
import { reviewEntityReducer } from "./reviewEntityReducer";
import { reviewListReducer } from "./reviewListReducer";
import { reviewListRequestReducer } from "./reviewListRequestReducer";
import { reviewUpdateRequestReducer } from "./reviewUpdateRequestReducer";
import { userCreateRequestReducer } from "./userCreateRequestReducer";
import { userEntityReducer } from "./userEntityReducer";
import { userListReducer } from "./userListReducer";
import { userListRequestReducer } from "./userListRequestReducer";
import { userUpdateRequestReducer } from "./userUpdateRequestReducer";

/**
 * Export final store shape after all reducers are injected.
 */
export interface State {
  auth: StateType<typeof authReducer>;
  authRequest: StateType<typeof authRequestReducer>;
  userEntity: StateType<typeof userEntityReducer>;
  userList: StateType<typeof userListReducer>;
  userListRequest: StateType<typeof userListRequestReducer>;
  userCreateRequest: StateType<typeof userCreateRequestReducer>;
  userUpdateRequest: StateType<typeof userUpdateRequestReducer>;
  deletedUsers: StateType<typeof deletedUsersReducer>;
  placeRequest: StateType<typeof placeRequestReducer>;
  placeEntity: StateType<typeof placeEntityReducer>;
  placeList: StateType<typeof placeListReducer>;
  ownPlaceList: StateType<typeof ownPlaceListReducer>;
  placeListRequest: StateType<typeof placeListRequestReducer>;
  placeCreateRequest: StateType<typeof placeCreateRequestReducer>;
  placeUpdateRequest: StateType<typeof placeUpdateRequestReducer>;
  deletedPlaces: StateType<typeof deletedPlacesReducer>;
  reviewEntity: StateType<typeof reviewEntityReducer>;
  reviewList: StateType<typeof reviewListReducer>;
  pendingReviewList: StateType<typeof pendingReviewListReducer>;
  reviewListRequest: StateType<typeof reviewListRequestReducer>;
  reviewCreateRequest: StateType<typeof reviewCreateRequestReducer>;
  reviewUpdateRequest: StateType<typeof reviewUpdateRequestReducer>;
  deletedReviews: StateType<typeof deletedReviewsReducer>;
  notifications: StateType<typeof notificationReducer>;
}

/**
 * Export reducers taht should be available on bootstrap
 */
export const defaultReducers = {
  auth: authReducer,
  authRequest: authRequestReducer
};
