/**
 * Describes an update to a review
 */
export interface UpdateReviewDto {
  /**
   * Updated review rating
   */
  rating?: number;

  /**
   * Updated comment
   */
  comment?: string;

  /**
   * Updated reply
   */
  reply?: string;
}
