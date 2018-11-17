import { ApiModelProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
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
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  /**
   * User email
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
}
