import { createAsyncAction } from "typesafe-actions";
import { Place } from "../models/Place";
import { RequestError } from "../models/RequestError";

/**
 * Request a single place from the API
 */
export const loadPlace = createAsyncAction(
  "LOAD_PLACE_REQUEST",
  "LOAD_PLACE_SUCCESS",
  "LOAD_PLACE_FAILURE"
)<
  {
    id: string;
  },
  {
    id: string;
    place: Place;
  },
  {
    id: string;
    error: RequestError<void>;
  }
>();
