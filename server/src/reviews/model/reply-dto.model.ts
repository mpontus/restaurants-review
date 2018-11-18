import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Describes request body for replying to a review
 */
export class ReplyDto {
  /**
   * Reply text
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiModelProperty({
    type: 'string',
    maxLength: 400,
  })
  public comment: string;
}
