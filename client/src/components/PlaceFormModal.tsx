import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel
} from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import { SavePlaceDto } from "../models/SavePlaceDto";
import { Field } from "./Field";
import { Form } from "./Form";
import { Input } from "./Input";
import { Switch } from "./Switch";

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
   * Form errors
   */
  errors?: { [key in keyof SavePlaceDto]?: string };

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
  autoFocus = false,
  title,
  subtitle,
  submitLabel,
  initialValues = defaultValues,
  errors = {},
  onSubmit,
  onCancel
}) => (
  <Dialog open={true} fullScreen={true} onClose={onCancel}>
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      errors={errors}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
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
        <Button type="submit" color="primary">
          {submitLabel}
        </Button>
      </DialogActions>
    </Form>
    >
  </Dialog>
);
