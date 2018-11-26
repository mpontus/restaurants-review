import React from "react";
import Loadable from "react-loadable";
import { UserListScreen } from "../screens/UserListScreen";
import { Inject } from "../components/InjectionProvider";

/**
 * Loader for UserListScreen
 */
export const UserListScreenLoader = Loadable({
  loader: () =>
    Promise.all([
      import("../screens/UserListScreen"),
      import("../epics/userListEpic"),
      import("../reducers/userCreateRequestReducer"),
      import("../reducers/userEntityReducer"),
      import("../reducers/userListReducer"),
      import("../reducers/userListRequestReducer"),
      import("../reducers/userUpdateRequestReducer"),
      import("../reducers/deletedUsersReducer")
    ]),
  render: (
    [
      { UserListScreen },
      { userListEpic },
      { userCreateRequestReducer },
      { userEntityReducer },
      { userListReducer },
      { userListRequestReducer },
      { userUpdateRequestReducer },
      { deletedUsersReducer }
    ],
    props
  ) => (
    <Inject
      epics={[userListEpic]}
      reducers={{
        userCreateRequest: userCreateRequestReducer,
        userEntity: userEntityReducer,
        userList: userListReducer,
        userListRequest: userListRequestReducer,
        userUpdateRequest: userUpdateRequestReducer,
        deletedUsers: deletedUsersReducer
      }}
    >
      <UserListScreen {...props} />
    </Inject>
  ),

  loading: () => null
});
