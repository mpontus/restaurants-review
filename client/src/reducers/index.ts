import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { placeEntityReducer } from "./placeEntityReducer";
import { placeListReducer } from "./placeListReducer";
import { placeListRequestReducer } from "./placeListRequestReducer";
import { placeRequestReducer } from "./placeRequestReducer";
import { reviewEntityReducer } from "./reviewEntityReducer";
import { reviewListReducer } from "./reviewListReducer";
import { reviewListRequestReducer } from "./reviewListRequestReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  placeRequest: placeRequestReducer,
  placeEntity: placeEntityReducer,
  placeList: placeListReducer,
  placeListRequest: placeListRequestReducer,
  reviewEntity: reviewEntityReducer,
  reviewList: reviewListReducer,
  reviewListRequest: reviewListRequestReducer
});

export type State = StateType<typeof rootReducer>;
