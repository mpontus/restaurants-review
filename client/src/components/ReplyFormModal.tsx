import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import { ReplyDto } from "../models/ReplyDto";
import { Field } from "./Field";
import { Form } from "./Form";
import { Textarea } from "./Textarea";

/**
 * Review Form Modal Props
 */
interface Props {
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
   * Form errors
   */
  errors?: { [key in keyof ReplyDto]?: string };

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
  comment: yup.string().required()
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

export const ReplyModal: React.SFC<Props> = ({
  autoFocus = false,
  subtitle,
  initialValues = defaultValues,
  errors = {},
  onSubmit,
  onCancel
}) => {
  return (
    <Dialog open={true} fullScreen={true} onClose={onCancel}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        errors={errors}
      >
        <DialogTitle id="form-dialog-title">Reply to a review</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
          <Field
            autoFocus={autoFocus}
            component={Textarea}
            id="comment"
            name="comment"
            label="Your Reply"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" color="primary">
            Reply to a review
          </Button>
        </DialogActions>
      </Form>
      >
    </Dialog>
  );
};
