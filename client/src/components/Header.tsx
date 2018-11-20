import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React from "react";

interface Props extends WithStyles<"grow"> {}

const enhance = withStyles({
  grow: {
    flexGrow: 1
  }
});

export const Header = enhance(({ classes }: Props) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        Restaurant Reviews
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
));
