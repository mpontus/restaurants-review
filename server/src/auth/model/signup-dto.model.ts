import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  public email: string;

  /**
   * User password
   */
  @ApiModelProperty()
  @MinLength(6)
  public password: string;
}
