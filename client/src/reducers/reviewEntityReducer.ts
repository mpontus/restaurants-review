import { normalize } from "normalizr";
import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlace } from "../actions/placeDetailsActions";
import { loadReviews, updateReview } from "../actions/reviewListActions";
import { Review } from "../models/Review";
import { placeSchema } from "../schemas/placeSchema";
import { reviewSchema } from "../schemas/reviewSchema";

/**
 * State shape
 */
type State = { [id in string]?: Review };

/**
 * Stores review entities by their ids
 */
export const reviewEntityReducer: Reducer<State, Action> = (
  state = {},
  action
) => {
  switch (action.type) {
    case getType(loadReviews.success): {
      const { items } = action.payload.page;

      return Object.assign(
        {},
        state,
        normalize(items, [reviewSchema]).entities.review
      );
    }

    case getType(updateReview.success): {
      const { review } = action.payload;

      return Object.assign(
        {},
        state,
        normalize(review, reviewSchema).entities.review
      );
    }

    // Extract reviews from place details
    case getType(loadPlace.success): {
      const { place } = action.payload;

      return Object.assign(
        {},
        state,
        normalize(place, placeSchema).entities.review
      );
    }

    default:
      return state;
  }
};
