import { ApiResponseModelProperty } from '@nestjs/swagger';
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
  @ApiResponseModelProperty()
  public id!: string;

  /**
   * Place for which the review is made.
   */
  @ApiResponseModelProperty()
  public place: Place;

  /**
   * Review author
   */
  @ApiResponseModelProperty()
  public author: ReviewAuthor;

  /**
   * Review rating
   *
   * A number between 1 and 5.
   */
  @ApiResponseModelProperty()
  public rating: number;

  /**
   * Date of the visit
   */
  @ApiResponseModelProperty()
  public dateVisitted: string;

  /**
   * Review comment text
   */
  @ApiResponseModelProperty()
  public comment: string;

  /**
   * Review reply left by the place owner
   */
  @ApiResponseModelProperty()
  public reply?: string;

  /**
   * Constructor
   */
  constructor(values: Partial<Review>) {
    Object.assign(this, values);
  }
}
