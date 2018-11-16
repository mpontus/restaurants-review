import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CryptoService } from 'common/crypto.service';
import { User } from 'user/model/user.model';
import { UserRepository } from 'user/user.repository';
import { LoginDto } from './model/login-dto.model';
import { RefreshDto } from './model/refresh-dto';
import { Session } from './model/session.model';
import { SignupDto } from './model/signup-dto.model';
import { RefreshTokenService } from './refresh-token.service';
import { SessionService } from './session.service';

/**
 * Auth Service
 *
 * Responsible for handling authentication use-cases
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly sessionService: SessionService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /**
   * Create session for the user with the given email and password
   */
  public async login(data: LoginDto): Promise<Session> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user === undefined || user.passwordHash === undefined) {
      throw new BadRequestException('Bad credentials');
    }

    const isPasswordValid = await this.cryptoService.verifyPassword(
      user.passwordHash,
      data.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Bad credentials');
    }

    return this.sessionService.createForUser(user);
  }

  /**
   * Create a session for a new user
   */
  public async signup(data: SignupDto): Promise<Session> {
    const user = new User({
      email: data.email,
      passwordHash: await this.cryptoService.hashPassword(data.password),
      roles: ['user'],
    });

    await this.userRepository.create(user);

    return this.sessionService.createForUser(user);
  }

  public async refresh(data: RefreshDto): Promise<Session> {
    const user = await this.refreshTokenService.findUser(data.token);

    if (user === undefined) {
      throw new BadRequestException('Invalid refresh token');
    }

    return this.sessionService.createForUser(user);
  }
}
