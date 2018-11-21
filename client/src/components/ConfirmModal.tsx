import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";
import { AdaptiveModal } from "./AdaptiveModal";

/**
 * Confirm Modal Props
 */
interface Props {
  /**
   * Dialog title
   */
  title: React.ReactNode;

  /**
   * Confirm button label
   */
  confirmLabel: React.ReactNode;

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
  title,
  confirmLabel,
  onConfirm,
  onCancel,
  children
}) => (
  <AdaptiveModal
    open={true}
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
      <Button color="primary" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </DialogActions>
  </AdaptiveModal>
);
