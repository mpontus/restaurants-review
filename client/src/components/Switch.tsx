import { FormControlLabel, Switch as MaterialSwitch } from "@material-ui/core";
import React from "react";

/**
 * Component Props
 */
interface Props extends React.HTMLProps<HTMLInputElement> {
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
 * Switch Component
 *
 * Adds label to Material-UI's switch to be compatible with Field
 * interface.
 */
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
