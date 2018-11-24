import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlace } from "../actions/placeDetailsActions";
import {
  deletePlace,
  loadPlaces,
  updatePlace
} from "../actions/placeListActions";
import { Place } from "../models/Place";

type State = { [id in string]?: Place };

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
      return {
        ...state,
        [action.payload.id]: action.payload.place
      };

    case getType(loadPlaces.success):
      return action.payload.page.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item
        }),
        state
      );

    case getType(updatePlace.success): {
      const { place } = action.payload;

      return {
        ...state,
        [place.id]: place
      };
    }

    case getType(deletePlace.success): {
      const { place } = action.payload;

      return {
        ...state,
        [place.id]: undefined
      };
    }

    default:
      return state;
  }
};
