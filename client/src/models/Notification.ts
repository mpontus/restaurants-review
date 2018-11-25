/**
 * Notificaiton Model
 *
 * Contains a message to be displayed to the user.
 */
export interface Notification {
  /**
   * Notification type
   */
  type: "info" | "success" | "error";

  /**
   * Notification message
   */
  message: string;

  /**
   * Notification duration in milliseconds
   */
  duration: number;
}
