import { createAsyncAction } from "typesafe-actions";
import { LoadPlacesDto } from "../models/LoadPlacesDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { RequestError } from "../models/RequestError";

export const loadPlaces = createAsyncAction(
  "LOAD_PLACES_REQUEST",
  "LOAD_PLACES_SUCCESS",
  "LOAD_PLACES_FAILURE"
)<
  LoadPlacesDto,
  {
    criteria: LoadPlacesDto;
    page: Page<Place>;
  },
  {
    criteria: LoadPlacesDto;
    error: RequestError<LoadPlacesDto>;
  }
>();
