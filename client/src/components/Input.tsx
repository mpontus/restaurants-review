import { TextField } from "@material-ui/core";
import * as React from "react";

/**
 * Input Props
 */
interface Props {
  autoFocus: boolean;
  id: string;
  label: string;
  type: string;
  name: string;
  value: any;
  error?: string | null;
  onBlur: (e: any) => void;
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
