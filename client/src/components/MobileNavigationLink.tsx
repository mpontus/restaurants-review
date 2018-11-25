import { BottomNavigationAction } from "@material-ui/core";
import React from "react";

/**
 * Mobile Navigation Link Props
 */
export interface MobileNavigationLinkProps
  extends React.ComponentProps<typeof BottomNavigationAction> {
  /**
   * Match path exactly
   */
  exact?: boolean;

  /**
   * Target path
   */
  to: string;
}

/**
 * Mobile Navigation Link
 *
 * To be used inside MobileNavigation.
 */
export const MobileNavigationLink = ({
  to,
  exact,
  ...rest
}: MobileNavigationLinkProps) => <BottomNavigationAction {...rest} />;
