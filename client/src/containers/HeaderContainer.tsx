import {
  AppBar,
  Button,
  Toolbar,
  Typography
} from "@material-ui/core";

export const HeaderContainer = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Restaurant Reviews
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);
