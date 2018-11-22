import React, { useCallback, useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { createPlace, updatePlace } from "../actions/placeListActions";
import { PlaceFormModal } from "../components/PlaceFormModal";
import { useSubsequent } from "../hooks/useSubsequentValue";
import { Place } from "../models/Place";
import { RequestStatus } from "../models/RequestStatus";
import { SavePlaceDto } from "../models/SavePlaceDto";
import { State } from "../reducers";
import {
  makeGetPlaceById,
  makeGetPlaceUpdateRequestStatus
} from "../selectors/placeSelectors";

/**
 * External Props
 */
interface OwnProps {
  /**
   * Place id
   */
  id?: string;

  /**
   * Modal close callback
   */
  onCancel: () => void;
}

/**
 * Connected props
 */
interface StateProps {
  /**
   * Resolved place entity
   */
  place?: Place;

  /**
   * Request status for place creation or update
   */
  requestStatus: RequestStatus<SavePlaceDto>;
}

/**
 * Connected actions
 */
interface DispatchProps {
  /**
   * Place creation callback
   */
  onCreate: (data: SavePlaceDto) => void;

  /**
   * Place update callback
   */
  onUpdate: (params: { place: Place; data: SavePlaceDto }) => void;
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps, DispatchProps {}

/**
 * State selectors
 */
const makeMapStateToProps = (): Selector<State, StateProps, OwnProps> =>
  createStructuredSelector({
    place: makeGetPlaceById(),
    requestStatus: makeGetPlaceUpdateRequestStatus()
  });

/**
 * Component enhancer
 */
const enhance = connect<StateProps, DispatchProps, OwnProps, State>(
  makeMapStateToProps,
  {
    onCreate: createPlace.request,
    onUpdate: updatePlace.request
  }
);

/**
 * Place Form Modal Container
 *
 * Displays modal window for place creation and modification.
 */
const BasePlaceFormModalContainer = ({
  place,
  requestStatus: currentRequestStatus,
  onUpdate,
  onCreate,
  onCancel
}: Props) => {
  const requestStatus = useSubsequent(currentRequestStatus, {
    loading: false,
    success: false
  });
  const handleUpdate = useCallback(
    place ? (data: SavePlaceDto) => onUpdate({ place, data }) : () => undefined,
    [place, onUpdate]
  );

  useEffect(
    () => {
      if (requestStatus.success) {
        onCancel();
      }
    },
    [requestStatus.success]
  );

  const initialValues = place
    ? {
        title: place.title,
        address: place.address
      }
    : undefined;

  return (
    <PlaceFormModal
      autoFocus={place === undefined}
      title={place ? "Edit Restaurant" : "Add Restaurant"}
      subtitle={
        place ? (
          <>Change {place.title} details.</>
        ) : (
          <>Enter new restaurant details.</>
        )
      }
      submitLabel="Save Restaurant"
      initialValues={initialValues}
      loading={requestStatus.loading}
      error={requestStatus.error}
      onSubmit={place ? handleUpdate : onCreate}
      onCancel={onCancel}
    />
  );
};

/**
 * Export enhanced component
 */
export const PlaceFormModalContainer = enhance(BasePlaceFormModalContainer);
