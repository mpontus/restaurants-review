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

    it("provides own places", () => {
      renderWithProviders(
        <PlaceListProvider own={true} currentPage={4}>
          {({ ids }) => {
            expect(ids).toEqual(["6", "7", "9"]);

            return null;
          }}
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

      expect.assertions(1);
    });
  });

  describe("when places filtered by rating are requested", () => {
    it("provides places filtered by rating", () => {
      renderWithProviders(
        <PlaceListProvider ratingFilter={2} currentPage={3}>
          {({ ids }) => {
            expect(ids).toEqual(["1", "2", "3"]);

            return null;
          }}
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

      expect.assertions(1);
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
