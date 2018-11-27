import { Fade, withStyles, WithStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import classnames from "classnames";
import React from "react";

/**
 * Component Props
 */
interface Props {
  /**
   * Whether to show page header placeholder
   */
  header?: boolean;
}

/**
 * Custom class names
 */
type ClassKey =
  | "container"
  | "listItem"
  | "row"
  | "text"
  | "small"
  | "medium"
  | "large";

/**
 * Custom styling
 */
const enhance = withStyles<ClassKey>(theme => ({
  // Container for each placeholder
  container: {
    // Prevent margin collapse
    display: "flex",
    flexDirection: "column",

    // Provide spacing between items
    marginTop: 16,
    marginBottom: 16
  },

  // Container for list item
  listItem: {
    // Add extra contrast
    background: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16
  },

  // Space out text placeholders
  row: {
    display: "flex",
    justifyContent: "space-between",
    height: 16,
    marginTop: 8,
    marginBottom: 8
  },

  // Base text placeholder
  text: {
    backgroundColor: grey[300],
    height: 16,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8
  },

  // Various text lengths
  small: { width: 80 },
  medium: { width: 120 },
  large: { width: 140 }
}));

/**
 * Page header placeholder
 */
const HeaderPlaceholder = enhance(({ classes }: WithStyles<ClassKey>) => (
  <div className={classes.container}>
    <div className={classes.row}>
      <div className={classnames(classes.text, classes.large)} />
    </div>
    <div />
    <div className={classes.row}>
      <div className={classnames(classes.text, classes.medium)} />
    </div>
    <div className={classes.row} />
  </div>
));

/**
 * List Item Placeholder
 */
const ListItemPlaceholder = enhance(({ classes }: WithStyles<ClassKey>) => (
  <div className={classnames(classes.container, classes.listItem)}>
    <div className={classes.row}>
      <div className={classnames(classes.text, classes.large)} />
      <div className={classnames(classes.text, classes.medium)} />
    </div>
    <div className={classes.row}>
      <div className={classnames(classes.text, classes.medium)} />
      <div className={classnames(classes.text, classes.small)} />
    </div>
  </div>
));

/**
 * Loading Component
 *
 * Displays placeholders while the page is loading.
 */
export const Loading = ({ header }: Props) => (
  <Fade in={true} timeout={1000}>
    <div>
      {header && <HeaderPlaceholder />}
      <ListItemPlaceholder />
      <ListItemPlaceholder />
      <ListItemPlaceholder />
    </div>
  </Fade>
);
