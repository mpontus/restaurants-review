import { Grid, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import React from "react";

type ClassKey = "container" | "mobile";

interface Props extends WithStyles<ClassKey> {
  children: React.ReactNode;
}

const enhance = withStyles<ClassKey>(theme => ({
  container: {
    padding: theme.spacing.unit * 2,
    maxWidth: 880
  },
  // Account for mobile navigation
  mobile: {
    paddingBottom: theme.spacing.unit * 6
  }
}));

export const Layout = enhance(({ classes, children }: Props) => (
  <div className={classnames(classes.container, classes.mobile)}>
    <Grid container={true}>
      <Grid item={true} xs={12}>
        {children}
      </Grid>
    </Grid>
  </div>
));
