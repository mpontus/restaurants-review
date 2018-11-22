import React from "react";
import { DialogContentText } from "@material-ui/core";

/**
 * Component props
 */
interface Props {
  /**
   * Message type
   */
  type?: "default" | "error";

  /**
   * Shortcut for displaying error message
   */
  error?: Error;

  /**
   * Message content
   */
  children?: React.ReactNode;
}

/**
 * Message Component
 *
 * Component for displaying a message in modal context.
 */
export const Message: React.SFC<Props> = ({
  error,
  children,
  type = "default"
}) => {
  if (error !== undefined) {
    // Shortcut for displaying error message
    return Message({ type: "error", children: error.message });
  }

  return (
    <DialogContentText color={type === "error" ? "error" : "inherit"}>
      {children}
    </DialogContentText>
  );
};
