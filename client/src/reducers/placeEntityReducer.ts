import { normalize } from "normalizr";
import { Reducer } from "redux";
import { getType, isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlace } from "../actions/placeDetailsActions";
import {
  deletePlace,
  loadPlaces,
  updatePlace
} from "../actions/placeListActions";
import { deleteReview } from "../actions/reviewListActions";
import { Place } from "../models/Place";
import { placeSchema, reviewSchema } from "../schemas";
import { eitherPredicate } from "./utils/eitherPredicate";

export interface NormalizedPlace
  extends Omit<Place, "bestReview" | "worstReview" | "ownReview"> {
  bestReview?: string;
  worstReview?: string;
  ownReview?: string;
}

type State = { [id in string]?: NormalizedPlace };

/**
 * Place Entity Reducer
 *
 * Stores places by their ids.
 */
export const placeEntityReducer: Reducer<State, Action> = (
  state = {},
  action
) => {
  switch (action.type) {
    case getType(loadPlace.success):
    case getType(updatePlace.success): {
      const { place } = action.payload;

      return Object.assign(
        {},
        state,
        normalize(place, placeSchema).entities.place
      );
    }

    case getType(loadPlaces.success): {
      const { items } = action.payload.page;

      return Object.assign(
        {},
        state,
        normalize(items, [placeSchema]).entities.place
      );
    }

    default:
      return state;
  }
};
