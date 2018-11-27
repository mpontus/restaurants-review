import React, { useEffect } from "react";
import { connect, Selector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { loadPlace } from "../actions/placeDetailsActions";
import { deletePlace } from "../actions/placeListActions";
import { ConfirmModal } from "../components/ConfirmModal";
import { useModal } from "../hooks/useModal";
import { Place } from "../models/Place";
import { State } from "../reducers";
import { makeGetPlaceById } from "../selectors/placeSelectors";
import { CreateReviewModalContainer } from "./CreateReviewModalContainer";
import { PlaceFormModalContainer } from "./PlaceFormModalContainer";

/**
 * Render Props
 */
export interface RenderProps {
  /**
   * Place entity
   */
  place: Place;

  /**
   * Callback which opens review modal
   */
  onReview: () => void;

  /**
   * Callback which opens edit modal
   */
  onEdit: () => void;

  /**
   * Callback which opens delete modal
   */
  onDelete: () => void;
}

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
  placeholder?: React.ReactElement<any> | null;

  /**
   * Show actions
   */
  errorPlaceholder?: React.ReactElement<any> | null;

  /**
   * Render prop children
   */
  children: (props: RenderProps) => React.ReactElement<any> | null;
}

/**
 * Connected Props
 */
interface StateProps {
  /**
   * Place
   */
  place?: Place;
}

/**
 * Connected dispatch props
 */
interface DispatchProps {
  /**
   * Request a place to be loaded
   */
  onLoadPlace: (criteria: { id: string }) => void;

  /**
   * Request a place to be deleted
   */
  onDelete: (props: { place: Place; fromDetails: boolean }) => void;
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
    place: makeGetPlaceById()
  });

/**
 * Component enhancer
 */
const enhance = connect(
  makeMapStateToProps,
  {
    onLoadPlace: loadPlace.request,
    onDelete: deletePlace.request
  }
);

/**
 * Place Details Provider
 *
 * Provides place details using render props.
 */
export const BasePlaceDetailsProvider = ({
  id,
  place,
  onLoadPlace,
  onDelete,
  children,
  placeholder = null
}: Props) => {
  useEffect(() => {
    onLoadPlace({ id });
  }, []);

  if (place === undefined) {
    return placeholder;
  }

  const [showReviewModal, hideReviewModal] = useModal(() => (
    <CreateReviewModalContainer place={place} onCancel={hideReviewModal} />
  ));
  const [showEditModal, hideEditModal] = useModal(() => (
    <PlaceFormModalContainer id={place.id} onCancel={hideEditModal} />
  ));
  const [showDeleteModal, hideDeleteModal] = useModal(() => (
    <ConfirmModal
      title="Delete restaurant?"
      confirmLabel="Delete Restaurant"
      onConfirm={() => onDelete({ place, fromDetails: true })}
      onCancel={hideDeleteModal}
    >
      Do you really want to delete {place.title}?
    </ConfirmModal>
  ));

  return children({
    place,
    onReview: showReviewModal,
    onEdit: showEditModal,
    onDelete: showDeleteModal
  });
};

/**
 * Export enhanced component
 */
export const PlaceDetailsProvider = enhance(BasePlaceDetailsProvider);
