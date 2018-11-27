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
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'auth/guards/auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { IAuthRequest } from 'common/interfaces/auth-request.interface';
import { UUIDValidationPipe } from 'common/pipes/uuid-validation.pipe';
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
    @Req() req: IAuthRequest,
    @Query() criteria: ListUsersCriteria,
  ): Promise<UserList> {
    return this.userService.listUsers(req.user, criteria);
  }

  /**
   * Create new user
   */
  @Post()
  @UseGuards(new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: User })
  public async createUser(
    @Req() req: IAuthRequest,
    @Body() data: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(req.user, data);
  }

  /**
   * Update user
   */
  @Patch(':id')
  @UseGuards(new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  public async updateUser(
    @Req() req: IAuthRequest,
    @Param('id', UUIDValidationPipe) id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.findUser(req.user, id);

    return this.userService.updateUser(user, data);
  }

  /**
   * Update user
   */
  @Delete(':id')
  @UseGuards(new RolesGuard(['admin']))
  @ApiBearerAuth()
  @ApiResponse({ status: 204, type: User })
  public async deleteUser(
    @Req() req: IAuthRequest,
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<void> {
    const user = await this.userService.findUser(req.user, id);

    return this.userService.deleteUser(user);
  }
}
