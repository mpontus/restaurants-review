import { withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { Link, Route } from "react-router-dom";
import { Button } from "./Button";

/**
 * Component Props
 */
interface Props extends WithStyles<"active"> {
  /**
   * Match path exactly
   */
  exact?: boolean;

  /**
   * Target path
   */
  to: string;

  /**
   * Link label
   */
  children: React.ReactNode;
}

/**
 * Component enhancer
 */
const enhance = withStyles<"active">(theme => ({
  active: {
    opacity: 0.88
  }
}));

/**
 * Navbar Link Component
 *
 * Displays a route link in the navbar.
 */
export const NavbarLink = enhance(({ classes, to, exact, children }: Props) => (
  <Route path={to} exact={exact}>
    {({ match }) => (
      <Button
        disableRipple={true}
        color="inherit"
        component={({ innerRef, ...rest }) => <Link to={to} {...rest} />}
        className={classnames({ [classes.active]: !!match })}
      >
        {children}
      </Button>
    )}
  </Route>
));
