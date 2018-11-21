import { Review } from "./Review";

/**
 * Place Model
 */
export interface Place {
  /**
   * Place ID
   */
  id: string;

  /**
   * Place title
   */
  title: string;

  /**
   * Place address
   */
  address: string;

  /**
   * Average review rating
   */
  rating: number;

  /**
   * Review with the highest rating
   */
  bestReview?: Review;

  /**
   * Review with the lowest rating
   */
  worstReview?: Review;

  /**
   * Review by the currently logged in user
   */
  ownReview?: Review;
}
