import * as React from "react";
import { ModalProvider } from "react-modal-hook";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { render } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { rootReducer, State } from "../src/reducers";

/**
 * Default store
 */
const mockStore = configureStore<State>();

/**
 * Initial redux state
 */
const initialState = rootReducer(undefined, {} as any);

/**
 * Options that can be passed to renderWithProviders
 */
interface RenderWithProvidersOptions {
  state?: Partial<State>;
  store?: MockStoreEnhanced;
}

/**
 * Render component surrounded by normal provider context
 */
export const renderWithProviders = (
  ui: React.ReactNode,
  {
    state = {},
    store = mockStore({
      ...initialState,
      ...state
    })
  }: RenderWithProvidersOptions = {}
) => {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalProvider>{ui}</ModalProvider>
        </MemoryRouter>
      </Provider>
    )
  };
};

export * from "react-testing-library";
