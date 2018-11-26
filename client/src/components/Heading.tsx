import { Typography } from "@material-ui/core";
import React from "react";

/**
 * Primary page heading
 */
export const Heading: React.SFC = ({ children }) => (
  <Typography gutterBottom={true} variant="h5">
    {children}
  </Typography>
);
