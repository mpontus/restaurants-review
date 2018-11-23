import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * Auth Guard
 *
 * Restrict route access to authenticated users
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /**
   * Validate Bearer token and inject user entity into the request
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers || !req.headers.authorization) {
      // Use RolesGuard to restrict access to authenticated users.
      return true;
    }

    const [schema, credentials, ...rest] = req.headers.authorization.split(' ');

    if (!/^Bearer$/i.test(schema) || rest.length > 0) {
      return false;
    }

    const user = await this.authService.authenticate(credentials);

    if (user === undefined) {
      return false;
    }

    req.user = user;

    return true;
  }
}
