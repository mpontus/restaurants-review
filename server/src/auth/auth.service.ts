import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CryptoService } from 'common/crypto.service';
import { Principal } from 'common/model/principal.model';
import { User } from 'user/model/user.model';
import { UserRepository } from 'user/user.repository';
import { LoginDto } from './model/login-dto.model';
import { RefreshDto } from './model/refresh-dto.model';
import { Session } from './model/session.model';
import { SignupDto } from './model/signup-dto.model';
import { SessionRepository } from './session.repository';

/**
 * Auth Service
 *
 * Responsible for handling authentication use-cases
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * Return authorization details for specified access token
   */
  public async authenticate(accessToken: string): Promise<Principal> {
    const principal = await this.sessionRepository.getPrincipal(accessToken);

    if (principal === undefined) {
      throw new UnauthorizedException();
    }

    return principal;
  }

  /**
   * Create session for the user with the given email and password
   */
  public async login(data: LoginDto): Promise<Session> {
    const user = await this.userRepository.findByEmail(undefined, data.email);

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

    return this.sessionRepository.createForUser(user);
  }

  /**
   * Create a session for a new user
   */
  public async signup(data: SignupDto): Promise<Session> {
    const user = await this.userRepository.create(
      undefined,
      new User(undefined, {
        name: data.name,
        email: data.email,
        passwordHash: await this.cryptoService.hashPassword(data.password),
        roles: ['user'],
      }),
    );

    return this.sessionRepository.createForUser(user);
  }

  /**
   * Refresh session
   */
  public async refresh(data: RefreshDto): Promise<Session> {
    const session = await this.sessionRepository.findByRefreshToken(data.token);

    if (session === undefined) {
      throw new UnauthorizedException();
    }

    await this.sessionRepository.invalidateRefreshToken(session);

    return this.sessionRepository.createForUser(session.user);
  }

  /**
   * Invalidate refresh token
   */
  public async logout(accessToken: string): Promise<void> {
    const session = await this.sessionRepository.findByAccessToken(accessToken);

    if (session === undefined) {
      throw new UnauthorizedException();
    }

    await this.sessionRepository.invalidateRefreshToken(session);
  }
}
