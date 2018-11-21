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
import { useModal } from "./ModalRoot";
import { AuthModal } from "./AuthModal";

interface Props extends WithStyles<"title"> {}

const enhance = withStyles({
  title: {
    textDecoration: "none",
    flexGrow: 1
  }
});

export const Header = enhance(({ classes }: Props) => {
  const [showLoginModal, hideLoginModal] = useModal(() => (
    <AuthModal
      onLogin={console.log}
      onSignup={console.log}
      onCancel={hideLoginModal}
    />
  ));

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
        <Button color="inherit" onClick={showLoginModal}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
});
