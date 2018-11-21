import { FormControlLabel, Switch as MaterialSwitch } from "@material-ui/core";
import React from "react";

/**
 * Switch Component Props
 */
interface Props extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  value: any;
  error?: string | null;
  onBlur: (e: any) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
}

export const Switch: React.SFC<Props> = ({
  id,
  label,
  name,
  value,
  onChange,
  onBlur
}) => (
  <FormControlLabel
    control={
      <MaterialSwitch
        id={id}
        name={name}
        color="primary"
        checked={!!value}
        onChange={onChange}
        onBlur={onBlur}
      />
    }
    label={label}
  />
);
