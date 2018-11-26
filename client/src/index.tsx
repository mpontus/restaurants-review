import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core";
import axios from "axios";
import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ApiGateway } from "./api/ApiGateway";
import { ModalProvider, ModalRoot } from "./components/ModalRoot";
import { config } from "./config";
import { RootScreen } from "./screens/RootScreen";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./store";
import { theme } from "./theme";

const history = createBrowserHistory();
const api = new ApiGateway(
  axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || ""}`
  })
);
const { store, persistor } = configureStore(undefined, {
  config,
  api,
  history
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <ModalProvider>
            <ModalRoot />
            <CssBaseline />
            <RootScreen />
          </ModalProvider>
        </MuiThemeProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
