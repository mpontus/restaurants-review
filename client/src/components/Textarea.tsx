import { TextField } from "@material-ui/core";
import * as React from "react";

/**
 * Textarea Props
 */
interface Props {
  /**
   * Whether component should receive focus when rendered
   */
  autoFocus: boolean;

  /**
   * DOM node id
   */
  id: string;

  /**
   * Field label
   */
  label: string;

  /**
   * Field name
   */
  name: string;

  /**
   * Field value
   */
  value: any;

  /**
   * Field error
   */
  error?: string | null;

  /**
   * Blur callback
   */
  onBlur: (e: any) => void;

  /**
   * Change callback
   */
  onChange: (e: React.ChangeEvent<any>) => void;
}

/**
 * Textarea Component
 *
 * Extends Material-UI's TextField with useful defaults.
 */
export const Textarea: React.SFC<Props> = ({
  autoFocus,
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error = null
}: Props) => {
  return (
    <TextField
      multiline={true}
      fullWidth={true}
      rowsMax="4"
      margin="normal"
      autoFocus={autoFocus}
      label={label}
      id={id}
      name={name}
      value={value}
      error={error !== null}
      helperText={error}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
