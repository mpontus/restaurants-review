import React from "react";
import { withStyles, WithStyles } from "@material-ui/core";

/**
 * Component Props
 */
interface Props extends WithStyles<"root"> {
  /**
   * Actions for current page
   */
  children: React.ReactNode;
}

/**
 * Custom styles
 */
const enhance = withStyles<"root">(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
}));

/**
 * Page Actions component
 *
 * Wrapper for buttons which describe possible page actions.
 */
export const PageActions = enhance(({ classes, children }: Props) => (
  <div className={classes.root}>{children}</div>
));
