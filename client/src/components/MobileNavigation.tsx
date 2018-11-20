import {
  BottomNavigation,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Location } from "history";
import React, { useCallback } from "react";
import {
  matchPath,
  RouteComponentProps,
  withRouter
} from "react-router";

export interface LinkProps {
  to: string;
}

/**
 * Helper function to match a child pointing to current location
 */
export const matchChild = (location: Location<any>) => (
  child: React.ReactElement<LinkProps>
): boolean => Boolean(matchPath(location.pathname, { path: child.props.to }));

/**
 * Mobile Navigation Props
 */
interface Props extends RouteComponentProps<any>, WithStyles<"stickToBottom"> {
  /**
   * Array of mobile navigation links
   */
  children: Array<React.ReactElement<LinkProps>>;
}

/**
 * Mobile Navigation Component
 *
 * Repsonsible for providing navigation controls on mobile devices.
 *
 * Accepts a number of MobileNavigationLink as children.
 */
export const BaseMobileNavigation = ({
  classes,
  history,
  location,
  children
}: Props) => {
  const value = children.findIndex(matchChild(location));
  const handleChange = useCallback(
    (event: object, index: number) => history.push(children[index].props.to),
    [children]
  );

  return (
    <BottomNavigation
      showLabels={true}
      value={value}
      onChange={handleChange}
      className={classes.stickToBottom}
    >
      {children}
    </BottomNavigation>
  );
};

/**
 * Enhance component with router context and custom styles
 */
export const MobileNavigation = withStyles({
  stickToBottom: {
    position: "fixed",
    bottom: 0,
    width: "100%"
  }
})(withRouter(BaseMobileNavigation));
