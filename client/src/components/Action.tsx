import React from "react";
import { Button } from "./Button";

/**
 * Button that describes an action a user can take at any page.
 */
export const Action = (props: React.ComponentProps<typeof Button>) => (
  <Button variant="outlined" color="primary" {...props} />
);
