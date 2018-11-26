import { Place } from "./Place";

/**
 * Describes request for fetching reviews from API
 */
export interface LoadReviewsDto {
  /**
   * Load pending reviews for logged in user
   */
  pending?: boolean;

  /**
   * Load reviews for a given place
   */
  place?: Place;

  /**
   * Page number
   */
  page: number;
}
