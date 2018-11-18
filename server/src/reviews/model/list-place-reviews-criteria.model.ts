import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Max, Min } from 'class-validator';

/**
 * Describes request parameters for listing place reviews
 */
export class ListPlaceReviewsCriteria {
  /**
   * Pagination limit
   */
  @ApiModelProperty()
  @Min(0)
  @Max(50)
  @Transform((val: string) => parseInt(val, 10))
  public take: number = 10;

  /**
   * Pagination offset
   */
  @ApiModelProperty()
  @Min(0)
  @Transform((val: string) => parseInt(val, 10))
  public skip: number = 0;
}
