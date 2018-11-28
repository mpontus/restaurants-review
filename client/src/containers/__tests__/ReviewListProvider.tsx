import React from "react";
import { flushEffects, renderWithProviders } from "../../../test/test-utils";
import { loadReviews } from "../../actions/reviewListActions";
import { ReviewListProvider } from "../ReviewListProvider";

describe("ReviewListProvider", () => {
  it("renders placeholder while items are loading", () => {
    const { getByText } = renderWithProviders(
      <ReviewListProvider
        pending={true}
        currentPage={3}
        loadingPlaceholder={<span>Placeholder</span>}
      >
        {() => null}
      </ReviewListProvider>
    );

    expect(getByText("Placeholder")).toBeTruthy();
  });

  describe("when pending reviews are requested", () => {
    it("should dispatch load action on mount", () => {
      const { store } = renderWithProviders(
        <ReviewListProvider pending={true} currentPage={3}>
          {() => null}
        </ReviewListProvider>
      );

      flushEffects();

      expect(store.getActions()).toContainEqual(
        loadReviews.request({
          page: 3,
          pending: true
        })
      );
    });

    it("should provide listing details", () => {
      const mock = jest.fn(() => null);

      renderWithProviders(
        <ReviewListProvider pending={true} currentPage={3}>
          {mock}
        </ReviewListProvider>,
        {
          state: {
            pendingReviewList: {
              "3": {
                items: ["3", "5", "8"],
                nextPageExists: false,
                prevPageExists: true,
                total: 90,
                offset: 80
              }
            }
          }
        }
      );

      expect(mock).toHaveBeenCalledWith({
        ids: ["3", "5", "8"],
        hasNextPage: false,
        hasPrevPage: true
      });
    });
  });

  describe("when palce reviews are requested", () => {
    const place = {
      id: "3",
      title: "Place Name Stub",
      address: "Place Address Stub",
      rating: 2.2
    };

    it("should dispatch load action on mount", () => {
      const { store } = renderWithProviders(
        <ReviewListProvider place={place} currentPage={8}>
          {() => null}
        </ReviewListProvider>
      );

      flushEffects();

      expect(store.getActions()).toContainEqual(
        loadReviews.request({
          page: 8,
          place
        })
      );
    });

    it("should provide listing details", () => {
      const mock = jest.fn(() => null);

      renderWithProviders(
        <ReviewListProvider place={place} currentPage={8}>
          {mock}
        </ReviewListProvider>,
        {
          state: {
            reviewList: {
              "3": {
                "8": {
                  items: ["2", "7", "9"],
                  nextPageExists: false,
                  prevPageExists: true,
                  total: 90,
                  offset: 80
                }
              }
            }
          }
        }
      );

      expect(mock).toHaveBeenCalledWith({
        ids: ["2", "7", "9"],
        hasNextPage: false,
        hasPrevPage: true
      });
    });
  });
});
