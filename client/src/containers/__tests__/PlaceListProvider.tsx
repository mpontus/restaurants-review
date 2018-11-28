import React from "react";
import { Provider } from "react-redux";
import { flushEffects, render } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import configureStore from "redux-mock-store";
import { loadPlaces } from "../../actions/placeListActions";
import { rootReducer, State } from "../../reducers";
import { PlaceListProvider } from "../PlaceListProvider";

const mockStore = configureStore<State>();
const initialState = rootReducer(undefined, {} as any);

describe("PlaceListProvider", () => {
  it("renders placeholder while items are loading", () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <PlaceListProvider
          loadingPlaceholder={<span>Placeholder</span>}
          ratingFilter={2}
          currentPage={3}
        >
          {() => null}
        </PlaceListProvider>
      </Provider>
    );

    expect(getByText("Placeholder")).toBeTruthy();
  });

  describe("when own places are requested", () => {
    it("dispatches load action on mount", () => {
      const store = mockStore(initialState);

      const { getByText } = render(
        <Provider store={store}>
          <PlaceListProvider ratingFilter={2} currentPage={3}>
            {() => null}
          </PlaceListProvider>
        </Provider>
      );

      flushEffects();

      expect(store.getActions()).toContainEqual(
        loadPlaces.request({
          rating: 2,
          page: 3
        })
      );
    });

    it("provides own places", () => {
      const store = mockStore({
        ...initialState,
        ownPlaceList: {
          4: {
            offset: 90,
            total: 100,
            nextPageExists: true,
            prevPageExists: false,
            items: ["6", "7", "9"]
          }
        }
      });

      const { getByText } = render(
        <Provider store={store}>
          <PlaceListProvider own={true} currentPage={4}>
            {({ ids }) => {
              expect(ids).toEqual(["6", "7", "9"]);

              return null;
            }}
          </PlaceListProvider>
        </Provider>
      );

      expect.assertions(1);
    });
  });

  describe("when places filtered by rating are requested", () => {
    it("provides places filtered by rating", () => {
      const store = mockStore({
        ...initialState,
        placeList: {
          2: {
            3: {
              offset: 90,
              total: 100,
              nextPageExists: true,
              prevPageExists: false,
              items: ["1", "2", "3"]
            }
          }
        }
      });

      const { getByText } = render(
        <Provider store={store}>
          <PlaceListProvider ratingFilter={2} currentPage={3}>
            {({ ids }) => {
              expect(ids).toEqual(["1", "2", "3"]);

              return null;
            }}
          </PlaceListProvider>
        </Provider>
      );

      expect.assertions(1);
    });

    it("dispatches load action on mount", () => {
      const store = mockStore(initialState);

      const { getByText } = render(
        <Provider store={store}>
          <PlaceListProvider own={true} currentPage={3}>
            {() => null}
          </PlaceListProvider>
        </Provider>
      );

      flushEffects();

      expect(store.getActions()).toContainEqual(
        loadPlaces.request({
          own: true,
          page: 3
        })
      );
    });
  });
});
