import React from "react";
import {
  fireEvent,
  renderWithProviders
} from "../../../test/test-utils";
import { deletePlace } from "../../actions/placeListActions";
import { PlaceContainer } from "../PlaceContainer";

describe("PlaceContainer", () => {
  it("renders place details", () => {
    const { getByText } = renderWithProviders(
      <PlaceContainer id="4" showRating={true} />,
      {
        state: {
          placeEntity: {
            "4": {
              id: "4",
              title: "Place Title Stub",
              address: "Place Address Stub",
              rating: 3.749999
            }
          }
        }
      }
    );

    expect(getByText("Place Title Stub")).toBeTruthy();
    expect(getByText("Place Address Stub")).toBeTruthy();
    expect(getByText("Rating: 3.75")).toBeTruthy();
  });

  it("opens edit dialog when Edit button is pressed", () => {
    const { getByLabelText, getByText } = renderWithProviders(
      <PlaceContainer id="4" showActions={true} />,
      {
        state: {
          placeEntity: {
            "4": {
              id: "4",
              title: "Place Title Stub",
              address: "Place Address Stub",
              rating: 3.749999,
              canEdit: true
            }
          }
        }
      }
    );

    fireEvent.click(getByLabelText("More Actions"));
    fireEvent.click(getByText("Edit"));

    expect(getByText("Edit Restaurant")).toBeTruthy();
  });

  it("opens delete dialog when Delete button is pressed", () => {
    const { getByLabelText, getByText } = renderWithProviders(
      <PlaceContainer id="4" showActions={true} />,
      {
        state: {
          placeEntity: {
            "4": {
              id: "4",
              title: "Place Title Stub",
              address: "Place Address Stub",
              rating: 3.749999,
              canDelete: true
            }
          }
        }
      }
    );

    fireEvent.click(getByLabelText("More Actions"));
    fireEvent.click(getByText("Delete"));

    expect(getByText("Delete restaurant?")).toBeTruthy();
  });

  it("dispatches delete action when deletion is confirmed", () => {
    const { store, getByLabelText, getByText } = renderWithProviders(
      <PlaceContainer id="4" showActions={true} />,
      {
        state: {
          placeEntity: {
            "4": {
              id: "4",
              title: "Place Title Stub",
              address: "Place Address Stub",
              rating: 3.749999,
              canDelete: true
            }
          }
        }
      }
    );

    fireEvent.click(getByLabelText("More Actions"));
    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Delete Restaurant"));

    expect(store.getActions()).toContainEqual(
      deletePlace.request({
        place: expect.objectContaining({ id: "4" })
      })
    );
  });
});
