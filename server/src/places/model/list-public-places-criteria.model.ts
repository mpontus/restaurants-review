import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import { PaginationParams } from 'common/model/pagination-params.model';

/**
 * Describes parameters for public place listing
 */
export class ListPublicPlacesCriteria extends PaginationParams {
  /**
   * Filter places by rating
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @Min(1)
  @Max(5)
  @Transform((val: string) => parseInt(val, 10))
  public rating?: number;
}
