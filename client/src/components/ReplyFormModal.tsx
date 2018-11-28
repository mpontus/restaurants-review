import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@material-ui/core";
import { DialogProps } from "@material-ui/core/Dialog";
import React from "react";
import * as yup from "yup";
import { ReplyDto } from "../models/ReplyDto";
import { RequestError } from "../models/RequestError";
import { AdaptiveModal } from "./AdaptiveModal";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Textarea } from "./Textarea";

/**
 * Review Form Modal Props
 */
interface Props extends Omit<DialogProps, "onSubmit"> {
  /**
   * Auto focus on the first field
   */
  autoFocus?: boolean;

  /**
   * Modal Subtitle
   */
  subtitle: React.ReactNode;

  /**
   * Form initial values
   */
  initialValues?: ReplyDto;

  /**
   * Whether request is in progress
   */
  loading?: boolean;

  /**
   * Form errors
   */
  error?: RequestError<ReplyDto>;

  /**
   * Callback invoked on successful form submission
   */
  onSubmit: (values: ReplyDto) => void;

  /**
   * Callback invoked on modal dismissal
   */
  onCancel: () => void;
}

/**
 * Review form validation schema
 */
const validationSchema = yup.object<ReplyDto>().shape({
  comment: yup
    .string()
    .required()
    .trim()
});

/**
 * Initial review form values
 */
const defaultValues = {
  comment: ""
};

/**
 * Reply Form Modal
 *
 * Displays a dialog for replying to a review
 */

export const ReplyFormModal: React.SFC<Props> = ({
  open,
  autoFocus = false,
  subtitle,
  initialValues = defaultValues,
  loading,
  error,
  onSubmit,
  onCancel,
  onExited
}) => (
  <AdaptiveModal open={open} onClose={onCancel} onExited={onExited}>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      errors={error && error.details}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle disableTypography={true}>
        <Typography variant="h6" id="form-dialog-title">
          Reply to a review
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
        <Field
          autoFocus={autoFocus}
          component={Textarea}
          id="comment"
          name="comment"
          label="Enter your reply"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" color="primary" loading={loading}>
          Reply to review
        </Button>
      </DialogActions>
    </Form>
  </AdaptiveModal>
);
