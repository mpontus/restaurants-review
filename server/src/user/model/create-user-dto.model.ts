import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from 'user/validator/is-email-unique.validator';

/**
 * Describes request body for user creation
 */
export class CreateUserDto {
  /**
   * User display name
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiModelProperty()
  public name: string;

  /**
   * User email address
   */
  @IsEmail()
  @MaxLength(60)
  @Validate(IsEmailUnique)
  @ApiModelProperty()
  public email: string;

  /**
   * User password
   */
  @MinLength(6)
  @ApiModelProperty()
  public password: string;

  /**
   * Whether user has "owner" role
   */
  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  public isOwner?: boolean;

  /**
   * Whether user has "admin" role
   */
  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  public isAdmin?: boolean;
}
