import { FastField as FormikField, FieldAttributes, FieldProps } from "formik";
import * as React from "react";

/**
 * Field Component
 *
 * Simliar to formik's Field component, except this one passes field
 * props directly to the supplied component.
 */
export class Field<T> extends React.Component<FieldAttributes<any>> {
  /**
   * Extract field props before passing them onto the child component
   */
  public renderField = (props: FieldProps) => {
    const Component = this.props.component;
    const { field, form, ...rest } = props;

    return (
      <Component
        {...field}
        {...rest}
        error={form.touched[field.name] ? form.errors[field.name] : undefined}
      />
    );
  };

  /**
   * Render the field
   */
  public render() {
    const { component, ...rest } = this.props;

    return <FormikField {...rest} component={this.renderField} />;
  }
}
