import { State } from "../reducers";

/**
 * Place selection criteria
 */
interface Props {
  id: string;
}

/**
 * Return single place by id
 */
export const makeGetPlaceById = () => (state: State, ownProps: Props) =>
  state.placeEntity[ownProps.id];
