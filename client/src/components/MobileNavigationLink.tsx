import { BottomNavigationAction } from "@material-ui/core";
import React from "react";

/**
 * Mobile Navigation Link Props
 */
interface Props extends React.ComponentProps<typeof BottomNavigationAction> {
  /**
   * Link href
   */
  to: string;
}

/**
 * Mobile Navigation Link
 *
 * To be used inside MobileNavigation.
 */
export const MobileNavigationLink = ({ to: _to, ...rest }: Props) => (
  <BottomNavigationAction {...rest} />
);
