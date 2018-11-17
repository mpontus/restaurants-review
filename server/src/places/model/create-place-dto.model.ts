import { ApiRequestTimeoutResponse, ApiModelProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty, MaxLength } from 'class-validator';

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
