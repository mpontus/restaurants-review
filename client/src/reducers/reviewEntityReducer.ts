import { normalize } from "normalizr";
import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import { loadPlace } from "../actions/placeDetailsActions";
import {
  loadReviews,
  updateReview
} from "../actions/reviewListActions";
import { Review } from "../models/Review";
import { placeSchema, reviewSchema } from "../schemas";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface NormalizedReview extends Omit<Review, "place"> {
  place: string;
}

type State = { [id in string]?: NormalizedReview };

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

      return {
        ...state,
        [review.id]: review
      };
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
