import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
   * Constructor
   */
  constructor(values: Partial<Place>) {
    Object.assign(this, values);
  }
}
