import { FormControlLabel, Switch as MaterialSwitch } from "@material-ui/core";
import React from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

export const Switch: React.SFC<Props> = ({
  label,
  value,
  onChange,
  onFocus,
  onBlur
}) => (
  <FormControlLabel
    control={
      <MaterialSwitch
        color="primary"
        checked={!!value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    }
    label={label}
  />
);
