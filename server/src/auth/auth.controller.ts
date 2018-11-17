import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Headers,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './model/login-dto.model';
import { RefreshDto } from './model/refresh-dto.model';
import { Session } from './model/session.model';
import { SignupDto } from './model/signup-dto.model';

/**
 * Auth Controller
 *
 * Repsonsible for providing API endpoints for authentication management
 */
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handle login
   */
  @Post('login')
  @ApiCreatedResponse({ type: Session })
  public async login(@Body() data: LoginDto): Promise<Session> {
    return this.authService.login(data);
  }

  /**
   * Handle signup
   */
  @Post('signup')
  @ApiCreatedResponse({ type: Session })
  public async signup(@Body() data: SignupDto): Promise<Session> {
    return this.authService.signup(data);
  }

  /**
   * Handle session refresh
   */
  @Post('refresh')
  @ApiCreatedResponse({ type: Session })
  public async refresh(@Body() data: RefreshDto): Promise<Session> {
    return this.authService.refresh(data);
  }

  /**
   * Handle logout
   */
  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  public async logout(
    @Headers('authorization') authorization: string,
  ): Promise<void> {
    const { 1: credentials } = authorization.split(' ');

    await this.authService.logout(credentials);
  }
}
