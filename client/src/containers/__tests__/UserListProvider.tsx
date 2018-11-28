import React from "react";
import { flushEffects, renderWithProviders } from "../../../test/test-utils";
import { loadUsers } from "../../actions/userListActions";
import { UserListProvider } from "../UserListProvider";

describe("UserListProvider", () => {
  it("renders placeholder while items are loading", () => {
    const { getByText } = renderWithProviders(
      <UserListProvider
        loadingPlaceholder={<span>Placeholder</span>}
        currentPage={3}
      >
        {() => null}
      </UserListProvider>
    );

    expect(getByText("Placeholder")).toBeTruthy();
  });

  it("should dispatch load action on mount", () => {
    const { store } = renderWithProviders(
      <UserListProvider currentPage={3}>{() => null}</UserListProvider>
    );

    flushEffects();

    expect(store.getActions()).toContainEqual(loadUsers.request({ page: 3 }));
  });

  it("should provide listing details", () => {
    const mock = jest.fn(() => null);

    renderWithProviders(
      <UserListProvider currentPage={3}>{mock}</UserListProvider>,
      {
        state: {
          userList: {
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
