import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './model/login-dto.model';
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
  @ApiOkResponse({ type: Session })
  public async login(@Body() data: LoginDto): Promise<Session> {
    return this.authService.login(data);
  }

  /**
   * Handle signup
   */
  @Post('signup')
  @ApiOkResponse({ type: Session })
  public async signup(@Body() data: SignupDto): Promise<Session> {
    return this.authService.signup(data);
  }
}
