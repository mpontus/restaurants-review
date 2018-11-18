/**
 * Review Projection
 *
 * Describes the properties of the review which must be included in
 * the output.
 */
export class ReviewProjection {
  /**
   * Specifies whether place details must be included in the review
   */
  public place: boolean;

  /**
   * Specifies whether author details must be included in the review
   */
  public author: boolean;
}
