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
import { CreateReviewDto } from "../models/CreateReviewDto";
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
  initialValues?: CreateReviewDto;

  /**
   * Form errors
   */
  errors?: { [key in keyof CreateReviewDto]?: string };

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
  comment: yup.string().required()
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
  onSubmit,
  onCancel,
  initialValues = defaultValues,
  errors = {}
}) => {
  return (
    <AdaptiveModal open={true} onClose={onCancel}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        errors={errors}
      >
        <DialogTitle id="form-dialog-title">Submit New Review</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" color="primary">
            Submit Review
          </Button>
        </DialogActions>
      </Form>
    </AdaptiveModal>
  );
};
