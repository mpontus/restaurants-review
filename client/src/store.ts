import { History } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { persistStore } from "redux-persist";
import { Action } from "./actions";
import { ApiGateway } from "./api/ApiGateway";
import { config } from "./config";
import { rootEpic } from "./epics";
import { rootReducer, State } from "./reducers";

/**
 * Redux middleware dependencies
 */
export interface Dependencies {
  /**
   * App configuration
   */
  config: typeof config;

  /**
   * API gateway
   */
  api: ApiGateway;

  /**
   * Browser History
   */
  history: History;
}

/**
 * Use redux devtools if available, otherwise redux compose
 */
const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/**
 * Create redux store
 */
export const configureStore = (
  preloadedState: State | undefined,
  dependencies: Dependencies
) => {
  const epicMiddleware = createEpicMiddleware<
    Action,
    Action,
    State,
    Dependencies
  >({
    dependencies
  });
  const middlewareEnhancer = applyMiddleware(epicMiddleware, logger);
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(middlewareEnhancer)
  );
  const persistor = persistStore(store);

  epicMiddleware.run(rootEpic);

  return { store, persistor };
};
