import React from "react";
import { fireEvent, renderWithProviders } from "../../../test/test-utils";
import { dismissNotification } from "../../actions/notificationActions";
import { State } from "../../reducers";
import NotificationContainer from "../NotificationContainer";

describe("Notification Container", () => {
  const state: Partial<State> = {
    notifications: [
      {
        type: "success",
        message: "Notification message stub",
        duration: 5000
      }
    ]
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("shows notification message", () => {
    const { getByText } = renderWithProviders(<NotificationContainer />, {
      state
    });

    expect(getByText("Notification message stub"));
  });

  it("dispatches dismiss action when notification is clicked", () => {
    const { store, getByText } = renderWithProviders(
      <NotificationContainer />,
      { state }
    );

    fireEvent.click(getByText("Notification message stub"));

    expect(store.getActions()).toContainEqual(dismissNotification());
  });

  it("dispatches dismiss action automatically after set duration", () => {
    const { store } = renderWithProviders(<NotificationContainer />, { state });

    jest.advanceTimersByTime(5000);

    expect(store.getActions()).toContainEqual(dismissNotification());
  });
});
