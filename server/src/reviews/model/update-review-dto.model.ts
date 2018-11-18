import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { IsValidVisitDate } from 'reviews/validator/is-valid-visit-date';

/**
 * Describes request body for updating review details
 */
export class UpdateReviewDto {
  /**
   * Updated review rating
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiModelProperty({
    type: 'number',
    enum: [1, 2, 3, 4, 5],
  })
  public rating?: number;

  /**
   * Update date of the visit
   */
  @IsOptional()
  @IsString()
  @Validate(IsValidVisitDate)
  @ApiModelProperty({
    type: 'string',
    format: 'date',
  })
  public dateVisitted?: string;

  /**
   * Updated text of the review comment
   */
  @IsOptional()
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
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiModelProperty({
    type: 'string',
    maxLength: 400,
  })
  public reply?: string;
}
