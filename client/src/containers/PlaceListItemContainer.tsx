import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";
import React, { useCallback } from "react";
import { connect, Selector } from "react-redux";
import { Link } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import { createStructuredSelector } from "reselect";
import { deletePlace } from "../actions/placeListActions";
import { ConfirmModal } from "../components/ConfirmModal";
import { IconMenu } from "../components/IconMenu";
import { useModal } from "../components/ModalRoot";
import { Rating } from "../components/Rating";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { State } from "../reducers";
import * as routes from "../routes";
import {
  makeGetPlaceById,
  makeGetPlaceUpdateRequestStatus
} from "../selectors/placeSelectors";
import { PlaceFormModalContainer } from "./PlaceFormModalContainer";

/**
 * External Props
 */
interface OwnProps {
  /**
   * Place ID
   */
  id: string;

  /**
   * Show rating
   */
  showRating?: boolean;

  /**
   * Show actions
   */
  showActions?: boolean;
}

/**
 * Connected Props
 */
interface StateProps {
  /**
   * Place
   */
  place?: Place;

  /**
   * Update request status
   */
  requestStatus: RequestStatus<any>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Place delete callback
   */
  onDelete: (props: { place: Place }) => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selector
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    place: makeGetPlaceById(),
    requestStatus: makeGetPlaceUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  {
    onDelete: deletePlace.request
  }
);

/**
 * Place List Item Container
 *
 * Displays a single place inside a list.
 */
export const BasePlaceListItemContainer = ({
  id,
  showRating,
  showActions,
  place,
  requestStatus,
  onDelete
}: Props) => {
  if (place === undefined) {
    return null;
  }

  const handleDelete = useCallback(() => onDelete({ place }), [
    place,
    onDelete
  ]);

  const [showConfirmModal, hideConfirmModal] = useModal(() => (
    <ConfirmModal
      title="Delete place?"
      confirmLabel="Delete place"
      onConfirm={handleDelete}
      onCancel={hideConfirmModal}
    >
      Do you really want to delete {place.title}?
    </ConfirmModal>
  ));

  const [showEditModal, hideEditModal] = useModal(() => (
    <PlaceFormModalContainer id={place.id} onCancel={hideEditModal} />
  ));

  return (
    <ListItem
      button={true}
      key={place.id}
      component={({ innerRef, ...rest }) => (
        <Link
          to={formatRoute(routes.PLACE_DETAILS, { id: place.id })}
          {...rest}
        />
      )}
    >
      <ListItemText primary={place.title} secondary={place.address} />
      {showRating && <Rating value={place.rating} />}
      {showActions && (place.canEdit || place.canDelete) && (
        <ListItemSecondaryAction>
          <IconMenu icon={<MoreVertIcon />}>
            {place.canEdit && (
              <MenuItem onClick={showEditModal}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText inset={true} primary="Edit" />
              </MenuItem>
            )}
            {place.canDelete && (
              <MenuItem onClick={showConfirmModal}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText inset={true} primary="Delete" />
              </MenuItem>
            )}
          </IconMenu>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

/**
 * Export enhanced component
 */
export const PlaceListItemContainer = enhance(BasePlaceListItemContainer);
