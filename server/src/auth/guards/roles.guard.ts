import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IAuthRequest } from 'common/interfaces/auth-request.interface';

/**
 * Roles Guard
 *
 * Limits route access to the users with specified roles. Matching any
 * of the roles specified in the constructor will authorize route
 * access. Multiple guards can be used to perform inclusive check.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly anyRole: string[]) {}

  /**
   * Check if the user has any of the specified roles
   */
  public canActivate(context: ExecutionContext): boolean {
    const req: IAuthRequest = context.switchToHttp().getRequest();

    if (!req.user) {
      return false;
    }

    return req.user.roles.some(this.matchRole.bind(this));
  }

  /**
   * Match given role against roles specified in the constrictor
   */
  private matchRole(role: string): boolean {
    return this.anyRole.includes(role);
  }
}
