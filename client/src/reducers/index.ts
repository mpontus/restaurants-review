import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { placeEntityReducer } from "./placeEntityReducer";
import { placeListReducer } from "./placeListReducer";
import { placeListRequestReducer } from "./placeListRequestReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  placeEntity: placeEntityReducer,
  placeList: placeListReducer,
  placeListRequest: placeListRequestReducer
});

export type State = StateType<typeof rootReducer>;
