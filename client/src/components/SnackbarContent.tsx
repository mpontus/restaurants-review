import {
  IconButton,
  SnackbarContent as MaterialSnackbarContent,
  WithStyles,
  withStyles
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from "@material-ui/icons";
import classnames from "classnames";
import React from "react";

/**
 * Custom styling classes
 */
type ClassKey =
  | "icon"
  | "message"
  | "messageIcon"
  | "success"
  | "error"
  | "info";

/**
 * Component props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Notification type
   */
  variant: "info" | "success" | "error";

  /**
   * Notification message
   */
  message: React.ReactNode;

  /**
   * Close callback
   */
  onClose: () => void;
}

/**
 * Get icon component for given variant
 */
const getVariantIcon = (variant: string): React.ComponentType<any> => {
  if (variant === "success") {
    return CheckCircleIcon;
  }

  if (variant === "error") {
    return ErrorIcon;
  }

  return InfoIcon;
};

/**
 * Apply custom styling
 */
const enhance = withStyles<ClassKey>(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  icon: {
    fontSize: 20
  },
  messageIcon: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

/**
 * Snackbar Content Component
 *
 * Displays snackbar content for given notification type.
 */
const BaseSnackbarContent = ({ classes, variant, message, onClose }: Props) => {
  const Icon = getVariantIcon(variant);

  return (
    <MaterialSnackbarContent
      className={classes[variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classnames(classes.icon, classes.messageIcon)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
};

/**
 * Export enhanced component
 */
export const SnackbarContent = enhance(BaseSnackbarContent);
