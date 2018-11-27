import { TextField } from "@material-ui/core";
import * as React from "react";

/**
 * Input Props
 */
interface Props {
  /**
   * Whether component should receive focus when rendered
   */
  autoFocus: boolean;

  /**
   * Input type
   */
  type: string;

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
 * Input Component
 *
 * Extends Material-UI's TextField with useful defaults.
 */
export const Input: React.SFC<Props> = ({
  autoFocus,
  id,
  type,
  label,
  name,
  value,
  onChange,
  onBlur,
  error = null
}: Props) => (
  <TextField
    type={type}
    fullWidth={true}
    margin="normal"
    autoFocus={autoFocus}
    id={id}
    label={label}
    name={name}
    value={value}
    error={error !== null}
    helperText={error}
    onChange={onChange}
    onBlur={onBlur}
  />
);
