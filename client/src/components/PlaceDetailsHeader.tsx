import { withStyles, WithStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import React from "react";

/**
 * Styling class names
 */
type ClassKey = "root" | "title" | "rating" | "actions";

/**
 * Component Props
 */
interface Props extends WithStyles<ClassKey> {
  title: React.ReactNode;
  address: React.ReactNode;
  rating: React.ReactNode;
  actions: React.ReactNode;
}

/**
 * Component styles
 */
const enhance = withStyles<ClassKey>(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    // flexWrap: "wrap",
    // justifyContent: "center"
  },
  title: {
    // flexGrow: 1
  },
  rating: {
    // minWidth: theme.spacing.unit * 16
  },
  actions: {
    // dispay: "flex",
    // alignItems: "center",
    // flexGrow: 1,
    // textAlign: "right"
  }
}));

export const PlaceDetailsHeader = enhance(
  ({ classes, title, address, rating, actions }: Props) => (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h3" align="center">
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {address}
        </Typography>
      </div>
      <div className={classes.rating}>{rating}</div>
      <div className={classes.actions}>{actions}</div>
    </div>
  )
);
