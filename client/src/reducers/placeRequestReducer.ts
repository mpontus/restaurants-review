import { isActionOf } from "typesafe-actions";
import { loadPlace } from "../actions/placeDetailsActions";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";
import { eitherPredicate } from "./utils/eitherPredicate";

/**
 * Maintains request state for requests for single place requests
 */
export const placeRequestReducer = createNamespaceReducer(
  eitherPredicate(
    isActionOf(loadPlace.request),
    isActionOf(loadPlace.success),
    isActionOf(loadPlace.failure)
  ),
  action => action.payload.id,
  createRequestStatusReducer(
    isActionOf(loadPlace.request),
    isActionOf(loadPlace.success),
    isActionOf(loadPlace.failure),
    action => action.payload.error
  )
);
