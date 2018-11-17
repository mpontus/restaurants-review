import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Injectable,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ListUsersCriteria } from './model/list-users-criteria.model';
import { UserList } from './model/user-list.model';
import { UserService } from './user.service';

/**
 * Users Controller
 *
 * Provides API endpoints for user management
 */
@Controller('/users')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserList })
  public async listUsers(
    @Query() criteria: ListUsersCriteria,
  ): Promise<UserList> {
    return this.userService.listUsers(criteria);
  }
}
