import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, ModalRoot } from "./components/ModalRoot";
import { RootScreen } from "./screens/RootScreen";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <ModalProvider>
      <ModalRoot />
      <CssBaseline />
      <RootScreen />
    </ModalProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
