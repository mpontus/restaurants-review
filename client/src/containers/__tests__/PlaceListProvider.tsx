import React from "react";
import { flushEffects, renderWithProviders } from "../../../test/test-utils";
import { loadPlaces } from "../../actions/placeListActions";
import { PlaceListProvider } from "../PlaceListProvider";

describe("PlaceListProvider", () => {
  it("renders placeholder while items are loading", () => {
    const { getByText } = renderWithProviders(
      <PlaceListProvider
        loadingPlaceholder={<span>Placeholder</span>}
        ratingFilter={2}
        currentPage={3}
      >
        {() => null}
      </PlaceListProvider>
    );

    expect(getByText("Placeholder")).toBeTruthy();
  });

  describe("when own places are requested", () => {
    it("dispatches load action on mount", () => {
      const { store } = renderWithProviders(
        <PlaceListProvider ratingFilter={2} currentPage={3}>
          {() => null}
        </PlaceListProvider>
      );

      flushEffects();

      expect(store.getActions()).toContainEqual(
        loadPlaces.request({
          rating: 2,
          page: 3
        })
      );
    });

    it("provides details about requested page", () => {
      const mock = jest.fn(() => null);

      renderWithProviders(
        <PlaceListProvider own={true} currentPage={4}>
          {mock}
        </PlaceListProvider>,
        {
          state: {
            ownPlaceList: {
              4: {
                offset: 90,
                total: 100,
                nextPageExists: true,
                prevPageExists: false,
                items: ["6", "7", "9"]
              }
            }
          }
        }
      );

      expect(mock.mock.calls[0][0].ids).toEqual(["6", "7", "9"]);
      expect(mock.mock.calls[0][0].hasPrevPage).toBe(false);
      expect(mock.mock.calls[0][0].hasNextPage).toBe(true);
    });
  });

  describe("when places filtered by rating are requested", () => {
    it("provides places filtered by rating", () => {
      const mock = jest.fn(() => null);

      renderWithProviders(
        <PlaceListProvider ratingFilter={2} currentPage={3}>
          {mock}
        </PlaceListProvider>,
        {
          state: {
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
          }
        }
      );

      expect(mock.mock.calls[0][0].ids).toEqual(["1", "2", "3"]);
    });

    it("dispatches load action on mount", () => {
      const { store } = renderWithProviders(
        <PlaceListProvider own={true} currentPage={3}>
          {() => null}
        </PlaceListProvider>
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
