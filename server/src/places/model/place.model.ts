import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

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
   * Constructor
   */
  constructor(values: Partial<Place>) {
    Object.assign(this, values);
  }
}
