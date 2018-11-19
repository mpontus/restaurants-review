import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { ModalProvider, ModalRoot } from "./components/ModalRoot";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ModalProvider>
    <App />
    <ModalRoot />
  </ModalProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
