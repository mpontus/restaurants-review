import { Module } from '@nestjs/common';
import { CryptoService } from 'common/crypto.service';
import { JwtService } from 'common/jwt.service';
import { UserModule } from 'user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';
import { SessionService } from './session.service';

/**
 * Auth Module
 *
 * Responsible for handling user authentication
 */
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SessionService,
    RefreshTokenService,
    JwtService,
    CryptoService,
  ],
  exports: [SessionService],
  imports: [UserModule],
})
export class AuthModule {}
