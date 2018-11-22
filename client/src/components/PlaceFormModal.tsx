import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import { RequestError } from "../models/RequestError";
import { SavePlaceDto } from "../models/SavePlaceDto";
import { AdaptiveModal } from "./AdaptiveModal";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Input } from "./Input";
import { Message } from "./Message";

/**
 * Place Form Modal Props
 */
interface Props {
  /**
   * Auto focus on the first field
   */
  autoFocus?: boolean;

  /**
   * Modal Title
   */
  title: React.ReactNode;

  /**
   * Modal Subtitle
   */
  subtitle: React.ReactNode;

  /**
   * Submit button Label
   */
  submitLabel: React.ReactNode;

  /**
   * Form initial values
   */
  initialValues?: SavePlaceDto;

  /**
   * Whether request is in progress
   */
  loading?: boolean;

  /**
   * Form errors
   */
  error?: RequestError<SavePlaceDto>;

  /**
   * Callback invoked on successful form submission
   */
  onSubmit: (values: SavePlaceDto) => void;

  /**
   * Callback invoked on modal dismissal
   */
  onCancel: () => void;
}

/**
 * Place form validation schema
 */
const validationSchema = yup.object<SavePlaceDto>().shape({
  title: yup.string().required(),
  address: yup.string().required()
});

/**
 * Initial place form values
 */
const defaultValues = {
  title: "",
  address: ""
};

/**
 * Place Form Modal
 *
 * Displays a dialog for creating or editing a place.
 */
export const PlaceFormModal: React.SFC<Props> = ({
  autoFocus,
  loading,
  error,
  title,
  subtitle,
  submitLabel,
  onSubmit,
  onCancel,
  initialValues = defaultValues
}) => (
  <AdaptiveModal open={true} onClose={onCancel}>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      errors={error && error.details}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
        {error && <Message error={error} />}
        <Field
          component={Input}
          autoFocus={autoFocus}
          id="title"
          name="title"
          label="Restaurant Name"
        />
        <Field
          component={Input}
          type="address"
          id="address"
          name="address"
          label="Restaurant Address"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" color="primary" loading={loading}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Form>
  </AdaptiveModal>
);
