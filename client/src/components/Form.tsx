import { Form as FormikForm, Formik, FormikErrors } from "formik";
import * as React from "react";
import { Schema } from "yup";

/**
 * Outter props
 */
export interface FormProps<V> {
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
   * Yup schema for validation and normalizaiton
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
export class Form<T> extends React.Component<FormProps<T>> {
  /**
   * Reference to Formik component instance
   */
  private readonly formikRef: React.RefObject<Formik<T>> = React.createRef();

  /**
   * Normalize values according to validation schema
   */
  public handleSubmit = (values: T) => {
    const { validationSchema, onSubmit } = this.props;

    onSubmit(validationSchema ? validationSchema.cast(values) : values);
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
}
