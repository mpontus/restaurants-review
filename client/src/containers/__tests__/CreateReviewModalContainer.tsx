import React from "react";
import { fireEvent, renderWithProviders, wait } from "../../../test/test-utils";
import { createReview } from "../../actions/reviewListActions";
import { CreateReviewModalContainer } from "../CreateReviewModalContainer";

const noop = () => undefined;

describe("CreateReviewContainer", () => {
  const place = {
    id: "3",
    title: "Place Name Stub",
    address: "Place Address Stub",
    rating: 2.2
  };

  it("self-closes when cancel button is pressed", () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithProviders(
      <CreateReviewModalContainer place={place} onCancel={onCancel} />
    );

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("self-closes when request succeeds", () => {
    const onCancel = jest.fn();
    const { getByText } = renderWithProviders(
      <CreateReviewModalContainer place={place} onCancel={onCancel} />
    );

    fireEvent.click(getByText("Cancel"));

    expect(onCancel).toHaveBeenCalled();
  });

  it("dispatches create event when form is submitted", async () => {
    const { store, getByLabelText } = renderWithProviders(
      <CreateReviewModalContainer place={place} onCancel={noop} />
    );

    fireEvent.change(getByLabelText("Comment"), {
      target: { value: "Comment Stub" }
    });

    fireEvent.click(getByLabelText("5 stars"));

    fireEvent.submit(getByLabelText("Submit New Review"));

    await wait(() => {
      expect(store.getActions()).toContainEqual(
        createReview.request({
          place,
          data: {
            rating: 5,
            comment: "Comment Stub"
          }
        })
      );
    });
  });
});
