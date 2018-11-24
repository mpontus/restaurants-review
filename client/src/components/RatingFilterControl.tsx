import { Toolbar, Typography, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import React from "react";
import { useCallback } from "react";
import { Rating } from "./Rating";

type ClassKey = "label" | "active";

/**
 * Component props
 */
interface Props extends WithStyles<ClassKey> {
  /**
   * Current rating filter
   */
  value: number;

  /**
   * Rating filter change callback
   */
  onChange: (value: number) => void;
}

/**
 * Component enhancer
 */
const enhance = withStyles<ClassKey>(theme => ({
  label: {
    flexGrow: 1
  },
  active: {
    cursor: "pointer"
  }
}));

/**
 * Rating filter control component
 */
export const RatingFilterControl = enhance(
  ({ classes, value, onChange }: Props) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);

        onChange(value === newValue ? 0 : newValue);
      },
      [onChange]
    );
    const handleReset = useCallback(() => onChange(0), [onChange]);

    return (
      <Toolbar>
        <Typography
          variant="button"
          color={value ? "primary" : "textSecondary"}
          className={classnames(classes.label, { [classes.active]: value })}
          onClick={handleReset}
        >
          Filter by rating
        </Typography>
        <Rating value={value} onChange={handleChange} />
      </Toolbar>
    );
  }
);
