import { Place } from 'places/model/place.model';
import { ReviewAuthor } from './review-author.model';

/**
 * Review Model
 *
 * Describes a review left for a place
 */
export class Review {
  /**
   * Review id
   */
  public id: string;

  /**
   * Place for which the review is made.
   */
  public place: Place;

  /**
   * Review author
   */
  public author: ReviewAuthor;

  /**
   * Review rating
   *
   * A number between 1 and 5.
   */
  public rating: number;

  /**
   * Date of the visit
   */
  public dateVisitted: string;

  /**
   * Review comment text
   */
  public comment: string;

  /**
   * Review reply left by the place owner
   */
  public reply?: string;

  /**
   * Constructor
   */
  constructor(values: Partial<Review>) {
    Object.assign(this, values);
  }
}
