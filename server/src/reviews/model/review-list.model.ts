import { ApiModelProperty } from '@nestjs/swagger';
import { IPagination } from 'common/interfaces/pagination.interface';
import { Review } from './review.model';

export class ReviewList implements IPagination<Review> {
  @ApiModelProperty()
  public readonly total: number;

  @ApiModelProperty()
  public readonly items: Review[];

  constructor(total: number, items: Review[]) {
    this.total = total;
    this.items = items;
  }
}
