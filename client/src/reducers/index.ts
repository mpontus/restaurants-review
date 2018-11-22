import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { authRequestReducer } from "./authRequestReducer";
import { placeEntityReducer } from "./placeEntityReducer";
import { placeListReducer } from "./placeListReducer";
import { placeListRequestReducer } from "./placeListRequestReducer";
import { placeRequestReducer } from "./placeRequestReducer";
import { reviewEntityReducer } from "./reviewEntityReducer";
import { reviewListReducer } from "./reviewListReducer";
import { reviewListRequestReducer } from "./reviewListRequestReducer";
import { userEntityReducer } from "./userEntityReducer";
import { userListReducer } from "./userListReducer";
import { userListRequestReducer } from "./userListRequestReducer";

/**
 * Export combined reducers
 */
export const rootReducer = combineReducers({
  auth: authReducer,
  authRequest: authRequestReducer,
  userEntity: userEntityReducer,
  userList: userListReducer,
  userListRequest: userListRequestReducer,
  placeRequest: placeRequestReducer,
  placeEntity: placeEntityReducer,
  placeList: placeListReducer,
  placeListRequest: placeListRequestReducer,
  reviewEntity: reviewEntityReducer,
  reviewList: reviewListReducer,
  reviewListRequest: reviewListRequestReducer
});

/**
 * Infer state type from root reducer
 */
export type State = StateType<typeof rootReducer>;
