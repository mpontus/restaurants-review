import { TextField } from "@material-ui/core";
import * as React from "react";

/**
 * Textarea Props
 */
interface Props {
  id: string;
  label: string;
  name: string;
  value: any;
  error?: string | null;
  onBlur: (e: any) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
}

/**
 * Textarea Component
 */
export const Textarea: React.SFC<Props> = ({
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
      label={label}
      id={id}
      name={name}
      value={value}
      error={error !== null}
      helperText={error}
      onChange={onChange}
    />
  );
};
