import { createSelector } from "reselect";
import { State } from "../reducers";

/**
 * Return top notification
 */
export const makeGetNotification = () =>
  createSelector(
    (state: State) => state.notifications,
    ([notification]) => notification || undefined
  );
