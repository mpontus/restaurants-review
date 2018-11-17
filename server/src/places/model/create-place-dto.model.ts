import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * Describes request body for restaurant creation
 */
export class CreatePlaceDto {
  /**
   * Restaurant name
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiModelProperty()
  public title: string;

  /**
   * Physical address
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiModelProperty()
  public address: string;
}
