import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import withWidth, { isWidthUp, WithWidth } from "@material-ui/core/withWidth";
import React from "react";

/**
 * Adaptive Modal Props
 */
interface Props extends WithWidth, DialogProps {
  /**
   * Force full screen on and off
   */
  fullScreen?: boolean;
}

/**
 * Component enhancer
 *
 * Injects screen width as a prop
 */
const enhance = withWidth();

/**
 * Adaptive Modal Component
 *
 * Opens Material-UI dialog component in full screen on mobile
 * devices, unless specified otherwise.
 */
export const AdaptiveModal = enhance(
  ({ width, fullScreen = !isWidthUp("sm", width), ...rest }: Props) => (
    <Dialog fullWidth={true} maxWidth="sm" fullScreen={fullScreen} {...rest} />
  )
);
