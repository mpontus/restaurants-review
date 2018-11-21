import { isActionOf } from "typesafe-actions";
import { loadPlaces } from "../actions/placeListActions";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";

/**
 * Request state reducer for place listing
 *
 * Maintains request state details when fetching list of places.
 */
export const placeListRequestReducer = createRequestStatusReducer(
  isActionOf(loadPlaces.request),
  isActionOf(loadPlaces.success),
  isActionOf(loadPlaces.failure),
  action => action.payload.error
);
