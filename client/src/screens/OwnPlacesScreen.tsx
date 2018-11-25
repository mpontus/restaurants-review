import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Button } from "../components/Button";
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
      <Typography gutterBottom={true} variant="h5">
        Restaurant Management
      </Typography>
      <Typography gutterBottom={true} variant="subtitle1" color="textSecondary">
        This page lists your own restaurants. You can create new resturants from
        this page.
      </Typography>
      <Button variant="outlined" color="primary" onClick={showCreateModal}>
        Create Restaurant
      </Button>
      <PlaceListContainer
        own={true}
        currentPage={currentPage}
        onPrev={() => setPage(page => page - 1)}
        onNext={() => setPage(page => page + 1)}
        renderItem={id => (
          <PlaceListItemContainer key={id} showActions={true} id={id} />
        )}
      />
    </React.Fragment>
  );
};
