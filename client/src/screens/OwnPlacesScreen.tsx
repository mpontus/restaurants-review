import { Add as AddIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { useModal } from "../components/ModalRoot";
import { PlaceFormModalContainer } from "../containers/PlaceFormModalContainer";
import { PlaceListContainer } from "../containers/PlaceListContainer";
import { PlaceListItemContainer } from "../containers/PlaceListItemContainer";

/**
 * Own Places Screen
 *
 * Displays a list of user's own restaurants.
 */
export const OwnPlacesScreen = () => {
  const [currentPage, setPage] = useState(0);
  const [showCreateModal, hideCreateModal] = useModal(() => (
    <PlaceFormModalContainer onCancel={hideCreateModal} />
  ));

  return (
    <React.Fragment>
      <PlaceListContainer
        own={true}
        currentPage={currentPage}
        onPrev={() => setPage(page => page - 1)}
        onNext={() => setPage(page => page + 1)}
        renderItem={id => (
          <PlaceListItemContainer key={id} showActions={true} id={id} />
        )}
      />

      <FloatingActionButton
        icon={<AddIcon />}
        aria-label="Add Restaurant"
        onClick={showCreateModal}
      />
    </React.Fragment>
  );
};
