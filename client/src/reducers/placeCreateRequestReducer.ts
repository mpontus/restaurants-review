import { isActionOf } from "typesafe-actions";
import { createPlace } from "../actions/placeListActions";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";

/**
 * Manages request state for place updates.
 */
export const placeCreateRequestReducer = createRequestStatusReducer(
  isActionOf(createPlace.request),
  isActionOf(createPlace.success),
  isActionOf(createPlace.failure),
  action => action.payload
);
