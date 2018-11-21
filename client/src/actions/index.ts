import { ActionType } from "typesafe-actions";
import * as authActions from "./authActions";
import * as placeListActions from "./placeListActions";

/**
 * Aggregate all action types for reducer and epic typing
 */
export type Action = ActionType<typeof authActions | typeof placeListActions>;
