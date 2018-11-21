import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { connect, Selector } from "react-redux";
import { Link } from "react-router-dom";
import { formatRoute } from "react-router-named-routes";
import { createStructuredSelector } from "reselect";
import { Rating } from "../components/Rating";
import { Place } from "../models/Place";
import { State } from "../reducers";
import * as routes from "../routes";
import { makeGetPlaceById } from "../selectors/placeSelectors";

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
}

/**
 * Combined props
 */
interface Props extends OwnProps, StateProps {}

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
const enhance = connect(makeMapStateToProps);

/**
 * Place List Item Container
 *
 * Displays a single place inside a list.
 */
export const BasePlaceListItemContainer = ({ place }: Props) => {
  if (place === undefined) {
    return null;
  }

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
      <Rating value={place.rating} />
    </ListItem>
  );
};

/**
 * Export enhanced component
 */
export const PlaceListItemContainer = enhance(BasePlaceListItemContainer);
