import { combineEpics } from "redux-observable";
import { authEpic } from "./authEpic";
import { placeDetailsEpic } from "./placeDetailsEpic";
import { placeListEpic } from "./placeListEpic";
import { reviewListEpic } from "./reviewListEpic";
import { userListEpic } from "./userListEpic";

/**
 * Export all epics combined
 */
export const rootEpic = combineEpics(
  authEpic,
  placeListEpic,
  placeDetailsEpic,
  reviewListEpic,
  userListEpic
);
