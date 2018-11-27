import {
  Button as MaterialButton,
  CircularProgress,
  InputAdornment
} from "@material-ui/core";
import * as React from "react";

/**
 * Component props
 */
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
  const { loading, ...rest } = props;

  if (loading) {
    return Button({
      ...rest,
      disabled: true,
      children: (
        <>
          {props.children}
          <InputAdornment position="end">
            <CircularProgress size={16} color="inherit" />
          </InputAdornment>
        </>
      )
    });
  }

  return <MaterialButton {...rest} />;
};
