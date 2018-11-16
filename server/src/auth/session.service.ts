import { Injectable } from '@nestjs/common';
import { JwtService } from 'common/jwt.service';
import { Principal } from 'common/model/principal.model';
import { validateSchema } from 'common/utils/validate-schema';
import * as t from 'io-ts';
import { User } from 'user/model/user.model';
import { Session } from './model/session.model';

const tokenPayloadSchema = t.type({
  sub: t.string,
  roles: t.array(t.string),
});

/**
 * Session service
 *
 * Responsible for session management
 */
@Injectable()
export class SessionService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Extract Principal from authorization token
   */
  public async getPrincipal(token: string): Promise<Principal> {
    const decoded = await this.jwtService.decode(token);
    const payload = await validateSchema(tokenPayloadSchema, decoded);

    return Object.assign(new Principal(), {
      id: payload.sub,
      roles: payload.roles,
    });
  }

  /**
   * Create new session for the given user
   */
  public async createForUser(user: User): Promise<Session> {
    const token = await this.jwtService.encode({
      sub: user.id,
      roles: user.roles,
    });

    return Object.assign(new Session(), {
      token,
      user,
    });
  }
}
