import { createAsyncAction } from "typesafe-actions";
import { LoadPlacesDto } from "../models/LoadPlacesDto";
import { Page } from "../models/Page";
import { Place } from "../models/Place";
import { RequestError } from "../models/RequestError";
import { SavePlaceDto } from "../models/SavePlaceDto";

/**
 * Request places from API
 */
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

/**
 * Action dispatched for place creation
 */
export const createPlace = createAsyncAction(
  "CREATE_PLACE_REQUEST",
  "CREATE_PLACE_SUCCESS",
  "CREATE_PLACE_FAILURE"
)<SavePlaceDto, Place, RequestError<SavePlaceDto>>();

/**
 * Action dispatched for updating place details
 */
export const updatePlace = createAsyncAction(
  "UPDATE_PLACE_REQUEST",
  "UPDATE_PLACE_SUCCESS",
  "UPDATE_PLACE_FAILURE"
)<
  {
    place: Place;
    data: SavePlaceDto;
  },
  { place: Place },
  {
    place: Place;
    error: RequestError<SavePlaceDto>;
  }
>();

/**
 * Action dispatched for place deletion
 */
export const deletePlace = createAsyncAction(
  "DELETE_PLACE_REQUEST",
  "DELETE_PLACE_SUCCESS",
  "DELETE_PLACE_FAILURE"
)<
  {
    place: Place;
  },
  {
    place: Place;
  },
  {
    place: Place;
    error: RequestError<void>;
  }
>();
