import { State } from "../reducers";

/**
 * Review selection criteria
 */
interface Props {
  id: string;
}

/**
 * Return single review by id
 */
export const makeGetReviewById = () => (state: State, ownProps: Props) =>
  state.reviewEntity[ownProps.id];
