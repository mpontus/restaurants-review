import { Typography } from "@material-ui/core";
import React from "react";

/**
 * Secondary page description.
 */
export const Subheading: React.SFC = ({ children }) => (
  <Typography gutterBottom={true} variant="subtitle1" color="textSecondary">
    {children}
  </Typography>
);
