import { Button, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

/**
 * Floating Action Button Props
 */
interface Props extends WithStyles<"button"> {
  /**
   * Icon
   */
  icon: React.ReactNode;

  /**
   * Click event handler
   */
  onClick: (e: React.MouseEvent) => void;
}

/**
 * Component Enhancer
 *
 * Adds absolute positioning to FAB
 */
const enhance = withStyles<"button">(theme => ({
  button: {
    position: "fixed",
    right: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 9
  }
}));

/**
 * Floating Action Button Component
 *
 * Displays floating action button with specified icon.
 */
export const FloatingActionButton = enhance(
  ({ classes, icon, ...rest }: Props) => {
    return (
      <Button
        {...rest}
        variant="fab"
        color="secondary"
        className={classes.button}
      >
        {icon}
      </Button>
    );
  }
);
