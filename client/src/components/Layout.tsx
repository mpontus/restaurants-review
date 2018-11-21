import { Grid, Paper, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import React from "react";

type ClassKey = "mobile";

interface Props extends WithStyles<ClassKey> {
  children: React.ReactNode;
}

const enhance = withStyles<ClassKey>(theme => ({
  // Account for mobile navigation
  mobile: {
    paddingBottom: theme.spacing.unit * 6
  }
}));

export const Layout = enhance(({ classes, children }: Props) => (
  <div className={classnames(classes.mobile)}>
    <Grid container={true} justify="center">
      <Grid item={true} xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  </div>
));
