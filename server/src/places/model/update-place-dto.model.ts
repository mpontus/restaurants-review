import { ApiRequestTimeoutResponse, ApiModelProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';

/**
 * Describes request body for restaurant update
 */
export class UpdatePlaceDto {
  /**
   * Restaurant name
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiModelProperty()
  public title?: string;

  /**
   * Physical address
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiModelProperty()
  public address: string;
}
