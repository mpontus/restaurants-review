import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes";

/**
 * Component props
 */
interface Props extends WithStyles<"title"> {
  /**
   * Show login action
   */
  canLogin?: boolean;

  /**
   * Show logout action
   */
  canLogout?: boolean;

  /**
   * Login callback
   */
  onLogin?: () => void;

  /**
   * Logout callback
   */
  onLogout?: () => void;
}

/**
 * Component enhancer
 */
const enhance = withStyles({
  title: {
    textDecoration: "none",
    flexGrow: 1
  }
});

/**
 * Header Component
 */
const BaseHeader = ({
  classes,
  onLogin,
  onLogout,
  canLogin = false,
  canLogout = false
}: Props) => {
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
        {canLogin && (
          <Button color="inherit" onClick={onLogin}>
            Login
          </Button>
        )}
        {canLogout && (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

/**
 * Export enhanced component
 */
export const Header = enhance(BaseHeader);
