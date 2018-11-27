import { Grid, withStyles, WithStyles } from "@material-ui/core";
import React from "react";

/**
 * Component Props
 */
interface Props extends WithStyles<"root"> {
  /**
   * Page content
   */
  children: React.ReactNode;
}

/**
 * Apply custom styles
 */
const enhance = withStyles<"root">(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    maxWidth: 880,

    // Apply padding for mobile navigation
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing.unit * 6
    }
  }
}));

/**
 * Single Column Layout Component
 *
 * Defines page layout for single column.
 */
export const SingleColumnLayout = enhance(({ classes, children }: Props) => (
  <div className={classes.root}>
    <Grid container={true}>
      <Grid item={true} xs={12}>
        {children}
      </Grid>
    </Grid>
  </div>
));
