import { withStyles, WithStyles } from "@material-ui/core";
import { grey, indigo, red } from "@material-ui/core/colors";
import classnames from "classnames";
import React from "react";

/**
 * Custom class names
 */
type ClassKey = "badge" | "owner" | "admin";

/**
 * Component props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Determines badge color
   */
  variant?: "default" | "owner" | "admin";

  /**
   * Text content of the badge
   */
  children: React.ReactNode;
}

/**
 * Component enhancer
 */
const enhance = withStyles<ClassKey>(theme => ({
  badge: {
    ...theme.typography.caption,
    textTransform: "lowercase",
    verticalAlign: "middle",
    padding: `2px 4px`,
    marginLeft: 6,
    borderRadius: 4,
    backgroundColor: grey[300]
  },
  owner: {
    color: theme.palette.getContrastText(indigo[700]),
    backgroundColor: indigo[700]
  },
  admin: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700]
  }
}));

/**
 * User Badge component
 *
 * Displays user role next to their name.
 */
export const UserBadge = enhance(
  ({ classes, variant = "default", children }: Props) => (
    <span
      className={classnames(classes.badge, {
        [classes.owner]: variant === "owner",
        [classes.admin]: variant === "admin"
      })}
    >
      {children}
    </span>
  )
);
