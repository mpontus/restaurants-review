import { createAsyncAction } from "typesafe-actions";
import { LoadUsersDto } from "../models/LoadUsersDto";
import { Page } from "../models/Page";
import { RequestError } from "../models/RequestError";
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
