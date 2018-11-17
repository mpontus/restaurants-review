import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsArray,
  IsOptional,
  IsBoolean,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from 'user/validator/is-email-unique.validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Describes request body for user creation
 */
export class UpdateUserDto {
  /**
   * User display name
   */
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public name?: string;

  /**
   * User email address
   */
  @ApiModelProperty()
  @IsOptional()
  @IsEmail()
  @Validate(IsEmailUnique)
  public email?: string;

  /**
   * User password
   */
  @ApiModelProperty()
  @IsOptional()
  @MinLength(6)
  public password?: string;

  /**
   * Whether user has "owner" role
   */
  @IsOptional()
  @IsBoolean()
  public isOwner?: boolean;

  /**
   * Whether user has "admin" role
   */
  @IsOptional()
  @IsBoolean()
  public isAdmin?: boolean;
}
