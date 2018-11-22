import {
  Button as MaterialButton,
  CircularProgress,
  InputAdornment
} from "@material-ui/core";
import * as React from "react";
import { Route } from "react-router";

interface Props extends React.ComponentProps<typeof MaterialButton> {
  /**
   * Specifies that request is in progress and the button should be disabled
   */
  loading?: boolean;
}

/**
 * Generic button
 *
 * Extends Material-UI's button with loading state.
 */
export const Button: React.SFC<Props> = props => {
  if (props.loading) {
    return Button({
      ...props,
      loading: false,
      disabled: true,
      children: (
        <>
          {props.children}{" "}
          <InputAdornment position="end">
            <CircularProgress size={16} color="inherit" />
          </InputAdornment>
        </>
      )
    });
  }

  return <MaterialButton {...props} />;
};
