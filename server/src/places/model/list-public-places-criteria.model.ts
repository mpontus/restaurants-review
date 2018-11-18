import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

/**
 * Describes parameters for public place listing
 */
export class ListPublicPlacesCriteria {
  /**
   * Filter places by rating
   */
  @ApiModelPropertyOptional()
  @IsOptional()
  @Min(1)
  @Max(5)
  @Transform((val: string) => parseInt(val, 10))
  public rating?: number;

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
