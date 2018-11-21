import { Place } from "./Place";

/**
 * Describes request for fetching reviews from API
 */
export type LoadReviewsDto =
  | {
      /**
       * Load pending reviews for logged in user
       */
      pending: true;

      /**
       * Page number
       */
      page: number;
    }
  | {
      /**
       * Load reviews for a given place
       */
      place: Place;

      /**
       * Page number
       */
      page: number;
    };
