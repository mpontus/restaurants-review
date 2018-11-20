import { TextField } from "@material-ui/core";
import * as React from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error?: string | null;
}

// We need to fool material-ui into thinking that we can handle
// textarea change event event though they will not be encountered by
// this component.
type GenericChangeHandler = React.ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

/**
 * Input Component
 *
 * Extends Material-UI's TextField with some defaults and provides
 * Field-compatible interface.
 */
export const Input: React.SFC<Props> = ({
  label,
  defaultValue,
  error = null,
  onChange,
  ...rest
}: Props) => {
  return (
    <TextField
      fullWidth={true}
      margin="normal"
      label={label}
      defaultValue={Array.isArray(defaultValue) ? undefined : defaultValue}
      error={error !== null}
      helperText={error}
      inputProps={rest}
      onChange={onChange as GenericChangeHandler}
    />
  );
};
