import { Action, Reducer } from "redux";

/**
 * State shape
 */
type State = { [id in string]?: boolean };

/**
 * Create reducer to maintain a state of deleted entities
 */
export const createDeletedEntityReducer = <A extends Action>(
  actionPredicate: (value: Action) => value is A,
  idSelector: (action: A) => string
): Reducer<State, A> => (state = {}, action) =>
  actionPredicate(action) ? { ...state, [idSelector(action)]: true } : {};
