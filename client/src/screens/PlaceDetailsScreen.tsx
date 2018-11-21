import React from "react";
import { RouteComponentProps } from "react-router";
import { PlaceDetailsContainer } from "../containers/PlaceDetailsContainer";

/**
 * Component props
 *
 * Expects parameters to be injected by Route compnent.
 */
interface Props extends RouteComponentProps<{ id: string }> {}

/**
 * Place Detials Screen
 *
 * Displays detailed information about a place
 */
export const PlaceDetailsScreen = ({ match }: Props) => (
  <PlaceDetailsContainer id={match.params.id} />
);
