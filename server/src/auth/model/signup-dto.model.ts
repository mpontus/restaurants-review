import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from 'user/validator/is-email-unique.validator';

/**
 * Signup Details
 */
export class SignupDto {
  /**
   * User display name
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiModelProperty()
  public name: string;

  /**
   * User email
   */
  @IsEmail()
  @MaxLength(60)
  @Validate(IsEmailUnique)
  @ApiModelProperty()
  public email: string;

  /**
   * User password
   */
  @ApiModelProperty()
  @MinLength(6)
  public password: string;
}
