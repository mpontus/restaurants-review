import { isActionOf } from "typesafe-actions";
import { deleteUser, updateUser } from "../actions/userListActions";
import { RequestError } from "../models/RequestError";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createRequestStatusReducer } from "./utils/createRequestStatusReducer";
import { eitherPredicate } from "./utils/eitherPredicate";

/**
 * Manages request state for user updates.
 */
export const userUpdateRequestReducer = createNamespaceReducer(
  eitherPredicate(
    isActionOf(updateUser.request),
    isActionOf(updateUser.success),
    isActionOf(updateUser.failure),
    isActionOf(deleteUser.request),
    isActionOf(deleteUser.success),
    isActionOf(deleteUser.failure)
  ),
  action => action.payload.user.id,
  createRequestStatusReducer(
    eitherPredicate(
      isActionOf(updateUser.request),
      isActionOf(deleteUser.request)
    ),
    eitherPredicate(
      isActionOf(updateUser.success),
      isActionOf(deleteUser.success)
    ),
    eitherPredicate(
      isActionOf(updateUser.failure),
      isActionOf(deleteUser.failure)
    ),
    action => action.payload.error as RequestError<any>
  )
);
