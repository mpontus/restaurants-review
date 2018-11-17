import { Module } from '@nestjs/common';
import { CryptoService } from 'common/crypto.service';
import { JwtService } from 'common/jwt.service';
import { UserModule } from 'user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionRepository } from './session.repository';

/**
 * Auth Module
 *
 * Responsible for handling user authentication
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService, SessionRepository, JwtService, CryptoService],
  imports: [UserModule],
  exports: [AuthService],
})
export class AuthModule {}
