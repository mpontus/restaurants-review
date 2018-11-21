import { Reducer } from "redux";
import { Action } from "../../actions";

/**
 * Namespace reducer creator
 *
 * Applies specified reducer to the value under the key returned by
 * the action selector.
 */
export const createNamespaceReducer = <A extends Action, K extends string, V>(
  actionPredicate: (value: Action) => value is A,
  namespaceSelector: (action: A) => K,
  reducer: Reducer<V, A>
): Reducer<{ [P in K]?: V }, any> => (state = {}, action) => {
  if (actionPredicate(action)) {
    const key = namespaceSelector(action);

    return Object.assign({}, state, {
      [key]: reducer(state[key], action)
    });
  }

  return state;
};
