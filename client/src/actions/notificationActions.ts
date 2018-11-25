import { createStandardAction } from "typesafe-actions";

/**
 * Dismiss top notification
 */
export const dismissNotification = createStandardAction("DISMISS_NOTIFICATION")<
  void
>();
