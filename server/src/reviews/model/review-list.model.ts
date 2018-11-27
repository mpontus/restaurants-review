import { ApiModelProperty } from '@nestjs/swagger';
import { IPagination } from 'common/interfaces/pagination.interface';
import { Review } from './review.model';

/**
 * Describes a pagination review list response
 */
export class ReviewList implements IPagination<Review> {
  /**
   * Total number of available reviews matching criteria
   */
  @ApiModelProperty()
  public readonly total: number;

  /**
   * Reviews on current page
   */
  @ApiModelProperty()
  public readonly items: Review[];

  /**
   * Constructor
   */
  constructor(total: number, items: Review[]) {
    this.total = total;
    this.items = items;
  }
}
