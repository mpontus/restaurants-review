import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { DialogProps } from "@material-ui/core/Dialog";
import React from "react";
import { RequestError } from "../models/RequestError";
import { AdaptiveModal } from "./AdaptiveModal";
import { Button } from "./Button";

/**
 * Confirm Modal Props
 */
interface Props extends Pick<DialogProps, "open" | "onExited"> {
  /**
   * Dialog title
   */
  title: React.ReactNode;

  /**
   * Confirm button label
   */
  confirmLabel: React.ReactNode;

  /**
   * Whether the request is in progress
   */
  loading?: boolean;

  /**
   * Request error
   */
  error?: RequestError<any>;

  /**
   * Confirm callback
   */
  onConfirm: () => void;

  /**
   * Cancel callback
   */
  onCancel: () => void;
}

/**
 * Confirm Modal
 *
 * Displays yes or no question as a modal.
 */
export const ConfirmModal: React.SFC<Props> = ({
  open,
  title,
  confirmLabel,
  loading,
  error,
  onConfirm,
  onCancel,
  onExited,
  children
}) => (
  <AdaptiveModal
    open={open}
    onExited={onExited}
    fullScreen={false}
    onClose={onCancel}
    aria-labelledby="confirm-dialog-title"
  >
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{children}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button color="primary" onClick={onConfirm} loading={loading}>
        {confirmLabel}
      </Button>
    </DialogActions>
  </AdaptiveModal>
);
