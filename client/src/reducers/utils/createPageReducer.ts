import { Action, Reducer } from "redux";
import { Page } from "../../models/Page";

/**
 * Create page reducer
 *
 * Extracts ids from the page returned by the selector, and returns
 * the page with items replaced by ids.
 */
export const createPageReducer = <A extends Action, T extends { id: any }>(
  pageSelector: (action: A) => Page<T>
): Reducer<Page<T["id"]>, A> => (_, action) => {
  const page = pageSelector(action);

  return {
    ...page,
    items: page.items.map(item => item.id)
  };
};
