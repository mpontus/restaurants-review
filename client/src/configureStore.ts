import { History } from "history";
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { persistStore } from "redux-persist";
import { Action } from "./actions";
import { ApiGateway } from "./api/ApiGateway";
import { config } from "./config";
import { rootEpic } from "./epics";
import { defaultReducers, State } from "./reducers";
import { BehaviorSubject } from "rxjs";
import { mergeMap } from "rxjs/operators";

export const epicSubject = new BehaviorSubject(rootEpic);

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

// Redux DevTools integration
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
    combineReducers(defaultReducers),
    preloadedState,
    composeEnhancers(middlewareEnhancer)
  );
  const persistor = persistStore(store);

  epicMiddleware.run((...args) =>
    epicSubject.pipe(mergeMap(epic => epic(...args)))
  );

  return { store, persistor };
};
