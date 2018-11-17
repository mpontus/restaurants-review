import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

/**
 * Login credentials
 */
export class LoginDto {
  /**
   * User identifier
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
