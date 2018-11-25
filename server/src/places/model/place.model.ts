import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Principal } from 'common/model/principal.model';
import { PlaceReview } from './place-review.model';

/**
 * Place Model
 *
 * Describes a restaurant details
 */
export class Place {
  /**
   * ID
   */
  @ApiModelProperty()
  public id: string;

  /**
   * Owner ID
   */
  @Exclude()
  public ownerId: string;

  /**
   * Display name
   */
  @ApiModelProperty()
  public title: string;

  /**
   * Physical address
   */
  @ApiModelProperty()
  public address: string;

  /**
   * Average review rating
   */
  @ApiModelProperty()
  public rating: number;

  /**
   * Review count
   */
  @ApiModelProperty()
  public reviewCount: number;

  /**
   * Highest rated review
   */
  @ApiModelProperty()
  public bestReview?: PlaceReview;

  /**
   * Highest rated review
   */
  @ApiModelProperty()
  public worstReview?: PlaceReview;

  /**
   * User's own review
   */
  @ApiModelProperty()
  public ownReview?: PlaceReview;

  /**
   * Describes whether the user can review the place
   */
  @ApiModelProperty()
  @Expose()
  get canReview(): true | undefined {
    if (!this.actor) {
      return;
    }

    // Only users can review
    if (!this.actor.roles.includes('user')) {
      return;
    }

    // Owner can't review their own restaurant
    if (this.actor.id === this.ownerId) {
      return;
    }

    // Can only review once
    return !this.ownReview || undefined;
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

    return (
      this.actor.roles.includes('admin') ||
      this.ownerId === this.actor.id ||
      undefined
    );
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

    return (
      this.actor.roles.includes('admin') ||
      this.ownerId === this.actor.id ||
      undefined
    );
  }

  /**
   * Identity of the user making the request
   */
  @Exclude()
  private readonly actor: Principal | undefined;

  /**
   * Constructor
   */
  constructor(actor: Principal | undefined, values: Partial<Place>) {
    this.actor = actor;

    Object.assign(this, values);
  }
}
