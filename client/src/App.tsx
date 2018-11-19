import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import React from "react";
import { Input } from "./components/Input";
import { useModal } from "./components/ModalRoot";

export const App = () => {
  const [showLogin, hideLogin] = useModal(() => (
    <Dialog open={true}>
      <form>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Input id="login-email" name="email" label="Email" />
          <Input
            id="login-password"
            name="password"
            type="password"
            label="Password"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={hideLogin}>
            Cancel
          </Button>
          <Button variant="raised" type="submit" color="primary">
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  ));

  return (
    <header>
      <a onClick={showLogin}>Login</a>
    </header>
  );
};
