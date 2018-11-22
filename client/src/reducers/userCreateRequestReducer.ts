import { isActionOf } from "typesafe-actions";
import { createUser } from "../actions/userListActions";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";

/**
 * Manages request state for user updates.
 */
export const userCreateRequestReducer = createRequestStatusReducer(
  isActionOf(createUser.request),
  isActionOf(createUser.success),
  isActionOf(createUser.failure),
  action => action.payload
);
