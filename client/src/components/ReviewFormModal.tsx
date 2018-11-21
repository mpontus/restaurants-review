import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel
} from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import { UpdateReviewDto } from "../models/UpdateReviewDto";
import { AdaptiveModal } from "./AdaptiveModal";
import { Field } from "./Field";
import { Form } from "./Form";
import { Rating } from "./Rating";
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
   * Form initial values
   */
  initialValues?: UpdateReviewDto;

  /**
   * Form errors
   */
  errors?: { [key in keyof UpdateReviewDto]?: string };

  /**
   * Callback invoked on successful form submission
   */
  onSubmit: (values: UpdateReviewDto) => void;

  /**
   * Callback invoked on modal dismissal
   */
  onCancel: () => void;
}

/**
 * Review form validation schema
 */
const validationSchema = yup.object<UpdateReviewDto>().shape({
  rating: yup
    .number()
    .min(1)
    .max(5)
    .required(),
  comment: yup.string().required(),
  reply: yup.string()
});

/**
 * Initial review form values
 */
const defaultValues = {
  rating: 0,
  comment: "",
  reply: ""
};

/**
 * Review Form Modal
 *
 * Displays a dialog for creating or editing a review.
 */
export const ReviewFormModal: React.SFC<Props> = ({
  autoFocus,
  errors,
  onSubmit,
  onCancel,
  initialValues = defaultValues
}) => {
  return (
    <AdaptiveModal open={true} onClose={onCancel}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        errors={errors}
      >
        <DialogTitle id="form-dialog-title">Update Review</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Rating</FormLabel>
            <Field
              component={Rating}
              id="rating"
              label="Rating"
              name="rating"
            />
          </FormControl>

          <Field
            component={Textarea}
            autoFocus={autoFocus}
            id="comment"
            name="comment"
            label="Comment"
          />
          <Field component={Textarea} id="reply" name="reply" label="Reply" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" color="primary">
            Save Review
          </Button>
        </DialogActions>
      </Form>
    </AdaptiveModal>
  );
};
