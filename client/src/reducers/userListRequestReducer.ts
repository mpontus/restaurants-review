import { isActionOf } from "typesafe-actions";
import { loadUsers } from "../actions/userListActions";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";

/**
 * Request state reducer for user listing
 *
 * Maintains request state details when fetching list of users.
 */
export const userListRequestReducer = createRequestStatusReducer(
  isActionOf(loadUsers.request),
  isActionOf(loadUsers.success),
  isActionOf(loadUsers.failure),
  action => action.payload.error
);
