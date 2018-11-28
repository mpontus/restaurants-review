import React from "react";
import {
  fireEvent,
  flushEffects,
  renderWithProviders
} from "../../../test/test-utils";
import { deleteReview } from "../../actions/reviewListActions";
import { ReviewContainer } from "../ReviewContainer";

describe("ReviewContainer", () => {
  const state = {
    reviewEntity: {
      "4": {
        id: "4",
        author: {
          name: "Review Author"
        },
        comment: "Review Comment Stub",
        rating: 3,
        dateVisited: "2012-05-22",
        canReply: true,
        canEdit: true,
        canDelete: true
      }
    }
  };

  it("renders review details", () => {
    const { getByText } = renderWithProviders(<ReviewContainer id="4" />, {
      state
    });

    expect(getByText("Review Comment Stub")).toBeTruthy();
    expect(getByText("Rating: 3")).toBeTruthy();
    expect(getByText("22/05/2012")).toBeTruthy();
  });

  it("opens reply dialog when Reply button is pressed", () => {
    const { getByText } = renderWithProviders(<ReviewContainer id="4" />, {
      state
    });

    fireEvent.click(getByText("Reply"));

    flushEffects();

    expect(getByText("Reply to a review")).toBeTruthy(); //
  });

  it("opens edit dialog when Edit button is pressed", () => {
    const { getByText } = renderWithProviders(<ReviewContainer id="4" />, {
      state
    });

    fireEvent.click(getByText("Edit"));

    flushEffects();

    expect(getByText("Edit Review")).toBeTruthy();
  });

  it("opens delete dialog when Delete button is pressed", () => {
    const { getByText } = renderWithProviders(<ReviewContainer id="4" />, {
      state
    });

    fireEvent.click(getByText("Delete"));

    flushEffects();

    expect(getByText("Delete review?")).toBeTruthy();
  });

  it("dispatches delete action when deletion is confirmed", () => {
    const { store, getByText } = renderWithProviders(
      <ReviewContainer id="4" />,
      { state }
    );

    fireEvent.click(getByText("Delete"));

    flushEffects();

    fireEvent.click(getByText("Delete Review"));

    expect(store.getActions()).toContainEqual(
      deleteReview.request({
        review: expect.objectContaining({ id: "4" })
      })
    );
  });
});
