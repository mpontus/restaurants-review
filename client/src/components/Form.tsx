import { diff } from "deep-object-diff";
import { Form as FormikForm, Formik, FormikErrors } from "formik";
import * as React from "react";
import { Schema } from "yup";

/**
 * Outer props
 */
export interface FormProps<V> {
  /**
   * Omit unchanged values from submission
   */
  onlyChanged?: boolean;

  /**
   * Initial values
   */
  initialValues: V;

  /**
   * External errors object
   */
  errors?: FormikErrors<V>;

  /**
   * Submit handler
   */
  onSubmit: (values: V) => void;

  /**
   * Yup schema for validation and normalization
   */
  validationSchema?: Schema<V>;

  /**
   * Form fields connected through context
   */
  children?: React.ReactNode;
}

/**
 * FormikForm component
 *
 * Extends Formik with ability to set external errors and normalize
 * values before passing them to onSubmit callback.
 */
export class Form<T extends object> extends React.Component<FormProps<T>> {
  /**
   * Reference to Formik component instance
   */
  private readonly formikRef: React.RefObject<Formik<T>> = React.createRef();

  /**
   * Normalize values according to validation schema.
   *
   * Only submits the changed values.
   */
  public handleSubmit = (values: T) => {
    this.props.onSubmit(this.normalizeValues(values));
  };

  /**
   * Pass external errors to Formik instance
   */
  public componentDidUpdate(prevProps: FormProps<T>) {
    if (this.formikRef.current && prevProps.errors !== this.props.errors) {
      this.formikRef.current.setErrors(this.props.errors || {});
    }
  }

  /**
   * Render
   */
  public render() {
    return (
      <Formik<T>
        initialValues={this.props.initialValues}
        validationSchema={this.props.validationSchema}
        onSubmit={this.handleSubmit}
        ref={this.formikRef}
      >
        <FormikForm>{this.props.children}</FormikForm>
      </Formik>
    );
  }

  /**
   * Normalize values according to validationSchema and leaving out
   * default values.
   */
  private normalizeValues(values: T) {
    const { validationSchema, initialValues, onlyChanged } = this.props;

    const normalize = (val: T) =>
      validationSchema ? validationSchema.cast(val) : val;

    const removeUnchanged = (val: T) =>
      onlyChanged ? (diff(initialValues, val) as T) : val;

    return removeUnchanged(normalize(values));
  }
}
