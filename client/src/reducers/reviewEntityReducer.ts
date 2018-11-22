import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import {
  deleteReview,
  loadReviews,
  updateReview
} from "../actions/reviewListActions";
import { Review } from "../models/Review";

type State = { [id in string]?: Review };

/**
 * Stores review entities by their ids
 */
export const reviewEntityReducer: Reducer<State, Action> = (
  state = {},
  action
) => {
  switch (action.type) {
    case getType(loadReviews.success):
      return action.payload.page.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item
        }),
        state
      );

    case getType(updateReview.success): {
      const { review } = action.payload;

      return {
        ...state,
        [review.id]: review
      };
    }

    case getType(deleteReview.success): {
      const { review } = action.payload;

      return {
        ...state,
        [review.id]: undefined
      };
    }

    default:
      return state;
  }
};
