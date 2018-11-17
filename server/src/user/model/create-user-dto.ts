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
export class CreateUserDto {
  /**
   * User display name
   */
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  /**
   * User email address
   */
  @ApiModelProperty()
  @IsEmail()
  @Validate(IsEmailUnique)
  public email: string;

  /**
   * User password
   */
  @ApiModelProperty()
  @MinLength(6)
  public password: string;

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
