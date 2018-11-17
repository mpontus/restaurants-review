import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { ListUsersCriteria } from './model/list-users-criteria.model';
import { UserList } from './model/user-list.model';
import { UserService } from './user.service';

/**
 * Users Controller
 *
 * Provides API endpoints for user management
 */
@Controller('/users')
@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * List existing users
   */
  @Get()
  @UseGuards(new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserList })
  public async listUsers(
    @Query() criteria: ListUsersCriteria,
  ): Promise<UserList> {
    return this.userService.listUsers(criteria);
  }
}
