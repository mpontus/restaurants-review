import { Grid, Paper, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import React from "react";

type ClassKey = "content" | "fill" | "mobile";

interface Props extends WithStyles<ClassKey> {
  header: React.ReactNode;
  children: React.ReactNode;
}

const enhance = withStyles<ClassKey>(theme => ({
  fill: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  },
  mobile: {
    // Account for mobile navigation
    paddingBottom: theme.spacing.unit * 6
  },
  content: {
    background: theme.palette.background.paper
  }
}));

export const Layout = enhance(({ classes, header, children }: Props) => (
  <div className={classnames(classes.content, classes.fill, classes.mobile)}>
    {header}
    <Grid container={true} justify="center">
      <Grid item={true} xs={12} md={6}>
        {children}
      </Grid>
    </Grid>
  </div>
));
