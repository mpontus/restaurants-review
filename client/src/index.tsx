import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ApiGateway } from "./api/ApiGateway";
import { ModalProvider, ModalRoot } from "./components/ModalRoot";
import { config } from "./config";
import { configureStore } from "./configureStore";
import { RootScreen } from "./screens/RootScreen";
import * as serviceWorker from "./serviceWorker";
import { theme } from "./theme";

const api = new ApiGateway(
  axios.create({
    baseURL: `${process.env.REACT_APP_API_URL || ""}`
  })
);
const { store, persistor } = configureStore(undefined, { api, config });

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
          <ModalProvider>
            <ModalRoot />
            <CssBaseline />
            <RootScreen />
          </ModalProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
