import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
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
