import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

/**
 * Login credentials
 */
export class LoginDto {
  /**
   * User identifier
   */
  @ApiModelProperty()
  @IsEmail()
  @MaxLength(60)
  public email: string;

  /**
   * User password
   */
  @ApiModelProperty()
  @MinLength(6)
  public password: string;
}
