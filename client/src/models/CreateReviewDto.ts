/**
 * Describes details specified during review creation
 */
export interface CreateReviewDto {
  /**
   * Review Rating
   */
  rating: number;

  /**
   * Comment
   */
  comment: string;
}
