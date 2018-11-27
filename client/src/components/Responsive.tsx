import withWidth, { isWidthUp, WithWidth } from "@material-ui/core/withWidth";
import React from "react";

/**
 * Component props
 */
interface Props extends WithWidth {
  /**
   * Whether children should be hidden for mobile screens
   */
  hideOnMobile?: boolean;

  /**
   * Whether children should be hidden for desktop screen
   */
  hideOnDesktop?: boolean;

  /**
   * Component children
   */
  children: React.ReactNode;
}

/**
 * Inject client screen width into props
 */
const enhance = withWidth();

/**
 * Responsive Component
 *
 * Displays children conditionally based on client viewport.
 */
export const Responsive = enhance(
  ({ hideOnMobile = false, hideOnDesktop = false, width, children }: Props) => {
    if (hideOnMobile && !isWidthUp("sm", width)) {
      return null;
    }

    if (hideOnDesktop && isWidthUp("sm", width)) {
      return null;
    }

    return <React.Fragment>{children}</React.Fragment>;
  }
);
