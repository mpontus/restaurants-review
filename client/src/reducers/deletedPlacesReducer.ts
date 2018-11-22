import { isActionOf } from "typesafe-actions";
import { deletePlace } from "../actions/placeListActions";
import { createDeletedEntityReducer } from "./utils/createDeletedEntityReducer";

/**
 * Keeps track of deleted places
 */
export const deletedPlacesReducer = createDeletedEntityReducer(
  isActionOf(deletePlace.success),
  action => action.payload.place.id
);
