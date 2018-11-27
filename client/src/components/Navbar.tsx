import {
  AppBar,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes";

/**
 * Custom classes
 */
type ClassKey = "title" | "links";

/**
 * Component props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Action displayed on the end side of the navbar
   */
  action: React.ReactNode;

  /**
   * Navbar links
   */
  children: React.ReactNode;
}

/**
 * Component enhancer
 */
const enhance = withStyles<ClassKey>(theme => ({
  title: {
    textDecoration: "none"
  },
  links: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    flexGrow: 1
  }
}));

/**
 * Navbar Component
 */
const BaseNavbar = ({ classes, action, children }: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={({ innerRef, ...rest }) => (
            <Link to={routes.HOME} {...rest} />
          )}
          variant="h6"
          color="inherit"
          className={classes.title}
        >
          Restaurant Reviews
        </Typography>
        <div className={classes.links}>{children}</div>
        {action}
      </Toolbar>
    </AppBar>
  );
};

/**
 * Export enhanced component
 */
export const Navbar = enhance(BaseNavbar);
