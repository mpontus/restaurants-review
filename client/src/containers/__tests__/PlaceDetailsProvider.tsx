import React from "react";
import {
  flushEffects,
  renderWithProviders,
  fireEvent
} from "../../../test/test-utils";
import { loadPlaces, deletePlace } from "../../actions/placeListActions";
import { PlaceDetailsProvider } from "../PlaceDetailsProvider";
import { loadPlace } from "../../actions/placeDetailsActions";
import { State } from "../../reducers";

describe("PlaceDetailsProvider", () => {
  it("displays placeholder while the place is loading", () => {
    const { getByText } = renderWithProviders(
      <PlaceDetailsProvider id="10" placeholder={<span>Placeholder</span>}>
        {() => null}
      </PlaceDetailsProvider>
    );

    expect(getByText("Placeholder")).toBeTruthy();
  });

  it("dispatches loading action", () => {
    const { store } = renderWithProviders(
      <PlaceDetailsProvider id="10" placeholder={<span>Placeholder</span>}>
        {() => null}
      </PlaceDetailsProvider>
    );

    flushEffects();

    expect(store.getActions()).toContainEqual(loadPlace.request({ id: "10" }));
  });

  describe("when place is loaded", () => {
    const state: Partial<State> = {
      placeEntity: {
        "10": {
          id: "10",
          title: "Place Name Stub",
          address: "Place Name Address",
          rating: 4.4,
          bestReview: "96",
          worstReview: "34"
        }
      },
      reviewEntity: {
        "96": {
          id: "96",
          author: {
            name: "First review author"
          },
          comment: "First review comment",
          rating: 5,
          dateVisited: "1986-03-12"
        },
        "34": {
          id: "34",
          author: {
            name: "Second review author"
          },
          comment: "Second review comment",
          rating: 3,
          dateVisited: "2012-05-22"
        }
      }
    };

    it("provides place details", () => {
      const mock = jest.fn(() => null);

      renderWithProviders(
        <PlaceDetailsProvider id="10" placeholder={<span>Placeholder</span>}>
          {mock}
        </PlaceDetailsProvider>,
        { state }
      );

      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({
          place: {
            id: "10",
            title: "Place Name Stub",
            address: "Place Name Address",
            rating: 4.4,
            bestReview: {
              id: "96",
              author: {
                name: "First review author"
              },
              comment: "First review comment",
              rating: 5,
              dateVisited: "1986-03-12"
            },
            worstReview: {
              id: "34",
              author: {
                name: "Second review author"
              },
              comment: "Second review comment",
              rating: 3,
              dateVisited: "2012-05-22"
            }
          }
        })
      );

      expect.assertions(1);
    });

    it("opens review dialog when onReview callback is called", () => {
      const mock = jest.fn(() => null);
      const { getByText } = renderWithProviders(
        <PlaceDetailsProvider id="10" placeholder={<span>Placeholder</span>}>
          {mock}
        </PlaceDetailsProvider>,
        { state }
      );

      mock.mock.calls[0][0].onReview();

      flushEffects();

      expect(getByText("Submit New Review")).toBeTruthy();
    });

    it("opens edit dialog when onEdit callback is called", () => {
      const mock = jest.fn(() => null);
      const { getByText } = renderWithProviders(
        <PlaceDetailsProvider id="10" placeholder={<span>Placeholder</span>}>
          {mock}
        </PlaceDetailsProvider>,
        { state }
      );

      mock.mock.calls[0][0].onEdit();

      flushEffects();

      expect(getByText("Edit Restaurant")).toBeTruthy();
    });

    it("opens deletion dialog when onDelete callback is called", () => {
      const mock = jest.fn(() => null);
      const { getByText } = renderWithProviders(
        <PlaceDetailsProvider id="10" placeholder={<span>Placeholder</span>}>
          {mock}
        </PlaceDetailsProvider>,
        { state }
      );

      mock.mock.calls[0][0].onDelete();

      flushEffects();

      expect(getByText("Delete restaurant?")).toBeTruthy();
    });

    it("dispatches delete action when deletion is confirmed", () => {
      const mock = jest.fn(() => null);
      const { store, getByText } = renderWithProviders(
        <PlaceDetailsProvider id="10" placeholder={<span>Placeholder</span>}>
          {mock}
        </PlaceDetailsProvider>,
        { state }
      );

      mock.mock.calls[0][0].onDelete();

      flushEffects();

      fireEvent.click(getByText("Delete Restaurant"));

      expect(store.getActions()).toContainEqual(
        deletePlace.request({
          fromDetails: true,
          place: expect.objectContaining({
            id: "10"
          })
        })
      );
    });
  });
});
