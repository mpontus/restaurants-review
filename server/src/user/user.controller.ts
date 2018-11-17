import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { CreateUserDto } from './model/create-user-dto.model';
import { ListUsersCriteria } from './model/list-users-criteria.model';
import { UpdateUserDto } from './model/update-user-dto.model';
import { UserList } from './model/user-list.model';
import { User } from './model/user.model';
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

  /**
   * Create new user
   */
  @Post()
  @UseGuards(new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: User })
  public async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.createUser(data);
  }

  /**
   * Update user
   */
  @Patch(':id')
  @UseGuards(new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  public async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  /**
   * Update user
   */
  @Delete(':id')
  @UseGuards(new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 204, type: User })
  public async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
