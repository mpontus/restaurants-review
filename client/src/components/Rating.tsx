import { Typography, withStyles, WithStyles } from "@material-ui/core";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon
} from "@material-ui/icons";
import classnames from "classnames";
import React from "react";

/**
 * Class names for custom styling
 */
type ClassKey = "root" | "button" | "interactive";

/**
 * Rating component props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Use component as rating input
   */
  interactive?: boolean;

  /**
   * Rating value
   */
  value: number;

  /**
   * Number of reviews
   */
  reviews?: number | null;

  /**
   * Change listener
   */
  onChange?: (e: { target: { value: number } }) => void;
}

/**
 * Apply custom styles
 */
const enhance = withStyles<ClassKey>(theme => ({
  root: {
    padding: theme.spacing.unit,
    color: "#FF9800"
  },
  interactive: {
    cursor: "pointer"
  },
  button: {
    color: "inherit",
    padding: 0,
    background: "none",
    border: "none",
    outline: "none"
  }
}));

/**
 * Displays star rating
 */
export class BaseRating extends React.Component<Props> {
  /**
   * Handle hovering over star
   */
  public handleHover = () => undefined;

  /**
   * Handle clicking on star
   */
  public handleClick = () => undefined;

  /**
   * Render filled star
   */
  public renderStar = (filled: number) => {
    if (filled < 0.25) {
      return <StarBorderIcon color="inherit" />;
    }

    if (filled < 0.75) {
      return <StarHalfIcon color="inherit" />;
    }

    return <StarIcon color="inherit" />;
  };

  /**
   * Render a button with a star
   */
  public renderStarButton = (n: number) => (
    <button
      key={n}
      type="button"
      className={this.props.classes.button}
      onClick={this.handleClick}
    >
      {this.renderStar(this.props.value - n)}
    </button>
  );

  /**
   * Render star rating
   */
  public render() {
    const { classes, reviews, interactive } = this.props;

    return (
      <div
        className={classnames(classes.root, {
          [classes.interactive]: interactive
        })}
      >
        {[0, 1, 2, 3, 4].map(this.renderStarButton)}
        {reviews && (
          <Typography align="right" color="textSecondary">
            {reviews} reviews
          </Typography>
        )}
      </div>
    );
  }
}

/**
 * Export class with applied enhancer
 */
export const Rating = enhance(BaseRating);
