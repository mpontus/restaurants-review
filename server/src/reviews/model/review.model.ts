import { ApiModelProperty, ApiResponseModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Principal } from 'common/model/principal.model';
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
   * Describes whether the user can reply to the review
   */
  @ApiModelProperty()
  @Expose()
  get canReply(): boolean {
    if (!this.actor) {
      return false;
    }

    // Only owner can reply
    if (this.actor.id !== this.place.ownerId) {
      return false;
    }

    // Can only reply once
    if (this.reply !== undefined) {
      return false;
    }

    return true;
  }

  /**
   * Describe whether the user can edit the place
   */
  @ApiModelProperty()
  @Expose()
  get canEdit(): boolean {
    if (!this.actor) {
      return false;
    }

    return this.actor.roles.includes('admin');
  }

  /**
   * Describe whether the user can delete the place
   */
  @ApiModelProperty()
  @Expose()
  get canDelete(): boolean {
    if (!this.actor) {
      return false;
    }

    return this.actor.roles.includes('admin');
  }

  /**
   * Identity of the user making the request
   */
  @Exclude()
  private readonly actor: Principal | undefined;

  /**
   * Constructor
   */
  constructor(actor: Principal | undefined, values: Partial<Review>) {
    this.actor = actor;

    Object.assign(this, values);
  }
}
