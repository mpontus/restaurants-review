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

interface Props extends WithStyles<"title"> {}

const enhance = withStyles({
  title: {
    textDecoration: "none",
    flexGrow: 1
  }
});

export const Header = enhance(({ classes }: Props) => (
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
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
));
