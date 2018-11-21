import { combineEpics } from "redux-observable";
import { placeDetailsEpic } from "./placeDetailsEpic";
import { placeListEpic } from "./placeListEpic";
import { reviewListEpic } from "./reviewListEpic";

/**
 * Export all epics combined
 */
export const rootEpic = combineEpics(
  placeListEpic,
  placeDetailsEpic,
  reviewListEpic
);
