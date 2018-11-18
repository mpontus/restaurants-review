import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * Describes request body for updating review details
 */
export class UpdateReviewDto {
  /**
   * Updated review rating
   */
  @IsInt()
  @Min(1)
  @Max(5)
  public rating?: number;

  /**
   * Update date of the visit
   */
  @IsString()
  @ApiModelProperty({
    type: 'string',
    format: 'date',
  })
  public dateVisitted?: string;

  /**
   * Updated text of the review comment
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiModelProperty({
    type: 'string',
    maxLength: 400,
  })
  public comment?: string;

  /**
   * Updated text of the review reply
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiModelProperty({
    type: 'string',
    maxLength: 400,
  })
  public reply?: string;
}
