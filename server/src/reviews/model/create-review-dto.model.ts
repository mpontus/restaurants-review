import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { IsValidVisitDate } from 'reviews/validator/is-valid-visit-date';

/**
 * Describes request body for review creation
 */
export class CreateReviewDto {
  /**
   * Rating between 1 and 5
   */
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiModelProperty({
    type: 'number',
    enum: [1, 2, 3, 4, 5],
  })
  public rating: number;

  /**
   * Review comment
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiModelProperty({
    type: 'string',
    maxLength: 400,
  })
  public comment: string;

  /**
   * Date of the visit
   */
  @IsString()
  @Validate(IsValidVisitDate)
  @ApiModelProperty({
    type: 'string',
    format: 'date',
  })
  public dateVisitted: string;
}
