import { isActionOf } from "typesafe-actions";
import { deleteUser } from "../actions/userListActions";
import { createDeletedEntityReducer } from "./utils/createDeletedEntityReducer";

/**
 * Keep track of deleted users.
 */
export const deletedUsersReducer = createDeletedEntityReducer(
  isActionOf(deleteUser.success),
  action => action.payload.user.id
);
