import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { Action } from "../actions";
import { deleteUser, loadUsers, updateUser } from "../actions/userListActions";
import { User } from "../models/User";

type State = { [id in string]?: User };

/**
 * Stores user entities by their ids
 */
export const userEntityReducer: Reducer<State, Action> = (
  state = {},
  action
) => {
  switch (action.type) {
    case getType(loadUsers.success):
      return action.payload.page.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item
        }),
        state
      );

    case getType(updateUser.success):
      return {
        ...state,
        [action.payload.user.id]: action.payload.user
      };

    case getType(deleteUser.success):
      return {
        ...state,
        [action.payload.user.id]: undefined
      };

    default:
      return state;
  }
};
