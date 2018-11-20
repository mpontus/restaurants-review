import { Typography, withStyles, WithStyles } from "@material-ui/core";
import React from "react";

interface Props extends WithStyles<"root"> {
  children: React.ReactNode;
}

const enhance = withStyles<"root">(theme => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    "&::before": {
      content: "foo",
      display: "block"
    }
  }
}));

export const Reply = enhance(({ classes, children }: Props) => (
  <Typography className={classes.root}>{children}</Typography>
));
