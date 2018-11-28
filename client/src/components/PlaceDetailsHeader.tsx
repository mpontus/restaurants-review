import { withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import { RatingStatic } from "./RatingStatic";

/**
 * Custom class names
 */
type ClassKey = "root" | "content";

/**
 * Component Props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Place rating to display next to the header
   */
  rating?: number;

  /**
   * Header contents
   */
  children?: React.ReactNode;
}

/**
 * Component enhancer
 */
const enhance = withStyles<ClassKey>(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end"
  },
  content: {
    flex: 1
  }
}));

/**
 * Place Details Header Component
 *
 * Displays page header with rating to the side.
 */
export const PlaceDetailsHeader = enhance(
  ({ classes, rating, children }: Props) => (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      {typeof rating === "number" ? (
        <RatingStatic value={rating} caption={`Rating: ${rating.toFixed(2)}`} />
      ) : null}
    </div>
  )
);
