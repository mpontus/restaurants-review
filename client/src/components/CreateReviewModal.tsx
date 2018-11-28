import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel
} from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import { CreateReviewDto } from "../models/CreateReviewDto";
import { RequestError } from "../models/RequestError";
import { AdaptiveModal } from "./AdaptiveModal";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { RatingInput } from "./RatingInput";
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
  initialValues?: CreateReviewDto;

  /**
   * Whether request is in progress
   */
  loading?: boolean;

  /**
   * Form errors
   */
  error?: RequestError<CreateReviewDto>;

  /**
   * Callback invoked on successful form submission
   */
  onSubmit: (values: CreateReviewDto) => void;

  /**
   * Callback invoked on modal dismissal
   */
  onCancel: () => void;
}

/**
 * Review form validation schema
 */
const validationSchema = yup.object<CreateReviewDto>().shape({
  rating: yup
    .number()
    .min(1)
    .max(5)
    .required(),
  comment: yup
    .string()
    .required()
    .trim()
});

/**
 * Initial review form values
 */
const defaultValues = {
  rating: 0,
  comment: ""
};

/**
 * Create Review Modal
 *
 * Displays a dialog for creating new review
 */
export const CreateReviewModal: React.SFC<Props> = ({
  autoFocus,
  loading,
  onSubmit,
  onCancel,
  initialValues = defaultValues,
  error
}) => {
  return (
    <AdaptiveModal open={true} onClose={onCancel}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        errors={error && error.details}
      >
        <DialogTitle id="form-dialog-title">Submit New Review</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Rating</FormLabel>
            <Field
              component={RatingInput}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" color="primary" loading={loading}>
            Submit Review
          </Button>
        </DialogActions>
      </Form>
    </AdaptiveModal>
  );
};
