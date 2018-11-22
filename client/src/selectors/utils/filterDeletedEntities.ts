import { Selector } from "react-redux";
import { createSelector } from "reselect";
import { Page } from "../../models/Page";

/**
 * Filters deleted entities from page
 */
export const filterDeletedEntities = <S, TOwnProps>(
  deletedSelector: Selector<S, Partial<Record<string, boolean>>, TOwnProps>,
  pageSelector: Selector<S, Page<string> | undefined, TOwnProps>
): Selector<S, Page<string> | undefined, TOwnProps> =>
  createSelector(
    deletedSelector,
    pageSelector,
    (deleted, page) => {
      if (page === undefined) {
        return undefined;
      }

      return Object.assign({}, page, {
        items: page.items.filter(id => !deleted[id])
      });
    }
  );
