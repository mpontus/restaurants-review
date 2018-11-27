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
  public dateVisited: string;

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
   * User id for whom the review is pending
   */
  @Exclude()
  public pendingFor?: string;

  /**
   * Describes whether the user can reply to the review
   */
  @ApiModelProperty()
  @Expose()
  get canReply(): true | undefined {
    if (!this.actor) {
      return;
    }

    // Only owner can reply
    if (this.actor.id !== this.pendingFor) {
      return;
    }

    return true;
  }

  /**
   * Describe whether the user can edit the place
   */
  @ApiModelProperty()
  @Expose()
  get canEdit(): true | undefined {
    if (!this.actor) {
      return;
    }

    return this.actor.roles.includes('admin') || undefined;
  }

  /**
   * Describe whether the user can delete the place
   */
  @ApiModelProperty()
  @Expose()
  get canDelete(): true | undefined {
    if (!this.actor) {
      return;
    }

    return this.actor.roles.includes('admin') || undefined;
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
