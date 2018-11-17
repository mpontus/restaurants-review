import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Session refresh request body
 */
export class RefreshDto {
  /**
   * Refresh token
   */
  @IsString()
  @IsNotEmpty()
  public token: string;
}
