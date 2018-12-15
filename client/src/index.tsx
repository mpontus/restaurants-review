import { I18nProvider } from "@lingui/react";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core";
import axios from "axios";
import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "react-modal-hook";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { PersistGate } from "redux-persist/integration/react";
import { ApiGateway } from "./api/ApiGateway";
import { config } from "./config";
import catalogEn from "./locales/en/messages";
import catalogRu from "./locales/ru/messages";
import { RootScreen } from "./screens/RootScreen";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "./store";
import { theme } from "./theme";

/**
 * Create History instance to be injected in redux middleware
 */
const history = createBrowserHistory();

/**
 * Create instance of the API client to be injected in redux middleware
 */
const api = new ApiGateway(
  axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || ""}`
  })
);

/**
 * Create Redux Store
 */
const { store, persistor } = configureStore(undefined, {
  config,
  api,
  history
});

const catalogs = { en: catalogEn, ru: catalogRu };

/**
 * Render the application
 */
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <I18nProvider language="en" catalogs={catalogs}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ModalProvider container={TransitionGroup}>
              <RootScreen />
            </ModalProvider>
          </MuiThemeProvider>
        </I18nProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
