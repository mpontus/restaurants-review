import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlaces } from "../actions/placeListActions";
import { Place } from "../models/Place";

export interface State {
  [id: string]: Place;
}

export const placeEntityReducer: Reducer<State, Action> = (
  state = {},
  action
) => {
  switch (action.type) {
    case getType(loadPlaces.success):
      return action.payload.page.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item
        }),
        state
      );

    default:
      return state;
  }
};
