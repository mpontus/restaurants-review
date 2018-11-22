import { ActionType } from "typesafe-actions";
import * as authActions from "./authActions";
import * as placeDetailsActions from "./placeDetailsActions";
import * as placeListActions from "./placeListActions";
import * as reviewListActions from "./reviewListActions";
import * as userListActions from "./userListActions";

/**
 * Aggregate all action types for reducer and epic typing
 */
export type Action = ActionType<
  | typeof authActions
  | typeof userListActions
  | typeof placeListActions
  | typeof placeDetailsActions
  | typeof reviewListActions
>;
