import { isActionOf } from "typesafe-actions";
import { deletePlace, updatePlace } from "../actions/placeListActions";
import { RequestError } from "../models/RequestError";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";
import { eitherPredicate } from "./utils/eitherPredicate";

/**
 * Manages request state for place updates.
 */
export const placeUpdateRequestReducer = createNamespaceReducer(
  eitherPredicate(
    isActionOf(updatePlace.request),
    isActionOf(updatePlace.success),
    isActionOf(updatePlace.failure),
    isActionOf(deletePlace.request),
    isActionOf(deletePlace.success),
    isActionOf(deletePlace.failure)
  ),
  action => action.payload.place.id,
  createRequestStatusReducer(
    eitherPredicate(
      isActionOf(updatePlace.request),
      isActionOf(deletePlace.request)
    ),
    eitherPredicate(
      isActionOf(updatePlace.success),
      isActionOf(deletePlace.success)
    ),
    eitherPredicate(
      isActionOf(updatePlace.failure),
      isActionOf(deletePlace.failure)
    ),
    action => action.payload.error as RequestError<any>
  )
);
