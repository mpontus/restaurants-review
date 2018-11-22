import { Reducer } from "redux";
import { isActionOf } from "typesafe-actions";
import { Action } from "../actions";
import { loadUsers } from "../actions/userListActions";
import { Page } from "../models/Page";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createPageReducer } from "./utils/createPageReducer";

/**
 * State contains pages of user ids
 */
type State = Partial<{
  [page: string]: Page<string>;
}>;

/**
 * User List Reducer
 *
 * Reducer for frontpage user pagination.
 */
export const userListReducer: Reducer<State, Action> = createNamespaceReducer(
  isActionOf(loadUsers.success),
  action => `${action.payload.criteria.page || 0}`,
  createPageReducer(action => action.payload.page)
);
