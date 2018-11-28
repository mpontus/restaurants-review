import { createAsyncAction } from "typesafe-actions";
import { LoadUsersDto } from "../models/LoadUsersDto";
import { Page } from "../models/Page";
import { RequestError } from "../models/RequestError";
import { SaveUserDto } from "../models/SaveUserDto";
import { User } from "../models/User";

/**
 * Request users from API
 */
export const loadUsers = createAsyncAction(
  "LOAD_USERS_REQUEST",
  "LOAD_USERS_SUCCESS",
  "LOAD_USERS_FAILURE"
)<
  LoadUsersDto,
  {
    criteria: LoadUsersDto;
    page: Page<User>;
  },
  {
    criteria: LoadUsersDto;
    error: RequestError<LoadUsersDto>;
  }
>();

/**
 * Action dispatched for user creation
 */
export const createUser = createAsyncAction(
  "CREATE_USER_REQUEST",
  "CREATE_USER_SUCCESS",
  "CREATE_USER_FAILURE"
)<SaveUserDto, User, RequestError<SaveUserDto>>();

/**
 * Action dispatched for updating user details
 */
export const updateUser = createAsyncAction(
  "UPDATE_USER_REQUEST",
  "UPDATE_USER_SUCCESS",
  "UPDATE_USER_FAILURE"
)<
  {
    user: User;
    data: Partial<SaveUserDto>;
  },
  { user: User },
  {
    user: User;
    error: RequestError<SaveUserDto>;
  }
>();

/**
 * Action dispatched for user deletion
 */
export const deleteUser = createAsyncAction(
  "DELETE_USER_REQUEST",
  "DELETE_USER_SUCCESS",
  "DELETE_USER_FAILURE"
)<
  {
    user: User;
  },
  {
    user: User;
  },
  {
    user: User;
    error: RequestError<void>;
  }
>();
