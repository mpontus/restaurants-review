import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

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
  public rating: number;

  /**
   * Review comment
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  public comment: string;

  /**
   * Date of the visit
   */
  @IsDateString()
  public dateVisitted: string;
}
